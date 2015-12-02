<?php

require_once 'config/Config.php';
require_once 'models/Login.php';
require_once 'core/AbstractEncryptionService.php';
require_once 'core/EncryptionInterface.php';
require_once 'core/EncryptionService.php';
require_once 'algorithms/Seqswap.php';
require_once 'algorithms/Kakuna.php';


$config = Config::getInstance();

// Registr service "encryptpass"
$config->set('encryptpass', function () {
    return [
        'class' => new Kakuna()
        //'class' => new Seqswap()
    ];
});

$model = new Login();
$model->setUsername('John');
$model->setPassword('labas');
$model->login();
