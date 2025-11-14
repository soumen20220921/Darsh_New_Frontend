import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  FaUser, 
  FaPhone, 
  FaCalendar,
  FaMapMarkerAlt,
  FaGraduationCap,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
  FaShare,
  FaVideo,
  FaHome,
  FaShieldAlt,
  FaAward,
  FaCrown,
  FaFire,
  FaBriefcase,
  FaMoneyBillWave,
  FaTimes,
  FaSignInAlt,
  FaVenusMars,
  FaBirthdayCake,
  FaInfoCircle,
  FaTicketAlt,
  FaDownload,
  FaSpa,
} from "react-icons/fa";
import { 
  Star, 
  Clock, 
  Users, 
  Award, 
  MapPin,
  Gem,
  Palette
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { toast } from "react-hot-toast";

const API_BASE = "http://localhost:8001/api";
const url = API_BASE;

const LoginRequiredModal = ({ onClose, onLogin, onContinueAsGuest, expert }) => {
  const navigate = useNavigate();
  
  const handleLogin = () => {
    onClose();
    navigate("/auth", { state: { returnUrl: window.location.pathname } });
  };

  const handleSignup = () => {
    onClose();
    navigate("/auth", { state: { returnUrl: window.location.pathname } });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl mx-4"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 rounded-t-2xl">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold flex items-center truncate">
              <FaExclamationTriangle className="mr-2 flex-shrink-0" /> 
              <span className="truncate">Login Required</span>
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 truncate">
              Please login to book service with {expert?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 sm:p-2 rounded-full transition flex-shrink-0 ml-2"
          >
            <FaTimes size={18} className="sm:w-auto" />
          </button>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaSignInAlt className="text-purple-500 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Login to Continue
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              You need to be logged in to book a beauty & wellness service. This helps us keep your appointments secure and provide personalized care.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start">
              <FaShieldAlt className="text-purple-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-purple-800 text-xs sm:text-sm mb-1">
                  Why login is required?
                </h4>
                <p className="text-purple-700 text-xs leading-relaxed">
                  • Secure service records<br/>
                  • Appointment history tracking<br/>
                  • Faster future bookings<br/>
                  • Personalized treatment plans
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
            >
              <FaSignInAlt className="mr-2 flex-shrink-0" /> 
              <span className="truncate">Login to Your Account</span>
            </button>

            <button
              onClick={handleSignup}
              className="w-full border-2 border-purple-600 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <span className="truncate">Create New Account</span>
            </button>

            <button
              onClick={onContinueAsGuest}
              className="w-full text-gray-600 py-2 text-xs sm:text-sm hover:text-gray-800 transition-colors"
            >
              Continue as guest (limited features)
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BookingSuccessModal = ({ appointment, expert, onClose, onViewServices }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadTicket = () => {
    const ticketContent = `
BEAUTY & WELLNESS SERVICE CONFIRMATION
=======================================

CLIENT INFORMATION:
------------------
Name: ${appointment.FullName}
Phone: ${appointment.Phone}
Age: ${appointment.Age} years
Gender: ${appointment.Gender}

SERVICE DETAILS:
---------------
Expert: ${expert.name}
Specialization: ${expert.certification}
Date: ${formatDate(appointment.Date)}
Time: ${appointment.Time}
Service Type: ${appointment.serviceType || "Salon Service"}
Duration: 60-90 minutes

SERVICE FEE: ₹${appointment.amount}
Status: Confirmed ✅

IMPORTANT NOTES:
---------------
• Please arrive 10 minutes before your appointment
• Wear comfortable clothing for treatments
• Inform about any allergies or medical conditions
• Keep your booking confirmation ready

Booked on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beauty-service-${appointment.transactionId?.slice(-8) || Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareService = async () => {
    const shareText = `My beauty & wellness service with ${expert.name} on ${formatDate(appointment.Date)} at ${appointment.Time}. Service ID: #${appointment.transactionId?.slice(-8) || Date.now()}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Beauty & Wellness Service Confirmation',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Service details copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden mx-4"
      >
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheckCircle className="text-white text-3xl" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Service Confirmed!</h2>
          <p className="text-green-100">Your beauty & wellness service has been successfully booked</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <FaCalendar className="mr-2" />
              Service Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-700 font-medium">Client</p>
                <p className="text-gray-900 font-semibold">{appointment.FullName}</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Expert</p>
                <p className="text-gray-900 font-semibold">{expert.name}</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Date & Time</p>
                <p className="text-gray-900 font-semibold">
                  {formatDate(appointment.Date)} at {appointment.Time}
                </p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Service ID</p>
                <p className="text-gray-900 font-semibold font-mono">
                  #{appointment.transactionId?.slice(-8) || Date.now().toString().slice(-8)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FaInfoCircle className="mr-2" />
              Preparation Tips
            </h4>
            <ul className="text-blue-700 text-sm space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Arrive 10 minutes before your scheduled time</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Wear comfortable clothing for treatments</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Inform about any allergies or medical conditions</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Keep your booking confirmation ready</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadTicket}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <FaDownload className="mr-2" />
              Download Confirmation
            </button>
            <button
              onClick={shareService}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewServices}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
            >
              <FaTicketAlt className="mr-2" />
              View My Services
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Close
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Need help? Contact support at <span className="font-semibold">+91 99999 99999</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

// Payment Processing Modal Component
const PaymentProcessingModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center"
      >
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Payment</h3>
        <p className="text-gray-600 mb-4">Please wait while we complete your booking...</p>
        <p className="text-sm text-gray-500">Do not close this window</p>
      </motion.div>
    </div>
  );
};

const BookingModal = ({ expert, onClose, user, onSubmit }) => {
  const [clientName, setClientName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [serviceType, setServiceType] = useState("salon");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [needsConfirmationCall, setNeedsConfirmationCall] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const amount = expert.fee;

  const validateForm = () => {
    const newErrors = {};

    if (!phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits";
    }

    if (!age) {
      newErrors.age = "Age is required";
    } else if (age < 1 || age > 120) {
      newErrors.age = "Age must be between 1 and 120 years";
    }

    if (!gender) {
      newErrors.gender = "Gender is required";
    }

    if (!date) {
      newErrors.date = "Service date is required";
    }

    if (!time) {
      newErrors.time = "Time slot is required";
    }

    if (!clientName.trim()) {
      newErrors.clientName = "Full name is required";
    }

    if (serviceType === "home") {
      if (!address.trim()) {
        newErrors.address = "Full address is required for home service";
      }
      if (!pincode.trim()) {
        newErrors.pincode = "Pincode is required";
      } else if (!/^\d{6}$/.test(pincode)) {
        newErrors.pincode = "Pincode must be exactly 6 digits";
      }
      if (!city.trim()) {
        newErrors.city = "City is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate < today) {
      toast.error("Past dates are not allowed. Please select a valid date.");
      setDate("");
      return;
    }

    setDate(selectedDate);
    setErrors(prev => ({ ...prev, date: "" }));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhone(value);
    if (value.length === 10) {
      setErrors(prev => ({ ...prev, phone: "" }));
    }
  };

  const handleAgeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 3);
    setAge(value);
    if (value && value >= 1 && value <= 120) {
      setErrors(prev => ({ ...prev, age: "" }));
    }
  };

  const handlePincodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
    if (value.length === 6) {
      setErrors(prev => ({ ...prev, pincode: "" }));
      fetchCityFromPincode(value);
    }
  };

  const fetchCityFromPincode = async (pincode) => {
    if (pincode.length === 6) {
      setTimeout(() => {
        const cityMap = {
          '110001': 'New Delhi',
          '400001': 'Mumbai',
          '700001': 'Kolkata',
          '560001': 'Bangalore',
        };
        setCity(cityMap[pincode] || '');
        setState(cityMap[pincode] ? `${cityMap[pincode]} State` : '');
      }, 500);
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
    setErrors(prev => ({ ...prev, gender: "" }));
  };

  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    if (type === "salon") {
      setErrors(prev => ({
        ...prev,
        address: undefined,
        pincode: undefined,
        city: undefined
      }));
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          toast.success("Location detected! Please verify your address.");
          setAddress("Location detected via GPS - please verify and complete address details");
        },
        (error) => {
          toast.error("Unable to get your location. Please enter manually.");
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    // const bookingData = {
    //   FullName: clientName,
    //   Phone: phone,
    //   Age: age,
    //   Gender: gender,
    //   Date: date,
    //   Time: time,
    //   serviceType,
    //   amount,
    //   ...(serviceType === "home" && {
    //     address: {
    //       fullAddress: address,
    //       landmark,
    //       pincode,
    //       city,
    //       state
    //     },
    //     needsConfirmationCall,
    //     specialInstructions: specialInstructions || undefined
    //   })
    // };

    const bookingData = {
       userId :user.id,
        FullName:clientName,
        amount:expert.fee,
        Phone:phone,
        Date:date,
        Half:"morning",
        Time:"12-2 pm",
        Address:"there will be address of the user",
        TharapistId:expert._id
    }

    // console.log(bookingData,user)

    await onSubmit(bookingData);
  };

  const generateTimeSlots = () => {
    const slots = [];
    
    for (let i = 0; i < 6; i++) {
      const hour = 9 + Math.floor(i / 2);
      const minute = i % 2 === 0 ? '00' : '30';
      const timeString = `${hour}:${minute} AM`;
      slots.push({
        time: timeString,
        displayTime: timeString
      });
    }
    
    for (let i = 0; i < 6; i++) {
      const hour = 17 + Math.floor(i / 2);
      const minute = i % 2 === 0 ? '00' : '30';
      const displayHour = hour > 12 ? hour - 12 : hour;
      const timeString = `${displayHour}:${minute} PM`;
      slots.push({
        time: timeString,
        displayTime: timeString
      });
    }
    
    return slots;
  };

  const timeSlots = generateTimeSlots();

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold flex items-center truncate">
              <FaCalendar className="mr-2 flex-shrink-0" />
              <span className="truncate">Book Beauty & Wellness Service</span>
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 truncate">
              with {expert.name}
              {user && (
                <span className="ml-1 sm:ml-2 text-purple-200">
                  • Logged in
                </span>
              )}
            </p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 sm:p-2 rounded-full transition flex-shrink-0 ml-2"
          >
            <FaTimes size={18} className="sm:w-auto" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-4 sm:p-6 space-y-4 sm:space-y-6"
        >
          {user && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-3 sm:p-4">
              <p className="text-green-700 text-xs sm:text-sm font-medium flex items-center">
                <FaCheckCircle className="mr-2 flex-shrink-0" />
                <span className="truncate">
                  You are logged in as {user.name}
                </span>
              </p>
            </div>
          )}

          <div className="flex items-center bg-gray-50 p-3 sm:p-4 rounded-xl border">
            <div className="relative">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-200 rounded-full object-cover border-2 border-purple-200 flex-shrink-0">
                <img
                  // src={expert.image?.id ? `${url}/img/${expert.image._id}` : "/default-expert.jpg"}
                  alt={expert.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                {expert.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {expert.certification}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {expert.experience}+ years experience
              </p>
            </div>
            <div className="ml-auto text-green-600 font-bold text-lg sm:text-xl flex-shrink-0 pl-2">
              ₹{amount}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaUser className="mr-2 text-gray-500 flex-shrink-0" />
                Full Name *
              </label>
              <input
                type="text"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base ${
                  errors.clientName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
                value={clientName}
                onChange={(e) => {
                  setClientName(e.target.value);
                  setErrors((prev) => ({ ...prev, clientName: "" }));
                }}
                placeholder="Enter your full name"
                required
              />
              {errors.clientName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.clientName}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaPhone className="mr-2 text-gray-500 flex-shrink-0" />
                Phone Number *
              </label>
              <input
                type="tel"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base ${
                  errors.phone ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="10-digit mobile number"
                maxLength="10"
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.phone}
                </p>
              )}
              {phone.length === 10 && (
                <p className="text-green-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaCheckCircle className="mr-1 flex-shrink-0" /> Valid phone
                  number
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaBirthdayCake className="mr-2 text-gray-500 flex-shrink-0" />
                Age (Years) *
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base ${
                  errors.age ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                value={age}
                onChange={handleAgeChange}
                placeholder="Enter age"
                min="1"
                max="120"
                required
              />
              {errors.age && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.age}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaVenusMars className="mr-2 text-gray-500 flex-shrink-0" />
                Gender *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                {["Male", "Female", "Other", "Prefer not to say"].map(
                  (option) => (
                    <button
                      key={option}
                      type="button"
                      className={`p-3 sm:p-4 border rounded-xl text-center transition text-xs sm:text-sm ${
                        gender === option
                          ? "bg-purple-600 text-white border-purple-600"
                          : `border-gray-200 hover:border-purple-300 ${
                              errors.gender ? "border-red-500 bg-red-50" : ""
                            }`
                      }`}
                      onClick={() => handleGenderChange(option)}
                    >
                      {option}
                    </button>
                  )
                )}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.gender}
                </p>
              )}
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4">
            <label className="block text-sm font-medium mb-3">
              Service Type *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className={`p-4 border-2 rounded-xl text-center transition flex flex-col items-center gap-2 ${
                  serviceType === "salon"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-gray-200 hover:border-purple-300 bg-white"
                }`}
                onClick={() => handleServiceTypeChange("salon")}
              >
                <FaSpa className="text-lg" />
                <span className="text-sm font-medium">Salon Service</span>
                <span className="text-xs opacity-75">Visit expert's location</span>
              </button>
              <button
                type="button"
                className={`p-4 border-2 rounded-xl text-center transition flex flex-col items-center gap-2 ${
                  serviceType === "home"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "border-gray-200 hover:border-purple-300 bg-white"
                }`}
                onClick={() => handleServiceTypeChange("home")}
              >
                <FaHome className="text-lg" />
                <span className="text-sm font-medium">Home Service</span>
                <span className="text-xs opacity-75">Expert visits you</span>
              </button>
            </div>
          </div>

          {serviceType === "home" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 bg-blue-50 border border-blue-200 rounded-xl p-4"
            >
              <h4 className="font-semibold text-blue-800 flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                Home Service Location Details
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-2 flex items-center">
                    Full Address *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      className={`flex-1 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm ${
                        errors.address ? "border-red-500 bg-red-50" : "border-gray-200"
                      }`}
                      value={address}
                      onChange={(e) => {
                        setAddress(e.target.value);
                        setErrors((prev) => ({ ...prev, address: "" }));
                      }}
                      placeholder="House no., Building, Street, Area"
                      required
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition flex items-center text-sm whitespace-nowrap"
                    >
                      <FaMapMarkerAlt className="mr-2" />
                      Use GPS
                    </button>
                  </div>
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <FaExclamationTriangle className="mr-1" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2">Landmark</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="Nearby landmark (optional)"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2">Pincode *</label>
                    <input
                      type="text"
                      className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm ${
                        errors.pincode ? "border-red-500 bg-red-50" : "border-gray-200"
                      }`}
                      value={pincode}
                      onChange={handlePincodeChange}
                      placeholder="6-digit pincode"
                      maxLength="6"
                      required
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <FaExclamationTriangle className="mr-1" />
                        {errors.pincode}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-2">City *</label>
                    <input
                      type="text"
                      className={`w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm ${
                        errors.city ? "border-red-500 bg-red-50" : "border-gray-200"
                      }`}
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        setErrors((prev) => ({ ...prev, city: "" }));
                      }}
                      placeholder="Your city"
                      required
                    />
                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <FaExclamationTriangle className="mr-1" />
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2">State *</label>
                    <input
                      type="text"
                      className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      placeholder="Your state"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-blue-200">
                  <input
                    type="checkbox"
                    id="confirmationCall"
                    checked={needsConfirmationCall}
                    onChange={(e) => setNeedsConfirmationCall(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="confirmationCall" className="text-sm text-gray-700">
                    Request confirmation call before service
                    <span className="block text-xs text-gray-500">
                      Expert will call to confirm address and timing
                    </span>
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2">Special Instructions</label>
                  <textarea
                    className="w-full border border-gray-200 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm resize-none"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Any specific instructions for the expert, parking info, gate code, etc."
                    rows="3"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {serviceType === "salon" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-green-50 border border-green-200 rounded-xl p-4"
            >
              <h4 className="font-semibold text-green-800 flex items-center mb-2">
                <FaMapMarkerAlt className="mr-2" />
                Salon Location
              </h4>
              <p className="text-green-700 text-sm">
                You will visit the expert's salon at their professional location.
                Address details will be shared in the confirmation.
              </p>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t border-gray-200">
            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaCalendar className="mr-2 text-gray-500 flex-shrink-0" />
                Service Date *
              </label>
              <input
                type="date"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-purple-500 outline-none transition text-sm sm:text-base ${
                  errors.date ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                value={date}
                onChange={handleDateChange}
                required
              />
              {errors.date && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.date}
                </p>
              )}
            </div>

            {date && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Available Time Slots *
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setTime(slot.time)}
                      className={`p-3 border rounded-xl text-center transition text-xs ${
                        time === slot.time
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-gray-200 hover:border-purple-300"
                      }`}
                    >
                      {slot.displayTime}
                    </button>
                  ))}
                </div>
                {errors.time && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                    <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                    {errors.time}
                  </p>
                )}
              </div>
            )}
          </div>

          {date && time && (
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-3 sm:p-4">
              <p className="font-semibold text-purple-700 text-sm sm:text-base flex items-center">
                <FaInfoCircle className="mr-2 flex-shrink-0" />
                <span className="truncate">
                  Selected: {new Date(date).toLocaleDateString()} • {time} • {serviceType === "salon" ? "Salon Service" : "Home Service"}
                  {serviceType === "home" && needsConfirmationCall && " • Confirmation Call Requested"}
                </span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 sm:py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base md:text-lg ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:from-green-700 hover:to-emerald-700"
            }`}
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                Processing Payment...
              </>
            ) : (
              <>
                <FaCheckCircle className="mr-2 flex-shrink-0" />
                <span>Confirm & Pay ₹{amount}</span>
              </>
            )}
          </button>

          <p className="text-[9px] sm:text-xs md:text-sm text-center text-gray-500 flex items-center justify-center">
            <FaShieldAlt className="mr-1 flex-shrink-0 text-[10px] sm:text-xs" />
            <span>
              Your personal and payment information is secure and encrypted.
            </span>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-green-50 border-green-100 text-green-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700',
    pink: 'bg-pink-50 border-pink-100 text-pink-700'
  };

  return (
    <div className={`${colorClasses[color]} border p-3 sm:p-4 rounded-xl hover:shadow-md transition`}>
      <div className="font-semibold flex items-center mb-1 sm:mb-2 text-xs sm:text-sm">
        {icon} <span className="ml-1 sm:ml-2 truncate">{label}</span>
      </div>
      <p className="text-gray-800 font-bold text-sm sm:text-base lg:text-lg truncate">{value}</p>
    </div>
  );
};

