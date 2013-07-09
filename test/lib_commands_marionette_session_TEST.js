'use strict';

var expect = require('chai').expect;
var Session = require('../lib/commands/marionette/session.js');

describe('dalek-browser-firefox Command/Marionette/Session', function () {

  it('should exist', function () {
    expect(Session).to.be.ok;
  });

});
