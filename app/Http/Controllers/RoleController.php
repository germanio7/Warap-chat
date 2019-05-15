<?php

namespace App\Http\Controllers;

use App\Role;
use Illuminate\Http\Request;
use Laravel\Passport\Passport;

class RoleController extends Controller
{
    public function index()
    {
        return Role::where('role', '!=', 'none')->where('role', '!=', 'admin')->get();
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
        
    }
}
