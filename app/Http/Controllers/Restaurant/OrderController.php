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
    public $prefix4filter = 'orders';

    public function setReactViewProperties(Request $request)
    {
        $orders = Order::select('orders.*')
            ->with($this->with4get)
            ->where('restaurant_id', Auth::user()->restaurant_id)
            ->whereNotIn('status_id', ['a02d8c66-8aab-408a-9b6d-fc8f29a1eda6', 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b'])
            ->get();
        $statuses = Status::where('status', true)->get();
        return [
            'orders' => $orders,
            'statuses' => $statuses
        ];
    }

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::select('orders.*')
            ->with($this->with4get)
            ->withCount(['details'])
            ->leftJoin('statuses as status', 'status.id', 'orders.status_id')
            ->leftJoin('users as client', 'client.id', 'orders.client_id');
    }

    public function afterSave(Request $request, object $jpa, ?bool $isNew)
    {
        return $this->model::with($this->with4get)->find($jpa->id);
    }
}
