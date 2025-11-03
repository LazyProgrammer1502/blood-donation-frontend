import axios from "axios";

const BASE_URL = "http://localhost:4000/api/admin";

export const registerAdmin = async (adminData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.post(`${BASE_URL}/register`, adminData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw (
      error.response?.data || {
        message: "Failed to register admin. Please try again.",
      }
    );
  }
};

export const loginAdmin = async (email, password) => {
  try {
    const res = await axios.post(`${BASE_URL}/login`, { email, password });
    if (res.data?.token) {
      localStorage.setItem("adminToken", res.data.token);
    }
    return res.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data || { message: "Login failed" };
  }
};

export const logoutAdmin = async () => {
  localStorage.removeItem("token");
};

export const verifyAdmin = async (email, code) => {
  try {
    const res = await axios.post(`${BASE_URL}/verify`, { email, code });
    return res.data;
  } catch (err) {
    console.error("Error verifying admin:", err);
    throw err.response?.data || { message: "Verification failed" };
  }
};

export const getAllAdmins = async () => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await axios.get(`${BASE_URL}/get`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (error) {}
};

export const updateAdmin = async (id, adminData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.put(`${BASE_URL}/update/${id}`, adminData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating admin:", error);
    throw error.response?.data || { message: "Failed to update admin" };
  }
};

export const updateAdminPassword = async (id, newPassword) => {
  try {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      throw new Error("No token found");
    }
    const res = await axios.put(
      `${BASE_URL}/password/${id}`,
      {
        newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error resetting admin password:", error);
    throw error.response?.data || { message: "Password reset failed" };
  }
};

export const deleteAdmin = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.delete(`${BASE_URL}/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (err) {
    console.error("Error deleting admin:", err);
    throw err.response?.data || { message: "Failed to delete admin" };
  }
};
