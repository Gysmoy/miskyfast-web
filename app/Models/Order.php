<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Order extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<string>
     */
    protected $fillable = [
        'code',
        'client_id',
        'restaurant_id',
        'delivery_id',
        'status_id',
        'delivery_status_id',
        'payment_method_id',
        'payment_method_note',
        'delivery_address_text',
        'delivery_address_reference',
        'delivery_latitude',
        'delivery_longitude',
        'total_amount',
        'delivery_restaurant_route',
        'delivery_client_route',
        'rejected_reason'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'location' => 'array',
        'total_amount' => 'decimal:2',
        'delivery_restaurant_route' => 'array',
        'delivery_client_route' => 'array',
    ];

    public function client()
    {
        return $this->belongsTo(User::class);
    }

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function delivery()
    {
        return $this->belongsTo(User::class, 'delivery_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function deliveryStatus()
    {
        return $this->belongsTo(Status::class, 'delivery_status_id');
    }

    public function paymentMethod()
    {
        return $this->belongsTo(PaymentMethod::class);
    }

    public function details()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
