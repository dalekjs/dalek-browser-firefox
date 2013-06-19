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
 * Cookie related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Cookie
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Set a cookie. If the cookie path is not specified, it should be set to "/".
   * Likewise, if the domain is omitted, it should default to the current page's domain.
   *
   * @method cookies
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/cookie
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} cookie A JSON object defining the cookie to add.
   */

  Driver.addCommand({
    name: 'cookies',
    url: '/session/:sessionId/cookie',
    method: 'post',
    params: {cookie: 'cookie'}
  });

  /**
   * Retrieve all cookies visible to the current page.
   *
   * @method getCookies
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/cookie
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getCookies',
    url: '/session/:sessionId/cookie',
    method: 'get'
  });

  /**
   * Delete all cookies visible to the current page.
   *
   * @method deleteCookies
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/cookie
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'deleteCookies',
    url: '/session/:sessionId/cookie',
    method: 'del'
  });

  /**
   * Delete the cookie with the given name.
   * This command should be a no-op if there is no such cookie visible to the current page.
   *
   * @method deleteCookie
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/cookie
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'deleteCookie',
    url: '/session/:sessionId/cookie/:name',
    method: 'del'
  });

};
