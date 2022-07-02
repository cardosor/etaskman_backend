//Imports
const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
require('./config/database');
//PORT
const port = 8080;

//========== Middleware =============

app.use(cors());
app.use(express.urlencoded({ extended: false }));
//Use express middleware to parse JSON
app.use(express.json());

// app.use(require('./config/checkToken'));


//======ROUTES
//Users
app.use('/api/v1/users', require('./routes/api/users'));

//Protect API routes bellow from anuthorized users
const checkUserLogged = require('./config/checkUserLogged');

//Projects
app.use('/api/v1/projects', require('./routes/api/projects'));

//Tasks
app.use('/api/v1/tasks', require('./routes/api/tasks'));


app.listen(port, () => console.log(`Listening to port ${port}`));
