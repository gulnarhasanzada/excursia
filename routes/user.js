const express = require("express");
const router = express.Router();
const userController = require('../controllers/user');
const validator = require('../util/validator');

// POST /users/signup signup user
router.post('/signup', validator.validateSignup, userController.signup)

// POST /users/login login user
router.post('/login', userController.login)

// GET /users/{id} get user info
router.get("/user/{id}", userController.getUser);

module.exports = router;

