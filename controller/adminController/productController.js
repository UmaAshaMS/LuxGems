const productSchema = require('../../model/productSchema')
const categorySchema = require('../../model/categorySchema')
const upload = require('../../middleware/multer')
const fs = require('fs');



// product page rendering
const product = async (req, res) => {


    try {

        const searchQuery = req.query.searchQuery || ''
        const productDetails = await productSchema.find({ name: { $regex: searchQuery, $options: 'i' } })
        // if (productDetails.length === 0) {
        //     console.log('No product found')
        // }

        res.render('admin/Products', { title: 'Products', searchQuery, products: productDetails   })



    }
    catch (err) {
        console.log(`Error in rendering Product page ${err}`)
    }
}

//add product page rendering
const addProduct = async (req, res) => {
    // console.log("Add product form")
    try {
        const searchQuery = req.query.searchQuery || ''
        const category = await categorySchema.find({ isBlocked: false })

        res.render('admin/addProduct', { title: 'Add products', searchQuery, category  })
    }
    catch (err) {
        console.log(`Error in rendering addProducts page ${err}`)
    }
}


//add product form submission
const addProductPost = async (req, res) => {
    console.log('post called')
    console.log(req.files); // Check if files are being processed
    console.log(req.body)


    try{
    // Extract form data from the request body
    const { productName, productQuantity, productPrice, productDescription, productDiscount, productCollection } = req.body;


    // Check if a product with the same name and collection already exists
    const existingProduct = await productSchema.findOne({
        productName,
        productCollection
    });

    if (existingProduct) {
        // If product exists, send an error response or flash a message
        req.flash('error', 'A product with this name already exists in the selected collection.');
        console.log('Product exists')
        return res.redirect('/admin/addProduct');
    }
    // Handle image uploads (assuming req.files.productImage is an array of images)
    let productImages = [];
    if (req.files && req.files.productImage) {
        productImages = req.files.productImage.map(file => file.filename); // Assuming you store filenames in the database
        console.log('Uploaded images:', productImages);

    }
    // Create a new product instance
    const newProduct = new productSchema({
        productName,
        productQuantity,
        productPrice,
        productDescription,
        productDiscount,
        productCollection,
        productImage: productImages,
        isActive: true // Assuming the product is active when first created
    });

    await newProduct.save();
    console.log('new product saved in db')
     // Redirect to the product list page
     res.redirect('/admin/Products');
}
catch(err){
    console.error(`Error in saving product: ${err}`)
}
    

}

module.exports = {
    product,
    addProduct,
    addProductPost,
}