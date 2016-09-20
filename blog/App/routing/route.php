<?php

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Silex\Application;

$app->get('/blog', function() use ($app) {
    return 'yes';
});