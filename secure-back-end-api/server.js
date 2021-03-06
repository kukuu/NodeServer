//Author - Alexander Adu-Sarkodie
// =----------------Note---------------------
// Since our backend API is only going to expose 
//a few routes, we’ll write all of our code in this single file. 
//The express dependency will pull down the express framework, 
//express-jwt library will give us functions
 //to work with JSON Web Tokens, and finally
 // auth0-api-jwt-rsa-validation will provide a 
 //helper function for getting our secret key.

 //The application is called Movie Analyst. 
 //Movie Analyst aggregates and displays a 
 //list of the latest movie reviews by 
 //famous critics across the web.
  //Users can view the latest movie reviews, learn about the critics 
  //that review them, and also see the publications that 
  //Movie Analyst has partnered with. Website administrators, 
  //who will have a separate website, can see and edit these pages, 
  //but also have access to reviews-in-progress so 
 //that they can prepare and approve reviews ahead of time.



 //Rather than building two separate backends for the user
  //facing side and the admin application, we are going to
   //build and expose an API with four endpoints. 
   //The user facing app will have access to the movies,
   // reviewers and publications endpoints, while the
   // admin app will additionally have access to the pending 
   //endpoint which will return movie reviews that are not 
 //ready to be publically accessible.
 //We’ll start by building our API.
 //------------------------------------------

//Begin Happy coding
// Get our dependencies
var express = require('express');
var app = express();
var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

// Implement the movies API endpoint. Using es6 arrow function to return result
app.get('/movies', (req, res) => {
  // Get a list of movies and their review scores
  const movies = [
    {title : 'Suicide Squad', release: '2016', score: 8, reviewer: 'Robert Smith', publication : 'The Daily Reviewer'},    
    {title : 'Batman vs. Superman', release : '2016', score: 6, reviewer: 'Chris Harris', publication : 'International Movie Critic'},
    {title : 'Captain America: Civil War', release: '2016', score: 9, reviewer: 'Janet Garcia', publication : 'MoviesNow'},
    {title : 'Deadpool', release: '2016', score: 9, reviewer: 'Andrew West', publication : 'MyNextReview'},
    {title : 'Avengers: Age of Ultron', release : '2015', score: 7, reviewer: 'Mindy Lee', publication: 'Movies n\' Games'},
    {title : 'Ant-Man', release: '2015', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Guardians of the Galaxy', release : '2014', score: 10, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'},
  ]

  // Send the response as a JSON array
  res.json(movies);
})

// Implement the reviewers API endpoint
app.get('/reviewers', (req, res) => {
  // Get a list of all of our reviewers
  var authors = [
    {name : 'Robert Smith', publication : 'The Daily Reviewer', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/angelcolberg/128.jpg'},
    {name: 'Chris Harris', publication : 'International Movie Critic', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/bungiwan/128.jpg'},
    {name: 'Janet Garcia', publication : 'MoviesNow', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/grrr_nl/128.jpg'},
    {name: 'Andrew West', publication : 'MyNextReview', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/d00maz/128.jpg'},
    {name: 'Mindy Lee', publication: 'Movies n\' Games', avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/laurengray/128.jpg'},
    {name: 'Martin Thomas', publication : 'TheOne', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/karsh/128.jpg'},
    {name: 'Anthony Miller', publication : 'ComicBookHero.com', avatar : 'https://s3.amazonaws.com/uifaces/faces/twitter/9lessons/128.jpg'}
  ];

  // Send the list of reviewers as a JSON array
  res.json(authors);
})

// Implement the publications API endpoint
app.get('/publications', (req, res) => {
  // Get a list of publications
  var publications = [
    {name : 'The Daily Reviewer', avatar: 'glyphicon-eye-open'},
    {name : 'International Movie Critic', avatar: 'glyphicon-fire'},
    {name : 'MoviesNow', avatar: 'glyphicon-time'},
    {name : 'MyNextReview', avatar: 'glyphicon-record'},
    {name : 'Movies n\' Games', avatar: 'glyphicon-heart-empty'},
    {name : 'TheOne', avatar : 'glyphicon-globe'},
    {name : 'ComicBookHero.com', avatar : 'glyphicon-flash'}
  ];

  // Send the list of publications as a JSON array
  res.json(publications);
})

// Implement the pending reviews API endpoint
app.get('/pending', (req, res) => {
  // Get a list of pending movie reviews
  var pending = [
    {title : 'Superman: Homecoming', release: '2017', score: 10, reviewer: 'Chris Harris', publication: 'International Movie Critic'},
    {title : 'Wonder Woman', release: '2017', score: 8, reviewer: 'Martin Thomas', publication : 'TheOne'},
    {title : 'Doctor Strange', release : '2016', score: 7, reviewer: 'Anthony Miller', publication : 'ComicBookHero.com'}
  ]

  // Send the list of pending movie reviews as a JSON array
  res.send(pending);
})

// Launch our API Server and have it listen on port 8080.
app.listen(8090);
