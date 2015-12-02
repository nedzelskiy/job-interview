<?php

require_once 'algorithms/Kakuna.php';

class KakunaTest extends PHPUnit_Framework_TestCase
{

    public function testEncode()
    {
        $algorithm = new Kakuna();
        $result = $algorithm->encode('labas');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('odedv' === $result);
        
        $result = $algorithm->encode('labas пр');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('odedv пр' === $result);
        
        $result = $algorithm->encode('zzz');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('CCC' === $result);
    }
    
    public function testDecode()
    {
        $algorithm = new Kakuna();
        $result = $algorithm->decode('odedv');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('labas' === $result);
        
        $result = $algorithm->decode('odedv пр');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('labas пр' === $result);
        
        $result = $algorithm->decode('CCC');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('zzz' === $result);
    }

}
