<?php

abstract class FileCacheAbstract
{

    // set way to dir where will be cach files
    protected $_wayToCahe = '';
    // set extension for cashed files
    protected $_ext = '.html';
    // set extension for expire file config
    protected $_exp = '.exp';

    /**
     * start caching
     * 
     * @return boolean
     */
    public function startCaching()
    {
        return ob_start();
    }

    /**
     * get cached contend
     * 
     * @return mixed false if something wrong and string if all good
     */
    public function getCacheContent()
    {
        return ob_get_contents();
    }

    /**
     * end caching and return buffer
     * 
     * @return mixed false if something wrong and string if all good
     */
    public function stopAndReturnCaching()
    {
        return ob_get_flush();
    }

    /**
     * end caching and send the contents of the topmost output buffer
     * 
     * @return boolean
     */
    public function stopAndShowCaching()
    {
        return ob_end_flush();
    }

    /**
     * get remaining cache duration for current file (key - it's name)
     * 
     * @param string $key
     * @return mixed false if something wrong and integer duration if all good
     */
    abstract public function getRemainigCacheTimeByKey($key);
}
