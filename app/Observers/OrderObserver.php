<?php

namespace App\Observers;

use App\Http\Controllers\EventController;

class OrderObserver
{
    public function created($order)
    {
        EventController::notify(
            'orders.created',
            $order->load(['client', 'delivery', 'status']),
            ['restaurant_id' => $order->restaurant_id]
        );
    }

    public function updated($order)
    {
        EventController::notify(
            'orders.updated',
            $order->load(['client', 'delivery', 'status']),
            ['restaurant_id' => $order->restaurant_id]
        );
    }
}
