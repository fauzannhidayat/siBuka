import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import Modal from './Modal'; // Pastikan path import sesuai dengan lokasi file Modal Anda

const PengeluaranTable = ({ pengeluarans, userRole , onEdit}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [fileUrl, setFileUrl] = useState('');

    const handleFileClick = (filePath) => {
        const url = `${filePath}`;
        setFileUrl(url);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFileUrl('');
    };

    const deleteProject = (pengeluaran) => {
        if (!window.confirm("Are you sure you want to delete the pengeluaran?")) {
          return;
        }
        router.delete(route("pengeluaran.destroy", pengeluaran.id));
      };

    return (
        <div className='overflow-x-auto'>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            ID
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tanggal
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Keterangan
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Jumlah
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Bukti
                        </th>
                        {userRole !== 'department' && (
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Departement
                            </th>
                        )}
                        <th className="px-6 py-3  bg-gray-50"></th>
                        
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {pengeluarans.data.map((pengeluaran) => (
                        <tr key={pengeluaran.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pengeluaran.id ? pengeluaran.id : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pengeluaran.created_at ? pengeluaran.created_at : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pengeluaran.keterangan ? pengeluaran.keterangan : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pengeluaran.jumlah ? pengeluaran.jumlah : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {pengeluaran.bukti_trans && (
                                    <button onClick={() => handleFileClick(pengeluaran.bukti_trans)} className="text-indigo-600 hover:text-indigo-900">
                                        Lihat File
                                    </button>
                                )}
                            </td>
                            {userRole !== 'department' && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {pengeluaran.department?.name ? pengeluaran.department.name : '-'}
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => onEdit(pengeluaran)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </button>

                                        {userRole !== 'department' && (
                                <button
                                onClick={(e) => deleteProject(pengeluaran)}
                                className="font-medium text-red-600 dark:text-red-500 hover:underline mx-1"
                            >
                                Delete
                            </button>
                            )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal to view file */}
            <Modal show={isModalOpen} onClose={handleCloseModal}>
                {fileUrl && (
                    <div className="w-full h-96 flex justify-center items-center">
                        <img src={fileUrl} alt="Bukti Transaksi" className="max-w-full max-h-full" />
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default PengeluaranTable;
