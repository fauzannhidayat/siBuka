import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import InputError from './InputError';

const EditPemasukanForm = ({ pemasukan, onSuccess, userDepartement, onClose }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        keterangan: pemasukan.keterangan || '',
        jumlah: pemasukan.jumlah || '',
        sumber: pemasukan.sumber || '',
        department: userDepartement ? userDepartement.name : '', 
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pemasukan.update', pemasukan.id), {
            onSuccess: () => {
                reset();
                onSuccess();
                onClose();
            },
        });
    };

    return (
        <div className="p-6 text-white">
            <h2 className="text-xl mb-4 text-center">Edit Pemasukan</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <InputLabel htmlFor="keterangan" value="Keterangan" />
                    <TextInput
                        id="keterangan"
                        type="text"
                        value={data.keterangan}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('keterangan', e.target.value)}
                        autoComplete="keterangan"
                    />
                    <InputError message={errors.keterangan} className="mt-2" />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="jumlah" value="Jumlah" />
                    <TextInput
                        id="jumlah"
                        type="number"
                        value={data.jumlah}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('jumlah', e.target.value)}
                        autoComplete="jumlah"
                    />
                    <InputError message={errors.jumlah} className="mt-2" />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="sumber" value="Sumber" />
                    <TextInput
                        id="sumber"
                        type="text"
                        value={data.sumber}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('sumber', e.target.value)}
                        autoComplete="sumber"
                    />
                    <InputError message={errors.sumber} className="mt-2" />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        disabled={processing}
                    >
                        Save
                    </button>
                    
                </div>
            </form>
        </div>
    );
};

export default EditPemasukanForm;
