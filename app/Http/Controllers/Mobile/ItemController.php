<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

class ItemController extends Controller
{
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
