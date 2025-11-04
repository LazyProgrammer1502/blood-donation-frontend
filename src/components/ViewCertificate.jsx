import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./NavBar";
import bgLogo from "../assets/life_saver_kust_logo.jpeg";

const ViewCertificate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cert = location.state?.cert;

  // Redirect if no data found
  if (!cert) {
    navigate("/certificates");
    return null;
  }

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-50 via-white to-red-100 overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[60%] md:w-[40%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar hideSearch={true} />

      {/* Certificate Content */}
      <div className="relative z-10 flex flex-col items-center text-center pt-28 pb-16 px-6 text-red-800">
        {/* Certificate Image */}
        <img
          src={cert.image}
          alt={cert.event || "Certificate"}
          className="max-w-[80%] rounded-xl shadow-2xl border border-red-200 mb-8"
        />

        {/* Certificate Details */}
        <h2 className="text-3xl font-bold text-red-700 mb-2">
          {cert.name || "Recipient Name"}
        </h2>
        <p className="text-lg text-gray-700 mb-1">
          Event:{" "}
          <span className="font-semibold">{cert.event || "Event Name"}</span>
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Date:{" "}
          {new Date(cert.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-all duration-300"
        >
          ← Back
        </button>
      </div>
    </div>
  );
};

export default ViewCertificate;
