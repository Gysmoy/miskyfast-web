<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class RestaurantController extends BasicController
{
    public $model = Restaurant::class;
    public $reactView = 'Admin/Restaurants';
    public $imageFields = ['banner', 'logo'];

    public function setReactViewProperties(Request $request)
    {
        $prefixes = JSON::parse(File::get('./prefijocelular.json'));
        return [
            'prefixes' => $prefixes,
            'gmaps_api_key' => env('GMAPS_API_KEY'),
        ];
    }
}
