module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'screenshot',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        type: 'screenShot'
    }
  });

};
