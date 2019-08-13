<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->group(function () {

    /*Auth*/
    Route::get('/user', 'AuthController@user');
    Route::post('/logout', 'AuthController@logout');
    Route::post('/update_user', 'AuthController@updateUser');
    Route::post('/delete_user', 'AuthController@deleteUser');

    /*Roles*/
    Route::apiResource('roles', 'API\RolesController', ['except' => ['create', 'edit']]);

    /*Users*/
    Route::apiResource('users', 'API\UsersController', ['except' => ['create', 'edit']]);

    /*Actualizar Foto Usuario*/
    Route::post('/update/photo', 'API\UsersController@updatePhoto');
});


/*Auth*/
Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
