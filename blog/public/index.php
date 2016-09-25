<?php

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();

require_once(__DIR__ . '/../App/config/register.php');
require_once(__DIR__ . '/../App/routing/route.php');

$app->run();
