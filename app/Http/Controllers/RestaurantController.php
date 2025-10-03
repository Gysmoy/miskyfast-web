<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function all()
    {
        return Restaurant::where('visible', true)->where('status', true)->get();
    }
}
