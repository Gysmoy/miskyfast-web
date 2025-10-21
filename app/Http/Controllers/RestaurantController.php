<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;

class RestaurantController extends Controller
{
    public function all()
    {
        return Restaurant::with(['categories'])
            ->where('visible', true)
            ->where('status', true)
            ->has('categories')
            ->get();
    }
}
