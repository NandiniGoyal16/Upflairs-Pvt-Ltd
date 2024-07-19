const express=require('express')
const route=express.Router()


route.get('/',(req,res)=>{
 res.send('xyz')
})
route.post('/signup',(req,res)=>{

})
route.post('/login',(req,res)=>{
    
})
route.delete('/:id',(req,res)=>{
    
})
route.put('/:id',(req,res)=>{
    
})

module.exports=route