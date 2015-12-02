<?php

require_once 'algorithms/Seqswap.php';

class SeqswapTest extends PHPUnit_Framework_TestCase
{

    public function testEncode()
    {
        $algorithm = new Seqswap();
        $result = $algorithm->encode('Hello world');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('Ehll oowlrd' === $result);
        
        $result = $algorithm->encode('Labas');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('Alabs' === $result);
    }
    
    public function testDecode()
    {
        $algorithm = new Seqswap();
        $result = $algorithm->decode('Alabs');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('Labas' === $result);
        
        $result = $algorithm->decode('Ehll oowlrd');
        $this->assertTrue('string' === gettype($result));
        $this->assertTrue('Hello world' === $result);
    }

}
