<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'type',
        'address',
        'email',
        'latitude',
        'longitude',
        'owner_name',
        'phone',
        'phone_prefix',
        'reference',
        'restaurant_name',
        'status',
        'vehicle_type',
        'plate_number',
        'license_number'
    ];

    protected $casts = [
        'status' => 'boolean',
    ];
}
