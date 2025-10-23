<?php

namespace Database\Seeders;

use App\Models\PaymentMethod;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PaymentMethodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $paymentMethods = [
            [
                "id" => "8c7fd44b-b64f-47b8-a9e7-50d4922c50d8",
                "name" =>  "Efectivo",
                "description" =>  "Pago en moneda física. El repartidor puede necesitar llevar vuelto.",
                "visible" =>  true
            ],
            [
                "name" =>  "Billetera Digital",
                "description" =>  "Pago mediante aplicaciones como Yape, Plin u otras billeteras móviles.",
                "visible" =>  true
            ],
            [
                "name" =>  "Transferencia Bancaria",
                "description" =>  "Pago mediante transferencia desde una cuenta bancaria.",
                "visible" =>  true
            ],
            [
                "name" =>  "Tarjeta",
                "description" =>  "Pago con tarjeta de débito o crédito a través de POS o pasarela digital.",
                "visible" =>  false
            ],
            [
                "name" =>  "Cripto",
                "description" =>  "Pago utilizando criptomonedas como USDT o Bitcoin.",
                "visible" =>  false
            ]
        ];

        foreach ($paymentMethods as $method) {
            PaymentMethod::updateOrCreate(['name' => $method['name']], $method);
        }
    }
}
