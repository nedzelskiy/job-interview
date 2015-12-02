<?php

require_once 'tests/KakunaTest.php';
require_once 'tests/SeqswapTest.php';
require_once 'tests/EncryptionServiceTest.php';

class AllTests
{

    public static function suite()
    {
        $suite = new PHPUnit_Framework_TestSuite();
        $suite->addTestSuite('KakunaTest');
        $suite->addTestSuite('SeqswapTest');
        $suite->addTestSuite('EncryptionServiceTest');
        return $suite;
    }

}
