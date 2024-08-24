const userSchema = require('../../model/userSchema')
const categorySchema = require('../../model/categorySchema')


const home = async(req, res) => {
    const category = await categorySchema.find();

    res.render('user/home', { title: 'Home Page' , category})
}

module.exports = {
    home,
    
}