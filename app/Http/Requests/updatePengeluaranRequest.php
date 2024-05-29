<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class updatePengeluaranRequest extends FormRequest
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
        $rules = [
            'keterangan' => ['nullable', 'string'],
            'jumlah' => ['nullable', 'numeric'],
        ];

        // Check if bukti_trans is present and it's an image
        if ($this->hasFile('bukti_trans')) {
            $rules['bukti_trans'] = 'nullable|image|mimes:jpg,png,jpeg';
        } else {
            // If no new file is uploaded, exclude the image validation
            $rules['bukti_trans'] = 'nullable';
        }

        return $rules;
    }

    public function messages()
    {
        return [
            'bukti_trans.image' => 'The bukti trans field must be an image.',
        ];
    }

}
