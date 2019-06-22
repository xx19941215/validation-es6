var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#alpha_num()', function(){
    var rules = {
        string: 'alpha_num'
      }

    it('正常(字符串"ABC")', function() {
      var input = {
        string: 'ABC'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(含数字)', function() {
      var input = {
        string: 'abc0s'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(数字前置)', function() {
      var input = {
        string: '1sbcdAb'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(数字后置)', function() {
      var input = {
        string: 'sbcdAb9'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('失败(含下划线)', function() {
      var input = {
        string: 'on_focus'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('失败(空白)', function() {
      var input = {
        string: ""
      }

      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('失败(字符"*")', function() {
      var input = {
        string: '*'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
  });
});