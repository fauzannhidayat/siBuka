// resources/js/Components/TambahPermintaanForm.jsx

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function TambahPermintaanForm({ onSuccess }) {
    
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: '',
        jumlah: '',
        file_rab: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('permintaan.store'), {
            onSuccess: () => {
                reset();
                onSuccess();
            },
        });
    };

    return (
        <>
            <Head title="Tambah Permintaan" />
            <div className='p-3'>

            <h2 className='text-center text-white'>Ajukan Anggaran</h2>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="keterangan" value="Keterangan" />
                    <TextInput
                        id="keterangan"
                        type="text"
                        name="keterangan"
                        value={data.keterangan}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('keterangan', e.target.value)}
                    />
                    <InputError message={errors.keterangan} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="jumlah" value="Jumlah" />
                    <TextInput
                        id="jumlah"
                        type="number"
                        name="jumlah"
                        value={data.jumlah}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('jumlah', e.target.value)}
                    />
                    <InputError message={errors.jumlah} className="mt-2" />
                </div>
                <div>
                    <InputLabel htmlFor="file_rab" value="File RAB" />
                    <TextInput
                        id="file_rab"
                        type="file"
                        name="file_rab"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('file_rab', e.target.files[0])}
                    />
                    <InputError message={errors.file_rab} className="mt-2" />
                </div>
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Submit
                    </PrimaryButton>
                </div>
            </form>
            </div>
        </>
    );
}
