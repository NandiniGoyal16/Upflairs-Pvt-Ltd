const express=require('express')
const {products}=require('../data')
const {allProducts,addProduct, deleteProduct, updateProduct, singleProduct}=require('../controllers/productController')

const route=express.Router()

route.get('/',allProducts)

route.post('/',addProduct)
//dynamic routing
route.get('/:id',singleProduct)
route.delete('/:id',deleteProduct)
route.put('/:id',updateProduct)


module.exports=route