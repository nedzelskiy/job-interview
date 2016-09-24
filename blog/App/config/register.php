<?php

use Services\AuthService;

// Config
$app['conf'] = $app->share(function () {
    return require_once('config.php');
});


// Debug
$app['debug'] = $app['conf']['app']['debug'];


// Language
$app['lang'] = $app['conf']['app']['defaultLanguage'];


// Url generator
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

// admin isset
$app['admin'] = AuthService::checkAdminLogin();

// Active Record
date_default_timezone_set($app['conf']['app']['timezone']);
$app->register(new Ruckuus\Silex\ActiveRecordServiceProvider(), array(
    'ar.model_dir' => $app['conf']['models']['tables']['path'],
    'ar.connections' => [
        'default' => $app['conf']['db']['cnn_default']
    ],
    'ar.default_connection' => 'default',
));

// Validators
$app->register(new Silex\Provider\ValidatorServiceProvider());


// Twig
$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => $app['conf']['views']['path']
));

// Controllers
$app->register(new Silex\Provider\ServiceControllerServiceProvider());
$app['AdminController'] = $app->share(function() {
    return new Controllers\AdminController();
});
$app['BlogController'] = $app->share(function() {
    return new Controllers\BlogController();
});

//Errors handler
$app->error(function (\Exception $e, $code) use ($app) {
    if ($app['debug']) {
        return;
    }
    switch ($code) {
        case 404:
            $message = 'Страница не найдена!';
            break;
        
        case 401:
            $message = 'Доступ запрещен!';
            break;
            
        default:
            $message = 'Мы не знаем что, но что-то случилось!';
    }
    return $app['twig']->render('http.twig', [
        'code' => $code,
        'message' => $message
    ]);
});