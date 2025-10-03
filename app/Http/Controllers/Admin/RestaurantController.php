<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Restaurant;
use Illuminate\Http\Request;

class RestaurantController extends BasicController
{
    public $model = Restaurant::class;
    public $reactView = 'Admin/Restaurants';
    public $imageFields = ['banner', 'logo'];
}
