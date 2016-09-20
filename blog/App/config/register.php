<?php

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
$app['BlogController'] = $app->share(function() {
    return new Controllers\BlogController();
});