const express = require('express');
const authController = require('../controllers/auth');
const ordersController = require('../controllers/orders');

const router = express.Router();

// Views with Middleware
  router.get('/orders', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('orders/orders');
  } else {
      res.redirect('/login');
  };
  
  });

  router.get('/verify', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('orders/verify');
    } else {
        res.redirect('/login');
    };
    
    });

  router.get('/edit', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('orders/edit');
  } else {
      res.redirect('/login');
  };
  
  });

  router.get('/customRegister', authController.isLoggedIn, (req, res) => {
  if(req.user) {
      res.render('orders/customRegister');
  } else {
      res.redirect('/login');
  };
  
  });

  router.get('/register', authController.isLoggedIn, (req, res) => {
      if(req.user) {
          res.render('orders/register');
      } else {
          res.redirect('/login');
      };
  
  });



// order interactions
router.get('/', ordersController.orders );

router.get('/edit/:id', ordersController.edit );

router.get('/delete/:id', ordersController.delete );

router.post('/delete/all', ordersController.deleteAll );

router.get('/deleteEquipment/:equipId&:orderId', ordersController.deleteEquipment );

router.get('/delete/verify/:id', ordersController.deleteVerify );


// form manipulations
router.post('/new', ordersController.new);

router.post('/newAll', ordersController.newAll );

router.post('/customRegister', ordersController.customRegister );

router.post('/register', ordersController.register );

router.post('/update', ordersController.put);

module.exports = router;