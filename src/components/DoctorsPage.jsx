import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaStethoscope, FaUserMd, FaSearch } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

// --- DEMO DATA FOR LISTING ---
const DUMMY_DOCTORS = [
  {
    _id: "1",
    name: "Dr. Ananya Sharma",
    specialization: "Cardiologist",
    qualification: "MBBS, MD",
    experience: 12,
    fees: 800,
    description: "Expert in interventional cardiology and heart failure.",
    imageUrl: "https://via.placeholder.com/150/500099/FFFFFF?text=Dr.A.S",
  },
  {
    _id: "2",
    name: "Dr. Rohan Verma",
    specialization: "Pediatrician",
    qualification: "MBBS, DCH",
    experience: 8,
    fees: 650,
    description: "Specializes in neonatal care and childhood infectious diseases.",
    imageUrl: "https://via.placeholder.com/150/007bff/FFFFFF?text=Dr.R.V",
  },
  {
    _id: "3",
    name: "Dr. Priya Singh",
    specialization: "Dermatologist",
    qualification: "MBBS, MD",
    experience: 15,
    fees: 950,
    description: "Leading specialist in cosmetic dermatology and skin cancer.",
    imageUrl: "https://via.placeholder.com/150/28a745/FFFFFF?text=Dr.P.S",
  },
  {
    _id: "4",
    name: "Dr. Alok Gupta",
    specialization: "Cardiologist",
    qualification: "MBBS, MD",
    experience: 7,
    fees: 700,
    description: "Focuses on general cardiology and hypertension.",
    imageUrl: "https://via.placeholder.com/150/FFA500/FFFFFF?text=Dr.A.G",
  },
];

const DoctorCard = ({ doctor }) => {
  return (
    <Link to={`/doctor/${doctor._id}`} className="block">
      <div className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 transform hover:-translate-y-1">
        <div className="p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          
          <div className="flex-shrink-0">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-28 h-28 object-cover rounded-full ring-4 ring-indigo-100 shadow-md"
            />
          </div>

          <div className="flex-grow text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              {doctor.name}
            </h3>
            <p className="text-indigo-600 font-semibold mb-2 flex items-center justify-center sm:justify-start">
              <FaStethoscope className="mr-2" />
              {doctor.specialization}
            </p>
            <p className="text-sm text-gray-500">
              **Qualification:** {doctor.qualification}
            </p>
            <p className="text-sm text-gray-500 mb-2">
              **Experience:** {doctor.experience} years
            </p>
            <p className="text-gray-700 text-sm italic line-clamp-2">
              {doctor.description}
            </p>
          </div>

          <div className="flex-shrink-0 w-full sm:w-auto mt-3 sm:mt-0 pt-3 sm:pl-4 sm:border-l border-gray-200 flex flex-col items-center sm:items-end gap-2">
            <div className="text-2xl font-extrabold text-green-600">
              ₹{doctor.fees}
            </div>
            <p className="text-sm text-gray-500 mb-2">Consultation Fee</p>
            <button className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full sm:w-auto">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

const DoctorsPage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("All");
  const {doctors } = useAppContext();



  useEffect(() => {
    // Using DUMMY DATA for demonstration
    // setDoctors(DUMMY_DOCTORS);
    setLoading(false);
    
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterSpecialization(e.target.value);
  };

  const allSpecializations = [
    "All",
    ...new Set(DUMMY_DOCTORS.map((doc) => doc.specialization)),
  ];

  const filteredDoctors = doctors.filter((doctor) => {
    const searchMatch = doctor.name.toLowerCase().includes(search.toLowerCase()) || 
                        doctor.description.toLowerCase().includes(search.toLowerCase());
    const filterMatch = filterSpecialization === "All" || doctor.specialization === filterSpecialization;
    return searchMatch && filterMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 ml-4">Loading Doctors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-4 sm:px-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 tracking-tight mb-3">
            Find Your <span className="text-indigo-600">Perfect Doctor</span>
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Browse through our verified professionals and book an appointment instantly.
          </p>
        </header>

        <div className="bg-white p-6 rounded-xl shadow-lg mb-12 border border-indigo-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Doctor Name or keyword..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
              />
            </div>

            <div className="relative">
              <FaStethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterSpecialization}
                onChange={handleFilterChange}
                className="appearance-none w-full pl-10 pr-8 py-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 cursor-pointer"
              >
                {allSpecializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="text-center p-10 bg-white rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No Doctors Found 😢
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;