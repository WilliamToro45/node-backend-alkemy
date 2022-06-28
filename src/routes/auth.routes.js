const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');


router.get('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;