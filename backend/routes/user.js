const express = require('express')
const {loginUser,signupUser} = require('../controllers/userController.js')

const router = express.Router();

// login a user
router.post('/login', loginUser);

// signup a new user
router.post('/signup', signupUser);


module.exports = router;