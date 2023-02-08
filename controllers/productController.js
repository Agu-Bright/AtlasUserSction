const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Product = require("../model/productModel");
const ApiFeatures = require("../middlewares/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary");

//create product POST ==> /api/v1/create_product/
const createProduct = catchAsyncErrors(async (req, res, next) => {
  // console.log(req.body);
  // let images = [];
  // if (typeof req.body.images === "string") {
  //   images.push(req.body.images);
  // } else {
  //   images = req.body.images;
  // }
  // let imagesLinks = [];
  // for (let i = 0; i < images.length; i++) {
  //   const result = await cloudinary.v2.uploader.upload(images[i], {
  //     folder: "products",
  //   });

  //   imagesLinks.push({
  //     public_id: result.public_id,
  //     url: result.secure_url,
  //   });
  // }

  const product = {
    ...req.body,
    // images: imagesLinks,
    user: req.user._id,
  };
  const newProduct = await Product.create(product);
  res.status(201).json({
    success: true,
    newProduct,
  });
});

//get All products =>  /api/v1/products?search=Phsycology&price[gte]=2000&page=1
const getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resperpage = 8;
  const productsCount = await Product.countDocuments({ status: "approved" });
  const apiFeatures = new ApiFeatures(
    Product.find({ status: "approved" }),
    req.query
  )
    .search()
    .filter();

  apiFeatures.paginate(resperpage);
  let products = await apiFeatures.query;
  let filteredProductCount = products.length;
  const numberOfPages = Math.ceil(productsCount / resperpage);
  const searchNumberOfPages = Math.ceil(filteredProductCount / resperpage);
  res.status(200).json({
    success: true,
    products,
    productsCount,
    filteredProductCount,
    resperpage,
    numberOfPages,
    searchNumberOfPages,
  });
});

//get All products =>  /api/v1/admin/products
const AdminGetAllProducts = catchAsyncErrors(async (req, res, next) => {
  const role = req.user.role;
  let products;
  if (role === "seller") {
    products = await Product.find({ user: req.user._id });
  } else {
    products = await Product.find();
  }

  res.status(200).json({
    success: true,
    products,
  });
});

const getNewProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({ status: "approved" });
  const latestProducts = products.slice(-8);
  res.status(200).json({ success: true, latestProducts });
});

//get Single product ==> /api/v1/product/:id
const getProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("user");
  // if (!book || book.status !== "approved") {
  //   return next(new ErrorHandler("No Book Found", 404));
  // }
  res.status(200).json({
    success: true,
    product,
  });
});

//updateProduct  => /api/v1/admin/product/:id [PATCH]
const updateProduct = catchAsyncErrors(async (req, res, next) => {
  //here you dont want the seller to be able to update his book to approved
  const { id } = req.params;
  const sellersProduct = await Product.findById(id);
  if (
    req.user._id.toString() === sellersProduct.user.toString() ||
    req.user.role === "admin"
  ) {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.images);
    } else {
      images = req.body.images;
    }

    if (images !== undefined) {
      //deleting image from the cloudinary
      for (let i = 0; i < sellersProduct.images.length; i++) {
        const result = await cloudinary.v2.uploader.destroy(
          sellersProduct.images[i].public_id
        );
      }

      let imagesLinks = [];
      for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
          folder: "books",
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
      const product = {
        ...req.body,
        images: imagesLinks,
        user: req.user._id,
      };

      req.body = product;
    }

    //we will have to prevent the seller from updating his book through this endpoint, this is a vulnerability, will be taken care of soon
    const update = await Books.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidator: true,
      useFindAndModify: true,
    });

    return res.status(200).json({ success: true, update });
  } else {
    return next(new ErrorHandler("internal server error", 500));
  }
});

//deleteProduct /api/v1/admin/product/:id DELETE
const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  //the user should be able to delete the product, if he is the creator ar he is the admin
  const sellersProduct = await Books.findById(id);

  if (!sellersProduct) {
    return next(new ErrorHandler("product not found", 404));
  }

  if (
    req.user._id.toString() === sellersProduct.user.toString() ||
    req.user.role === "admin"
  ) {
    await Products.findByIdAndRemove(id);
    //deleting image from the cloudinary
    for (let i = 0; i < sellersProduct.images.length; i++) {
      const result = await cloudinary.v2.uploader.destroy(
        sellersProduct.images[i].public_id
      );
    }
    return res.status(200).json({ success: true });
  } else {
    return next(new ErrorHandler("internal server error", 500));
  }
});

//create / update Product review => /api/v1/review
const createUpdateProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  //check is product is already reviewed by the current user
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    //update the review
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString()) {
        rev.comment = comment;
        rev.rating = rating;
      }
    });
  } else {
    //not reviewed, add a new review
    product.reviews.push(review);
    product.numberOfReviews = product.reviews.length;
  }

  //calculate the overall rating
  product.rating =
    product.reviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//get product reviews => api/v1/reviews
const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//delete review => api/v1/review?id=01209320934&bookId=9034290982432309
const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  /**id: This is the id of the review you want to delete, bookId: This is the id of the book you want to delete its review */
  //filter out the review
  const reviews = product.reviews
    .filter((review) => review._id.toString() !== req.query.id)
    .toString();

  //get number of reviews
  const numberOfReviews = reviews.length;

  //calculate the current rating
  const rating =
    product.reviews.reduce((acc, item) => {
      return item.rating + acc;
    }, 0) / reviews.length;

  //update the book

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      rating,
      numberOfReviews,
    },
    {
      new: true,
      runValidator: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true });
});

const getTrendingProducts = catchAsyncErrors(async (req, res, next) => {
  //get all products
  const trendingProducts = await Product.find({ status: "approved" })
    .limit(10)
    .sort("numOfReviews");
  //find the product with the heights rating
  const list = [...trendingProducts];
  const middleIndex = Math.ceil(list.length / 2);

  const firstHalf = list.splice(0, middleIndex);
  const secondHalf = list.splice(-middleIndex);

  res.status(200).json({ success: "true", firstHalf, secondHalf });
});

module.exports = {
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
};
