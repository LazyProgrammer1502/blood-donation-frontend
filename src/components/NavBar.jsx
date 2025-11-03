import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bgLogo from "../assets/life_saver_kust_logo.png";

const Navbar = ({
  hideSearch = false,
  extraButtons = null,
  showHamburger = false,
  onSearchChange,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearchChange) onSearchChange(value); // 👈 pass it up instantly
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 h-16 bg-white/85 backdrop-blur-md shadow-md border-b border-red-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-3">
        {/*  Logo + Title */}
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={bgLogo}
            alt="Logo"
            className="w-10 h-10 object-contain rounded-full shadow-sm border border-red-300 shrink-0"
          />
          <h1 className="text-lg sm:text-xl font-semibold text-red-700 tracking-wide truncate">
            MLT LIFE SAVER KUST
          </h1>
        </div>

        {/*  Search (visible only on sm and up) */}
        {!hideSearch && (
          <div className="hidden sm:flex items-center justify-center flex-1 px-4">
            <div className="relative w-full max-w-2xl">
              <input
                type="text"
                placeholder="Search by name, reg no, or blood group..."
                className="w-full px-4 sm:px-5 py-2 rounded-full border border-red-300 focus:ring-4 focus:ring-red-200 focus:border-red-500 outline-none text-gray-700 placeholder-gray-400 shadow-sm transition-all duration-300"
                aria-label="Search donors"
                value={searchValue}
                onChange={handleChange}
              />
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                aria-label="Search"
                onClick={() => {
                  if (onSearch && searchInput.trim() !== "") {
                    onSearch(searchInput.trim()); // ✅ call parent handler
                    setMobileSearchOpen(false);
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* desktop buttons + mobile toggles */}
        <div className="flex items-center gap-3">
          {/* Desktop actions (visible on sm and up) */}
          <div className="hidden sm:flex items-center gap-3">
            {extraButtons}
          </div>

          {/* Mobile toggles only when showHamburger is true */}
          {showHamburger && (
            <>
              {!hideSearch && (
                <button
                  onClick={() => {
                    setMobileSearchOpen((s) => !s);
                    if (!mobileSearchOpen) setMobileOpen(false);
                  }}
                  className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
                  aria-label="Toggle search"
                >
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15z"
                    />
                  </svg>
                </button>
              )}

              <button
                onClick={() => {
                  setMobileOpen((s) => !s);
                  if (!mobileOpen) setMobileSearchOpen(false);
                }}
                className="sm:hidden p-2 rounded-full hover:bg-gray-100 transition"
                aria-label="Open menu"
              >
                <svg
                  className="w-5 h-5 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile panels visible only when showHamburger is true */}
      {showHamburger && (
        <div className="sm:hidden">
          <AnimatePresence>
            {mobileSearchOpen && !hideSearch && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="px-4 pb-3 bg-white/90 backdrop-blur-md border-b border-red-100"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by name, reg no, or blood group..."
                    className="w-full px-4 py-2 rounded-full border border-red-300 focus:ring-2 focus:ring-red-200 outline-none text-gray-700 placeholder-gray-400"
                    aria-label="Mobile search"
                    value={searchValue}
                    onChange={handleChange}
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-linear-to-r from-red-600 to-red-500 text-white font-semibold px-3 py-1.5 rounded-full shadow-md hover:scale-95 transition">
                    Search
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="px-4 pb-4 bg-white/90 backdrop-blur-md border-b border-red-100"
              >
                <div className="flex flex-col gap-3 pt-3">
                  {extraButtons ? (
                    <div className="flex flex-col gap-3">{extraButtons}</div>
                  ) : (
                    <div className="text-gray-600">No actions</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
