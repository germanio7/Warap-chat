<?php

namespace App\Http\Controllers\API;

use App\Chat;
use App\Grupo;
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

    public function fetchMessages($id)
    {
        $grupo = Grupo::find($id);
    }
}
