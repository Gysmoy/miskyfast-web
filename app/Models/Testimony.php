<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimony extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'image',
        'name',
        'position',
        'description',
        'rating',
        'visible',
        'status',
    ];

    protected $casts = [
        'rating' => 'integer',
        'visible' => 'boolean',
        'status' => 'boolean',
    ];
}
