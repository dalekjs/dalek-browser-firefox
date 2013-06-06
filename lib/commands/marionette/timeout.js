module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'implicitWait',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        value: ':timeout',
        type: 'setSearchTimeout'
    }
  });

};
