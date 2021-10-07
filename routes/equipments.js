const express = require('express');
const equipmentsController = require('../controllers/equipments');
const router = express.Router();

const authController = require('../controllers/auth');

router.get('/register', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('equipments/register');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/', authController.isLoggedIn, equipmentsController.equipments, (req, res) => {
    if(req.user) {
        res.render('equipments/equipments');
    } else {
        res.redirect('/login');
    };
});

router.get('/edit/:id', authController.isLoggedIn, equipmentsController.edit );

router.post('/new', authController.isLoggedIn, equipmentsController.new );

router.post('/update', authController.isLoggedIn, equipmentsController.put );

router.get('/delete/:id', authController.isLoggedIn, equipmentsController.delete );

module.exports = router;