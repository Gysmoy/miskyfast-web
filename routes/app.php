<?php

use App\Http\Controllers\Mobile\AddressController;
use App\Http\Controllers\Mobile\AuthController;
use App\Http\Controllers\Mobile\CategoryController;
use App\Http\Controllers\Mobile\RestaurantController;
use App\Http\Controllers\Mobile\PaymentMethodController;
use App\Http\Controllers\Mobile\ItemController;
use App\Http\Controllers\Mobile\OrderController;
use App\Http\Controllers\Mobile\StatusController;
use Illuminate\Support\Facades\Route;


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/validate-duplicate', [AuthController::class, 'validateDuplicate']);

Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::get('/verify', [AuthController::class, 'verify']);
        Route::delete('/logout', [AuthController::class, 'logout']);
        Route::delete('/logout-all', [AuthController::class, 'logoutAll']);
        Route::patch('/profile', [AuthController::class, 'updateProfile']);
        Route::get('/devices', [AuthController::class, 'devices']);
    });

    Route::get('/categories', [CategoryController::class, 'all']);

    Route::get('/restaurants', [RestaurantController::class, 'all']);
    Route::get('/restaurants/category/{category}', [RestaurantController::class, 'byCategory']);

    Route::get('/payment-methods', [PaymentMethodController::class, 'all']);

    Route::get('/items', [ItemController::class, 'all']);
    Route::get('/items/restaurant/{restaurant}', [ItemController::class, 'byField']);
    Route::get('/items/best-sale', [ItemController::class, 'bestSale']);
    Route::get('/items/category/{category}', [ItemController::class, 'byField']);
    Route::get('/items/restaurant/{restaurant}/category/{category}', [ItemController::class, 'byField']);

    Route::get('/addresses', [AddressController::class, 'all']);
    Route::post('/addresses', [AddressController::class, 'save']);
    Route::delete('/addresses/{id}', [AddressController::class, 'delete']);

    Route::get('/statuses', [StatusController::class, 'all']);

    Route::get('/orders/last/{mode?}', [OrderController::class, 'lastPendingOrder']);
    Route::get('/orders/available', [OrderController::class, 'available']);
    Route::get('/orders/deliver/{orderId}', [OrderController::class, 'deliver']);
    Route::post('/orders', [OrderController::class, 'save']);
    Route::post('/orders/paginate', [OrderController::class, 'paginate']);

    Route::middleware('can:Delivery')->group(function () {
        Route::patch('/orders/delivery-status', [OrderController::class, 'deliveryStatus']);
    });
});
