const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/userRegister', authController.register );

router.post('/customerRegister', authController.customerRegister );

router.post('/customerVerify', authController.customerVerify );

router.post('/osRegisterOnly', authController.osRegisterOnly );

router.post('/osRegister', authController.osRegister);

router.post('/osCustomerRegister', authController.osCustomerRegister );

router.post('/login', authController.login );

router.get('/logout', authController.logout );



module.exports = router;