var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#digits()', function(){
    var rules = {
        digits: 'digits:3'
      }

    it('失败(字符串"ABC")', function() {
      var input = {
        digits: 'ABC',
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('失败(数字"12")', function() {
      var input = {
        digits: 12,
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常', function() {
        var input = {
          digits: 123,
        }
        var v = new Validator(input, rules);
        assert.equal(true, v.passes());
      });
  });
});