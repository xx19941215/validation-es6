import message from './message.js';
import Translator from './translator.js';
import Util from './Util.js';

class Validation {
    constructor(input, rules, customMessages, attributes = {}, replacers = {}) {
        this.numericRules = ['Numeric', 'Integer'];
        this.message = Object.assign(message, customMessages);
        this.attributes = attributes;
        this.values = {};
        this.input = input;
        this.rules = rules;
        this.failedRules = {};
        this.errors = {};
        this.replacers = replacers;
        this.translator = new Translator;
    }

    getValue(attribute) {
        return this.input[attribute];
    }

    explodeRules(rules) {
        for (let key in rules) {
            if (Util.isString(rules[key])) {
                rules[key] = rules[key].split('|');
            }
        }

        return rules;
    }

    parseRule(rules) {
        let parameters = [],
            ruleInfo = rules.split(':');

        if (rules.indexOf(':') != -1) {
            parameters = this.parseParameters(rules, ruleInfo[1]);
        }

        return {
            rule: ruleInfo[0],
            parameters: parameters
        };
    }

    parseParameters(rule, parameter) {
        if (rule.toLowerCase() == 'regexp') return [parameter];
        if (Util.isString(parameter)) {
            return parameter.split(',');
        }

        return [];
    }

    addFailure(attribute, rule, parameters) {
        this.addError(attribute, rule, parameters);
        if (!this.failedRules[attribute]) {
            this.failedRules[attribute] = {};
        }

        this.failedRules[attribute][rule] = parameters;
    }

    addError(attribute, rule, parameter) {
        if (!Util.isArray(this.errors[attribute])) {
            this.errors[attribute] = [];
        }

        this.errors[attribute].push(this.formateMessage(this.getMessage(attribute, rule), attribute, rule, parameter));
    }

    getMessage(attribute, rule) {
        let message = this.message[rule];

        if (Util.isObject(message)) {
            let value = this.getValue(attribute)
            if (Util.isArray(value) && message['array']) {
                return message['array'];
            } else if (/^[0-9]+$/.test(value) && message['numeric']) {
                return message['numeric'];
            } else if (Util.isString(value) && message['string']) {
                return message['string'];
            }
        }

        return message;
    }

    formateMessage(message, attribute, rule, parameters) {
        parameters.unshift(this.getAttribute(attribute));

        for (let parameter of parameters) {
            message = message.replace(/:[a-zA-Z_][a-zA-Z_0-9]+/, parameter);
        }

        if (typeof this.replacers[rule] == 'function') {
            message = this.replacers[rule](message, attribute, rule, parameters);
        }

        return message;
    }

    getAttribute(attribute) {
        if (Util.isString(this.attributes[attribute])) {
            return this.attributes[attribute];
        }

        let line = this.translator.trans(attribute);

        if (line != attribute) {
            return line;
        }

        return attribute.replace('_', ' ');
    }

    hasRule(attribute, rules) {
        return this.getRule(attribute, rules) == undefined;
    }

    getRule(attribute, rules) {
        rules = rules || [];

        if (!this.rules[attribute]) return;

        for (let rule of this.rules[attribute]) {
            let parsedRule = this.parseRule(rule);

            if (Util.inArray(parsedRule.rule, rules)) {
                return [parsedRule.rule, parsedRule.parameters];
            }
        }
    }

    getSize(attribute, value) {
        let hasNumeric = this.hasRule(attribute, this.numericRules)

        if (/^[0-9]+$/.test(value) && hasNumeric) {
            return this.getValue(attribute)
        } else if (value && Util.isString(value) || Util.isArray(value)) {
            return value.length;
        }

        return 0;
    }

    messages() {
        return this.errors;
    }

    
}

export default Validation;