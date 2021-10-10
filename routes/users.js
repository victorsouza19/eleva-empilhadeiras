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

  router.get('/', authController.isLoggedIn, usersController.users, (req, res) => {
    if(req.user) {
        res.render('users/users');
    } else {
        res.redirect('/login');
    };
    
  });

  router.get('/edit', authController.isLoggedIn, (req, res) => {
      if(req.user) {
          res.render('users/edit');
      } else {
          res.redirect('/login');
      };
      
  });

// register routes || CRUD rotas
  router.post('/new', usersController.new );

  router.get('/edit/:id', usersController.edit );

  router.post('/update', usersController.put );

  router.get('/delete/:id', usersController.delete );

module.exports = router;


    
 