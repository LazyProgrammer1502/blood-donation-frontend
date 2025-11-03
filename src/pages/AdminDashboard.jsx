import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import AdminLogin from "../components/AdminLogin";
import DonorList from "../pages/DonorList";
import AddDonor from "../components/AddDonor";
import { loginAdmin } from "../api/adminApi";

import { jwtDecode } from "jwt-decode";
import {
  getAllDonors,
  addDonor,
  deleteDonor,
  updateDonor,
} from "../api/donorApi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminRole, setAdminRole] = useState(null);
  const [showAddDonor, setShowAddDonor] = useState(false);
  const [editingDonor, setEditingDonor] = useState(null);
  const [donors, setDonors] = useState([]);
  const [adminFilteredDonors, setAdminFilteredDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Fetch donors once
  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await getAllDonors();
      setDonors(res);
      setAdminFilteredDonors(res);
    } catch (error) {}
  };

  // ✅ Filter logic (blood_group, reg_no, or department)
  useEffect(() => {
    const term1 = searchTerm.trim();
    if (!term1) {
      setAdminFilteredDonors(donors);
    } else {
      const term = searchTerm.toLowerCase();
      const filtered = donors.filter(
        (d) =>
          d.blood_group?.toLowerCase().includes(term) ||
          d.reg_no?.toLowerCase().includes(term) ||
          d.department?.toLowerCase().includes(term)
      );
      setAdminFilteredDonors(filtered);
    }
  }, [searchTerm, donors]);

  //  Persist login using localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("adminRole");
    if (storedLogin === "true" && storedRole) {
      setIsLoggedIn(true);
      setAdminRole(storedRole);
    }
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  const handleLogin = async ({ email, password }) => {
    try {
      const res = await loginAdmin(email, password);
      const token = res.token;
      if (!token) throw new Error("Token missing in response");
      localStorage.setItem("adminToken", token);
      localStorage.setItem("isLoggedIn", "true");
      const decoded = jwtDecode(token);
      setIsLoggedIn(true);
      setAdminRole(decoded.role);
      localStorage.setItem("adminRole", decoded.role);
    } catch (error) {
      alert(error.message || "Invalid credentials");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setAdminRole(decoded.role);
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.clear();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setAdminRole(null);
  };

  const handleAddDonor = async (newDonor) => {
    try {
      if (editingDonor) {
        await updateDonor(editingDonor._id, newDonor);
        alert("Donor updated successfully!");
      } else {
        await addDonor(newDonor);
        alert("✅ Donor added successfully!");
      }

      setShowAddDonor(false);
      setEditingDonor(null);
      fetchDonors();
      window.dispatchEvent(new Event("refreshDonors"));
    } catch (error) {
      alert(error.message || "Failed to add donor");
    }
  };
  const handleEditDonor = (donor) => {
    setEditingDonor(donor);
    setShowAddDonor(true);
  };

  const handleDeleteDonor = async (donor) => {
    if (window.confirm(`Are you sure you want to delete ${donor.name}?`)) {
      try {
        await deleteDonor(donor._id);
        alert("Donor deleted successfully!");
        fetchDonors();
        window.dispatchEvent(new Event("refreshDonors"));
      } catch (error) {
        alert(error.message || "Failed to delete donor.");
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-100 via-red-50 to-white overflow-hidden">
      {!isLoggedIn ? (
        <AdminLogin onLogin={handleLogin} />
      ) : (
        <>
          <Navbar
            hideSearch={false}
            showHamburger={true}
            onSearchChange={(term) => setSearchTerm(term)}
            extraButtons={
              <div className="flex flex-wrap gap-3">
                {adminRole === "superAdmin" && (
                  <button
                    onClick={() => navigate("/manage-admins")}
                    className="px-4 py-2 bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
                  >
                    Manage Admins
                  </button>
                )}

                {/*  Events & Certificates (With CRUD Operations For both Admin and Super Admin) */}
                <button
                  onClick={() => navigate("/adminevents&certificates")}
                  className="px-4 py-2 bg-linear-to-r from-red-600 to-red-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
                >
                  Events & Certificates
                </button>

                <button
                  onClick={() => navigate("/admin/patients")}
                  className="px-4 py-2 bg-linear-to-r from-red-600 to-red-400 text-white font-semibold rounded-lg shadow hover:scale-105 transition-all"
                >
                  Patients
                </button>

                {/* Add Donor Button */}
                <button
                  onClick={() => {
                    setEditingDonor(null);
                    setShowAddDonor(true);
                  }}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
                >
                  + Add Donor
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Logout
                </button>
              </div>
            }
          />

          <div
            className="relative z-10 px-6 sm:px-10 bottom-20"
            style={{ height: "calc(100vh - 80px)", marginTop: "80px" }}
          >
            <DonorList
              hideSearch={false}
              showRequestForm={false}
              isAdmin={true}
              adminFilteredDonors={adminFilteredDonors || donors}
              onEditDonor={handleEditDonor}
              onDeleteDonor={handleDeleteDonor}
            />
          </div>

          {showAddDonor && (
            <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/50">
              <div className="rounded-lg shadow-lg p-6 w-full max-w-lg bg-white">
                <AddDonor
                  onClose={() => {
                    setShowAddDonor(false);
                    setEditingDonor(null);
                  }}
                  onSubmit={handleAddDonor}
                  initialData={editingDonor}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
