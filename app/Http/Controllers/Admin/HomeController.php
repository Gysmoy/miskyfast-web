<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\Benefit;
use App\Models\Item;
use App\Models\Order;
use App\Models\Restaurant;
use App\Models\Sale;
use App\Models\SaleStatus;
use Carbon\Carbon;
use Culqi\Culqi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends BasicController
{
    public $reactView = 'Admin/Home';
    public $reactRootView = 'admin';

    public function setReactViewProperties(Request $request)
    {
        $totalRestaurants = Restaurant::where('visible', true)->where('status', true)->count();
        $totalActiveRestaurants = Restaurant::has('categories')->where('visible', true)->where('status', true)->count();
        $totalDishes = Item::where('visible', true)->where('status', true)->count();

        // Count orders for today
        $todayOrders = Order::whereDate('created_at', Carbon::today())
            ->where('status_id', 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc')
            ->where('delivery_status_id', 'a0618dce-62e9-4720-8e1f-10f3208c357e')
            ->count();

        // Count orders for this month
        $thisMonthOrders = Order::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->where('status_id', 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc')
            ->where('delivery_status_id', 'a0618dce-62e9-4720-8e1f-10f3208c357e')
            ->count();

        return [
            'totalRestaurants' => $totalRestaurants,
            'totalActiveRestaurants' => $totalActiveRestaurants,
            'totalDishes' => $totalDishes,
            'todayOrders' => $todayOrders,
            'thisMonthOrders' => $thisMonthOrders
        ];
    }
}
