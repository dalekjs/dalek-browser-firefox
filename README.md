dalek-browser-firefox
=====================

> DalekJS browser plugin for Mozilla Firefox

[![Build Status](https://travis-ci.org/dalekjs/dalek-browser-firefox.png)](https://travis-ci.org/dalekjs/dalek-browser-firefox)
[![Build Status](https://drone.io/github.com/dalekjs/dalek-browser-firefox/status.png)](https://drone.io/github.com/dalekjs/dalek-browser-firefox/latest)
[![Dependency Status](https://david-dm.org/dalekjs/dalek-browser-firefox.png)](https://david-dm.org/dalekjs/dalek-browser-firefox)
[![devDependency Status](https://david-dm.org/dalekjs/dalek-browser-firefox/dev-status.png)](https://david-dm.org/dalekjs/dalek-browser-firefox#info=devDependencies)
[![NPM version](https://badge.fury.io/js/dalek-browser-firefox.png)](http://badge.fury.io/js/dalek-browser-firefox)
[![Coverage](http://dalekjs.com/package/dalek-browser-firefox/master/coverage/coverage.png)](http://dalekjs.com/package/dalek-browser-firefox/master/coverage/index.html)
[![unstable](https://rawgithub.com/hughsk/stability-badges/master/dist/unstable.svg)](http://github.com/hughsk/stability-badges)
[![Stories in Ready](https://badge.waffle.io/dalekjs/dalek-browser-firefox.png?label=ready)](https://waffle.io/dalekjs/dalek-browser-firefox)
[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/dalekjs/dalek-browser-firefox/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![NPM](https://nodei.co/npm/dalek-browser-firefox.png)](https://nodei.co/npm/dalek-browser-firefox/)
[![NPM](https://nodei.co/npm-dl/dalek-browser-firefox.png)](https://nodei.co/npm/dalek-browser-firefox/)

## Ressources

[API Docs](http://dalekjs.com/package/dalek-browser-firefox/master/api/index.html) -
[Trello](https://trello.com/b/DAdivSdx/dalek-browser-firefox) -
[Code coverage](http://dalekjs.com/package/dalek-browser-firefox/master/coverage/index.html) -
[Code complexity](http://dalekjs.com/package/dalek-browser-firefox/master/complexity/index.html) -
[Contributing](https://github.com/dalekjs/dalek-browser-firefox/blob/master/CONTRIBUTING.md) -
[User Docs](http://dalekjs.com/docs/firefox.html) -
[Homepage](http://dalekjs.com) -
[Twitter](http://twitter.com/dalekjs)

## Docs

This module is a browser plugin for [DalekJS](//github.com/dalekjs/dalek).
It provides all a WebDriverServer & browser launcher for Mozilla Firefox.

The browser plugin can be installed with the following command:

```
$ npm install dalek-browser-firefox --save-dev
```

You can use the browser plugin by adding a config option to the your Dalekfile

```js
"browsers": ["firefox"]
```

Or you can tell Dalek that it should test in this browser via the command line:

```
$ dalek mytest.js -b firefox
```

Because of the availability of the Firefox Marionette testing framework,
Dalek atm. can only drive the Firefox Aurora Debug, Firefox Nightly & Firefox OS emulator builds.

The Firefox plugin only implements a subset of Daleks Assertions & Actions, so if you run into any bugs, the issue is most probably related to missing commands.
If so, please file an issue =)

## Help Is Just A Click Away

### #dalekjs on FreeNode.net IRC

Join the `#dalekjs` channel on [FreeNode.net](http://freenode.net) to ask questions and get help.

### [Google Group Mailing List](https://groups.google.com/forum/#!forum/dalekjs)

Get announcements for new releases, share your projects and ideas that are
using DalekJS, and join in open-ended discussion that does not fit in
to the Github issues list or StackOverflow Q&A.

**For help with syntax, specific questions on how to implement a feature
using DalekJS, and other Q&A items, use StackOverflow.**

### [StackOverflow](http://stackoverflow.com/questions/tagged/dalekjs)

Ask questions about using DalekJS in specific scenarios, with
specific features. For example, help with syntax, understanding how a feature works and
how to override that feature, browser specific problems and so on.

Questions on StackOverflow often turn in to blog posts or issues.

### [Github Issues](//github.com/dalekjs/dalek-browser-firefox/issues)

Report issues with DalekJS, submit pull requests to fix problems, or to
create summarized and documented feature requests (preferably with pull
requests that implement the feature).

**Please don't ask questions or seek help in the issues list.** There are
other, better channels for seeking assistance, like StackOverflow and the
Google Groups mailing list.

![DalekJS](https://raw.github.com/dalekjs/dalekjs.com/master/img/logo.png)

## Legal FooBar (MIT License)

Copyright (c) 2013 Sebastian Golasch

Distributed under [MIT license](https://github.com/dalekjs/dalek-browser-firefox/blob/master/LICENSE-MIT)