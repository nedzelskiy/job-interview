<?php

interface EncryptionInterface
{

    public function decode($str);

    public function encode($str);
}
