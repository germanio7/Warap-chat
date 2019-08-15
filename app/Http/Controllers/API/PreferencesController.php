<?php

namespace App\Http\Controllers\API;

use App\Preference;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Intervention\Image\Facades\Image;

class PreferencesController extends Controller
{
    public function getPreferences() 
    {
        $preference = Preference::where('id', 1)->get();
        return $preference[0];
    }

    public function updatePreferences(Request $request)
    {
        $preference = Preference::find(1);
        $preference->appName = $request->appName;

        if ($request->get('logo')) {
            Image::make($request->get('logo'))->save(public_path('img/logo.png'));
        }

        $preference->update();
        
    }
}
