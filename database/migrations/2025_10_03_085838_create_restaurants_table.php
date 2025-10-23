<?php

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
        Schema::create('restaurants', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->string('name');
            $table->longText('description')->nullable();
            $table->longText('address')->nullable();
            $table->string('banner')->nullable();
            $table->string('logo')->nullable();
            $table->string('phone_prefix')->nullable();
            $table->string('phone')->nullable();

            $table->boolean('featured')->default(true);
            $table->boolean('visible')->default(true);
            $table->boolean('status')->default(true)->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
