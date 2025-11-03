import axios from "axios";

const API_URL = "https://blood-donation-backend-4000.up.railway.app/api/events";

export const getAllEvents = async () => {
  try {
    const { data } = await axios.get(`${API_URL}`);
    return data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error.response?.data || error.message;
  }
};

export const createEvent = async (formData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.post(`${API_URL}/`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error adding event:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

export const updateEvent = async (id, updatedData) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.put(`${API_URL}/${id}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error.response?.data || { message: "Failed to update event" };
  }
};

export const getEventById = async (id) => {
  try {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    throw error.response?.data || error.message;
  }
};

export const deleteEvent = async (id) => {
  try {
    const token = localStorage.getItem("adminToken");
    const res = await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error.response?.data || { message: "Failed to delete event" };
  }
};
