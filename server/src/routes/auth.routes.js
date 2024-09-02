const express = require("express");
const { signup, login, verify } = require("../controllers/auth.controller");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', isAuthenticated, verify);

module.exports = router;
