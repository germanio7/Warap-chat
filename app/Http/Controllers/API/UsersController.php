<?php

namespace App\Http\Controllers\API;

use App\Role;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;

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
            $users = User::all();
            $data = collect();

            foreach ($users as $usuario) {

                if ($usuario->role_id != null) {
                    $aux = $usuario->role->role;
                } else {
                    $aux = null;
                }
                $usuario = collect($usuario);
                $usuario->put('rol', $aux);
                $data->push($usuario);
            }

            return $data;
        } else {
            $users = User::where('id', '<>', 1)->get();

            $data = collect();

            foreach ($users as $usuario) {

                if ($usuario->role_id != null) {
                    $aux = $usuario->role->role;
                } else {
                    $aux = null;
                }
                $usuario = collect($usuario);
                $usuario->put('rol', $aux);
                $data->push($usuario);
            }

            return $data;
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
            $attributes['role_id'] = $request->get('role_id', 3);

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

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|max:255|unique:users,email,' . $user->id,
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role_id = $request->role_id;

        if ($request->password) {
            if ($request->password == $request->password_confirm) {
                $user->password =  bcrypt($request->password);
            }
        }

        $user->save();
    }

    public function updateFoto(Request $request)
    {
        // FOTO
        if ($request->get('foto')) {
            $user = User::find(auth()->user()->id);
            $eliminar = $user->foto;
            if ($eliminar) {
                @unlink(public_path($eliminar));
            }
            $image = $request->get('foto');
            $name = time() . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
            Image::make($request->get('foto'))->save(public_path('img/usuarios/') . $name);
            $foto = '/img/usuarios/' . $name;
            $user->foto = $foto;
            $user->update();
            return ['msg' => 'Foto actualizada'];
        }
    }

    public function destroy($id)
    {
        $user = User::find($id);
        $user->delete();
    }
}
