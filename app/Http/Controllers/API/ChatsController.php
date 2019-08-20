<?php

namespace App\Http\Controllers\API;

use App\Chat;
use App\Grupo;
use App\Mensaje;
use App\Events\MessageSent;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ChatsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        return Chat::all();
    }

    public function store(Request $request)
    {

        if ($request->admins) {
            $admins = [auth()->user()->id];
        } else {
            $admins = null;
        }

        $cond = Chat::whereIn('user_id', [auth()->user()->id, $request->get('users')[0]['id']])->get();
        $condicion = true;
        $cant = count($cond);

        for ($i = 0; $i < $cant; $i++) {
            $j = $i + 1;
            if ($j < $cant) {
                if ($cond[$i]->grupo_id == $cond[$j]->grupo_id) {
                    $condicion = false;
                }
            }
        }
        if ($condicion) {
            $grupo = Grupo::create([
                'admins' => $admins,
            ]);

            Chat::create([
                'user_id' => auth()->user()->id,
                'grupo_id' => $grupo->id
            ]);

            foreach ($request->get('users') as $user) {
                $chat = Chat::create([
                    'user_id' => $user['id'],
                    'grupo_id' => $grupo->id
                ]);
            }
        }
    }

    public function fetchMessages()
    {
        $grupo = Grupo::find(3);
        $arreglo = $grupo->with('chats.mensajes.chat.user')->get();
        $arrg = $arreglo[0]->chats;
        $mens = collect();

        foreach ($arrg as $arr) {
            $mens->push($arr->mensajes);
        }

        return $mens->flatten()->sortByDesc('created_at')->values();
    }

    public function sendMessages()
    {
        // $id;
        $chat = Chat::where('user_id', auth()->user()->id)->where('grupo_id', 3)->get();
        $id = $chat[0]->id;
        $message = Mensaje::create([
            'chat_id' => $id,
            'mensaje' => 'Nuevo Mensaje',
        ]);

        broadcast(new MessageSent($message->load('chat.user')));

        return ['msg' => 'enviado'];
    }
}
