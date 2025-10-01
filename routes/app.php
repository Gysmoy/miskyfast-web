<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ClientController;
// use App\Http\Controllers\RemainingHistoryController;
use Illuminate\Support\Facades\Route;

Route::get('/categories', [CategoryController::class, 'all']);
// Route::post('/clients', [ClientController::class, 'save']);
