<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    public function run()
    {
        Role::create([
            'role' => 'none',
            'permission' => '',
        ]);

        Role::create([
            'role' => 'admin',
            'permission' => 'get-role save-role edit-role delete-role get-task save-task edit-task delete-task',
        ]);
    }
}
