import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); //  visibility toggle

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin({ email, password });
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
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="
          w-full max-w-[420px]
          bg-white/10 backdrop-blur-md border border-white/20
          rounded-2xl shadow-2xl 
          p-6 sm:p-8
          flex flex-col items-center
        "
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6 tracking-wide">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Email */}
          <div>
            <label className="block text-red-400 text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-2.5 text-sm rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="relative">
            <label className="block text-red-400 text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="off"
              className="w-full px-4 py-2.5 pr-10 text-sm rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            {/* Eye toggle button */}
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-white/70 hover:text-red-400 transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-4 py-2.5 rounded-lg text-base font-semibold bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white shadow-md transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AdminLogin;
