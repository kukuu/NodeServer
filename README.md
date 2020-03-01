# Node Server with express 
## Server side / Isomorphic  JavaScript
## REACT
## es6
## State Management & Immutability
## Lodash
## Webpack
## Token Based Authentication - JWT

https://auth0.com/docs/tokens/concepts/access-tokens

### Implicit authentication (IA) 

Is a technique that allows the smart device to recognize its owner by being acquainted with his/her behaviors. It is a technique that uses machine learning algorithms to learn user behavior through various sensors on the smart devices and achieve user identification. Lifetime - 2 hours

### Opaque Access Token 

Opaque Access Tokens are tokens whose format you cannot access.They are  tokens in a proprietary format that typically contain some identifier to information in a server’s persistent storage. To validate an opaque token, the recipient of the token needs to call the server that issued the token.
Opaque Access Tokens issued by Auth0 can be used with the /userinfo endpoint to return a user's profile.


### Token ID 

Tokens ID are used in token-based authentication to cache user profile information and provide it to a client application, thereby providing better performance and experience. The application receives an ID Token after a user successfully authenticates, then consumes the ID Token and extracts user information from it, which it can then use to personalize the user's experience.
For example, let's say you have built a regular web application, registered it with Auth0, and have configured it to allow a user to log in using Google. Once a user logs in to your app, you can use the ID Token to gather information, such as name and email address, which you can then use to auto-generate and send a personalized welcome email.

lifetime 10hrs

### JWT 

JSON Web Token (JWT) Access Tokens conform to the JSON Web Token standard and contain information about an entity in the form of claims. They are self-contained in that it is not necessary for the recipient to call a server to validate the token. They have to be validaed in run time.

Access Tokens issued for the Auth0 Management API and Access Tokens issued for any custom API that you have registered with Auth0 will follow the JSON Web Token (JWT) standard, which means that their basic structure conforms to the typical JWT Structure, and they contain standard JWT Claims asserted about the token itself.

lifetime - 24 hrs

## Mongoose/mongoDB

1. For a comprehensive coding exercise on using tokens in a working application see:

i. https://github.com/kukuu/secure-restful-react-redux-web-app/blob/master/bookworm/bookworm-api/src/index.js 
ii. https://github.com/kukuu/NodeServer-RESTful-apps/tree/master/secure-back-end-api

2.Add BCRYPT to your node module packages and use it to generate password using "hashSync". Add a salt factor of 10 to the signature. This can be done by switching to node at the CLI (>node)

3. require bcrypt and store in state variable, say bcrypt

4. follow step 2. Attach hashSync to state variable in 3

5. hashSync takes 2 parameters:  a string argument to be encrypted and salt factor

6. Go to mongodb and insert a record with your generated hashed password

7. Be brave and try this!! Good luck--)
