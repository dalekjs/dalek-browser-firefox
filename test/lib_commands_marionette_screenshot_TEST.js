'use strict';

var expect = require('chai').expect;
var Screenshot = require('../lib/commands/marionette/screenshot.js');

describe('dalek-browser-firefox Command/Marionette/Screenshot', function () {

  it('should exist', function () {
    expect(Screenshot).to.be.ok;
  });

});
