const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    res.sendFile('static/home.html', {root: '.'});
});

module.exports = router;