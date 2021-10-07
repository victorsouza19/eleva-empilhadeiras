const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


// Setting the pages routes || Definindo as rotas das páginas

router.get('/', authController.isLoggedInIndex, (req, res) => {
    
    if(req.user) {
            if(req.order){
                res.render('index', {
                    order: req.order,
                    user: req.user,
                    date: dia+", "+data.getDate()+" de "+mes
                });
            } else {
                res.render('index', {
                    user: req.user,
                    date: dia+", "+data.getDate()+" de "+mes
                });
            };
    } else {
        res.redirect('/login');
    }
    
});

router.get('/success', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('successMessage');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/graphs', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('graphs');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;