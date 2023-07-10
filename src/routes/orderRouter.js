const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/edit', (req, res) => {
    res.redirect('/');
});

router.get('/edit/:orderId', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/order-edit.html'));
});

module.exports = router;