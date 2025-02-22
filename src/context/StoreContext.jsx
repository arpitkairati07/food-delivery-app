// src/context/StoreContext.js
import { createContext, useEffect, useState } from "react";
import axios from "axios"; // ✅ Import axios

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  // Add an item to the cart
  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1,
    }));

    if (token) { 
        try {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    }
};


const removeFromCart = async (itemId) => {
  if (cartItems[itemId] > 0) {
      setCartItems((prev) => ({
          ...prev,
          [itemId]: prev[itemId] - 1,
      }));

      if (token) { 
          try {
              await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
          } catch (error) {
              console.error("Error removing from cart:", error);
          }
      }
  }
};


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Fetch food list from API
  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

const loadCartData = async(token) =>{
const response = await axios.post(url+"/api/cart/get",{},{headers:{token}})
setCartItems(response.data.cartData)
}

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  }, []);

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
    setToken,
  };

  return <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>;
};

export default StoreContextProvider;
