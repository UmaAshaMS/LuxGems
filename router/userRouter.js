const express = require('express')
const userSchema = require('../model/userSchema')
const user = express.Router()

const userLoginControl = require('../controller/userController/loginController')
const userHomeControl = require('../controller/userController/homeController')


user.get('/login', userLoginControl.login)

user.post('/login', userLoginControl.loginPost)

user.get('/Sign-Up', userLoginControl.SignUp)

user.post('/Sign-Up', userLoginControl.SignUpPost)

user.get('/OTP', userLoginControl.otpPage)

user.get('/Forgot-Password', userLoginControl.ForgotPassword)

user.get('/home', userHomeControl.home)




module.exports = user
