module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'open',
    params: ['url'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        value: ':url',
        type: 'goUrl'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'url',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        type: 'getUrl'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'back',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        type: 'goBack'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'forward',
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        type: 'goForward'
    }
  });

};
