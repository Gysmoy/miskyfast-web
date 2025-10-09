<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Item extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        'image',
        'name',
        'description',
        'price',
        'presentations',
        'category_id',
        'restaurant_id',
    ];

    protected $casts = [
        'presentations' => 'array',
    ];

    public function category()
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    public function restaurant()
    {
        return $this->hasOne(Restaurant::class, 'id', 'restaurant_id');
    }
}
