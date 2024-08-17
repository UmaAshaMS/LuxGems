const productSchema = require('../../model/productSchema')

const product = async(req, res) => {
    

    try {

        const searchQuery = req.query.searchQuery || ''
        // const productDetails = await productSchema.find({ name: { $regex: searchQuery, $options: 'i' } })
        // if (productDetailsDetails.length === 0) {
        //     console.log('No product found')
        // }
        res.render('admin/Products', { title: 'Products', searchQuery })

    }
    catch (err) {
        console.log(`Error in rendering Product page ${err}`)
    }
}

module.exports = {
    product
}