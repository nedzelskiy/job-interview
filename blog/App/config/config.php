<?php

return [
    'app' => [
        'debug' => false,
        'defaultLanguage' => 'ru',
        'timezone' => 'Europe/Kiev'
    ],
    'db' => [
        'cnn_default' => 'mysql://root:silent457@localhost/blog?charset=utf8'
    ],
    'views' => [
        'path' => [
            __DIR__ . '/../views'
        ]
    ],
    'models' => [
        'tables' => [
            'path' => __DIR__ . '/../Models'
        ]
    ]
];
