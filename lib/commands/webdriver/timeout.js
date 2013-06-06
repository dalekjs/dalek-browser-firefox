module.exports = function (Driver) {

  Driver.addCommand({
    name: 'implicitWait',
    url: '/session/:sessionId/timeouts/implicit_wait',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:implicitWait', {'sessionId': req.params.sessionId, 'timeout': req.body.ms});
        this.events.on('marionette:cmd:implicitWait:response', function (wait) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

};
