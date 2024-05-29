<?php

namespace App\Http\Controllers;

use App\Models\Pemasukan;
use App\Models\Pengeluaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        if ($user->role === 'general') {
            // Ambil total pemasukan dan pengeluaran untuk seluruh organisasi
            $totalPemasukan = Pemasukan::sum('jumlah');
            $totalPengeluaran = Pengeluaran::sum('jumlah');
            $saldo = $totalPemasukan - $totalPengeluaran;

            // Ambil laporan pemasukan dan pengeluaran untuk seluruh organisasi
            $laporanPemasukan = Pemasukan::with('departement')
                ->select('created_at as tanggal', 'jumlah as pemasukan', DB::raw('0 as pengeluaran'), 'jumlah as jumlah')
                ->get();
            $laporanPengeluaran = Pengeluaran::with('departement')
                ->select('created_at as tanggal', DB::raw('0 as pemasukan'), 'jumlah as pengeluaran', 'jumlah as jumlah')
                ->get();

            $laporanKeuangan = $laporanPemasukan->toBase()->merge($laporanPengeluaran->toBase())->sortBy('tanggal')->values();


            return inertia('General/Index', [
                'totalPemasukan' => $totalPemasukan,
                'totalPengeluaran' => $totalPengeluaran,
                'saldo' => $saldo,
                'laporanKeuangan' => $laporanKeuangan,
            ]);
        } elseif ($user->role === 'department') {
            // Ambil total pemasukan dan pengeluaran untuk departemen pengguna
            $totalPemasukan = Pemasukan::where('id_departement', $user->department_id)->sum('jumlah');
            $totalPengeluaran = Pengeluaran::where('id_departement', $user->department_id)->sum('jumlah');
            $saldo = $totalPemasukan - $totalPengeluaran;

            // Ambil laporan pemasukan dan pengeluaran untuk departemen pengguna
            $laporanPemasukan = Pemasukan::where('id_departement', $user->department_id)
                ->select('created_at as tanggal', 'jumlah as pemasukan', DB::raw('0 as pengeluaran'), 'jumlah as jumlah')->get();
            $laporanPengeluaran = Pengeluaran::where('id_departement', $user->department_id)
                ->select('created_at as tanggal', DB::raw('0 as pemasukan'), 'jumlah as pengeluaran', 'jumlah as jumlah')->get();

            // Gabungkan dan urutkan data berdasarkan tanggal
            $laporanKeuangan = $laporanPemasukan->toBase()->merge($laporanPengeluaran->toBase())->sortBy('tanggal')->values();
            return inertia('Department/Dashboard', [
                'totalPemasukan' => $totalPemasukan,
                'totalPengeluaran' => $totalPengeluaran,
                'saldo' => $saldo,
                'laporanKeuangan' => $laporanKeuangan,
            ]);
        }
    }
}
