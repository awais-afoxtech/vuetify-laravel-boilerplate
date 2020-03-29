<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/sanctum/csrf-cookie', '\Laravel\Sanctum\Http\Controllers\CsrfCookieController@show');
Route::post('/register', 'AuthController@register');
Route::post('/login', 'AuthController@login');
Route::get('/logout', 'AuthController@logout')->middleware('auth:sanctum');
Route::get('/logout-from-all', 'AuthController@logoutFromAll')->middleware('auth:sanctum');