<?php

namespace App\Http\Controllers;

use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        $user_id = auth()->user()->id;
        return Task::where('user_id', $user_id)->get();
    }

    public function store(Request $request)
    {
        $attributes = $request->validate([
            'task' => 'required',
            'description' => 'required',
        ]);

        $attributes['user_id'] = auth()->user()->id;
        $attributes['state'] = false;

        Task::create($attributes);
    }

    public function update($id)
    {
        $task = Task::find($id);

        if($task->state == 0) {
            $task->state = 1;
        } else {
            $task->state = 0;
        }

        $task->save();
    }

    public function destroy($id)
    {
        $task = Task::find($id);
        $task->delete();
    }
}
