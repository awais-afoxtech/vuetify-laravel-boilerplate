<?php

use Illuminate\Database\Seeder;
use App\Models\User;

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
                "name" => "Awais Jameel",
                "email" => "awais.jameel@ymail.com",
                "password" => "Pakistan78",
                "role" => 1,
            ],
            [
                "name" => "Ahsan Jameel",
                "email" => "ahsan.jameel@ymail.com",
                "password" => "Pakistan78",
                "role" => 2,
            ]
        ];
        foreach ($users as $user) {
            $newUser = new User;
            $newUser->name = $user['name'];
            $newUser->email = $user['email'];
            $newUser->password = Hash::make($user['password']);
            $newUser->save();
        }
    }
}