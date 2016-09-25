<?php

namespace Services;

class AuthService
{

    /**
     * Проверяет данные из $_SERVER['PHP_AUTH_USER'] и $_SERVER['PHP_AUTH_PW']
     * на соответсвие переданным
     * 
     * @param string $login 
     * @param string $pass хеш пароля 
     * @return boolean
     * 
     */
    public static function checkAdminLogin($login, $pass)
    {
        if (!self::checkExsistsAuthParam()) {
            return false;
        }
        if ($login !== $_SERVER['PHP_AUTH_USER'] || !password_verify($_SERVER['PHP_AUTH_PW'], $pass)) {
            return false;
        }
        return true;
    }
    
    /**
     * Проверяет существуют ли $_SERVER['PHP_AUTH_USER'] и $_SERVER['PHP_AUTH_PW']
     * 
     * @return boolean
     * 
     */
    public static function checkExsistsAuthParam()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            return false;
        }
        return true;
    }

}
