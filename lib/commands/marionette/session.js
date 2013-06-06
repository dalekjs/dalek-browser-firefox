module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'getMarionetteID',
    request: {
        to: 'root',
        type: 'getMarionetteID'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'getSession',
    request: {
        to: ':marionetteId',
        type: 'newSession'
    }
  });

};
