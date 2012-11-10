exports.index = function(req, res, next) {
  global.require(["dojox/dtl/_base", "dojox/dtl/Context", "dojo/node!fs"], function(dtl, Context, fs) {
    var templateString = fs.readFileSync("views/index.html", 'utf8');
    var template = new dtl.Template(templateString);
    var context = new Context({name: 'Alak-Bulak'});
    res.send(template.render(context));
  });
};
