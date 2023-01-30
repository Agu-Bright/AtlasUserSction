import axios from "axios";
import {
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRAND_DETAIL_REQUEST,
  GET_BRAND_DETAIL_SUCCESS,
  GET_BRAND_DETAIL_FAIL,
  CLEAR_ERROR,
} from "../constants/brandConstant";

export const getNewBrands = () => async (dispatch) => {
  try {
    dispatch({ type: GET_BRAND_REQUEST });
    const { data } = await axios.get("/api/v1/brand/newBrands");
    dispatch({ type: GET_BRAND_SUCCESS, payload: data.latestBrands });
  } catch (error) {
    dispatch({
      type: GET_BRAND_FAIL,
      payload: error.response.data.Message,
    });
  }
};

export const getBrandDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_BRAND_DETAIL_REQUEST });
    const { data } = await axios.get(`/api/v1/brand/brandDetails/${id}`);
    dispatch({ type: GET_BRAND_DETAIL_SUCCESS, payload: data.brand });
  } catch (error) {
    dispatch({
      type: GET_BRAND_DETAIL_FAIL,
      payload: error.response.data.Message,
    });
  }
};

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
