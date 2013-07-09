'use strict';

var expect = require('chai').expect;
var Execute = require('../lib/commands/marionette/execute.js');

describe('dalek-browser-firefox Command/Marionette/Execute', function () {

  it('should exist', function () {
    expect(Execute).to.be.ok;
  });

});
