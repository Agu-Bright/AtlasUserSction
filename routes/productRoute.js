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
  "/admin/createBook",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  createProduct
);

router.delete(
  "/admin/book/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  deleteProduct
);

router.put(
  "/admin/book/:id",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  updateProduct
);

router.get(
  "/admin/books",
  authMiddleware,
  authorizeRoles("admin", "seller"),
  AdminGetAllProducts
);

router.get("/books", getAllProducts);
router.get("/newBooks", getNewProducts);
router.get("/book/:id", getProduct);

router.put("/review", authMiddleware, createUpdateProductReview);
router.get("/reviews", getProductReviews);
router.delete("/review", authMiddleware, deleteReview);

//seller get all books that are approved
//seller get all books that are pending
//seller get all books that are rejected

module.exports = router;
