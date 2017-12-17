<?php

function makeResponseAnswer($message, $data) {
    $response = [
        'message' => $message
    ];
    if ($data && count($data) > 0) {
        $response['data'] = $data;
    }
    return $response;
}


function sendOkAnswer($message, $data, $statusCode = 200) {
    http_response_code($statusCode);
    $response = makeResponseAnswer($message, $data);
    $response['error'] = false;
    echo json_encode($response);
    die();
};

function sendErrorAnswer($message, $data, $statusCode = 200) {
    http_response_code($statusCode);
    $response = makeResponseAnswer($message, $data);
    $response['error'] = true;
    echo json_encode($response);
    die();
};

function isImageType($file) {
    $allowed = [
        IMAGETYPE_GIF,
        IMAGETYPE_JPEG,
        IMAGETYPE_PNG
    ];
    $flippedArr = array_flip($allowed);
    $result = exif_imagetype($file);
    if (array_key_exists($result, $flippedArr)) {
        return true;
    }
    return false;
};

function reArrayAndValidate($files, &$errors) {
    $filesArr = [];
    $filesCount = count($files['name']);
    $filesKeys = array_keys($files);
    $filesNames = [];

    for($i=0; $i < $filesCount; $i++) {
        if ($files['name'][$i] === '') {
            continue;
        }
        if (array_key_exists($files['name'][$i], $filesNames)) {
            $errors[] = [
                'fileName' => $files['name'][$i],
                'message' => 'You already send this file!'
            ];
            continue;
        }
        $filesNames[$files['name'][$i]] = $files['name'][$i];
        if(!isImageType($files['tmp_name'][$i])) {
            $errors[] = [
                'fileName' => $files['name'][$i],
                'message' => 'This is not an image file or can not determine file type!'
            ];
            continue;
        }
        foreach($filesKeys as $val) {
            $filesArr[$i][$val] = $files[$val][$i];
        }
    }
    return $filesArr;
}