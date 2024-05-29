<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemasukan extends Model
{
    protected $fillable = [
        'keterangan',
        'jumlah',
        'sumber',
        'id_departement'
    ];
    use HasFactory;

    public function departement()
    {
        return $this->belongsTo(Departement::class, 'id_departement');
    }
}
