<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Pegawai extends Authenticatable
{
    //

    use Notifiable, HasFactory;

    protected $primaryKey = 'id_pegawai';

    protected $table = 'pegawai';

    protected $fillable = ['nama_pegawai', 'email', 'password', 'id_role'];
// Kolom yang disembunyikan dari array/json
    protected $hidden = [
        'password',
        'remember_token',
    ];

    // Konversi tipe data kolom tertentu
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    // Menggunakan timestamps
    public $timestamps = true;

    // Relasi ke model Role
    public function role()
    {
        return $this->belongsTo(Role::class, 'id_role', 'id_role');
    }
}
