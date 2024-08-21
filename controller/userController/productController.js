const userSchema = require('../../model/userSchema')
const productSchema = require('../../model/productSchema')

const productViewRender  = async(req,res) => {
    try{
        res.render('user/productView',{title:'Products'})
    }
    catch(err){
        console.error('Error:' , err)
    }
} 


module.exports ={
    productViewRender
}