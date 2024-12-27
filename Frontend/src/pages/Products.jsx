

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      alert('Failed to load products'); 
    }
  };

 const addToCart = async (productId) => {
   try {
     const token = localStorage.getItem("token"); 
     const res = await axios.post(
       "http://localhost:5000/api/cart/cart",
       {
         productId,
         quantity: 1,
       },
       {
         headers: {
           Authorization: `Bearer ${token}`, 
         },
       }
     );
     alert("Product added to cart");
   } catch (err) {
     alert(err.response?.data?.message || "Failed to add product to cart");
   }
 };


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <button 
              onClick={() => addToCart(product._id)}
              className="bg-blue-500 text-white p-2 rounded mt-4">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
