<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //
     protected $primaryKey = 'id_role';
    
    protected $table = 'role';

    protected $fillable = [
        'nama_role',
    ];


    public function pegawai()
    {
        return $this->hasMany(Pegawai::class, 'id_role', 'id_role');
    }
}
