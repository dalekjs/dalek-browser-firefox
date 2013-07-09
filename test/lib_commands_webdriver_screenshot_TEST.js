'use strict';

var expect = require('chai').expect;
var Screenshot = require('../lib/commands/webdriver/screenshot.js');

describe('dalek-browser-firefox Command/Webdriver/Screenshot', function () {

  it('should exist', function () {
    expect(Screenshot).to.be.ok;
  });

});
