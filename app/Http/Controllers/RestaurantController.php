<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends Controller
{
    public function all()
    {
        return Restaurant::all();
    }
}
