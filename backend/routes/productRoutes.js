const express = require("express");
const Product = require("../models/Product");
const router = express.Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// router.post("/add-to-cart", async (req, res) => {
//   const { productId, quantity, userId } = req.body;

//   if (!productId || !quantity || !userId) {
//     return res
//       .status(400)
//       .json({ message: "Product ID, quantity, and user ID are required" });
//   }

//   try {
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     if (product.stock < quantity) {
//       return res.status(400).json({ message: "Not enough stock available" });
//     }

   

//     res.status(200).json({ message: "Product added to cart successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// POST: Create a new product
router.post("/", async (req, res) => {
  const { name, description, price, quantity } = req.body;

  // Validate the incoming data
  if (!name || !description || !price || !quantity) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newProduct = new Product({
      name,
      description,
      price,
      quantity,
    });

    // Save the new product to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
