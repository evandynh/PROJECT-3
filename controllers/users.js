var User      = require('../models/user'),
    passport  = require('passport'),
    Api       = require('../models/api')



function getSignup(request, response) {
  response.render('authentication/signup.ejs', {message: request.flash('signupMessage')})
}

function postSignup(request, response) {
  var signupStrategy = passport.authenticate('local-signup', {
      successRedirect: '/',
      failureRedirect: '/users/signup',
      failureFlash: true
    }
  )
  return signupStrategy(request, response);
}

function getLogin(request, response) {
  response.render('authentication/login.ejs', {message: request.flash('loginMessage')})
}

function postLogin(request, response) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
  })

  return loginProperty(request, response)
}

function getLogout(request, response, next) {
  request.logout();
  // request.session.destroy(function(err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     return res.send({
  //       authenticated: req.isAuthenticated()
  //     })
  //   })
    response.redirect('/users/login');
  }


function index(req, res) {
  User.find({}, function(err, users){
    if (err) throw err
    res.render('users/index', {users: users})
  })
}

//SHOW
function show(req, res) {
  var id = req.params.id
  User.findById(id)
  .populate('favorites')
  .exec( function(err, user) {
    if (err) throw err
    res.render('users/show', {userProfile: user})
  })
}

// CREATE
function create(req, res){
  var newUser = new User(req.body)
  newUser.save(function(err, newUser) {
    if (err) throw err
    res.json(newUser)
  })
}

// EDIT
function edit(req, res){
  var id = req.params.id
  User.findById(id, function(err, user) {
    if (err) throw err
      res.render('users/edit', {userProfile: user})
  })
}

// UPDATE
function update(req, res) {
var id = req.params.id
User.findById(id, function(err, user) {
  if (err) throw err
  // change user username and expLevel
  user.local.name = req.body.name
  user.expLevel = req.body.expLevel
  //save the user
  user.save(function(err) {
    if (err) res.json({message: 'Something went wrong, could not save user'})
    console.log("User successfully updated");
    res.redirect('/users/' +id)
   })
 })
}

// DELETE
function destroy(request, response) {
  var id = request.params.id;

  User.remove({_id: id}, function(error) {
    if(error) throw err

    response.json({message: 'User successfully deleted'});
  });
}


module.exports = {
  index: index,
  show: show,
  create: create,
  edit: edit,
  update: update,
  destroy: destroy,
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout
}
