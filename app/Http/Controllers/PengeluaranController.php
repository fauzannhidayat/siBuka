<?php

namespace App\Http\Controllers;

use App\Http\Requests\storePengeluaranRequests;
use App\Http\Requests\updatePengeluaranRequest;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class PengeluaranController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(storePengeluaranRequests $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['id_departement'] = $user->department_id;

        // Handle file upload
        if ($request->hasFile('bukti_trans')) {
            $file = $request->file('bukti_trans');
            $path = $file->store('bukti_transaksi', 'public'); // Simpan file di storage/public/bukti_transaksi
            $data['bukti_trans'] = $path; // Simpan path file di database
        }
        Pengeluaran::create($data);
        return to_route('kelolaKas.index')
            ->with('success', 'Pengeluaran Berhasil Ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengeluaran $pengeluaran)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pengeluaran $pengeluaran)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updatePengeluaranRequest $request, Pengeluaran $pengeluaran)
    {
        $data = $request->validated();

        if ($request->hasFile('bukti_trans')) {
            // Delete old file if it exists
            if ($pengeluaran->bukti_trans) {
                Storage::disk('public')->delete($pengeluaran->bukti_trans);
            }

            // Store new file
            $data['bukti_trans'] = $request->file('bukti_trans')->store('bukti_transaksi', 'public');
        } else {
            // Preserve old file if no new file is uploaded
            unset($data['bukti_trans']);
        }


        $pengeluaran->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengeluaran $pengeluaran)
    {
    
        if ($pengeluaran->bukti_trans) {
            // Delete the specific file
            Storage::disk('public')->delete($pengeluaran->bukti_trans);
        }
        $pengeluaran->delete();
        return to_route('kelolaKas.index')
            ->with('success', "pengeluaran was deleted");
    }
}
