/*!
 *
 * Copyright (c) 2013 Sebastian Golasch
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 */

// ext. libs
var Q = require('q');
var express = require('express');

var WebDriverServer = function (events) {
    // store events
    this.events = events;

    // placeholder for the webdriver server port
    this.port = null;

    // configure express
    this.app = express();
    this.app.use(express.bodyParser());

    // load the commands
    this._loadCommands();
};

/**
 *
 */

WebDriverServer.prototype.connect = function (webdriverPort) {
    var deferred = Q.defer();
    this.port = webdriverPort;
    this.listener = this.app.listen(webdriverPort, deferred.resolve);
    return deferred.promise;
};

/**
 * Closes the webdriver server port & cleans up
 *
 */

WebDriverServer.prototype.kill = function () {
    var deferred = Q.defer();
    this.listener.close();
    deferred.resolve();
    return deferred.promise;
};

/**
 * Loads the marionette commands from the commands library
 */

WebDriverServer.prototype._loadCommands = function (err) {
    ['element', 'session', 'screenshot', 'url', 'page', 'timeout']
    .forEach(function (namespace) {
        require('./commands/webdriver/' + namespace)(this);
    }.bind(this));
};

/**
 * Generates a function for every marionette command
 */

WebDriverServer.prototype.addCommand = function (command) {
    var cb = command.onRequest ? command.onRequest.bind(this) : this._onRequest.bind(this);
    this.app[command.method](command.url, cb);
    return command;
};

/**
 *
 */

WebDriverServer.prototype._onRequest = function (req, res) {

};

module.exports = WebDriverServer;
