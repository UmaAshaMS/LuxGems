const express = require('express')
const admin = express.Router()

const adminLoginControl = require('../controller/adminController/loginController')
const adminUsercontrol = require('../controller/adminController/userController')
const adminCategoryControl = require('../controller/adminController/categoryController')
const adminProductController = require('../controller/adminController/productController')


admin.get('/adminLogin', adminLoginControl.adminLogin)

admin.post('/adminLogin', adminLoginControl.adminLoginPost)

admin.get('/home', adminLoginControl.home)

admin.get('/Customers', adminUsercontrol.userDashboard)

admin.get('/Category', adminCategoryControl.category)

admin.get('/Products', adminProductController.product)


module.exports = admin