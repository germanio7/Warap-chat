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
        $description = '';

        foreach ($scopes as $scope) {
            $permission = $permission . $scope->id . ' ';
            $description = $description . $scope->description . ', ';
        }

        Role::create([
            'role' => 'superAdmin',
            'permission' => $permission,
            'description' => $description
        ]);

        Role::create([
            'role' => 'administrador',
            'permission' => 'users-index users-store users-update users-destroy roles-index',
            'description' => 'Listar Usuarios, Guardar Usuarios, Editar Usuarios, Eliminar Usuarios, Listar roles,'
        ]);
    }
}
