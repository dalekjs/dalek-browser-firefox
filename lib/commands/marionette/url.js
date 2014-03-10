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
 * Url related Marionette commands
 * see [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)
 *
 * @module FirefoxDriver
 * @class Url
 * @namespace FirefoxDriver.Commands.Marionette
 */

module.exports = function (Marionette) {

  /**
   * Navigate to a new URL
   *
   * @method open
   */

  Marionette.addCommand({
    name: 'open',
    params: ['url'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: 'goUrl',
      parameters: {
        url: ':url'
      }
    }
  });

  /**
   * Retrieve the URL of the current page
   *
   * @method url
   */

  Marionette.addCommand({
    name: 'url',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: 'getUrl'
    }
  });

  /**
   * Navigate backwards in the browser history, if possible
   *
   * @method back
   */

  Marionette.addCommand({
    name: 'back',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: 'goBack'
    }
  });

  /**
   * Navigate forwards in the browser history, if possible.
   *
   * @method forward
   */

  Marionette.addCommand({
    name: 'forward',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: 'goForward'
    }
  });

  /**
   * Refresh the current page
   *
   * @method refresh
   */

  Marionette.addCommand({
    name: 'refresh',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      name: 'refresh'
    }
  });

};
