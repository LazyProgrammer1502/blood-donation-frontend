import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import CertificateCards from "../components/CertificateCards";
import bgLogo from "../assets/life_saver_kust_logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import {
  deleteCertificate,
  getAllCertificates,
  addCertificate,
} from "../api/certificateApi";

const AdminCertificates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [certificates, setCertificates] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const isEventsPage = location.pathname === "/adminevents&certificates";
  const isCertificatesPage = location.pathname === "/admincertificates";

  const adminRole = (localStorage.getItem("adminRole") || "")
    .trim()
    .toLowerCase();
  const isAdmin = adminRole === "admin" || adminRole === "super-admin";

  const [newCert, setNewCert] = useState({
    name: "",
    event: "",
    date: "",
    image: null,
  });

  // --- Certificates State ---
  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getAllCertificates();

        if (res && Array.isArray(res)) {
          setCertificates(res);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
      }
    };
    fetchCertificates();
  }, []);

  // --- Add Certificate ---
  const handleAddCertificate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newCert.name);
    formData.append("event", newCert.event);
    formData.append("date", newCert.date);
    formData.append("image", newCert.image);
    try {
      const res = await addCertificate(formData);
      alert("✅ Certificate added successfully!");

      // Refresh certificate list
      const updated = await getAllCertificates();
      setCertificates(updated);

      // Close modal and reset form
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert(error.message || "Failed to add certificate");
    }
  };

  // --- Delete Certificate ---
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this certificate?"
    );
    if (!confirmDelete) return;
    try {
      await deleteCertificate(id);
      alert("Certificate deleted successfully");
      setCertificates((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.error("Error deleting certificate:", error);
      alert(error.message || "Failed to delete certificate");
    }
  };

  // --- Reset Form ---
  const resetForm = () => {
    setNewCert({
      name: "",
      event: "",
      date: "",
      image: null,
    });
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-50 via-white to-red-100 overflow-y-auto">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[60%] md:w-[40%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all text-sm sm:text-base"
            >
              + Add Certificate
            </button>

            <button
              onClick={() => navigate("/adminevents&certificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isEventsPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigate("/admincertificates")}
              className={`px-4 py-2 font-semibold rounded-full transition-all duration-300 text-sm sm:text-base ${
                isCertificatesPage
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Certificates
            </button>
          </div>
        }
      />

      {/* Certificates Grid */}
      <div className="relative z-10 pt-24 pb-16 text-center text-red-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
          {certificates.map((cert) => (
            <CertificateCards
              key={cert._id}
              cert={{
                name: cert.name,
                event: cert.event,
                date: cert.date,
                image: `http://localhost:4000/api/${cert.image}`,
              }}
              isAdmin={true}
              onDelete={() => handleDelete(cert._id)}
            />
          ))}
        </div>
      </div>

      {/* Modal Add Certificate */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <form
            onSubmit={handleAddCertificate}
            className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg transition-all duration-300"
          >
            <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">
              Add New Certificate
            </h2>

            <input
              type="text"
              placeholder="Recipient Name"
              required
              value={newCert.name}
              onChange={(e) => setNewCert({ ...newCert, name: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            <input
              type="text"
              placeholder="Event Name"
              required
              value={newCert.event}
              onChange={(e) =>
                setNewCert({ ...newCert, event: e.target.value })
              }
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            <input
              type="date"
              required
              value={newCert.date}
              onChange={(e) => setNewCert({ ...newCert, date: e.target.value })}
              className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-400 outline-none mb-3 w-full"
            />

            <div className="mb-3">
              <label className="block text-gray-700 font-semibold mb-1">
                Certificate Image
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) =>
                  setNewCert({ ...newCert, image: e.target.files[0] })
                }
                className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer p-2"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-linear-to-r from-red-700 to-red-500 text-white font-semibold rounded-lg hover:scale-105 transition-all"
              >
                Add Certificate
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
