const userSchema = require('../model/userSchema')


// function to check the user sesesion only for login and register
async function checkUserLogin(req, res, next) {
    try {
        if (req.session.user) {
            res.redirect('/home')
        } else {
            next()
        }
    } catch (error) {
        console.log(error);

    }
}


module.exports = {
    checkUserLogin,
}