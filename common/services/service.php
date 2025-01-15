<?php
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\Request;
use GuzzleHttp\Psr7;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Exception\ClientException;

require_once 'vendor/autoload.php';
require_once $_SERVER['DOCUMENT_ROOT'] . '/common/config.php';


class Service {
    public static function sendRequest($api_params, $api_key=API_KEY,
        $api_url=API_URL, $request_method='POST',
        $headers = ['Content-Type' => 'application/json']) {

        $client = new GuzzleHttp\Client([
            'headers' =>  $headers,
            'base_uri' => $api_url
        ]);

        try {
            $response = $client->request(
                $request_method, 
                $api_url, 
                [
                    "body" => $api_params
                ]
            );

            //print_r($response->getBody()->getContents()); // comment this ..
        } catch (ClientException $e) {
            $error_msg = array();
            $error_msg['error'] = 1;
            $error_msg['msg'] = $e->getMessage();
            $error_msg['error_detail']['code'] = 403;
            $error_msg['error_detail']['message'] = $e->getMessage();
            //$error_msg['error_code'] = 403;
            //$error_msg['error_message'] = $e->getMessage();
            //echo Psr7\str($e->getRequest());
            //echo Psr7\str($e->getResponse());
            return $error_msg;
        }

        //return json_decode($response, true);

        return json_decode($response->getBody()->getContents(), true);
    }
}




?>
