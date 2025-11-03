import axios from "axios";

const API_URL = "https://blood-donation-backend-4000.up.railway.app/api/donors";

export const getAllDonors = async () => {
  const response = await axios.get(`${API_URL}/get`);
  return response.data;
};

export const searchDonors = async (query) => {
  try {
    const params = { ...query };
    if (params.blood_group) {
      params.blood_group = encodeURIComponent(params.blood_group);
    }
    const response = await axios.get(
      `${API_URL}/search?blood_group=${params.blood_group}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error searching donors:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const adminSearchDonors = async (query) => {
  try {
    const { blood_group, reg_no, departmant_name } = query;
    const response = await axios.get(`${API_URL}/search`, {
      params: {
        blood_group,
        reg_no,
        departmant_name,
      },
    });
    return response.data.donors;
  } catch (error) {
    console.error("Error fetching donors:", error);
    throw error.response?.data || { message: "Search failed" };
  }
};

export const addDonor = async (donorData) => {
  try {
    const res = await axios.post(`${API_URL}/add`, donorData);
    return res.data;
  } catch (error) {
    console.error("Error adding donor:", error);
    throw error.response?.data || error;
  }
};

export const updateDonor = async (id, donorData) => {
  try {
    const res = await axios.put(`${API_URL}/update/${id}`, donorData);
    return res.data;
  } catch (error) {
    console.error("Error updating donor:", error);
    throw error.response?.data || { message: "Update failed" };
  }
};

export const deleteDonor = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting donor:", error);
    throw error.response?.data || { message: "Delete failed" };
  }
};

export const markDonorAsDonated = async (id) => {
  const token = localStorage.getItem("adminToken");
  const res = await axios.put(
    `${API_URL}/donated/${id}`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return res.data;
};
