// Обьявляем пространство имен blog
var blog = {};

// Регистрируем сервисы
blog.services = {};

/**
 * Выполняет отсылку данных формы по технологии AJAX
 * Форма должна быть создана с помощью тега <form>
 * иметь action и method атрибуты
 * 
 * @param {htmlDomElement} _elem кнопка submit формы
 * @param {function} success функция, которая будет выполнена после успешного запроса
 * @param {function} error функция, которая будет выполна если запрос завершился ошибкой
 * 
 * @return {undefined} функция ничего не возвращает
 */
blog.services.ajaxFormSubmit = function (_elem, success, error) {
    if ('function' !== typeof success) {
        return false;
    }
    var error = error || blog.services.errorAjaxFormSubmit;
    var elem = $(_elem);
    var form = elem.closest('form');
    if (
            'undefined' === typeof form
            || 'undefined' === typeof form.attr('action')
            || 'undefined' === typeof form.attr('method')
            ) {
        return false;
    }
    $.ajax({
        method: form.attr('method'),
        url: form.attr('action'),
        data: form.serialize(),
        success: success,
        error: error
    });
};

/**
 * По умолчанию, для Ajax зпросов, которые завершились ошибкой
 * Вызывает модальное окно с предупреждающим текстом
 * 
 * @return {undefined} функция ничего не возвращает
 */
blog.services.errorAjaxFormSubmit = function () {
    alert('Ошибка при пролучении данных по технологии Ajax');
};

/**
 * Обработка callback запроса на создание новой новости
 * Если в Responce объекте есть ключ message, то
 * вызывает модальное окно с текстом из message
 * 
 * @param {object} data Responce Json объект
 * @return {undefined} функция ничего не возвращает
 */
blog.createPostCallback = function (data) {
    if (data.message) {
        alert(data.message);
    }
};
