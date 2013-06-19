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
 * Logging related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Logging
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Get the log for a given log type.
   * Log buffer is reset after each request.
   *
   * @method log
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/log
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'log',
    url: '/session/:sessionId/log',
    method: 'get'
  });

  /**
   * Get available log types
   *
   * @method logTypes
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/log/types
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'logTypes',
    url: '/session/:sessionId/log/types',
    method: 'get'
  });

};
