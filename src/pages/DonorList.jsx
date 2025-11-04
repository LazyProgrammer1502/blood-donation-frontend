import React, { useState, useEffect, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import bgLogo from "../assets/life_saver_kust_logo.jpeg";
import Navbar from "../components/NavBar";
import DonorCard from "../components/DonorCard";
import DonorRequestForm from "../components/DonorRequestForm";
import {
  getAllDonors,
  searchDonors,
  markDonorAsDonated,
} from "../api/donorApi";

const DonorList = (
  {
    showRequestForm = true,
    adminFilteredDonors,
    isAdmin = false,
    onEditDonor,
    onDeleteDonor,
  },
  ref
) => {
  const [showPopup, setShowPopup] = useState(showRequestForm); // show popup only if allowed
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [donors, setDonors] = useState([]);

  const fetchDonors = async () => {
    try {
      const response = await getAllDonors();
      const donorArray = response?.donors || response || [];
      setDonors(donorArray || []);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    const handleRefresh = () => fetchDonors();
    window.addEventListener("refreshDonors", handleRefresh);
    return () => window.removeEventListener("refreshDonors", handleRefresh);
  }, []);

  useImperativeHandle(ref, () => ({
    fetchDonors,
  }));
  // For admin, pass filteredDonors from parent
  useEffect(() => {
    if (!showRequestForm && adminFilteredDonors) {
      setFilteredDonors(adminFilteredDonors);
    }
  }, [adminFilteredDonors, showRequestForm]);

  // Disable global page scroll only for request form
  useEffect(() => {
    if (showPopup) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [showPopup]);

  const handleFormSubmit = async (formData) => {
    try {
      const query = {
        blood_group: encodeURIComponent(formData.bloodGroup),
      };

      const response = await searchDonors(query);
      console.log("matching donors", response);
      if (response?.donors?.length > 0) {
        setFilteredDonors(response.donors);
      } else {
        alert("No donors available right now");
      }

      setShowPopup(false);
    } catch (error) {
      console.error("Error searching donors:", error);
      alert("Failed to fetch donors. Please try again.");
    }
  };
  const handleMarkAsDonated = async (id) => {
    try {
      await markDonorAsDonated(id);
      setDonors((prev) =>
        prev.map((d) => (d._id === id ? { ...d, status: "waiting" } : d))
      );
      alert("✅ Donor marked as donated!");
    } catch (error) {
      console.error("Error marking donor as donated:", error);
      alert("❌ Failed to mark donor as donated");
    }
  };

  // For admin view, if showRequestForm is false, show all donors by default
  const donorsToShow = showRequestForm
    ? filteredDonors
    : adminFilteredDonors && adminFilteredDonors.length > 0
    ? adminFilteredDonors
    : donors;

  return (
    <div className="relative flex flex-col bg-linear-to-br from-white via-red-50 to-red-100 h-screen overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex justify-center items-center z-0">
        <img
          src={bgLogo}
          alt="Background Logo"
          className="w-[55%] sm:w-[45%] md:w-[35%] lg:w-[30%] opacity-10"
          style={{
            filter: "brightness(1.15) contrast(1.1) saturate(1.2)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        />
      </div>

      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-linear-to-r from-red-600/90 via-red-500/85 to-red-400/80 backdrop-blur-md shadow-lg border-b border-red-200">
        <Navbar hideSearch={true} isAdmin={false} />
      </div>

      {/* Donor Cards Section (scrollable area only) */}
      <div
        className="relative z-10 px-4 pb-10 max-w-7xl mx-auto w-full overflow-y-auto scrollbar-thin scrollbar-thumb-red-400 scrollbar-track-red-100"
        style={{
          height: "calc(100vh - 80px)", // leaves space for navbar
          marginTop: "80px", // pushes content below navbar
        }}
      >
        {donorsToShow.length > 0 ? (
          <motion.div
            className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                },
              },
            }}
          >
            {donorsToShow.map((donor) => (
              <motion.div
                key={donor._id}
                className="border border-red-100 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white/70 backdrop-blur-sm"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <DonorCard
                  id={donor._id}
                  name={donor.name}
                  bloodGroup={donor.blood_group}
                  department={donor.department_name}
                  regNo={donor.reg_no}
                  phone_no={donor.phone_no}
                  lastDonation={
                    donor.last_donation_date
                      ? new Date(donor.last_donation_date).toLocaleString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )
                      : "N / A"
                  }
                  available={donor.status === "available"}
                  isAdmin={isAdmin}
                  onMarkAsDonated={handleMarkAsDonated}
                  onEdit={() => onEditDonor?.(donor)}
                  onDelete={() => onDeleteDonor?.(donor)}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Please fill the form to find available donors.
          </p>
        )}
      </div>

      {/* Popup Form (only if showRequestForm is true) */}
      {showRequestForm && showPopup && (
        <DonorRequestForm
          onClose={() => setShowPopup(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
};

export default DonorList;
