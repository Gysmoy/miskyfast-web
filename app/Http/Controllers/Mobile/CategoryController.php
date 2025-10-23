<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Category;
use SoDe\Extend\Response;

class CategoryController extends Controller
{
    public function all()
    {
        $response = Response::simpleTryCatch(function () {
            return Category::withCount('items')
                ->where('visible', true)
                ->where('status', true)
                ->get();
        });
        return response($response->toArray(), $response->status);
    }
}
