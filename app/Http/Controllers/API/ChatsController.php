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
        $users = $request->get('users');

        if ($request->admins) {
            $admins = [auth()->user()->id];
        } else {
            $admins = null;
        }

        $grupo = Grupo::create([
            'admins' => $admins,
        ]);

        $chat = Chat::create([
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

    public function fetchMessages($id)
    {
        $grupo = Grupo::find($id);
    }
}
