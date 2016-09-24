<?php

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();

// Services and Providers register
require_once(__DIR__ . '/../App/config/register.php');

//Routing
require_once(__DIR__ . '/../App/routing/route.php');

$app->run();
