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

            for ($i = 0; $i < count($user['chats']); $i++) {
                $findUser = null;
                $find = null;

                if (count($user['chats'][$i]['grupo']['chats']) <= 2) {
                    for ($j = 0; $j < count($user['chats'][$i]['grupo']['chats']); $j++) {
                        if ($user['chats'][$i]['grupo']['chats'][$j]['user_id'] != auth()->user()->id) {
                            $find = $user['chats'][$i]['grupo']['chats'][$j]['user'];
                        }
                    }
                }

                if ($find) {
                    $findUser = $find;
                } else {
                    $findUser = [
                        'foto' => null,
                        'name' => "Grupo"
                    ];
                }

                $data = [
                    'chat_id' => $user['chats'][$i]['id'],
                    'grupo_id' => $user['chats'][$i]['grupo_id'],
                    'user' => $findUser,
                    'ultimo' => $user['chats'][$i]['mensajes']->last()
                ];

                array_push($arrayData, $data);
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
