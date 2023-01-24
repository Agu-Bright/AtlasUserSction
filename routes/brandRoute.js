const express = require("express");
const router = express.Router();

const {
  userCreateBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getNewBrands,
} = require("../controllers/brandController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/user/createBrand", authMiddleware, userCreateBrand);
router.get("/newBrands", getNewBrands);
module.exports = router;
