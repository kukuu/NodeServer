// Steps : Project Setup: Serve index.html with ExpressJS - 

// 1. run :"npm init -y" for default settings for package.json

// 2. Initialise git repository - "git init"

// 1. Using es6 on server - Requires babel transpiler. Node does not understand import so install 
//i.  "npm  i --save-dev babel-cli"
// ii. in package json in the script block define server key to point to "babel-node server/index.js" 
// iii. if you run the server command "npm run server" the app will fail
//iv. in the root folder create .babelrc file in root folder and . inside it define an object  with an array of presets



// 4. Create server folder in repository and we beginn to build index.js as entry file

import express from 'express';
import path from 'path';

// Initialise express
let app = express();

//we define route for all routes
app.get('/*', (req, res) => {
	//res.send('Hello World')
	//we send a file now
	res.sendFile(path.join(__dirname, './index.html'))
})

app.listen(3010, () => console.log('Running on localhost:3010'));
