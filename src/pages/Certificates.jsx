import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import bgLogo from "../assets/life_saver_kust_logo.jpeg";
import CertificateCards from "../components/CertificateCards";
import { getAllCertificates } from "../api/certificateApi";
import axios from "axios";

const Certificates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [certificates, setCertificates] = useState([]);
  const isEventsPage = location.pathname === "/events&certificates";
  const isCertificatesPage = location.pathname === "/certificates";

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const res = await getAllCertificates();
        if (res && Array.isArray(res)) {
          setCertificates(res);
        }
      } catch (error) {
        console.error("Error fetching certificates", error);
      }
    };
    fetchCertificates();
  }, []);
  return (
    <div
      className="relative min-h-screen bg-linear-to-b from-red-50 via-white to-red-100 overflow-y-scroll"
      style={{ scrollbarColor: "#dc2626 #fef2f2", scrollbarWidth: "thin" }}
    >
      {/* Background Logo */}
      <div className="fixed inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img
          src={bgLogo}
          alt="Life Saver Logo"
          className="w-[70%] sm:w-[50%] md:w-[35%] lg:w-[30%] object-contain"
        />
      </div>

      {/* Navbar */}
      <Navbar
        hideSearch={true}
        showHamburger={true}
        extraButtons={
          <div className="flex gap-3 items-center">
            <button
              onClick={() => navigate("/events&certificates")}
              className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 ${
                isEventsPage
                  ? "bg-red-600 text-white shadow-lg scale-105 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigate("/certificates")}
              className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 ${
                isCertificatesPage
                  ? "bg-red-600 text-white shadow-lg scale-105 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)]"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Certificates
            </button>
          </div>
        }
      />

      {/* Certificate Cards Section */}
      <div className="relative z-10 pt-24 pb-16 text-center text-red-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 md:px-20">
          {certificates.map((cert) => (
            <CertificateCards
              key={cert._id}
              cert={{
                id: cert._id,
                name: cert.name,
                event: cert.event,
                date: new Date(cert.date).toLocaleString(),
                image: cert.image,
              }}
            />
          ))}
        </div>
      </div>

      {/* Custom Scrollbar */}
      <style jsx="true">{`
        ::-webkit-scrollbar {
          width: 10px;
        }
        ::-webkit-scrollbar-track {
          background: #fef2f2;
        }
        ::-webkit-scrollbar-thumb {
          background: #dc2626;
          border-radius: 6px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
};

export default Certificates;
