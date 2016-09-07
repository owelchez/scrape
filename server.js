
var express = require('express');
var request = require('request'); 
var cheerio = require('cheerio'); 
var app = express();
var mongojs = require('mongojs');


var databaseUrl = "forum";
var collections = ["articles"];
var db = mongojs(databaseUrl, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
  console.log('Database Error:', err);
});


request('https://gbatemp.net/forums/ps-vita-hacking-homebrew.217/', function (err, response, html) {
  if (err){
    throw err;
  }
  
  var $ = cheerio.load(html);
  console.log($);

  var result = [];

  $('h3.title').each(function(i, element){

      var title = $(this).text().slice('\t', '\n');

      var link = $(element).children().attr('href');
      
      result.push({
        title:title,
        link:link
      });
    });

  console.log(result);
});

		

app.get('/', function(req, res){
	db.find()(function(err, data){
		if (err){
			throw err;
		}
		res.json(data);
	})
})







// Running in port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});