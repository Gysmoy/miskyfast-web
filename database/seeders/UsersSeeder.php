<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Restaurant', 'Client', 'Delivery'];
        foreach ($roles as $role) {
            User::updateOrCreate([
                'email' => strtolower($role) . '@mundoweb.pe'
            ], [
                'name' => $role,
                'lastname' => 'MundoWeb',
                'password' => '12345678'
            ])->assignRole($role);
        }
    }
}
