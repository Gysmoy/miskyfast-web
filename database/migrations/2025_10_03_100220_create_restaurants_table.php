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

        DB::table('restaurants')->insert([
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'El Cameycar',
            'description' => 'Clásico ayacuchano especializado en comida criolla y cuy al horno.',
            'address' => 'Mirador Acuchimay, Ayacucho',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'Restaurante Las Flores',
            'description' => 'Platos tradicionales como puca picante, trucha frita y chicharrón.',
            'address' => 'Jirón José Olaya 106, Ayacucho',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'Recreo Campestre Muyurina',
            'description' => 'Truchas frescas y platos de campo en ambiente natural.',
            'address' => 'Carretera a Quinua, 10 min de Huamanga',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'Sukre Cocina Peruana',
            'description' => 'Versión moderna de clásicos peruanos como ají de gallina y quinotto.',
            'address' => 'Portal Constitución 8, Plaza Mayor de Ayacucho',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'Carbon y Vino',
            'description' => 'Carnes a la parrilla y vinos en ambiente familiar.',
            'address' => 'Jirón Bellido 593, Ayacucho',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'Magia Negra Trattoria',
            'description' => 'Pizzas artesanales y pastas en ambiente tipo taberna.',
            'address' => 'Jirón Bellido 349, Ayacucho',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'ViaVia Café',
            'description' => 'Café con vista a la plaza, desayunos y hamburguesas.',
            'address' => 'Portal Constitución 4, Plaza Mayor',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
        [
            'id' => DB::raw('(UUID())'),
            'name' => 'La Miel',
            'description' => 'Cafetería con postres caseros y jugos frescos.',
            'address' => 'Portal Constitución 11, Plaza Mayor',
            'banner' => null,
            'phone_prefix' => '+51',
            'phone' => null,
        ],
    ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('restaurants');
    }
};
