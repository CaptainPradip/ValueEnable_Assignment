const jwt = require('jsonwebtoken');
const User = require('../models/users');
const config = require('config');
// Parking Lot Create | Update
exports.createUser = (req, res,) => {
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.role = req.body.role;
  if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '') {
    res.json({ success: false, message: "Ensure User Name ,Password ,username is provided !!!" });
  }
  else {
    user.save(function (error) {
      if (error) {
        res.json({ success: false, message: "username Already Existed !!!" });
      }
      else {
        res.json({
          success: true,
          message: "User is Created !!!"
        });
      }
    })
  }
}
exports.loginUser = (req, res,) => {
  if (req.body.password == null || req.body.password == '' || req.body.username == null || req.body.username == '') {

    res.json({ success: false, message: "username ,Password is not provided !!!" });
  }
  else {
    User.findOne({ username: req.body.username }).select('_id username password firstName lastName role').exec(function (error, user) {

      if (error) {
        throw error
      }
      console.log(user);
      if (!user) {
        res.status(401).json({
          success: false,
          message: "Could not authenticate User !!"
        });
      }
      else if (user) {
        user.comparePassword(req.body.password, function (error, isMatch) {
          if (error) {
            throw error;
          }
          if (isMatch) {
            const payload =
            {
              _id: user._id,
              username: user.username,
              role: user.role,
              type: user.type,
              firstName: user.firstName,
              lastName: user.lastName
            }
            var token = jwt.sign(payload, config.secret, { expiresIn: '24h' });
            payload.token = token;
            res.json({
              success: true,
              message: "authenticate User !!",
              user: payload
            });

          }
          else {
            res.status(401).json({
              success: false,
              message: "Could not authenticate Password !!"
            });
          }
        })
      }
    })
  }
}
exports.getAllUsers = (req, res) => {
  User.find().select('_id username firstName lastName role')
    .exec((error, users) => {
      if (error) {
        res.status(500).json({
          success: false,
          error: "There was a problem finding the information to the database."
        })
      } else {
        res.status(200).json({
          users: users
        })
      }
    });
}

