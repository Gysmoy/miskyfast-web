<?php

use App\Models\Brand;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->string('name');
            $table->string('image')->nullable();

            $table->timestamps();
        });

        $brands = [
            ['icon' => '🍔', 'name' => 'Burger King'],
            ['icon' => '🍕', 'name' => 'Pizza Hut'],
            ['icon' => '🍗', 'name' => 'KFC'],
            ['icon' => '🌮', 'name' => 'Taco Bell'],
            ['icon' => '🥪', 'name' => 'Subway'],
            ['icon' => '🍕', 'name' => 'Dominos'],
            ['icon' => '🍔', 'name' => 'McDonalds'],
            ['icon' => '🍗', 'name' => 'Popeyes'],
            ['icon' => '🌶️', 'name' => 'Chilis'],
            ['icon' => '☕', 'name' => 'Starbucks'],
            ['icon' => '🍩', 'name' => 'Dunkin'],
            ['icon' => '🍔', 'name' => 'Wendys'],
        ];

        foreach ($brands as $brand) {
            Brand::create(['name' => $brand['name']]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('brands');
    }
};
