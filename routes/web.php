<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\KelolaKasController;
use App\Http\Controllers\PemasukanController;
use App\Http\Controllers\PengeluaranController;
use App\Http\Controllers\PermintaanAnggaranController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if ($user->role === 'general') {
            return redirect()->route('general.dashboard');
        }

        if ($user->role === 'department') {
            return redirect()->route('department.dashboard');
        }

        // Default redirection if role is not matched
        return Inertia::render('Dashboard');
    })->name('dashboard');

    
    Route::middleware('EnsureUserRole:general')->group(function () {
        Route::get('/general-dashboard', [DashboardController::class, 'index'])->name('general.dashboard');
    });


    Route::middleware('EnsureUserRole:department')->group(function () {
        Route::get('/department-dashboard', [DashboardController::class, 'index'])->name('department.dashboard');
    });

    Route::resource('pemasukan', PemasukanController::class);
    Route::resource('pengeluaran', PengeluaranController::class);
    Route::resource('permintaan', PermintaanAnggaranController::class);
    Route::resource('kelolaKas', KelolaKasController::class);
    Route::resource('departement', DepartementController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
