const express = require("express")

//controller functions

const{loginUser, signupUser} = require("../controllers/userController")

const router = express.Router()

// Log-in Route
router.post('/login', loginUser)

// Sign-up Route
router.post('/signup', signupUser)

module.exports = router