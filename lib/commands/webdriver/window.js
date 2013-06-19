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
 * Window related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Window
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Retrieve the current window handle.
   *
   * @method windowHandle
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window_handle
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'windowHandle',
    url: '/session/:sessionId/window_handle',
    method: 'get'
  });

  /**
   * Retrieve the list of all window handles available to the session.
   *
   * @method windowHandles
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window_handles
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'windowHandles',
    url: '/session/:sessionId/window_handles',
    method: 'get'
  });

  /**
   * Change focus to another window.
   * The window to change focus to may be specified by its server assigned window handle, or by the value of its name attribute.
   *
   * @method changeWindow
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'changeWindow',
    url: '/session/:sessionId/window',
    method: 'post',
    params: {name: 'name'}
  });

  /**
   * Close the current window.
   *
   * @method closeWindow
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/window
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'closeWindow',
    url: '/session/:sessionId/window',
    method: 'del'
  });

  /**
   * Change the size of the specified window.
   * If the :windowHandle URL parameter is "current", the currently active window will be resized.
   *
   * @method windowSize
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window/:windowHandle/size
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} windowHandle ID of the window to route the command to
   */

  Driver.addCommand({
    name: 'windowSize',
    url: '/session/:sessionId/window/:windowHandle/size',
    method: 'post',
    params: {width: 'width', height: 'height'}
  });

  /**
   * Get the size of the specified window.
   * If the :windowHandle URL parameter is "current", the size of the currently active window will be returned.
   *
   * @method getWindowSize
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/size
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} windowHandle ID of the window to route the command to
   */

  Driver.addCommand({
    name: 'getWindowSize',
    url: '/session/:sessionId/window/:windowHandle/size',
    method: 'get'
  });


  /**
   * Change the position of the specified window.
   * If the :windowHandle URL parameter is "current", the currently active window will be moved.
   *
   * @method windowPosition
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/window/:windowHandle/position
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} windowHandle ID of the window to route the command to
   */

  Driver.addCommand({
    name: 'windowPosition',
    url: '/session/:sessionId/window/:windowHandle/position',
    method: 'post',
    params: {x: 'x', y: 'y'}
  });

  /**
   * Get the position of the specified window.
   * If the :windowHandle URL parameter is "current", the position of the currently active window will be returned.
   *
   * @method getWindowPosition
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/position
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} windowHandle ID of the window to route the command to
   */

  Driver.addCommand({
    name: 'getWindowPosition',
    url: '/session/:sessionId/window/:windowHandle/position',
    method: 'get'
  });

  /**
   * Maximize the specified window if not already maximized.
   * If the :windowHandle URL parameter is "current", the currently active window will be maximized.
   *
   * @method windowMaximize
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/window/:windowHandle/position
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} windowHandle ID of the window to route the command to
   */

  Driver.addCommand({
    name: 'windowMaximize',
    url: '/session/:sessionId/window/:windowHandle/maximize',
    method: 'get'
  });

  /**
   * Get the current browser orientation.
   * The server should return a valid orientation value {LANDSCAPE|PORTRAIT}.
   *
   * @method getOrientation
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/orientation
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getOrientation',
    url: '/session/:sessionId/orientation',
    method: 'get'
  });

  /**
   * Set the browser orientation.
   * Must be one of the two values {LANDSCAPE|PORTRAIT}.
   *
   * @method orientation
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/orientation
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} orientation The new browser orientation {LANDSCAPE|PORTRAIT}.
   */

  Driver.addCommand({
    name: 'orientation',
    url: '/session/:sessionId/orientation',
    method: 'post',
    params: {orientation: 'orientation'}
  });

  /**
   * Gets the text of the currently displayed JavaScript alert(), confirm(), or prompt() dialog.
   *
   * @method dialogText
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/alert_text
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'dialogText',
    url: '/session/:sessionId/alert_text',
    method: 'get'
  });

  /**
   * Sends keystrokes to a JavaScript prompt() dialog.
   *
   * @method alertText
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/alert_text
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} text Keystrokes to send to the prompt() dialog.
   */

  Driver.addCommand({
    name: 'setDialogText',
    url: '/session/:sessionId/alert_text',
    method: 'post',
    params: {text: 'text'}
  });

  /**
   * Accepts the currently displayed alert dialog.
   * Usually, this is equivalent to clicking on the 'OK' button in the dialog.
   *
   * @method acceptDialog
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/accept_alert
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'acceptDialog',
    url: '/session/:sessionId/accept_alert',
    method: 'post'
  });

  /**
   * Dismisses the currently displayed alert dialog.
   * For confirm() and prompt() dialogs, this is equivalent to clicking the 'Cancel' button.
   * For alert() dialogs, this is equivalent to clicking the 'OK' button.
   *
   * @method dismissDialog
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/dismiss_alert
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'dismissDialog',
    url: '/session/:sessionId/dismiss_alert',
    method: 'post'
  });

};
