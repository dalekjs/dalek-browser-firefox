module.exports = function (Driver) {


  /**
   *
   */

  Driver.addCommand({
    name: 'createSession',
    url: '/session',
    method: 'post',
    onRequest: function (req, res) {
        // load the marionette connection id & then request the session id
        this.events.emit('marionette:cmd:getMarionetteID');
        this.events.on('marionette:cmd:getMarionetteID:response', function (connection) {
            this.events.emit('marionette:setMarionetteID', connection.id);
            this.events.emit('marionette:cmd:getSession');
        }.bind(this));

        // send out the webdriver session response
        this.events.on('marionette:cmd:getSession:response', function (session) {
            res.location('http://localhost:' + this.port + '/session/' + session.value);
            res.end();
        }.bind(this));
    }
  });

};
