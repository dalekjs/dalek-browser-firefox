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
 * Element related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Element
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  // check if the driver helper literal has been created yet
  if (!Driver._helper) {
    Driver._helper = {};
  }

  // Helper
  // ------

  /**
   * Parses an element return value
   *
   * @method parseElement
   * @param {object} element Marionette return value of an element call
   * @return {object|number} Webdriver compatible element response
   * @private
   */

  Driver._helper.parseElement = function (element) {
    return (!element.value) ? -1 : {ELEMENT: element.value};
  };

  /**
   * Parses multi elements return value
   *
   * @method parseElements
   * @param {object} element Marionette return value of an elements call
   * @return {object|number} Webdriver compatible elements response
   * @private
   */

  Driver._helper.parseElements = function (elements) {
    if (!elements.value) {
      return -1;
    }

    var dt = [];
    elements.value.forEach(function (el) {
      dt.push({ELEMENT: el});
    });

    return dt;
  };

  /**
   * Generic multi elements response handler
   *
   * @method multiElementResponse
   * @param {object} req Original request
   * @param {object} res Original response
   * @private
   */

  Driver._helper.multiElementResponse = function (req, res, elements) {
    var answer = {
      sessionId: req.params.sessionId,
      status: 0,
      value: Driver._helper.parseElements(elements)
    };

    res.status(200);
    res.send(JSON.stringify(answer));
  };

  /**
   * Generic single element response handler
   *
   * @method singleElementResponse
   * @param {object} req Original request
   * @param {object} res Original response
   * @private
   */

  Driver._helper.singleElementResponse = function (req, res, element) {
    var answer = {
      sessionId: req.params.sessionId,
      status: 0,
      value: Driver._helper.parseElement(element)
    };

    res.status(200);
    res.send(JSON.stringify(answer));
  };

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
      this.events.on('marionette:cmd:element:response', Driver._helper.singleElementResponse.bind(this, req, res));
    }
  });

  /**
   * Search for an element on the page, starting from the identified element.
   * The located element will be returned as a WebElement JSON object.
   * The table below lists the locator strategies that each server should support.
   * Each locator must return the first matching element located in the DOM.
   *
   * @method childElement
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/:id/element
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {POST} using The locator strategy to use. // Not yet supported
   * @param {POST} value The The search target.
   */

  Driver.addCommand({
    name: 'childElement',
    url: '/session/:sessionId/element/:elementId/element',
    method: 'post',
    onRequest: function (req, res) {
      // load the marionette connection id & then request the session id
      this.events.emit('marionette:cmd:childElement', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId, 'selector': req.body.value});
      this.events.on('marionette:cmd:childElement:response', Driver._helper.singleElementResponse.bind(this, req, res));
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
      this.events.on('marionette:cmd:elements:response', Driver._helper.multiElementResponse.bind(this, req, res));
    }
  });

  /**
   * Search for multiple elements on the page, starting from the identified element.
   * The located elements will be returned as a WebElement JSON objects.
   * The table below lists the locator strategies that each server should support.
   * Elements should be returned in the order located in the DOM.
   *
   * @method childElements
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/elements/:id/elements
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {POST} using The locator strategy to use. // Not yet supported
   * @param {POST} value The The search target.
   */

  Driver.addCommand({
    name: 'childElements',
    url: '/session/:sessionId/elements/:elementId/elements',
    method: 'post',
    onRequest: function (req, res) {
      // load the marionette connection id & then request the session id
      this.events.emit('marionette:cmd:childElements', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId, 'selector': req.body.value});
      this.events.on('marionette:cmd:childElements:response', Driver._helper.multiElementResponse.bind(this, req, res));
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
    timeout: 1500
  });

  /**
   * Submit a FORM element.
   * The submit command may also be applied to any element that is a descendant of a FORM element.
   *
   * @method submit
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/submit
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'submit',
    url: '/session/:sessionId/element/:elementId/submit',
    method: 'post',
    timeout: 1000
  });

  /**
   * Send a sequence of key strokes to an element
   *
   * @method value
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/value
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {POST} value The keys sequence to be sent
   */

  Driver.addCommand({
    name: 'val',
    url: '/session/:sessionId/element/:elementId/value',
    method: 'post',
    params: {value: 'value'}
  });

  /**
   * Clears the contents of an element
   *
   * @method value
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/element/:id/value
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {POST} value The keys sequence to be sent
   */

  Driver.addCommand({
    name: 'clear',
    url: '/session/:sessionId/element/:elementId/clear',
    method: 'post'
  });

  Driver.addCommand({
    name: 'submit',
    url: '/session/:sessionId/element/:elementId/submit',
    method: 'post'
  });

  /**
   * Send a sequence of key strokes to the active element.
   * This command is similar to the send keys command in every aspect except the implicit termination:
   * The modifiers are not released at the end of the call.
   * Rather, the state of the modifier keys is kept between calls,
   * so mouse interactions can be performed while modifier keys are depressed.
   *
   * @method keys
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#/session/:sessionId/keys
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} value  The keys sequence to be sent
   */

  Driver.addCommand({
    name: 'keys',
    url: '/session/:sessionId/keys',
    method: 'post',
    params: {value: 'value'}
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

  /**
   * Query for an element's tag name
   *
   * @method tagName
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/name
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'tagName',
    url: '/session/:sessionId/element/:elementId/name',
    method: 'get'
  });

  /**
   * Clear a TEXTAREA or text INPUT element's value
   *
   * @method clear
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/element/:id/clear
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'clear',
    url: '/session/:sessionId/element/:elementId/clear',
    method: 'post'
  });

  /**
   * Determine if an OPTION element, or an INPUT element of type checkbox or radiobutton is currently selected
   *
   * @method selected
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/selected
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'selected',
    url: '/session/:sessionId/element/:elementId/selected',
    method: 'get'
  });

  /**
   * Determine if an element is currently enabled
   *
   * @method enabled
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/enabled
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'enabled',
    url: '/session/:sessionId/element/:elementId/enabled',
    method: 'get'
  });

  /**
   * Test if two element IDs refer to the same DOM element
   *
   * @method equals
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/equals/:other
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {GET} other ID of the element to compare
   */

  Driver.addCommand({
    name: 'equals',
    url: '/session/:sessionId/element/:elementId/equals/:other',
    method: 'get'
  });

  /**
   * Determine an element's location on the page. The point (0, 0) refers to the upper-left corner of the page.
   * The element's coordinates are returned as a JSON object with x and y properties.
   *
   * @method location
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/location
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'location',
    url: '/session/:sessionId/element/:elementId/location',
    method: 'get'
  });

  /**
   * Determine an element's location on the screen once it has been scrolled into view.
   * Note: This is considered an internal command and should only be used to determine an element's location for correctly generating native events.
   *
   * @method locationInView
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/location_in_view
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'locationInView',
    url: '/session/:sessionId/element/:elementId/location_in_view',
    method: 'get'
  });

  /**
   * Determine an element's size in pixels.
   * The size will be returned as a JSON object with width and height properties.
   *
   * @method size
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/size
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'size',
    url: '/session/:sessionId/element/:elementId/size',
    method: 'get'
  });

  /**
   * Get the element on the page that currently has focus.
   * The element will be returned as a WebElement JSON object.
   *
   * @method active
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/active
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'active',
    url: '/session/:sessionId/element/:elementId/active',
    method: 'get'
  });

  /**
   * Get the element on the page that currently has focus.
   * The element will be returned as a WebElement JSON object.
   *
   * @method elementInfo
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   */

  Driver.addCommand({
    name: 'elementInfo',
    url: '/session/:sessionId/element/:elementId',
    method: 'get'
  });

  /**
   * Query the value of an element's computed CSS property.
   * The CSS property to query should be specified using the CSS property name,
   * not the JavaScript property name (e.g. background-color instead of backgroundColor).
   *
   * @method cssProperty
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/element/:id/size
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} elementId ID of the element to route the command to
   * @param {GET} propertyName Name of the css property to fetch
   */

  Driver.addCommand({
    name: 'cssProperty',
    url: '/session/:sessionId/element/:elementId/css/:propertyName',
    method: 'get'
  });

};
