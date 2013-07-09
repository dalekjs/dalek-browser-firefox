'use strict';

var expect = require('chai').expect;
var Page = require('../lib/commands/marionette/page.js');

describe('dalek-browser-firefox Command/Marionette/Page', function () {

  it('should exist', function () {
    expect(Page).to.be.ok;
  });

});
