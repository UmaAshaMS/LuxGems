const express = require('express')
const userSchema = require('../model/userSchema')
const user = express.Router()

const userLoginControl = require('../controller/userController/loginController')
const userHomeControl = require('../controller/userController/homeController')


user.get('/user/login', userLoginControl.login)
user.post('/user/login', userLoginControl.loginPost)
user.get('/user/Sign-Up', userLoginControl.SignUp)
user.post('/user/Sign-Up', userLoginControl.SignUpPost)
user.get('/user/OTP', userLoginControl.otpPage)
user.get('/user/Forgot-Password', userLoginControl.ForgotPassword)

user.get('/user/home', userHomeControl.home)






module.exports = user
