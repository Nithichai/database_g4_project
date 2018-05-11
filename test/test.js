const assert = require('assert');
const user_model = require('../models/user_model')

describe('model', function() {
  describe('user_model', function() {
    // it('should return true when register complete', function {
    //   body = {
    //     'login_id' : 'nopyjf',
    //     'login_email' : 'rockon23146@gmail.com',
    //     'login_pass' : 'yes'
    //   }
    //   user_model.insert(body, function(message, bool) {
    //     console.log(message, bool);
    //   });
    // });

    // it('should return true when log in complete (nopyjf)', function() {
    //   body = {
    //     'login_email' : 'nopyjf',
    //     'login_pass' : 'yes'
    //   }
    //   user_model.check_id(body, function(message, bool) {
    //     console.log(message, bool);
    //   });
    // });

    // it('should return true when log in complete (rockon23146@gmail.com)', function() {
    //   body = {
    //     'login_email' : 'rockon23146@gmail.com',
    //     'login_pass' : 'yes'
    //   }
    //   user_model.check_id(body, function(message, bool) {
    //     console.log(message, bool);
    //   });
    // });

    it('should return true when you are signed up', function() {
      body = {
        'login_id' : 'nopyjf',
        'login_email' : 'rockon23146@gmail.com',
        'login_pass' : 'yes'
      }
      user_model.check_loop_signup(body, function(message, bool) {
        console.log(message, bool);
      });
    });
  });
});