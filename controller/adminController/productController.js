const productSchema = require('../../model/productSchema')
const categorySchema = require('../../model/categorySchema')
const upload = require('../../middleware/multer')
const fs = require('fs');



// product page rendering
const getproduct = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''
        const productDetails = await productSchema.find({ productName: { $regex: searchQuery, $options: 'i' } })
        if (productDetails.length === 0) {
            console.log('No product found')
        }
        res.render('admin/Products', { title: 'Products', searchQuery, products: productDetails })
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

        res.render('admin/addProduct', { title: 'Add products', searchQuery, category })
    }
    catch (err) {
        console.log(`Error in rendering addProducts page ${err}`)
    }
}


//add product form submission
const addProductPost = async (req, res) => {
    console.log('post called')
    console.log('Image details', req.files); // Check if files are being processed
    console.log('Request body', req.body)


    try {
        // Handle image uploads (assuming req.files.productImage is an array of images)
        let productImages = [];
        // if (req.files && req.files.productImage) {
        //     productImages = req.files.productImage.map(file => file.filename); // Assuming you store filenames in the database
        //     console.log('Uploaded images:', productImages);
        // }
        req.files.forEach((img) => {
            productImages.push(img.path)
        })

        // Extract form data from the request body

        const { productName, productCategory, productPrice, stock, productDescription, productDiscount } = req.body
        // const productImages = req.files;

        // Check if a product with the same name and collection already exists
        const existingProduct = await productSchema.findOne({
            productName,
            productCategory
        });

        if (existingProduct) {
            // If product exists, send an error response or flash a message
            console.log(res.locals.error, res.locals.success)
            req.flash('error', 'A product with this name already exists in the selected collection.');
            console.log('Product exists')
            return res.redirect('/admin/addProduct');
        }

        // Create a product instance
        const productDetails = new productSchema({
            productName,
            productCategory,
            productPrice,
            stock,
            productDescription,
            productDiscount,
            productImage: productImages,
            isActive: true // Assuming the product is active when first created
        });

        await productDetails.save();
        console.log("Product Added")
        req.flash('success', 'Product added successfully')

        console.log('new product saved in db')
        // Redirect to the product list page
        res.redirect('/admin/Products');
    }
    catch (err) {
        console.error(`Error in saving product: ${err}`)
    }
}

const blockProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(404).json({ message: "Product not found" })
        }
        // Find product by productId
        const product = await productSchema.findById(productId)
        if (!product) {
            return res.send(404).json({ message: "Product does not exists." })
        }

        //Mark the product as blocked
        product.isActive = false
        await product.save();
        res.status(200).json({ message: "Product marked as blocked" });

    }
    catch (err) {
        console.error(`Error in blocking product, ${err}`)
    }
}

const unblockProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.status(404).json({ messsage: 'Product not found' })
        }
        //Find product by productId
        const product = await productSchema.findById(productId)
        if (!product) {
            return res.send(404).json({ message: "Product does not exists." })
        }
        //Mark the product as unblock
        product.isActive = true
        await product.save();
        res.status(200).json({ message: "Product marked as Unblocked" });

    }
    catch (err) {
        console.log(`Error in unblocking prouct ${err}`)
    }
}

const deleteProduct = async (req, res) => {
    console.log('Req for delete')
    try {
        const productId = req.params.id;
        if (!productId) {
            return res.send.status(404).json({ message: 'Product not found' })
        }
        //find product by productId
        const product = await productSchema.findByIdAndDelete(productId)
        if (!product) {
            res.send(404).json({ message: 'Product does not exists.' })
        }
        //respond as roduct deleted
        return res.status(200).json({ message: 'Product deleted.' })
    }
    catch (err) {
        console.log(`Error : ${err}`)
    }
}

const editProduct = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''
        const category = await categorySchema.find({ isBlocked: false })
        const productId = req.params.id
        const product = await productSchema.findById(productId)

        if (!product) {
            return res.status(404).render('admin/Products', { message: 'Product not found' });
        }
        res.render('admin/editProduct', { title: 'Edit Product', category, searchQuery, product })

    }
    catch (err) {
        console.error(`Error in rendering edit Product page, ${err} `)
    }
}

const editProductSubmit = async (req, res) => {
    console.log('Edit product form submitted');
    try {
        console.log('Request body:', req.body);
        // Initialize an array to hold the image filenames
        let productImages = [];
        if (req.files && req.files.productImage) {
            // Map through uploaded files and get their filenames
            productImages = req.files.productImage.map(file => file.filename);
          
        }
        console.log(productImages);
        // Extract form data from the request body
        const { productName, productCategory, productPrice, stock, productDescription, productDiscount } = req.body;
        const productId = req.params.id;

        // Find the product by its ID
        const product = await productSchema.findById(productId);
        if (!product) {
            // If the product doesn't exist, handle the error
            req.flash('error', 'Product not found.');
            console.log('Product not found');
            return res.redirect('/admin/Products');
        }

        // Check if there's another product with the same name and category (excluding this product)

        // Prepare the update data
        const updateData = {
            productName: productName,
            productCategory: productCategory,
            productPrice: productPrice, 
            stock: stock,
            productDescription: productDescription,
            productDiscount: productDiscount,
            productImage: productImages // Update images only if new images are uploaded
        };
      
        // Update the product in the database
      const updatedProduct=  await productSchema.findByIdAndUpdate(productId, updateData,{ new: true } ); 

        if (!updatedProduct) {
            throw new Error('Failed to update the product.');
        }
        console.log('Updated product:', updatedProduct);
        req.flash('success', 'Product updated successfully.');
        res.redirect('/admin/Products');
    } catch (err) {
        // Handle errors and provide feedback to the user
        console.log(`Error in submitting edit product form: ${err}: ${err.stack}`);
        req.flash('error', 'An error occurred while updating the product.');
        res.redirect(`/admin/editProduct/${req.params.id}`);
    }
};


module.exports = {
    getproduct,
    addProduct,
    addProductPost,
    editProduct,
    editProductSubmit,
    blockProduct,
    unblockProduct,
    deleteProduct,
}