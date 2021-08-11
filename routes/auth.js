const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();



router.post('/create-os', authController.register )



module.exports = router;