// export const BASE_URL = "http://localhost:3002";
export const BASE_URL = "https://picklebite-backend.onrender.com";
export const API = {
  LOGIN: `${BASE_URL}/api/auth/login`,
  ADMIN_LOGIN: `${BASE_URL}/api/auth/admin-login`,

  REGISTER: `${BASE_URL}/api/auth/signup`,
  PROFILE: `${BASE_URL}/api/users/profile`,
  PLACE_ORDER: `${BASE_URL}/api/orders/place`,
  GET_ORDERS: `${BASE_URL}/api/orders/my-orders`,

  CREATE_PAYMENT: `${BASE_URL}/api/payment/create-order`,
  VERIFY_PAYMENT: `${BASE_URL}/api/payment/verify`,

  CART: `${BASE_URL}/api/cart`,
  ADD_CART: `${BASE_URL}/api/cart/add`,
  REMOVE_CART: `${BASE_URL}/api/cart/remove`,

  ADD_COMMENT: `${BASE_URL}/api/comments/add`,
  GET_COMMENTS: `${BASE_URL}/api/comments`,

  GET_PRODUCTS: `${BASE_URL}/api/products`,
  UPDATE_ORDER_STATUS: `${BASE_URL}/api/orders/update-status`,

  CONTACT: `${BASE_URL}/api/contact`,

  /* ================= SHIPPING ================= */

  SHIPPING_RATE: `${BASE_URL}/api/shipping-rate`,
  /* ================= ADMIN ================= */

  ADMIN_DASHBOARD: `${BASE_URL}/api/admin/dashboard`,
  ADMIN_USERS: `${BASE_URL}/api/admin/users`,
  ADMIN_ANALYTICS: `${BASE_URL}/api/admin/analytics`,
  ADMIN_UPDATE_ORDER: `${BASE_URL}/api/admin/order`,

  EXPENSES: `${BASE_URL}/api/admin/expenses`,
  ADD_EXPENSE: `${BASE_URL}/api/admin/expenses`,
};
