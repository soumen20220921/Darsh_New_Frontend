import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  FaStethoscope, 
  FaUserMd, 
  FaSearch, 
  FaStar, 
  FaMapMarkerAlt, 
  FaClock,
  FaFilter,
  FaPhone,
  FaExclamationTriangle
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const DoctorCard = ({ doctor }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactType, setContactType] = useState("");

  const handleContactClick = (type) => {
    setContactType(type);
    setShowContactModal(true);
  };

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-4">
          <FaExclamationTriangle className="text-yellow-600 text-xl" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
          Contact Support
        </h3>
        
        <p className="text-gray-600 text-center mb-4">
          To schedule a phone consultation with {" "}
          <span className="font-semibold">Dr. {doctor.name}</span>, please call the Doctor Assistant during their regular business hours.
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              📞 9999999999
            </div>
            <p className="text-blue-500 text-sm">Business Hours</p>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => window.open(`tel:9999999999`, '_self')}
            className="w-full bg-green-600 text-white font-semibold py-3 px-4 rounded-xl hover:bg-green-700 transition duration-200"
          >
            Call Now
          </button>
          
          <button
            onClick={() => setShowContactModal(false)}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:bg-gray-300 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-3xl shadow-soft hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="p-6">
          <div className="block lg:hidden">
            <div className="flex items-start gap-4 mb-4">
              <div className="relative flex-shrink-0">
                <img
                  src={doctor.imageUrl || "/default-doctor.jpg"}
                  alt={doctor.name}
                  className="w-20 h-20 object-cover rounded-2xl shadow-md border-2 border-white"
                />
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                  {doctor.experience}+ yrs
                </div>
              </div>
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {doctor.name}
                </h3>
                <p className="text-blue-600 font-semibold flex items-center text-sm">
                  <FaStethoscope className="mr-2" />
                  {doctor.specialization}
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1 text-xs" />
                    <span className="text-sm font-semibold text-gray-700">
                      {doctor.rating || "4.8"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaUserMd className="mr-2 text-blue-500" />
                <span>{doctor.qualification}</span>
              </div>
              
              {doctor.location && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-red-500" />
                  <span className="truncate">{doctor.location}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-green-600 font-semibold">
                <FaClock className="mr-2" />
                <span>Available Today</span>
              </div>
            </div>

            <div className="mb-4">
              <p className={`text-gray-600 text-sm leading-relaxed ${
                showFullDescription ? '' : 'line-clamp-2'
              }`}>
                {doctor.description}
              </p>
              {doctor.description.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 text-sm font-medium mt-1"
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.languages?.slice(0, 2).map((lang, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs border border-gray-200">
                  {lang}
                </span>
              ))}
              {doctor.languages && doctor.languages.length > 2 && (
                <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs border border-gray-200">
                  +{doctor.languages.length - 2} more
                </span>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    ₹{doctor.fees}
                  </div>
                  <p className="text-xs text-gray-500">Consultation Fee</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleContactClick("call")}
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition duration-200"
                  >
                    <FaPhone size={14} />
                  </button>
                </div>
              </div>
              
              <Link 
                to={`/doctor/${doctor._id}`}
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-xl text-center hover:shadow-lg transition duration-200"
              >
                View Profile
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-start gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={doctor.imageUrl || "/default-doctor.jpg"}
                alt={doctor.name}
                className="w-28 h-28 object-cover rounded-2xl shadow-md border-4 border-white"
              />
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {doctor.experience}+ yrs
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2 flex items-center">
                    <FaStethoscope className="mr-2" />
                    {doctor.specialization}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold text-gray-700">
                      {doctor.rating || "4.8"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUserMd className="mr-2 text-blue-500" />
                  <span>{doctor.qualification}</span>
                </div>
                {doctor.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500" />
                    <span>{doctor.location}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-4 max-w-2xl">
                {doctor.description}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-wrap gap-2">
                  {doctor.languages?.slice(0, 4).map((lang, index) => (
                    <span key={index} className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs border border-gray-200">
                      {lang}
                    </span>
                  ))}
                  {doctor.languages && doctor.languages.length > 4 && (
                    <span className="bg-gray-50 text-gray-700 px-3 py-1 rounded-full text-xs border border-gray-200">
                      +{doctor.languages.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-green-600 font-semibold">
                  <FaClock className="mr-2" />
                  <span>Available Today</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-64 flex flex-col gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  ₹{doctor.fees}
                </div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
              </div>

              <div className="flex justify-center gap-3">
                <button 
                  onClick={() => handleContactClick("call")}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition duration-200 text-sm font-medium"
                >
                  <FaPhone size={12} />
                  Call
                </button>
              </div>

              <Link 
                to={`/doctor/${doctor._id}`}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl text-center hover:shadow-lg transition duration-200 transform hover:scale-105"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && <ContactModal />}
    </>
  );
};

const DoctorsPage = () => {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("experience");
  const [showFilters, setShowFilters] = useState(false);
  const { doctors, setDoctors } = useAppContext();
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError("");
        
        const response = await axios.get("/api/doctors", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        if (response.data.success) {
          setDoctors(response.data.doctors);
        } else {
          setError("Failed to fetch doctors");
        }
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [setDoctors]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterSpecialization(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const allSpecializations = [
    "All",
    ...new Set(doctors.map((doc) => doc.specialization).filter(Boolean)),
  ];

  const filteredDoctors = doctors
    .filter((doctor) => {
      const searchMatch = 
        doctor.name?.toLowerCase().includes(search.toLowerCase()) || 
        doctor.description?.toLowerCase().includes(search.toLowerCase()) ||
        doctor.specialization?.toLowerCase().includes(search.toLowerCase());
      
      const filterMatch = 
        filterSpecialization === "All" || 
        doctor.specialization === filterSpecialization;
      
      return searchMatch && filterMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return b.experience - a.experience;
        case "fees":
          return a.fees - b.fees;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return a.name?.localeCompare(b.name);
        default:
          return 0;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Finding Best Doctors...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we load available specialists</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="bg-white shadow-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 sm:py-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
                Book a Doctor Appointment
              </h1>

              <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                Schedule your consultation with verified specialists in minutes.
              </p>

              <div className="lg:hidden mt-2 text-sm font-medium text-indigo-600">
                {filteredDoctors.length} doctors available
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-4 flex-shrink-0">
              <div className="p-3 bg-blue-50 rounded-lg text-center">
                <span className="text-xl font-bold text-blue-700">
                  {filteredDoctors.length}
                </span>
                <p className="text-sm text-blue-600">Doctors Available</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:hidden mb-6">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors..."
              value={search}
              onChange={handleSearchChange}
              className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
            />
            <button
              onClick={toggleFilters}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl"
            >
              <FaFilter size={16} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="lg:hidden bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-200">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={filterSpecialization}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                >
                  {allSpecializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={handleSortChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                  <option value="fees">Fees: Low to High</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-8 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Filters
              </h3>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Search
                  </label>
                  <div className="relative">
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doctors..."
                      value={search}
                      onChange={handleSearchChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Specialization
                  </label>
                  <select
                    value={filterSpecialization}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {allSpecializations.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="experience">Experience (High to Low)</option>
                    <option value="rating">Rating (High to Low)</option>
                    <option value="fees">Fees (Low to High)</option>
                    <option value="name">Name (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-grow">
            <div className="hidden lg:flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Available Doctors
                <span className="text-gray-500 text-lg ml-2">
                  ({filteredDoctors.length} found)
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id} doctor={doctor} />
                ))
              ) : (
                <div className="text-center p-12 bg-white rounded-3xl shadow-lg border border-gray-100">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSearch className="text-gray-400 text-3xl" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-3">
                    No Doctors Found
                  </h3>
                  <p className="text-gray-500 text-md md:text-lg mb-6 max-w-md mx-auto">
                    Try adjusting your search criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearch("");
                      setFilterSpecialization("All");
                      setShowFilters(false);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-xl hover:shadow-lg transition duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsPage;