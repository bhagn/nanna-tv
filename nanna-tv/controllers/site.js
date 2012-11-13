exports.index = function(req, res, next) {
  var seriesModel = req.app.models.Series;
  global.require(["dojox/dtl/_base", "dojox/dtl/Context", "dojo/node!fs"], function(dtl, Context, fs) {
    seriesModel.find(function(err, series) {
      if(err)
        res.send(err.message + "<br/>" + err.stack);
      
      var templateString = fs.readFileSync("views/index.html", 'utf8');
      if(series.length != 0)
        templateString = fs.readFileSync("views/search.html", 'utf8');
      var template = new dtl.Template(templateString);
      var context = new Context({series: series});
      res.send(template.render(context));
    });
  });
};
