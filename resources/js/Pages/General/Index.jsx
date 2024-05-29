import LaporanKeuanganTable from '@/Components/LaporanKeuanganTable';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Index({ auth,totalPemasukan,totalPengeluaran,saldo ,laporanKeuangan}) {
    
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Halo Bendahara Umum</h2>}
        >
            <Head title="General" />

            <div className="py-2 grid grid-row-3 gap-4">
            <div className="overflow-hidden shadow-sm sm:rounded-lg">  
    <div className="p-3 text-gray-900 dark:text-gray-100 dark:bg-gray-800">
        <h1 className="text-lg font-bold">Ringkasan Keuangan</h1>
        <div className='flex flex-col sm:flex-row justify-between py-1 gap-4 text-center'>
            <div className='bg-slate-700 flex-1 p-3 rounded'>
                <h1 className="text-lg text-slate-400">Pemasukan</h1>
                <p>Rp. {totalPemasukan.toLocaleString('id-ID')}</p>
            </div>
            <div className='bg-slate-700 flex-1 p-3 rounded'>
                <h1 className="text-lg text-slate-400">Pengeluaran</h1>
                <p>Rp. {totalPengeluaran.toLocaleString('id-ID')}</p>
            </div>
            <div className='bg-slate-700 flex-1 p-3 rounded'>
                <h1 className="text-lg text-slate-400">Saldo</h1>
                <p>Rp. {saldo.toLocaleString('id-ID')}</p>
            </div>
        </div>
    </div>
</div>


                    <div className=" overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-3 text-gray-900  dark:text-gray-100 dark:bg-gray-800">
                            <div className='flex flex-col-2 justify-between'>
                            <h1 className="text-lg font-bold">Laporan Pemasukan dan Pengeluaran</h1>
                            </div>
                            <LaporanKeuanganTable data={laporanKeuangan} />
                        </div>
                    </div>
                    
                        
                    
                
            </div>
        </AuthenticatedLayout>
    );
}
