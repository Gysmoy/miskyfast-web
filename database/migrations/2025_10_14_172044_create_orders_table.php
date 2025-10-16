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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->foreignId('client_id')->constrained('users');
            $table->foreignUuid('restaurant_id')->constrained('restaurants');
            $table->foreignId('delivery_id')->nullable()->constrained('users');
            
            $table->foreignUuid('status_id')->constrained('statuses');
            $table->foreignUuid('delivery_status_id')->constrained('statuses');

            $table->foreignUuid('payment_method_id')->constrained('payment_methods');
            $table->longText('payment_method_note')->nullable();

            $table->point('location')->nullable();

            $table->decimal('total_amount', 10, 2);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
