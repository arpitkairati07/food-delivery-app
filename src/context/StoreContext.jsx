// src/context/StoreContext.js
import { createContext, useEffect, useState } from "react";


export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url="http://localhost:5000"
  const[token,setToken] = useState("");
  const[food_list,setFoodList] = useState([]);

  // Add an item to the cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({
        ...prev,
        [itemId]: prev[itemId] - 1,
      }));
    }
  };

  const getTotalCartAmount = () =>{
    let totalAmount=0;
    for(const item in cartItems){
      if(cartItems[item]>0){
        let itemInfo=food_list.find((product)=>product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
    }

    const fetchFoodList = async() =>{
      const response = await axios.get(`${url}/api/food-list`);
      setFoodList(response.data.data);
    }

    useEffect(()=>{
      async function loadData(){
        await fetchFoodList();
        if(localStorage.getItem("token")){
          setToken(localStorage.getItem("token"));
        }
      }
      loadData();
    },[])
  // Context value to be provided to all components
  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;