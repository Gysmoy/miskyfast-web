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

    public function byCategory(Request $request, string $restaurant_id, ?string $category_id)
    {
        $response = Response::simpleTryCatch(function () use ($restaurant_id, $category_id) {
            $query = Item::with(['restaurant'])
                ->where('visible', true)
                ->where('status', true)
                ->where('restaurant_id', $restaurant_id);
            if ($category_id) $query->where('category_id', $category_id);
            return $query->get();
        });
        return response($response->toArray(), $response->status);
    }
}
