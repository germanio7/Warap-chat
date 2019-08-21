<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    protected $fillable = ['chat_id', 'mensaje'];

    protected $casts = [
        'created_at' => 'datetime:d-m-Y H:i:s',
        'updated_at' => 'datetime:d-m-Y H:i:s'
    ];

    public function chat()
    {
        return $this->belongsTo(Chat::class);
    }
}
