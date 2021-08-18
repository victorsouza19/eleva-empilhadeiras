const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();



router.get('/', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('index', {
            user: req.user,
            date: data.toLocaleDateString("pt-BR")
        });
    } else {
        res.redirect('/login');
    }
    
});


router.get('/userRegister', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('userRegister');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/customerVerify', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('customerVerify');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/customerRegister', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('customerRegister');
    } else {
        res.redirect('/login');
    };
    
});


router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;