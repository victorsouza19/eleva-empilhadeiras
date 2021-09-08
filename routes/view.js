const express = require('express');
const viewController = require('../controllers/view');

const router = express.Router();

router.get('/viewOrders', viewController.viewOrders );

router.get('/orderEdit/:id', viewController.orderEdit );

router.get('/orderDelete/:id', viewController.orderDelete );

module.exports = router;
