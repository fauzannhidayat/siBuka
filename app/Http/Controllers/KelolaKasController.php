<?php

namespace App\Http\Controllers;

use App\Http\Resources\PemasukanResource;
use App\Http\Resources\PengeluaranResource;
use App\Models\Departement;
use App\Models\KelolaKas;
use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

// KelolaKasController.php
class KelolaKasController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $department = Departement::find($user->department_id);
        if ($user->role === 'department') {
            // Jika ya, ambil hanya data pemasukan yang terkait dengan departemen pengguna
            $pemasukan = Pemasukan::where('id_departement', $user->department_id)->with('departement')->get();
            $pengeluaran = Pengeluaran::where('id_departement', $user->department_id)->with('departement')->get();
        } else {
            // Jika tidak, ambil semua data pemasukan
            $pemasukan = Pemasukan::with('departement')->get();
            $pengeluaran = Pengeluaran::with('departement')->get();
        }
        
        
        return inertia('KelolaKas/Index', [
            'userDepartement' => $department,
            'pemasukans' => PemasukanResource::collection($pemasukan),
            'pengeluarans' => PengeluaranResource::collection($pengeluaran),
            'success' => session('success')
        ]);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(KelolaKas $kelolaKas)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(KelolaKas $kelolaKas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, KelolaKas $kelolaKas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KelolaKas $kelolaKas)
    {
        //
    }
}
