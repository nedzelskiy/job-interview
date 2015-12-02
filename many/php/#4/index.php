<?php

error_reporting(8191);

require_once 'IInterface.php';
require_once 'CacheAbstract.php';
require_once 'MyCache.php';

$expire = 10; // sec
$cache = new MyCache('/cache'); // only as example do not set dir in real life!

if ($content = $cache->get('main')) {
    $expire = $cache->getExpOfKey('main');
    $currentTime = time();
    echo 'This Page from cache for ' . ($expire - $currentTime ) . ' sec!<br>';
    echo $content;
    exit();
}

ob_start();
$param = 'This is main page';
echo ('<h1>Main Page</h1>');
echo ('<p>' . $param . '</p>');
$cache->put('main', ob_get_contents(), time() + $expire);
header("Content-Type: text/html; charset=utf-8");
ob_end_flush();
exit();

