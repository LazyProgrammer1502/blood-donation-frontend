import React, { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import bgLogo from "../assets/life_saver_kust_logo.png";
import { getAllPatients, deletePatient } from "../api/patientApi";

const AdminPatientList = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await getAllPatients();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      alert("Failed to load patients");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this patient?"))
      return;
    try {
      await deletePatient(id);
      alert("Patient deleted successfully");
      setPatients((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient");
    }
  };

  return (
    <div className="relative min-h-screen bg-linear-to-b from-red-100 via-white to-red-100">
      <Navbar hideSearch={true} showHamburger={true} />
      <div className="fixed inset-0 flex justify-center items-center opacity-10 pointer-events-none">
        <img
          src={bgLogo}
          alt="Background"
          className="w-[60%] md:w-[40%] lg:w-[30%]"
        />
      </div>

      <div className="relative z-10 pt-24 px-6 sm:px-10 max-w-6xl mx-auto">
        {patients.length === 0 ? (
          <p className="text-center text-gray-600">No patients found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((p) => (
              <div
                key={p._id}
                className="bg-white/80 backdrop-blur-md border border-red-200 rounded-2xl shadow-md hover:shadow-lg p-6 text-center transition-all duration-300"
              >
                <h3 className="text-red-700 font-bold text-lg mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-gray-600">Age: {p.age}</p>
                <p className="text-sm text-gray-600">Phone: {p.phone_no}</p>
                <p className="text-sm text-gray-600">
                  Blood Group: {p.blood_group}
                </p>
                <p className="text-sm text-gray-600">Gender: {p.gender}</p>
                <p className="text-sm text-gray-600">Case: {p.case_type}</p>
                <p className="text-sm text-gray-600">
                  Hospital Name: {p.hospital_name}
                </p>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="mt-4 bg-linear-to-r from-red-600 to-red-500 text-white px-4 py-2 rounded-full hover:scale-105 transition-all"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPatientList;
