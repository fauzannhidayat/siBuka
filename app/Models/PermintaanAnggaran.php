<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanAnggaran extends Model
{
    use HasFactory;

    protected $fillable = [
        'keterangan', 'jumlah', 'status', 'alasan', 'id_departement', 'file_rab'
    ];

    public function department()
    {
        return $this->belongsTo(Departement::class, 'id_departement');
    }
}
