const express = require('express');
const { signup } = require('/controllers/auth'); // Make sure this path is correct

const router = express.Router();

router.post('/signup', signup);

module.exports = router;
