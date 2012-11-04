
module.exports = function(app) {
    var db = app.get('db');
    console.log("DB: ", db);
    var Series = null;
    require(["dojo/node!mongoose/index"], function(mongoose) {
        var schema = new mongoose.Schema({
		    title: String,
		    link: String,
		    description: String,
		    thumbnailLink: String,
		    genre: String,
		    category: String,
		    releasedOn: Date,
		    language: String 
		});
        Series = db.model('Series', schema);
        return Series;
    });
};