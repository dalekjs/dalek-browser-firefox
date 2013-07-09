'use strict';

var expect = require('chai').expect;
var Timeout = require('../lib/commands/marionette/timeout.js');

describe('dalek-browser-firefox Command/Marionette/Timeout', function () {

  it('should exist', function () {
    expect(Timeout).to.be.ok;
  });

});
