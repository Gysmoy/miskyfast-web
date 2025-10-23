<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends BasicController
{
    public $model = Order::class;
    public $reactView = 'Restaurant/Orders';
    public $with4get = ['client', 'delivery', 'status', 'details'];

    public function setReactViewProperties(Request $request)
    {
        $orders = Order::select('orders.*')
            ->with($this->with4get)
            ->join('statuses as status', 'status.id', 'orders.status_id')
            ->where('restaurant_id', Auth::user()->restaurant_id)
            // ->where('status.is_ok', false)
            ->get();
        $statuses = Status::where('status', true)->get();
        return [
            'orders' => $orders,
            'statuses' => $statuses
        ];
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        return $this->model::with($this->with4get)->find($jpa->id);
    }
}
