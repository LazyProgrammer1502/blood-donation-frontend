import React from "react";
import { useNavigate } from "react-router-dom";

const DonerButton = ({ text = "View Donors", path = "/search-donor" }) => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-8 relative z-20">
      <button
        className="px-6 py-3 bg-linear-to-r from-red-700 to-red-500 text-white font-semibold text-lg rounded-full shadow-lg 
                   hover:from-red-600 hover:to-red-400 hover:scale-105 hover:shadow-2xl 
                   transition-all duration-300 ease-in-out focus:ring-4 focus:ring-red-300 cursor-pointer"
        onClick={() => navigate(path)}
      >
        {text}
      </button>
    </div>
  );
};

export default DonerButton;
