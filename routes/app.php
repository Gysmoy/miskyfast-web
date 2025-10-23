<?php

use App\Http\Controllers\Mobile\AuthController;
use App\Http\Controllers\Mobile\CategoryController;
use App\Http\Controllers\Mobile\RestaurantController;
use App\Http\Controllers\Mobile\PaymentMethodController;
use App\Http\Controllers\Mobile\ItemController;
use App\Http\Controllers\Mobile\OrderController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::get('/verify', [AuthController::class, 'verify']);
        Route::delete('/logout', [AuthController::class, 'logout']);
        Route::delete('/logout-all', [AuthController::class, 'logoutAll']);
    });

    Route::get('/categories', [CategoryController::class, 'all']);

    Route::get('/restaurants', [RestaurantController::class, 'all']);
    Route::get('/restaurants/category/{category}', [RestaurantController::class, 'byCategory']);
    
    Route::get('/payment-methods', [PaymentMethodController::class, 'all']);
    
    Route::get('/items/restaurant/{restaurant}', [ItemController::class, 'byField']);
    Route::get('/items/category/{category}', [ItemController::class, 'byField']);
    Route::get('/items/restaurant/{restaurant}/category/{category}', [ItemController::class, 'byField']);

    Route::post('/orders', [OrderController::class, 'save']);
});
