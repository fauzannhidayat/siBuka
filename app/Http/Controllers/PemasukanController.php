<?php

namespace App\Http\Controllers;

use App\Http\Requests\storePemasukanRequest;
use App\Http\Requests\updatePemasukanRequest;
use App\Models\Departement;
use App\Models\Pemasukan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PemasukanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();

        // Ambil data departemen pengguna
        $department = Departement::find($user->department_id);

        return inertia('Pemasukan/Tambah', [
            'user' => $user,
            'userDepartement' => $department,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(storePemasukanRequest $request)
    {
        $user = Auth::user();
        $data = $request->validated();
        $data['id_departement'] = $user->department_id;

        Pemasukan::create($data);
        return to_route('kelolaKas.index')
            ->with('success', 'Pemasukan Berhasil Ditambah');
    }

    /**
     * Display the specified resource.
     */
    public function show(Pemasukan $pemasukan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pemasukan $pemasukan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(updatePemasukanRequest $request, Pemasukan $pemasukan)
    {
        $data = $request->validated();
        $pemasukan->update($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemasukan $pemasukan)
    {
        $pemasukan->delete();
    }
}
