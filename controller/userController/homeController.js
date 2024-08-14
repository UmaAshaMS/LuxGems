const userSchema = require('../../model/userSchema')


const home = (req, res) => {
    res.render('user/home', { title: 'Home Page' })
}

const pageNotFound = (req,res) => {
    res.render('user/404', {title:'404'})
} 





module.exports = {
    home,
    pageNotFound,
}