<?php

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die;
}

require_once 'util.php';
require_once 'IPTC.php';
header('Content-Type: application/json');

$uploadDir = './uploads';
var_dump($_POST['id']);
var_dump($_POST['meta_title']);
var_dump($_POST['meta_description']);
if (    isset($_POST['id'])
    &&  trim($_POST['id']) !== ''
    &&  file_exists($uploadDir . '/' . $_POST['id'])
) {
    try {
        $file = $uploadDir . '/' . $_POST['id'];
        if (exif_imagetype($file) !== IMAGETYPE_JPEG) {
            sendErrorAnswer('Can not save metadata from this file!', [], 500);
        }
        if (isset($_POST['meta_title'])) {
            //set title
            $iptc = new IPTC($file);
            $iptc->setValue(IPTC_HEADLINE, $_POST['meta_title']);
        }
        if (isset($_POST['meta_description'])) {
            //set description
            $iptc = new IPTC($file);
            $iptc->setValue(IPTC_CAPTION, $_POST['meta_description']);
        }
        sendOkAnswer('ok!', []);
    } catch (Exception $err) {
        sendErrorAnswer($err->getMessage(), [], 500);
    }

} else {
    sendErrorAnswer('File not exist!', [], 404);
}