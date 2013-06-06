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

// ext. libs
var spawn = require('child_process').spawn;
var Events = require('events').EventEmitter;
var path = require('path');
var fs = require('fs');
var Q = require('q');
var rimraf = require('rimraf');

// int. libs
var Marionette = require('./lib/marionette');
var WebDriverServer = require('./lib/webdriver');

/**
 * @module
 */

var FirefoxDriver = {

    /**
     * Verbose version of the browser name
     *
     * @property
     * @type string
     * @default Mozilla Firefox
     */

    longName: 'Mozilla Firefox',

    /**
     * Default port of the FirefoxWebDriverServer
     * The port may change, cause the port conflict resultion
     * tool might pick another one, if the default one is blocked
     *
     * @property
     * @type integer
     * @default 9006
     */

    port: 9006,

    /**
     * Default port of the Marionette TCP service
     * The port may change, cause the port conflict resultion
     * tool might pick another one, if the default one is blocked
     *
     * @property
     * @type integer
     * @default 2828
     */

    marionettePort: 2828,

    /**
     * Default host of the FirefoxWebDriverServer
     * The host may be overriden with
     * a user configured value
     *
     * @property
     * @type string
     * @default localhost
     */

    host: 'localhost',

    /**
     * Root path of the FirefoxWebDriverServer
     *
     * @property
     * @type string
     * @default ''
     */

    path: '',

    /**
     * Path to the Firefox binary file
     *
     * @property
     * @type string
     * @default /
     */

    binary: null,

    /**
     *
     */

    defaultBinaries: {
        mac: {
            bin: 'Contents/MacOS/firefox-bin'
        }
    },

    /**
     * Child process instance of the Firefox browser
     *
     * @property
     * @type null|Object
     */

    spawned: null,

    /**
     *
     */

    profile: null,

    /**
     * Resolves the driver port
     *
     * @method getPort
     * @return integer
     */

    getPort: function () {
        return this.port;
    },

    /**
     * Resolves the marionette port
     *
     * @method getPort
     * @return integer
     */

    getMarionettePort: function () {
        return this.marionettePort;
    },

    /**
     * Returns the driver host
     *
     * @method getHost
     * @type string
     */

    getHost: function () {
        return this.host;
    },

    /**
     * Launches the FirefoxWebDriverServer & the browser
     *
     * @method launch
     * @return Q.promise
     */

    launch: function (options) {
        var deferred = Q.defer();

        // init the webdriver server, marionette bindings & the event glue
        this.events = new Events();
        this.marionette = new Marionette(this.events);
        this.webDriverServer = new WebDriverServer(this.events);

        // check the path of the browser binary
        Q.when(this.getBrowserBinary(options)).then(function () {

            // create profile
            Q.when(this._createProfile())
            // launch the browser
            .then(function (profile) {
                this.profile = profile;
                this._startBrowser(profile.path, profile.name, deferred);
            }.bind(this))
        }.bind(this));

        return deferred.promise;
    },

    /**
     * Kills the browser processe & deletes the temp profile
     *
     * @method kill
     * @chainable
     */

    kill: function () {
        this.marionette.kill()
            .then(this.webDriverServer.kill.bind(this.webDriverServer))
            .then(function () {
                this.spawned.kill('SIGKILL');
                this._deleteProfile();
            }.bind(this));
    },

    /**
     *
     */

    getBrowserBinary: function (options) {
        var deferred = Q.defer();

        // check if the user has set a custom binary
        if (options.path) {
            this._checkUserSetBinary(options.path, deferred);
            return deferred.promise;
        }

        // try to find the firefox binary
        switch (process.platform) {
            case 'win32':
                this._checkWindowsBinary(deferred);
            break;
            case 'darwin':
                this._checkMacBinary(deferred);
            break;
            default:
                this._checkLinuxBinary(deferred);
            break;
        }

        return deferred.promise;
    },

    /**
     *
     */

    _startBrowser: function (profilePath, profileName, deferred) {
        var def = Q.defer();

        // start the browser, grep its output
        this.spawned = spawn(this.binary, ['-P', profileName]);
        this.spawned.stdout.on('data', this._onBrowserStartup.bind(this, def));

        // connect to the marionette socket server
        def.promise
            .then(this.webDriverServer.connect.bind(this.webDriverServer, this.getPort(), this.getHost()))
            .then(this.marionette.connect.bind(this.marionette, this.getMarionettePort()))
            .then(function () {
                    deferred.resolve();
            });
    },

    /**
     * Consumes the console output when the browser is started
     */

    _onBrowserStartup: function (deferred, data) {
      if (this._browserIsReady(data)) {
        deferred.resolve();
      }
    },

    /**
     * Checks if the browser is ready for communication
     */

    _browserIsReady: function (data) {
        return !!(String(data).search('== 12') !== -1)
    },

    /**
     *
     */

    _createProfile: function () {
        var deferred = Q.defer();
        var profileName = 'dalekjs-' + Math.random().toString(16).slice(2);
        var ps = spawn(this.binary, ['-CreateProfile', profileName]);
        var data = '';

        // collect data from stdout/stderr
        ps.stdout.on('data', function (buf) { data += buf });
        ps.stderr.on('data', function (buf) { data += buf });

        ps.on('exit', function (code) {
            // reject the deferred when an error occured
            if (code !== 0) {
                deferred.reject(code, data);
            }

            // grep the profile data
            var m = data.match(/^Success: created profile '[^']+' at '([^']+)/);
            var profilePath = path.join(path.dirname(m[1]));

            // create the user preferences
            var promise = this._createUserPreferences(profilePath, profileName);

            Q.when(promise).then(function() {
                deferred.resolve({path: profilePath, name: profileName});
            });
        }.bind(this));

        return deferred.promise;
    },

    /**
     *
     */

    _createUserPreferences: function (profilePath, profileName) {
        var deferred = Q.defer();
        var prefs = '';

        // create liste
        prefs += 'user_pref("browser.shell.checkDefaultBrowser", false);\n';
        prefs += 'user_pref("marionette.contentListener", false);\n';
        prefs += 'user_pref("marionette.defaultPrefs.enabled", true);\n';
        prefs += 'user_pref("marionette.defaultPrefs.port", "' + this.getMarionettePort() + '");\n';

        // store the user preferences
        var file = path.join(profilePath, 'user.js');
        fs.writeFile(file, prefs, function (err) {
            // reject the deferred when an error occured
            if (err !== null) {
                deferred.reject(err);
            }

            deferred.resolve();
        });

        return deferred.promise;
    },

    /**
     *
     */

    _deleteProfile: function () {
        rimraf.sync(this.profile.path);
    },

    /**
     *
     */

    _checkUserSetBinary: function (userPath, deferred) {
        // check the binary location on a per OS basis
        switch (process.platform) {
            case 'win32':
            break;
            case 'darwin':
                // check if we need to replace the users home directory
                if (userPath.trim()[0] === '~') {
                    userPath = userPath.replace('~', process.env.HOME);
                }

                // check if we need to add a trailing slash
                if (userPath[userPath.length - 1] !== '/') {
                    userPath += '/';
                }

                // add the default binary location
                userPath += this.defaultBinaries.mac.bin;

                // check if the binary exists
                if (fs.existsSync(userPath)) {
                    this.binary = userPath;
                    deferred.resolve(userPath);
                } else {
                    // TODO: Use daleks super awesome not yet implemented error handler...
                    console.log('BINARY NOT FOUND:', userPath);
                    process.exit();
                    deferred.reject();
                }
            break;
            default:
            break;
        }

        return this;
    },

    /**
     *
     */

    _checkWindowsBinary: function (deferred) {
        // body...
    },

    /**
     *
     */

    _checkMacBinary: function (deferred) {
        // body...
    },

    /**
     *
     */

    _checkLinuxBinary: function (deferred) {
        // body...
    }
};

module.exports = FirefoxDriver;
