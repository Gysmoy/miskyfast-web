<?php

namespace App\Observers;

use App\Http\Controllers\EventController;

class OrderObserver
{
    // public function created($order)
    // {
    //     $order->load(['client', 'delivery', 'status', 'details']);
    //     EventController::notify('order.created', $order->toArray(), ['restaurant_id' => $order->restaurant_id]);
    //     EventController::notify('order.created', $order->toArray(), ['client_id' => $order->client_id]);
    // }

    public function updated($order)
    {
        $order->load(['client', 'delivery', 'status', 'details']);
        EventController::notify('order.updated', $order->toArray(), ['restaurant_id' => $order->restaurant_id]);
        EventController::notify('order.updated', $order->toArray(), ['client_id' => $order->client_id]);
    }
}
