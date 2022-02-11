var fs = require('fs');
var https = require("https");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter  = require('./routes/auth');
var catalogRouter = require('./routes/catalog');

var PORT = 5000;
var app = express();

//connecting to ser ver 
var mongoDB_url = 'mongodb://localhost:27017/express-practice'
mongoose.connect(mongoDB_url);
mongoose.Promise = global.Promise;

//mongo db connect event 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', ()=>{
    console.log("connect success");
})

//setting node js 
app.use(helmet());
app.set('view engine', 'hbs');

//setting path
app.set('views', path.join(__dirname, "views"));
app.use('/sites', express.static(path.join(__dirname, "public")));

//setting middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//setting router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/catalog', catalogRouter);


https.createServer({
    key: fs.readFileSync("key.pem"),
    cert: fs.readFileSync("cert.pem")
}, app).listen(PORT, ()=>{
	console.log('Listening on port ${PORT}...');
});

module.exports = app;

