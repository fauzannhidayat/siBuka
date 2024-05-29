import { useState } from 'react';
import PermintaanTable from '@/Components/PermintaanTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import TambahPermintaanForm from '@/Components/TambahPermintaanForm';

export default function Ajukan({ auth, permintaanAnggarans, userRole }) {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Pengajuan Anggaran</h2>}
        >
            <Head title="Pengajuan Anggaran" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800">
                                <div className='flex flex-col-2 justify-between'>
                                    <h1 className="text-lg font-bold">Pengajuan</h1>
                                    <button onClick={toggleModal} className="text-sm font-sm bg-green-600 rounded-lg p-1">Tambah</button>
                                </div>
                                <div className='mt-2'>
                                    <PermintaanTable permintaanAnggarans={permintaanAnggarans} userRole={userRole}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <Modal show={showModal} onClose={toggleModal}>
                    <TambahPermintaanForm onSuccess={toggleModal}/>
                </Modal>
            )}
        </AuthenticatedLayout>
    );
}
