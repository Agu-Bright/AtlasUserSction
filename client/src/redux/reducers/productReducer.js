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
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODUCT_REVIEW_FAIL,
  PRODUCT_REVIEW_RESET,
  GET_REVIEW_REQUEST,
  GET_REVIEW_SUCCESS,
  GET_REVIEW_FAIL,
  CREATE_PRODUCTS_REQUEST,
  CREATE_PRODUCTS_SUCCESS,
  CREATE_PRODUCTS_FAIL,
  CREATE_PRODUCTS_RESET,
  ADMIN_GET_PRODUCTS_REQUEST,
  ADMIN_GET_PRODUCTS_SUCCESS,
  ADMIN_GET_PRODUCTS_FAIL,
  // NEW_PRODUCTS_REQUEST,
  // NEW_PRODUCTS_SUCCESS,
  // NEW_PRODUCTS_FAIL,
  DELETE_PRODUCTS_REQUEST,
  DELETE_PRODUCTS_SUCCESS,
  DELETE_PRODUCTS_FAIL,
  DELETE_PRODUCTS_RESET,
  UPDATE_PRODUCTS_REQUEST,
  UPDATE_PRODUCTS_SUCCESS,
  UPDATE_PRODUCTS_FAIL,
  UPDATE_PRODUCTS_RESET,
  CLEAR_ERRORS,
} from "../constants/productConstants";

export const createProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case CREATE_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case CREATE_PRODUCTS_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.book,
      };
    case CREATE_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CREATE_PRODUCTS_RESET:
      return {
        ...state,
        success: false,
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

export const deleteProductReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCTS_REQUEST:
    case UPDATE_PRODUCTS_REQUEST:
      return {
        ...state,
        deleting: true,
        reset: false,
      };
    case DELETE_PRODUCTS_SUCCESS:
      return {
        ...state,
        deleting: false,
        isDeleted: action.payload,
      };

    case UPDATE_PRODUCTS_SUCCESS:
      return {
        ...state,
        deleting: false,
        isUpdated: action.payload,
      };
    case DELETE_PRODUCTS_FAIL:
    case UPDATE_PRODUCTS_FAIL:
      return {
        deleting: false,
        error: action.payload,
      };
    case DELETE_PRODUCTS_RESET:
      return {
        ...state,
        isDeleted: false,
        reset: true,
      };
    case UPDATE_PRODUCTS_RESET:
      return {
        ...state,
        isUpdated: false,
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
    case ADMIN_GET_PRODUCTS_REQUEST:
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
    case ADMIN_GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };

    case ALL_PRODUCT_FAIL:
    case ADMIN_GET_PRODUCTS_FAIL:
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

export const productReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return {
        ...state,
        sending: true,
        success: false,
      };
    case PRODUCT_REVIEW_SUCCESS:
      return {
        sending: false,
        success: action.payload,
      };
    case PRODUCT_REVIEW_FAIL:
      return {
        sending: false,
        error: action.payload,
      };
    case PRODUCT_REVIEW_RESET:
      return {
        ...state,
        sending: false,
        success: false,
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

export const getProductReviewReducer = (state = { reviews: null }, action) => {
  switch (action.type) {
    case GET_REVIEW_REQUEST:
      return {
        loading: true,
      };
    case GET_REVIEW_SUCCESS:
      return {
        loading: false,
        reviews: action.payload,
      };
    case GET_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
