// TambahPemasukanForm.jsx

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function TambahPemasukanForm({auth, status, userDepartement,onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: '',
        jumlah: '',
        sumber: '',
        department: userDepartement ? userDepartement.name : '', // Menggunakan data department untuk mengisi nilai awal
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pemasukan.store'), {
            onSuccess: () => {
                onSuccess();
                reset();
            },
        });
    };

    return (
        <>
            <Head title="Tambah" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <h2 className='text-center text-white'>Tambah Pemasukan</h2>
            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="keterangan" value="keterangan" />
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
                    <InputLabel htmlFor="jumlah" value="jumlah" />
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
                    <InputLabel htmlFor="sumber" value="sumber" />
                    <TextInput
                        id="sumber"
                        type="text"
                        name="sumber"
                        value={data.sumber}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('sumber', e.target.value)}
                    />
                    <InputError message={errors.jumlah} className="mt-2" />
                </div>

                {auth.user.role !== 'department' && (

                <div>
                    <InputLabel htmlFor="department" value="department" />

                    <TextInput
                        id="department"
                        type="text"
                        name="department"
                        value={data.department}
                        className="mt-1 block w-full"
                        disabled
                        
                        onChange={(e) => setData('department', e.target.value)}
                    />

                    <InputError message={errors.department} className="mt-2" />
                </div>
                )}
                <div className="flex items-center justify-end mt-4">
                    <PrimaryButton className="ms-4">
                        Tambah
                    </PrimaryButton>
                </div>
            </form>
        </>
    );
}
