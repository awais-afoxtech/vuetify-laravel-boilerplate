<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8'],
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse('some required info is missing.', $validator->errors());

        $info =  User::create([
            'name' => $request['name'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
        ]);

        return ResponseHelper::successResponse('Account created successfully.', ['user', $info]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse('some required info is missing.', $validator->errors());

        $user = User::where('email', $request->username)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return ResponseHelper::validationErrorResponse('The provided credentials are incorrect.', [
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }


        $info = [
            "user" => $user,
            "auth_token" => $user->createToken($request->device_name)->plainTextToken
        ];

        return ResponseHelper::successResponse('login successful.', $info);
    }

    public function logout(Request $request)
    {
        $user =  $request->user();
        $currentTokenId = $user->currentAccessToken()->id;
        $user->tokens()->where('id', $currentTokenId)->delete();
    }

    public function logoutFromAll(Request $request)
    {
        $user =  $request->user();
        $user->tokens()->delete();
    }
}