<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    protected $fillable = ['admins'];

    protected $casts = ['admins' => 'array'];

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }
}
