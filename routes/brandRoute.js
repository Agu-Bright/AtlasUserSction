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
  getMyBrand,
  getBrands,
  getBandId,
} = require("../controllers/brandController");
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

router.post("/user/createBrand", authMiddleware, userCreateBrand);
router.put(
  "/updateBrand/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  updateBrand
);
router.get("/newBrands", getNewBrands);
router.get("/brandDetails/:id", getBrand);
router.get("/brandProduct/:id", getBrandProducts);
router.get("/recommendedProducts/:id", getRecommendedProducts);
router.get("/brands", getAllBrands);
router.get("/brandsInLocation", authMiddleware, brandsInYourLocation);
router.get(
  "/myBrand",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  getMyBrand
);
router.get("/admin/brands", authMiddleware, authorizeRoles("admin"), getBrands);
router.get(
  "/admin/brandId/:id",
  authMiddleware,
  authorizeRoles("admin"),
  getBandId
);
module.exports = router;
