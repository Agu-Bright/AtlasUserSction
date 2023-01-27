import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { brandReducer } from "./reducers/brandReducer";
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
  newBrands: brandReducer,
  trendingProducts: trendingProductReducer,
  auth: userReducer,
  user: usersReducer,
  allSellers: allSellersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  updateUser: updateUserReducer,
  DeleteUser: deleteUserReducer,
  forgotPassword: forgotPasswordReducer,
});
let initilaState;
const middleware = [thunk];

const store = createStore(
  reducer,
  initilaState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
