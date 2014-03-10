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
var net = require('net');
var Q = require('q');

/**
 * Firefox Autotest (Marionette)
 * connection handler & request executor
 *
 * @module FirefoxDriver
 * @class Marionette
 * @namespace FirefoxDriver
 */

/**
 * Configures the marionette socket
 * Prepares the object properties
 * Loads the marionette commands
 *
 * @constructor
 * @param {EventEmitter} events
 */

var Marionette = function (events) {
  // configure the marionette socket
  this.socket = new net.Socket();
  this.socket.on('error', this._onError.bind(this));
  this.socket.on('data', this._onData.bind(this));

  // configure marionette session container
  this._marionetteID = null;

  // store events instance
  this.events = events;

  // register marionette id setter
  this.events.on('marionette:setMarionetteID', function (id) {
    this._marionetteID = id;
  }.bind(this));

  // prepare the commands property
  this.commands = {};

  // prepare the last send command property
  this._lastCommand = null;

  // prepare the last message length property
  this._lastMessageLength = null;

  // load the commands
  this._loadCommands();
};

/**
 * Opens the marionette socket
 *
 * @method connect
 * @param {integer} marionettePort
 * @return {Q.promise} promise
 * @public
 */

Marionette.prototype.connect = function (marionettePort) {
  var deferred = Q.defer();
  this.socket.on('connect', deferred.resolve);
  this.socket.connect(marionettePort);
  return deferred.promise;
};

/**
 * Closes the marionette socket & cleans up
 *
 * @method kill
 * @return {Q.promise} promise
 * @public
 */

Marionette.prototype.kill = function () {
  var deferred = Q.defer();
  this.socket.on('end', deferred.makeNodeResolver());
  this.socket.end();
  return deferred.promise;
};

/**
 * Generates a function & an event listener for every marionette command
 *
 * @method addCommand
 * @param {object} command
 * @return {object} command
 * @public
 */

Marionette.prototype.addCommand = function (command) {
  // generate the command function
  this.commands[command.name] = function (params) {
    var req = {};
    var deferred = Q.defer();

    deferred.promise.then(function (data) {
      this.events.emit('marionette:cmd:' + command.name + ':response', JSON.stringify(data));
    }.bind(this));

    // parse the command skeleton & create a message with values
    Object.keys(command.request).forEach(function (key){
      // cookie related hack
      if (command.name === 'cookies' && this._parseRequestKey(command.request[key], params) === '') {
      } else {
        req[key] = this._parseRequestKey(command.request[key], params);
      }
    }.bind(this));

    // issue the command
    this._sendCommand(req, deferred);
  }.bind(this);

  // generate event listener for every marionette command
  this.events.on('marionette:cmd:' + command.name, this.commands[command.name].bind(this));
  return command;
};

/**
 * Loads the marionette commands from the commands library
 *
 * @method _loadCommands
 * @chainable
 * @private
 */

Marionette.prototype._loadCommands = function () {
  var dir = __dirname + '/commands/marionette/';
  fs.readdirSync(dir).forEach(function (file) {
    require(dir + file)(this);
  }.bind(this));
  return this;
};

/**
 * Templating function that replaces placeholders in commands
 * with their actual values
 *
 * @method _parseRequestKey
 * @param {string} placeholder
 * @param {object} params
 * @return {string} content
 * @private
 */

Marionette.prototype._parseRequestKey = function (placeholder, params) {
  if (typeof placeholder !== 'object' && placeholder[0] !== ':') {
    return placeholder;
  }

  // check the params
  if (!params) {
    params = {};
  }

  // add the marionetteID to the params
  if (typeof placeholder !== 'object') {
    params.marionetteId = this._marionetteID;
  }

  var content = '';
  if (typeof placeholder !== 'object') {
    Object.keys(params).forEach(function (key){
      if (key === placeholder.substr(1)) {
        content = params[key];
      }
    }.bind(this));
  }

  // check if we have a params object (and replace also there)
  if (typeof placeholder === 'object') {
    content = {};

    Object.keys(params).forEach(function (key) {
      Object.keys(placeholder).forEach(function (name) {
        if (placeholder[name] && placeholder[name].substring(1) === key) {
          content[name] = params[key];
        }
      }.bind(this));
    }.bind(this));

    Object.keys(placeholder).forEach(function (name) {
      if (placeholder[name].substr(0, 1) !== ':') {
        content[name] = placeholder[name];
      }
    }.bind(this));
  }

  return content;
};

/**
 * Will be called if a socket error occurs
 *
 * @method _onError
 * @param {buffer} err
 * @chainable
 * @private
 */

Marionette.prototype._onError = function (err) {
  // TODO: Use the super not yet implemented dalek error handler
  console.log('ERR', String(err));
  process.exit();
  return this;
};

/**
 * Handles the incoming data from the marionette sockets
 *
 * @method _onData
 * @param {buffer} data
 * @chainable
 * @private
 */

Marionette.prototype._onData = function (data) {
  var def = Q.defer();
  var raw = String(data);
  // extract the header out of the raw message
  var colon = raw.indexOf(':');
  var length = raw.substr(0, colon);
  var msg = raw.substring(colon + 1);

  // check if this is incoming data is a sibling
  // to a previous received message
  if (isNaN(parseInt(length, 10))) {
    length = this._lastResponseLength;
  }

  // store message data
  this._lastResponseLength = length;
  this._lastResponse += msg;
  this._lastRawResponse += raw;

  // check if the message is complete
  if((this._lastResponse.length + 1) >= parseInt(length, 10)) {
    // resolve the message
    def.resolve(this._lastRawResponse);

    // reset our message storage
    this._lastRawResponse = '';
    this._lastResponse = '';
    this._lastResponseLength = null;
  }

  // release the message when it is completely received
  Q.when(def.promise).then(function(data) {
    // parse the message & call the resolving function
    var parsedMessage = this._parseMessage(data);
    // avoid resolving the initial handshake command
    if (!parsedMessage.applicationType) {
      this._lastCommand.resolve(parsedMessage);
    }

  }.bind(this));

  return this;
};


/**
 * Parses a marionette response message
 *
 * @method _parseMessage
 * @param {buffer} data
 * @return {object} message
 * @private
 */

Marionette.prototype._parseMessage = function (data) {
  var raw = String(data);
  var colon = raw.indexOf(':');
  var message = JSON.parse(raw.substring(colon + 1));
  return message;
};

/**
 * Issues a command to the marionette server
 * Generates a reference to the last called command,
 * so that we are able to call the right receiver function for
 * the response from marionette
 *
 * @method _sendCommand
 * @param {object} command
 * @param {Q.promise} deferred
 * @chainable
 * @private
 */

Marionette.prototype._sendCommand = function (command, deferred) {
  // serialize message
  var commandSerialized = JSON.stringify(command);
  var msg = commandSerialized.length + ':' + commandSerialized;
  // reference promise
  this._lastCommand = deferred;
  // send command
  this.socket.write(msg);

  return this;
};

module.exports = Marionette;
