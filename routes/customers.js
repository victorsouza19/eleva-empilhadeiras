const express = require('express');
const customersController = require('../controllers/customers');
const authController = require('../controllers/auth');

const router = express.Router();

// Page routes || Rotas para páginas
  router.get('/verify', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('customers/verify');
  } else {
      res.redirect('/login');
  };
  
  });

  router.get('/register', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('customers/register');
  } else {
      res.redirect('/login');
  };
  
  });


// CRUD routes || Rotas para CRUD
  router.post('/new', customersController.new );


// Verify routes || Rotas de verificação
  router.post('/verify', customersController.verify );


module.exports = router;