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

// ext. libs
var Q = require('q');
var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var which = require('which').sync;
var portscanner = require('portscanner');
var spawn = require('child_process').spawn;
var Events = require('events').EventEmitter;

// int. libs
var Marionette = require('./lib/marionette');
var WebDriverServer = require('./lib/webdriver');

/**
 * This module is a browser plugin for [DalekJS](//github.com/dalekjs/dalek).
 * It provides all a WebDriverServer & browser launcher for Mozilla Firefox &amp; Firefox OS.
 *
 * The browser plugin can be installed with the following command:
 *
 * ```bash
 * $ npm install dalek-browser-firefox --save-dev
 * ```
 *
 * You can use the browser plugin by adding a config option to the your Dalekfile
 *
 * ```javascript
 * "browser": ["firefox"]
 * ```
 *
 * Or you can tell Dalek that it should test in this browser via the command line:
 *
 * ```bash
 * $ dalek mytest.js -b firefox
 * ```
 * 
 * Dalek looks for the browser in the std. installation directory, if you installed the
 * browser in a different place, you can add the location of the browser executable to you Dalekfile,
 * because Dalek isnʼt capable of finding the executable yet on its own.
 *
 * ```javascript
 * "browsers": [{
 *   "firefox": {
 *     "path": "~/Apps/FirefoxNightlyDebug.app/Contents/MacOS/firefox-bin"
 *   }
 * }]
 * ```
 *
 * The Firefox plugin only implements a subset of Dalekʼs assertions & actions,
 * so if you run into any bugs, the issue is most probably related to missing commands.
 * Please report any issues you find, Thank you :)
 *
 * The Webdriver Server tries to open Port 9006 by default,
 * if this port is blocked, it tries to use a port between 9007 & 9096
 * You can specifiy a different port from within your [Dalekfile](/pages/config.html) like so:
 *
 * ```javascript
 * "browsers": {
 *   "firefox": {
 *     "port": 5555 
 *   }
 * }
 * ```
 *
 * It is also possible to specify a range of ports:
 *
 * ```javascript
 * "browsers": {
 *   "firefox": {
 *     "portRange": [6100, 6120] 
 *   }
 * }
 * ```
 *
 * If you would like to test Nightly, Aurora oder Firefox OS releases, you can simply apply a snd. argument,
 * which defines the browser type:
 *
 * ```bash
 * $ dalek mytest.js -b firefox:aurora
 * ```
 *
 * for Firefox Aurora, and if you would like to use the Firefox OS, just append `:os`:
 *
 * ```bash
 * $ dalek mytest.js -b firefox:os
 * ```
 *
 * This will only work if you installed your browser in the default locations,
 * if the browsers binary is located in a non default location, you are able to specify
 * its location in your [Dalekfile](/pages/config.html):
 *
 * ```javascript
 * "browsers": {
 *   "firefox": {
 *     "binary": "/Applications/Custom Located Firefox.app/MacOS/Contents/firefox-bin" 
 *   }
 * }
 * ```
 *
 * This also works for the aurora &amp; Firefox OS builds
 *
 * ```javascript
 * "browsers": {
 *   "firefox:aurora": {
 *     "binary": "/Applications/Custom Located Firefox Aurora.app/MacOS/Contents/firefox-bin" 
 *   }
 * }
 * ```
 *
 * @module DalekJS
 * @class FirefoxDriver
 * @namespace Browser
 * @part Firefox
 * @api
 */

