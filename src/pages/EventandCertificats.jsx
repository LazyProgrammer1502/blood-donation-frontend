import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/NavBar";
import bgLogo from "../assets/life_saver_kust_logo.jpeg";
import EventCards from "../components/EventCards";
import { getAllEvents } from "../api/eventApi";

const EventsAndCertificates = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [eventsData, setEventsData] = useState([]);
  const isEventsPage = location.pathname === "/events&certificates";
  const isCertificatesPage = location.pathname === "/certificates";

  useEffect(() => {
    if (location.pathname === "/eventsandcertificates") {
      navigate("/events&certificates", { replace: true });
    }
  }, [location.pathname, navigate]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await getAllEvents();

        setEventsData(response || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-50 via-white to-red-100 overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-100">
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
                  ? "bg-red-600 text-white shadow-lg scale-105"
                  : "bg-white text-red-600 border border-red-400 hover:bg-red-100 hover:scale-105"
              }`}
            >
              Events
            </button>

            <button
              onClick={() => navigate("/certificates")}
              className={`px-5 py-2 font-semibold rounded-full transition-all duration-300 ${
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

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-16 text-center text-red-700 px-6 md:px-20">
        {isEventsPage ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
            {eventsData.map((event) => (
              <EventCards key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold mb-6">
              Certificates
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto mb-10">
              Browse the certificates of appreciation and honor awarded to our
              donors, volunteers, and supporters.
            </p>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
              {certificatesData.map((cert) => (
                <EventCards key={cert.id} event={cert} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventsAndCertificates;
