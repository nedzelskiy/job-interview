<?php

require_once 'core/EncryptionService.php';

class EncryptionServiceTest extends PHPUnit_Framework_TestCase
{

    public function testSwapEvenOddArrayKeys()
    {
        $instance = EncryptionService::getInstance();
        $this->assertTrue('object' === gettype($instance));
        $arr = [1,2];
        $this->assertTrue(2 === count($arr));
        $instance->swapEvenOddArrayKeys([1]);
        $this->assertTrue(2 === count($arr));
        $this->assertTrue(1 === $arr[0]);
    }

}
