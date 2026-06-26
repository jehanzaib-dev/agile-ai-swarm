import axios from "axios";

// Configure a central base URL pointing directly to your local Express server
const API = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Sends a feature concept to the multi-agent AI swarm backend
 * @param {string} prompt - The raw project feature description
 * @returns {Promise<object>} The unified agile workspace JSON dataset
 */
export const generateAgilePlanCall = async (prompt) => {
  const response = await API.post("/api/v1/agile/generate", { prompt });
  return response.data;
};