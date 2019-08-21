<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    protected $fillable = ['user_id', 'grupo_id'];

    public function grupo()
    {
        return $this->belongsTo(Grupo::class);
    }

    public function mensajes()
    {
        return $this->hasMany(Mensaje::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
