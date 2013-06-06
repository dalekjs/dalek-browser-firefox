module.exports = function (Driver) {

  /**
   *
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
   *
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
   *
   */

  Driver.addCommand({
    name: 'click',
    url: '/session/:sessionId/element/:elementId/click',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:click', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId});
        this.events.on('marionette:cmd:click:response', function (element) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: element.value
            };

            // TODO: we need to find a better way than using a timeout
            // Problem: It seems that there is no function in marionette
            // that indicates if we actually changed the url based on a previous action
            setTimeout(function () {
                res.status(200);
                res.send(JSON.stringify(answer));
            }, 1000);
        }.bind(this));
    }
  });

  /**
   *
   */

  Driver.addCommand({
    name: 'text',
    url: '/session/:sessionId/element/:elementId/text',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:text', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId});
        this.events.on('marionette:cmd:text:response', function (element) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: element.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  /**
   *
   */

  Driver.addCommand({
    name: 'attribute',
    url: '/session/:sessionId/element/:elementId/attribute/:name',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:attribute', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId, 'attr': req.params.name});
        this.events.on('marionette:cmd:attribute:response', function (element) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: element.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  /**
   *
   */

  Driver.addCommand({
    name: 'displayed',
    url: '/session/:sessionId/element/:elementId/displayed',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:displayed', {'sessionId': req.params.sessionId, 'elementId': req.params.elementId});
        this.events.on('marionette:cmd:displayed:response', function (element) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: element.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

};
