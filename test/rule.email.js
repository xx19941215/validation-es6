var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#email()', function(){
    var rules = {
        email: 'email'
      }

    it('失败', function() {
      var input = {
        email: 'ABC',
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常', function() {
      var input = {
        email: '88888@qq.com',
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

  });
});