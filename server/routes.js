const express = require('express');
const app = express();
// Authentication of user
const authentication = require('./authentication/auth');

const userController = require('./controllers/user-controller')
app.get('/', (req, res) => {
  res.send({
    status: 200,
    message: 'App is working fine!'
  });
});


app.post('/signup', (req, res) => {
  userController.createUser(req, res);
});
app.post('/login', (req, res) => {
  userController.loginUser(req, res);
});
app.get('/admin', authentication.authUser, (req, res) => {
  userController.getAllUsers(req, res);
});
app.post('/customer', authentication.authUser, (req, res) => {
  userController.addParkingSlot(req, res);
});
app.post('/moderator', authentication.authUser, (req, res) => {
  userController.bookParking(req, res);
});
module.exports = app;