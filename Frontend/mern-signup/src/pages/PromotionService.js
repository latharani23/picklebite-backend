import axios from "axios";
import { API } from "../constants/const";

export const getPromotions = async () => {
  const response = await axios.get(API.PROMOTIONS);
  return response.data;
};

export const getPromotion = async (id) => {
  const response = await axios.get(`${API.PROMOTIONS}/${id}`);
  return response.data;
};

export const createPromotion = async (data) => {
  const response = await axios.post(API.ADD_PROMOTION, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const updatePromotion = async (id, data) => {
  const response = await axios.put(`${API.PROMOTIONS}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const deletePromotion = async (id) => {
  const response = await axios.delete(`${API.PROMOTIONS}/${id}`);
  return response.data;
};
