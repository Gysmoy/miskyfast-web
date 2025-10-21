<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends BasicController
{
    public $model = PaymentMethod::class;

    public function all()
    {
        return PaymentMethod::query()
            ->where('visible', true)
            ->where('status', true)
            ->get();
    }
}
