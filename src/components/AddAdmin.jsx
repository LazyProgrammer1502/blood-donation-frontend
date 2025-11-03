import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Eye, EyeOff } from "lucide-react";

const AddAdmin = ({ onClose, onSubmit, initialData = null }) => {
  const isEditMode = !!initialData; // Determine if editing
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    reg_no: "",
    password: "",
    role: "admin",
  });

  //  Prefill form when editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        reg_no: initialData.reg_no || "",
        role: initialData.role || "admin",
      });
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
          {isEditMode ? "Edit Admin" : "Add New Admin"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Name
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

          {!isEditMode && (
            <div>
              <label className="block text-red-400 font-semibold text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="example@domain.com"
                className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          )}

          {/* Registration Number */}
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

          {!isEditMode && (
            <div className="relative">
              <label className="block text-red-400 font-semibold text-sm mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="********"
                className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              {/* Eye toggle button */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/15 text-white/70 hover:text-red-400 transition-colors"
                aria-label="Toggle password visibility"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          )}

          {/* Role */}
          <div>
            <label className="block text-red-400 font-semibold text-sm mb-1">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg bg-transparent border border-white/40 text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option className="text-black" value="admin">
                Admin
              </option>
              <option className="text-black" value="super-admin">
                Super Admin
              </option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-3 bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-2 rounded-lg transition-all"
          >
            {isEditMode ? "Save Changes" : "Add Admin"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddAdmin;
