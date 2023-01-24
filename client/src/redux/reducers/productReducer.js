import {
  GET_TRENDING_PRODUCT_REQUEST,
  GET_TRENDING_PRODUCT_SUCCESS,
  GET_TRENDING_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const trendingProductReducer = (
  state = { firstHalf: [], secondHalf: [] },
  action
) => {
  switch (action.type) {
    case GET_TRENDING_PRODUCT_REQUEST:
      return {
        loading: true,
        firstHalf: [],
        secondHalf: [],
      };

    case GET_TRENDING_PRODUCT_SUCCESS:
      return {
        loading: false,
        firstHalf: action.payload.firstHalf,
        secondHalf: action.payload.secondHalf,
      };
    case GET_TRENDING_PRODUCT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
