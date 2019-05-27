<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::get();
    }

    public function show()
    {
        return $user = User::find($id);
    }

    public function store(Request $request)
    {
        if($request->password == $request->password_confirm)
        {
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

    public function update(Request $request, $id)
    {

        $user = User::find($id);

        if($request->password == $request->password_confirm)
        {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|unique:users,email,'.$user->id,
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
