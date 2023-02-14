const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name of product is Required"],
    trim: true,
    maxlength: [100, "product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "The Price is required"],
    maxLength: [10, "Price of product cannot exceed 10 characters"],
  },
  description: {
    type: String,
    required: [true, "Please enter the product description"],
  },
  rating: {
    type: String,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  stock: {
    type: String,
    required: [true, "Please Enter the product stock"],
    maxLength: [5, "stock cannot exceed 5 characters"],
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  // brand: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: "BrandModel",
  //   required: true,
  // },
  category: {
    type: String,
    enum: {
      values: [
        "Electronics",
        "phones",
        "Laptops",
        "Appliances",
        "Glocerry",
        "Books",
        "Toys",
        "Clothes",
        "Shoes",
        "Food",
        "Others",
      ],
      message: "Please select the correct category for this",
    },
    required: [true, "select a product category"],
  },
  numberOfReviews: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("Product", productSchema);
