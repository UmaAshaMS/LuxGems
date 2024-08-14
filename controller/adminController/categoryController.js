const categorySchema = require('../../model/categorySchema')


const category = async (req, res) => {
    try {

        const searchQuery = req.query.searchQuery || ''
        const categoryDetails = await categorySchema.find({ name: { $regex: searchQuery, $options: 'i' } })
        if (categoryDetails.length === 0) {
            console.log('No category found')
        }
        res.render('admin/Category', { title: 'Category', categoryDetails,searchQuery })

    }
    catch (err) {
        console.log(`Error in rendering Category page ${err}`)
    }
}



const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const existingCategory = await categorySchema.findOne({ name: categoryName });


        if (existingCategory) {
            // If the category exists, return an error response or handle it as needed
            req.flash('error', 'Category name already exists');
            return res.redirect('/admin/category');
        }
        // Save the new category to the database
        const newCategory = new categorySchema({
            name: categoryName
        });
        await newCategory.save();

        // Redirect back to the category page or send a success response
        res.redirect('/admin/category');
    } catch (err) {
        console.log(`Error in adding category: ${err}`);
        req.flash('error', 'Server Error');
        res.redirect('/admin/category');
    }
    
};

// Edit category
const editCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const category = await categorySchema.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Check if the new name already exists
        const existingCategory = await categorySchema.findOne({ name: name });
        if (existingCategory && existingCategory._id.toString() !== category._id.toString()) {
            req.flash('error', 'Category name already exists');
            return res.redirect('/admin/category');
        }

        category.name = name;
        await category.save();

        req.flash('success', 'Category added successfully');
        res.redirect('/admin/category');
    } catch (err) {
        console.error(`Error in editing category: ${err}`);
        req.flash('error', 'Server Error');
        res.redirect('/admin/category');
    }
};






module.exports = {
    category,
    addCategory,
    editCategory,
}