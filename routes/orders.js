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
router.get('/', authController.isLoggedIn, ordersController.orders );

router.get('/edit/:id', authController.isLoggedIn, ordersController.edit );

router.get('/delete/:id', authController.isLoggedIn, authController.isLoggedIn, ordersController.delete );

router.post('/delete/all', ordersController.deleteAll ); //

router.get('/deleteEquipment/:equipId&:orderId', authController.isLoggedIn, ordersController.deleteEquipment );

router.get('/delete/verify/:id', authController.isLoggedIn, ordersController.deleteVerify );


// form manipulations
router.post('/new', ordersController.new);

router.post('/newAll', ordersController.newAll );

router.post('/customRegister', ordersController.customRegister );

router.post('/register', ordersController.register );

router.post('/update', ordersController.put);

module.exports = router;