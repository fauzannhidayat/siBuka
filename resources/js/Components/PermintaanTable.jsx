import React, { useState } from 'react';
import { Link, router, useForm } from '@inertiajs/react';
import Modal from './Modal'; // Pastikan path import sesuai dengan lokasi file Modal Anda
import EditPermintaanForm from './EditPermintaanForm';

export default function PermintaanTable({ permintaanAnggarans, userRole }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPermintaanId, setCurrentPermintaanId] = useState(null);
    const [currentPermintaan, setCurrentPermintaan] = useState(null);
    const [fileUrl, setFileUrl] = useState('');
    const { data, setData, post, processing, errors, reset } = useForm({
        status: '',
        alasan: '',
        _method: 'PUT'
        
    });

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFileUrl(''); // Kosongkan fileUrl saat modal ditutup
    };

    const openEditModal = (permintaan) => {
        setCurrentPermintaan(permintaan);
        setIsModalOpen(true);
    };

    const handleStatusChange = (id, status) => {
        if (status === 'ditolak') {
            setCurrentPermintaanId(id);
            setData({ ...data, status, alasan: '' });
            setIsModalOpen(true);
        } else {
            setData({ ...data, status, id });
            post(route('permintaan.update', id), {
                onSuccess: () => reset('status', 'alasan'),
            });
        }
    };

    const getStatusClassName = (status) => {
        switch (status) {
            case 'menunggu':
                return 'bg-yellow-200 text-yellow-900 font-bold';
            case 'disetujui':
                return 'bg-green-200 text-green-900 font-bold';
            case 'ditolak':
                return 'bg-red-200 text-red-900 font-bold';
            default:
                return '';
        }
    };

    const handleSubmit = (id) => {
        post(route('permintaan.update', id || currentPermintaanId), {
            onSuccess: () => {
                setIsModalOpen(false);
                reset('status', 'alasan');
            },
        });
    };

    const handleFileClick = (url) => {
        setFileUrl(url);
        setIsModalOpen(true);
    };

    const deleteProject = (permintaan) => {
        if (!window.confirm("Are you sure you want to delete the project?")) {
          return;
        }
        router.delete(route("permintaan.destroy", permintaan.id));
      };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        {userRole !== 'department' && (
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        )}
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alasan</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File RAB</th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {permintaanAnggarans.map((permintaan) => (
                        <tr key={permintaan.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permintaan.id}</td>
                            {userRole !== 'department' && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permintaan.department ? permintaan.department.name : '-'}</td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permintaan.keterangan}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permintaan.jumlah}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`p-1 rounded-md ${getStatusClassName(permintaan.status)}`}>
                                    {permintaan.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{permintaan.alasan ? permintaan.alasan : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {permintaan.file_rab && (
                                    <button onClick={() => handleFileClick(permintaan.file_rab)} className="text-indigo-600 hover:text-indigo-900">
                                        Lihat File
                                    </button>
                                )}
                            </td>
                            {userRole !== 'department' && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {userRole === 'general' && permintaan.status === 'menunggu' && (
                                        <div className="flex gap-2">
                                            <button onClick={() => handleStatusChange(permintaan.id, 'disetujui')} className="text-green-600 hover:text-green-900">Setujui</button>
                                            <button onClick={() => handleStatusChange(permintaan.id, 'ditolak')} className="text-red-600 hover:text-red-900">Tolak</button>
                                        </div>
                                    )}
                                </td>
                            )}
                            {userRole !== 'general' && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    <div className="flex gap-2">
                                        <button onClick={() => openEditModal(permintaan)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-1">
                                            Edit
                                        </button>

                                        <button
                                            onClick={(e) => deleteProject(permintaan)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                {fileUrl ? (
                    <iframe src={fileUrl} className="w-full h-96"></iframe>
                ) : currentPermintaan ? (
                    <EditPermintaanForm permintaan={currentPermintaan} onSuccess={toggleModal} />
                ) : (
                    <div className="p-6">
                        <h2 className="text-xl mb-4">Alasan Penolakan</h2>
                        <textarea
                            value={data.alasan}
                            onChange={(e) => setData('alasan', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            rows="4"
                        ></textarea>
                        {errors.alasan && <div className="text-red-500 text-sm mt-2">{errors.alasan}</div>}
                        <div className="mt-4 flex justify-end">
                            <button onClick={() => setIsModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                            <button onClick={() => handleSubmit(currentPermintaanId)} className="bg-red-600 text-white px-4 py-2 rounded">Submit</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
