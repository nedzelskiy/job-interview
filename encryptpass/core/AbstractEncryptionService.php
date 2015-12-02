<?php

require_once 'core/EncryptionService.php';

abstract class AbstractEncryptionService
{

    private $_services;

    public function __construct()
    {
        $this->setServices(EncryptionService::getInstance());
    }

    public function getServices()
    {
        return $this->_services;
    }

    public function setServices(EncryptionService $service)
    {
        $this->_services = $service;
    }

}
