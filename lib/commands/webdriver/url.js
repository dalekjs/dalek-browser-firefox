module.exports = function (Driver) {
  Driver.addCommand({
    name: 'url',
    url: '/session/:sessionId/url',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:open', {'url': req.body.url, 'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:open:response', function (url) {
            var answer = {
                sessionId: req.params.sessionId,
                status: (url.ok ? 0 : 1),
                value: {}
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  Driver.addCommand({
    name: 'getUrl',
    url: '/session/:sessionId/url',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:url', {'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:url:response', function (url) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: url.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

  Driver.addCommand({
    name: 'forward',
    url: '/session/:sessionId/forward',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:forward', {'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:forward:response', function (forward) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0
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

  Driver.addCommand({
    name: 'back',
    url: '/session/:sessionId/back',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:back', {'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:back:response', function (back) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0
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

};
