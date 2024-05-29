import React, { useState, useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';
import PrimaryButton from './PrimaryButton';

const EditPengeluaranForm = ({ auth, pengeluaran, onSuccess, userDepartement, onClose }) => {
    const [initialized, setInitialized] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: '',
        jumlah: '',
        bukti_trans: '',
        department: userDepartement ? userDepartement.name : '', 
        _method: 'PUT',
    });

    useEffect(() => {
        if (pengeluaran) {
            setData({
                keterangan: pengeluaran.keterangan || '',
                jumlah: pengeluaran.jumlah || '',
                bukti_trans: '',
                department: userDepartement ? userDepartement.name : '',
                _method: 'PUT',
            });
            setInitialized(true);
        }
    }, [pengeluaran]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pengeluaran.update', pengeluaran.id), {
            onSuccess: () => {
                reset();
                onSuccess();
                onClose();
            },
        });
    };

    if (!initialized) {
        return null; // atau bisa diganti dengan loading spinner atau pesan error
    }

    return (
        <div className="p-6 text-white">
            <h2 className="text-xl mb-4 text-center">Edit Pengeluaran</h2>
            <form onSubmit={handleSubmit}>
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
                    <InputLabel htmlFor="bukti_transaksi" value="Bukti Transaksi" />
                    <TextInput
                        id="bukti_transaksi"
                        type="file"
                        name="bukti_trans"
                        className="mt-1 block w-full"
                        onChange={(e) => setData('bukti_trans', e.target.files[0])}
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
                        Edit 
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditPengeluaranForm;
