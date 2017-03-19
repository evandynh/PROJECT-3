var express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    app = express(),
    passport = require('passport'),
    session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// middleware
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// root route
app.get('/', function(req, res){
  res.send('Hello Jukebox')
})

app.listen(port, function(req, res){
  console.log('The server is running on port', port)
})
