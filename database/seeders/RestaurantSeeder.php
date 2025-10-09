<?php

namespace Database\Seeders;

use App\Models\Restaurant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RestaurantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $restaurants = [
            [
                "id" => "2b7cf9ad-bf9b-4ac5-9e2c-6c3a2f2c1d7f",
                "name" => "El Cameycar",
                "description" => "Clásico ayacuchano especializado en comida criolla y cuy al horno.",
                "address" => "Mirador Acuchimay, Ayacucho",
            ],
            [
                "id" => "c84baf83-52fa-4e8d-bc31-7755e2d62f12",
                "name" => "Restaurante Las Flores",
                "description" => "Platos tradicionales como puca picante, trucha frita y chicharrón.",
                "address" => "Jirón José Olaya 106, Ayacucho",
            ],
            [
                "id" => "7a3164fb-2c9e-4e2e-8f52-56c47b322a8a",
                "name" => "Recreo Campestre Muyurina",
                "description" => "Truchas frescas y platos de campo en ambiente natural.",
                "address" => "Carretera a Quinua, 10 min de Huamanga",
            ],
            [
                "id" => "ddf33c69-94e0-4ec9-8c0a-943c41f7f9c9",
                "name" => "Sukre Cocina Peruana",
                "description" => "Versión moderna de clásicos peruanos como ají de gallina y quinotto.",
                "address" => "Portal Constitución 8, Plaza Mayor de Ayacucho",
            ],
            [
                "id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "name" => "Carbon y Vino",
                "description" => "Carnes a la parrilla y vinos en ambiente familiar.",
                "address" => "Jirón Bellido 593, Ayacucho",
            ],
            [
                "id" => "9d6ffbe2-9495-44b8-a704-1c4b4b5b0d6b",
                "name" => "Magia Negra Trattoria",
                "description" => "Pizzas artesanales y pastas en ambiente tipo taberna.",
                "address" => "Jirón Bellido 349, Ayacucho",
            ],
            [
                "id" => "2e84db23-3b2f-4f8a-bd3c-f93c83bfcf41",
                "name" => "ViaVia Café",
                "description" => "Café con vista a la plaza, desayunos y hamburguesas.",
                "address" => "Portal Constitución 4, Plaza Mayor",
            ],
            [
                "id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "name" => "La Miel",
                "description" => "Cafetería con postres caseros y jugos frescos.",
                "address" => "Portal Constitución 11, Plaza Mayor",
            ],
        ];

        foreach ($restaurants as $restaurant) {
            Restaurant::updateOrCreate([
                'id' => $restaurant['id']
            ], $restaurant);
        }
    }
}
