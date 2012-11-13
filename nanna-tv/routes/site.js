module.exports = function(app) {

/**
 *  Load Controllers.
 */

  var site = app.controllers.site;
  var search = app.controllers.search;

/**
 *  Route to controllers.
 */

  app.get('/', site.index);
  
  app.get('/search', search.getResults);

};
