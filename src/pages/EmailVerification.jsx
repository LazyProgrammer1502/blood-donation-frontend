import React, { useState } from "react";
import { verifyAdmin } from "../api/adminApi";
import { useNavigate } from "react-router";

const EmailVerification = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !code) {
      alert("please fill both fields");
      return;
    }
    try {
      const res = await verifyAdmin(email, code);
      alert(res.message || "Account verified successfully!");
      navigate("/admin");
    } catch (error) {
      alert(error.message || "Verification failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-b from-red-50 via-white to-red-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 border border-red-200">
        <h2 className="text-2xl font-bold text-red-700 text-center mb-6">
          Verify Your Email
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="email here..."
              className="px-4 py-2 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Verification Code Input */}
          <div className="flex flex-col">
            <label className="text-gray-700 font-medium mb-1">
              Verify Code
            </label>
            <input
              type="text"
              placeholder="enter code here..."
              className="px-4 py-2 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-200 focus:border-red-500 shadow-sm transition-all"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-4 w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all shadow-md"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
