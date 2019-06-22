var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#between()', function(){
    var rules = {
        between: 'between:3,4'
      }

    it('失败(数组)', function() {
      var input = {
        between: [
            'foo', 'bar'
        ]
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(数组)', function() {
        var input = {
          between: [
              'foo', 'bar', 'way'
          ]
        }
        var v = new Validator(input, rules);
        assert.equal(true, v.passes());
      });

    it('失败(字符串)', function() {
      var input = {
        between: "fo"
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符串)', function() {
        var input = {
          between: "foo"
        }
        var v = new Validator(input, rules);
        assert.equal(true, v.passes());
      });
  });
});