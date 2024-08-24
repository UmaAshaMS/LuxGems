const express = require('express')
const userSchema = require('../model/userSchema')
const user = express.Router()
const { checkUserSession, checkUserSessionBlocked, checkUserLogin } = require('../middleware/userSession')


const userLoginControl = require('../controller/userController/loginController')
const userHomeControl = require('../controller/userController/homeController')
const userProductControl = require('../controller/userController/productController')

//user Login
user.get('/user/login', checkUserLogin,userLoginControl.login)
user.post('/user/login', checkUserLogin,userLoginControl.loginPost)
user.get('/user/Sign-Up', checkUserLogin,userLoginControl.SignUp)
user.post('/user/Sign-Up', checkUserLogin,userLoginControl.SignUpPost)

//
user.get('/user/OTPpage', userLoginControl.otpPage)
user.get('/user/otp-verify',userLoginControl.otpVerify)
user.post('/user/otp-verify', userLoginControl.otpVerify);

user.get('/user/Forgot-Password', userLoginControl.ForgotPassword)
user.post('/user/Forgot-Password',userLoginControl.ForgotPasswordpost)

user.get('/user/home', userHomeControl.home)

user.get('/user/AllProducts', userProductControl.AllproductsRender)






module.exports = user
