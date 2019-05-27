<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Passport::routes(function ($router) {
            $router->forAccessTokens();
        });

        Passport::tokensCan([
            // Role Tokens
            'get-role' => 'Get Role`s',
            'save-role' => 'Save Role`s',
            'edit-role' => 'Edit Role`s',
            'delete-role' => 'Delete Role`s',

            // Users Tokens
            'get-users' => 'Get Users',
            'save-users' => 'Save Users',
            'edit-users' => 'Edit Users',
            'delete-users' => 'Delete Users',
        ]);
    }
}
