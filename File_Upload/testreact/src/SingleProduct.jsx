import React ,{useEffect,useState}from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
function SingleProduct() {
    const [product,setProduct]=useState({})
    
    let {id}=useParams()
    useEffect(()=>{
        async function getData() {
           let res=await axios.get(`http://localhost:3000/product/${id}`)
           setProduct(res.data.product)
           console.log(res.data.product)
        }
        getData()
    },[])
  return (
    <div>
      {id}
    </div>
  )
}

export default SingleProduct