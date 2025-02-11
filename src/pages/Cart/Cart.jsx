import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Quantity</p>
          <p>Price($)</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index)=>{
          if(cartItems[item._id]>0){
            return (
              <div>
            <div className='cart-items-title cart-items-item'>
              <img src={item.image} alt="Item Image" />
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{cartItems[item._id]}</p>
              <p>${item.price * cartItems[item._id]}</p>
              <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p>
            </div>
            <hr />
              </div>

            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
          <div className="cart-total-deails">
            <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-deails">
            <p>Delivery Charge</p>
              <p>${2}</p>
          </div>
          <hr />
          <div className="cart-total-deails">
            <p>Total</p>
             <b>${getTotalCartAmount()+2}</b>
          </div>
        </div>
        <button>Proceed to CheckOut</button>
      </div>
      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, Enter it here.</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Promo Code' />
            <button type="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Cart