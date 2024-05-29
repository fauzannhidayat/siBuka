<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class updatePermintaanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'status' => [
                'required',
                Rule::in(['menunggu', 'disetujui', 'ditolak'])
            ],
            'alasan' => 'nullable|string',
            'keterangan' => 'nullable|string|max:255',
            'jumlah' => 'nullable|numeric',
            'file_rab' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx|max:2048', // menyesuaikan sesuai dengan kebutuhan
        ];
    }
}
