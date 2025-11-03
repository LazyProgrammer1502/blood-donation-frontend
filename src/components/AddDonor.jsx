import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AddDonor = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    department_name: "",
    phone_no: "",
    reg_no: "",
    blood_group: "",
  });

  //  Prefill when editing donor
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isEditMode = Boolean(initialData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="bg-white/15 backdrop-blur-lg border border-white/30 rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/80 hover:text-red-400 transition"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-red-500 mb-5 text-center">
          {isEditMode ? "Edit Donor" : "Add New Donor"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Donor Name */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Donor Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Full name..."
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Department
            </label>
            <input
              type="text"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              required
              placeholder="Department name..."
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Contact No */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Contact No
            </label>
            <input
              type="text"
              name="phone_no"
              value={formData.phone_no}
              onChange={handleChange}
              required
              placeholder="03XXXXXXXXX"
              inputMode="tel"
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Registration No */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Registration No
            </label>
            <input
              type="text"
              name="reg_no"
              value={formData.reg_no}
              onChange={handleChange}
              required
              placeholder="Registration number..."
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              value={formData.blood_group}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
                <option key={bg} value={bg} className="text-black">
                  {bg}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {isEditMode ? "Update Donor" : "Add Donor"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddDonor;
