'use strict';

var expect = require('chai').expect;
var Storage = require('../lib/commands/marionette/storage.js');

describe('dalek-browser-firefox Command/Marionette/Storage', function () {

  it('should exist', function () {
    expect(Storage).to.be.ok;
  });

});
