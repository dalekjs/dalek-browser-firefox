'use strict';

var expect = require('chai').expect;
var Execute = require('../lib/commands/webdriver/execute.js');

describe('dalek-browser-firefox Command/Webdriver/Execute', function () {

  it('should exist', function () {
    expect(Execute).to.be.ok;
  });

});
