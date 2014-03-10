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
 * ScriptExecutor related WebDriver endpoints
 * see [JsonWireProtocol](https://code.google.com/p/selenium/wiki/JsonWireProtocol)
 *
 * @module FirefoxDriver
 * @class ScriptExecutor
 * @namespace FirefoxDriver.Commands.WebDriver
 */

module.exports = function (Driver) {

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
   * The executed script is assumed to be synchronous and the result of evaluating the script is returned to the client.
   * The script argument defines the script to execute in the form of a function body.
   * The value returned by that function will be returned to the client.
   * The function will be invoked with the provided args array and the values may be accessed
   * via the arguments object in the order specified.
   *
   * @method execute
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/execute
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} script The script to execute.
   * @param {POST} args The script arguments.
   */

  Driver.addCommand({
    name: 'execute',
    url: '/session/:sessionId/execute',
    method: 'post',
    params: {value: 'script', args: 'args'},
    onRequest: function (req, res) {
      // load the marionette connection id & then request the session id
      this.events.emit('marionette:cmd:execute', {'sessionId': req.params.sessionId, 'value': req.body.script, 'args': req.body.args});
      this.events.on('marionette:cmd:execute:response', function (data) {
        data = JSON.parse(data);
        var answer = {
          sessionId: req.params.sessionId,
          status: 0,
          value: data.value
        };

        res.status(200);
        res.send(JSON.stringify(answer));
      }.bind(this));
    }
  });

  /**
   * Inject a snippet of JavaScript into the page for execution in the context of the currently selected frame.
   * The executed script is assumed to be asynchronous and must signal that is done by invoking the provided callback,
   * which is always provided as the final argument to the function. The value to this callback will be returned to the client.
   * Asynchronous script commands may not span page loads.
   * If an unload event is fired while waiting for a script result, an error should be returned to the client.
   *
   * The script argument defines the script to execute in teh form of a function body.
   * The function will be invoked with the provided args array and the values may be accessed
   * via the arguments object in the order specified.
   * The final argument will always be a callback function that must be invoked to signal that the script has finished.
   *
   * @method executeAsync
   * @see https://code.google.com/p/selenium/wiki/JsonWireProtocol#POST_/session/:sessionId/execute_async
   * @param {GET} sessionId ID of the session to route the command to
   * @param {POST} script The script to execute.
   * @param {POST} args The script arguments.
   */

  Driver.addCommand({
    name: 'executeAsync',
    url: '/session/:sessionId/execute_async',
    method: 'post',
    params: {script: 'script', args: 'args'}
  });

};
