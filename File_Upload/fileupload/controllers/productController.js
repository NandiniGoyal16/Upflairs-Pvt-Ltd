
const {Product}=require('../models/productModel')

exports.allProducts=async (req,res)=>{
    try {
        let products=await Product.find({})
        res.json({
            status:'success',
            products:products
        })
    } catch (error) {
        res.json({
            status:'failed',
            massage:error.massage
        })
    }       
}

exports.addProduct=async (req,res)=>{
    // console.log(req.body)
    let {name,price,description,category}=req.body
    // console.log(req.file)
    // res.json('Data is Recieved')

    try {
        let product=new Product()
        product.name=name
        product.price=price
        product.description=description
        product.image=req.file.filename
        product.category=category
        await product.save()
        res.json({
            status:'success',
            massage:'product added successfully'
        })
    } catch (error) {
        console.log(error)
        res.json({
            status:'failed',
            massage:error.massage
        })
    }
   
}
exports.singleProduct=async (req,res,next)=>{
    let {id}=req.params
    try {
       
        let product=await Product.findById(id)
        res.json({
            status:'success',
            product:product
        })
    } catch (error) {
        res.json({
            status:'failed',
            massage:error.massage
        })
    }
}


exports.deleteProduct=async (req,res)=>{
  
    let {id}=req.params
    try {
        
        await Product.findByIdAndDelete(id)
        res.json({
            status:'success',
            massage:'product deleted successfully'
        })
    } catch (error) {
        res.json({
            status:'failed',
            massage:error.massage
        })
    }
   
}


exports.updateProduct=async (req,res)=>{

    let {name,price,description,image,category}=req.body

    let {id}=req.params
    try {
        let product=await Product.findById(id)
        if(product){
            await Product.findByIdAndUpdate(id,{name,price,description,image,category})
            res.json({
                status:'success',
                massage:'product updated successfully'
            })
        }
    } catch (error) {
        res.json({
            status:'failed',
            massage:error.massage
        })
    }
  
}
