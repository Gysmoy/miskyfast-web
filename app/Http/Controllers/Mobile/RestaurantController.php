<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use SoDe\Extend\Response;

class RestaurantController extends Controller
{
    public function all()
    {
        $response = Response::simpleTryCatch(function () {
            return Restaurant::with(['categories'])
                ->where('visible', true)
                ->where('status', true)
                ->has('categories')
                ->get();
        });
        return response($response->toArray(), $response->status);
    }

    public function byCategory(Request $request)
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            return Restaurant::where('visible', true)
                ->where('status', true)
                ->whereHas('categories', function ($q) use ($request) {
                    $q->where('categories.id', $request->category);
                })
                ->get();
        });
        return response($response->toArray(), $response->status);
    }
}
