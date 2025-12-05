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
        $order->load(['client', 'restaurant', 'delivery', 'status', 'deliveryStatus', 'details', 'paymentMethod']);
        EventController::notify('order.updated', $order->toArray(), ['restaurant_id' => $order->restaurant_id]);
        EventController::notify('order.updated', $order->toArray(), ['user_id' => $order->client_id, 'mode' => 'client']);
        if ($order->delivery_id) {
            EventController::notify('order.updated', $order->toArray(), ['user_id' => $order->delivery_id, 'mode' => 'delivery']);
        }
        if ($order->isDirty('status_id') && $order->status_id == 'be7e24c9-a3e4-444e-adab-bb301b4ccce3') {
            EventController::notify('order.available', $order->toArray(), ['mode' => 'delivery']);
        }
        if ($order->isDirty('delivery_id') && $order->delivery_id) {
            EventController::notify('order.unavailable', $order->toArray(), ['mode' => 'delivery']);
        }
    }
}
