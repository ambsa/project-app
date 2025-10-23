import { Head, usePage, router } from '@inertiajs/react';
import MainAdmin from '@/Layouts/MainAdmin';
import Swal from 'sweetalert2';

interface Pegawai {
  id_pegawai: number;
  nama_pegawai: string;
}


interface Task {
  id_task: number;
  nama_task: string;
}

interface TaskLog {
  id_tasklog: number;
  aktifitas: string;
  created_at: string | null;
  pegawai: Pegawai | null;
  task: Task | null;
}

interface PageProps {
  logs: TaskLog[];
}

export default function TaskLogIndex({ logs }: PageProps) {
  return (
    <>
      <Head title="Log Aktivitas Tugas" />
      <MainAdmin>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Log Aktivitas Tugas</h1>
            <p className="text-gray-600">Daftar aktivitas perubahan data tugas.</p>
          </div>

          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 text-center">ID Log</th>
                  <th className="px-4 py-3 text-center">Task</th>
                  <th className="px-4 py-3 text-center">Pegawai</th>
                  <th className="px-4 py-3 text-center">Aktivitas</th>
                  <th className="px-4 py-3 text-center">Tanggal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                      Tidak ada log aktivitas.
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => (
                    <tr key={log.id_tasklog} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-center text-sm text-gray-900">{log.id_tasklog}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        {log.task ? log.task.nama_task : '-'}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        {log.pegawai ? log.pegawai.nama_pegawai : '-'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-xs truncate">
                        {log.aktifitas}
                      </td>
                      <td className="px-4 py-3 text-center text-sm text-gray-900">
                        {log.created_at || '-'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </MainAdmin>
    </>
  );
}