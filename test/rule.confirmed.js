var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#confirmed()', function(){
    var rules = {
        confirmed: 'confirmed'
      }

    it('失败', function() {
      var input = {
        confirmed: 'confirmed',
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常', function() {
        var input = {
            confirmed: 'confirmed',
            confirmed_confirmation: 'confirmed'
        }
        var v = new Validator(input, rules);
        assert.equal(true, v.passes());
      });
  });
});