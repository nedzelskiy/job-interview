<?php

require_once 'core/AbstractEncryptionService.php';
require_once 'core/EncryptionInterface.php';

class Seqswap extends AbstractEncryptionService implements EncryptionInterface
{

    /**
     * encode given string
     * 
     * @param string $str
     * @return string
     */
    public function encode($str)
    {
        $endChar = '';
        if (0 !== mb_strlen($str, 'UTF-8') % 2) {
            $endChar = $this->getServices()->reserveLastChar($str);
        }
        $str = mb_strtolower($str, 'UTF-8');
        $chars = $this->getServices()->getArrayChars($str);

        $newChars = $this->getServices()->swapEvenOddArrayKeys($chars);
        $newStr = $this->getServices()->makeStringFromArray($newChars);
        return $this->getServices()->makeTitleChar($newStr) . $endChar;
    }

    /**
     * decode given string
     * 
     * @param string $str
     * @return string
     */
    public function decode($str)
    {
        return $this->encode($str);
    }

}
