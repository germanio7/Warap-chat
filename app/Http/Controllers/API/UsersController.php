<?php

namespace App\Http\Controllers\API;

use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('scopes:users-index')->only('index');
        $this->middleware('scopes:users-store')->only('store');
        $this->middleware('scopes:users-update')->only('update');
        $this->middleware('scopes:users-destroy')->only('destroy');
    }

    public function index()
    {
        $user = User::find(auth()->user()->id);
        $rol = $user->role_id;

        if ($rol == 1) {
            return User::all();
        } else {
            return User::where('id', '<>', 1)->get();
        }
    }

    public function store(Request $request)
    {
        if ($request->password == $request->password_confirm) {
            $attributes = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:6',
                'role_id' => 'nullable',
            ]);

            $attributes['password'] = bcrypt($attributes['password']);

            User::create($attributes);
        }
    }

    public function show($id)
    {
        return $user = User::find($id);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if ($request->password == $request->password_confirm) {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|unique:users,email,' . $user->id,
            ]);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->role_id = $request->role_id;
            $user->password =  bcrypt($request->password);
            $user->save();
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
    }
}
