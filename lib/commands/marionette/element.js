module.exports = function (Marionette) {

  /**
   *
   */

  Marionette.addCommand({
    name: 'element',
    params: ['selector'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        value: ':selector',
        type: 'findElement',
        using: 'css selector'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'elements',
    params: ['selector'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        value: ':selector',
        type: 'findElements',
        using: 'css selector'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'click',
    params: ['elementId'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        element: ':elementId',
        type: 'clickElement'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'displayed',
    params: ['elementId'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        element: ':elementId',
        type: 'isElementDisplayed'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'text',
    params: ['elementId'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        element: ':elementId',
        type: 'getElementText'
    }
  });

  /**
   *
   */

  Marionette.addCommand({
    name: 'attribute',
    params: ['elementId', 'attr'],
    request: {
        to: ':marionetteId',
        session: ':sessionId',
        element: ':elementId',
        name: ':attr',
        type: 'getElementAttribute'
    }
  });

};
