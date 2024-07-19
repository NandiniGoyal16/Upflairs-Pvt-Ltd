const express=require('express')
const {products}=require('../data')


const route=express.Router()

route.get('/',(req,res)=>{    
    res.json({
        status:'success',
        products:products
    })
})

route.post('/',(req,res)=>{
    //product add logic here
    console.log(req.body)
    products.push(req.body)
    res.json({
        status:'success',
        massage:'product added successfully'
    })
})
//dynamic routing
route.delete('/:id',(req,res)=>{
    //product delete logic here
    res.json({
        status:'success',
        massage:'product deleted successfully'
    })
})
route.put('/:id',(req,res)=>{
    //product update logic here
    res.json({
        status:'success',
        massage:'product updated successfully'
    })
})


module.exports=route