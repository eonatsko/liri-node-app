require("dotenv").config();
var keys = require("./keys.js");
//code for Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var song=process.argv[3];
var userSong=process.argv[2];

if (song===undefined){
  song="The Sign Ace of Base"
}
function getSong(){
spotify.search({ type: 'track', query: song, limit:1 })
  .then(function(response) {
    console.log("Artist Name: "+JSON.stringify(response.tracks.items[0].artists[0].name, null, 2));
    console.log("Song Title: "+JSON.stringify(response.tracks.items[0].name, null, 2));
    console.log("Preview Link: "+JSON.stringify(response.tracks.items[0].preview_url, null, 2));
    console.log("Album Title: "+JSON.stringify(response.tracks.items[0].album.name, null, 2));
    
  })
  .catch(function(err) {
    console.log()
  });
}

if(userSong==="spotify-this-song"){
  getSong();
}
//code for Twitter
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var params = {screen_name: 'SuperHa79616072'};
var userInput = process.argv[2];
function getTweets(){
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error && userInput==="my-tweets") {
      for(var i=0;i<20;i++){
        var tweet=tweets[i];
        var created=tweet.created_at;
        console.log("---------\n"+created+"\n"+tweet.text);
      }
    }
  });
}
getTweets();
//IMDB code
var request = require('request');
var userRequest=process.argv[2];
var movieName = process.argv[3];
function getMovie(){
  if(userRequest==="movie-this"){
    if (movieName===undefined){
      movieName="Mr. Nobody"
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
request(queryUrl, function(error, response, body) {
  // If the request is successful (i.e. if the response status code is 200)
  if (!error && response.statusCode === 200) {
    var movieTitle=JSON.parse(body).Title;
    var year=JSON.parse(body).Year;
    var ratingI=JSON.parse(body).Ratings[0].Value;
    var stringRating= JSON.stringify(ratingI);
    var ratingR=JSON.parse(body).Ratings[1].Value;
    var stringRating= JSON.stringify(ratingI);
    var origin=JSON.parse(body).Country;
    var lang=JSON.parse(body).Language;
    var plot=JSON.parse(body).Plot;
    var actors=JSON.parse(body).Actors;
   //log results to terminal
    console.log("The movie title is: " + movieTitle);
    console.log("The movie was released in: " + year);
    console.log("The movie's IMDB rating is: " + stringRating);
    console.log("The movie's Rotten Tomato rating is: " + ratingR);
    console.log("The movie was produced in: " + origin);
    console.log("The movie's language is: " + lang);
    console.log("The movie's plot is: " + plot);
    console.log("The movie's cast is: " + actors);
}
});
}
}
getMovie();
//do what it says code
var fs = require("fs");
if(userSong==="do-what-it-says"){
fs.readFile("random.txt", "utf8", function(error, data) {
  // If the code experiences any errors it will log the error to the console.
  if (error) {
    return console.log(error);
  }
  var dataArr = data.split(",");
  song=dataArr[1];
  getSong();
});
}