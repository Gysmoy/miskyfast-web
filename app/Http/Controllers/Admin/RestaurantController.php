<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Http\Request;
use SoDe\Extend\Crypto;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class RestaurantController extends BasicController
{
    public $model = Restaurant::class;
    public $reactView = 'Admin/Restaurants';
    public $imageFields = ['banner', 'logo'];
    public $softDeletion = true;

    public function setReactViewProperties(Request $request)
    {
        $prefixes = JSON::parse(File::get('./prefijocelular.json'));
        return [
            'prefixes' => $prefixes,
            'gmaps_api_key' => env('GMAPS_API_KEY'),
        ];
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        if ($isNew) {
            $password = Crypto::short();
            $userJpa = User::create([
                'restaurant_id' => $jpa->id,
                'uuid' => Crypto::randomUUID(),
                'name' => 'Usuario',
                'lastname' => $request->name,
                'email' => $request->email,
                'password' => $password,
            ]);
            $userJpa->assignRole('Restaurant');
            return [
                'email' => $request->email,
                'password' => $password,
            ];
        }
    }
}
