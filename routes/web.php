<?php

use Illuminate\Support\Facades\Route;

// Admin
use App\Http\Controllers\Admin\HomeController as AdminHomeController;
use App\Http\Controllers\Admin\CategoryController as AdminCategoryController;
use App\Http\Controllers\Admin\ProfileController as AdminProfileController;
use App\Http\Controllers\Admin\AccountController as AdminAccountController;
use App\Http\Controllers\Admin\ItemController as AdminItemController;
use App\Http\Controllers\Admin\RestaurantController as AdminRestaurantController;
use App\Http\Controllers\Admin\StatusController as AdminStatusController;
use App\Http\Controllers\Admin\UserController as AdminUserController;

// Restaurant
use App\Http\Controllers\Restaurant\HomeController as RestaurantHomeController;

// Public 
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RepositoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\Restaurant\ItemController as RestaurantItemController;
use App\Http\Controllers\StatusController;

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
        Route::get('/statuses', [AdminStatusController::class, 'reactView'])->name('Admin/Statuses.jsx');

        Route::get('/users/{role}', [AdminUserController::class, 'reactView'])->name('Admin/Users.jsx');
    });

    Route::middleware('can:Restaurant')->prefix('restaurant')->group(function () {
        Route::get('/', fn() => redirect()->route('Restaurant/Home.jsx'));
        Route::get('/home', [RestaurantHomeController::class, 'reactView'])->name('Restaurant/Home.jsx');

        Route::get('/items', [RestaurantItemController::class, 'reactView'])->name('Restaurant/Items.jsx');
    });
});



// // Admin routes
// Route::middleware(['can:Admin', 'auth'])->prefix('admin')->group(function () {
//     Route::get('/', fn() => redirect()->route('Admin/Home.jsx'));
//     Route::get('/home', [AdminHomeController::class, 'reactView'])->name('Admin/Home.jsx');
//     Route::get('/sales', [AdminSaleController::class, 'reactView'])->name('Admin/Sales.jsx');
//     Route::get('/sales/export-data', [AdminSaleExportController::class, 'exportData'])->name('admin.sales.export');
//     Route::get('/items', [AdminItemController::class, 'reactView'])->name('Admin/Items.jsx');
//     Route::get('/coupons', [AdminCouponController::class, 'reactView'])->name('Admin/Coupons.jsx');
//     Route::get('/discount-rules', [AdminDiscountRulesController::class, 'reactView'])->name('Admin/DiscountRules.jsx');
//     Route::get('/ads', [AdminAdController::class, 'reactView'])->name('Admin/Ads.jsx');

//     Route::get('/combos', [AdminComboController::class, 'reactView'])->name('Admin/Combos.jsx');
//     Route::get('/canvas-presets', [AdminCanvasPresetController::class, 'reactView'])->name('Admin/Presets.jsx');

//     Route::get('/categories', [AdminCategoryController::class, 'reactView'])->name('Admin/Categories.jsx');
//     Route::get('/collections', [AdminCollectionController::class, 'reactView'])->name('Admin/Collections.jsx');
//     Route::get('/subcategories', [AdminSubCategoryController::class, 'reactView'])->name('Admin/SubCategories.jsx');
//     Route::get('/brands', [AdminBrandController::class, 'reactView'])->name('Admin/Brands.jsx');
//     Route::get('/tags', [AdminTagController::class, 'reactView'])->name('Admin/Tags.jsx');
//     Route::get('/prices', [AdminDeliveryPriceController::class, 'reactView'])->name('Admin/DeliveryPricesType.jsx');
//     Route::get('/stores', [AdminStoreController::class, 'reactView'])->name('Admin/Stores.jsx');
//     Route::get('/messages', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Messages.jsx');
//     Route::get('/subscriptions', [AdminSubscriptionController::class, 'reactView'])->name('Admin/Subscriptions.jsx');

//     Route::get('/posts', [AdminPostController::class, 'reactView'])->name('Admin/Posts.jsx');
//     Route::get('/about', [AdminAboutusController::class, 'reactView'])->name('Admin/About.jsx');
//     Route::get('/delivery-zones', [AdminDeliveryZoneController::class, 'reactView'])->name('Admin/DeliveryZones.jsx');
//     Route::get('/indicators', [AdminIndicatorController::class, 'reactView'])->name('Admin/Indicators.jsx');
//     Route::get('/sliders', [AdminSliderController::class, 'reactView'])->name('Admin/Sliders.jsx');
//     Route::get('/banners', [AdminBannerController::class, 'reactView'])->name('Admin/Banners.jsx');
//     Route::get('/testimonies', [AdminTestimonyController::class, 'reactView'])->name('Admin/Testimonies.jsx');
//     Route::get('/socials', [AdminSocialController::class, 'reactView'])->name('Admin/Socials.jsx');
//     Route::get('/statuses', [AdminSaleStatusController::class, 'reactView'])->name('Admin/Statuses.jsx');
//     Route::get('/strengths', [AdminStrengthController::class, 'reactView'])->name('Admin/Strengths.jsx');
//     Route::get('/certifications', [AdminCertificationController::class, 'reactView'])->name('Admin/Certifications.jsx');
//     Route::get('/partners', [AdminPartnerController::class, 'reactView'])->name('Admin/Partners.jsx');
//     Route::get('/generals', [AdminGeneralController::class, 'reactView'])->name('Admin/Generals.jsx');
//     Route::get('/coupons', [AdminCouponController::class, 'reactView'])->name('Admin/Coupons.jsx');
//     Route::get('/faqs', [AdminFaqController::class, 'reactView'])->name('Admin/Faqs.jsx');


//     Route::get('/gallery', [AdminGalleryController::class, 'reactView'])->name('Admin/Gallery.jsx');
//     Route::get('/repository', [AdminRepositoryController::class, 'reactView'])->name('Admin/Repository.jsx');

//     Route::middleware(['can:Root'])->get('/system', [AdminSystemController::class, 'reactView'])->name('Admin/System.jsx');
// });

// Route::middleware(['can:Customer', 'auth'])->prefix('customer')->group(function () {
//     Route::get('/dashboard', [CustomerSaleController::class, 'reactView'])->name('Customer/Sales.jsx');
//     Route::get('/orders', [CustomerSaleController::class, 'reactView'])->name('Customer/Sales.jsx');
//     Route::get('/albums', [CustomerAlbumController::class, 'reactView'])->name('Customer/Albums.jsx');
// });



// // Canvas Routes - Authentication required
// Route::middleware(['auth'])->prefix('canvas')->group(function () {
//     Route::get('/editor/{project}', [CanvasController::class, 'editor'])->name('canvas.editor');
//     Route::post('/save', [CanvasController::class, 'save'])->name('canvas.save');
//     Route::get('/projects', [CanvasController::class, 'getUserProjects'])->name('canvas.projects');
//     Route::post('/export/{project}', [CanvasController::class, 'export'])->name('canvas.export');
//     Route::delete('/project/{project}', [CanvasController::class, 'deleteProject'])->name('canvas.delete');
// });

// // Test route for development
if (env('APP_ENV') === 'local') {

    Route::get('/cloud/{uuid}', [RepositoryController::class, 'media']);
}
