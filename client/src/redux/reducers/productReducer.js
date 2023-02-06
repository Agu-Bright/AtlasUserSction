import {
  GET_TRENDING_PRODUCT_REQUEST,
  GET_TRENDING_PRODUCT_SUCCESS,
  GET_TRENDING_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  GET_PRODUCT_REQUEST,
  GET_PRODUCT_SUCCESS,
  GET_PRODUCT_FAIL,
  GET_RECOMMENDED_PRODUCTS_REQUEST,
  GET_RECOMMENDED_PRODUCTS_SUCCESS,
  GET_RECOMMENDED_PRODUCTS_FAIL,
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

export const allProductsReducer = (state = { products: null }, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        loading: true,
        products: null,
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount,
        filteredProductCount: action.payload.filteredProductCount,
        numberOfPages: action.payload.numberOfPages,
        searchNumberOfPages: action.payload.searchNumberOfPages,
        resperPage: action.payload.resperPage,
      };

    case ALL_PRODUCT_FAIL:
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

export const productDetailReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case GET_PRODUCT_FAIL:
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

export const recommendedProductReducer = (
  state = { brandProducts: null },
  action
) => {
  switch (action.type) {
    case GET_RECOMMENDED_PRODUCTS_REQUEST:
      return {
        loading: true,
        brandProducts: null,
      };

    case GET_RECOMMENDED_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case GET_RECOMMENDED_PRODUCTS_FAIL:
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
