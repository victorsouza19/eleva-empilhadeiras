const express = require('express');
const authController = require('../controllers/auth');

const router = express.Router();


// Setting the pages routes || Definindo as rotas das páginas

router.get('/', authController.isLoggedInIndex, (req, res) => {
    
    if(req.user) {
      res.render('index', {
        open, progress, closed,
        user: req.user,
        date: dia+", "+data.getDate()+" de "+mes
      });
    
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

router.get('/reports', authController.isLoggedIn, (req, res) => {
    if(req.user) {
        res.render('reports');
    } else {
        res.redirect('/login');
    };
});

router.get('/login', (req, res) => {
    res.render('login');
});



module.exports = router;