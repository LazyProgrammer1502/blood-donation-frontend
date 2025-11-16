import React from "react";
import founderImg from "../assets/founder.jpeg";
import Navbar from "../components/NavBar";

const Founder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-red-100">
      {/* Navbar */}
      <Navbar hideSearch={true} showHamburger={true} />

      <div className="max-w-5xl mx-auto px-6 py-24">
        {/* Founder Section */}
        <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
          <img
            src={founderImg}
            alt="Founder"
            className="w-56 h-56 rounded-2xl object-cover shadow-xl border border-red-300"
          />

          <div>
            <h1 className="text-3xl font-extrabold text-red-700">
              Founder – Life Saver KUST
            </h1>
            <p className="mt-3 text-gray-700 text-lg leading-relaxed">
              Saqib Khattak, a dedicated student of the Department of Medical
              Laboratory Technology (MLT), founded the Life Saver KUST Blood
              Donation Society on December 12, 2023, at the Kohat University of
              Science & Technology (KUST).
            </p>
          </div>
        </div>

        {/* Main Description */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-red-200">
          <h2 className="text-2xl font-bold text-red-600 mb-5">
            Life Saver KUST Blood Donation Society
          </h2>

          <p className="text-gray-800 leading-relaxed mb-4">
            The inauguration ceremony was graced by the Vice Chancellor,{" "}
            <strong>Prof. Dr. Sardar Khan</strong>, as the chief guest.
            Distinguished guests included:
          </p>

          <ul className="list-disc ml-6 text-gray-700 leading-relaxed mb-4">
            <li>Mr. Asad Habib (Director Administration)</li>
            <li>Associate Professor Dr. Niaz Muhammad (Chairman MLT)</li>
            <li>Prof. Dr. Muhammad Qasim (Chairman Microbiology)</li>
            <li>Mr. Mughal Qayum (Chairman DPT)</li>
            <li>Associate Professor Dr. Mubashir Hassan</li>
            <li>Assistant Professor Mr. Abdul Rehman</li>
            <li>Lecturer Mr. Zakrullah</li>
            <li>Lecturer Mr. Gulzar</li>
            <li>Lecturer Mr. Firdous</li>
            <li>Lecturer Ms. Mujahida Mansoor</li>
          </ul>

          <p className="text-gray-800 leading-relaxed mb-4">
            All the respected teachers appreciated this noble initiative and
            highly praised <strong>Saqib Khattak</strong> and his team for their
            dedication and humanitarian spirit.
          </p>

          <p className="text-gray-800 leading-relaxed mb-4">
            The main purpose of establishing this society is to provide
            life-saving blood to patients in Kohat and surrounding areas, where
            many lives are lost daily due to the unavailability of blood.
            Thalassemia patients, road accident victims, delivery cases,
            dialysis patients, and individuals suffering from critical medical
            conditions depend heavily on timely blood donations.
          </p>

          <p className="text-gray-900 font-semibold text-lg leading-relaxed">
            The Life Saver KUST Blood Donation Society stands as a beacon of
            hope — serving humanity with compassion, dedication, and true
            volunteerism.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Founder;
