const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


// Setting the pages routes || Definindo as rotas das páginas

router.get('/', authController.isLoggedInIndex, (req, res) => {
    
    if(req.user) {
        res.render('index', {
            
            user: req.user,
            date: dia+", "+data.getDate()+" de "+mes
        });
    } else {
        res.redirect('/login');
    }
    
});

router.get('/view/orders', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('viewOrders');
    } else {
        res.redirect('/login');
    };
    
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

router.get('/equipmentRegister', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('equipmentRegister');
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

router.get('/osCustomerRegister', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('osCustomerRegister');
    } else {
        res.redirect('/login');
    };
    
});

router.get('/osRegister', authController.isLoggedIn, (req, res) => {
        if(req.user) {
            res.render('osRegister');
        } else {
            res.redirect('/login');
        };
    
});


router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;