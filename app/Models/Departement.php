<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    protected $fillable = ['name'];
    use HasFactory;

    public function users()
    {
        return $this->hasMany(User::class, 'department_id');
    }

    public function pemasukans()
    {
        return $this->hasMany(Pemasukan::class);
    }

    public function pengeluarans()
    {
        return $this->hasMany(Pengeluaran::class);
    }

    public function permintaan_anggarans()
    {
        return $this->hasMany(PermintaanAnggaran::class, 'id_departement');
    }
}
