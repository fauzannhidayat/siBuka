<?php

namespace Database\Seeders;

use App\Models\Departement;
use App\Models\User;
use Database\Factories\DepartmentFactory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Departement::factory(3)->create();

        User::factory()->create([
            'name' => 'Fauzan',
            'email' => 'fauzan@example.com',
            'password' => bcrypt('ozan1407'),
            'email_verified_at' => time(),
            'role' => 'general',
            'department_id' => 1
        ]);
        User::factory()->create([
            'name' => 'Fauz',
            'email' => 'fauz@example.com',
            'password' => bcrypt('ozan1407'),
            'email_verified_at' => time(),
            'role' => 'department',
            'department_id' => 2
        ]);
        User::factory()->create([
            'name' => 'Fau',
            'email' => 'fau@example.com',
            'password' => bcrypt('ozan1407'),
            'email_verified_at' => time(),
            'role' => 'department',
            'department_id' => 3
        ]);
    }
}
