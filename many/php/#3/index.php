<?php

$data = array(
    array('id' => 12345, 'topic' => 'text1', 'message' => 'text2'),
    array('id' => 23456, 'topic' => 'text3', 'message' => 'text4'),
    array('id' => 34567, 'topic' => 'text1', 'message' => 'text2')
);
echo '<xmp>';
print_r($data);
echo '</xmp>';
/*
 * Неправильная реализация:
 * 
 * Ошибки в синтаксисе, неправильная логика
 * 
  foreach ($data as  $idx=>$row) {
    foreach ($data as $dbx=>$dbl)
        if ( $idx != $dbx && $dbl['topic'] == $row['topic'] && $dbl['message'] == $row['message'] )
            unset($data[$dbx])
  }
 */

// Правильная реализация, вместе с оптимизацией:

$found = array();

foreach ($data as $idx => $row) {
    if (!array_key_exists($row['topic'], $found)) {
        $found[$row['topic']] = $row['message'];
    } else if ($found[$row['topic']] == $row['message']) {
        unset($data[$idx]);
    }
}


echo '<xmp>';
print_r($data);
echo '</xmp>';


