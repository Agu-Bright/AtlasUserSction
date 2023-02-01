import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  brandReducer,
  brandDetailReducer,
  brandProductReducer,
} from "./reducers/brandReducer";
import { trendingProductReducer } from "./reducers/productReducer";
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
});
let initilaState;
const middleware = [thunk];

const store = createStore(
  reducer,
  initilaState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
