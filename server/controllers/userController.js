const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// Log-in User
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.login(email, password)

        //Create JWT WebToken
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// Sign-up User
const signupUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await User.signup(email, password)

        //Create JWT WebToken
        const token = createToken(user._id)

        res.status(200).json({email, token})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {loginUser, signupUser}