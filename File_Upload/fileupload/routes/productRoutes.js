const express=require('express')
const {products}=require('../data')
const {allProducts,addProduct, deleteProduct, updateProduct, singleProduct}=require('../controllers/productController')
const multer=require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      let date=Date.now()
      cb(null,date+file.originalname)
    } 
  })
  
  const image = multer({ storage: storage })


const route=express.Router()
route.get('/',allProducts)

route.post('/',image.single('image'),addProduct)

route.get('/:id',singleProduct)
route.delete('/:id',deleteProduct)
route.put('/:id',updateProduct)


module.exports=route