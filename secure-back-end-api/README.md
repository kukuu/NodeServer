# Building our secure back end Node API:

We’ll build our backend API with NodeJS and the Express framework.

Many modern applications separate the backend services from the frontend user interface. In this type of architecture, the backend will expose a web based API that the frontend client consumes. Typically, the backend will handle incoming requests and return a JSON or XML encoded response. The frontend will then be in charge of formatting, styling, and displaying this response to the user. We’ve all heard the term “separation of concerns” and applying it at this scale has many benefits.

The backend services can grow and evolve independent of the frontend client. New APIs, if properly versioned, can provide new features and functionality without breaking existing integrations. A single backend can interface with multiple clients and the frontend clients will not be limited to any specific framework or programming language. This means that your single backend can work with your app for both a web based implementation, your mobile app, and even with IoT devices.


## The App

The application we are building today will be an app called Movie Analyst. Movie Analyst aggregates and displays a list of the latest movie reviews by famous critics across the web. Users can view the latest movie reviews, learn about the critics that review them, and also see the publications that Movie Analyst has partnered with. Website administrators, who will have a separate website, can see and edit these pages, but also have access to reviews-in-progress so that they can prepare and approve reviews ahead of time.

Rather than building two separate backends for the user facing side and the admin application, we are going to build and expose an API with four endpoints. The user facing app will have access to the movies, reviewers and publications endpoints, while the admin app will additionally have access to the pending endpoint which will return movie reviews that are not ready to be publically accessible. We’ll start by building our API.

## Steps to building API 

1. Build server.js

i. Begin to build server.js

```
// Get our dependencies
var express = require('express');

//instantiate express
var app = express();

var jwt = require('express-jwt');
var rsaValidation = require('auth0-api-jwt-rsa-validation');

```

2. Build an end point resource

```

// Implement the movies API endpoint
app.get('/movies', function(req, res){
  // Get a list of movies and their review scores
  var movies = [
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

```

```
//returned JSON  result from serveer API to Client

[{"name":"The Daily Reviewer","avatar":"glyphicon-eye-open"},{"name":"International Movie Critic","avatar":"glyphicon-fire"},{"name":"MoviesNow","avatar":"glyphicon-time"},{"name":"MyNextReview","avatar":"glyphicon-record"},{"name":"Movies n' Games","avatar":"glyphicon-heart-empty"},{"name":"TheOne","avatar":"glyphicon-globe"},{"name":"ComicBookHero.com","avatar":"glyphicon-flash"}]

```

3. Secure end points

i. We’ll create a middleware function to validate the access token when our API is called
 Note that the audience field is the identifier you gave to your API: jwtCheck

 ```
  var jwtCheck = jwt({
  secret: rsaValidation(),
  algorithms: ['RS256'],
  issuer: "https://YOUR-AUTH0-DOMAIN.auth0.com/",
  audience: 'https://movieanalyst.com'
});

```

 ii. Enable the use of the jwtCheck middleware in all of our routes

 ```

 app.use(jwtCheck);

 ```

 iii. Check it token is rejected

 ```
 app.use(function(err, res, send, next){
 	if(err.name === 'Unauthorise'){
 		res.status(401).json({'message': 'Unauthorised Access'})
 	}

 })
 ```

  iv. Launch our API Server and have it listen on port 8080:

``` 
 app.listen(8080);

 ```

 3. Scopes

 Scopes allow us to grant specific permissions to clients that are authorized to use our API. For our demo, we are going to create two scopes, general and admin. In an actual application, you could further narrow down the scopes by giving read or write permissions and even go as far to protect each individual route with a separate scope. We’ll keep it fairly general here though. Go ahead and create the two scopes now.


 Once we have our scopes in place, the last thing we’ll need to do is authorize our two clients to work with the API we created. Within the MovieAnalystAPI section, navigate to the Non-Interactive Clients tab. Here you will see a list of all the clients that can interface with our API. By default, when we created our MovieAnalystAPI a test client was created for us. We’ll also see the two clients we created but they will be displayed as Unauthorized.

 We create 2 scopes here, an "admin" and "general" ones. These can be grouped into arrays of permissions  and assiciated with clients as keys to attach to the endpoints they can use. By so doing we can easily manage which scopes the client will have.

  For the admin client we enable both the general and admin scopes, and for the website client, we’ll just enable general access.

  ```
  ['admin'] : client has access to all 4 end points.
  ['general']: all other non-admin clients will use this. Will al have access to only 3 genereic end points. They won't be allowed to edit or update the application.

  ```

  With our scopes in place, we update server.js file for our API to make some final edits. We provide the ability to check if the client has permissions to view the endpoint requested. To do this, we’ll create another middleware that will look at the decoded JWT and see if it the token has the correct scope. If it doesn’t we’ll send an appropriate forbidden message, otherwise we’ll send the data. Take a look at our implementation of this functionality below.

  Here we use express's magic routing and also switch statements with 'req.path' as signature. A  3rd signature 'next' is applied to the annonymous function, which will ascertain completion of check process and complete the route. Loops and conditions apply here as well. Also, to look out for is the condition for evaluating the scope of the permission status/value using  'if(req.user.scope.includes(permissions[i])){ next();} else {}' in the loop.:

  ```
  // existing jwtCheck middleware

var guard = function(req, res, next){
  // we’ll use a case switch statement on the route requested
  switch(req.path){
    // if the request is for movie reviews we’ll check to see if the token has general scope
    case '/movies' : {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
    // Same for the reviewers
    case '/reviewers': {
      var permissions = ['general'];
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
    
    // For the pending route, we’ll check to make sure the token has the scope of admin before returning the results.
    case '/pending': {
      var permissions = ['admin'];
      console.log(req.user.scope);
      for(var i = 0; i < permissions.length; i++){
        if(req.user.scope.includes(permissions[i])){
          next();
        } else {
          res.send(403, {message:'Forbidden'});
        }
      }
      break;
    }
  }

// existing app.use middleware

```
We enable the use of the guard middleware to the application

```

app.use(guard);

```

Our guard middleware will be called on each request and will ensure that the token has the correct scope. If it does, we’ll send the data, otherwise we’ll return a 403 Forbidden status and appropriate message.

## Note

server.js has been extended and revisioned to final-server.js

THIS CONCLUDES THE SECURE BACKEND API! HAPPY READING --) 