const Section = ({ title, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-soft p-4 sm:p-6 ${className}`}>
    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 border-b border-gray-200 pb-2 sm:pb-3">
      {title}
    </h3>
    <div className="text-gray-700">{children}</div>
  </div>
);

const ExpertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { login, url, user, token } = useAppContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [similarExperts, setSimilarExperts] = useState([]);
  const [latestAppointment, setLatestAppointment] = useState(null);

  const fetchExpertDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${API_BASE}/therapist/${id}`);
      
      if (response.data && response.data.therapist) {
        const expertData = response.data.therapist;
        
        const transformedExpert = {
          ...expertData,
          id: expertData._id,
          rating: parseFloat(expertData.rating) || 4.9,
          clientsServed: expertData.clientsServed || 0,
          specialties: expertData.specialties || [],
          fee: expertData.fee || 0,
          badge: expertData.badge || "",
          membership: getMembershipTier(expertData.rating, expertData.experience),
          achievements: getAchievements(expertData.rating, expertData.clientsServed),
          location: expertData.location || "City not specified",
          distance: "2.5 km",
          lastActive: "Recently",
          featured: expertData.featured || false,
          responseTime: expertData.responseTime || "Within 2 hours",
          description: expertData.description || "Premium beauty and wellness expert dedicated to providing exceptional care and rejuvenation services."
        };
        
        setExpert(transformedExpert);
        
        fetchSimilarExperts(expertData.specialties, expertData._id);
        
        fetchReviews(expertData._id);
      }
    } catch (err) {
      console.error('Error fetching expert details:', err);
      setError('Failed to load expert details. Please try again later.');
      toast.error('Failed to load expert details');
    } finally {
      setLoading(false);
    }
  };

  const fetchSimilarExperts = async (specialties, currentExpertId) => {
    try {
      const response = await axios.get(`${API_BASE}/therapist/similar`, {
        params: { specialties: specialties.join(','), exclude: currentExpertId }
      });
      
      if (response.data && response.data.therapists) {
        setSimilarExperts(response.data.therapists.slice(0, 4));
      }
    } catch (err) {
      console.error('Error fetching similar experts:', err);
    }
  };

  const fetchReviews = async (expertId) => {
    try {
      const response = await axios.get(`${API_BASE}/reviews/${expertId}`);
      
      if (response.data && response.data.reviews) {
        setReviews(response.data.reviews);
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  const getMembershipTier = (rating, experience) => {
    const exp = parseInt(experience) || 0;
    if (rating >= 4.8 && exp >= 8) return "Diamond Tier";
    if (rating >= 4.7 && exp >= 5) return "Platinum Tier";
    if (rating >= 4.5 && exp >= 3) return "Gold Tier";
    return "Silver Tier";
  };

  const getAchievements = (rating, clientsServed) => {
    const achievements = [];
    if (rating >= 4.8) achievements.push("Premium Expert");
    if (clientsServed >= 1000) achievements.push("Client Favorite");
    if (rating >= 4.7) achievements.push("Quality Service");
    if (clientsServed >= 500) achievements.push("Experienced");
    return achievements.slice(0, 3);
  };

  useEffect(() => {
    if (id) {
      fetchExpertDetails();
    }
  }, [id]);

  const getBadgeColor = (badge) => {
    const badgeColors = {
      "Popular": "bg-orange-100 text-orange-800 border-orange-200",
      "Top Rated": "bg-yellow-100 text-yellow-800 border-yellow-200",
      "Expert": "bg-purple-100 text-purple-800 border-purple-200",
      "New": "bg-green-100 text-green-800 border-green-200",
      "Senior": "bg-blue-100 text-blue-800 border-blue-200",
      "Pro": "bg-pink-100 text-pink-800 border-pink-200",
      "Elite": "bg-red-100 text-red-800 border-red-200"
    };
    return badgeColors[badge] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getMembershipColor = (membership) => {
    const colors = {
      "Diamond Tier": "from-blue-400 to-purple-600",
      "Platinum Tier": "from-gray-400 to-gray-600",
      "Gold Tier": "from-yellow-400 to-yellow-600",
      "Silver Tier": "from-gray-300 to-gray-400"
    };
    return colors[membership] || "from-gray-400 to-gray-600";
  };

  const getImageSrc = () => {
    if (imageError || !expert?.image || !expert.image._id) {
      return "/default-expert.jpg";
    }
    return `${url}/img/${expert.image._id}`;
  };

  const handleBookService = () => {
    if (!login) {
      setShowLoginModal(true);
      return;
    }
    setShowBookingModal(true);
  };

  const handleContinueAsGuest = () => {
    setShowLoginModal(false);
    setShowBookingModal(true);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      // setShowProcessingModal(true);
      // setShowBookingModal(false);

      // Simulate payment processing
      // setTimeout(() => {
      //   const appointment = {
      //     ...bookingData,
      //     transactionId: "S" + Date.now(),
      //     MUID :"MUID" + Date.now()
      //   };
        
      //   setLatestAppointment(appointment);
      //   setShowProcessingModal(false);
      //   setShowSuccessModal(true);
      //   toast.success("Service booked successfully!");
      // }, 2000);

         const appointment = {
          ...bookingData,
          transactionId: "S" + Date.now(),
          MUID :"MUID" + Date.now()
        };
       const response = await axios.post(`${url}/api/phonepe/payment3`, appointment);
      
      if (response?.data?.redirectUrl) {
        localStorage.setItem('pendingAppointment', JSON.stringify({
          ...appointment
        }));
        
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setShowProcessingModal(false);
      toast.error("Booking failed. Please try again.");
    }
  };

  const handleViewServices = () => {
    setShowSuccessModal(false);
    navigate('/therapists?tab=services');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.success(!isFavorite ? "Added to favorites" : "Removed from favorites");
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"
          />
          <p className="text-gray-600">Loading expert details...</p>
        </div>
      </div>
    );
  }

  if (error || !expert) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Expert Not Found</h3>
          <p className="text-gray-600 mb-6">{error || "The beauty & wellness expert you're looking for doesn't exist."}</p>
          <button
            onClick={() => navigate('/therapists')}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-200"
          >
            Browse Experts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm sm:text-base">Back to Experts</span>
          </button>
          
          {user && (
            <button
              onClick={() => navigate('/therapists?tab=services')}
              className="hidden md:flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition font-semibold text-sm"
            >
              <FaTicketAlt className="mr-2" />
              My Services
            </button>
          )}
        </div>

        {/* Expert Profile Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 lg:gap-8 transition hover:shadow-xl">
          <div className="relative flex-shrink-0">
            <div className={`w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 bg-gray-200 rounded-xl sm:rounded-2xl shadow-md border-4 border-purple-100 ${!isImageLoaded ? 'animate-pulse' : ''}`}>
              <img
                // src={getImageSrc()}
                alt={expert.name}
                className={`w-full h-full object-cover rounded-xl sm:rounded-2xl ${isImageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setIsImageLoaded(true)}
                onError={(e) => {
                  setIsImageLoaded(true);
                  setImageError(true);
                  e.target.src = "/default-expert.jpg";
                }}
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              {expert.experience}+ yrs exp
            </div>
          </div>

          {/* Expert Info */}
          <div className="flex-1 text-center lg:text-left w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-800 mb-2 break-words">
                  {expert.name}
                </h1>
                <p className="text-purple-600 font-semibold text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
                  {expert.certification}
                </p>
                
                <div className="flex items-center gap-2 flex-wrap justify-center lg:justify-start">
                  {expert.badge && (
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getBadgeColor(expert.badge)}`}>
                      {expert.badge}
                    </span>
                  )}
                  <div className={`bg-gradient-to-r ${getMembershipColor(expert.membership)} text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1`}>
                    <Gem className="w-3 h-3" />
                    {expert.membership}
                  </div>
                </div>
              </div>
              
              {user && (
                <div className="bg-green-100 border border-green-200 mt-3 md:mt-0 px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-3 lg:mb-0 flex-shrink-0">
                  <p className="text-green-700 text-xs sm:text-sm font-medium flex items-center justify-center lg:justify-start">
                    <FaCheckCircle className="mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Logged in as {user.name}</span>
                  </p>
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-3xl line-clamp-3">
              {expert.description}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              <InfoCard 
                icon={<FaGraduationCap className="text-lg sm:text-xl" />} 
                label="Certification" 
                value={expert.certification} 
                color="purple" 
              />
              <InfoCard 
                icon={<FaBriefcase className="text-lg sm:text-xl" />} 
                label="Experience" 
                value={`${expert.experience}+ years`} 
                color="green" 
              />
              <InfoCard 
                icon={<FaMoneyBillWave className="text-lg sm:text-xl" />} 
                label="Service Fee" 
                value={`₹${expert.fee}`} 
                color="pink" 
              />
            </div>

            {/* Additional Stats */}
            <div className="flex items-center gap-6 mt-4 flex-wrap justify-center lg:justify-start">
              <div className="flex items-center text-gray-600">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="font-semibold">{expert.rating.toFixed(1)}</span>
                <span className="text-gray-400 ml-1">({expert.clientsServed} clients)</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                <span>Response: {expert.responseTime}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 text-red-500 mr-2" />
                <span>{expert.distance} away</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* About Section */}
            <Section title="About">
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                {expert.description}
              </p>
            </Section>

            {/* Specialties */}
            <Section title="Specialties & Services">
              <div className="flex flex-wrap gap-3">
                {expert.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </Section>


            {/* Qualifications & Experience */}
            <Section title="Qualifications & Experience">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FaGraduationCap className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Certification</h3>
                    <p className="text-gray-600">{expert.certification}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Experience</h3>
                    <p className="text-gray-600">{expert.experience} years of professional experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Clients Served</h3>
                    <p className="text-gray-600">Successfully served {expert.clientsServed} clients</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Verification & Trust */}
            <Section title="Verification & Trust">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <FaCheckCircle className="text-green-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Identity Verified</h4>
                    <p className="text-gray-600 text-sm">Government ID confirmed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <FaShieldAlt className="text-blue-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Background Check</h4>
                    <p className="text-gray-600 text-sm">Professional background verified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <FaAward className="text-purple-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Certified Professional</h4>
                    <p className="text-gray-600 text-sm">Licensed and certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <FaFire className="text-yellow-500 text-xl" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Active Member</h4>
                    <p className="text-gray-600 text-sm">Regularly available for services</p>
                  </div>
                </div>
              </div>
            </Section>

            {/* Similar Experts */}
            {similarExperts.length > 0 && (
              <Section title="Similar Beauty & Wellness Experts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {similarExperts.map((similarExpert) => (
                    <div
                      key={similarExpert._id}
                      className="border border-gray-200 rounded-xl p-4 hover:border-purple-300 transition duration-200 cursor-pointer"
                      onClick={() => navigate(`/therapist/${similarExpert._id}`)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                          {similarExpert.image && similarExpert.image._id ? (
                            <img
                              // src={`${url}/img/${similarExpert.image._id}`}
                              alt={similarExpert.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="w-6 h-6 text-gray-400 m-3" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{similarExpert.name}</h4>
                          <p className="text-gray-600 text-sm">{similarExpert.certification}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span className="text-sm font-semibold">{parseFloat(similarExpert.rating || 0).toFixed(1)}</span>
                            <span className="text-gray-400 text-sm">•</span>
                            <span className="text-green-600 text-sm font-semibold">₹{similarExpert.fee}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}
          </div>

          {/* Right Column - Booking & Actions */}
          <aside className="bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6 h-fit sticky top-4 sm:top-6">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Book Service</h3>
              <p className="text-purple-100 opacity-90 text-sm sm:text-base">
                Secure your beauty & wellness service with {expert.name}
              </p>
            </div>

            <div className="border-t border-purple-400/30 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
              <p className="flex justify-between items-center text-base sm:text-lg">
                <span>Service Fee</span> 
                <span className="font-bold text-xl sm:text-2xl">₹{expert.fee}</span>
              </p>
              <p className="flex justify-between text-xs sm:text-sm opacity-80">
                <span>Taxes & charges</span> 
                <span>Included</span>
              </p>
            </div>

            <ul className="space-y-2 sm:space-y-3">
              {[
                "Instant confirmation",
                "Secure payment",
                "24/7 support",
                "Service records safe",
                "Easy rescheduling",
                "60-90 minutes duration"
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-xs sm:text-sm">
                  <FaCheckCircle className="mr-2 sm:mr-3 text-green-400 text-base sm:text-lg flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              {!user && (
                <li className="flex items-center text-yellow-300 text-xs sm:text-sm">
                  <FaExclamationTriangle className="mr-2 sm:mr-3 flex-shrink-0" />
                  <span>Login required for full features</span>
                </li>
              )}
            </ul>

            <button
              onClick={handleBookService}
              className="w-full bg-white text-purple-700 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              <FaCalendar className="mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0" /> 
              <span>{user ? "Book Service Now" : "Login to Book"}</span>
            </button>

            {!user && (
              <p className="text-xs text-center text-purple-200">
                Already have an account?{" "}
                <button 
                  onClick={() => setShowLoginModal(true)}
                  className="underline hover:text-white font-semibold"
                >
                  Login here
                </button>
              </p>
            )}

            {user && (
              <div className="border-t border-purple-400/30 pt-4">
                <button
                  onClick={() => navigate('/therapists?tab=services')}
                  className="w-full bg-purple-500 hover:bg-purple-400 text-white py-2 rounded-xl transition flex items-center justify-center text-sm"
                >
                  <FaTicketAlt className="mr-2" />
                  View My Services
                </button>
              </div>
            )}

          </aside>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginRequiredModal
            expert={expert}
            onClose={() => setShowLoginModal(false)}
            onLogin={() => navigate("/auth", { state: { returnUrl: window.location.pathname } })}
            onContinueAsGuest={handleContinueAsGuest}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showBookingModal && (
          <BookingModal
            user={user}
            expert={expert}
            onClose={() => setShowBookingModal(false)}
            onSubmit={handleBookingSubmit}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProcessingModal && (
          <PaymentProcessingModal onClose={() => setShowProcessingModal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSuccessModal && latestAppointment && (
          <BookingSuccessModal
            appointment={latestAppointment}
            expert={expert}
            onClose={handleCloseSuccess}
            onViewServices={handleViewServices}
          />
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Share Expert Profile
                </h3>
                <div className="grid grid-cols-4 gap-4 mb-6">
                  {['WhatsApp', 'Facebook', 'Twitter', 'Copy Link'].map((platform) => (
                    <button
                      key={platform}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 transition duration-200"
                      onClick={() => {
                        toast.success(`Link copied to clipboard!`);
                        setShowShareModal(false);
                      }}
                    >
                      <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <FaShare className="text-purple-600" />
                      </div>
                      <span className="text-sm text-gray-600">{platform}</span>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExpertDetail;