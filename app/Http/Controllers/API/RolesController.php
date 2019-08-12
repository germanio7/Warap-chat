<?php

namespace App\Http\Controllers\API;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;
use App\Http\Controllers\Controller;

class RolesController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('scopes:roles-index')->only('index');
        $this->middleware('scopes:roles-show')->only('show');
        $this->middleware('scopes:roles-store')->only('store');
        $this->middleware('scopes:roles-update')->only('update');
        $this->middleware('scopes:roles-destroy')->only('destroy');
    }

    public function index()
    {
        $user = User::find(auth()->user()->id);

        if ($user->role_id == '1') {
            $roles = Role::get();
            foreach ($roles as $rol) {
                $tokens = collect();

                $des = explode(', ', $rol->description);
                $per = explode(' ', $rol->permission);

                for ($i = 0; $i < count($des); $i++) {
                    $aux = collect();
                    $aux->put('description', $des[$i]);
                    $aux->put('index', $per[$i]);
                    $tokens->push($aux);
                    unset($aux);
                }

                $rol['tokens'] = $tokens;

                unset($tokens);
            }

            return $roles;
        } else {
            return Role::where('role', '!=', 'superAdmin')->get();
        }
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'role' => 'required',
            'permission' => 'required',
            'description' => 'required'
        ]);

        Role::create($attributes);
    }

    public function show($id)
    {
        return Passport::scopes();
    }

    public function update(Request $request, $id)
    {
        $rol = Role::find($id);

        $attributes = $request->validate([
            'role' => 'required',
            'permission' => 'required',
            'description' => 'required'
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
