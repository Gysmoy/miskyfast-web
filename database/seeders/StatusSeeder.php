<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurantStatuses = [
            [
                'id' => '56844089-7edf-4c9e-9d09-6874624c37b2',
                'name' => 'PENDIENTE',
                'description' => 'Pedido recibido, en espera de confirmación',
                'color' => '#FFA500', // naranja
                'type' => 'order',
                'is_ok' => false,
                'status' => true,
            ],
            [
                'name' => 'CONFIRMADO',
                'description' => 'Pedido aceptado por el restaurante',
                'color' => '#007BFF', // azul
                'type' => 'order',
                'is_ok' => false,
                'status' => true,
            ],
            [
                'name' => 'PREPARANDO',
                'description' => 'El pedido está en preparación',
                'color' => '#17A2B8', // celeste
                'type' => 'order',
                'is_ok' => false,
                'status' => true,
            ],
            [
                'name' => 'LISTO PARA RECOJO',
                'description' => 'El pedido está listo para ser recogido por el delivery',
                'color' => '#28A745', // verde
                'type' => 'order',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'ENTREGADO',
                'description' => 'El pedido fue entregado correctamente al cliente',
                'color' => '#4CAF50', // verde más claro
                'type' => 'order',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'CANCELADO',
                'description' => 'El pedido fue cancelado',
                'color' => '#DC3545', // rojo
                'type' => 'order',
                'is_ok' => false,
                'status' => true,
            ],
        ];

        $deliveryStatuses = [
            [
                'id' => '8617ebd8-575a-494e-bb35-3ed380f42dd5',
                'name' => 'DISPONIBLE',
                'description' => 'Delivery disponible para tomar pedidos',
                'color' => '#6C757D', // gris
                'type' => 'delivery',
                'is_ok' => false,
                'status' => true,
            ],
            [
                'name' => 'ASIGNADO',
                'description' => 'Pedido asignado al delivery',
                'color' => '#007BFF', // azul
                'type' => 'delivery',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'RUMBO AL RESTAURANTE',
                'description' => 'El delivery se dirige al restaurante para recoger el pedido',
                'color' => '#17A2B8', // celeste
                'type' => 'delivery',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'PEDIDO RECOGIDO',
                'description' => 'El delivery ya recogió el pedido del restaurante',
                'color' => '#28A745', // verde
                'type' => 'delivery',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'EN CAMINO AL CLIENTE',
                'description' => 'El delivery está llevando el pedido al cliente',
                'color' => '#20C997', // verde claro
                'type' => 'delivery',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'ENTREGADO',
                'description' => 'El pedido fue entregado al cliente por el delivery',
                'color' => '#4CAF50', // verde más claro
                'type' => 'delivery',
                'is_ok' => true,
                'status' => true,
            ],
            [
                'name' => 'NO ENTREGADO',
                'description' => 'El pedido no pudo ser entregado o hubo incidencia',
                'color' => '#DC3545', // rojo
                'type' => 'delivery',
                'is_ok' => false,
                'status' => true,
            ],
        ];

        foreach (array_merge($restaurantStatuses, $deliveryStatuses) as $status) {
           Status::create($status);
        }
    }
}
