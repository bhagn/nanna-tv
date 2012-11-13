exports.getResults = function(req, res, next) {
  var seriesModel = req.app.models.Series;
  var searchString = req.params.searchString || req.get("query");
  var series = {};
  global.require(["dojox/dtl/_base", "dojox/dtl/Context", "dojo/node!fs"], function(dtl, Context, fs) {
    //logic to send a request to tv-links.eu
     
    //parse the response
    
    //retrieve the search resutls
     
    //create Series Objects
    
    res.send(series);
  });
};
