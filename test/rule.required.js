var assert = require("assert");
import {Validator} from "../validator.js";

/* required */
describe('Validator', function(){
  describe('#required()', function(){
    it('验证通过(正常)', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: 'Joy'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('验证通过(非空数组)', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: ['Joy']
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });

    it('验证失败(空数组)', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: []
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('验证失败(空对象)', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: {}
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

    it('验证失败（多维数组）', function() {
      var rules = {
        username: 'required'
      }
      var input = [
        {username: ''}
      ]
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
 
    it('验证失败（空字符串）', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: ''
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
 
    it('验证失败（字符串00）', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: '00'
      }
      var v = new Validator(input, rules);
      assert.equal(true, v.passes());
    });
 
    it('验证失败（null）', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: null
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
 
    it('验证失败（undefined）', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: undefined
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });
  
    it('验证失败（0）', function() {
      var rules = {
        username: 'required'
      }
      var input = {
        username: 0
      }
      var v = new Validator(input, rules);
      assert.equal(false, v.passes());
    });

  })
})