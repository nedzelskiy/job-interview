### Задание:
Написать абстрактный класс кеширования и одну реализацию на базе файлов или sqllite. Интерфейс класса:

```php
interface IInterface {
  public function put($key, $value, $expire = null);
  public function get($key);
}
```
### Решение
Реализовано на базе файлов.