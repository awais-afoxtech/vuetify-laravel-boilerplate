<?php

namespace App\Helpers;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Str;

/**
 * Class AmazonS3Helper
 * @package App\Helpers
 */
class ResponseHelper
{


    /**
     * @param $name
     * @param $path
     * @param $source
     * @return string
     */
    public static  function apiKeyRequired()
    {
        return Response::json(['status' => 'error', 'code' => 403, 'message' => 'API key is required'], 403);
    }

    public static  function apiKeyInvalid()
    {
        return Response::json(
            ['status' => 'error', 'code' => 403, 'message' => 'Invalid API key'],
            403
        );
    }

    public static  function unauthorized()
    {
        return Response::json(['status' => 'error', 'code' => 401, 'message' => 'Invalid session key.'], 401);
    }

    public static  function unauthorizedAdmin()
    {
        return Response::json(['status' => 'error', 'code' => 401, 'message' => 'Invalid admin access.'], 401);
    }

    public static  function validationErrorResponse($message, $data)
    {
        $message = Str::title($message);
        return Response::json(['status' => 'error', 'code' => 412, 'message' => $message, 'errors' => $data], 412);
    }

    public static  function successResponse($message, $data = [])
    {
        $message = Str::title($message);
        return Response::json(['status' => 'success', 'code' => 200, 'message' => $message, 'data' => $data], 200);
    }

    public static  function errorResponse($message)
    {
        $message = Str::title($message);
        return Response::json(['status' => 'error', 'code' => 404, 'message' => $message], 404);
    }
}