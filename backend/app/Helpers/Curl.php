<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Response;

class Curl
{
    public static function post($url, $data, $additionHeaders = null)
    {

        $curl = curl_init();

        $headers = array(
            "Content-Type: application/json",
            "Accept: application/json"
        );
        if ($additionHeaders != null)
            $headers = array_merge($headers, $additionHeaders);

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => $headers,
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            return json_encode($response, true);
            dd($err);
        }

        // if (strpos($response, 'error')) {
        //     return $response;
        //     dd($response);
        // }

        return $response;
    }

    public static function get($url,  $additionHeaders = null)
    {

        $curl = curl_init();

        $headers = array(
            "Content-Type: application/json",
            "Accept: application/json"
        );
        if ($additionHeaders != null)
            $headers = array_merge($headers, $additionHeaders);

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30000,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => $headers,
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);


        if ($err) {
            return json_encode($response, true);
            dd($err);
        }

        return $response;
    }
}