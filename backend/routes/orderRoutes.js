// routes/orderRoutes.js
const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Place an order
router.post("/", auth, async (req, res) => {
  const { shippingAddress } = req.body;

  // Get user's cart items
  const cartItems = await Cart.find({ userId: req.user.id }).populate(
    "productId"
  );
  const products = [];
  let totalPrice = 0;

  // Validate product availability and calculate total price
  for (const item of cartItems) {
    const product = await Product.findById(item.productId);
    if (product.stock < item.quantity) {
      return res
        .status(400)
        .json({ message: `Insufficient stock for ${product.name}` });
    }

    totalPrice += product.price * item.quantity;
    products.push({
      productId: product._id,
      quantity: item.quantity,
      price: product.price,
    });
  }

  // Create order
  const order = new Order({
    userId: req.user.id,
    products,
    totalPrice,
    shippingAddress,
    paymentStatus: "Pending",
    orderStatus: "Pending",
  });

  await order.save();

  // Clear the user's cart
  await Cart.deleteMany({ userId: req.user.id });

  res.status(201).json(order);
});

module.exports = router;
