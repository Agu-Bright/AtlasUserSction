import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { highlightReducer } from "./reducers/highlightReducer";
import {
  brandReducer,
  brandDetailReducer,
  brandProductReducer,
  allBrandsReducer,
  brandsInLocationReducer,
  createBrandReducer,
  createBrand,
  myBrandReducer,
  updateBrandReducer,
  allBrands,
} from "./reducers/brandReducer";
import {
  trendingProductReducer,
  allProductsReducer,
  productDetailReducer,
  recommendedProductReducer,
  productReviewReducer,
  getProductReviewReducer,
  createProductReducer,
  deleteProductReducer,
} from "./reducers/productReducer";
import {
  userReducer,
  usersReducer,
  forgotPasswordReducer,
  allUsersReducer,
  deleteUserReducer,
  userDetailsReducer,
  updateUserReducer,
  allSellersReducer,
} from "./reducers/userReducer";
import {
  orderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  allOrdersReducer,
  updateOrdersReducer,
  deleteOrderReducer,
} from "./reducers/orderReducer";
import { cartReducer } from "./reducers/cartReducer";

const reducer = combineReducers({
  //user reducer section
  auth: userReducer,
  user: usersReducer,
  allSellers: allSellersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  DeleteUser: deleteUserReducer,
  forgotPassword: forgotPasswordReducer,

  //Brand reduser section
  myBrand: myBrandReducer,
  newBrands: brandReducer,
  brandDetails: brandDetailReducer,
  brandProductReducer: brandProductReducer,
  allBrandsReducer: allBrandsReducer,
  brandsInLocationReducer: brandsInLocationReducer,
  createBrand: createBrandReducer,
  brand: createBrand,
  updateBrand: updateBrandReducer,
  allBrands: allBrands,
  //product reducer section
  createProduct: createProductReducer,
  trendingProducts: trendingProductReducer,
  allProducts: allProductsReducer,
  productDetail: productDetailReducer,
  recommendedProducts: recommendedProductReducer,
  review: productReviewReducer,
  reviews: getProductReviewReducer,
  deleteProduct: deleteProductReducer,
  //cart reducer
  cart: cartReducer,

  //order recucer
  theOrder: orderReducer,
  myOrders: myOrdersReducer,
  allOrders: allOrdersReducer,
  orderDetails: orderDetailsReducer,
  order: updateOrdersReducer,
  deleteOrder: deleteOrderReducer,

  highlight: highlightReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? [...JSON.parse(localStorage.getItem("cartItems"))]
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  createBrand: {
    createBrandInfo: localStorage.getItem("createBrandInfo")
      ? { ...JSON.parse(localStorage.getItem("createBrandInfo")) }
      : {},
  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
