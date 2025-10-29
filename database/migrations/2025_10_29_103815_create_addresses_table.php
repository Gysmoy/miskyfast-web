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
        Schema::create('addresses', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            $table->string('name')->nullable();
            $table->string('department');
            $table->string('city');
            $table->string('district')->nullable();
            $table->string('street');
            $table->string('number')->nullable();
            $table->longText('reference')->nullable();

            $table->decimal('latitude', 10, 7);
            $table->decimal('longitude', 10, 7);

            $table->boolean('is_default')->default(false);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
