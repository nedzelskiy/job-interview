<?php

require_once 'core/AbstractEncryptionService.php';
require_once 'core/EncryptionInterface.php';

class Kakuna extends AbstractEncryptionService implements EncryptionInterface
{

    private $offset = 3;
    private $range = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N',
        'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f',
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x',
        'y', 'z'];

    /**
     * encode given string
     * 
     * @param string $str
     * @return string
     */
    public function encode($str)
    {
        return $this->run($str, 'down');
    }

    /**
     * decode given string
     * 
     * @param string $str
     * @return string
     */
    public function decode($str)
    {
        return $this->run($str, 'up');
    }

    /**
     * encode given string
     * 
     * @param string $str
     * @param string $direction valid values 'down', 'up'
     * @return string
     */
    private function run($str, $direction = 'down')
    {
        $chars = $this->getServices()->getArrayChars($str);
        $newStr = '';
        foreach ($chars as $char) {
            $position = array_search($char, $this->range);
            if (false !== $position) {
                $newCharPosition = ($direction === 'down') ?
                    $this->getOffsetCharDown($position) : $this->getOffsetCharUp($position);
                $newStr = $newStr . $this->range[$newCharPosition];
            } else {
                $newStr = $newStr . $char;
            }
        }
        return $newStr;
    }

    /**
     * Calculate new position of char using down direction
     * 
     * @param integer $position
     * @return integer
     */
    private function getOffsetCharDown($position)
    {
        $maxPosition = count($this->range);
        $newPosition = $position + $this->offset;
        while ($newPosition > $maxPosition) {
            $newPosition = $newPosition - $maxPosition;
        }
        return $newPosition;
    }

    /**
     * Calculate new position of char using up direction
     * 
     * @param integer $position
     * @return integer
     */
    private function getOffsetCharUp($position)
    {
        $maxPosition = count($this->range);
        $newPosition = $position - $this->offset;
        while ($newPosition < 0) {
            $newPosition = $maxPosition + $newPosition;
        }
        return $newPosition;
    }

}
