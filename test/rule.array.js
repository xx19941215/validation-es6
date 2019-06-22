var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#array()', function(){
    var rules = {
        array: 'array'
      }

    it('失败(字符串"ABC")', function() {
      var input = {
        array: 'ABC'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(数组)', function() {
      var input = {
        array: []
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });
  });
});