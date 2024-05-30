const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const Product = require("../model/product");
const ErrorHandler = require("../utils/ErrorHandler");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFileToCloudinary = async (file) => {
  return await cloudinary.uploader.upload(file.tempFilePath);
};

router.post("/add-product", async (req, res, next) => {
  try {
    const {
      name,
      price,
      discountedPrice,
      description,
      category,
      totalSell,
      rating,
    } = req.body;

    if (!req.files || !req.files.image) {
      return next(new ErrorHandler("Image file is required", 400));
    }

    const image = req.files.image;
    const photoResult = await uploadFileToCloudinary(image);
    const photoUrl = photoResult.secure_url;

    const product = await Product.create({
      productName: name,
      price,
      discountedPrice,
      totalSell,
      image: photoUrl,
      description,
      category,
      rating,
    });

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

// route to fetch the products


router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
});

module.exports = router;