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
                'can_order' => false,
                'order' => 0
            ],
            [
                'id' => 'be7e24c9-a3e4-444e-adab-bb301b4ccce3',
                'name' => 'CONFIRMADO',
                'description' => 'Pedido aceptado por el restaurante',
                'color' => '#007BFF', // azul
                'type' => 'order',
                'is_ok' => true,
                'can_order' => false,
                'order' => 1,
                'trackeable' => true
            ],
            [
                'id' => '1eb603e6-e078-4f9f-8c86-25a363742518',
                'name' => 'PREPARANDO',
                'description' => 'El pedido está en preparación',
                'color' => '#17A2B8', // celeste
                'type' => 'order',
                'is_ok' => true,
                'can_order' => false,
                'order' => 2
            ],
            [
                'id' => 'f0a538f0-8aef-4ca7-80d1-297ab6c58279',
                'name' => 'LISTO PARA RECOJO',
                'description' => 'El pedido está listo para ser recogido',
                'color' => '#28A745', // verde
                'type' => 'order',
                'is_ok' => true,
                'can_order' => false,
                'order' => 3,
                'trackeable' => true
            ],
            [
                'id' => 'f7b3f073-c8bf-49c9-ba6d-fcdfe82395dc',
                'name' => 'ENTREGADO',
                'description' => 'El pedido fue entregado por el restaurante',
                'color' => '#4CAF50', // verde más claro
                'type' => 'order',
                'is_ok' => true,
                'can_order' => true,
                'order' => 4
            ],
            [
                'id' => 'ea4578c1-f0c7-4495-ade5-a82b5ca7cc4b',
                'name' => 'CANCELADO',
                'description' => 'El pedido fue cancelado',
                'color' => '#DC3545', // rojo
                'type' => 'order',
                'is_ok' => false,
                'can_order' => true
            ],
        ];

        $deliveryStatuses = [
            [
                'id' => '8617ebd8-575a-494e-bb35-3ed380f42dd5',
                'name' => 'DISPONIBLE',
                'description' => 'Pedido disponible para ser llevado',
                'color' => '#6C757D', // gris
                'type' => 'delivery',
                'is_ok' => false,
                'can_order' => false,
                'order' => 0
            ],
            [
                'id' => 'a0618dce-5d1b-4fae-a0bb-735d5c85270b',
                'name' => 'ASIGNADO',
                'description' => 'Pedido asignado al delivery',
                'color' => '#007BFF', // azul
                'type' => 'delivery',
                'is_ok' => true,
                'can_order' => false,
                'order' => 2
            ],
            [
                'id' => 'a0618dce-5e6f-479c-af94-98a36ef6a6d6',
                'name' => 'RUMBO AL RESTAURANTE',
                'description' => 'El delivery se dirige al restaurante para recoger el pedido',
                'color' => '#17A2B8', // celeste
                'type' => 'delivery',
                'is_ok' => true,
                'can_order' => false,
                'order' => 3
            ],
            [
                'id' => 'a0618dce-5fe8-4aa8-92c4-1797f9bc5618',
                'name' => 'PEDIDO RECOGIDO',
                'description' => 'El delivery ya recogió el pedido del restaurante',
                'color' => '#28A745', // verde
                'type' => 'delivery',
                'is_ok' => true,
                'can_order' => false,
                'order' => 4,
                'trackeable' => true
            ],
            [
                'id' => 'a0618dce-61c4-46b1-813e-338332d2d5de',
                'name' => 'EN CAMINO AL CLIENTE',
                'description' => 'El delivery está llevando el pedido al cliente',
                'color' => '#20C997', // verde claro
                'type' => 'delivery',
                'is_ok' => true,
                'can_order' => false,
                'order' => 5
            ],
            [
                'id' => 'a0618dce-62e9-4720-8e1f-10f3208c357e',
                'name' => 'ENTREGADO',
                'description' => 'El pedido fue entregado al cliente por el delivery',
                'color' => '#4CAF50', // verde más claro
                'type' => 'delivery',
                'is_ok' => true,
                'can_order' => true,
                'order' => 6,
                'trackeable' => true
            ],
            [
                'id' => 'a0618dce-63fc-4e31-8a53-c6dd39ed54d3',
                'name' => 'NO ENTREGADO',
                'description' => 'El pedido no pudo ser entregado o hubo incidencia',
                'color' => '#DC3545', // rojo
                'type' => 'delivery',
                'is_ok' => false,
                'can_order' => true
            ],
        ];

        foreach (array_merge($restaurantStatuses, $deliveryStatuses) as $status) {
            Status::create($status);
        }
    }
}
