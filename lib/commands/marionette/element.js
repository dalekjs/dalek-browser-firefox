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
 * Element related Marionette commands
 * see [JsonProtocol](https://wiki.mozilla.org/Auto-tools/Projects/Marionette/JSON_Protocol)
 *
 * @module FirefoxDriver
 * @class Element
 * @namespace FirefoxDriver.Commands.Marionette
 */

module.exports = function (Marionette) {

  /**
   * Selects an element
   *
   * @method element
   */

  Marionette.addCommand({
    name: 'element',
    params: ['selector'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      value: ':selector',
      type: 'findElement',
      using: 'css selector'
    }
  });

  /**
   * Selects multiple elements
   *
   * @method elements
   */

  Marionette.addCommand({
    name: 'elements',
    params: ['selector'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      value: ':selector',
      type: 'findElements',
      using: 'css selector'
    }
  });

  /**
   * Clicks an element
   *
   * @method click
   */

  Marionette.addCommand({
    name: 'click',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'clickElement'
    }
  });

  /**
   * Gets the width & height of an element
   *
   * @method size
   */

  Marionette.addCommand({
    name: 'size',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'getElementSize'
    }
  });

  /**
   * Checks if an element is displayed
   *
   * @method displayed
   */

  Marionette.addCommand({
    name: 'displayed',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'isElementDisplayed'
    }
  });

  /**
   * Gets the inner text of an element
   *
   * @method text
   */

  Marionette.addCommand({
    name: 'text',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'getElementText'
    }
  });

  /**
   * Gets the value of an element
   *
   * @method val
   */

  Marionette.addCommand({
    name: 'val',
    params: ['elementId', 'value'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      value: ':value',
      type: 'sendKeysToElement'
    }
  });

  /**
   * Clears the contents of an input/text field
   *
   * @method clear
   */

  Marionette.addCommand({
    name: 'clear',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'clearElement'
    }
  });

  /**
   * Gets the value of an css property
   *
   * @method cssProperty
   */

  Marionette.addCommand({
    name: 'cssProperty',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      propertyName: ':propertyName',
      type: 'getElementValueOfCssProperty'
    }
  });

  /**
   * Checks if an element is enabled
   *
   * @method enabled
   */

  Marionette.addCommand({
    name: 'enabled',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'isElementEnabled'
    }
  });

  /**
   * Checks if an element is selected
   *
   * @method selected
   */

  Marionette.addCommand({
    name: 'selected',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      type: 'isElementSelected'
    }
  });

  /**
   * TODO: Find JS workaround (Marionette doesn't has a submit handler yet)
   * DOES NOT WORK YET!
   *
   * @method submit
   */

  Marionette.addCommand({
    name: 'submit',
    params: ['elementId'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      type: 'executeScript',
      value: 'document.form[0].submit()',
      newSandbox: true,
      specialPowers: true
    }
  });

  /**
   * Gets the value of an specific attribute
   *
   * @method attribute
   */

  Marionette.addCommand({
    name: 'attribute',
    params: ['elementId', 'attr'],
    request: {
      to: ':marionetteId',
      session: ':sessionId',
      element: ':elementId',
      name: ':attr',
      type: 'getElementAttribute'
    }
  });

};
