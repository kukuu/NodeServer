# Node Server with express 
## Server side / Isomorphic  JavaScript
## REACT
## es6
## State Management & Immutability
## Lodash
## Webpack
## Token Based Authentication - JWT
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
