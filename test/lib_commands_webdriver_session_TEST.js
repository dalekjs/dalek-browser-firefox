'use strict';

var expect = require('chai').expect;
var Session = require('../lib/commands/webdriver/session.js');

describe('dalek-browser-firefox Command/Webdriver/Session', function () {

  it('should exist', function () {
    expect(Session).to.be.ok;
  });

});
