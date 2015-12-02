<?php

abstract class CacheAbstract implements IInterface
{

    // set way to dir where will be cach files
    protected $_wayToCahe = '';
    // set extension for cashed files
    protected $_ext = '.html';
    // set extension for expire file config
    protected $_exp = '.exp';

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
            if (!file_put_contents($this->_wayToCahe . '/' . $key . $this->_exp, $expire)) {
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
     * get cache duration for cuurent file (key - it's name)
     * 
     * @param string $key
     * @return mixed false if something wrong and integer duration if all good
     */
    public function getExpOfKey($key)
    {
        if (file_exists($this->_wayToCahe . '/' . $key . $this->_exp)) {
            $expire = file_get_contents($this->_wayToCahe . '/' . $key . $this->_exp);
            return $expire ? (int) $expire : false;
        }
    }

}
