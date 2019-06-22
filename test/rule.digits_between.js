var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#digits_between()', function(){
    var rules = {
        digits_between: 'digits_between:3,5'
      }

    it('失败(字符串"ABC")', function() {
      var input = {
        digits_between: 'ABC',
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('失败(数字"12")', function() {
      var input = {
        digits_between: 12,
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常', function() {
        var input = {
            digits_between: 1234,
        }
        var v = new Validator(input, rules);
        assert.equal(true, v.passes());
      });
  });
});