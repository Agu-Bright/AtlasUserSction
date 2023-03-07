export const SET_DASHBOARD = "SET_DASHBOARD";
export const SET_ORDERS = "SET_ORDERS";
export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const SET_MY_BRAND = "SET_MY_BRAND";
export const highlightReducer = (state = { dashboard: false }, action) => {
  switch (action.type) {
    case SET_DASHBOARD:
      return {
        dashboard: true,
        orders: false,
        products: false,
        customers: false,
      };

    case SET_ORDERS:
      return {
        dashboard: false,
        orders: true,
        products: false,
        customers: false,
      };
    case SET_PRODUCTS:
      return {
        dashboard: false,
        orders: false,
        products: true,
        customers: false,
      };
    case SET_CUSTOMERS:
      return {
        dashboard: false,
        orders: false,
        products: false,
        customers: true,
      };
    case SET_MY_BRAND:
      return {
        dashboard: false,
        orders: false,
        products: false,
        customers: false,
        myBrand: true,
      };

    default:
      return state;
  }
};
