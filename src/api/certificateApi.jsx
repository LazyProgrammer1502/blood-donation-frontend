import axios from "axios";

const API_URL = "http://localhost:4000/api/certificates";

export const getAllCertificates = async () => {
  try {
    const res = await axios.get(`${API_URL}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching certificates:", err);
    return [];
  }
};

export const addCertificate = async (formData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.post(`${API_URL}/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error adding certificate:", err);
    throw err.response?.data || { message: "Failed to add certificate" };
  }
};

export const deleteCertificate = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting certificate:", error);
    throw error.response?.data || { message: "Failed to delete certificate" };
  }
};
