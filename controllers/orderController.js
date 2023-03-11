const Order = require("../model/orderModel");
const Product = require("../model/productModel");

const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;
  await product.save({ validateBeforeSave: false });
};

//create new order => api/v1/order/new
const newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
    orderId,
    sellers,
  } = req.body;
  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    paymentInfo,
    user: req.user._id,
    orderId,
    sellers,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

//Get single order => api/v1/order/:id
const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this id", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

//Get logged in user orders => api/v1/orders
const myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    orders,
  });
});

//Admin get all orders => api/v1/admin/orders

const allOrders = catchAsyncErrors(async (req, res, next) => {
  let totalAmount = 0;
  let orders = await Order.find();
  if (req.user.role === "seller") {
    //get orders that includess created by the seller
    const sellersOrders = orders.filter((order) =>
      order.sellers.includes(req.user._id)
    );
    orders = sellersOrders;
    let orderItems = [];
    orders.forEach((order) => {
      order.orderItems.forEach((item) => {
        orderItems.push(item);
      });
    });
    // let sellersItems;
    if (orderItems.length >= 1) {
      let sellersItems = [];
      orderItems.forEach((item) => {
        if (item.seller.toString() === req.user._id.toString()) {
          sellersItems.push(item);
        }
      });
      if (sellersItems.length >= 1) {
        const sum = sellersItems.reduce((acc, item) => {
          return item.price + acc;
        }, 0);
        totalAmount = sum;
      }
    }
  }
  if (req.user.role !== "seller") {
    orders.forEach((order) => (totalAmount += order.itemsPrice));
  }
  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Admin update, process order => api/v1/admin/order/:id
const updateOrder = catchAsyncErrors(async (req, res, next) => {
  const { status } = req.body;
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("This Order is Alresdy Delivered", 400));
  }
  //update the stock
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });
  //update the order status
  order.orderStatus = status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});
//Admin delete order => api/v1/order/:id
const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No order found with this id", 404));
  }
  await order.remove();

  res.status(200).json({
    success: true,
  });
});

//seller get all orders
const sellerOrders = catchAsyncErrors(async (req, res, next) => {
  //get all orders, specifically get the user that created the order
  const orders = await Order.find();

  let orderItems;
  orders.forEach((element) => {
    let items = [];
    // element.orderItems.map((item) => {
    //   items.push(item);
    // });
    for (let i = 0; i <= element.orderItems.length; i++) {
      items.push(element.orderItems[i]);
    }
    orderItems = items;
    return orderItems;
  });
  res.status(200).json({ orderItems });
  //get all order items
  //get this seller
  //filter out the items owned my this user
  //return the items, thier ptotal price and the users that created the order
});

module.exports = {
  newOrder,
  getSingleOrder,
  myOrders,
  allOrders,
  updateOrder,
  deleteOrder,
  sellerOrders,
};
