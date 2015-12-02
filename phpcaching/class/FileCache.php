<?php

class FileCache extends FileCacheAbstract implements IInterface
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
        if (!(is_dir($this->_wayToCahe))) {
            mkdir($this->_wayToCahe);
        }
        if (!file_put_contents($this->_wayToCahe . '/' . $key . $this->_ext, $value)) {
            return false;
        }
        @chmod($this->_wayToCahe . '/' . $key . $this->_ext, 0777);
        if ($expire) {
            if (!file_put_contents($this->_wayToCahe . '/' . $key . $this->_exp, time() + $expire)) {
                return false;
            }
            @chmod($this->_wayToCahe . '/' . $key . $this->_exp, 0777);
        }
        return true;
    }

    /**
     * get cache file from disk
     * 
     * @param string $key
     * @return mixed false if something wrong and file's content of all good
     */
    public function get($key)
    {
        if (file_exists($this->_wayToCahe . '/' . $key . $this->_ext)) {
            if (file_exists($this->_wayToCahe . '/' . $key . $this->_exp)) {
                $expire = file_get_contents($this->_wayToCahe . '/' . $key . $this->_exp);
                $expire = (int) $expire;
                $currentTime = time();
                $currentTime = (int) $currentTime;
                if ($expire < $currentTime) {
                    return false;
                }
            }
            return file_get_contents($this->_wayToCahe . '/' . $key . $this->_ext);
        } else {
            return false;
        }
    }

    /**
     * get remaining cache duration for current file (key - it's name)
     * 
     * @param string $key
     * @return mixed false if something wrong and integer duration if all good
     */
    public function getRemainigCacheTimeByKey($key)
    {
        if (file_exists($this->_wayToCahe . '/' . $key . $this->_exp)) {
            $expire = file_get_contents($this->_wayToCahe . '/' . $key . $this->_exp);
            if (!$expire) {
                return false;
            }
            $currentTime = time();
            return ($expire - $currentTime );
        }
        return false;
    }

}
