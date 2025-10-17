<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Courses';
    public $reactRootView = 'public';
    public $prefix4filter = 'items';

    public function setPaginationInstance(Request $request, string $model)
    {
        $query = $model::select()
            ->where('visible', true)
            ->where('status', true)
            ->where('restaurant_id', $request->restaurant);
        if ($request->category) $query->where('category_id', $request->category);
        return $query;
    }
}
