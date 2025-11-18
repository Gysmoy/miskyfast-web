<?php

namespace App\Http\Controllers\Kitchen;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends BasicController
{
    public $model = Order::class;
    public $reactView = 'Kitchen/Home';
    public $reactRootView = 'admin-h';
    public $with4get = ['client', 'delivery', 'status', 'details'];

    public function setReactViewProperties(Request $request)
    {
        $orders = Order::select('orders.*')
            ->with($this->with4get)
            ->where('restaurant_id', Auth::user()->restaurant_id)
            ->whereIn('status_id', [
                'be7e24c9-a3e4-444e-adab-bb301b4ccce3',
                '1eb603e6-e078-4f9f-8c86-25a363742518',
                'f0a538f0-8aef-4ca7-80d1-297ab6c58279',
            ])
            ->get();
        return [
            'orders' => $orders
        ];
    }
}
