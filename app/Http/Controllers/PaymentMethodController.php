<?php

namespace App\Http\Controllers;

use App\Models\PaymentMethod;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    public function all()
    {
        return PaymentMethod::query()
            ->where('visible', true)
            ->where('status', true)
            ->get();
    }
}
