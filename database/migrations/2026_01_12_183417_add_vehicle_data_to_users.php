<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone_prefix')->nullable()->default('51');
            $table->string('license_number')->nullable();
            $table->string('vehicle_type')->nullable();
            $table->string('plate_number')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone_prefix');
            $table->dropColumn('license_number');
            $table->dropColumn('vehicle_type');
            $table->dropColumn('plate_number');
        });
    }
};
