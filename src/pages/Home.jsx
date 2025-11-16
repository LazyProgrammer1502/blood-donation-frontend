import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImage from "../assets/Kust_bg.jpg";
import DonerButton from "../components/DonerButton";

const Home = () => {
  return (
    <div
      className="relative min-h-screen bg-center bg-cover flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 md:px-10 lg:px-16 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        filter: "brightness(1.1) contrast(1.15) saturate(1.3)",
      }}
    >
      {/* Warm cinematic gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-br from-red-900/80 via-black/60 to-amber-800/50 mix-blend-multiply backdrop-blur-[1px] pointer-events-none"></div>

      {/* Animated Text Content */}
      <motion.div
        className="relative z-10 max-w-4xl w-full flex flex-col items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 tracking-tight 
                     bg-clip-text text-transparent bg-linear-to-r from-white via-red-100 to-amber-200
                     drop-shadow-[0_4px_6px_rgba(0,0,0,0.55)] leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Be a Hero. Save a Life.
        </motion.h1>

        <motion.p
          className="mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-gray-100 
                     bg-white/10 backdrop-blur-md p-4 sm:p-6 md:p-8 rounded-xl shadow-lg 
                     leading-relaxed md:leading-loose max-w-2xl text-justify sm:text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to the{" "}
          <span className="font-semibold text-red-200">
            KUST Blood Donor Website!
          </span>{" "}
          — where compassion meets purpose. Whether you're a first-time donor or
          a regular lifesaver, your contribution keeps our community strong.
          Find your next donation opportunity and make a difference today.
        </motion.p>
      </motion.div>

      {/* Animated Buttons */}
      <motion.div
        className="relative z-10 mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4 sm:gap-6 
                   justify-center items-center w-full sm:w-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <DonerButton text="View Donors" path="/search-donor" />
        <DonerButton text="Events & Certificates" path="/events&certificates" />
      </motion.div>

      {/* Footer Text */}
      <motion.p
        className="text-xs sm:text-sm text-gray-200 mt-8 sm:mt-10 opacity-80 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
      >
        Together, we make saving lives possible.
      </motion.p>

      <motion.div
        className="absolute bottom-4 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
      >
        <Link
          to="/founder"
          className="text-xs sm:text-sm text-red-200 opacity-80 hover:text-white transition-colors duration-300"
        >
          Founder
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
