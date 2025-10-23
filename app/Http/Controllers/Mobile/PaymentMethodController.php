<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Models\PaymentMethod;
use SoDe\Extend\Response;

class PaymentMethodController extends Controller
{
    public function all()
    {
        $response = Response::simpleTryCatch(function () {
            return PaymentMethod::query()
                ->where('visible', true)
                ->where('status', true)
                ->get();
        });
        return response($response->toArray(), $response->status);
    }
}
