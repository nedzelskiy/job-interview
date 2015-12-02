<?php

class MyCache extends CacheAbstract implements IInterface
{

    public function __construct($wayToCahe)
    {
        $this->_wayToCahe = $_SERVER['DOCUMENT_ROOT'] . $wayToCahe;
    }

    /**
     * put cache to file on disk
     * 
     * @param string $key
     * @param string $value
     * @param integer $expire default null
     * @return boolean
     */
    public function put($key, $value, $expire = null)
    {
        return parent::put($key, $value, $expire);
    }

    /**
     * get cache file from disk
     * 
     * @param string $key
     * @return mixed
     */
    public function get($key)
    {
        return parent::get($key);
    }

}
