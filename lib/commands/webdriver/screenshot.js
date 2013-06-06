module.exports = function (Driver) {

  Driver.addCommand({
    name: 'screenshot',
    url: '/session/:sessionId/screenshot',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:screenshot', {'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:screenshot:response', function (screenshot) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: screenshot.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

};
