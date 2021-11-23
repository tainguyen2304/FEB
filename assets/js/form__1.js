function Validation (options) {

    function getParent (element, selector) {
        while(element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;    
        }
    }
    let selectorRules = {};
    function Validate(inputElement,rule) { 

        let errorMessage = getParent(inputElement,options.formGroupSelector).querySelector(options.messageElement);
        let errorSelector ;
        let rules = selectorRules[rule.selector];
        for (let key of rules) {
            switch(inputElement.type){
                case 'checkbox':
                case 'radio':
                    errorSelector = key(
                        fromElement.querySelector(rule.selector + ':checked')
                    );
                    break;
                    default:
                        errorSelector = key (inputElement.value);
            }
            
            if (errorSelector) break;
        }

        if (errorSelector) {
            errorMessage.innerText = errorSelector;
            getParent(inputElement,options.formGroupSelector).classList.add('error');
        }
        else {
            errorMessage.innerText = '';
            getParent(inputElement,options.formGroupSelector).classList.remove('error');
        }
        return errorSelector;
    }

    let fromElement = document.querySelector(options.form);
    if (fromElement) {
        fromElement.onsubmit = function(e) {
            e.preventDefault();
            let isValid = true;
            options.rules.forEach(function(rule) {
                let inputElement = fromElement.querySelector(rule.selector);
                let fromValid = Validate(inputElement,rule);
                if (fromValid)
                isValid = false;
            });
             
            if (isValid) {
                // submit voi javascript
                if (typeof options.onSubmit === 'function') {
                    let enableInputs = fromElement.querySelectorAll('[name]:not([disabled])');
                    let formValues = Array.from(enableInputs).reduce(function(values,input){
                        switch(input.type) {
                            case 'radio':
                                values[input.name] = fromElement.querySelector('input[name="'+ input.name + '"]:checked').value;
                                break;
                            case 'checkbox':
                                    if (!input.matches(':checked')) return  values;

                                    if (!Array.isArray(values[input.name])) {
                                        values[input.name] = [];
                                    }

                                    values[input.name].push(input.value);
                                    break;
                            case 'file:':
                                values[input.name] = input.files;
                                break;


                            default:
                                values[input.name] = input.value;   
                        }
                        return values;
                    }, {});

                    options.onSubmit(formValues);
                }
                // submit voi hanh vi mac dinh
                else {
                    fromElement.submit();   
                }
            }
        } 

        options.rules.forEach(function(rule) {

            if (Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }
            else {
                selectorRules[rule.selector] = [rule.test];
            }

            let inputElements = fromElement.querySelectorAll(rule.selector);

            Array.from(inputElements).forEach(function(inputElement){

                inputElement.onblur = function() {
                    Validate(inputElement,rule);
                }
                inputElement.oninput = function () {
                        let errorMessage = getParent(inputElement,options.formGroupSelector).querySelector(options.messageElement);
                        errorMessage.innerText = '';
                        getParent(inputElement,options.formGroupSelector).classList.remove('error');
                }
            });

        });
    }
}

Validation.isRequied = function(selector,message) {
    return {
        selector: selector,
        test: function(value) {
            return value ? undefined: message || "Vui lòng nhập trường này";
        }
    }
}
Validation.isEmail = function(selector,message) {
    return {
        selector: selector,
        test: function (value){
            let tagex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            return tagex.test(value)? undefined :  message ||"Email không hợp lệ"
        }
    }
}
Validation.isPassWord = function(selector,min,message) {
    return {
        selector: selector,
        test: function (value){
            return value.length > min ? undefined:  message || "Mật khẩu phải lớn hơn 6 kí tự";
        }
    }
}
Validation.isPassWordRepeat = function(selector,getPassword,message) {
    return {
        selector: selector,
        test: function (value){
            return value === getPassword()? undefined:  message || "Gía trị không hợp lệ";
        }
    }
}