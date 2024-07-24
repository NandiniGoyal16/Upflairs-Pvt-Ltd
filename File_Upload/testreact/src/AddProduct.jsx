import axios from 'axios'
import React, { useState } from 'react'

function AddProduct() {
    const [product,setProduct]=useState({
        name:'',price:'',description:'',category:''
    })
    const [image,setImage]=useState(null)
    let handleChange=(e)=>{
        setProduct({...product,[e.target.name]:e.target.value})
    }
    let handleSubmit= async (e)=>{
        e.preventDefault()
        // console.log(product,image)
        
        let formdata=new FormData()
        formdata.append('name',product.name)
        formdata.append('price',product.price)
        formdata.append('category',product.category)
        formdata.append('description',product.description)
        formdata.append('image',image)
        let res=await axios.post('http://localhost:3000/product',formdata)
        console.log(res)
        // console.log(product,image)
    }

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label>Product name</label>
        <input type="text" name='name' onChange={handleChange}/><br /><br />
        <label>Product price</label>
        <input type="Number" name='price' onChange={handleChange}/><br /><br />
        <label>Product description</label>
        <input type="text" name='description' onChange={handleChange} /><br /><br />
        <label>Product category</label>
        <input type="text" name='category' onChange={handleChange} /><br /><br />
        <label>Product image</label>
        <input type="file" name='image' onChange={(e)=>setImage(e.target.files[0])} /><br /><br />
        <button>submit</button>
      </form>
    </div>
  )
}

export default AddProduct