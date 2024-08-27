const express = require('express')
const userSchema = require('../model/userSchema')
const user = express.Router()
const { checkUserSession, checkUserSessionBlocked, checkUserLogin } = require('../middleware/userSession')


const userLoginControl = require('../controller/userController/loginController')
const userHomeControl = require('../controller/userController/homeController')
const userProductControl = require('../controller/userController/productController')
const forgotPassword = require('../controller/userController/forgotPassword')

//user Login
user.get('/user/login', checkUserLogin,userLoginControl.login)
user.post('/user/login', checkUserLogin,userLoginControl.loginPost)
user.get('/user/Sign-Up', checkUserLogin,userLoginControl.SignUp)
user.post('/user/Sign-Up', checkUserLogin,userLoginControl.SignUpPost)
user.get('/user/OTPpage', userLoginControl.otpPage)
user.post('/user/OTPpage', userLoginControl.otpPagePost)
//resend otp in sign-up
user.post('/user/resendOTPsignUp', userLoginControl.resendOTPSignUp)

//Forgot Password
user.get('/user/Forgot-Password', forgotPassword.ForgotPassword)
user.post('/user/Forgot-Password',forgotPassword.ForgotPasswordpost)
user.get('/user/ForgotPasswordOtp', forgotPassword.ForgotPasswordOtp)
user.post('/user/ForgotPasswordOtp', forgotPassword.ForgotPasswordOtpPost)
user.get('/user/resetPassword', forgotPassword.resetPassword)
user.post('/user/resetPassword', forgotPassword.resetPasswordPost)
//resend otp in forgot password
user.post('/user/resendOTPforgotPassword', forgotPassword.resendOTPforgotPassword)


user.get('/user/home', userHomeControl.home)

//All Products 
user.get('/user/AllProducts', userProductControl.AllproductsRender)



//logout
user.post('/user/logout', userLoginControl.logout)





module.exports = user
