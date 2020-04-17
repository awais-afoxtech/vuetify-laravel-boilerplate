<?php

namespace App\Http\Controllers;

use App\Helpers\Func;
use App\Helpers\ResponseHelper;
use App\Mail\SendMail;
use App\Models\PasswordReset;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['bail', 'required', 'string'],
            'phone' => ['bail', 'required', 'string', 'unique:users'],
            'email' => ['bail', 'required', 'string', 'unique:users'],
            'password' => ['bail', 'required', 'string'],
            'role' => ['bail', 'required', 'string'],
            'device_name' => ['bail', 'required', 'string'],
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

        $newUser =  User::create([
            'name' => $request['name'],
            'phone' => $request['phone'],
            'email' => $request['email'],
            'password' => Hash::make($request['password']),
            'role' => $request['role'],
        ]);

        $info = [
            "user" => $newUser,
            "auth_token" => $newUser->createToken($request->device_name)->plainTextToken
        ];

        return ResponseHelper::successResponse('Registered successfully.', $info);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'bail|required|exists:users,email',
            'password' => 'bail|required',
            'device_name' => 'required'
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

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
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'token' => 'required',
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

        $user = User::where('id', $request->user_id)->first();
        $user->tokens()->where('token', $request->token)->delete();

        return ResponseHelper::successResponse('logged out.');
    }

    public function logoutFromAll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'token' => 'required',
        ]);

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

        $user = User::where('id', $request->user_id)->first();
        $user->tokens()->delete();

        return ResponseHelper::successResponse('logged out.');
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'username' => 'bail|required|exists:users,email',
            ],
            [
                'username.exists' => 'user dose not exists'
            ]
        );

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

        $user = User::where('email', $request->username)->first();

        $code = Str::random(6);

        Func::sendEmail($user->email, $user, 'Password Reset', "", $code);

        // Mail::send('emails.mail', ['code' => $code], function ($message) use ($user) {
        //     $message->to($user->email)->from('admin@gmail.com', 'App Admin')->subject('Password Reset');
        // });

        $passwordToken = PasswordReset::create([
            'email' => $user->email,
            'token' => $code,
        ]);

        return ResponseHelper::successResponse('Check your mail.');
    }

    public function resetPassword(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'code' => 'bail|required|exists:password_resets,token',
                'password' => 'bail|required|confirmed',
            ],
            [
                'code.exists' => 'Invalid code.'
            ]
        );

        if ($validator->fails())
            return ResponseHelper::validationErrorResponse($validator->errors()->first(), $validator->errors());

        $passwordToken = PasswordReset::where('token', $request->code)->first();

        $user = User::where('email', $passwordToken->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        PasswordReset::where('email', $user->email)->delete();

        return ResponseHelper::successResponse('Password updated.');
    }
}