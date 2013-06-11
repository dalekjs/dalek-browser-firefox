var FirefoxDriver = require('../index');

exports.canGetWebdriverPort = function(test){
    test.expect(1);
    test.equal(FirefoxDriver.getPort(), 9006, "can get webdriver port");
    test.done();
};

exports.canGetMarionettePort = function(test){
    test.expect(1);
    test.equal(FirefoxDriver.getMarionettePort(), 2828, "can get static marionette port");
    test.done();
};

exports.canGetHost = function(test){
    test.expect(1);
    test.equal(FirefoxDriver.getHost(), 'localhost', "can get static host");
    test.done();
};
