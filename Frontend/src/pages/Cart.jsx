import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setCart(res.data);
      } catch (err) {
        alert("Failed to load cart");
      }
    };
    fetchCart();
  }, []);

 const placeOrder = async () => {
   try {
     const token = localStorage.getItem("token");
     if (!token) {
       alert("Unauthorized: Please login first!");
       return;
     }

     const res = await axios.post(
       "http://localhost:5000/api/orders",
       {
         shippingAddress: "123 Main St, City, Country",
       },
       {
         headers: { Authorization: `Bearer ${token}` },
       }
     );
     alert("Order placed successfully");
     navigate("/orders");
   } catch (err) {
     console.error(err.response?.data || err.message);
     alert("Failed to place order. Please try again.");
   }
 };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Cart</h1>
      <ul>
        {cart.map((item) => (
          <li
            key={item._id}
            className="border p-4 my-2 flex justify-between items-center"
          >
            <div>
              {item.productId.name} - Quantity: {item.quantity}
            </div>
            <button
              onClick={() => placeOrder(item)}
              className="bg-green-500 text-white p-2 rounded"
            >
              Place Order
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Cart;
