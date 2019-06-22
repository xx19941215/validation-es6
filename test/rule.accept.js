var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#accept()', function(){
    var rules = {
        accept: 'accepted'
      }

    it('正常(数字1)', function() {
      var input = {
        accept: 1
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符1)', function() {
      var input = {
        accept: '1'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(数字0)', function() {
      var input = {
        accept: 0
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符0)', function() {
      var input = {
        accept: '0'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"on")', function() {
      var input = {
        accept: 'on'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"ON")', function() {
      var input = {
        accept: 'ON'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"off")', function() {
      var input = {
        accept: 'off'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"OFF")', function() {
      var input = {
        accept: 'OFF'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"yes")', function() {
      var input = {
        accept: 'yes'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"YES")', function() {
      var input = {
        accept: 'YES'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"no")', function() {
      var input = {
        accept: 'no'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"NO")', function() {
      var input = {
        accept: 'NO'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(bool true)', function() {
      var input = {
        accept: true
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"true")', function() {
      var input = {
        accept: 'true'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(字符"TRUE")', function() {
      var input = {
        accept: 'TRUE'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('正常(bool false)', function() {
      var input = {
        accept: false
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"false")', function() {
      var input = {
        accept: 'false'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('正常(字符"FALSE")', function() {
      var input = {
        accept: 'FALSE'
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
  });
});