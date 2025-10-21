<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Models\PaymentMethod;

class PaymentMethodController extends BasicController
{
    public $model = PaymentMethod::class;
    public $imageFields = ['image'];
}
