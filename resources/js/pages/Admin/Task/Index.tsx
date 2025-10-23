import { useState, useEffect } from 'react';
import MainAdmin from '@/Layouts/MainAdmin';
import { Head, usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function TaskIndex() {

  interface Pegawai {
    id_pegawai: number;
    nama_pegawai: string;
    email: string;
  }

  interface Task {
    id_task: number;
    id_pegawai?: number | null;
    nama_task: string;
    deskripsi?: string | null;
    status?: string | null;
    tanggal_buat?: string | null;
    tanggal_mulai?: string | null;
    tanggal_selesai?: string | null;
    pegawai?: Pegawai | null;
  }

  interface PageProps {
    [key: string]: any;
    task: Task[];
  }

  const { task } = usePage<PageProps>().props;

  // State untuk modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [detailTask, setDetailTask] = useState<Task | null>(null);

  // State untuk form create
  const [nama_task, setNamaTask] = useState<string>('');
  const [deskripsi, setDeskripsi] = useState<string>('');
  const [tanggal_mulai, setTanggalMulai] = useState<string>('');
  const [tanggal_selesai, setTanggalSelesai] = useState<string>('');
  const [edit_nama_task, setEditNamaTask] = useState<string>('');
  const [edit_deskripsi, setEditDeskripsi] = useState<string>('');
  const [edit_tanggal_mulai, setEditTanggalMulai] = useState<string>('');
  const [edit_tanggal_selesai, setEditTanggalSelesai] = useState<string>('');
  const [edit_status, setEditStatus] = useState<string>('');

  const handleEdit = (task: Task): void => {
    setEditTask(task);
    setShowEditModal(true);
  };

  useEffect(() => {
    if (editTask) {
      setEditNamaTask(editTask.nama_task || '');
      setEditDeskripsi(editTask.deskripsi || '');
      setEditTanggalMulai(editTask.tanggal_mulai || '');
      setEditTanggalSelesai(editTask.tanggal_selesai || '');
      setEditStatus(editTask.status || 'Belum Dimulai');
    }
  }, [editTask]);

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setNamaTask('');
    setDeskripsi('');
    setTanggalMulai('');
    setTanggalSelesai('');
  };

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!editTask || !editTask.id_task) {
      Swal.fire('Error', 'Data tugas tidak lengkap.', 'error');
      return;
    }

    const payload = {
      nama_task: edit_nama_task,
      deskripsi: edit_deskripsi || null,
      tanggal_mulai: edit_tanggal_mulai || null,
      tanggal_selesai: edit_tanggal_selesai || null,
      status: edit_status,
    };

    router.patch(`/admin/task/${editTask.id_task}`, payload, {
      onSuccess: () => {
        Swal.fire({ icon: 'success', title: 'Berhasil!', text: 'Tugas berhasil diperbarui.' });
        setShowEditModal(false);
        router.reload();
      },
      onError: (errors) => {
        Swal.fire({ icon: 'error', title: 'Gagal!', text: errors?.nama_task?.[0] || 'Terjadi kesalahan.' });
      },
    });
  };

  const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleCreateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!nama_task.trim()) {
      Swal.fire('Peringatan', 'Nama Task wajib diisi.', 'warning');
      return;
    }

    const payload = {
      nama_task,
      deskripsi: deskripsi || null,
      tanggal_mulai: tanggal_mulai || null,
      tanggal_selesai: tanggal_selesai || null,
    };

    Swal.fire({
      title: 'Menyimpan...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    router.post('/admin/task', payload, {
      onSuccess: () => {
        Swal.fire({
          icon: 'success',
          title: 'Berhasil!',
          text: 'Tugas berhasil ditambahkan.',
          timer: 1500,
          showConfirmButton: false,
        });
        setShowCreateModal(false);
        setNamaTask('');
        setDeskripsi('');
        setTanggalMulai('');
        setTanggalSelesai('');
        router.reload();
      },
      onError: (errors) => {
        Swal.fire({
          icon: 'error',
          title: 'Gagal!',
          text: errors?.nama_task?.[0] || 'Terjadi kesalahan saat menyimpan tugas.',
        });
      },
    });
  };

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dropdownIndex, setDropdownIndex] = useState<number | null>(null);

  const toggleDropdown = (id: number, index: number) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
    setDropdownIndex(index);
  };

  const handleDelete = (id: number) => {
    if (!id) {
      Swal.fire('Error', 'ID task tidak valid.', 'error');
      return;
    }
    Swal.fire({
      title: 'Yakin ingin menghapus?',
      text: "Data yang dihapus tidak bisa dikembalikan!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, Hapus!',
      cancelButtonText: 'Batal',
      reverseButtons: true,
      customClass: {
        container: 'font-sans',
        popup: 'font-sans',
        confirmButton: 'bg-red-600 hover:bg-red-700 text-white py-2 px-4 ml-5 rounded-md',
        cancelButton: 'bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        router.delete(`/admin/task/${id}`, {
          onSuccess: () => {
            Swal.fire('Terhapus!', 'Task berhasil dihapus.', 'success');
            router.reload();
          },
          onError: () => {
            Swal.fire('Gagal!', 'Terjadi kesalahan saat menghapus.', 'error');
          }
        });
      }
    });
  };

  const handleDetail = (task: Task): void => {
    setDetailTask(task);
    setShowDetailModal(true);
  };

  useEffect(() => {
    const handleClickOutside = () => setOpenDropdownId(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const [filters, setFilters] = useState({
    nama_task: '',
    nama_pegawai: '',
    tanggal_mulai: '',
    tanggal_selesai: '',
    status: '',
  });

  const filteredTasks = task.filter((item) => {
    // Filter nama_task (case-insensitive)
    if (filters.nama_task && !item.nama_task.toLowerCase().includes(filters.nama_task.toLowerCase())) {
      return false;
    }

    // Filter nama pegawai (jika ada relasi)
    if (filters.nama_pegawai && item.pegawai && !item.pegawai.nama_pegawai.toLowerCase().includes(filters.nama_pegawai.toLowerCase())) {
      return false;
    }

    // Filter tanggal mulai
    if (filters.tanggal_mulai && item.tanggal_mulai) {
      if (new Date(item.tanggal_mulai) < new Date(filters.tanggal_mulai)) {
        return false;
      }
    }

    // Filter tanggal selesai
    if (filters.tanggal_selesai && item.tanggal_selesai) {
      if (new Date(item.tanggal_selesai) > new Date(filters.tanggal_selesai)) {
        return false;
      }
    }

    // Filter status
    if (filters.status && item.status !== filters.status) {
      return false;
    }

    return true;
  });



  return (
    <>
      <Head title="Task" />
      <MainAdmin>
        <div className="relative overflow-x-auto">
          <div className="p-6">
            {/* Baris Filter dan Tombol Tambah */}
            <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">

              {/* Tombol Tambah Tugas */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="self-start text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 flex items-center gap-2 shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Tugas
              </button>

              {/* Form Filter */}
              <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm w-full md:w-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nama Tugas</label>
                    <input
                      type="text"
                      value={filters.nama_task}
                      onChange={(e) => setFilters({ ...filters, nama_task: e.target.value })}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Cari..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Nama Pegawai</label>
                    <input
                      type="text"
                      value={filters.nama_pegawai}
                      onChange={(e) => setFilters({ ...filters, nama_pegawai: e.target.value })}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Cari..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tgl Mulai</label>
                    <input
                      type="date"
                      value={filters.tanggal_mulai}
                      onChange={(e) => setFilters({ ...filters, tanggal_mulai: e.target.value })}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Tgl Selesai</label>
                    <input
                      type="date"
                      value={filters.tanggal_selesai}
                      onChange={(e) => setFilters({ ...filters, tanggal_selesai: e.target.value })}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={filters.status}
                      onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                      className="w-full p-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Semua</option>
                      <option value="Belum Dimulai">Belum Dimulai</option>
                      <option value="Proses">Proses</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Kontainer responsif dengan overflow horizontal */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-200 text-gray-700 text-xs uppercase">
                  <tr>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">ID</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Pegawai</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Task</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Deskripsi</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Status</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Tgl Buat</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Mulai</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Selesai</th>
                    <th className="px-3 py-2 text-center font-medium text-gray-900 whitespace-nowrap">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTasks.map((item, index) => (
                    <tr key={item.id_task} className="hover:bg-gray-50 transition duration-200">
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">{item.id_task}</td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">{item.pegawai?.nama_pegawai ?? '-'}</td>
                      <td className="px-3 py-2 text-center text-xs font-medium text-gray-900 whitespace-nowrap max-w-[120px] truncate">
                        {item.nama_task}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap max-w-[150px] truncate">
                        {item.deskripsi || '-'}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-[10px] font-semibold ${item.status === 'Selesai'
                            ? 'bg-green-100 text-green-700'
                            : item.status === 'Proses'
                              ? 'bg-yellow-100 text-yellow-700'
                              : item.status === 'Belum Dimulai'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {item.status || '-'}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">
                        {formatDate(item.tanggal_buat ?? null)}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">
                        {item.tanggal_mulai ? formatDate(item.tanggal_mulai) : '-'}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap">
                        {item.tanggal_selesai ? formatDate(item.tanggal_selesai) : '-'}
                      </td>
                      <td className="px-3 py-2 text-center text-xs text-gray-900 whitespace-nowrap relative">
                        <div className="inline-block relative">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleDropdown(item.id_task, index);
                            }}
                            className="p-1 rounded hover:bg-gray-200 focus:outline-none"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-5 h-5 text-gray-600">
                              <path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z" />
                            </svg>
                          </button>

                          {openDropdownId === item.id_task && (
                            <div
                              className={`absolute right-0 z-10 w-32 bg-white border border-gray-200 rounded-lg shadow-lg ${dropdownIndex !== null && dropdownIndex >= task.length - 2
                                ? 'bottom-full mb-1'
                                : 'top-full mt-1'
                                }`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                onClick={() => {
                                  handleDetail(item);
                                  setOpenDropdownId(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Detail
                              </button>
                              <button
                                onClick={() => {
                                  handleEdit(item);
                                  setOpenDropdownId(null);
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  if (item.id_task) {
                                    handleDelete(item.id_task);
                                    setOpenDropdownId(null);
                                  } else {
                                    Swal.fire('Error', 'ID task tidak ditemukan.', 'error');
                                  }
                                }}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Modal Create */}
          {showCreateModal && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-[2px]"
              onClick={handleCloseCreateModal}
            >
              <div
                className="relative p-4 w-full max-w-md max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Tambah Tugas Baru</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={handleCloseCreateModal}
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                  </div>

                  <form onSubmit={handleCreateSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-1">
                      <div>
                        <label htmlFor="nama_task" className="block mb-2 text-sm font-medium text-gray-900">
                          Nama Task *
                        </label>
                        <input
                          type="text"
                          id="nama_task"
                          value={nama_task}
                          onChange={(e) => setNamaTask(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan nama tugas"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
                          Deskripsi
                        </label>
                        <textarea
                          id="deskripsi"
                          rows={4}
                          value={deskripsi}
                          onChange={(e) => setDeskripsi(e.target.value)}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tulis deskripsi tugas..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="tanggal_mulai" className="block mb-2 text-sm font-medium text-gray-900">
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            id="tanggal_mulai"
                            value={tanggal_mulai}
                            onChange={(e) => setTanggalMulai(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>

                        <div>
                          <label htmlFor="tanggal_selesai" className="block mb-2 text-sm font-medium text-gray-900">
                            Tanggal Selesai
                          </label>
                          <input
                            type="date"
                            id="tanggal_selesai"
                            value={tanggal_selesai}
                            onChange={(e) => setTanggalSelesai(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Tambah
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Modal Edit */}
          {showEditModal && editTask && (
            <div
              className="fixed inset-0 z-40 flex items-center justify-center backdrop-blur-[2px]"
              onClick={() => setShowEditModal(false)}
            >
              <div
                className="relative p-4 w-full max-w-md max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-white rounded-lg shadow-sm">
                  <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Edit Tugas</h3>
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                      onClick={() => setShowEditModal(false)}
                    >
                      <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                      </svg>
                    </button>
                  </div>

                  <form onSubmit={handleEditSubmit} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-1">
                      <div>
                        <label htmlFor="edit_nama_task" className="block mb-2 text-sm font-medium text-gray-900">
                          Nama Task *
                        </label>
                        <input
                          type="text"
                          id="edit_nama_task"
                          value={edit_nama_task}
                          onChange={(e) => setEditNamaTask(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          placeholder="Masukkan nama tugas"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="edit_deskripsi" className="block mb-2 text-sm font-medium text-gray-900">
                          Deskripsi
                        </label>
                        <textarea
                          id="edit_deskripsi"
                          rows={4}
                          value={edit_deskripsi}
                          onChange={(e) => setEditDeskripsi(e.target.value)}
                          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Tulis deskripsi tugas..."
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="edit_tanggal_mulai" className="block mb-2 text-sm font-medium text-gray-900">
                            Tanggal Mulai
                          </label>
                          <input
                            type="date"
                            id="edit_tanggal_mulai"
                            value={edit_tanggal_mulai}
                            onChange={(e) => setEditTanggalMulai(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>

                        <div>
                          <label htmlFor="edit_tanggal_selesai" className="block mb-2 text-sm font-medium text-gray-900">
                            Tanggal Selesai
                          </label>
                          <input
                            type="date"
                            id="edit_tanggal_selesai"
                            value={edit_tanggal_selesai}
                            onChange={(e) => setEditTanggalSelesai(e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                          />
                        </div>
                      </div>

                      {/* Status */}
                      <div>
                        <label htmlFor="edit_status" className="block mb-2 text-sm font-medium text-gray-900">
                          Status
                        </label>
                        <select
                          id="edit_status"
                          value={edit_status}
                          onChange={(e) => setEditStatus(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                          <option value="Belum Dimulai">Belum Dimulai</option>
                          <option value="Proses">Proses</option>
                          <option value="Selesai">Selesai</option>
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="text-white inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                      Simpan Perubahan
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Modal Detail */}
          {showDetailModal && detailTask && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-60 backdrop-blur-sm"
              onClick={() => setShowDetailModal(false)}
            >
              <div
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-xl w-full max-w-lg p-6 border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-gray-800">Detail Tugas</h2>
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="text-gray-500 hover:text-gray-800 hover:bg-gray-200 rounded-full p-2 transition"
                    aria-label="Tutup modal"
                  >
                    ✕
                  </button>
                </div>

                {/* Garis Pemisah */}
                <div className="border-t border-gray-200 mb-5"></div>

                {/* Body */}
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">ID</p>
                    <p className="text-gray-800 col-span-2">: {detailTask.id_task}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Nama Tugas</p>
                    <p className="text-gray-800 font-semibold col-span-2">: {detailTask.nama_task}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Deskripsi</p>
                    <div className="col-span-2 max-h-32 overflow-y-auto">
                      <p className="text-gray-800">: {detailTask.deskripsi || '-'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Status</p>
                    <div className="col-span-2">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${detailTask.status === 'Selesai'
                          ? 'bg-green-100 text-green-800'
                          : detailTask.status === 'Proses'
                            ? 'bg-yellow-100 text-yellow-800'
                            : detailTask.status === 'Belum Dimulai'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                      >
                        {detailTask.status || '-'}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Pegawai</p>
                    <p className="text-gray-800 col-span-2">: {detailTask.pegawai?.nama_pegawai || '-'}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Tgl. Buat</p>
                    <p className="text-gray-800 col-span-2">: {formatDate(detailTask.tanggal_buat)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Tgl. Mulai</p>
                    <p className="text-gray-800 col-span-2">: {detailTask.tanggal_mulai ? formatDate(detailTask.tanggal_mulai) : '-'}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-gray-600 font-medium">Tgl. Selesai</p>
                    <p className="text-gray-800 col-span-2">: {detailTask.tanggal_selesai ? formatDate(detailTask.tanggal_selesai) : '-'}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    onClick={() => setShowDetailModal(false)}
                    className="px-5 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-indigo-700 transition shadow-md"
                  >
                    Tutup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </MainAdmin>
    </>
  );
}