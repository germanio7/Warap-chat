<?php

namespace App\Http\Controllers\API;

use App\Grupo;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GruposController extends Controller
{
    public function show($id)
    {
        $grupo = Grupo::find($id);
        return $grupo->load('chats.mensajes');
    }
}
