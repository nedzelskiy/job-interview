<?php

interface IInterface
{

    /**
     * put cache to file on disk
     * 
     * @param string $key
     * @param string $value
     * @param integer $expire default null
     * @return boolean
     */
    public function put($key, $value, $expire = null);

    /**
     * get cache file from disk
     * 
     * @param string $key
     * @return mixed false if something wrong and file's content of all good
     */
    public function get($key);
}
