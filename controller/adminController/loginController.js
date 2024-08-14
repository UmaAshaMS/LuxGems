const dotenv = require('dotenv').config()



const adminLogin = (req, res) => {
    try {
        if (req.session.admin) {
            res.redirect('/admin/home')
        }
        else {
            res.render('admin/adminLogin', { title: 'Admin Login' })

        }
    }
    catch (err) {
        console.log(`Error in rendering admin login page ${err}`)
    }
}

const adminLoginPost = async (req, res) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



    try {
        if (req.body.email === process.env.EMAIL && req.body.password === process.env.PASSWORD) {
            req.session.admin === req.body.email
            if (emailRegex.test(req.body.email)) {
                res.redirect('/admin/home');
            }
        }
        else {
            res.redirect('/admin/adminLogin')
        }
    }
    catch (err) {
        console.log(`Error in admin login ${err}`)
    }

}

const home = (req, res) => {
    try {
        res.render('admin/home', { title: 'Home' })
    }
    catch (err) {
        console.log(`Error in rendering admin home page ${err}`)
    }
}

module.exports = {
    adminLogin,
    adminLoginPost,
    home,
}