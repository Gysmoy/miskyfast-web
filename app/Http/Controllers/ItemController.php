<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Item;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Courses';
    public $reactRootView = 'public';
    public $prefix4filter = 'items';

    public function byCategory(Request $request, Restaurant $restaurant, Category $category)
    {
        $response = Response::simpleTryCatch(function () use ($restaurant, $category) {
            $query = Item::select()
                ->where('visible', true)
                ->where('status', true)
                ->where('restaurant_id', $restaurant->id);
            if ($category) $query->where('category_id', $category->id);
            return $query->get();
        });
        return response($response->toArray(), $response->status);
    }
}
