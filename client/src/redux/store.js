import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { brandReducer } from "./reducers/brandReducer";
import { trendingProductReducer } from "./reducers/productReducer";

const reducer = combineReducers({
  newBrands: brandReducer,
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
