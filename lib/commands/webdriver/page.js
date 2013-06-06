module.exports = function (Driver) {

  Driver.addCommand({
    name: 'title',
    url: '/session/:sessionId/title',
    method: 'get',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:title', {'sessionId': req.params.sessionId});
        this.events.on('marionette:cmd:title:response', function (title) {
            var answer = {
                sessionId: req.params.sessionId,
                status: 0,
                value: title.value
            };

            res.status(200);
            res.send(JSON.stringify(answer));
        }.bind(this));
    }
  });

};
