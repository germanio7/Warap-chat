<?php

use App\Role;
use Laravel\Passport\Passport;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    public function run()
    {

        $scopes = Passport::scopes();
        $permission = '';

        foreach ($scopes as $scope) {
            $permission = $permission . $scope->id . ' ';
        }

        Role::create([
            'role' => 'superAdmin',
            'permission' => $permission,
        ]);
    }
}
