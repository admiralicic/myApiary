require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');

var environment = process.env.NODE_ENV;

require('./server/models/db');
require('./server/config/passport');

var auth = require('./server/routes/auth');
var hives = require('./server/routes/hives');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/hives', hives);
app.use('/api', auth);

switch (environment) {
  // case 'build':
 case 'production':
    console.log(('** BUILD **'));
    app.use(express.static(path.join(__dirname, 'build')));
    app.use('/*', express.static(path.join(__dirname, 'build', 'index.html')));
    break;
  default:
    console.log('** DEV **');
    app.use(express.static(path.join(__dirname, 'client')));
    app.use(express.static(path.join(__dirname, './')));
    app.use('/', express.static(path.join(__dirname, 'client', 'index.html')));
    break;
}

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ message: err.name + ' ' + err.message });
    return;
  }
  next(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
    //return;
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
  //return;
});


module.exports = app;
