var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#object()', function(){
    var rules = {
        object: 'object'
      }

    it('失败(字符串"ABC")', function() {
      var input = {
        object: 'ABC'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(对象)', function() {
      var input = {
        object: {}
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });
  });
});