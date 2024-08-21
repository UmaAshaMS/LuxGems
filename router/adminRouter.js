const express = require('express')
const admin = express.Router()
const checkAdminLogin = require('../middleware/adminSession')
const upload = require('../middleware/multer')


const adminLoginControl = require('../controller/adminController/loginController')
const adminUsercontrol = require('../controller/adminController/userController')
const adminCategoryControl = require('../controller/adminController/categoryController')
const adminProductController = require('../controller/adminController/productController')

//Admin Login
admin.get('/adminLogin', adminLoginControl.adminLogin)
admin.post('/adminLogin', adminLoginControl.adminLoginPost)
admin.get('/home',checkAdminLogin,adminLoginControl.home)


//User Management
admin.get('/Customers', checkAdminLogin,adminUsercontrol.userDashboard)
admin.put('/blockUser/:userId',checkAdminLogin, adminUsercontrol.userBlock)
admin.put('/unblockUser/:userId',checkAdminLogin,adminUsercontrol.userUnblock)


//Category Management
admin.get('/Category',checkAdminLogin, adminCategoryControl.category)
admin.get('/Category/:id',checkAdminLogin, adminCategoryControl.getCategoryDetails);
admin.post('/addCategory',checkAdminLogin, adminCategoryControl.addCategory)
admin.put('/editCategory/:id',checkAdminLogin, adminCategoryControl.editCategory)
admin.put('/blockCategory/:id',checkAdminLogin,adminCategoryControl.blockCategory)
admin.put('/unblockCategory/:id',checkAdminLogin,adminCategoryControl.unblockCategory)
admin.delete('/deleteCategory/:id',checkAdminLogin,adminCategoryControl.deleteCategory)


//Product Management
admin.get('/Products',checkAdminLogin, adminProductController.product)
admin.get('/addProduct',checkAdminLogin, adminProductController.addProduct)
admin.post('/addProduct', upload, adminProductController.addProductPost)


//Admin Logout
admin.post('/logout', adminLoginControl.logout)



module.exports = admin