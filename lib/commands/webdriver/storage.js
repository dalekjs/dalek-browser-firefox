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
 * Storage related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class Storage
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Get all keys of the browsers local storage
   *
   * @method getLocalStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/local_storage
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getLocalStorage',
    url: '/session/:sessionId/local_storage',
    method: 'get'
  });

  /**
   * Set the storage item for the given key
   *
   * @method setLocalStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/local_storage
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} key The key to set
   * @param {POST} value The value to set
   */

  Driver.addCommand({
    name: 'setLocalStorage',
    url: '/session/:sessionId/local_storage',
    method: 'post',
    params: {key: 'key', value: 'value'}
  });

  /**
   * Clears the complete local storage
   *
   * @method clearLocalStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/local_storage
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'clearLocalStorage',
    url: '/session/:sessionId/local_storage',
    method: 'del'
  });

  /**
   * Get the storage item for the given key
   *
   * @method getLocalStorageEntry
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/local_storage/key/:key
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} key  The key to get
   */

  Driver.addCommand({
    name: 'getLocalStorageEntry',
    url: '/session/:sessionId/local_storage/key/:key',
    method: 'get'
  });

  /**
   * Remove the storage item for the given key
   *
   * @method deleteLocalStorageEntry
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/local_storage/key/:key
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} key  The key to get
   */

  Driver.addCommand({
    name: 'deleteLocalStorageEntry',
    url: '/session/:sessionId/local_storage/key/:key',
    method: 'del'
  });

  /**
   * Get the number of items in the storage
   *
   * @method getLocalStorageSize
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/local_storage/size
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getLocalStorageSize',
    url: '/session/:sessionId/local_storage/size',
    method: 'get'
  });

  /**
   * Get all keys of the browsers session storage
   *
   * @method getSessionStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/session_storage
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getSessionStorage',
    url: '/session/:sessionId/session_storage',
    method: 'get'
  });

  /**
   * Set the storage item for the given key
   *
   * @method setSessionStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/session_storage
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} key The key to set
   * @param {POST} value The value to set
   */

  Driver.addCommand({
    name: 'setSessionStorage',
    url: '/session/:sessionId/session_storage',
    method: 'post',
    params: {key: 'key', value: 'value'}
  });

  /**
   * Clears the complete session storage
   *
   * @method clearSessionStorage
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/session_storage
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'clearSessionStorage',
    url: '/session/:sessionId/session_storage',
    method: 'del'
  });

  /**
   * Get the storage item for the given key
   *
   * @method getSessionStorageEntry
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/session_storage/key/:key
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} key  The key to get
   */

  Driver.addCommand({
    name: 'getSessionStorageEntry',
    url: '/session/:sessionId/session_storage/key/:key',
    method: 'get'
  });

  /**
   * Remove the storage item for the given key
   *
   * @method deleteSessionStorageEntry
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#DELETE_/session/:sessionId/session_storage/key/:key
   * @param {GET} sessionId ID of the session to route the command to
   * @param {GET} key  The key to get
   */

  Driver.addCommand({
    name: 'deleteSessionStorageEntry',
    url: '/session/:sessionId/session_storage/key/:key',
    method: 'del'
  });

  /**
   * Get the number of items in the storage
   *
   * @method getSessionStorageSize
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/session_storage/size
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'getSessionStorageSize',
    url: '/session/:sessionId/session_storage/size',
    method: 'get'
  });

  /**
   * Get the status of the html5 application cache.
   *
   * @method applicationCacheStatus
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#GET_/session/:sessionId/application_cache/status
   * @param {GET} sessionId ID of the session to route the command to
   */

  Driver.addCommand({
    name: 'applicationCacheStatus',
    url: '/session/:sessionId/application_cache/status',
    method: 'get'
  });

};
