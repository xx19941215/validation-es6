export default class Util {
    static inArray(needle, haystack, isStrict = false) {
        for (let item of haystack) {
            if (isStrict ? (item === needle) : item == needle) {
                return true;
            }
        }

        return false;
    }

    static isObject(needle) {
        return (typeof needle === 'object');
    }

    static isEmptyObject(object) {
        for (let key in object) return false;
        return true;
    }

    static isFunction(needle) {
        return (typeof needle === 'function');
    }

    static isString(needle) {
        return (typeof needle === 'string');
    }

    static isArray(needle) {
        return Array.isArray(needle);
    }
};