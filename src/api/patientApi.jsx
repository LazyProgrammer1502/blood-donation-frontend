import axios from "axios";

const API_URL = "http://localhost:4000/api/patient";

export const addPatient = async (patientData) => {
  try {
    const response = await axios.post(`${API_URL}/add`, patientData);
    return response.data;
  } catch (error) {
    console.error(
      "Error adding patient:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getAllPatients = async () => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.get(`${API_URL}/get`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const deletePatient = async (id) => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
