<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TaskLog extends Model
{
    //
    use HasFactory;

    protected $table = 'task_log';
    protected $primaryKey = 'id_tasklog';

    protected $fillable = [
        'id_task',
        'id_pegawai',
        'aktifitas',
    ];


    public $timestamps = true;

    public function pegawai()
    {
        return $this->belongsTo(Pegawai::class, 'id_pegawai', 'id_pegawai');
    }

    public function task()
    {
        return $this->belongsTo(Task::class, 'id_task', 'id_task');
    }
}
