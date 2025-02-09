import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';



const LoginPopup = ({setShowLogin}) => {

    const[currState,setCurrState]=useState("Login");
     
  return (
    <div className='login-popup'>
        <form  className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Icon" />
            </div>
            <div className="login-popup-inputs">
                {currState === "Login" ? <></>:<input type="text" placeholder='Your Name' required/>}
                {/* <input type="text" placeholder='Your Name' required/> */}
                <input type="email" name="email" placeholder='Your Email' required/>
                <input type="password" name="Password" id="" placeholder='Password' required/>
            </div>
            <button>{currState === "Sign up"?"Create an account":"Sign in"}</button>
            <div className="login-popup-condition">
                <input type="checkbox" name="" id="" required/>
                <p>By continuing, I agree to our terms and conditions.</p>
            </div>
            {currState === "Login"
            ? <p>Create a new account ? <span onClick={()=>setCurrState("Sign up")}> Click here</span></p>
            :<p>Already have an account.<span onClick={()=>setCurrState("Login")}>Login here</span></p>}
            
         
        </form>
    </div>
  )
}

export default LoginPopup