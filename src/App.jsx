import React, { useState } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './pages/Verify/Verify.jsx'

const App = () => {
const[showLogin,setShowLogin]=useState(false); 

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}></LoginPopup>:<></>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}></Navbar>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/order' element={<PlaceOrder />}></Route>
        <Route path='/verify' element={<Verify />}></Route>
        {/* <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route> */}
        '
      </Routes>
    </div>
    <Footer></Footer>
    </>

  ) 
}

export default App