<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app->get('/', function() use ($app) {
    return $app->redirect($app['url_generator']->generate('showAllPosts'));
});

$app->get('/blog', 'BlogController:showAllPosts')->bind('showAllPosts');
$app->get('/blog/{url}', 'BlogController:showPost')->bind('showPost');