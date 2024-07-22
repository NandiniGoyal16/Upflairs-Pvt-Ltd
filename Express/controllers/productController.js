const Product =  require('../models/productModel')

exports.allProducts=(req,res)=>{    
    res.json({
        status:'success',
        products:products
    })}

   exports.addProducts =(req,res)=>{
        //product add logic here
        console.log(req.body)
        products.push(req.body)
        res.json({
            status:'success',
            massage:'product added successfully'
        })}

   exports.deleteProduct =      (req,res)=>{
            //product delete logic here
            res.json({
                status:'success',
                massage:'product deleted successfully'
            })}

       exports.updateProducts =      (req,res)=>{
                //product update logic here
                res.json({
                    status:'success',
                    massage:'product updated successfully'
                })}