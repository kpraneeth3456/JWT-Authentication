// Main Starting point of the application
const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
const cors = require('cors');

//Database Setup
mongoose.connect('mongodb://localhost:auth/auth');

//Middlewares Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json( {type : '*/*'} ));
routes(app);

//Server Setup
const port = process.env.PORT || 3000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening to port ',port);
