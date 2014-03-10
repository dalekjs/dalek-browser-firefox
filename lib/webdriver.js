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

'use strict';

// ext. libs
var fs = require('fs');
var Q = require('q');
var express = require('express');
var connect = require('connect');

/**
 * Firefox Autotest (Marionette)
 * WebDriver handler & request executor
 *
 * @module FirefoxDriver
 * @class WebDriverServer
 * @namespace FirefoxDriver
 */

/**
 * Configures the express server
 * Prepares the object properties
 * Loads the webdriver commands
 *
 * @constructor
 * @param {EventEmitter} events
 */

var WebDriverServer = function (events) {
  // store events
  this.events = events;

  // placeholder for the webdriver server port & host
  this.port = null;
  this.host = null;

  // configure express
  this.app = express();

  this.app.use(connect.json());
  this.app.use(connect.urlencoded());

  // load the commands
  this._loadCommands();
};

/**
 * Opens the WebDriverServer port
 *
 * @method connect
 * @param {integer} webdriverPort
 * @return {Q.promise} promise
 * @public
 */

WebDriverServer.prototype.connect = function (webdriverPort, webdriverHost) {
  var deferred = Q.defer();
  // store host & port
  this.port = webdriverPort;
  this.host = webdriverHost;
  // start the webdriver server
  this.listener = this.app.listen(webdriverPort, deferred.resolve);
  return deferred.promise;
};

/**
 * Closes the webdriver server port & cleans up
 *
 * @method kill
 * @return {Q.promise} promise
 * @public
 */

WebDriverServer.prototype.kill = function () {
  var deferred = Q.defer();
  this.listener.close(deferred.resolve);
  return deferred.promise;
};

/**
 * Generates a function for every webdriver command
 * and an express route endpoint
 *
 * @method addCommand
 * @param {object} command
 * @return {object} command
 * @public
 */

WebDriverServer.prototype.addCommand = function (command) {
  // bind the command callback (on request)
  var cb = command.onRequest ? command.onRequest.bind(this) : this._onRequest.bind(this, command);
  // register the REST endpoint
  this.app[command.method](command.url, cb);
  return command;
};

/**
 * Loads the webdriver commands (aka. REST endpoints) from the commands library
 *
 * @method _loadCommands
 * @chainable
 * @private
 */

WebDriverServer.prototype._loadCommands = function () {
  var dir = __dirname + '/commands/webdriver/';
  fs.readdirSync(dir).forEach(function (file) {
    require(dir + file)(this);
  }.bind(this));
  return this;
};

/**
 * Default webdriver request handler,
 * will be used if no `onRequest` method is given in the
 * webdriver command
 *
 * @method _onRequest
 * @param {object} command
 * @param {object} req
 * @param {object} res
 * @chainable
 * @private
 */

WebDriverServer.prototype._onRequest = function (command, req, res) {
  // extract the request paramters
  var parameters = {};
  Object.keys(req.params).forEach(function (key) {
    parameters[key] = req.params[key];
  });

  // add paramters extracted from the post body if necessary
  if (command.params) {
    Object.keys(command.params).forEach(function (key) {
      parameters[key] = req.body[command.params[key]];
    });
  }

  // trigger the marionette command
  this.events.emit('marionette:cmd:' + command.name, parameters);

  // generate & send the webdriver response when the command has been executed by marionette
  this.events.on('marionette:cmd:' + command.name + ':response', function (data) {
    var parsedData = {};

    try {
      parsedData = JSON.parse(data);
    } catch (e) {
      parsedData = data;
    }

    data = parsedData;
    var answer = { sessionId: parameters.sessionId, status: 0};

    // check if we need to send a value with the response
    if (data.value || data.value === false) {
      answer.value = data.value;
    }

    res.status(200);
    res.send(JSON.stringify(answer));

  }.bind(this));

  return this;
};

module.exports = WebDriverServer;
