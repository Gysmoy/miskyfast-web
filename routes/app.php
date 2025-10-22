<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/restaurants', [RestaurantController::class, 'all']);
Route::get('/payment-methods', [PaymentMethodController::class, 'all']);
Route::get('/items/restaurant/{restaurant}', [ItemController::class, 'byField']);
Route::get('/items/category/{category}', [ItemController::class, 'byField']);
Route::get('/items/restaurant/{restaurant}/category/{category}', [ItemController::class, 'byField']);

Route::post('/orders', [OrderController::class, 'save']);
