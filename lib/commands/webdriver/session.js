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

/**
 * Session related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Session
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Create a new session. The server should attempt to create a session that most closely matches
   * the desired and required capabilities. Required capabilities have higher priority than
   * desired capabilities and must be set for the session to be created.
   *
   * @method createSession
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session
   * @param {POST} desiredCapabilities An object describing the session's desired capabilities.
   * @param {POST} requiredCapabilities An object describing the session's required capabilities
   * @return {303} See Other redirect to /session/:sessionId, where :sessionId is the ID of the newly created session.
   */

  Driver.addCommand({
    name: 'createSession',
    url: '/session',
    method: 'post',
    onRequest: function (req, res) {
      // load the marionette connection id & then request the session id
      this.events.emit('marionette:cmd:getMarionetteID');
      this.events.on('marionette:cmd:getMarionetteID:response', function (connection) {
        this.events.emit('marionette:setMarionetteID', connection.id);
        this.events.emit('marionette:cmd:getSession');
      }.bind(this));

      // send out the webdriver session response
      this.events.on('marionette:cmd:getSession:response', function (session) {
        session = JSON.parse(session);
        res.location('http://' + this.host + ':' + this.port + '/session/' + session.value);
        res.end();
      }.bind(this));
    }
  });

  /**
   * Returns a list of the currently active sessions
   *
   * @method sessions
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/sessions
   */

  Driver.addCommand({
    name: 'sessions',
    url: '/sessions',
    method: 'get'
  });

  /**
   * Returns a list of the currently active sessions
   *
   * @method sessions
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/sessions
   */

  Driver.addCommand({
    name: 'sessions',
    url: '/sessions',
    method: 'get'
  });

  /**
   * Retrieve the capabilities of the specified session.
   *
   * @method session
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'session',
    url: '/session/:sessionId',
    method: 'get'
  });

  /**
   * Delete the session.
   *
   * @method session
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'deleteSession',
    url: '/session/:sessionId',
    method: 'del'
  });

};
