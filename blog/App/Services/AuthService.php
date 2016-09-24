<?php

namespace Services;

class AuthService
{

    public static function checkAdminLogin()
    {
        if (!isset($_SERVER['PHP_AUTH_USER']) || !isset($_SERVER['PHP_AUTH_PW'])) {
            return false;
        }
        if ('admin' !== $_SERVER['PHP_AUTH_USER'] || !password_verify($_SERVER['PHP_AUTH_PW'], '$2y$10$TjQCbaujUUvThdULGx4dSeGUEZl/vO2S.gFWTHop46ae5sOFu8rgG')) {
            return false;
        }
        return true;
    }

}
