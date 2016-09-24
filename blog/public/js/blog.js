var blog = {};
blog.services = {};

blog.services.ajaxFormSubmit = function (elem, sucess, error) {
    if ('function' !== typeof sucess) {
        return false;
    }
    var error = error || blog.services.errorAjaxFormSubmit;
    var _elem = $(elem);
    var form = _elem.closest('form');
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
        success: sucess,
        error: error
    });
};

blog.services.errorAjaxFormSubmit = function () {
    alert('Ошибка при пролучении данных по технологии Ajax');
};


blog.createPostCallback = function (data) {
    if (data.message) {
        alert(data.message);
    }
};
