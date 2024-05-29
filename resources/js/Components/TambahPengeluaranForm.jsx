// TambahPemasukanForm.jsx
import { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function TambahPengeluaranForm({auth, status, userDepartement, onSuccess }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: '',
        jumlah: '',
        bukti_trans: '',
        department: userDepartement ? userDepartement.name : '', // Menggunakan data department untuk mengisi nilai awal
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('pengeluaran.store'),{
            onSuccess: () => {
                onSuccess();
                reset();
        }
    });
    };

    return (
        <>
            <Head title="Tambah" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <h2 className='text-center text-white'>Tambah Pengeluaran</h2>
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
                    <InputLabel
                    htmlFor="bukti_transaksi"
                    value="Bukti Transaksi"
                    />
                    <TextInput
                    id="bukti_transaksi"
                    type="file"
                    name="bukti_trans"
                    className="mt-1 block w-full"
                    onChange={(e) => setData("bukti_trans", e.target.files[0])}
                    />
                    <InputError message={errors.bukti_trans} className="mt-2" />
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
