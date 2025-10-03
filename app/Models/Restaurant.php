<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Restaurant extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'address',
        'banner',
        'logo',
        'phone_prefix',
        'phone',
        'featured',
        'visible',
        'status',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'visible' => 'boolean',
        'status' => 'boolean',
    ];
}
