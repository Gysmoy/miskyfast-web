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
            $itemIds = collect($request->items)->pluck('id')->toArray();
            $itemsJpa = Item::whereIn('id', $itemIds)->get();
            return [
                'items' => $itemsJpa
            ];
        });
        return response($response->toArray(), $response->status);
    }
}
