<?php

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die;
}

require_once 'util.php';
header('Content-Type: application/json');

$thumbsDir = './thumbs';
$rabbit = new AMQPConnection([
    'host' => '127.0.0.1',
    'port' => '5672',
    'login' => 'guest',
    'password' => 'guest'
]);
$rabbit->connect();

$channel = new AMQPChannel($rabbit);

$q = new AMQPQueue($channel);
$q->setName('direct_messages');
$q->declareQueue();
$q->bind('amq.direct', 'thumbs_img');

$data = [];
if ($q->get()) {
    $data['isQueueReady'] = false;
} else {
    $data['isQueueReady'] = true;
}
if (file_exists($thumbsDir) && is_dir($thumbsDir)) {
    $data['thumbsUrls'] = array_values(array_diff(scandir($thumbsDir), ['.', '..']));
}
$data['thumbsDir'] = $thumbsDir;
sendOkAnswer('ok!', $data);