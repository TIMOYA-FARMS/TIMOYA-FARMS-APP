import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/Layout/Layout'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import Login from './pages/Login'
import Register from './pages/Register'
import AllProducts from './pages/AllProducts'

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
               
      </Routes>
    </Layout>
  )
}

export default App
