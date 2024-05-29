import { router } from '@inertiajs/react';
import React from 'react';


const PemasukanTable = ({ pemasukans, userRole, onEdit }) => {
    const deleteProject = (pemasukan) => {
        if (!window.confirm("Are you sure you want to delete the pemasukan?")) {
          return;
        }
        router.delete(route("pemasukan.destroy", pemasukan.id));
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
                            Sumber
                        </th>

                        {userRole !== 'department' && (
                            <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Departement
                            </th>
                        )}
                        <th className="px-6 py-3 bg-gray-50"></th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    
                    {pemasukans.data.map((pemasukan) => (
                        <tr key={pemasukan.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.id ? pemasukan.id : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.created_at ? pemasukan.created_at : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.keterangan ? pemasukan.keterangan : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.jumlah ? pemasukan.jumlah : '-'}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.sumber ? pemasukan.sumber : '-'}</td>
                            
                            {userRole !== 'department' && (
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{pemasukan.department.name ?  pemasukan.department.name : '-'}</td>
                            )}
                            
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button onClick={() => onEdit(pemasukan)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </button>

                                        {userRole !== 'department' && (
                                <button
                                onClick={(e) => deleteProject(pemasukan)}
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
        </div>
    );
};

export default PemasukanTable;
