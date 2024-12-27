import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOrders(res.data);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order._id} className="border p-4 my-2">
            Total Price: ${order.totalPrice} - Status: {order.orderStatus}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Orders;
