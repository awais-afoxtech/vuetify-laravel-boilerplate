<?php

namespace App\Http\Middleware;

use App\Helpers\ResponseHelper;
use App\Models\User;
use Closure;
use Laravel\Sanctum\PersonalAccessToken;

class AdminChecker
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        $accessToken = PersonalAccessToken::where('token', hash('sha256', $token))->first();
        $userId = $accessToken->tokenable_id;
        $user = User::where('id', $userId)->first();
        if ($user->role != 1)
            return ResponseHelper::unauthorizedAdmin();

        return $next($request);
    }
}