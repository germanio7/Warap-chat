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

        $user = auth()->user()->load('chats.grupo.chats.user');
        if ($user != null) {
            $arrayData = [];
            $grupoChats = [];
            for ($i = 0; $i < count($user['chats']); $i++) {
                array_push($grupoChats, $user['chats'][$i]['grupo']['chats']);
            }
            foreach ($grupoChats as $a) {
                if (count($a) <= 2) {
                    $mens = collect();
                    $user = null;
                    foreach ($a as $b) {
                        if ($b->user_id != auth()->user()->id) {
                            $user = $b->user;
                        }
                        $mens->push($b->mensajes);
                    }
                    $ultimo = $mens->last();
                    $data = [
                        'grupo_id' => $a[0]->grupo_id,
                        'user' => $user,
                        'ultimo' => $ultimo
                    ];
                    array_push($arrayData, $data);
                } else {
                    $mens = collect();
                    $user = [
                        'foto' => null,
                        'name' => "Grupo"
                    ];
                    foreach ($a as $b) {
                        $mens->push($b->mensajes);
                    }
                    $ultimo = $mens->last();
                    $data = [
                        'grupo_id' => $a[0]->grupo_id,
                        'user' => $user,
                        'ultimo' => $ultimo
                    ];
                    array_push($arrayData, $data);
                }
            }
        }
        return $arrayData;
    }

    public function store(Request $request)
    {
        if (auth()->user()->id != $request->get('users')[0]['id']) {

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
    }

    public function fetchMessages()
    {
        $grupo = Grupo::find(1);
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
        $chat = Chat::where('user_id', auth()->user()->id)->where('grupo_id', 1)->get();
        $id = $chat[0]->id;
        $message = Mensaje::create([
            'chat_id' => $id,
            'mensaje' => 'Nuevo Mensaje',
        ]);

        broadcast(new MessageSent($message->load('chat.user')));

        return ['msg' => 'enviado'];
    }
}
