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
import DashboardLayout from './components/Layout/DashboardLayout'
import Users from './pages/admin/Users'
import Products from './pages/admin/Products'
import OrdersAdmin from './pages/admin/Orders'
import Farmers from './pages/admin/Farmers'
import AdminDashboard from './pages/dashboard/AdminDashboard'
import CustomerDashboard from './pages/dashboard/CustomerDashboard'
import FarmerDashboard from './pages/dashboard/FarmerDashboard'

function App() {


  return (
    <Routes>
      {/* Public/shop routes */}
      <Route element={<Layout />}>
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
        <Route path='/gallery' element={<Gallery />} />
      </Route>
      {/* Dashboard/admin routes */}
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path='admin/users' element={<Users />} />
        <Route path='admin/products' element={<Products />} />
        <Route path='admin/orders' element={<OrdersAdmin />} />
        <Route path='admin/farmers' element={<Farmers />} />
        <Route path='customer' >
          <Route index element={<CustomerDashboard />} />
          <Route path='orders' element={<Orders />} />
          <Route path='cart' element={<Cart />} />
          <Route path='checkout' element={<Checkout />} />
        </Route>
        <Route path='farmer' element={<FarmerDashboard />} />
      </Route>
    </Routes>
  )
}

export default App
