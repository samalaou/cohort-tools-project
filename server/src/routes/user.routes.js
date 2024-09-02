const express = require("express");
const { getUser } = require("../controllers/user.controller");
const { isAuthenticated } = require("./../middleware/jwt.middleware.js");

const router = express.Router();

router.get("/:userId", isAuthenticated, getUser);

module.exports = router;
