module.exports = function(app) {

/**
 *  Load Controllers.
 */

  var site = app.controllers.site;

/**
 *  Route to controllers.
 */

  app.get('/', site.index);

};
