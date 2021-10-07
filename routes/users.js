const express = require('express');
const authController = require('../controllers/auth');  
const usersController = require('../controllers/users');  

const router = express.Router();

// views
  router.get('/register', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('users/register');
  } else {
      res.redirect('/login');
  };
  
  });

// register routes || rotas de registro
  router.post('/new', usersController.new );

module.exports = router;


    
 