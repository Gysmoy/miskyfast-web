<?php

namespace Database\Seeders;

use App\Models\Item;
use Illuminate\Database\Seeder;
use SoDe\Extend\Crypto;

class ItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $items = [
            // 🍗 El Cameycar — Criolla, Pollos, Parrillas
            [
                'restaurant_id' => '2b7cf9ad-bf9b-4ac5-9e2c-6c3a2f2c1d7f',
                'category_id' => 'a0033b27-538c-40ab-a1b7-d272ee422b6f', // Criolla
                'name' => 'Cuy al horno',
                'description' => 'Cuy al horno doradito acompañado de papas, ensalada y ají molido.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => '1/2 cuy', 'price' => 25.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Entero', 'price' => 45.00],
                ],
            ],
            [
                'restaurant_id' => '2b7cf9ad-bf9b-4ac5-9e2c-6c3a2f2c1d7f',
                'category_id' => 'a00337c8-bf8a-4601-a320-f8b50fcabd11', // Pollos
                'name' => 'Pollo a la brasa clásico',
                'description' => 'Pollo dorado al carbón con papas y ensalada.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => '1/4', 'price' => 15.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => '1/2', 'price' => 25.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Entero', 'price' => 45.00],
                ],
            ],
            [
                'restaurant_id' => '2b7cf9ad-bf9b-4ac5-9e2c-6c3a2f2c1d7f',
                'category_id' => 'a00339a8-75a0-422e-8a74-465c6972a302', // Parrillas
                'name' => 'Anticuchos de corazón',
                'description' => 'Brochetas de corazón con papa y choclo.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => '3 palitos', 'price' => 18.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => '5 palitos', 'price' => 25.00],
                ],
            ],
            [
                'restaurant_id' => '2b7cf9ad-bf9b-4ac5-9e2c-6c3a2f2c1d7f',
                'category_id' => 'a0033c76-de42-4f91-9e2c-914bb16ada5d', // Bebidas
                'name' => 'Chicha morada',
                'description' => 'Refrescante chicha morada con canela y clavo.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Vaso', 'price' => 4.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Jarra', 'price' => 12.00],
                ],
            ],

            // 🐟 Restaurante Las Flores — Marina, Criolla, Wok
            [
                'restaurant_id' => 'c84baf83-52fa-4e8d-bc31-7755e2d62f12',
                'category_id' => 'a0033a2f-e822-4db2-a423-5f8bad74946d',
                'name' => 'Ceviche de trucha',
                'description' => 'Trucha marinada al estilo ayacuchano con ají limo.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Clásico', 'price' => 20.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Mixto', 'price' => 25.00],
                ],
            ],
            [
                'restaurant_id' => 'c84baf83-52fa-4e8d-bc31-7755e2d62f12',
                'category_id' => 'a0033b27-538c-40ab-a1b7-d272ee422b6f',
                'name' => 'Puca picante',
                'description' => 'Papa con maní, ají colorado y chicharrón crujiente.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Plato', 'price' => 18.00],
                ],
            ],
            [
                'restaurant_id' => 'c84baf83-52fa-4e8d-bc31-7755e2d62f12',
                'category_id' => 'a0033b63-d1da-4cf9-bb14-524d956802b8', // Wok
                'name' => 'Chaufa de mariscos',
                'description' => 'Arroz frito con calamar, camarones y ostiones.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Plato', 'price' => 24.00],
                ],
            ],
            [
                'restaurant_id' => 'c84baf83-52fa-4e8d-bc31-7755e2d62f12',
                'category_id' => 'a0033c76-de42-4f91-9e2c-914bb16ada5d',
                'name' => 'Limonada frozen',
                'description' => 'Refrescante y helada, con toque de menta.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Vaso', 'price' => 6.00],
                ],
            ],

            // 🌿 Muyurina — Campo, Truchas, Criolla
            [
                'restaurant_id' => '7a3164fb-2c9e-4e2e-8f52-56c47b322a8a',
                'category_id' => 'a0033a2f-e822-4db2-a423-5f8bad74946d',
                'name' => 'Trucha a la parrilla',
                'description' => 'Servida con papas nativas y ensalada criolla.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Plato', 'price' => 25.00],
                ],
            ],
            [
                'restaurant_id' => '7a3164fb-2c9e-4e2e-8f52-56c47b322a8a',
                'category_id' => 'a00339a8-75a0-422e-8a74-465c6972a302',
                'name' => 'Parrilla de campo',
                'description' => 'Mix de carnes al carbón con papas doradas.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Personal', 'price' => 35.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Familiar', 'price' => 60.00],
                ],
            ],
            [
                'restaurant_id' => '7a3164fb-2c9e-4e2e-8f52-56c47b322a8a',
                'category_id' => 'a0033c76-de42-4f91-9e2c-914bb16ada5d',
                'name' => 'Jugo de papaya arequipeña',
                'description' => 'Natural, dulce y lleno de energía.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Vaso', 'price' => 6.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Jarra', 'price' => 15.00],
                ],
            ],

            // 🍛 Sukre Cocina Peruana — Moderna, Criolla, Pastas
            [
                'restaurant_id' => 'ddf33c69-94e0-4ec9-8c0a-943c41f7f9c9',
                'category_id' => 'a0033b27-538c-40ab-a1b7-d272ee422b6f',
                'name' => 'Ají de gallina moderno',
                'description' => 'Versión gourmet del clásico peruano con papas nativas.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Plato', 'price' => 27.00],
                ],
            ],
            [
                'restaurant_id' => 'ddf33c69-94e0-4ec9-8c0a-943c41f7f9c9',
                'category_id' => 'a0033af2-33e1-431e-83e8-b8acbd5a8183',
                'name' => 'Quinotto',
                'description' => 'Risotto de quinua con queso andino.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Plato', 'price' => 28.00],
                ],
            ],
            [
                'restaurant_id' => 'ddf33c69-94e0-4ec9-8c0a-943c41f7f9c9',
                'category_id' => 'a0033c76-de42-4f91-9e2c-914bb16ada5d',
                'name' => 'Limonada hierbaluisa',
                'description' => 'Refrescante, natural y aromática.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Vaso', 'price' => 5.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Jarra', 'price' => 14.00],
                ],
            ],

            // 🥩 Carbón y Vino — Parrillas, Vinos, Pastas
            [
                'restaurant_id' => '40d2a6db-bb1c-4975-8c3c-3b0a143b7baf',
                'category_id' => 'a00339a8-75a0-422e-8a74-465c6972a302',
                'name' => 'Bife de chorizo',
                'description' => 'Corte argentino con chimichurri y papas fritas.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => '250g', 'price' => 42.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => '400g', 'price' => 58.00],
                ],
            ],
            [
                'restaurant_id' => '40d2a6db-bb1c-4975-8c3c-3b0a143b7baf',
                'category_id' => 'a0033c76-de42-4f91-9e2c-914bb16ada5d',
                'name' => 'Vino tinto reserva',
                'description' => 'Copa o botella de vino reserva de la casa.',
                'presentations' => [
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Copa', 'price' => 15.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => 'Botella', 'price' => 65.00],
                ],
            ],
            [
                "name" => "Bife de chorizo a la parrilla",
                "description" => "Corte jugoso con papas rústicas, ensalada y chimichurri.",
                "category_id" => "a00339a8-75a0-422e-8a74-465c6972a302", // Parrillas y Carnes
                "restaurant_id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "300g", "price" => 42.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "500g", "price" => 58.00]
                ]
            ],
            [
                "name" => "Anticuchos de corazón",
                "description" => "Clásicos anticuchos al carbón con papas y ají criollo.",
                "category_id" => "a00339a8-75a0-422e-8a74-465c6972a302",
                "restaurant_id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "3 palitos", "price" => 18.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "5 palitos", "price" => 25.00]
                ]
            ],
            [
                "name" => "Pollo a la brasa clásico",
                "description" => "Jugoso y dorado al carbón, acompañado de papas fritas y ensalada.",
                "category_id" => "a00337c8-bf8a-4601-a320-f8b50fcabd11", // Pollos a la Brasa
                "restaurant_id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "1/4 pollo", "price" => 15.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "1/2 pollo", "price" => 25.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "1 pollo", "price" => 42.00]
                ]
            ],
            [
                "name" => "Chorizo artesanal",
                "description" => "Chorizo al carbón con papas al horno y salsa criolla.",
                "category_id" => "a00339a8-75a0-422e-8a74-465c6972a302",
                "restaurant_id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Porción", "price" => 22.00]
                ]
            ],
            [
                "name" => "Vino de la casa",
                "description" => "Vino tinto seleccionado para acompañar las carnes.",
                "category_id" => "a0033c76-de42-4f91-9e2c-914bb16ada5d", // Jugos y Bebidas
                "restaurant_id" => "40d2a6db-bb1c-4975-8c3c-3b0a143b7baf",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Copa", "price" => 18.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "Botella", "price" => 65.00]
                ]
            ],

            // ——————————————————————————————————————————————
            // 🍕 MAGIA NEGRA TRATTORIA
            // ——————————————————————————————————————————————
            [
                "name" => "Pizza cuatro quesos",
                "description" => "Combinación cremosa de mozzarella, parmesano, gorgonzola y provolone.",
                "category_id" => "a0033af2-33e1-431e-83e8-b8acbd5a8183", // Pizzas y Pastas
                "restaurant_id" => "9d6ffbe2-9495-44b8-a704-1c4b4b5b0d6b",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Mediana", "price" => 32.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "Grande", "price" => 42.00]
                ]
            ],
            [
                "name" => "Lasagna boloñesa",
                "description" => "Capas de pasta, carne y queso gratinado al horno.",
                "category_id" => "a0033af2-33e1-431e-83e8-b8acbd5a8183",
                "restaurant_id" => "9d6ffbe2-9495-44b8-a704-1c4b4b5b0d6b",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Porción", "price" => 28.00]
                ]
            ],
            [
                "name" => "Tiramisú artesanal",
                "description" => "Clásico postre italiano con mascarpone y cacao.",
                "category_id" => "a0033ce1-1ddf-45a9-b11b-65b2759fc088", // Postres
                "restaurant_id" => "9d6ffbe2-9495-44b8-a704-1c4b4b5b0d6b",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Porción", "price" => 14.00]
                ]
            ],
            [
                "name" => "Limonada con menta",
                "description" => "Refrescante mezcla cítrica con hojas de menta natural.",
                "category_id" => "a0033c76-de42-4f91-9e2c-914bb16ada5d",
                "restaurant_id" => "9d6ffbe2-9495-44b8-a704-1c4b4b5b0d6b",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Vaso", "price" => 8.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "Jarra", "price" => 16.00]
                ]
            ],

            // ——————————————————————————————————————————————
            // ☕ VIA VIA CAFÉ
            // ——————————————————————————————————————————————
            [
                "name" => "Hamburguesa ViaVia",
                "description" => "Doble carne, queso, tocino y papas fritas.",
                "category_id" => "a0033ab7-cf22-44f4-a43c-321ac9e2b248", // Hamburguesas
                "restaurant_id" => "2e84db23-3b2f-4f8a-bd3c-f93c83bfcf41",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Individual", "price" => 22.00],
                    ['id' => Crypto::randomUUID(), 'presentation' => "Combo con bebida", "price" => 26.00]
                ]
            ],
            [
                "name" => "Café americano",
                "description" => "Café filtrado intenso para arrancar el día.",
                "category_id" => "a0033c76-de42-4f91-9e2c-914bb16ada5d", // Bebidas
                "restaurant_id" => "2e84db23-3b2f-4f8a-bd3c-f93c83bfcf41",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Taza", "price" => 8.00]
                ]
            ],
            [
                "name" => "Pancakes con miel y frutas",
                "description" => "Desayuno dulce con frutas frescas y miel artesanal.",
                "category_id" => "a0033ce1-1ddf-45a9-b11b-65b2759fc088", // Postres
                "restaurant_id" => "2e84db23-3b2f-4f8a-bd3c-f93c83bfcf41",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "3 unidades", "price" => 16.00]
                ]
            ],
            [
                "name" => "Sandwich de jamón serrano",
                "description" => "Pan artesanal con jamón, queso y pesto.",
                "category_id" => "a0033ab7-cf22-44f4-a43c-321ac9e2b248",
                "restaurant_id" => "2e84db23-3b2f-4f8a-bd3c-f93c83bfcf41",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Individual", "price" => 18.00]
                ]
            ],

            // ——————————————————————————————————————————————
            // 🍯 LA MIEL
            // ——————————————————————————————————————————————
            [
                "name" => "Waffles con frutas y miel",
                "description" => "Crujientes waffles caseros con frutas de temporada.",
                "category_id" => "a0033ce1-1ddf-45a9-b11b-65b2759fc088", // Postres y Dulces
                "restaurant_id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Porción", "price" => 14.00]
                ]
            ],
            [
                "name" => "Jugo detox verde",
                "description" => "Mezcla saludable de piña, espinaca y jengibre.",
                "category_id" => "a0033bc0-1485-4fcf-bbdf-25cf4d25ff3f", // Ensaladas y Saludable
                "restaurant_id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Vaso", "price" => 9.00]
                ]
            ],
            [
                "name" => "Smoothie de frutos rojos",
                "description" => "Batido natural de fresa, arándano y yogurt.",
                "category_id" => "a0033c76-de42-4f91-9e2c-914bb16ada5d", // Jugos y Bebidas
                "restaurant_id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Vaso", "price" => 10.00]
                ]
            ],
            [
                "name" => "Torta de zanahoria",
                "description" => "Bizcocho húmedo con glaseado de queso crema.",
                "category_id" => "a0033ce1-1ddf-45a9-b11b-65b2759fc088",
                "restaurant_id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Porción", "price" => 12.00]
                ]
            ],
            [
                "name" => "Ensalada tropical",
                "description" => "Mix de frutas, yogurt y granola.",
                "category_id" => "a0033bc0-1485-4fcf-bbdf-25cf4d25ff3f",
                "restaurant_id" => "12f83fa6-b19a-4f35-8428-befdc15c073a",
                "presentations" => [
                    ['id' => Crypto::randomUUID(), 'presentation' => "Bowl", "price" => 15.00]
                ]
            ]
        ];
        foreach ($items as $item) {
            $lowestPrice = collect($item['presentations'])->min('price');
            $item['price'] = $lowestPrice ?? 0;
            Item::create($item);
        }
    }
}
