// THIS IS SIMPLE, QUICK AND NOT CROSSBROWSERS REALISATION 
"use strict";
$(document).ready(function () {

    ;(function () {
        var elements = $("*[validate]")
                , email = false
                ;

        elements.each(function () {
            var _this = $(this)
                , _attr = _this.attr("validate")
                ;
                
            if (
                ('INPUT' === this.nodeName) &&
                ('text' !== _this.attr("type"))
            ) {
                return false;
            }
            
            clearSelection(_this);
            
            if ('digits' === _attr) {
                
                _this.bind('keyup paste', function (e) {
                    setTimeout(function () {
                        checkDigits(e, _this);
                    }, 0);
                });
                
                if (!checkDigitsValue(_this.val())) {
                    correctDigitsField(_this);
                }
                
            } else if ('email' === _attr) {
                
                if (email && email !== _this) {
                    email = email.add(_this);
                } else {
                    email = _this;
                }
                
            } else if (/^length/.test(_attr)) {
                
                _this.bind('keyup paste', function () {
                    setTimeout(function () {
                        checkLengthMax(_this);
                    }, 0);
                });
                
                checkLengthMax(_this);
                
            }

        });// end elements.each

        $("#submit").click(function () {
            
            if (email) {
                
                checkEmailFields(email);
            
            } else {
                
                elements.each(function () {
                    var _this = $(this);
                    if ('email' === _this.attr("validate")) {
                        if (email && email !== _this) {
                            email = email.add(_this);
                        } else {
                            email = _this;
                        }
                    }
                });
                
                checkEmailFields(email);
                
            }
        });


        function checkLengthMax(elem) {
            
            var  params = elem.attr("validate").split("-")
                , value = elem.val()
                , mess = elem.attr("validate-message")
                , len = params[2] * 1
                ;
                
            if ('undefined' === typeof mess) {
                mess = 'Incorrect input!';
            }
            
            if (value.length > len) {
                alert(mess);
                value = value.substring(0, len);
                elem.val(value);
            }
        }; // end function checkLengthMax


        function checkEmailFields(collection) {
            
            for (var i = 0; i < collection.length; i++) {
                
                var _this = collection.eq(i)
                    , mess = _this.attr("validate-message")
                    ;
                    
                if ('undefined' === typeof mess) {
                    mess = 'Incorrect email!';
                }
                
                if (/^[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}$/.test(_this.val())) {
                    
                    clearSelection(_this);
                
                } else {
                    
                    setSelection(_this);
                    alert(mess);
                
                }
            }
        };// end function checkEmailFields


        function setSelection(elem) {
            elem.css("border", "2px inset red");
        };


        function clearSelection(elem) {
            elem.css("border", "2px inset lightgray");
        };


        function checkDigits(e, elem) {
            
            var mess = elem.attr("validate-message")
                , value = elem.val()
                ;
                
            if (8 === e.keyCode) {
                return false;
            }
            
            if ('undefined' === typeof mess) {
                mess = 'Incorrect input!';
            }
            
            if (checkDigitsValue(value)) {
                return true;
            }
            
            alert(mess);
            correctDigitsField(elem);
        }; // end function checkDigits


        function checkDigitsValue(value) {
            return (/^[0-9]+$/.test(value));
        };


        function correctDigitsField(elem) {
            var value = elem.val();
            value = value.replace(/[^0-9]+/, '');
            elem.val(value);
        };

    })(); // end module

}); // end ready