import axios from "axios";
import {
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
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

//clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERROR,
  });
};
