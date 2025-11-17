<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\EventController;
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

class OrderController extends BasicController
{
    public $model = Order::class;

    private function generateCode()
    {
        do {
            // Generar un código de 6 caracteres (letras + números)
            $timestamp = now()->format('ymdHis');
            $random = substr(str_shuffle('ABCDEFGHJKLMNPQRSTUVWXYZ23456789'), 0, 2);

            // Hash temporal + random para reducir colisión
            $code = strtoupper(substr(base_convert(crc32($timestamp . $random . uniqid()), 10, 36), 0, 6));

            // Verificar existencia en la tabla de pedidos
            $exists = DB::table('orders')->where('code', $code)->exists();
        } while ($exists);

        return $code;
    }

    public function save(Request $request): HttpResponse|ResponseFactory
    {
        DB::beginTransaction();
        $response = Response::simpleTryCatch(function () use ($request) {

            $clientJpa = User::find(Auth::id());
            $paymentMethodJpa = PaymentMethod::find($request->payment_method_id);
            if (!$paymentMethodJpa) throw new Exception('Elige un método de pago válido');

            // Verificar si el cliente tiene un pedido pendiente
            $hasPendingOrder = Order::where('client_id', $clientJpa->id)
                ->where(function ($q) {
                    $q->whereHas('status', function ($q) {
                        $q->where('can_order', false);
                    })->orWhereHas('deliveryStatus', function ($q) {
                        $q->where('can_order', false);
                    });
                })->exists();

            if ($hasPendingOrder) {
                throw new Exception('Ya tienes un pedido pendiente. No puedes crear uno nuevo hasta que se complete.');
            }

            $requestItems = collect($request->items);
            $itemsId = $requestItems->pluck('id');
            $itemsJpa = Item::whereIn('id', $itemsId)->get()->keyBy('id');

            $matchedItems = [];
            $restaurantId = null;

            foreach ($requestItems as $reqItem) {
                $itemJpa = $itemsJpa->get($reqItem['id']);
                if (!$itemJpa) {
                    throw new Exception("El item {$reqItem['id']} no existe en la base de datos o ya no se encuentra disponible");
                }

                // Verificar que todos los items pertenezcan al mismo restaurante
                if ($restaurantId === null) {
                    $restaurantId = $itemJpa->restaurant_id;
                } elseif ($restaurantId !== $itemJpa->restaurant_id) {
                    throw new Exception('Parece que quieres mezclar sabores de dos restaurantes distintos. Por ahora solo puedes ordenar de uno a la vez.');
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

            $totalAmount = collect($matchedItems)->sum(function ($item) {
                return $item['quantity'] * $item['unit_price'];
            });

            $order = Order::create([
                'code' => $this->generateCode(),
                'client_id' => $clientJpa->id,
                'restaurant_id' => $restaurantId,
                'status_id' => '56844089-7edf-4c9e-9d09-6874624c37b2',
                'delivery_status_id' => '8617ebd8-575a-494e-bb35-3ed380f42dd5',
                'payment_method_id' => $paymentMethodJpa->id,
                'payment_method_note' => $request->payment_method_note,
                'location' => $request->location,
                'total_amount' => $totalAmount,
            ]);

            foreach ($matchedItems as $item) {
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

            DB::commit();

            // Ahora SÍ el pedido está "completo"
            $order->load(['client', 'delivery', 'status', 'details']);
            EventController::notify('order.created', $order->toArray(), ['restaurant_id' => $order->restaurant_id,]);
            EventController::notify('order.created', $order->toArray(), ['client_id' => $order->client_id,]);

            return $order;
        }, function ($response, $th) {
            DB::rollBack();
        });
        return response($response->toArray(), $response->status);
    }

    public function setPaginationInstance(Request $request, string $model)
    {
        return $model::with(['status', 'deliveryStatus', 'restaurant', 'details'])
            ->withCount(['details'])
            ->where('client_id', Auth::id())
            ->orderBy('created_at', 'desc');
    }

    public function lastPendingOrder()
    {
        $response = Response::simpleTryCatch(function () {
            $lastPendingOrder = Order::select('orders.*')
                ->with(['status', 'deliveryStatus', 'restaurant', 'details'])
                ->withCount(['details'])
                ->join('statuses as status', 'orders.status_id', '=', 'status.id')
                ->join('statuses as delivery_status', 'orders.delivery_status_id', '=', 'delivery_status.id')
                ->where('orders.client_id', Auth::id())
                ->where(function ($q) {
                    $q->where('status.can_order', false)
                        ->orWhere('delivery_status.can_order', false);
                })
                ->orderBy('orders.created_at', 'desc')
                ->first();

            return $lastPendingOrder ?: null;
        });
        return response($response->toArray(), $response->status);
    }
}
