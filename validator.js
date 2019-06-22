import Util from './Util.js';
import Validation from './validation.js';

function requireParameterCount(count, parameters, rule) {
  if (parameters.length < count) {
    throw Error('Validation rule ' + rule + ' requires at least ' + count + ' parameters.');
  }
}

class Validator extends Validation {
  constructor (input, rules, customMessages, attributes = {}, replacers = {}) {
    super(input, rules, customMessages, attributes, replacers);
    let self = this;
    let resolvers = {
      accepted: function (attribute, value) {
        var acceptable = ['yes', 'on', '1', 1, true, 'true'];

        Util.isString(value) && (value = value.toLowerCase());

        return (resolvers.required(attribute, value) && Util.inArray(value, acceptable, true));
      },

      alpha: function (attribute, value) {
        if (!value) {
          return false;
        };

        return ((new RegExp('^[a-z]+$', 'i')).test(value));
      },

      alpha_dash: function (attribute, value) {
        return ((new RegExp('^[a-z0-9\-_]+$', 'i')).test(value));
      },

      alpha_num: function (attribute, value) {
        return ((new RegExp('^[a-z0-9]+$', 'i')).test(value));
      },

      array: function (attribute, value) {
        return Util.isArray(value);
      },

      object: function (attribute, value) {
        return Util.isObject(value);
      },

      between: function (attribute, value, parameters) {
        requireParameterCount(2, parameters, 'between');

        var size = self.getSize(attribute, value);

        return size >= parameters[0] && size <= parameters[1];
      },

      confirmed: function (attribute, value, parameters) {
        return resolvers.same(attribute, value, [attribute + '_confirmation']);
      },

      same: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'same');

        var other = self.getValue(parameters[0]);

        return (other && value == other);
      },

      different: function (attribute, value, parameters) {
        return !resolvers.same(attribute, value, parameters);
      },

      digits: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'digits');
        return (new RegExp('^\\d{' + Math.abs(parameters[0]) + '}$')).test(value);
      },

      digits_between: function (attribute, value, parameters) {
        requireParameterCount(2, parameters, 'digits_between');

        var length = ('' + value).length;
        return ((new RegExp('^\\d')).test(value) &&
          length > parameters[0] &&
          length < parameters[1]);
      },

      email: function (attribute, value) {
        var regex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;

        return regex.test(value);
      },

      in: function (attribute, value, parameters) {
        return Util.inArray(value || '', parameters);
      },

      not_in: function (attribute, value, parameters) {
        return !Util.inArray(value || '', parameters);
      },

      integer: function (attribute, value) {
        return /^(?:-?(?:0|[1-9][0-9]*))$/.test(value);
      },

      ip: function (attribute, value) {
        var ipv4Maybe = /^(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)\.(\d?\d?\d)$/,
          ipv6 = /^::|^::1|^([a-fA-F0-9]{1,4}::?){1,7}([a-fA-F0-9]{1,4})$/;
        return ipv4Maybe.test(value) || ipv6.test(value);
      },

      max: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'max');

        return self.getSize(attribute, value) <= parameters[0];
      },

      min: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'min');

        return self.getSize(attribute, value) >= parameters[0];
      },

      numeric: function (attribute, value) {
        return /^[0-9]+$/.test(value);
      },

      regex: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'regex');

        return (new RegExp(parameters[0])).test(value);
      },

      required: function (attribute, value) {
        if (!value || undefined === value) {
          return false;
        } else if ((Util.isString(value) || Util.isArray(value) || Util.isObject(value)) && !value.length) {
          return false;
        }

        return true;
      },

      required_if: function (attribute, value, parameters) {
        requireParameterCount(2, parameters, 'required_if');

        var other = self.getValue(parameters[0]);

        var values = parameters.slice(1);

        if (Util.inArray(other, values)) {
          return resolvers.required(attribute, value);
        }

        return true;
      },

      required_with: function (attribute, value, parameters) {
        if (!self.allFailingRequired(parameters)) {
          return resolvers.required(attribute, value);
        }

        return true;
      },

      required_without: function (attribute, value, parameters) {
        if (self.anyFailingRequired(parameters)) {
          return resolvers.required(attribute, value);
        }

        return true;
      },

      size: function (attribute, value, parameters) {
        requireParameterCount(1, parameters, 'size');

        return self.getSize(attribute, value) == parameters[0];
      },

      url: function (attribute, value) {
        var regex = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/);

        return regex.test(value);
      }
    }

    this.resolvers = resolvers;
  }

  anyFailingRequired(attributes) {
    for (let attribute of attributes) {
      if (!this.resolvers.required(attribute, this.getValue(attribute))) {
        return true;
      }
    }

    return false;
  }

  allFailingRequired(attributes) {
    for (let attribute of attributes) {
      if (!this.resolvers.required(attribute, this.getValue(attribute))) {
        return false;
      }
    }

    return true;
  }
  passes() {
    let rulesArray = this.explodeRules(this.rules);

    for (let attribute in rulesArray) {
      let rules = rulesArray[attribute];

      for (let item of rules) {
        let parsedRule = this.parseRule(item);

        let rule = parsedRule.rule;
        let parameters = parsedRule.parameters;
        let value = this.getValue(attribute);
        let fn = this.resolvers[rule];
        let validatable = Util.isFunction(fn);

        if (validatable && !fn(attribute, value, parameters)) {
          this.addFailure(attribute, rule, parameters)
        }

      }
    }

    return Util.isEmptyObject(this.errors);
  }

  fails() {
    return !this.passes();
  }

  register(rule, fn, message) {
      this.resolvers[rule] = fn;
      this.message[rule] = (Util.isString(message)) ? message : this.message['def'];
  }

}

export {
  Validator
};