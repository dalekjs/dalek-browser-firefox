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

/**
 * IME related Marionette commands
 * see [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)
 *
 * @module FirefoxDriver
 * @class IME
 * @namespace FirefoxDriver.Commands.Marionette
 */

module.exports = function (Marionette) {

  /**
   * Query the server's current status.
   * The server should respond with a general "HTTP 200 OK" response if it is alive and accepting commands.
   * The response body should be a JSON object describing the state of the server.
   * All server implementations should return two basic objects describing the server's current platform
   * and when the server was built. All fields are optional; if omitted, the client should assume the value is uknown.
   * Furthermore, server implementations may include additional fields not listed here.
   *
   * @method status
   */

  Marionette.addCommand({
    name: 'status',
    request: {
      to: ':marionetteId',
      type: 'getStatus'
    }
  });

};
