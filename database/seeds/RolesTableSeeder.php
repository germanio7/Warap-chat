<?php

use App\Role;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::create([
            'role' => 'admin',
            'permission' => 'get-role save-role edit-role delete-role get-task save-task edit-task delete-task',
        ]);
    }
}
