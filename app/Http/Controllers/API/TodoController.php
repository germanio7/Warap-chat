<?php

namespace App\Http\Controllers;

use App\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index() 
    {
        return Todo::get();
    }

    public function edit()
    {
        return 'Editar Tarea';
    }

    public function delete()
    {
        return 'Borrar tarea';
    }
}
