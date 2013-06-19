'use strict';

var expect = require('chai').expect;
var FirefoxDriver = require('../index');

describe('dalek-browser-firefox', function() {

  it('should get default webdriver port', function(){
    expect(FirefoxDriver.getPort()).to.equal(9006);
  });

  it('should get default marionette port', function(){
    expect(FirefoxDriver.getMarionettePort()).to.equal(2828);
  });

  it('should get default host', function(){
    expect(FirefoxDriver.getHost()).to.equal('localhost');
  });

});
