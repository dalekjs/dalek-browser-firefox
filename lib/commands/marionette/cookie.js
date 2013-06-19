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
 * Cookie related Marionette commands
 * see [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)
 *
 * @module FirefoxDriver
 * @class Cookie
 * @namespace FirefoxDriver.Commands.Marionette
 */

module.exports = function (Marionette) {

  /**
   * Retrieve all cookies visible to the current page.
   *
   * @method getCookies
   */

  Marionette.addCommand({
    name: 'getCookies',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      type: 'getAllCookies'
    }
  });

  /**
   * Delete all cookies visible to the current page.
   *
   * @method deleteCookies
   */

  Marionette.addCommand({
    name: 'deleteCookies',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      type: 'deleteAllCookies'
    }
  });

  /**
   * Delete the cookie with the given name.
   * This command should be a no-op if there is no such cookie visible to the current page.
   *
   * @method deleteCookie
   */

  Marionette.addCommand({
    name: 'deleteCookie',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: ':name',
      type: 'deleteCookie'
    }
  });

  /**
   * Set a cookie. If the cookie path is not specified, it should be set to "/".
   * Likewise, if the domain is omitted, it should default to the current page's domain.
   *
   * @method addCookie
   */

  Marionette.addCommand({
    name: 'addCookie',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      path: ':path',
      domain: ':domain',
      secure: ':secure',
      expiry: ':expiry',
      value: ':cookie',
      name: ':name',
      type: 'addCookie'
    }
  });

};
