const express = require('express')
const admin = express.Router()

const adminLoginControl = require('../controller/adminController/loginController')
const adminUsercontrol = require('../controller/adminController/userController')
const adminCategoryControl = require('../controller/adminController/categoryController')
const adminProductController = require('../controller/adminController/productController')

//Admin Login
admin.get('/adminLogin', adminLoginControl.adminLogin)
admin.post('/adminLogin', adminLoginControl.adminLoginPost)
admin.get('/home', adminLoginControl.home)

//User Management
admin.get('/Customers', adminUsercontrol.userDashboard)
admin.put('/blockUser/:userId', adminUsercontrol.userBlock)
admin.put('/unblockUser/:userId',adminUsercontrol.userUnblock)


//Category Management
admin.get('/Category', adminCategoryControl.category)
admin.get('/Category/:id', adminCategoryControl.getCategoryDetails);
admin.post('/addCategory', adminCategoryControl.addCategory)
admin.put('/editCategory/:id', adminCategoryControl.editCategory)
admin.put('/blockCategory/:id',adminCategoryControl.blockCategory)
admin.put('/unblockCategory/:id',adminCategoryControl.unblockCategory)
admin.delete('/deleteCategory/:id',adminCategoryControl.deleteCategory)


//Product Management
admin.get('/Products', adminProductController.product)


module.exports = admin