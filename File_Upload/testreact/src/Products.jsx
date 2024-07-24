import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

let url='http://localhost:3000/'
function Products() {
    const [product,setProduct]=useState([])
    useEffect(()=>{
        async function getData() {
           let res=await axios.get('http://localhost:3000/product')
           console.log(res.data.products)
           setProduct(res.data.products)
        }
        getData()
    },[])

  return (
    <div style={{display:'flex',flexWrap:'wrap',justifyContent:"space-between"}}>
      {product.map((v,i)=>{
        return <div key={i} style={{flexBasis:'30%'}}>
        <p>{v.name}</p>
        <img src={url+v.image} alt="product"  width={'100%'} />  
        <p><button ><Link to={`/product/${v._id}`}>to know more</Link></button></p>    
        </div>
      })}
    </div>
  )
}

export default Products