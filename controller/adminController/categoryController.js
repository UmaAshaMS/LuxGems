const categorySchema = require('../../model/categorySchema')


const category = async(req, res) => {
    try{
        const categoryDetails = await categorySchema.find()
        if(categoryDetails.length === 0 ){
            console.log('No category found')
        }
        else{
            res.render('admin/Category',{title:'Category'})
        }
    }
    catch(err){
        console.log(`Error in rendering Category page ${err}`)
    }
    res.render('admin/Category', { title: 'Category' })
}



module.exports = {
    category
}