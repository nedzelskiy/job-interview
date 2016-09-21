<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app->get('/', function() use ($app) {
    return $app->redirect($app['url_generator']->generate('allrecords'));
});

$app->get('/blog', function() use ($app) {
    return $app['twig']->render('allrecords.twig');
})->bind('allrecords');