const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
});

router.get('/complete', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register-complete.html'));
});


module.exports = router;