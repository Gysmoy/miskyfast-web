<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AccountController as AdminAccountController;
use App\Http\Controllers\Admin\BrandController as AdminBrandController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\MessageController as AdminMessageController;
use App\Http\Controllers\Admin\PaymentMethodController as AdminPaymentMethodController;
use App\Http\Controllers\Admin\RestaurantController as AdminRestaurantController;
use App\Http\Controllers\Admin\StatusController as AdminStatusController;
use App\Http\Controllers\Admin\TestimonyController as AdminTestimonyController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

// Restaurant
use App\Http\Controllers\Restaurant\HomeController as RestaurantHomeController;
use App\Http\Controllers\Restaurant\OrderController as RestaurantOrderController;
use App\Http\Controllers\Restaurant\ItemController as RestaurantItemController;
use App\Http\Controllers\Restaurant\UserController as RestaurantUserController;
use App\Http\Controllers\Restaurant\KitchenController as RestaurantKitchenController;

// kitchen
use App\Http\Controllers\Kitchen\OrderController as KitchenOrderController;

// Mobile
use App\Http\Controllers\Mobile\AddressController as MobileAddressController;

// Public 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\TestimonyController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'reactView'])->name('Home.jsx');

Route::get('/login', [AuthController::class, 'loginView'])->name('Login.jsx');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [AdminProfileController::class, 'reactView'])->name('Admin/Profile.jsx');
    Route::get('/account', [AdminAccountController::class, 'reactView'])->name('Admin/Account.jsx');

    Route::middleware('can:Admin')->prefix('admin')->group(function () {
        Route::get('/', fn() => redirect()->route('Admin/Home.jsx'));
        Route::get('/home', [AdminHomeController::class, 'reactView'])->name('Admin/Home.jsx');
        Route::get('/categories', [AdminCategoryController::class, 'reactView'])->name('Admin/Categories.jsx');
        Route::get('/items', [AdminItemController::class, 'reactView'])->name('Admin/Items.jsx');
        Route::get('/restaurants', [AdminRestaurantController::class, 'reactView'])->name('Admin/Restaurants.jsx');
        Route::get('/payment-methods', [AdminPaymentMethodController::class, 'reactView'])->name('Admin/PaymentMethods.jsx');
        Route::get('/statuses', [AdminStatusController::class, 'reactView'])->name('Admin/Statuses.jsx');
        Route::get('/messages', [AdminMessageController::class, 'reactView'])->name('Admin/Messages.jsx');
        Route::get('/testimonies', [AdminTestimonyController::class, 'reactView'])->name('Admin/Testimonies.jsx');
        Route::get('/brands', [AdminBrandController::class, 'reactView'])->name('Admin/Brands.jsx');

        Route::get('/users/{role}', [AdminUserController::class, 'reactView'])->name('Admin/Users.jsx');
    });

    Route::middleware('can:Restaurant')->prefix('restaurant')->group(function () {
        Route::get('/', fn() => redirect()->route('Restaurant/Home.jsx'));
        Route::get('/home', [RestaurantHomeController::class, 'reactView'])->name('Restaurant/Home.jsx');

        Route::get('/orders', [RestaurantOrderController::class, 'reactView'])->name('Restaurant/Orders.jsx');
        Route::get('/kitchen', [RestaurantKitchenController::class, 'reactView'])->name('Restaurant/Kitchen.jsx');

        Route::get('/items', [RestaurantItemController::class, 'reactView'])->name('Restaurant/Items.jsx');
        Route::get('/users', [RestaurantUserController::class, 'reactView'])->name('Restaurant/Users.jsx');
    });

    Route::middleware('can:Kitchen')->prefix('kitchen')->group(function () {
        Route::get('/', fn() => redirect()->route('Kitchen/Kitchen.jsx'));
        Route::get('/kitchen', [KitchenOrderController::class, 'reactView'])->name('Kitchen/Kitchen.jsx');
    });
});

Route::get('/app/add-address', [MobileAddressController::class, 'reactView'])->name('Mobile/AddAddress.jsx');
