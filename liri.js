require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);
   
  var params = {screen_name: 'nodejs'};
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      console.log(tweets);
    }
  });