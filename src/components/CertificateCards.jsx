import React from "react";
import { useNavigate } from "react-router-dom";

const CertificateCards = ({ cert, isAdmin = false, onDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-red-100 hover:shadow-2xl hover:scale-105 transition-all duration-300">
      {/* Certificate Image */}
      <img
        src={cert?.image}
        alt={cert?.event || "Certificate"}
        className="w-full h-48 object-cover"
      />

      {/* Certificate Details */}
      <div className="p-4 text-left">
        <h2 className="text-lg font-bold text-red-700">{cert?.name}</h2>
        <p className="text-gray-700 text-sm">{cert?.event}</p>
        <p className="text-gray-500 text-xs mt-1">
          {new Date(cert?.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Buttons */}
        <div className="flex gap-2 mt-3">
          {/* View Certificate Button */}
          <button
            onClick={() => navigate("/viewcertificate", { state: { cert } })}
            className="flex-1 bg-red-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-all duration-300"
          >
            View Certificate
          </button>

          {/* Delete Button (Visible only for Admins) */}
          {isAdmin && (
            <button
              onClick={() => onDelete && onDelete(cert.id)}
              className="px-3 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 text-sm font-semibold transition-all duration-300"
            >
              🗑 Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateCards;
