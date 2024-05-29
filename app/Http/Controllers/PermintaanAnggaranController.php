<?php

namespace App\Http\Controllers;

use App\Http\Requests\storePermintaanRequest;
use App\Http\Requests\updatePermintaanRequest;
use App\Models\PermintaanAnggaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;



class PermintaanAnggaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'department') {
            $permintaanAnggarans = PermintaanAnggaran::where('id_departement', $user->department_id)
                ->with('department')
                ->get()
                ->map(function ($permintaan) {
                    if ($permintaan->file_rab) {
                        $permintaan->file_rab = Storage::url($permintaan->file_rab);
                    }
                    return $permintaan;
                });

            return inertia("Permintaan/Ajukan", [
                'permintaanAnggarans' => $permintaanAnggarans,
                'userRole' => $user->role
            ]);
        } else {
            $permintaanAnggarans = PermintaanAnggaran::with('department')
                ->get()
                ->map(function ($permintaan) {
                    if ($permintaan->file_rab) {
                        $permintaan->file_rab = Storage::url($permintaan->file_rab);
                    }
                    return $permintaan;
                });

            return inertia("Permintaan/Index", [
                'permintaanAnggarans' => $permintaanAnggarans,
                'userRole' => $user->role
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storePermintaanRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['id_departement'] = $user->department_id;
        $data['status'] = 'menunggu';

        if ($request->hasFile('file_rab')) {
            $file = $request->file('file_rab');
            $path = $file->store('file_rab', 'public'); // Simpan file di storage/public/file_rabaksi
            $data['file_rab'] = $path; // Simpan path file di database

        }
        PermintaanAnggaran::create($data);
        return to_route('permintaan.index')
            ->with('success', 'Pengajuan Berhasil ');
    }

    /**
     * Display the specified resource.
     */
    public function show(PermintaanAnggaran $permintaanAnggaran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PermintaanAnggaran $permintaanAnggaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updatePermintaanRequest $request, PermintaanAnggaran $permintaan)
    {
        $data = $request->validated();
        if ($request->user()->role === 'general') {
            // Admin atau role general dapat mengubah status dan alasan
            $permintaan->update([
                'status' => $data['status'],
                'alasan' => $data['alasan'] ?? $permintaan->alasan, // Gunakan alasan baru jika ada
            ]);
        } else {
            // Role department hanya dapat mengubah keterangan, jumlah, dan file RAB
            if ($request->hasFile('file_rab')) {
                // Delete old file if it exists
                if ($permintaan->file_rab) {
                    Storage::delete($permintaan->file_rab);
                }

                // Store new file
                $data['file_rab'] = $request->file('file_rab')->store('file_rab');
            } else {
                // Preserve old file if no new file is uploaded
                unset($data['file_rab']);
            }

            // Preserve status and alasan
            $data['status'] = $permintaan->status;
            $data['alasan'] = $permintaan->alasan;
            $permintaan->update($data);
        }

        // Handle file upload

        return redirect()->route('permintaan.index')
            ->with('success', 'Status permintaan anggaran berhasil diubah');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PermintaanAnggaran $permintaan)
    {
        if ($permintaan->file_rab) {
            // Delete the specific file
            Storage::disk('public')->delete($permintaan->file_rab);
        }
        $permintaan->delete();
        return to_route('permintaan.index')
            ->with('success', "permintaan was deleted");
    }
}
