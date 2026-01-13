<?php

use App\Models\Testimony;
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
        Schema::create('testimonies', function (Blueprint $table) {
            $table->uuid('id')->default(DB::raw('(UUID())'))->primary();

            $table->string('image');
            $table->string('name');
            $table->string('position');
            $table->text('description');
            $table->integer('rating')->default(0);
            $table->boolean('visible')->default(true);
            $table->boolean('status')->default(true);

            $table->timestamps();
        });

        $testimonials = [
            [
                'name' => 'María González',
                'position' => 'Cliente Frecuente',
                'description' => 'El servicio es increíble. Siempre llega caliente y a tiempo. Los motorizados son muy amables y profesionales.',
                'rating' => 5,
            ],
            [
                'name' => 'Carlos Ramírez',
                'position' => 'Dueño de Restaurante',
                'description' => 'Desde que me asocié con Misky Fast, mis ventas aumentaron un 40%. La plataforma es fácil de usar y el apoyo es excelente.',
                'rating' => 5,
            ],
            [
                'name' => 'Ana Torres',
                'position' => 'Clienta',
                'description' => 'Me encanta poder pagar contra entrega. Es muy conveniente y seguro. Definitivamente mi app favorita de delivery.',
                'rating' => 4,
            ],
            [
                'name' => 'Roberto Silva',
                'position' => 'Motorizado',
                'description' => 'Trabajo flexible y buenos ingresos. La app es intuitiva y el sistema de bonos es motivador. Muy contento con Misky Fast.',
                'rating' => 4,
            ],
            [
                'name' => 'Lucía Medina',
                'position' => 'Cliente',
                'description' => 'La variedad de restaurantes es impresionante. Siempre encuentro algo nuevo para probar. El servicio es de primera.',
                'rating' => 5,
            ],
            [
                'name' => 'Diego Vargas',
                'position' => 'Dueño de Restaurante',
                'description' => 'La mejor decisión fue unirme a esta plataforma. El proceso fue muy simple y ahora llego a más clientes cada día.',
                'rating' => 5,
            ],
        ];

        foreach ($testimonials as $testimony) {
            Testimony::create($testimony);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('testimonies');
    }
};
