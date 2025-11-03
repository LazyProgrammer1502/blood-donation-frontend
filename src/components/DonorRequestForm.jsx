import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { addPatient } from "../api/patientApi";

const DonorRequestForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    patientName: "",
    contactNo: "",
    relation: "",
    bloodGroup: "",
    age: "",
    gender: "",
    caseType: "",
    hospital: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.patientName,
      relation: formData.relation,
      blood_group: formData.bloodGroup,
      age: formData.age,
      gender: formData.gender,
      case_type: formData.caseType,
      hospital_name: formData.hospital,
      phone_no: formData.contactNo,
    };
    try {
      const result = await addPatient(payload);

      await onSubmit(formData);
      onClose();
    } catch (error) {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3"
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.22, ease: "easeOut" }}
        /*responsive sizing so modal always fits without scrollbars */
        className="
          bg-white/12 backdrop-blur-lg border border-white/20
          rounded-xl shadow-2xl
          w-full max-w-[520px]       
          sm:max-w-[600px]
          md:max-w-[640px]
          mx-auto
          p-4                      
          sm:p-5
          md:p-6
        "
      >
        {/* Header + optional close */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg sm:text-xl font-semibold text-red-600">
            Patient Information Form
          </h2>
        </div>

        {/* Form body: use a container that will scale content instead of forcing scroll */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 sm:gap-4"
          /* Prevent form from getting too tall */
        >
          {/* Patient Name */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Patient Name
            </label>
            <input
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Full name"
              autoComplete="off"
              className="w-full px-1 py-1 sm:px-1 sm:py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Contact No */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Contact No
            </label>
            <input
              name="contactNo"
              value={formData.contactNo}
              onChange={handleChange}
              required
              placeholder="03XXXXXXXXX"
              inputMode="tel"
              autoComplete="off"
              className="w-full px-1 py-1 sm:px-1 sm:py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Relation */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Relation
            </label>
            <input
              name="relation"
              value={formData.relation}
              onChange={handleChange}
              required
              placeholder="Father, Mother, Self, etc."
              autoComplete="off"
              className="w-full px-1 py-1 sm:px-1 sm:py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Blood group */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
              required
              className="w-full px-1 py-1 sm:px-1 sm:py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="" className="text-black">
                Select Blood Group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((b) => (
                <option key={b} value={b} className="text-black">
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Age & Gender in a row on larger screens, stacked on tiny screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-red-500 text-sm font-medium mb-1">
                Age
              </label>
              <input
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                type="number"
                min="0"
                placeholder="Age"
                className="w-full px-1 py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>

            <div>
              <label className="block text-red-500 text-sm font-medium mb-1">
                Gender
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                {["Male", "Female", "Other"].map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      required
                      className="w-4 h-3"
                    />
                    <span className="select-none">{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Case Type */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Case Type
            </label>
            <input
              name="caseType"
              value={formData.caseType}
              onChange={handleChange}
              required
              placeholder="Brief case details"
              autoComplete="off"
              className="w-full px-1 py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Hospital */}
          <div>
            <label className="block text-red-500 text-sm font-medium mb-1">
              Hospital Name
            </label>
            <input
              name="hospital"
              value={formData.hospital}
              onChange={handleChange}
              required
              placeholder="Hospital Name"
              autoComplete="off"
              className="w-full px-1 py-1 text-sm sm:text-base rounded-lg border border-white/30 bg-transparent text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Submit */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-0.5 text-sm sm:text-base rounded-lg font-semibold bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 transition-shadow shadow-sm"
            >
              Submit & Find Donors
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DonorRequestForm;
