<?php

namespace App\Http\Controllers;

use App\User;
use App\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;

class AuthController extends Controller
{
    public function login(Request $request) 
    {
        //return 'Hola Mundo';
        $user = User::where('email', $request->username)->get();

        if(count($user) > 0) {
            if($user[0]->role != null){
                $request->scope = $user[0]->role->permission;
            } else {
                $request->scope = null;
            }
            
        } else {
            $request->scope = '';
        }

        $request->request->add([
            'grant_type' => 'password',
            'client_id' => config('services.passport.client_id'),
            'client_secret' => config('services.passport.client_secret'),
            'username' => $request->username,
            'password' => $request->password,
            'scope' => $request->scope,
        ]);

        $tokenRequest = Request::create(
            env('APP_URL') . '/oauth/token',
            'post'
        );

        $response = Route::dispatch($tokenRequest);

        return $response;

    }

    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
    }

    public function updateUser(Request $request)
    {
       $user = User::find(auth()->user()->id);

        if($request->current_password) {
            if(Hash::check($request->current_password, auth()->user()->password)){
                if($request->password == $request->confirm_password) {
                    $request->validate([
                        'name' => 'required|string|max:255',
                        'password' => 'required|string|min:6',
                        'email' => 'required|string|max:255|unique:users,email,'.$user->id,
                    ]);

                    $user->name = $request->name;
                    $user->email = $request->email;
                    $user->password =  bcrypt($request->password);
                    $user->save();
                }
            }
        } else {
            $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|max:255|unique:users,email,'.$user->id,
            ]);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->save();
        }
    }

    public function user(Request $request)
    {
        $user = $request->user();

        if($user->role_id) {
            $rol = Role::where('id', $user->role_id)->get()[0];
            $permission = explode(" ",$rol->permission);

            return [
                'user'=>$user,
                'rol'=>$rol,
                'permission'=>$permission
            ];
        } else {
            return [
                'user'=>$user,
                'rol'=>'',
                'permission'=>''
            ];
        }

        
    }

    public function logout()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        return response()->json('Logged out Successfully', 200);
    }

    public function deleteUser()
    {
        auth()->user()->tokens->each(function ($token, $key) {
            $token->delete();
        });

        $user = User::find(auth()->user()->id);
        $user->delete();
    }
}
