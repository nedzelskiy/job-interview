<?php

mb_internal_encoding("UTF-8");

function decorateDateString($dateStr)
{
    if (!is_string($dateStr)) {
        $mess = 'Переданный аргумент в функцию ' . __FUNCTION__ . ' имеет неверный тип. Ожидается string.';
        //throw new Exception($mess, 0);
        echo ($mess);
        return false;
    }
    return preg_replace('/([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}:[0-9]{2}:[0-9]{2})/', '$3-$2-$1 $4', $dateStr);
    /*
     * 	01/18/2013 01:02:03 => 2012-05-01 01:02:03
     */
    // return preg_replace('/([0-9]{2})\/([0-9]{2})\/([0-9]{4}) ([0-9]{2}:[0-9]{2}:[0-9]{2})/e', "('$3'-1).'-'.(('$2' > 13) ? ((strlen(('$2'-13).'') > 1) ? '$2'-13 : '0'.('$2'-13)) : '$2').'-$1 $4'", $dateStr);
}

header("Content-Type: text/html; charset=utf-8");
echo decorateDateString(date("m/d/Y h:m:s")); // Y-d-m h:m:s