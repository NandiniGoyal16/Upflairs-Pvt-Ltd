import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddProduct from './AddProduct'
import Products from './Products'
import SingleProduct from './SingleProduct'

function App() {
  

  return (
    <>
      <BrowserRouter>
      <Routes>
      <Route path='' element={<AddProduct/>} />
      <Route path='products' element={<Products/>} />
      <Route path='product/:id' element={<SingleProduct/>} />
      </Routes>     
      </BrowserRouter>
    </>
  )
}

export default App 