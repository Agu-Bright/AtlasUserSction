import axios from "axios";
import {
  GET_TRENDING_PRODUCT_REQUEST,
  GET_TRENDING_PRODUCT_SUCCESS,
  GET_TRENDING_PRODUCT_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const getTrendingProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_TRENDING_PRODUCT_REQUEST,
    });
    const { data } = await axios.get("/api/v1/trendingProducts");
    dispatch({
      type: GET_TRENDING_PRODUCT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_TRENDING_PRODUCT_FAIL,
      payload: error.response.data.Message,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
