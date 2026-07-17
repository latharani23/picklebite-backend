import axios from "axios";
import { API } from "../constants/const";

// Get all WhatsApp Orders
export const getWhatsappOrders = async () => {
  const response = await axios.get(API.WHATSAPP_ORDERS);
  return response.data;
};

// Get Single Order
export const getWhatsappOrder = async (id) => {
  const response = await axios.get(`${API.WHATSAPP_ORDERS}/${id}`);
  return response.data;
};

// Add Order
export const createWhatsappOrder = async (data) => {
  const response = await axios.post(API.ADD_WHATSAPP_ORDER, data);
  return response.data;
};

// Update Order
export const updateWhatsappOrder = async (id, data) => {
  const response = await axios.put(`${API.WHATSAPP_ORDERS}/${id}`, data);
  return response.data;
};

// Delete Order
export const deleteWhatsappOrder = async (id) => {
  const response = await axios.delete(`${API.WHATSAPP_ORDERS}/${id}`);
  return response.data;
};
