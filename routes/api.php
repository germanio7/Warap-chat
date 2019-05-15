<?php

use Illuminate\Http\Request;

Route::middleware('auth:api')->group(function () {

    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/logout', 'AuthController@logout');

    //Role Routes
    Route::middleware('scopes:get-role')->get('role/index', 'RoleController@index');
    Route::middleware('scopes:save-role')->get('role/show', 'RoleController@show');
    Route::middleware('scopes:save-role')->post('role/save', 'RoleController@store');
    Route::middleware('scopes:edit-role')->put('role/edit/{id}', 'RoleController@update');

    // Task Routes
    Route::middleware('scopes:get-task')->get('task/index', 'TaskController@index');
    Route::middleware('scopes:save-task')->post('task/save', 'TaskController@store');
    Route::middleware('scopes:edit-task')->put('task/edit/{id}', 'TaskController@update');
    Route::middleware('scopes:delete-task')->post('task/delete/{id}', 'TaskController@destroy');

});

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');