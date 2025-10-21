<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use SoDe\Extend\Response;

class OrderController extends BasicController
{
    public $model = Order::class;

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            $clientJpa = User::find(Auth::id());
            $paymentMethodJpa = PaymentMethod::find($request->payment_method_id);
            if (!$paymentMethodJpa) throw new Exception('Elige un método de pago válido');

            $itemsId = collect($request->items)->pluck('id');
            $itemsJpa = Item::whereIn('id', $itemsId)->get();
            $itemsGrouped = $itemsJpa->groupBy('restaurant_id');

            $ordersCreated = [];

            foreach ($itemsGrouped as $restaurantId => $itemsGroup) {
                // Calculate total amount for this order
                $totalAmount = collect($itemsGroup)->sum(function ($item) {
                    return $item['quantity'] * $item['unit_price'];
                });

                // Create order
                $order = Order::create([
                    'client_id' => $clientJpa->id,
                    'restaurant_id' => $restaurantId,
                    'status_id' => $request->status_id,
                    'delivery_status_id' => $request->delivery_status_id,
                    'payment_method_id' => $request->payment_method_id,
                    'payment_method_note' => $request->payment_method_note,
                    'location' => $request->location,
                    'total_amount' => $totalAmount,
                ]);

                // Create order details
                foreach ($itemsGroup as $item) {
                    $order->details()->create([
                        'order_id' => $order->id,
                        'item_id' => $item['id'] ?? null,
                        'item' => $item['name'] ?? 'Item',
                        'presentation' => $item['presentation'] ?? 'Standard',
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total_price' => $item['quantity'] * $item['unit_price'],
                        'observation' => $item['observation'] ?? null,
                    ]);
                }

                $ordersCreated[] = $order;
            }

            return [
                'orders' => $ordersCreated
            ];
        });
        return response($response->toArray(), $response->status);
    }
}
