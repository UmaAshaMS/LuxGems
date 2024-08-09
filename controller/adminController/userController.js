const userSchema = require('../../model/userSchema')


const userDashboard = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''
        userDetails = await userSchema.find({ name: { $regex: searchQuery, $options: 'i' } })
        res.render('admin/customers', { title: 'Customers', userDetails, searchQuery });

    }
    catch (err) {
        console.log(`Error in rendering User page ${err}`)
    }
}










module.exports = {

    userDashboard,
}