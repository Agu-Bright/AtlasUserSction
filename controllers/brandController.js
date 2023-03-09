const brandModel = require("../model/brandModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const brandApiFeatures = require("../middlewares/brandApiFeatures");
const ApiFeatures = require("../middlewares/apiFeatures");
const User = require("../model/authModel");
const Product = require("../model/productModel");

const cloudinary = require("cloudinary");

//USER ROUTES
//User Create a brand ==> /api/v1/brand/useer/createBrand [POST]
const userCreateBrand = catchAsyncErrors(async (req, res, next) => {
  const brandData = {
    ...req.body,
    user: req.user._id,
  };

  // const result = await cloudinary.v2.uploader.upload(req.body.logo, {
  //   folder: "Brands",
  //   width: 150,
  //   crop: "scale",
  // });
  //update user to seller
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new ErrorHandler("You must Sign In to create this brand"), 404);
  }

  const brand = await brandModel.create({
    ...brandData,
    // BrandLogo: { public_id: result?.public_id, url: result?.secure_url },
  });
  //update user
  const data = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: user.name,
      email: user.email,
      location: user.location,
      role: "seller",
    },
    { new: true, runvalidator: true, useFindAndModify: false }
  );

  res.status(200).json({ success: true, brand });
});

//get all brands ==> /api/v1/brand/user/getBrands
const getAllBrands = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 8;
  const brandCount = await brandModel.countDocuments();
  const apiFeatures = new brandApiFeatures(brandModel.find(), req.query)
    .search()
    .filter();

  apiFeatures.paginate(resperpage);
  let brands = await apiFeatures.query;
  let filteredBrandCount = brands.length;
  const numberOfPages = Math.ceil(brandCount / resperpage);
  const searchNumberOfPages = Math.ceil(filteredBrandCount / resperpage);

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
  const update = { ...req.body };
  console.log(req.body);
  const { id } = req.params;
  //To update the certificate
  //To update the social links and others
  //update brand logo
  const brand = brandModel.findById(id);
  if (!brand) return next("No Brand Found", 404);
  console.log(brand);
  if (req.body.brandLogo && req.body.brandLogo !== "") {
    const brand = await brandModel.findById(id);
    if (brand.brandLogo.public_id) {
      const image_id = brand?.brandLogo?.public_id;
      await cloudinary.v2.uploader.destroy(image_id);
    }
    const result = await cloudinary.v2.uploader.upload(req.body.brandLogo, {
      folder: "brandLogo",
      width: 150,
      crop: "scale",
    });
    update.brandLogo = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }
  //To update the coverImage

  if (req.body.backgroundImage && req.body.backgroundImage !== "") {
    const brand = await brandModel.findById(id);
    if (brand.backgroundImage.public_id) {
      const image_id = brand?.backgroundImage?.public_id;
      await cloudinary.v2.uploader.destroy(image_id);
    }
    const result = await cloudinary.v2.uploader.upload(
      req.body.backgroundImage,
      {
        folder: "backgroundImage",
        width: 150,
        crop: "scale",
      }
    );
    update.backgroundImage = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  //handle the image upload to cloudinary later
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

  const brand = await brandModel.findById(id).populate("user");
  if (!brand) {
    return next(new ErrorHandler("No brand Found", 404));
  }
  const user = brand.user._id;
  const productsCount = await Product.countDocuments({ user: user });
  res.status(200).json({
    success: true,
    brand,
    productsCount,
  });
});

const getBrandProducts = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 9;
  const { id } = req.params;

  const brand = await brandModel.findById(id).populate("user");
  if (!brand) {
    return next(new ErrorHandler("No product Found", 404));
  }

  const user = brand.user._id;
  // const brandProducts = await Product.find({ user: user });
  const productsCount = await Product.countDocuments({ user: user });
  const apiFeatures = new ApiFeatures(Product.find({ user: user }), req.query)
    .search()
    .filter();
  apiFeatures.paginate(resperpage);
  let brandProducts = await apiFeatures.query;
  let filteredProductCount = brandProducts.length;
  const numberOfPages = Math.ceil(productsCount / resperpage);
  const searchNumberOfPages = Math.ceil(filteredProductCount / resperpage);
  res.status(200).json({
    success: true,
    productsCount,
    brandProducts,
    filteredProductCount,
    numberOfPages,
    searchNumberOfPages,
  });
});

const getRecommendedProducts = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  //find the user that owns this product
  const product = await Product.findById(id).populate("user");
  const brand = await brandModel.find({ user: product.user._id });
  if (!brand) {
    return next(new ErrorHandler("No product Found", 404));
  }
  const products = await Product.find({ user: brand[0].user });
  res.status(200).json({ success: "true", products });
});

const brandsInYourLocation = catchAsyncErrors(async (req, res, next) => {
  //get users location
  const user = await User.findById(req.user.id);
  if (!user) {
    return next(new ErrorHandler("User Not found", 404));
  }
  const usersLocation = user.location;
  //find brand in the users location
  const allBrandsInLocation = await brandModel.find({
    location: usersLocation,
  });
  if (!allBrandsInLocation) {
    return next(new ErrorHandler("No Brand Found", 404));
  }
  const brandsInLocation = await allBrandsInLocation.filter(
    (brand) => brand.brandType === "Store"
  );
  const resturantsInLocation = brandsInLocation.filter(
    (brand) => brand.brandType === "Restaurants"
  );
  //return the brands in the users location
  res.status(200).json({ brandsInLocation, resturantsInLocation });
});

//ADMIN ROUTES
const getMyBrand = catchAsyncErrors(async (req, res, next) => {
  //find the brand with theuserId
  const user = req.user._id;
  const [brand] = await brandModel.find({ user: user });
  res.status(200).json({ success: true, brand });
});

const getBrands = catchAsyncErrors(async (req, res, next) => {
  const allBrands = await brandModel.find().populate("user");
  console.log(allBrands);
  const brands = allBrands.reverse();
  res.status(200).json({
    success: true,
    brands,
  });
});

module.exports = {
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
};
