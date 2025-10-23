<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\TaskLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    //
    public function index()
    {
        return inertia('Admin/Index');
    }

    public function task()
    {
        $task = Task::with('pegawai')->get();

        return inertia('Admin/Task/Index', compact('task'));
    }

    public function store(Request $request): RedirectResponse
    {
        // Validasi input
        $validated = $request->validate([
            'nama_task' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'status' => 'nullable|string',
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        $idPegawai = Auth::user()->id_pegawai ?? 1; // fallback ke ID 1 untuk testing

        // Simpan ke database (gunakan Eloquent agar lebih aman)
        Task::create(array_merge($validated, [
            'id_pegawai' => $idPegawai,
            'status' => 'Belum Dimulai',
            'tanggal_buat' => now(),
        ]));

        return redirect()->route('admin.task.index')->with('success', 'Tugas berhasil ditambahkan.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_task' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'status' => ['nullable', 'string', Rule::in(['Belum Dimulai', 'Proses', 'Selesai'])],
            'tanggal_mulai' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_mulai',
        ]);

        $task = Task::findOrFail($id);
        $task->update($validated);

        return redirect()->route('admin.task.index')->with('success', 'Tugas berhasil ditambahkan.');
    }

    public function show($id)
    {
        $task = Task::with('pegawai')->findOrFail($id);

        return inertia('Admin/Task/Show', compact('task'));
    }

    public function destroy($id)
    {
        $task = Task::findOrFail($id);
        $task->delete();              

         return Inertia::location(route('admin.task.index'));
    }

    public function tasklog()
{
    // Ambil semua log, bisa ditambahkan filter/pagination di sini
    $logs = TaskLog::with(['pegawai', 'task'])
        ->orderBy('created_at', 'desc') // Gunakan 'create_at' karena nama kolom di DB begitu
        ->get();

    // Format data untuk dikirim ke Inertia
    $formattedLogs = $logs->map(function ($log) {
        return [
            'id_tasklog' => $log->id_tasklog,
            'aktifitas' => $log->aktifitas,
            'created_at' => $log->created_at ? $log->created_at->format('Y-m-d H:i:s') : null,
            'pegawai' => $log->pegawai ? [
                'id_pegawai' => $log->pegawai->id_pegawai,
                'nama_pegawai' => $log->pegawai->nama_pegawai,
            ] : null,
            'task' => $log->task ? [
                'id_task' => $log->task->id_task,
                'nama_task' => $log->task->nama_task,
            ] : null,
        ];
    });

    return Inertia::render('Admin/TaskLog/Index', [
        'logs' => $formattedLogs,
    ]);
}
}
