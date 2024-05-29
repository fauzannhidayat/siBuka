import EditPemasukanForm from "@/Components/EditPemasukanForm";
import EditPengeluaranForm from "@/Components/EditPengeluaranForm";
import Modal from "@/Components/Modal";
import PemasukanTable from "@/Components/PemasukanTable";
import PengeluaranTable from "@/Components/PengeluaranTable";
import TambahPemasukanForm from "@/Components/TambahPemasukanForm";
import TambahPengeluaranForm from "@/Components/TambahPengeluaranForm";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState } from "react";

export default function Index({ auth, pemasukans, pengeluarans, status, userDepartement }) {
    const [showModal, setShowModal] = useState(false);
    const [formType, setFormType] = useState('pemasukan'); // Menyimpan jenis form yang akan ditampilkan
    const [editingData, setEditingData] = useState(null);

    const toggleModal = (type, data = null) => {
        setShowModal(!showModal);
        setFormType(type); 
        setEditingData(data); // Mengatur jenis form yang akan ditampilkan berdasarkan argumen yang diterima
    };

    const handleSuccess = () => {
        setShowModal(false);
    };

    const handleSubmit = (data) => {
        if (formType === 'pemasukan') {
            post(route('pemasukan.store'), data);
        } else if (formType === 'pengeluaran') {
            post(route('pengeluaran.store'), data); // Tambahkan logika untuk menyimpan data pengeluaran
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Kelola Kas</h2>}
        >
            <Head title="Kelola Kas" />
            <div className="">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="py-2 grid grid-row-2 gap-4">
                        <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800">
                                <div className='flex flex-col-2 justify-between'>
                                    <h1 className="text-lg font-bold">Pemasukan</h1>
                                    <button onClick={() => toggleModal('pemasukan')} className="text-sm font-sm bg-green-600 rounded-lg p-1">Tambah</button>
                                </div>
                                <div className='mt-2'>
                                    <PemasukanTable userRole={auth.user.role} pemasukans={pemasukans} onEdit={(data) => toggleModal('editPemasukan', data)}/>
                                </div>
                            </div>
                        </div>
                        <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                            <div className="p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800">
                                <div className='flex flex-col-2 justify-between'>
                                    <h1 className="text-lg font-bold">Pengeluaran</h1>
                                    <button onClick={() => toggleModal('pengeluaran')} className="text-sm font-sm bg-green-600 rounded-lg p-1">Tambah</button>
                                </div>
                                <div className='mt-2'>
                                    <PengeluaranTable userRole={auth.user.role} pengeluarans={pengeluarans}  onEdit={(data) => toggleModal('editPengeluaran', data)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            <Modal show={showModal} onClose={toggleModal}>
                <div className='p-3'>
                {formType === 'editPemasukan' ? (
                        <EditPemasukanForm pemasukan={editingData} userDepartement={userDepartement} onSuccess={handleSuccess} onClose={() => setShowModal(false)} />
                    ) : formType === 'pemasukan' ? (
                        <TambahPemasukanForm auth={auth} status={status} userDepartement={userDepartement} onSubmit={handleSubmit} onSuccess={toggleModal} />
                    ) : formType === 'pengeluaran' ? (
                        <TambahPengeluaranForm auth={auth} status={status} userDepartement={userDepartement} onSubmit={handleSubmit} onSuccess={toggleModal} />
                    ): (
                        <EditPengeluaranForm auth={auth } pengeluaran={editingData} userDepartement={userDepartement} onSuccess={handleSuccess} onClose={() => setShowModal(false)} />
                    )}
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
