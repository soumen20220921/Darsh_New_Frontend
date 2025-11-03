import React, { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaTimes,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserMd,
  FaCheckCircle,
  FaExclamationTriangle,
  FaSignInAlt,
  FaPhone,
  FaUser,
  FaVenusMars,
  FaBirthdayCake,
  FaInfoCircle,
  FaArrowLeft,
  FaTicketAlt,
  FaCalendarCheck,
  FaDownload,
  FaShare,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const LoginRequiredModal = ({ onClose, onLogin, onContinueAsGuest }) => {
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
        <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 rounded-t-2xl">
          <div className="flex-1 min-w-0">
            <h2 className="text-lg sm:text-xl font-bold flex items-center truncate">
              <FaExclamationTriangle className="mr-2 flex-shrink-0" /> 
              <span className="truncate">Login Required</span>
            </h2>
            <p className="text-xs sm:text-sm text-orange-100 truncate">Please login to book appointment</p>
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaSignInAlt className="text-orange-500 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Login to Continue
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
              You need to be logged in to book an appointment. This helps us keep your medical records secure and provide better service.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start">
              <FaShieldAlt className="text-orange-500 mt-0.5 mr-2 sm:mr-3 flex-shrink-0 text-sm sm:text-base" />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm mb-1">
                  Why login is required?
                </h4>
                <p className="text-orange-700 text-xs leading-relaxed">
                  • Secure medical records<br/>
                  • Appointment history<br/>
                  • Faster future bookings<br/>
                  • Personalized care
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 sm:space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
            >
              <FaSignInAlt className="mr-2 flex-shrink-0" /> 
              <span className="truncate">Login to Your Account</span>
            </button>

            <button
              onClick={handleSignup}
              className="w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
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

const BookingSuccessModal = ({ appointment, doctor, onClose, onViewTickets }) => {
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
MEDICAL APPOINTMENT TICKET
===========================

PATIENT INFORMATION:
-------------------
Name: ${appointment.FullName}
Phone: ${appointment.Phone}
Age: ${appointment.Age} years
Gender: ${appointment.Gender}

APPOINTMENT DETAILS:
-------------------
Doctor: Dr. ${doctor.name}
Specialization: ${doctor.specialization}
Date: ${formatDate(appointment.Date)}
Time: ${appointment.Time} (${appointment.Half})
Token: #${appointment.transactionId?.slice(-8)}

CONSULTATION FEE: ₹${appointment.amount}
Status: Confirmed ✅

IMPORTANT INSTRUCTIONS:
----------------------
• Please arrive 15 minutes before your appointment
• Bring your ID proof and medical reports
• Carry this ticket (digital or printed)
• Consultations might be delayed in emergencies

Clinic: ${doctor.location || "Main Clinic"}
Booked on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${appointment.transactionId?.slice(-8)}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const shareAppointment = async () => {
    const shareText = `My appointment with Dr. ${doctor.name} on ${formatDate(appointment.Date)} at ${appointment.Time}. Token: #${appointment.transactionId?.slice(-8)}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Medical Appointment Confirmation',
          text: shareText,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Appointment details copied to clipboard!');
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
          <h2 className="text-2xl font-bold mb-2">Appointment Confirmed!</h2>
          <p className="text-green-100">Your consultation has been successfully booked</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <h3 className="font-semibold text-green-800 mb-3 flex items-center">
              <FaCalendarCheck className="mr-2" />
              Appointment Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-green-700 font-medium">Patient</p>
                <p className="text-gray-900 font-semibold">{appointment.FullName}</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Doctor</p>
                <p className="text-gray-900 font-semibold">Dr. {doctor.name}</p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Date & Time</p>
                <p className="text-gray-900 font-semibold">
                  {formatDate(appointment.Date)} at {appointment.Time}
                </p>
              </div>
              <div>
                <p className="text-green-700 font-medium">Token Number</p>
                <p className="text-gray-900 font-semibold font-mono">#{appointment.transactionId?.slice(-8)}</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
              <FaInfoCircle className="mr-2" />
              What's Next?
            </h4>
            <ul className="text-blue-700 text-sm space-y-2">
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>You'll receive a confirmation SMS on {appointment.Phone}</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Bring your ID proof and previous medical reports</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Arrive 15 minutes before your scheduled time</span>
              </li>
              <li className="flex items-start">
                <FaCheckCircle className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>Carry this appointment confirmation</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={downloadTicket}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center"
            >
              <FaDownload className="mr-2" />
              Download Ticket
            </button>
            <button
              onClick={shareAppointment}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewTickets}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
            >
              <FaTicketAlt className="mr-2" />
              View All Appointments
            </button>
            <button
              onClick={onClose}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
            >
              Close
            </button>
          </div>

          <p className="text-center text-gray-500 text-sm">
            Need help? Call support at <span className="font-semibold">+91 99999 99999</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

const PaymentProcessingModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center"
      >
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Processing Payment</h3>
        <p className="text-gray-600 mb-4">Please wait while we complete your booking...</p>
        <p className="text-sm text-gray-500">Do not close this window</p>
      </motion.div>
    </div>
  );
};

const BookingModal = ({ doctor, onClose, user, url, onSubmit }) => {
  const [patientName, setPatientName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [half, setHalf] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const amount = doctor.fees;

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
      newErrors.date = "Appointment date is required";
    }

    if (!half) {
      newErrors.half = "Session is required";
    }

    if (!time) {
      newErrors.time = "Time slot is required";
    }

    if (!patientName.trim()) {
      newErrors.patientName = "Full name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const today = new Date().toISOString().split("T")[0];

    if (selectedDate < today) {
      alert("Past dates are not allowed. Please select a valid date.");
      setDate("");
      setDay("");
      return;
    }

    setDate(selectedDate);

    const weekday = new Date(selectedDate).toLocaleDateString("en-US", {
      weekday: "long",
    });

    if (weekday === "Saturday" || weekday === "Sunday") {
      alert("Weekends are not allowed. Please select a weekday.");
      setDate("");
      setDay("");
      return;
    }

    setDay(weekday);
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

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    setErrors(prev => ({ ...prev, gender: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const bookingData = {
      FullName: patientName,
      Phone: phone,
      Age: age,
      Gender: gender,
      Date: date,
      Half: half,
      Time: time,
      amount
    };

    await onSubmit(bookingData);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto"
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 sm:p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg md:text-xl font-bold flex items-center truncate">
              <FaCalendarAlt className="mr-2 flex-shrink-0" />
              <span className="truncate">Book Appointment</span>
            </h2>
            <p className="text-xs sm:text-sm text-indigo-100 truncate">
              with Dr. {doctor.name}
              {user && (
                <span className="ml-1 sm:ml-2 text-indigo-200">
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
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-indigo-200 flex-shrink-0"
            />
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base md:text-lg truncate">
                Dr. {doctor.name}
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">
                {doctor.specialization}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {doctor.experience}+ years experience
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
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
                  errors.patientName
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
                value={patientName}
                onChange={(e) => {
                  setPatientName(e.target.value);
                  setErrors((prev) => ({ ...prev, patientName: "" }));
                }}
                placeholder="Enter patient's full name"
                required
              />
              {errors.patientName && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.patientName}
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
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
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

            {/* Age */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaBirthdayCake className="mr-2 text-gray-500 flex-shrink-0" />
                Age (Years) *
              </label>
              <input
                type="number"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
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

            {/* Gender */}
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
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : `border-gray-200 hover:border-indigo-300 ${
                              errors.gender ? "border-red-500 bg-red-50" : ""
                            }`
                      }`}
                      onClick={() =>
                        handleGenderChange({ target: { value: option } })
                      }
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-gray-200">
            {/* Date */}
            <div>
              <label className="text-sm font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-gray-500 flex-shrink-0" />
                Appointment Date *
              </label>
              <input
                type="date"
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
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

            {/* Session */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Session *
              </label>
              <select
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
                  errors.half ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                value={half}
                onChange={(e) => {
                  setHalf(e.target.value);
                  setErrors((prev) => ({ ...prev, half: "" }));
                }}
                required
              >
                <option value="">Select Session</option>
                <option value="Morning">Morning</option>
                <option value="Evening">Evening</option>
              </select>
              {errors.half && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.half}
                </p>
              )}
            </div>

            {/* Time Slot */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Time Slot *
              </label>
              <select
                className={`w-full border rounded-xl p-3 sm:p-4 focus:ring-2 focus:ring-indigo-500 outline-none transition text-sm sm:text-base ${
                  errors.time ? "border-red-500 bg-red-50" : "border-gray-200"
                }`}
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                  setErrors((prev) => ({ ...prev, time: "" }));
                }}
                required
              >
                <option value="">Select Time</option>
                {half === "Morning" && (
                  <>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                  </>
                )}
                {half === "Evening" && (
                  <>
                    <option value="05:00 PM">05:00 PM</option>
                    <option value="06:00 PM">06:00 PM</option>
                    <option value="07:00 PM">07:00 PM</option>
                  </>
                )}
              </select>
              {errors.time && (
                <p className="text-red-500 text-xs sm:text-sm mt-1 flex items-center">
                  <FaExclamationTriangle className="mr-1 flex-shrink-0" />{" "}
                  {errors.time}
                </p>
              )}
            </div>
          </div>

          {day && (
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 sm:p-4">
              <p className="font-semibold text-indigo-700 text-sm sm:text-base flex items-center">
                <FaInfoCircle className="mr-2 flex-shrink-0" />
                <span className="truncate">
                  Selected: {day}, {date} • {half} {time}
                </span>
              </p>
            </div>
          )}

          {/* Submit Button */}
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

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [latestAppointment, setLatestAppointment] = useState(null);
  const { doctors, url, user, token, refreshDoctors, getBooking } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const status = searchParams.get('status');
    const transactionId = searchParams.get('transactionId');
    
    if (status === 'success' && transactionId) {
      handlePaymentSuccess(transactionId);
      setSearchParams({});
    }
  }, [searchParams]);

  const doctor = useMemo(() => doctors?.find((d) => d._id === id), [doctors, id]);

  const handleBookAppointment = () => {
    if (!token) {
      setShowLoginModal(true);
    } else {
      setShowModal(true);
    }
  };

  const handleContinueAsGuest = () => {
    setShowLoginModal(false);
    setShowModal(true);
  };

  const handlePaymentSuccess = async (transactionId) => {
    try {
      await getBooking();
      
      const appointment = {
        transactionId,
        FullName: user?.name || "Patient",
        Phone: user?.phone || "N/A",
        Age: "25", 
        Date: new Date().toISOString().split('T')[0],
        Time: "10:00 AM",
        Half: "Morning",
        amount: doctor?.fees || 0
      };
      
      setLatestAppointment(appointment);
      setShowSuccessModal(true);
      setShowProcessingModal(false);
    } catch (error) {
      console.error("Error handling payment success:", error);
    }
  };

  const handleViewTickets = () => {
    setShowSuccessModal(false);
    navigate('/doctors?tab=tickets');
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    setShowModal(false);
  };

  const handleBookingSubmit = async (bookingData) => {
    try {
      setShowProcessingModal(true);
      setShowModal(false);

      const transactionId = "T" + Date.now();
      const MUID = "MUID" + Date.now();
      const userId = user?.id;

      const data = {
        ...bookingData,
        userId,
        doctorId: doctor._id,
        MUID,
        transactionId,
      };

      const response = await axios.post(`${url}/api/phonepe/payment2`, data);
      
      if (response?.data?.redirectUrl) {
        localStorage.setItem('pendingAppointment', JSON.stringify({
          ...data,
          doctor: doctor
        }));
        
        window.location.href = response.data.redirectUrl;
      } else {
        throw new Error('No redirect URL received');
      }
    } catch (error) {
      console.error("Booking Error:", error);
      setShowProcessingModal(false);
      alert("Booking failed. Please try again.");
    }
  };

  if (!doctor) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center max-w-md">
          <FaUserMd className="mx-auto text-red-500 text-5xl sm:text-6xl mb-4" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">Doctor Not Found</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">The doctor you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => window.history.back()}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-semibold text-sm sm:text-base"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-4 sm:py-8 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Back Button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-800 transition group"
          >
            <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            <span className="text-sm sm:text-base">Back to Doctors</span>
          </button>
          
          {user && (
            <button
              onClick={() => navigate('/doctors?tab=tickets')}
              className="hidden md:flex items-center bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition font-semibold text-sm"
            >
              <FaTicketAlt className="mr-2" />
              My Appointments
            </button>
          )}
        </div>

        {/* Doctor Profile Card */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg sm:shadow-xl p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 lg:gap-8 transition hover:shadow-xl">
          <div className="relative flex-shrink-0">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 object-cover rounded-xl sm:rounded-2xl shadow-md border-4 border-indigo-100"
            />
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              {doctor.experience}+ yrs exp
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 text-center lg:text-left w-full">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 sm:mb-6">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-800 mb-2 break-words">
                  Dr. {doctor.name}
                </h1>
                <p className="text-indigo-600 font-semibold text-base sm:text-lg lg:text-xl mb-3 sm:mb-4">
                  {doctor.specialization}
                </p>
              </div>
              {user && (
                <div className="bg-green-100 border border-green-200 px-3 py-1 sm:px-4 sm:py-2 rounded-full mb-3 lg:mb-0 flex-shrink-0">
                  <p className="text-green-700 text-xs sm:text-sm font-medium flex items-center justify-center lg:justify-start">
                    <FaCheckCircle className="mr-1 sm:mr-2 flex-shrink-0" />
                    <span className="truncate">Logged in as {user.name}</span>
                  </p>
                </div>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 max-w-3xl line-clamp-3">
              {doctor.bio || `Dr. ${doctor.name} is a highly experienced ${doctor.specialization} with ${doctor.experience}+ years of dedicated service in medical practice. Known for compassionate patient care and expert medical guidance.`}
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 max-w-2xl">
              <InfoCard 
                icon={<FaGraduationCap className="text-lg sm:text-xl" />} 
                label="Education" 
                value={doctor.qualification || "MBBS, MD"} 
                color="blue" 
              />
              <InfoCard 
                icon={<FaBriefcase className="text-lg sm:text-xl" />} 
                label="Experience" 
                value={`${doctor.experience}+ years`} 
                color="green" 
              />
              <InfoCard 
                icon={<FaMoneyBillWave className="text-lg sm:text-xl" />} 
                label="Consultation Fee" 
                value={`₹${doctor.fees}`} 
                color="purple" 
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              <Section title={`About Dr. ${doctor.name}`}>
                <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  {doctor.description || `Dr. ${doctor.name} is a renowned ${doctor.specialization} with extensive experience in diagnosing and treating complex medical conditions. With a patient-centric approach and commitment to medical excellence, Dr. ${doctor.name} has helped thousands of patients achieve better health outcomes.`}
                </p>
              </Section>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              <Section title="Specialization & Services">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {(doctor.services || [
                    "General Consultation",
                    "Health Checkup", 
                    "Medical Prescription",
                    "Health Counseling"
                  ]).map((service, i) => (
                    <div key={i} className="flex items-center bg-gray-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-indigo-200 transition">
                      <FaCheckCircle className="text-green-500 mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0" /> 
                      <span className="text-gray-700 font-medium text-sm sm:text-base">{service}</span>
                    </div>
                  ))}
                </div>
              </Section>
            </div>

            <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
              <Section title="Patient Experience">
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                    <p className="text-gray-700 text-sm italic">
                      "Dr. {doctor.name} provided excellent care and was very thorough in explaining everything. The booking process was smooth and professional."
                    </p>
                    <p className="text-gray-600 text-xs mt-2">- Recent Patient</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-600 font-bold text-lg">98%</p>
                      <p className="text-gray-600 text-xs">Success Rate</p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-purple-600 font-bold text-lg">4.8/5</p>
                      <p className="text-gray-600 text-xs">Patient Rating</p>
                    </div>
                  </div>
                </div>
              </Section>
            </div>
          </div>

          <aside className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 space-y-4 sm:space-y-6 h-fit sticky top-4 sm:top-6">
            <div>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Book Appointment</h3>
              <p className="text-indigo-100 opacity-90 text-sm sm:text-base">
                Secure your consultation with Dr. {doctor.name}
              </p>
            </div>

            <div className="border-t border-indigo-400/30 pt-3 sm:pt-4 space-y-2 sm:space-y-3">
              <p className="flex justify-between items-center text-base sm:text-lg">
                <span>Consultation Fee</span> 
                <span className="font-bold text-xl sm:text-2xl">₹{doctor.fees}</span>
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
                "Medical records safe",
                "Easy rescheduling"
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
              onClick={handleBookAppointment}
              className="w-full bg-white text-indigo-700 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 flex items-center justify-center text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              <FaCalendarAlt className="mr-2 sm:mr-3 text-base sm:text-lg flex-shrink-0" /> 
              <span>{user ? "Book Appointment Now" : "Login to Book"}</span>
            </button>

            {!user && (
              <p className="text-xs text-center text-indigo-200">
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
              <div className="border-t border-indigo-400/30 pt-4">
                <button
                  onClick={() => navigate('/doctors?tab=tickets')}
                  className="w-full bg-indigo-500 hover:bg-indigo-400 text-white py-2 rounded-xl transition flex items-center justify-center text-sm"
                >
                  <FaTicketAlt className="mr-2" />
                  View My Appointments
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
            onClose={() => setShowLoginModal(false)}
            onLogin={() => navigate("/auth", { state: { returnUrl: window.location.pathname } })}
            onContinueAsGuest={handleContinueAsGuest}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showModal && (
          <BookingModal
            url={url}
            user={user}
            doctor={doctor}
            onClose={() => setShowModal(false)}
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
            doctor={doctor}
            onClose={handleCloseSuccess}
            onViewTickets={handleViewTickets}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 border-blue-100 text-blue-700',
    green: 'bg-green-50 border-green-100 text-green-700',
    purple: 'bg-purple-50 border-purple-100 text-purple-700'
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

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-900 border-b border-gray-200 pb-2 sm:pb-3">
      {title}
    </h3>
    <div className="text-gray-700">{children}</div>
  </div>
);

export default DoctorDetailPage;