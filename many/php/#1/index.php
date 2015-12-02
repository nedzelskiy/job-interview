<?php

mb_internal_encoding("UTF-8");

function stringToInt($string = false)
{
    if (false === $string) {
        $mess = 'Не передан аргумент в функцию '.__FUNCTION__;
        //throw new Exception($mess, 0);
        echo ($mess);
        return false;
    }
    if (is_int($string)) {
        return $string;
    }
    if (!is_string($string)) {
        $mess = 'Переданный аргумент в функцию '.__FUNCTION__.' имеет неверный тип. Ожидается string.';
        //throw new Exception($mess, 1);
        echo ($mess);
        return false;
    }
    $numb = '';
    for ($i = 0; $i < strlen($string); $i++) {
        $ord_ = ord($string[$i]);
        if (
            ($ord_ < 58) &&
            ($ord_ > 47)
        ) {
            $numb = $numb . $string[$i];
        }
    }
    return $numb * 1;
}

header("Content-Type: text/html; charset=utf-8");
echo stringToInt("cd123ewrewr456yu78ioo90"); // 1234567890