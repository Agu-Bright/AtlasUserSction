const brandModel = require("../model/brandModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ApiFeatures = require("../middlewares/apiFeatures");
const User = require("../model/authModel");

const cloudinary = require("cloudinary");

//USER ROUTES
//User Create a brand ==> /api/v1/brand/useer/createBrand [POST]
const userCreateBrand = catchAsyncErrors(async (req, res, next) => {
  const brandData = {
    brandName: req.body.brandName,
    brandType: req.body.brandType,
    brandProductCategory: req.body.brandProductCategory,
    brandDetail: req.body.brandDetail,
    location: req.body.location,
    bank: req.body.bank,
    accountName: req.body.accountName,
    accountNumber: req.body.accountNumber,
    phoneNumber: req.body.phoneNumber,
    user: req.user._id,
    brandLogo: {
      public_id: req.body.brandLogo.public_id,
      url: req.body.brandLogo.url,
    },
  };

  // const result = await cloudinary.v2.uploader.upload(req.body.logo, {
  //   folder: "Brands",
  //   width: 150,
  //   crop: "scale",
  // });
  //update user to seller
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("You must Sign In to create this brand"), 404);
  }
  await User.findByIdAndUpdate(
    req.user.id,
    { ...user, role: "seller" },
    { new: true, runvalidator: true, useFindAndModify: false }
  );

  const brand = await brandModel.create({
    ...brandData,
    // BrandLogo: { public_id: result?.public_id, url: result?.secure_url },
  });

  res.status(200).json({ success: true, brand });
});

//get all brands ==> /api/v1/brand/user/getBrands
const getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 8;
  const brandCount = await brandModel.countDocuments({ status: "approved" });
  const apiFeatures = new ApiFeatures(
    brandModel.find({ status: "approved" }),
    req.query
  )
    .search()
    .filter();

  apiFeatures.paginate(resperpage);
  let brands = await apiFeatures.query;
  let filteredBrandCount = brands.length;
  const numberOfPages = Math.ceil(brandCount / resperpage);
  const searchNumberOfPages = Math.ceil(filteredBookCount / resperpage);
  res.status(200).json({
    success: true,
    brands,
    brandCount,
    filteredBrandCount,
    resperpage,
    numberOfPages,
    searchNumberOfPages,
  });
});

//update brand ==> /api/v1/brand/user/updateBrand/:id
const updateBrand = catchAsyncErrors(async (req, res, next) => {
  //To update the brand logo,
  //To update the coverImage
  //To update the certificate
  //To update the social links and others

  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(ErrorHandler("Brand Not found", 404));
  }
  //handle the image upload to cloudinary later
  const update = { ...req.body };
  await brandModel.findByIdAndUpdate(id, update, {
    new: true,
    runvalidator: true,
    useFindAndModify: true,
  });
  res.status(200).json({ success: true });
});

// delete Brand ==> /api/v1/brand/user/deleteBrand/:id [DELETE]
const deleteBrand = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandModel.findById(id);
  if (!brand) {
    return next(new ErrorHandler("Brand not found", 404));
  }
  await brand.findByIdAndRemove(id);
  res.status(200).json({
    success: true,
  });
});

//get New Brands ==> /api/v1/brand/newBrands
const getNewBrands = catchAsyncErrors(async (req, res, next) => {
  const brands = await brandModel.find();
  const latestBrands = brands.slice(-8);
  res.status(200).json({ success: true, latestBrands });
});

const getBrand = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const brand = await brandModel.findById(id);
  // if (!book || book.status !== "approved") {
  //   return next(new ErrorHandler("No Book Found", 404));
  // }
  res.status(200).json({
    success: true,
    brand,
  });
});

//ADMIN ROUTES

module.exports = {
  userCreateBrand,
  getAllBrands,
  updateBrand,
  deleteBrand,
  getNewBrands,
  getBrand,
};
