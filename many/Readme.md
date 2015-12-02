## Задания:

### PHP

#### #1:

Написать функцию преобразования строки, содержащей число в непосредственно число, не используя стандартные функции приведения типов (например “1252абв” в 1252)

#### #2:

Написать код приведения даты формата “01/18/2013 01:02:03” к формату “2012-05-01 01:02:03”

#### #3:

Оптимизировать код и найти ошибку

```php
$data = array(
    array('id'=>12345, 'topic' => 'text1', 'message' => 'text2'),
    array('id'=>23456, 'topic' => 'text3', 'message' => 'text4'),
    array('id'=>34567, 'topic' => 'text1', 'message' => 'text2'),
    ...
);
foreach ($data as  $idx=>$row) {
    foreach ($data as $dbx=>$dbl)
	if ( $idx != $dbx && $dbl['topic'] == $row['topic'] && $dbl['message'] == $row['message'] )
	    unset($data[$dbx])
}
```

### JavaScript

#### #1:

Напишите модуль клиентской валидации данных. Правила валидации и тексты ошибок должны указываться, как атрибуты поля ввода. Реализуйте проверку ввода только чисел, проверку на валидность e-mail и проверку на ограничение количества символов. Можно пользовать jQuery для манипуляций с DOM.

Пример html кода:

```html
<div>
    <input id="first" type="text" validate='digits' validate-message='Digits only'>
</div>
<div>
    <input id="second" type="text" validate='email' validate-message='Invalid email'>
</div>
<div>
    <textarea validate='length-max-10' validate-message='Max 10 symbols'></textarea>
</div>
<div>
    <input type="text" validate='digits' validate-message='Digits only'>
</div>
```

### SQL

#### #1:

Базируется на PostgreSQL. Напишите запрос получения строки пути к категории, если дерево категорий представленно таблицей:

```sql
CREATE TABLE categories
(
  id bigserial NOT NULL,
  parent_id bigint,
  name character varying(128),
  CONSTRAINT categories_pk_id PRIMARY KEY (id),
  CONSTRAINT categories_fk_parent_id FOREIGN KEY (parent_id)
      REFERENCES categories (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
)
```
#### #2:

Базируется на PostgreSQL. Есть таблица логирования изменений:

```sql
CREATE TABLE logs.posts
(
  id_posts bigint NOT NULL,
  id_statuses character varying(32),
  id_type_of_change character varying(8) NOT NULL,
  dt timestamp with time zone NOT NULL DEFAULT now(),
  id_categories bigint NOT NULL,
  message text,
  topic character varying(4096),
  CONSTRAINT posts_fk_id_type_of_change FOREIGN KEY (id_type_of_change)
      REFERENCES logs.type_of_change (id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
)
```

В справочнике logs.type_of_change указаны типы изменения данных в таблице posts:
- INSERT
- UPDATE
- DELETE

Напишите запрос, который выберет только те посты, у которых статус (id_statuses) изменялся не менее 5 раз. (Если в момент обновления данных таблицы posts статус не изменяется, в logs.posts id_statuses записывается как NULL)
