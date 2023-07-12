const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/mypage-list.html'));
});

// edit, order추가
router.get('/edit', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/mypage-edit.html'));
});

// router.get('/order', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/mypage-order.html'));
// });

module.exports = router;