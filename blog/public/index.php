<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Models\tables\Trainer;
use Models\tables\Admin;

$app = new Silex\Application();

// Services and Providers register
require_once(__DIR__ . '/../App/config/register.php');

$app['admin'] = false;

//Errors handler
$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }
    switch ($code) {
        case 404:
            $message = 'The requested page could not be found';
            break;
        default:
            $message = 'We are sorry, but something went terribly wrong';
    }
    return $message;
});


//Routing
require_once(__DIR__ . '/../App/routing/route.php');


$app->before(function() use($app) {
    
});
$app->run();
