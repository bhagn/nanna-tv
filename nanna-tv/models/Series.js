
module.exports = function(app) {
    var db = app.get('db');
    var Series = null;
    var mongoose = app.get('mongoose')
    
    var schema = new mongoose.Schema({
	    title: String,
	    link: String,
	    description: String,
	    thumbnailLink: String,
	    genre: String,
	    category: String,
	    releasedOn: Date,
	    language: String,
	    summary: String
	});
    Series = db.model('Series', schema);
    return Series;
};