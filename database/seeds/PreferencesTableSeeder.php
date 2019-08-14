<?php

use App\Preference;
use Illuminate\Database\Seeder;

class PreferencesTableSeeder extends Seeder
{
    public function run()
    {
        Preference::create([
            'appName' => 'Laravel Passport Vue'
        ]);
    }
}
