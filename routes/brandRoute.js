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
  getRecommendedProducts,
  brandsInYourLocation,
} = require("../controllers/brandController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/user/createBrand", authMiddleware, userCreateBrand);
router.get("/newBrands", getNewBrands);
router.get("/brandDetails/:id", getBrand);
router.get("/brandProduct/:id", getBrandProducts);
router.get("/recommendedProducts/:id", getRecommendedProducts);
router.get("/brands", getAllBrands);
router.get("/brandsInLocation", authMiddleware, brandsInYourLocation);
module.exports = router;
