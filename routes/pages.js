const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();



router.get('/', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('index', {
            user: req.user,
            date: new Date(Date.now())
        });
    } else {
        res.redirect('/login');
    }
    
});


router.get('/create-user', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('create-user');
    } else {
        res.redirect('/login');
    };
    
});


router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;