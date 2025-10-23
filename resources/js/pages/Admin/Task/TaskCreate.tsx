import { useState, FormEvent } from 'react';

interface TaskCreateProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export default function TaskCreate({ onClose, onSuccess }: TaskCreateProps) {
  const [id_pegawai, setIdPegawai] = useState<number | ''>('');
  const [nama_task, setNamaTask] = useState<string>('');
  const [deskripsi, setDeskripsi] = useState<string>('');
  const [tanggal_mulai, setTanggalMulai] = useState<string>('');
  const [tanggal_selesai, setTanggalSelesai] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!id_pegawai || !nama_task) {
      alert('ID Pegawai dan Nama Tugas wajib diisi.');
      return;
    }

    const payload = {
      id_pegawai: Number(id_pegawai),
      nama_task,
      deskripsi: deskripsi || null,
      status: 'belum',
      tanggal_mulai: tanggal_mulai || null,
      tanggal_selesai: tanggal_selesai || null,
    };

    const res = await fetch('/admin/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      onSuccess?.();
      onClose();
    } else {
      alert('Gagal menyimpan tugas.');
    }
  };

  const handleClose = () => {
    document.body.classList.remove('overflow-hidden');
    onClose();
  };


  if (typeof document !== 'undefined') {
    document.body.classList.add('overflow-hidden');
  }

  return (
   <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden"
      onClick={handleClose}
    >
      <div
        className="relative p-4 w-full max-w-md max-h-full"
        onClick={(e) => e.stopPropagation()} // jangan tutup saat klik di dalam modal
      >
        {/* 📦 Konten Modal */}
        <div className="relative bg-white rounded-lg shadow-sm">
          {/* 🧠 Header Modal */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-gray-200 rounded-t">
            <h3 className="text-lg font-semibold text-gray-900">
              Tambah Tugas Baru
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* 📝 Body Form */}
          <form onSubmit={handleSubmit} className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 grid-cols-1">
              {/* Nama Task */}
              <div>
                <label
                  htmlFor="nama_task"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
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

              {/* Deskripsi */}
              <div>
                <label
                  htmlFor="deskripsi"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
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

              {/* Tanggal Mulai & Selesai */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tanggal_mulai"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
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
                  <label
                    htmlFor="tanggal_selesai"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
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

            {/* ✅ Tombol Submit */}
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Tambah Tugas
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}