const express = require('express');

const router = express.Router();



router.get('/', (req, res) => {
    res.render('index');
});


router.get('/create-user', (req, res) => {
    res.render('create-user');
});


router.get('/login', (req, res) => {
    res.render('login');
});

module.exports = router;