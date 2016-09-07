// These are all the App's dependencies
var express = require('express');
var request = require('request'); 
var cheerio = require('cheerio'); 
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = express();

var databaseUrl = "forum";
var collections = ["articles"];
var db = mongojs(databaseUrl, collections);

// use morgan and bodyparser with our app, I need more reading on this
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public')); // This is the path to my static files

// this makes sure that any errors are logged if mongodb runs into an issue
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// URL for the victim web page to be scraped :o
request('https://gbatemp.net/forums/ps-vita-hacking-homebrew.217/', function (err, response, html) {
  if (err){
    throw err;
  }
  
  // Save my cereal into a variable for easier access
  var $ = cheerio.load(html);

  var result = [];

  $('h3.title').each(function(i, element){

      var title = $(this).text().trim();

      var link = $(element).children().attr('href');
      
      result.push({
        title:title,
        link:link
      });
    });

  console.log(result);
  
/*
  use zoo
db.animals.insert({"name":"Panda", "numlegs":4, "class":"mammal", "weight": 254, "whatIWouldReallyCallIt":"Captain Fuzzy Face"})*/

});

		

app.get('/', function(req, res){
		if (err){
			throw err;
		}
		res.json(data);
	})








// Running in port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});