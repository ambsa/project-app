<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //
    protected $primaryKey = 'id_task';

    protected $table = 'task';

    protected $fillable = ['nama_task', 'deskripsi', 'status', 'tanggal_buat', 'tanggal_mulai', 'tanggal_selesai', 'id_pegawai'];


    
    // Menggunakan timestamps
    public $timestamps = false;

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai', 'id_pegawai');
    }

    
}
