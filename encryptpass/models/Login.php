<?php

class Login
{

    protected $_username;
    protected $_password;

    public function __construct()
    {
        
    }

    /**
     * Check if exists user in db
     * 
     * @return boolean
     */
    protected function checkUserInDb()
    {
        // check rules for  $username and $password
        // connection to db $this->_config->get('db')
        // etc
        return false;
    }

    /**
     * Encypting a pass string
     * 
     * @param string $pass
     * @return string
     */
    protected function cryptPass($pass)
    {
        $algorithmParam = Config::getInstance()->get('encryptpass');
        if (!$algorithmParam) {
            return $pass;
        }
        $algorithm = $algorithmParam['class'];
        return $algorithm->encode($pass);
    }

    /**
     * login user
     * 
     * @return boolean
     */
    public function login()
    {
        if (!$this->checkUserInDb()) {
            return false;
        }
        // do login algorhitms
        return true;
    }

    /**
     * set username
     * 
     * @param string $username
     * @return null
     */
    public function setUsername($username)
    {
        $this->_username = $username;
    }

    /**
     * set passwords
     * 
     * @param string $password
     * @return null
     */
    public function setPassword($password)
    {
        $this->_password = $this->cryptPass($password);
    }

    public function getUsername()
    {
        // ...
    }

    /**
     * get passwords
     * 
     * @return string
     */
    public function getPassword()
    {
        return $this->_password;
    }

}
