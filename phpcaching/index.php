<?php

error_reporting(8191);

require_once 'class/IInterface.php';
require_once 'class/FileCacheAbstract.php';
require_once 'class/FileCache.php';

$expire = 10; // sec
$cache = new FileCache('/cache'); // only as example do not set dir in real life!

if ($content = $cache->get('main')) {
    echo 'This Page from cache for ' . $cache->getRemainigCacheTimeByKey('main') . ' sec!<br>';
    echo $content;
    exit();
}

$cache->startCaching();

$param = 'This is main page';
echo ('<h1>Main Page</h1>');
echo ('<p>' . $param . '</p>');
$cache->put('main', $cache->getCacheContent(), $expire);

header('Content-Type: text/html; charset=utf-8');

$cache->stopAndShowCaching();

exit();

