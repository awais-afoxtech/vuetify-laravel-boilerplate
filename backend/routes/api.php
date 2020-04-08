<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/sanctum/csrf-cookie', '\Laravel\Sanctum\Http\Controllers\CsrfCookieController@show');

Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');
Route::post('/logout', 'AuthController@logout')->middleware('auth:sanctum');
Route::post('/logout-from-all', 'AuthController@logoutFromAll')->middleware('auth:sanctum');