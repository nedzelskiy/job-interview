<?php

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die;
}

$uploadDir = './uploads';
$data = [];

require_once 'util.php';
require_once 'IPTC.php';
header('Content-Type: application/json');

$data = [];

if (isset($_POST['id']) && trim($_POST['id']) !== '' && file_exists($uploadDir . '/' . $_POST['id'])) {
    $file = $uploadDir . '/' . $_POST['id'];
    if (exif_imagetype($file) !== IMAGETYPE_JPEG) {
        sendErrorAnswer('Can not extract metadata from this file!', [], 500);
    }
    $iptc = new IPTC($file);
    $data['meta_title'] = $iptc->getValue(IPTC_HEADLINE);
    $data['meta_description'] = $iptc->getValue(IPTC_CAPTION);
    $data['id'] = $_POST['id'];
    $data['fileName'] = $_POST['id'];
    sendOkAnswer('ok!', $data);
} else {
    sendErrorAnswer('File not exist!', [], 404);
}