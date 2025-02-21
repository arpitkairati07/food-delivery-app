import React, {  useContext, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';



const LoginPopup = ({setShowLogin}) => {

    const {url} = useContext(StoreContext);
    const[currState,setCurrState]=useState("Login");
    const[data,setData]= useState({
        name:"",
        email:"",
        password:""
    })
    const onChangeHandler=(event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }


    const onLogin = async (event) =>{
        event.preventDefault()
        
    }
      
  return (
    <div className='login-popup'>
        <form  className='login-popup-container' onSubmit={onLogin}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Icon" />
            </div>
            <div className="login-popup-inputs">
                 {currState === "Login" ? <></>:<input type="text" name='name' onChange={onChangeHandler} value={data.name} placeholder='Your Name' required/>}
                {/* <input type="text" placeholder='Your Name' required/> */}
                <input type="email" name="email" onChange={onChangeHandler} value={data.email} placeholder='Your Email' required/>
                <input type="password" name="password" onChange={onChangeHandler} value={data.password} id="" placeholder='Password' required/>
            </div>
            <button type='submit'>{currState === "Sign up"?"Create an account":"Sign in"}</button>
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