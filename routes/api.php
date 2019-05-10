<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', 'AuthController@logout');

    Route::get('todo/index', 'TodoController@index');

    Route::middleware('scopes:edit-todo')->post('todo/edit', 'TodoController@edit');
    Route::middleware('scopes:delete-todo')->post('todo/delete', 'TodoController@delete');

});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');