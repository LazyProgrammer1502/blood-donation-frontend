import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import AddAdmin from "../components/AddAdmin";
import bgLogo from "../assets/life_saver_kust_logo.png";
import {
  getAllAdmins,
  deleteAdmin,
  registerAdmin,
  updateAdminPassword,
  updateAdmin,
} from "../api/adminApi";

const ManageAdmins = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [adminRole, setAdminRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [newPassword, setNewPassword] = useState("");

  //  Restore login and role from localStorage
  useEffect(() => {
    const storedLogin = localStorage.getItem("isLoggedIn");
    const storedRole = localStorage.getItem("adminRole");
    console.log("Stored login check:", storedLogin, storedRole);
    if (!storedLogin || storedLogin !== "true") {
      navigate("/admin"); // redirect to login if not logged in
    } else {
      setIsLoggedIn(true);
      setAdminRole(storedRole);
      fetchAdmins();
    }
  }, [navigate]);

  const fetchAdmins = async () => {
    try {
      const res = await getAllAdmins();

      setAdmins(res);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const handleAddAdmin = async (formData) => {
    try {
      const adminData = {
        name: formData.name,
        email: formData.email,
        reg_no: formData.reg_no,
        role: formData.role,
        ...(formData.password && { password: formData.password }),
      };
      if (editingAdmin) {
        const res = await updateAdmin(editingAdmin._id, adminData);
        alert(res.message || "✅ Admin updated successfully!");
        setAdmins((prev) =>
          prev.map((a) => (a._id === editingAdmin._id ? res.admin : a))
        );
      } else {
        const res = await registerAdmin(adminData);
        alert(res.message || "✅ Admin registered successfully!");
      }

      setShowAddAdmin(false);
      setEditingAdmin(null);
      fetchAdmins();
    } catch (error) {
      console.error("Add admin error:", error);
      alert(error.message || "❌ Failed to add admin");
    }
  };

  const handleResetPassword = (admin) => {
    setSelectedAdmin(admin);
    setNewPassword("");
    setShowResetModal(true);
  };

  const handleEditAdmin = (admin) => {
    setEditingAdmin(admin);
    setShowAddAdmin(true);
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await deleteAdmin(id);
      alert("Admin deleted successfully!");
      setAdmins((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Delete admin error:", error);
      alert(error.message || "Failed to delete admin");
    }
  };

  if (!isLoggedIn) return null; // prevent rendering if not logged in

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-100 via-red-50 to-white overflow-hidden">
      {/*  Background Logo */}
      <div className="fixed inset-0 flex justify-center items-center opacity-10 pointer-events-none z-0">
        <img
          src={bgLogo}
          alt="Life Saver Logo"
          className="w-[70%] sm:w-[50%] md:w-[35%] lg:w-[30%] object-contain"
        />
      </div>

      {/*  Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex items-center gap-3 ml-auto pr-4">
            {adminRole === "superAdmin" && (
              <button
                onClick={() => setShowAddAdmin(true)}
                className="bg-linear-to-r from-red-600 to-red-500 text-white px-5 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-all duration-300 shadow-md"
              >
                + Add Admin
              </button>
            )}
          </div>
        }
      />

      {/* Main Content */}
      <div className="relative z-10 pt-28 px-6 sm:px-10 max-w-6xl mx-auto">
        {/* Admin Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {admins.map((admin) => (
            <div
              key={admin._id}
              className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300"
            >
              <h2>
                NAME:{" "}
                <span className=" font-semibold text-red-700">
                  {admin.name}
                </span>
              </h2>
              <p>
                EMAIL:{" "}
                <span className="text-gray-600 text-sm">{admin.email}</span>{" "}
              </p>
              <p>
                Reg No:{" "}
                <span className="text-gray-500 text-sm ">{admin.reg_no}</span>{" "}
              </p>
              <p>
                ROLE:{" "}
                <span className="text-gray-500 text-sm">{admin.role}</span>
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => handleEditAdmin(admin)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleResetPassword(admin)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-full hover:bg-red-600 transition-all"
                >
                  Change Password
                </button>
                <button
                  onClick={() => handleDeleteAdmin(admin._id)}
                  className="px-3 py-1 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Admin Modal */}
      {showAddAdmin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <AddAdmin
              onClose={() => {
                setShowAddAdmin(false);
                setEditingAdmin(null);
              }}
              onSubmit={handleAddAdmin}
              initialData={editingAdmin}
            />
          </div>
        </div>
      )}

      {/* Change Password */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">
              Reset Password
            </h2>
            <p className="text-gray-600 text-center mb-3">
              Reset password for <strong>{selectedAdmin?.name}</strong>
            </p>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  // Call API (will add in step 5)
                  await updateAdminPassword(selectedAdmin._id, newPassword);
                  alert("✅ Password reset successfully!");
                  setShowResetModal(false);
                } catch (error) {
                  console.error("Error resetting password:", error);
                  alert("❌ Failed to reset password");
                }
              }}
              className="flex flex-col gap-4"
            >
              <input
                type="password"
                placeholder="Enter new password..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-300"
              />

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowResetModal(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAdmins;
