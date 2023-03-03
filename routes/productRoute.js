const express = require("express");
const router = express.Router();
const {
  authMiddleware,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  createProduct,
  getAllProducts,
  AdminGetAllProducts,
  getNewProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  createUpdateProductReview,
  getProductReviews,
  deleteReview,
  getTrendingProducts,
} = require("../controllers/productController");

router.get("/trendingProducts", getTrendingProducts);

router.post(
  "/admin/createProduct",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  createProduct
);

router.delete(
  "/admin/product/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  deleteProduct
);

router.put(
  "/admin/product/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  updateProduct
);

router.get(
  "/admin/products",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  AdminGetAllProducts
);

router.get("/products", getAllProducts);
router.get("/newProducts", getNewProducts);
router.get("/product/:id", getProduct);

router.put("/review", authMiddleware, createUpdateProductReview);
router.get("/reviews", getProductReviews);
router.delete("/review", authMiddleware, deleteReview);

//seller get all books that are approved
//seller get all books that are pending
//seller get all books that are rejected

module.exports = router;
