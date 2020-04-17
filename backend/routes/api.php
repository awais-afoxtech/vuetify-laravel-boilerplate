<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/sanctum/csrf-cookie', '\Laravel\Sanctum\Http\Controllers\CsrfCookieController@show');

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::post('/logout', 'AuthController@logout')->middleware('auth:sanctum');
Route::post('/logout-from-all', 'AuthController@logoutFromAll')->middleware('auth:sanctum');
Route::post('/forgot-password', 'AuthController@forgotPassword');
Route::post('/reset-password', 'AuthController@resetPassword');

Route::group(['middleware' => ['auth:sanctum', 'AdminChecker']], function () {
    Route::post('/get-users', 'UserController@getUsers');
});