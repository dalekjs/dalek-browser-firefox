module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'title',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        type: 'getTitle'
    }
  });

};
