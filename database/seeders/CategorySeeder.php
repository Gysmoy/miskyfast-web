<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                "id" => "a00337c8-bf8a-4601-a320-f8b50fcabd11",
                "name" => "Pollos a la Brasa",
                "description" => "Clásicos peruanos con papas, ensaladas y cremas. Ideal para compartir en familia.",
                "image" => "c92ea461-9253-461e-a3d8-d423c131fed7.jpg",
                "featured" => true,
            ],
            [
                "id" => "a00339a8-75a0-422e-8a74-465c6972a302",
                "name" => "Parrillas y Carnes",
                "description" => "Cortes a la parrilla, anticuchos, chorizos y todo lo que viene con carbón y humo.",
                "image" => "6bf25c22-94ea-4e3d-881c-600b6d02840a.png",
                "featured" => true,
            ],
            [
                "id" => "a0033a2f-e822-4db2-a423-5f8bad74946d",
                "name" => "Comida Marina / Ceviches",
                "description" => "Ceviches, jaleas, chicharrones y platos frescos del mar directo a tu mesa.",
                "image" => "4d23feff-45ad-4e7b-bb4f-ed8a3d773d75.jpg",
                "featured" => false,
            ],
            [
                "id" => "a0033ab7-cf22-44f4-a43c-321ac9e2b248",
                "name" => "Hamburguesas y Sandwiches",
                "description" => "Desde artesanales hasta callejeros, con combos y muchos toppings.",
                "image" => "f15dc4c4-c28d-440f-9ad7-5b25e390030b.jpg",
                "featured" => true,
            ],
            [
                "id" => "a0033af2-33e1-431e-83e8-b8acbd5a8183",
                "name" => "Pizzas y Pastas",
                "description" => "Masa delgada, estilo americano, lasañas, fettuccini y más carbohidratos felices.",
                "image" => "519e27b6-9127-45cf-a49d-ee809b705dca.webp",
                "featured" => false,
            ],
            [
                "id" => "a0033b27-538c-40ab-a1b7-d272ee422b6f",
                "name" => "Comida Criolla / Casera",
                "description" => "Ají de gallina, lomo saltado, arroz con pollo y todo lo que sabe a domingo en casa.",
                "image" => "553252c8-a554-4374-8993-eaea65ce476e.jpg",
                "featured" => true,
            ],
            [
                "id" => "a0033b63-d1da-4cf9-bb14-524d956802b8",
                "name" => "Wok / Chifa / Oriental",
                "description" => "Saltados al wok, arroz chaufa, tallarines y fusiones asiáticas.",
                "image" => "ff8ebe12-7093-43d7-b75f-a6151643baff.jpg",
                "featured" => true,
            ],
            [
                "id" => "a0033bc0-1485-4fcf-bbdf-25cf4d25ff3f",
                "name" => "Ensaladas y Saludable",
                "description" => "Bowls, wraps, opciones light y alimentos pensados para equilibrar el ceviche de ayer 😆",
                "image" => "5f439d3e-f309-4a0e-ad2d-92ce9f42360e.jpg",
                "featured" => false,
            ],
            [
                "id" => "a0033c76-de42-4f91-9e2c-914bb16ada5d",
                "name" => "Jugos y Bebidas",
                "description" => "Refrescantes naturales, frutados, fríos o energéticos para acompañar tu pedido.",
                "image" => "0ed3001e-9f6d-412f-a4b3-6b9496adb96a.jpg",
                "featured" => true,
            ],
            [
                "id" => "a0033ce1-1ddf-45a9-b11b-65b2759fc088",
                "name" => "Postres y Dulces",
                "description" => "Tortas, helados, brownies, picarones y todos los gustitos culpables.",
                "image" => "50078bc2-e2de-4812-81a6-7732bf99e70e.jpg",
                "featured" => false,
            ],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate([
                'id' => $category['id']
            ], $category);
        }
    }
}