var FirefoxDriver = {

  /**
   * Verbose version of the browser name
   *
   * @property longName
   * @type string
   * @default Mozilla Firefox
   */

  longName: 'Mozilla Firefox',

  /**
   * Default port of the FirefoxWebDriverServer
   * The port may change, cause the port conflict resolution
   * tool might pick another one, if the default one is blocked
   *
   * @property port
   * @type integer
   * @default 9006
   */

  port: 9006,

  /**
   * Default maximum port of the WebDriverServer
   * The port is the highest port in the range that can be allocated
   * by the WebDriverServer
   *
   * @property maxPort
   * @type integer
   * @default 9096
   */

  maxPort: 9096,

  /**
   * Default port of the Marionette TCP service
   * The port may change, cause the port conflict resolution
   * tool might pick another one, if the default one is blocked
   *
   * @property marionettePort
   * @type integer
   * @default 2828
   */

  marionettePort: 2828,

  /**
   * Default host of the FirefoxWebDriverServer
   * The host may be overridden with
   * a user configured value
   *
   * @property host
   * @type string
   * @default localhost
   */

  host: 'localhost',

  /**
   * Default desired capabilities that should be
   * transferred when the browser session gets requested
   *
   * @property desiredCapabilities
   * @type object
   */

  desiredCapabilities: {
    browserName: 'firefox'
  },

  /**
   * Driver defaults, what should the driver be able to access.
   *
   * @property driverDefaults
   * @type object
   */

  driverDefaults: {
    viewport: true,
    status: true,
    sessionInfo: true
  },

  /**
   * Root path of the FirefoxWebDriverServer
   *
   * @property path
   * @type string
   * @default ''
   */

  path: '',

  /**
   * Path to the Firefox binary file
   *
   * @property binary
   * @type string
   * @default null
   */

  binary: null,

  /**
   * Paths to the default Firefox binary files
   * 
   * @property defaultBinaries
   * @type object
   */

  defaultBinaries: {
    default: 'firefox',
    darwin: '/Applications/Firefox.app/Contents/MacOS/firefox-bin',
    win32: process.env.ProgramFiles + '\\Mozilla Firefox\\firefox.exe',
    win64: process.env['ProgramFiles(x86)'] + '\\Mozilla Firefox\\firefox.exe'
  },

  /**
   * Different browser types (Aurora / firefox OS) that can be controlled
   * via the Firefox driver
   *
   * @property browserTypes
   * @type object
   */

  browserTypes: {

    /**
     * Nightly Firefox
     *
     * @property nightly
     * @type object
     */

    nightly: {
      name: 'Firefox Nightly',
      linux: 'firefox',
      darwin: '/Applications/FirefoxNightlyDebug.app/Contents/MacOS/firefox-bin',
      win32: process.env.ProgramFiles + '\\Nightly\\firefox.exe',
      win64: process.env['ProgramFiles(x86)'] + '\\Mozilla Firefox Nightly\\firefox.exe'
    },

    /**
     * Firefox Aurora
     *
     * @property aurora
     * @type object
     */

    aurora: {
      name: 'Firefox Aurora',
      linux: 'firefox',
      darwin: '/Applications/FirefoxAuroraDebug.app/Contents/MacOS/firefox-bin',
      win32: process.env.ProgramFiles + '\\AuroraDebug\\firefox.exe',
      win64: process.env['ProgramFiles(x86)'] + '\\Mozilla AuroraDebug\\firefox.exe'
    },

    /**
     * Firefox OS
     *
     * @property os
     * @type object
     */

    os: {
      name: 'Firefox OS',
      linux: 'b2g',
      darwin: '/Applications/B2G.app/Contents/MacOS/b2g',
      win32: process.env.ProgramFiles + '\\B2G\\b2g.exe',
      win64: process.env.ProgramFiles + '\\B2G\\b2g.exe'
    }
  },

  /**
   * Child process instance of the Firefox browser
   *
   * @property spawned
   * @type null|Object
   * @default null
   */

  spawned: null,

  /**
   * Collected data about the created profile,
   * path, name, etc.
   *
   * @property profile
   * @type null|object
   * @default null
   */

  profile: null,

  /**
   * Resolves the driver port
   *
   * @method getPort
   * @return {integer} port WebDriver server port
   */

  getPort: function () {
    return this.port;
  },

  /**
   * Resolves the maximum range for the driver port
   *
   * @method getMaxPort
   * @return {integer} port Max WebDriver server port range
   */

  getMaxPort: function () {
    return this.maxPort;
  },

  /**
   * Resolves the marionette port
   *
   * @method getMarionettePort
   * @return {integer} port Marionette server port
   */

  getMarionettePort: function () {
    return this.marionettePort;
  },

  /**
   * Returns the driver host
   *
   * @method getHost
   * @return {string} host WebDriver server hostname
   */

  getHost: function () {
    return this.host;
  },

  /**
   * Launches the FirefoxWebDriverServer, 
   * the marionette client, & the browser.
   * Creates a user profile for the browser 
   *
   * @method launch
   * @param {object} configuration Browser configuration
   * @param {EventEmitter2} events EventEmitter (Reporter Emitter instance)
   * @param {Dalek.Internal.Config} config Dalek configuration class
   * @return {object} promise Browser promise
   */

  launch: function (configuration, events, config) {
    var deferred = Q.defer();

    // init the webdriver server, 
    // marionette client, event glue
    // and configuration settings
    configuration = this._initialize({
      userconfig: configuration,
      reporterEvents: events,
      config: config,
      events: new Events()
    });
    
    // check for a user set port
    var browsers = this.config.get('browsers');
    if (browsers && Array.isArray(browsers)) {
      browsers.forEach(this._checkUserDefinedPorts.bind(this));
    }

    // check the path of the browser binary
    Q.when(this.findBrowserBinary(configuration))
     .then(this._afterBinaryFound.bind(this, configuration, deferred));

    return deferred.promise;
  },

  /**
   * Shuts down the TCP (Marionette) & HTTP connection (Webdriver),
   * then kills the browser process & cleans up the profiles
   *
   * @method kill
   * @chainable
   */

  kill: function () {
    Q.all([
      // shutdown Marionette client
      this.marionette.kill(),
      // shutdown webdriver server
      this.webDriverServer.kill()
    ]).then(this._killProcess.bind(this));

    return this;
  },

  /**
   * Locates the browser binary
   * 
   * @method findBrowserBinary
   * @param {object} options Config options
   * @return {object} Promise 
   */

  findBrowserBinary: function (options) {
    var deferred = Q.defer();

    // check if the user has set a custom binary
    if (options && options.binary) {
      this._checkUserSetBinary(options.binary, deferred);
      return deferred.promise;
    }

    // get the defaukt binary for this OS
    var defaultBinary = this._getDefaultBinary();

    // check if the binary exists
    if (fs.existsSync(defaultBinary)) {
      this.binary = defaultBinary;
      deferred.resolve(defaultBinary);
    } else {
      var msg = 'dalek-driver-firefox: Binary not found: ' + defaultBinary;
      this.reporterEvents.emit('error', msg);
      deferred.reject({error: true, msg: msg});
    }

    return deferred.promise;
  },

  /**
   * Makes all needed modifications after we are sure if the
   * browser binary has been found
   *
   * @method _afterBinaryFound
   * @param {object} configuration User configuration
   * @param {object} deferred Promise
   * @chainable
   * @private
   */

  _afterBinaryFound: function (configuration, deferred) {
    // generate the verbose browser name
    this.longName = this._modifyVerboseBrowserName(configuration);

    // check if we are driving a desktop browser
    // when, create a profile, else, not
    if (configuration.type !== 'os') {
      Q.when(this._createProfile())
       .then(this._afterDesktopBinaryFound.bind(this, deferred, configuration));
    } else {
      this._startBrowser(null, 'os', deferred);
    }

    return this;
  },

  /**
   * Modifies the verbose browser name
   *
   * @method _modifyVerboseBrowserName
   * @param {object} configuration User configuration
   * @return {string} Verbose browser name
   * @private
   */

  _modifyVerboseBrowserName: function (configuration) {
    if (configuration.type && this.browserTypes[configuration.type]) {
      return this.browserTypes[configuration.type].name + ' (' + this.longName + ')';
    } else {
      return this.longName;
    }
  },

  /**
   * Initiates the browser startup after the desktop binary has been found
   *
   * @method _afterDesktopBinaryFound
   * @param {object} deferred Promise
   * @param {object} profile Profile data
   * @chainable
   * @private
   */

  _afterDesktopBinaryFound: function (deferred, configuration) {
    this._startBrowser(this.profile.path, this.profile.name, deferred, configuration);
    return this;
  },

  /**
   * Kills the currently running browser process
   * 
   * @method _killProcess
   * @chainable
   * @priavte
   */

  _killProcess: function () {
    // kill the browser process itself
    this.spawned.kill('SIGTERM');

    // check if we need to clean up some created profiles
    // should always be the case except for Firefox OS
    if (this.profile && this.profile.path) {
      rimraf.sync(this.profile.path);
    }

    return this;
  },

  /**
   * Initializes config & properties
   * 
   * @method  _initiaize
   * @param {object} opts Config options
   * @return {object} Processed userr config
   * @private
   */

  _initialize: function (opts) {
    // store config class
    this.config = opts.config;

    // glue events
    this.events = opts.events;
    this.events.setMaxListeners(0);
    this.reporterEvents = opts.reporterEvents;

    // setup Marionette client & Webdriver server
    this.marionette = new Marionette(this.events);
    this.webDriverServer = new WebDriverServer(this.events);

    return opts.userconfig === null ? {} : opts.userconfig;
  },

  /**
   * Get the default binary location
   *
   * @method _getDefaultBinary
   * @return {string} Path to binary
   * @private
   */

  _getDefaultBinary: function () {
    var platform = process.platform;

    // check default binary for linuy
    if (platform !== 'darwin' && platform !== 'win32' && this.defaultBinaries[platform]) {
      return which(this.defaultBinaries.linux);
    }

    // check to see if we are on Windows x64
    if (platform === 'win32' && process.arch === 'x64') {
      platform = 'win64';
    }
	
    return this.defaultBinaries[platform] ?
      this.defaultBinaries[platform] :
      which(this.defaultBinaries.default);
  },

  /**
   * Launches the browser
   * 
   * @method _startBrowser
   * @param {string} profilePath Directory that contains the profile
   * @param {string} profileName Name of the profile to use
   * @param {object} deferred Promise
   * @private
   * @chainable
   */

  _startBrowser: function (profilePath, profileName, deferred, configuration) {
    var df = Q.defer();
    var args = [];

    // set args based on environment
    if (profileName !== 'os') {
      args = ['-marionette', '-turbo', '-profile', profilePath, '-no-remote', '-url', 'about:blank'];
    }

    // start the browser
    this.spawned = spawn(this.binary, args);

    // kind of an ugly hack, but I have no other idea to
    // than to wait for 2 secs to ensure Firefox runs on windows
    if (process.platform === 'win32' || (configuration && !configuration.type)) {
      this.interval = setInterval(this._scanMarionettePort.bind(this, df), 50);
    } else {
      this.spawned.stdout.on('data', this._onBrowserStartup.bind(this, df));
    }

    // connect to the marionette socket server
    // and the webdriver server & resolve the promise when done
    df.promise.then(this._resolvePort.bind(this, deferred, profileName));
    return this;
  },

  /**
   * Repeatadly checks the status of the marionette port
   * 
   * @method _scanMarionettePort
   * @param {object} df Promise
   * @private
   * @chainable
   */

  _scanMarionettePort: function (df) {
    portscanner.checkPortStatus(this.getMarionettePort(), this.getHost(), this._startByInterval.bind(this, df));
    return this;
  },

  /**
   * Checks if the browser is available by listening on the marionette socket
   * 
   * @method _startByInterval
   * @param {object} df Promise
   * @param {object} interval Reference to the portchecker interval
   * @param {object|null} err Error or null
   * @param {string} status Status of the marionette port
   * @private
   * @chainable
   */

  _startByInterval: function (df, err, status) {
    if (status === 'open') {
      clearInterval(this.interval);
      df.resolve();
    }

    return this;
  },

  /**
   * Process user defined ports
   *
   * @method _checkUserDefinedPorts
   * @param {object} browser Browser configuration
   * @chainable
   * @private
   */

  _checkUserDefinedPorts: function (browser) {
    // check for a single defined port
    if (browser.firefox && browser.firefox.port) {
      this.port = parseInt(browser.firefox.port, 10);
      this.maxPort = this.port + 90;
      this.reporterEvents.emit('report:log:system', 'dalek-browser-firefox: Switching to user defined port: ' + this.port);
    }

    // check for a port range
    if (browser.firefox && browser.firefox.portRange && browser.firefox.portRange.length === 2) {
      this.port = parseInt(browser.firefox.portRange[0], 10);
      this.maxPort = parseInt(browser.firefox.portRange[1], 10);
      this.reporterEvents.emit('report:log:system', 'dalek-browser-firefox: Switching to user defined port(s): ' + this.port + ' -> ' + this.maxPort);
    }

    return this;
  },

  /**
   * Resolve the WebDriverServer port
   *
   * @method _resolvePort
   * @param {object} deferred Promise
   * @param {string} profileName Name of the profile
   * @chainable
   * @private
   */

  _resolvePort: function (deferred, profileName) {
    // check if the current port is in use, if so, scan for free ports
    portscanner.findAPortNotInUse(
      this.getPort(),
      this.getMaxPort(),
      this.getHost(),
      this._afterPortResolved.bind(this, deferred, profileName)
    );

    return this;
  },

  /**
   * Resolve the WebDriverServer port
   *
   * @method _resolvePort
   * @param {object} deferred Promise
   * @param {string} profileName Name of the profile
   * @param {object|null} error Error object if there is one
   * @param {integer} port Resolved port
   * @chainable
   * @private
   */

  _afterPortResolved: function (deferred, profileName, error, port) {
    // check for errors
    if (error !== null && error.code !== 'ECONNREFUSED') {
      this.reporterEvents.emit('error', 'dalek-browser-firefox: Error starting WebDriverServer, port ' + port + ' in use');
      deferred.reject(error);
      process.exit();
    }

    // check if the port was blocked & if we need to switch to another port
    if (this.port !== port) {
      this.reporterEvents.emit('report:log:system', 'dalek-browser-firefox: Switching to port: ' + port);
      this.port = port;
    }

    // kickstart marionette client & webdriver server
    Q.all([
      this.webDriverServer.connect(this.getPort(), this.getHost()),
      this.marionette.connect(this.getMarionettePort())
    ]).then(this._afterConnectionHasBeenEstablished.bind(this, profileName, deferred));
    return this;
  },

  /**
   * Callback that will be invoked after the marionette client has 
   * established a connection to the browser & after the webdriver server
   * has been launched correctly
   *
   * @method _afterConnectionHasBeenEstablished
   * @param {string} profileName Name of the user profile
   * @param {object} deferred Promise
   * @chainable
   * @private
   */

  _afterConnectionHasBeenEstablished: function (profileName, deferred) {
    // Due to the lack of firefox os readiness events, 
    // we need to wait an additional second before reporting
    // test readiness
    if (profileName === 'os') {
      setTimeout(deferred.resolve, 1000);
    } else {
      deferred.resolve();
    }

    return this;
  },

  /**
   * Consumes the console output when the browser is started
   *
   * @method _onBrowserStartup
   * @param {object} deferred Promise
   * @param {string} data Output from the spawned binary
   * @private
   * @chainable
   */

  _onBrowserStartup: function (deferred, data) {
    if (this._browserIsReady(data)) {
      deferred.resolve();
    }
    return this;
  },

  /**
   * Checks if the browser is ready for communication
   *
   * @method _browserIsReady
   * @param {string} data Output from the spawned binary
   * @return {bool} true when ready, false when not
   * @private
   */

  _browserIsReady: function (data) {
    // convert buffer to string
    data = data+'';
    // check for the ready signal on desktop firefox
    var desktopReady = data.search('DOMWINDOW == 12') !== -1;
    // check for the ready signal of the firefoxos emulator
    var b2gReady = data.search('BrowserElementChildPreload.js loaded') !== -1;
    return desktopReady || b2gReady;

  },

  /**
   * Creates a new Firefox profile
   *
   * @method _createProfile
   * @return {Q.promise}
   * @private
   */

  _createProfile: function () {
    var deferred = Q.defer();
    var profileName = 'dalekjs-' + Math.random().toString(16).slice(2);
    this._createUserPreferences(deferred, profileName);

    return deferred.promise;
  },

  /**
   * Creates user preferences for the profile
   * Saves them in `user.js` in the newly created profile
   *
   * @method _createProfile
   * @param {string} profilePath User profile directory
   * @return {Q.promise}
   * @private
   */

  _createUserPreferences: function (deferred, profileName) {
    // create marionette specific user preferences
    var prefs = 'user_pref("browser.shell.checkDefaultBrowser", false);\n';
    prefs += 'user_pref("marionette.contentListener", false);\n';
    prefs += 'user_pref("marionette.defaultPrefs.enabled", true);\n';
    prefs += 'user_pref("browser.shell.checkDefaultBrowser", false);\n';
    prefs += 'user_pref("browser.sessionstore.resume_from_crash", false);\n';
    prefs += 'user_pref("browser.bookmarks.restore_default_bookmarks", false);\n';
    prefs += 'user_pref("marionette.defaultPrefs.port", "' + this.getMarionettePort() + '");\n';

    // store the user preferences
    this.profile = {};
    this.profile.path = path.join(process.cwd(), 'temp');
    this.profile.name = profileName;

    // check if the temp dir exists, else create
    if (!fs.existsSync(this.profile.path)) {
      fs.mkdirSync(this.profile.path);
    }

    // create the preference file
    fs.writeFile(path.join(this.profile.path, 'prefs.js'), prefs, this._afterCreatingUserPreferences.bind(this, deferred));
    return deferred.promise;
  },

  /**
   * Callback that will be executed after the user preferences
   * have been created
   * 
   * @method _afterCreatingUserPreferences
   * @param {object} deferred Promise
   * @param {object|null} err Error or null
   * @private
   * @chainable
   */

  _afterCreatingUserPreferences: function (deferred, err) {
    // reject the deferred when an error occurrs
    if (err !== null) {
      this.reporterEvents.emit('error', 'dalek-browser-firefox: Error creating profile');
      deferred.reject(err);
      process.exit();
    }

    deferred.resolve();
    return this;
  },

  /**
   * Checks if the binary exists,
   * when set manually by the user
   *
   * @method _checkUserSetBinary
   * @param {string} userPath Path to the browser binary
   * @param {object} deferred Promise
   * @private
   * @chainable
   */

  _checkUserSetBinary: function (userPath, deferred) {
    // check if we need to replace the users home directory
    if (process.platform === 'darwin' && userPath.trim()[0] === '~') {
      userPath = userPath.replace('~', process.env.HOME);
    }

    // check if the binary exists
    if (fs.existsSync(userPath)) {
      this.binary = userPath;
      deferred.resolve(userPath);
    } else {
      var msg = 'dalek-driver-firefox: Binary not found: ' + userPath;
      this.reporterEvents.emit('error', msg);
      process.exit(); // MAYBE switch to Daleks 'killAll' Event 
      deferred.reject({error: true, msg: msg});
    }

    return this;
  }
};

module.exports = FirefoxDriver;
