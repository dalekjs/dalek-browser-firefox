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
 * Element related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Element
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Search for an element on the page, starting from the document root.
   * The located element will be returned as a WebElement JSON object.
   *
   * @method element
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} using The locator strategy to use. // Not yet supported
   * @param {POST} value The The search target.
   */

  Driver.addCommand({
    name: 'element',
    url: '/session/:sessionId/element',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:element', {'sessionId': req.params.sessionId, 'selector': req.body.value});
        this.events.on('marionette:cmd:element:response', function (element) {
            var dt = null;
            if (!element.value) {
                dt = -1;
            } else {
                dt = {ELEMENT: element.value};
            }

            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: dt
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  /**
   * Search for multiple elements on the page, starting from the document root.
   * The located element will be returned as a WebElement JSON object.
   *
   * @method elements
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/elements
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} using The locator strategy to use. // Not yet supported
   * @param {POST} value The The search target.
   */

  Driver.addCommand({
    name: 'elements',
    url: '/session/:sessionId/elements',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:elements', {'sessionId': req.params.sessionId, 'selector': req.body.value});
        this.events.on('marionette:cmd:elements:response', function (elements) {
            var dt = null;
            if (!elements.value) {
                dt = -1;
            } else {
                dt = [];
                elements.value.forEach(function (el) {
                    dt.push({ELEMENT: el});
                });
            }

            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: dt
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  /**
   * Click on an element.
   *
   * @method click
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/click
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'click',
    url: '/session/:sessionId/element/:elementId/click',
    method: 'post',
    timeout: 1000
  });

  /**
   * Returns the visible text for the element.
   *
   * @method text
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/text
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'text',
    url: '/session/:sessionId/element/:elementId/text',
    method: 'get'
  });

  /**
   * Get the value of an element's attribute.
   *
   * @method attribute
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/attribute/:name
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {GET} attr Attribute that should be fetched
   */

  Driver.addCommand({
    name: 'attribute',
    url: '/session/:sessionId/element/:elementId/attribute/:attr',
    method: 'get'
  });

  /**
   * Determine an element's location on the page.
   * The point (0, 0) refers to the upper-left corner of the page.
   * The element's coordinates are returned as a JSON object with x and y properties.
   *
   * @method displayed
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/displayed
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'displayed',
    url: '/session/:sessionId/element/:elementId/displayed',
    method: 'get'
  });

};
