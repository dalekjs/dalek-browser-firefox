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
 * Page related Marionette commands
 * see [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)
 *
 * @module FirefoxDriver
 * @class Page
 * @namespace FirefoxDriver.Commands.Marionette
 */

module.exports = function (Marionette) {

  /**
   * Get the current page source
   *
   * @method source
   */

  Marionette.addCommand({
    name: 'source',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      type: 'getPageSource'
    }
  });

  /**
   * Get the current page title
   *
   * @method title
   */

  Marionette.addCommand({
    name: 'title',
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      type: 'getTitle'
    }
  });

  /**
   * Get the current geo location
   *
   * @method geoLocation
   */

  Marionette.addCommand({
    name: 'geoLocation',
    implemented: false
  });

  /**
   * Set the geo location
   *
   * @method setGeoLocation
   */

  Marionette.addCommand({
    name: 'setGeoLocation',
    implemented: false
  });

};
