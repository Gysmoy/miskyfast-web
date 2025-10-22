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

    public function byField(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $query = Item::with(['restaurant'])
                ->where('visible', true)
                ->where('status', true);
            if ($request->restaurant) $query->where('restaurant_id', $request->restaurant);
            if ($request->category) $query->where('category_id', $request->category);
            return $query->get();
        });
        return response($response->toArray(), $response->status);
    }
}
