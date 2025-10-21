<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\User;
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
            return $clientJpa;
        });
        return response($response->toArray(), $response->status);
    }
}
