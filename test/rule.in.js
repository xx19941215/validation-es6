var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#in()', function(){
    var rules = {
        in: 'in:foo,bar'
      }

    it('失败', function() {
      var input = {
        in: 'ABC',
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常', function() {
      var input = {
        in: 'foo',
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

  });
});