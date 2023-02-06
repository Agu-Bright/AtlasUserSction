const express = require("express");
const router = express.Router();

const {
  userCreateBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getNewBrands,
  getBrand,
  getBrandProducts,
  getRecommendedBrands,
} = require("../controllers/brandController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/user/createBrand", authMiddleware, userCreateBrand);
router.get("/newBrands", getNewBrands);
router.get("/brandDetails/:id", getBrand);
router.get("/brandProduct/:id", getBrandProducts);
router.get("/recommendedProducts", getRecommendedBrands);
module.exports = router;
