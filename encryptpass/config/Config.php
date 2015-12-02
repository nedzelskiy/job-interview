<?php

class Config
{

    private static $_instanse;
    private $services = [];

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
     * Registr a service
     * 
     * @param string $name
     * @param object(Closure) $func
     * @return void
     */
    public function set($name, $func)
    {
        $this->services[$name] = $func;
    }

    /**
     * Get a service params by name
     * 
     * @param string $name
     * @return mixed null if don't exist
     */
    public function get($name)
    {
        if (array_key_exists($name, $this->services)) {
            return $this->services[$name]($this);
        }
        return null;
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
