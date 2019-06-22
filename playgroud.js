import {
    Validator
} from './validator.js';

var rules = {
    username: "required|min:5",
    item: "accepted",
    password: "required_if:username,abc|confirmed",
    year: "between:5,10|Numeric",
    obj: "object",
    alpha: "alpha",
    alpha_dash: "alpha_dash",
    different: "different:username",
    digits: "digits:4",
    digits_between: "digits_between:3,5",
    required_with: "required_with:username,ids",
    required_without: "required_without:ff",
    home: "url",
    name: "upper:NAME"
};

var data = {
    username: 'abc',
    password: '55',
    password_confirmation: '55',
    year: 6,
    obj: {},
    accepted: 0,
    alpha: "231fd",
    alpha_dash: "343..",
    different: "abc",
    digits: 66679,
    digits_between: 1234,
    required_with: "df",
    home: "http://www.baidu.com",
    name: "NAME"
};

var customMessages = {
    accepted: ":attribute 必须接受",
};

var attribute = {
    "item": "条款"
}

var replacers = {
    accepted: function (message, attribute, rule, parameters) {
        return message;
    },
}

var v = new Validator(data, rules, customMessages, attribute, replacers);

v.register('upper', (attribute, value, parameters) => {
    return value.toUpperCase() == "NAME";
}, ":attribute = :value 不对");


if (v.fails()) {
    console.log(v.messages());
}

console.log(v)