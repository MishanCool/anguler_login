const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport'); // create modules
const mongoose = require('mongoose');
const config = require('./config/database');

/*** conect to database ***/

//Connect to database
mongoose.connect(config.database);

//On connection
mongoose.connection.on('connected',() =>{
  console.log('Connected to database'+config.database);
});

//On error
mongoose.connection.on('error',(err) =>{
  console.log('Database error: '+err);
});


/*## conect to database ##*/

const app = express();



const users = require('./routes/users');

//Port Number
const port = 3000;

//CORS Middleware
app.use(cors());




//set Static Folder
app.use(express.static(path.join('public'))); //public->folder name

//Body parser Middleware
app.use(bodyParser.json());

//Passport Middleware
// app.use(passport.initialize());
// app.use(passport.session());

app.use('/users', users);

//Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint'); //create rout
});

//Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});