var fs = require('fs');
var https = require("https");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
var mongoose = require('mongoose');
var Handlebars = require('Handlebars');
const passport = require("passport");
const {Strategy} = require('passport-google-oauth20');
const cookieSession = require('cookie-session');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter  = require('./routes/auth');
var catalogRouter = require('./routes/catalog');



var PORT = 5000;
var app = express();

require('dotenv').config();
const config = {
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    COOKIE_KEY_1: process.env.COOKIE_KEY_1,
    COOKIE_KEY_2: process.env.COOKIE_KEY_2
};
const AUTH_OPTIONS = {
    callbackURL: '/auth/google/callback',
    clientID: config.CLIENT_ID,
    clientSecret: config.CLIENT_SECRET
};

//call when receive user data from google
function verifyCallback(accessToken, refreshToken, profile, done){
    //console.log('google profile', profile);
    
    done(null, profile);
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback));
//save the session to cookie
passport.serializeUser((user, done)=>{
    done(null, user);
});
//read the session from the cookie
passport.deserializeUser((obj, done)=>{
    done(null, obj);
});
//connecting to server and some initialize
var mongoDB_url = 'mongodb://localhost:27017/express-practice'
mongoose.connect(mongoDB_url);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('open', ()=>{
    console.log("connect success");
});



//setting helmet
app.use(helmet());
app.use(cookieSession({
    name: 'session',
    maxAge: 24 * 60 * 60 * 1000, //long live about 1 days
    keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2]//secret key
}));
app.use(passport.initialize());
app.use(passport.session());




Handlebars.registerHelper('ifEquals', function () {
    const args = Array.prototype.slice.call(arguments, 0, -1);
    return args.every(function (expression) {
        return args[0] === expression;
    });
});
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

