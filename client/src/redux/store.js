import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  brandReducer,
  brandDetailReducer,
  brandProductReducer,
} from "./reducers/brandReducer";
import {
  trendingProductReducer,
  allProductsReducer,
  productDetailReducer,
  recommendedProductReducer,
  productReviewReducer,
  getProductReviewReducer,
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
  newBrands: brandReducer,
  brandDetails: brandDetailReducer,
  brandProductReducer: brandProductReducer,

  //product reducer section
  trendingProducts: trendingProductReducer,
  allProducts: allProductsReducer,
  productDetail: productDetailReducer,
  recommendedProducts: recommendedProductReducer,
  review: productReviewReducer,
  reviews: getProductReviewReducer,
  //cart reducer
  cart: cartReducer,
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
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
