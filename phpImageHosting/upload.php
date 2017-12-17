<?php

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die;
}

require_once 'util.php';

header('Content-Type: application/json');



$img = $_FILES['img'];
$uploadDir = './uploads';
$errors = [];

if(empty($img)) {
    sendErrorAnswer('No files transferred!', $errors, 400);
}


$imagesDesc = reArrayAndValidate($img, $errors);
if (count($imagesDesc) === 0) {
    sendErrorAnswer('No files transferred!', $errors, 400);
}

if (!file_exists($uploadDir) || !is_dir($uploadDir)) {
    mkdir($uploadDir);
}

$rabbit = new AMQPConnection([
    'host' => '127.0.0.1',
    'port' => '5672',
    'login' => 'guest',
    'password' => 'guest'
]);
$result = $rabbit->connect();

$testChannel = new AMQPChannel($rabbit);
$testExchange = new AMQPExchange($testChannel);

$testExchange->setName('amq.direct');

try {
    foreach($imagesDesc as $val) {
        $file = $uploadDir .'/' .$val['name'];
        if (file_exists($file)) {
            $errors[] = [
                'fileName' => $val['name'],
                'message' => 'You already send this file!'
            ];
            continue;
        }
        move_uploaded_file($val['tmp_name'], $file);
        $testExchange->publish(json_encode([
            'fileName' => $val['name'],
            'url' => $file
        ]), 'thumbs_img');
    }
    $rabbit->disconnect();
    sendOkAnswer('ok!', $errors);
} catch (Exception $err) {
    $rabbit->disconnect();
    sendErrorAnswer($err->getMessage(), $errors, 500);
}