import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const analyzeImages = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/analyze`, formData, {
    timeout: 60000, // inferensi model bisa lama
  });
  return response.data;
};
