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

  router.get('/customers/edit', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('customers/edit');
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

  router.get('/', authController.isLoggedIn, customersController.customers);


// CRUD routes || Rotas para CRUD
  router.post('/new', customersController.new );

  router.get('/edit/:id', authController.isLoggedIn, customersController.edit );

  router.post('/update', customersController.put );

  router.get('/delete/:id', authController.isLoggedIn, customersController.delete );


// Verify routes || Rotas de verificação
  router.post('/verify', authController.isLoggedIn, customersController.verify );


module.exports = router;