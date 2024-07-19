let express=require('express')
const app=express()
const userRoutes=require('./routes/userRoutes.js')
const productRoutes=require('./routes/productRoutes.js')


app.use(express.json())

app.use(express.urlencoded({extended:false}))

app.use('/user',userRoutes)

app.use('/product',productRoutes)


app.listen(3000,'localhost',()=>{
    console.log('server is running on port 3000')
})