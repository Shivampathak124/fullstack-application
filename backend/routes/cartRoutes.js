// routes/cartRoutes.js
const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

// Add product to cart
router.post("/cart", auth, async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) return res.status(400).json({ message: "Product not found" });

  if (product.stock < quantity)
    return res.status(400).json({ message: "Insufficient stock" });

  // Create new cart item
  const cartItem = new Cart({ userId: req.user.id, productId, quantity });
  await cartItem.save();

  res.status(201).json({ message: "Product added to cart", cartItem });
});

// Get user's cart
router.get("/", auth, async (req, res) => {
  const cartItems = await Cart.find({ userId: req.user.id }).populate(
    "productId"
  );
  res.json(cartItems);
});

module.exports = router;
