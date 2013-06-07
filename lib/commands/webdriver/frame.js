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
 * Frame related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Frame
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Change focus to another frame on the page.
   * If the frame id is null, the server should switch to the page's default content.
   *
   * @method frame
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/frame
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} id Identifier for the frame to change focus to.
   */

  Driver.addCommand({
    name: 'frame',
    url: '/session/:sessionId/frame',
    method: 'post',
    params: {id: 'id'}
  });

};
