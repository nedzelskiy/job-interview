<?php

final class EncryptionService
{

    private static $_instanse;

    /**
     * Return object of self
     * 
     * @return Config
     */
    public static function getInstance()
    {
        if (self::$_instanse instanceof self) {
            return self::$_instanse;
        }
        self::$_instanse = new self();
        return self::$_instanse;
    }

    /**
     * Create array of chars from string
     * 
     * @param string $str
     * @return array
     */
    public function getArrayChars($str)
    {
        $length = mb_strlen($str, 'UTF-8');
        $chars = [];
        for ($i = 0; $i < $length; $i++) {
            $chars[] = mb_substr($str, 0, 1, 'UTF-8');
            $str = mb_substr($str, 1, null, 'UTF-8');
        }
        return $chars;
    }

    /**
     * Make a first char upper
     * 
     * @param string $str
     * @return string
     */
    public function makeTitleChar($str)
    {
        $str[0] = mb_strtoupper($str[0], 'UTF-8');
        return $str;
    }

    /**
     * Remove a last char from string and return it
     * 
     * @param string &$str
     * @return char
     */
    public function reserveLastChar(&$str)
    {
        $length = mb_strlen($str, 'UTF-8');
        $endChar = mb_substr($str, $length - 1, 1, 'UTF-8');
        $str = mb_substr($str, 0, $length - 1, 'UTF-8');
        return $endChar;
    }

    /**
     * Create string from array of chars
     * 
     * @param array $chars
     * @return string
     */
    public function makeStringFromArray(array $chars)
    {
        return implode('', $chars);
    }

    /**
     * Swaps the odd and even elements of the array
     * 
     * @param array $arr
     * @return array
     */
    public function swapEvenOddArrayKeys(array $arr)
    {
        $count = count($arr);
        if (0 !== $count % 2) {
            return $arr;
        }
        for ($i = 0; $i < count($arr); $i++) {
            if (0 == ($i + 1) % 2) {
                $newArr[] = $arr[$i - 1];
            } else {
                $newArr[] = $arr[$i + 1];
            }
        }
        return $newArr;
    }

    private function __constructor()
    {
        
    }

    private function __clone()
    {
        
    }

    private function __wakeup()
    {
        
    }

    private function __sleep()
    {
        
    }

}
