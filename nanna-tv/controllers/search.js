exports.getResults = function(req, res, next) {
  var seriesModel = req.app.models.Series;
  var searchString = req.params.searchString || req.query.query;
  var series = {};
  
  global.require(["dojox/dtl/_base", "dojox/dtl/Context", "dojo/node!http", "dojo/node!fs"], function(dtl, Context, http, fs) {
    //send a request to tv-links.eu with the query
    var url = "http://www.tv-links.eu/_search/?s=" + searchString;
    console.log("sending request to: ", url);
    var request = http.get(url, function(response) {
        var output = "";
        response.on("data", function(chunk) {output += chunk;})
        response.on("end", function() {
	        var TVLinksParser = req.app.parsers.TVLinksParser;
	        series = TVLinksParser.getSearchResults(output);
	        var templateString = fs.readFileSync("views/searchResults.html", 'utf8');
	        var template = new dtl.Template(templateString);
	        var firstResult = series.shift();
            var context = new Context({firstResult: firstResult, series: series, searchString: searchString});
	        res.send(template.render(context));
        });
    }, function(err) {
        res.send({error: "An Error Occurred: " + err.message});
    }); 
    request.end();
  });
};
