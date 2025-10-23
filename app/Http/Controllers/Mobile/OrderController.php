<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\Order;
use App\Models\PaymentMethod;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response as HttpResponse;
use Illuminate\Routing\ResponseFactory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use SoDe\Extend\Response;

class OrderController extends Controller
{
    public function save(Request $request): HttpResponse|ResponseFactory
    {
        $response = Response::simpleTryCatch(function () use ($request) {
            DB::beginTransaction();

            $clientJpa = User::find(Auth::id());
            $paymentMethodJpa = PaymentMethod::find($request->payment_method_id);
            if (!$paymentMethodJpa) throw new Exception('Elige un método de pago válido');

            $requestItems = collect($request->items);
            $itemsId = $requestItems->pluck('id');
            $itemsJpa = Item::whereIn('id', $itemsId)->get()->keyBy('id');

            $matchedItems = [];

            foreach ($requestItems as $reqItem) {
                $itemJpa = $itemsJpa->get($reqItem['id']);
                if (!$itemJpa) {
                    throw new Exception("El item {$reqItem['id']} no existe en la base de datos o ya no se encuentra disponible");
                }

                $presentation = collect($itemJpa->presentations)
                    ->firstWhere('id', $reqItem['presentation_id'] ?? null);

                $matchedItems[] = [
                    'id' => $itemJpa->id,
                    'name' => $itemJpa->name,
                    'restaurant_id' => $itemJpa->restaurant_id,
                    'presentation' => $presentation['presentation'] ?? 'Standard',
                    'quantity' => $reqItem['quantity'],
                    'unit_price' => $presentation['price'] ?? $itemJpa->price,
                    'observation' => $reqItem['observation'] ?? null,
                ];
            }

            $itemsGrouped = collect($matchedItems)->groupBy('restaurant_id');
            $ordersCreated = [];

            foreach ($itemsGrouped as $restaurantId => $itemsGroup) {
                $totalAmount = collect($itemsGroup)->sum(function ($item) {
                    return $item['quantity'] * $item['unit_price'];
                });

                $order = Order::create([
                    'client_id' => $clientJpa->id,
                    'restaurant_id' => $restaurantId,
                    'status_id' => '56844089-7edf-4c9e-9d09-6874624c37b2',
                    'delivery_status_id' => '8617ebd8-575a-494e-bb35-3ed380f42dd5',
                    'payment_method_id' => $paymentMethodJpa->id,
                    'payment_method_note' => $request->payment_method_note,
                    'location' => $request->location,
                    'total_amount' => $totalAmount,
                ]);

                foreach ($itemsGroup as $item) {
                    $order->details()->create([
                        'order_id' => $order->id,
                        'item_id' => $item['id'],
                        'item' => $item['name'],
                        'presentation' => $item['presentation'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total_price' => $item['quantity'] * $item['unit_price'],
                        'observation' => $item['observation'],
                    ]);
                }

                $ordersCreated[] = $order;
            }
            DB::commit();

            return [
                'orders' => $ordersCreated
            ];
        }, function ($response, $th) {
            DB::rollBack();
        });
        return response($response->toArray(), $response->status);
    }
}
