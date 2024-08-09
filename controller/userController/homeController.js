const userSchema = require('../../model/userSchema')


const home = (req, res) => {
    res.render('user/home', { title: 'Home Page' })
}





module.exports = {
    home,
}