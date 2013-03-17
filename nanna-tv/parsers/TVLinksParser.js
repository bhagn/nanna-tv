var cheerio = require("cheerio");

var TVLinksParser = function() {
    this.provider = "TV-Links";
    this.url = "http://www.tv-links.eu";
    console.log("Loading parser: ", this.provider, " [" + this.url + "]");
    return this;
}

TVLinksParser.prototype.getSearchUrl = function(searchString) {
    return this.url + "/_search/?s=" + searchString;
}

/*
 * parseSearchString - parse the DOM and return the search 
 * results in form of JSON
 */
TVLinksParser.prototype.getSearchResults = function(document) {
    console.log("getting search results");
    var $ = cheerio.load(document);
    var urlPrefix = this.url;
    var series = [];
    var op = "";
    
    $('.table_search_movies', document).find("li").each(function(i, li) {
        var temp = {};
        op += $(this).html();
        
        //check if no results were found
        if(op.match("Sorry, we couldn't find a match")) return;
        
        var a = $(this).children()[0];
        temp["permalink"] = urlPrefix + $(a).attr("href");
        var spans = $(a).children();
        temp["thumbnailLink"] = $(spans).first().find("img").first().attr("src");
        temp["title"] = $(spans).last().children().first().find("span").first().text();
        
        var details = $($(spans).last().children()[1]).text().split(",");

        temp["category"] = details[0]? details[0].split(":")[1]? details[0].split(":")[1].trim(): "unknown" : "unknown";
        temp["releasedOn"] = details[1]? details[1].split(":")[1]? details[1].split(":")[1].trim(): "unknown": "unknown";
        temp["genre"] = details[2]? new Array(details[2].split(":")[1].trim()) : [];
        temp["summary"] = $($(spans).last().children()[2]).text();
        
        for(var i=3, len=details.length; i<len; i++)
            temp["genre"].push(details[i].trim());  

        series.push(temp);
    });
    return series;
}

module.exports = function(data) {
    return new TVLinksParser();
}