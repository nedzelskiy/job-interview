<?php

$thumbsDir = './thumbs';
$thumbWidth = 100;
$thumbHeight = 100;

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

echo 'Process running with pid: ' . getmypid() . "\r\n";

while(true) {
    if (!file_exists($thumbsDir) || !is_dir($thumbsDir)) {
        mkdir($thumbsDir);
    }
    $envelope = $q->get();
    if ($envelope) {
        processQueueData($envelope, $thumbsDir, $thumbWidth, $thumbHeight);
        $q->ack($envelope->getDeliveryTag());
    } else {
        sleep(1);
    }
}

$rabbit->disconnect();

function processQueueData($envelope, $thumbsDir, $thumbWidth, $thumbHeight) {
    $fileDesc = json_decode($envelope->getBody());
    if (!file_exists($fileDesc->url)) {
        return false;
    }
    list($width, $height) = getimagesize($fileDesc->url);
    $thumbsUrl = $thumbsDir .'/' . $fileDesc->fileName;
    $image_p = imagecreatetruecolor($thumbWidth, $thumbHeight);

    switch(exif_imagetype($fileDesc->url)) {
        case IMAGETYPE_GIF:
            $image = imagecreatefromgif($fileDesc->url);
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
            imagegif($image_p, $thumbsUrl);
            break;
        case IMAGETYPE_JPEG:
            $image = imagecreatefromjpeg($fileDesc->url);
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
            imagejpeg($image_p, $thumbsUrl, 100);
            break;
        case IMAGETYPE_PNG:
            $image = imagecreatefrompng($fileDesc->url);
            imagecopyresampled($image_p, $image, 0, 0, 0, 0, $thumbWidth, $thumbHeight, $width, $height);
            imagepng($image_p, $thumbsUrl, 9);
            break;
        default:
            break;
    }
    return true;
};