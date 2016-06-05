var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

module.exports.login = function(req, res){
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(400).json({ message: err.errmsg }); }
        
        if (user) {
            var token = user.generateJwt();
            return res.status(200).json({ token: token });
        } else {
            res.status(400).json(info);
        }    
    })(req, res);
};

module.exports.register = function(req, res){
  if(!req.body.email || !req.body.firstName || !req.body.lastName || !req.body.password){
      return res.status(400).json({message: 'All fields are required'});
  }  
  
  var user = new User({
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
  });
  
  user.setPassword(req.body.password);
  
  user.save(function(err, user){
      if (err) {
          if (err.code === 11000) {
              return res.status(400).json({ message: 'User already exists' });
          } else {
              return res.status(400).json({ message: err.errmsg });
          }
      }
      
      var token = user.generateJwt();
      res.status(200).json({token: token});
      
  });
};