// These are all the App's dependencies
var express = require('express');
var request = require('request'); 
var cheerio = require('cheerio'); 
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var morgan = require('morgan');
var mongoose = require('mongoose');
var sequelize = require('sequelize');
var app = express();
var Schema = mongoose.Schema;


// Create article schema
var ArticleSchema = new Schema({
  // title is required
  title: {
    type:String,
    required:true
  },
  // link is required
  link: {
    type:String,
    required:true
  },
  // this only saves one note's ObjectId. ref refers to the Note model.
  note: {
      type: Schema.Types.ObjectId,
      ref: 'Note'
  }
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model('Article', ArticleSchema);

// use morgan and bodyparser with our app, I need more reading on this
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public')); // This is the path to my static files

mongoose.connect('mongodb://localhost/scrape');
var db = mongojs('gba', ['hackz']);

// this makes sure that any errors are logged if mongodb runs into an issue AKA error listener
db.on('error', function(err) {
  console.log('Database Error:', err);
});

// URL for the victim web page to be scraped :o
request('https://gbatemp.net/forums/ps-vita-hacking-homebrew.217/', function (err, response, html) {
  if (err){
    throw err;
  }

  var dbLength = db.hackz.length;
  console.log(dbLength);
  
  // Save my cereal into a variable for easier access
  var $ = cheerio.load(html);

  var gbatemp = "https://gbatemp.net/";
  var results = [];

  var dbLength = db.hackz.count();

  $('h3.title').each(function(i, element){


    var title = $(element).text().trim();
    var link = gbatemp + $(element).find('a').attr('href');

    results.push({
      title: title,
      link: link
    });



    db.hackz.save(results);

      });
    });
  
  app.get('/', function(req, res){

  });







//var port = process.env.PORT || 3000;

// Running in port 3000
app.listen(3000, function() {
  console.log('App running on port 3000!');
});