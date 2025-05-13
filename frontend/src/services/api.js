import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api"; // 🔹 Backend URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error in registerUser:", error);
    throw error;
  }
};

// Add a new property
export const addProperty = async (propertyData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/add-property`,
      propertyData
    );
    return response.data;
  } catch (error) {
    console.error("Error in addProperty:", error);
    throw error;
  }
};

// Get all lands
export const getLandList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/land-list`);
    return response.data;
  } catch (error) {
    console.error("Error in getLandList:", error);
    throw error;
  }
};

// Search for a property
export const searchProperty = async (propertyId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/search-property/${propertyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error in searchProperty:", error);
    throw error;
  }
};
