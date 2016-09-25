<?php

use Services\AuthService;

// Конфигурация app
$app['conf'] = $app->share(function () {
    return require_once('config.php');
});


// Дебаг режим ?
$app['debug'] = $app['conf']['app']['debug'];


// Язык по умолчанию
// на данный момент перевод не используется
$app['lang'] = $app['conf']['app']['defaultLanguage'];


// Url генератор
$app->register(new Silex\Provider\UrlGeneratorServiceProvider());

// Залогинен ли админ ?
$app['admin'] = AuthService::checkAdminLogin('admin', '$2y$10$TjQCbaujUUvThdULGx4dSeGUEZl/vO2S.gFWTHop46ae5sOFu8rgG');

// Active Record
date_default_timezone_set($app['conf']['app']['timezone']);
$app->register(new Ruckuus\Silex\ActiveRecordServiceProvider(), array(
    'ar.model_dir' => $app['conf']['models']['tables']['path'],
    'ar.connections' => [
        'default' => $app['conf']['db']['cnn_default']
    ],
    'ar.default_connection' => 'default',
));

// Symfony валидаторы
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

// Обрадотичк Exception
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
        
        case 405:
            $message = 'Метод не разрешен!';
            break;
            
        default:
            $message = 'Ой, что-то случилось!';
    }
    if ('GET' === $app['request']->getMethod()) {
        return $app['twig']->render('http.twig', [
            'code' => $code,
            'message' => $message
        ]);
    } 
    return $app->json(['Message' => $message], $code);
});