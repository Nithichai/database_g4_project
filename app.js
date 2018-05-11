var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var scheduleRouter = require('./routes/schedule');
var standingRouter = require('./routes/standing');
var teamRouter = require('./routes/team');
var aboutRouter = require('./routes/about');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// javascript setup
app.set('javascripts', path.join(__dirname, 'public/javascripts'));

// images
app.set('images', path.join(__dirname, 'public/images'));

// stylesheets
app.set('stylesheets', path.join(__dirname, 'public/stylesheets'));

//set model
app.set('models', path.join(__dirname, 'models'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/schedule', scheduleRouter);
app.use('/standing', standingRouter);
app.use('/team', teamRouter);
app.use('/about', aboutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
