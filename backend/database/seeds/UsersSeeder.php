<?php

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                "name" => "Admin User",
                "phone" => "000-000-0000",
                "email" => "admin@test.com",
                "password" => "password",
                "role" => 1,
            ],
            [
                "name" => "Normal User",
                "phone" => "100-000-0000",
                "email" => "user@test.com",
                "password" => "password",
                "role" => 2,
            ]
        ];
        foreach ($users as $user) {
            $newUser = new User;
            $newUser->name = $user['name'];
            $newUser->phone = $user['phone'];
            $newUser->email = $user['email'];
            $newUser->password = Hash::make($user['password']);
            $newUser->role = $user['role'];
            $newUser->save();
        }
    }
}