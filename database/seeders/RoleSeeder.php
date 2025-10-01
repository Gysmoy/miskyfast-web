<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use SoDe\Extend\Crypto;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['Admin', 'Restaurant', 'Client', 'Delivery'];
        foreach ($roles as $role) {
            Role::updateOrCreate(['name' => $role], [
                'relative_id' => Crypto::randomUUID()
            ]);
            Permission::updateOrCreate(['name' => $role], ['name' => $role])
                ->syncRoles([$role]);
        }
    }
}
