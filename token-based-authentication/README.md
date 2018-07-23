# Token Based Authentication

Authentication is one of the big parts of every application. Security is always something that is changing and evolving. In the past, we have gone over Node authentication using the great Passport npm package.

Those  used the session based authentication however, which has problems when we talk about scaling web services and creating an API that can be consumed across many devices and services.

This is a simple work to demonstrate the method of authentication by verifying a token using Express route middleware.

We'll build a quick API using Node and Express and we'll be using POSTman to test it. 


## The main workflow of this is that we will:

1. Have unprotected and protected routes

2. A user will authenticate by passing in a name and a password and get back a token

3. The user will store this token on their client-side and send it for every request

4. We will validate this token, and if all is good, pass back information in JSON format

5. Our API will be built with:

	i. normal routes (not authenticated)

	ii. middleware to authenticate the token

	iii. route to authenticate a user and password and get a token

	iv. authenticated routes to get all users

## File Structure

		- app/

		----- models/

		---------- user.js

		- config.js

		- package.json

		- server.js


## Requirements

 node and npm


## Usage

i. Clone the repo

ii. Install dependencies: npm install

iii. Change SECRET in config.js

iv. Add your own MongoDB database to config.js

v. Start the server: node server.js

vi. Create sample user by visiting: http://localhost:8080/setup (change the port number if necessary). Optimise by storing in parameter. See Secure Backend API and others.

Once everything is set up, we can begin to use our app by creating and verifying tokens.

### Set Up Our Node Application 

1. Package.json

```
{
  "name": "node-token-jwt",
  "main": "server.js"
}
```

2. Install all packages

```

$ npm install express body-parser morgan mongoose jsonwebtoken --save

``` 

i. express is the popular Node framework

ii. mongoose is how we interact with our MongoDB database

iii. morgan will log requests to the console so we can see what is happening

iv. body-parser will let us get parameters from our POST requests

v. jsonwebtoken is how we create and verify our JSON Web Tokens

vi. The --save modifier will also save these packages to our package.json file. How convenient!


### User Model (app/models/user.js)

The user model that we define will be used when creating and getting users. To create a Mongoose model, let's create the file app/models/user.js


```
// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    name: String, 
    password: String, 
    admin: Boolean 
}));

```

### Config File (config.js)

For this file, you will need to create MongoDB database. You can either create one locally or easily use one online at http://modulus.io/  for free. Either way, you will be able to get a URI string to use as your database configuration.

```
module.exports = {

    'secret': 'ilovescotchyscotch',
    'database': 'mongodb://noder:noderauth&54;proximus.modulusmongo.net:27017/so9pojyN'

};

```

i. secret: used when we create and verify JSON Web Tokens

ii. database: the URI with username and password to your MongoDB installation



### server.js -  The Actual Node Application

[to come]

## Getting a Token

Send a POST request to http://localhost:8080/api/authenticate with test user parameters as x-www-form-urlencoded.

  ```
  {
    name: 'Luca Trinca',

    password: 'smartboy!'
  }
  ```


## Verifying a Token and Listing Users

Send a GET request to http://localhost:8080/api/users with a header parameter of:

```
 x-access-token and the token.

 ```

You can also send the token as a URL parameter: 

```

http://localhost:8080/api/users?token=YOUR_TOKEN_HERE

```

Or you can send the token as a POST parameter of token.

## Encryption
2.Add BCRYPT to your node module packages and use it to generate password using "hashSync". Add a salt factor of 10 to the signature. This can be done by switching to node at the CLI (>node)

1. require bcrypt and store in state variable, say bcrypt

2. Attach hashSync to state variable 

3. hashSync takes 2 parameters: a string argument to be encrypted and salt factor

```

// Load the bcrypt module
var bcrypt = require('bcrypt');
// Generate a salt
var salt = bcrypt.genSaltSync(10);
// Hash the password with the salt
var hash = bcrypt.hashSync("my password", salt);
 
// Finally just store the hash in your DB
// .. code to store in Redis/Mongo/Mysql/Sqlite/Pos

```

Go to mongodb and insert a record with your generated hashed password

Be brave and try this!! Good luck--)
