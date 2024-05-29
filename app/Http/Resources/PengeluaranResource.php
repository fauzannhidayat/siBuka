<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PengeluaranResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'keterangan' => $this->keterangan,
            'jumlah' => $this->jumlah,
            'bukti_trans' => $this->bukti_trans && !(str_starts_with($this->bukti_trans, 'http')) ?
                Storage::url($this->bukti_trans) : $this->bukti_trans,
            'department' => new DepartmentResource($this->departement), // Mengakses objek Departement

            'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
            'updated_at' => (new Carbon($this->updated_at))->format('Y-m-d'),

        ];
    }
}
