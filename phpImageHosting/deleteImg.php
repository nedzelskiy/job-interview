<?php

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die;
}

require_once 'util.php';
header('Content-Type: application/json');

$uploadDir = './uploads';
$thumbsDir = './thumbs';
$data = [];

if (isset($_POST['id']) && trim($_POST['id']) !== ''  && file_exists($uploadDir . '/' . $_POST['id'])) {
    try {
        unlink($uploadDir . '/' . $_POST['id']);
        unlink($thumbsDir . '/' . $_POST['id']);
        sendOkAnswer('ok!', []);
    } catch (Exception $err) {
        sendErrorAnswer('Can not delete file!', [], 500);
    }

} else {
    sendErrorAnswer('File not found!', [], 404);
}
