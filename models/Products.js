

import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the outfit name"],
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["Upper", "Lower", "Accessories", "Compression"],
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Unisex"],
    default: "Unisex",
  },
 
  material: {
    type: String, 
  },
  features: [String], 
  

  variants: [{
    color: { type: String, required: true },
    colorCode: String, // HEX code for UI display
    size: {
      type: String,
      enum: ["S", "M", "L", "XL", "XXL"],
      required: true,
    },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    images: [String], 
  }],

  isBestSeller: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

 const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
 export default Product;