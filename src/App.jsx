import { useState } from 'react'

import './App.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import AllProducts from './pages/AllProducts'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import Cart from './pages/Cart'
import ShowProduct from './pages/ShowProduct'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Gallery from './pages/Gallery'

function App() {


  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products/:productId' element={<ShowProduct />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/gallery' element={<Gallery />} />
      </Routes>
    </Layout>
  )
}

export default App
