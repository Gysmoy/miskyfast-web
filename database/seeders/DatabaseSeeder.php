<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            UsersSeeder::class,
            CategorySeeder::class,
            RestaurantSeeder::class,
            ItemSeeder::class,
            StatusSeeder::class,
            PaymentMethodSeeder::class
        ]);
    }
}
