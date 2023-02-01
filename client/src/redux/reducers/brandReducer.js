import {
  GET_BRAND_REQUEST,
  GET_BRAND_SUCCESS,
  GET_BRAND_FAIL,
  GET_BRAND_DETAIL_REQUEST,
  GET_BRAND_DETAIL_SUCCESS,
  GET_BRAND_DETAIL_FAIL,
  GET_BRAND_PRODUCTS_REQUEST,
  GET_BRAND_PRODUCTS_SUCCESS,
  GET_BRAND_PRODUCTS_FAIL,
  CLEAR_ERROR,
} from "../constants/brandConstant";

export const brandReducer = (state = { brands: [] }, action) => {
  switch (action.type) {
    case GET_BRAND_REQUEST:
      return {
        loading: true,
        brands: [],
      };

    case GET_BRAND_SUCCESS:
      return {
        loading: false,
        brands: action.payload,
      };
    case GET_BRAND_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const brandDetailReducer = (state = { brandDetail: null }, action) => {
  switch (action.type) {
    case GET_BRAND_DETAIL_REQUEST:
      return {
        loading: true,
        brandDetail: null,
      };

    case GET_BRAND_DETAIL_SUCCESS:
      return {
        loading: false,
        brandDetail: action.payload,
      };
    case GET_BRAND_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const brandProductReducer = (
  state = { brandProducts: null },
  action
) => {
  switch (action.type) {
    case GET_BRAND_PRODUCTS_REQUEST:
      return {
        loading: true,
        brandProducts: null,
      };

    case GET_BRAND_PRODUCTS_SUCCESS:
      return {
        loading: false,
        brandProducts: action.payload.brandProducts,
        productsCount: action.payload.productsCount,
        filteredProductCount: action.payload.filteredProductCount,
        numberOfPages: action.payload.numberOfPages,
        searchNumberOfPages: action.payload.searchNumberOfPages,
      };
    case GET_BRAND_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
