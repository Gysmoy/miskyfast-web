<?php

namespace App\Observers;

use App\Http\Controllers\EventController;

class OrderObserver
{
    public function created($order)
    {
        EventController::notify(
            'order.created',
            $order->load(['client', 'delivery', 'status', 'details']),
            ['restaurant_id' => $order->restaurant_id]
        );
    }

    public function updated($order)
    {
        EventController::notify(
            'order.updated',
            $order->load(['client', 'delivery', 'status', 'details']),
            ['restaurant_id' => $order->restaurant_id]
        );
    }
}
