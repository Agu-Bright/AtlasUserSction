const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Brand Name field is required"],
    maxLength: [30, "Your name cannot exceed 30 characters"],
    unique: true,
  },

  brandLogo: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  backgroundImage: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  brandType: {
    type: String,
    required: [true, "Please Select the brand type"],
    enum: {
      values: ["Plug", "Store", "Mall", "Restaurants"],
      message: "Please select a brand Type",
    },
  },
  brandProductCategory: {
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
      message: "Please select the correct category of product you upload",
    },
  },
  brandDetail: {
    type: "String",
    required: [
      true,
      "Please give a detailed description of what your brand is about",
    ],
  },
  certificate: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  location: {
    type: String,
    required: [true, "please select the location of you brand"],
    enum: {
      values: [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "FCT - Abuja",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara",
      ],
      message: "Select the location of your bussiness",
    },
  },
  socials: {
    whatsApp: {
      type: String,
    },
    Instagram: {
      type: String,
    },
    faceBook: {
      type: String,
    },
  },
  website: {
    type: String,
  },

  bank: {
    type: String,
    required: [true, "Your Bank name is required"],
  },
  accountName: {
    type: String,
    required: [true, "The accout name is required"],
  },

  accountNumber: {
    type: String,
    required: [true, "Your account number is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Your phone number is required"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
    unique: [true, "you can't create more than one store"],
  },
  verified: { type: Boolean, default: false },
  status: {
    type: String,
    default: "approved",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = new mongoose.model("BrandModel", brandSchema);
