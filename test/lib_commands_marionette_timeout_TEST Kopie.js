'use strict';

var expect = require('chai').expect;
var Timeout = require('../lib/commands/webdriver/timeout.js');

describe('dalek-browser-firefox Command/Webdriver/Timeout', function () {

  it('should exist', function () {
    expect(Timeout).to.be.ok;
  });

});
