import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <div className="text-lg font-bold">E-Commerce</div>
      <ul className="flex space-x-4">
        <li>
          <Link to="/register" className="hover:text-gray-400">
            Register
          </Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-400">
            Login
          </Link>
        </li>
        <li>
          <Link to="/products" className="hover:text-gray-400">
            Products
          </Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-gray-400">
            Cart
          </Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-gray-400">
            Orders
          </Link>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
