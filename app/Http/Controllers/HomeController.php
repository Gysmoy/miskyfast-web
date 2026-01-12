<?php

namespace App\Http\Controllers;

use App\Models\Aboutus;
use App\Models\Category;
use App\Models\Indicator;
use App\Models\Item;
use App\Models\Post;
use App\Models\Slider;
use App\Models\Testimony;
use App\Models\WebDetail;
use App\Policies\WebDetailPolicy;
use Illuminate\Http\Request;
use SoDe\Extend\File;
use SoDe\Extend\JSON;

class HomeController extends BasicController
{
    public $reactView = 'Home';
    public $reactRootView = 'public';

    public function setReactViewProperties(Request $request)
    {
        $categoriesJpa = Category::query()
            ->where('featured', true)
            ->where('visible', true)
            ->where('status', true)
            ->get();

        $prefixes = JSON::parse(File::get('./prefijocelular.json'));
            
        return [
            'categories' => $categoriesJpa,
            'prefixes' => $prefixes,
            'gmaps_api_key' => env('GMAPS_API_KEY'),
        ];
    }
}
