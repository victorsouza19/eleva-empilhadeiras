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

  router.get('/', authController.isLoggedIn, usersController.users);

// register routes || CRUD rotas
  router.post('/new', usersController.new );

  router.get('/edit/:id', authController.isLoggedIn, usersController.edit );

  router.post('/update', usersController.put );

  router.get('/delete/:id', authController.isLoggedIn, usersController.delete );

module.exports = router;


    
 