<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Response;
use App\Helpers\Curl;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class Func
{
    public function __construct()
    {
    }

    public static function sendEmail($to, $user, $title, $view, $data)
    {
        Mail::to($to)->send(new SendMail($user, $title, $view, $data));
    }
}