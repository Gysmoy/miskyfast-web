<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    use HasFactory, HasUuids;

        public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'order_id',
        'item_id',
        'item',
        'presentation',
        'quantity',
        'unit_price',
        'total_price',
        'observation',
    ];

    protected $casts = [
        'unit_price' => 'decimal:2',
        'total_price' => 'decimal:2',
    ];
}
