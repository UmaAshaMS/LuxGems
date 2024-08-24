const userSchema = require('../../model/userSchema')
const productSchema = require('../../model/productSchema')
const categorySchema = require('../../model/categorySchema')

const AllproductsRender  = async(req,res) => {
    const category = await categorySchema.find();
    const product = await productSchema.find();

    try{
        res.render('user/AllProducts',{title:'Products', category, product})
    }
    catch(err){
        console.error('Error:' , err)
    }
} 


module.exports ={
    AllproductsRender
}