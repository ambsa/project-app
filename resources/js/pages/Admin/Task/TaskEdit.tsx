import { useState, FormEvent } from 'react';
import swal from 'sweetalert2';

// types.ts atau di dalam TaskEdit.tsx
export interface Task {
  id_task: number;
  id_pegawai: number;
  nama_task: string;
  deskripsi: string | null;
  status: string;
  tanggal_buat: string;
  tanggal_mulai: string | null;
  tanggal_selesai: string | null;
}

type Props = {
  task: Task;
  onClose: () => void;
  onSuccess: () => void;
};

export default function TaskEdit({ task, onClose, onSuccess }: Props) {
  const [nama_task, setNamaTask] = useState<string>(task.nama_task);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetch(`/admin/task/${task.id_task}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nama_task }),
    });
    onSuccess();
  };
  return (
    <div className="modal">
      <h2>Edit Tugas</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={nama_task}
          onChange={(e) => setNamaTask(e.target.value)}
          placeholder="Nama tugas"
        />
        <button type="submit">Simpan</button>
        <button type="button" onClick={onClose}>Batal</button>
      </form>
    </div>
  );
}