<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RestaurantController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'all']);
Route::get('/restaurants', [RestaurantController::class, 'all']);
// Route::post('/clients', [ClientController::class, 'save']);
