// Cart.js

import React, { useEffect, useState } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Fetch cart items from local storage when the component mounts
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleRemoveFromCart = (product) => {
    // Remove the product from the cart
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    // Update the local storage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };


  const handleIncrement = (product)=>{
    
    const updatedCart = cartItems.map((item)=>{
        if(item.id === product.id){
            item.quantity +=1;
        }
        return item;
    });
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}


  const handleDecrement = (product)=>{
    const updatedCart = cartItems.map((item)=>{
        if(item.id === product.id && item.quantity > 1){
            item.quantity -= 1;
        }
        return item;
    });
    setCartItems(updatedCart)
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}
    const calculateTotalPrice = () => {
        const total = cartItems.reduce((total, item) =>{
            return total + item.price * item.quantity;
        }, 0);
        return total;
    }

 
    return (
      <div className="cart-container  ">
        <h2>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="row my-4 d-flex align-align-items-center " >
            {cartItems.map((item) => (
              <div key={item.id} className="col-lg-2 col-md-4 col-sm-12 col-xs-1 text-center flex-column align-items-center  g-3 ">
                <div className="card" style={{ width: '220px', height:'400px'  }}>
                  <img src={item.image} className="card-img-top mx-auto "                     style={{width:'100px', height:'100px'}}
 alt={item.title} />
                  <div className="card-body">
                    <h5 className="card-title text-center">{item.title}</h5>
                    <p className="card-text">Price: ${item.price}</p>
                    <p className="card-text">Quantity: {item.quantity}</p>
                    <div className="btn-group">
                      <button className="btn btn-outline-secondary" onClick={() => handleDecrement(item)}>-</button>
                      <button className="btn btn-outline-secondary">{item.quantity}</button>
                      <button className="btn btn-outline-secondary" onClick={() => handleIncrement(item)}>+</button>
                    </div>
                  </div>
                <div className=''><button className="btn btn-danger mt-3" onClick={() => handleRemoveFromCart(item)}>Remove</button>
</div>              </div>

                </div>
            ))}
          </div>
        )}
        <div className=" total ms-5 " >
          <strong>Total Price:</strong> ${calculateTotalPrice()}
        </div>
        <style>
          {`.total{
            margin-top:10px

          }
          .row{
            height:700px
            
          }
          @media (max-width: 575.98px) {
            .card {
              width: 270px !important; /* Set the width to 50% for extra small screens */
            }
            .row {
              height:900px
            }
            .card-title{
              text-align: center
            }
             h5 {
              margin-left:20px
            }
            display:flex
            align-items: center
          `

          }
        </style>
      </div>
      
    );
}

export default Cart;
