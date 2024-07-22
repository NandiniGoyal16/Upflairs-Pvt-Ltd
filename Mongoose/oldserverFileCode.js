let express=require('express')
const {products}=require('./data.js')
const morgan=require('morgan')
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))



app.get('/user',(req,res)=>{

})
app.post('user/signup',(req,res)=>{

})
app.post('/user/login',(req,res)=>{
    
})
app.delete('/user/:id',(req,res)=>{
    
})
app.put('/user/:id',(req,res)=>{
    
})



app.get('/product',(req,res)=>{    
    res.json({
        status:'success',
        products:products
    })
})

app.post('/product',(req,res)=>{
   
    console.log(req.body)
    products.push(req.body)
    res.json({
        status:'success',
        massage:'product added successfully'
    })
})

app.delete('/product/:id',(req,res)=>{
    
    res.json({
        status:'success',
        massage:'product deleted successfully'
    })
})
app.put('/product/:id',(req,res)=>{
    
    res.json({
        status:'success',
        massage:'product updated successfully'
    })
})




app.listen(3000,'localhost',()=>{
    console.log('server is running on port 3000')
})