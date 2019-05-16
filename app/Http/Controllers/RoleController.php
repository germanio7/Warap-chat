<?php

namespace App\Http\Controllers;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;

class RoleController extends Controller
{
    public function index()
    {
        return Role::where('role', '!=', 'superAdmin')->get();
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'role' => 'required',
            'permission' => 'required',
        ]);

        Role::create($attributes);
    }

    public function show()
    {
        return Passport::scopes();
    }

    public function update(Request $request, $id)
    {
        $rol = Role::find($id);

        $attributes = $request->validate([
            'role' => 'required',
            'permission' => 'required',
        ]);

        $rol->update($attributes);

    }

    public function destroy($id)
    {
        $users = User::where('role_id', $id)->get();
        foreach ($users as $user) {
            $user->update([
                'role_id' => null,
            ]);
        }

        $rol = Role::find($id);
        $rol->delete();
        
    }
}
