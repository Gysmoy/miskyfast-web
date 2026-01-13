<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\JSON;

class ItemController extends BasicController
{
    public $model = Item::class;
    public $reactView = 'Restaurant/Items';
    public $prefix4filter = 'items';
    public $imageFields = ['image'];

    public function setReactViewProperties(Request $request)
    {
        $categories = Category::where('status', 1)->get();
        return [
            'categories' => $categories,
        ];
    }

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::select(['items.*'])
            ->with(['category'])
            ->leftJoin('categories AS category', 'category.id', 'items.category_id')
            ->where('items.restaurant_id', Auth::user()->restaurant_id);
    }

    public function beforeSave(Request $request)
    {
        $body = $request->all();
        $presentations = JSON::parse($request->input('presentations', '[]'));
        $body['presentations'] = $presentations;
        $body['restaurant_id'] = Auth::user()->restaurant_id;
        return $body;
    }
}
