import React, { useState, useEffect,useMemo } from "react";
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
    FaPlus,
  FaMinus,
  FaCalendarCheck,
  FaCalendarAlt
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

const API_BASE = "https://api3.pomwb.com/api";
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

const BookingModal = ({ expert, onClose, user, url, onSubmit }) => {
  const [alreadyBooked, setAlreadyBooked] = useState([]);
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(`${url}/api/phonepe/get-already-booked?doctorId=${expert._id}`);
        const slots = response.data.slots || [];
        setAlreadyBooked(slots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };
    fetchBookedSlots();
  }, [expert._id, url]);

  const [step, setStep] = useState(1);
  const [patientName, setPatientName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [year] = useState(2026);
  const [month, setMonth] = useState(2);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const amount = expert.fees;

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const times = ["10:30 PM", "11:00 PM", "11:30 PM", "12:00 AM"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const convertSlotsToObjects = (slots) => {
    const monthMap = {
      January: 0, February: 1, March: 2, April: 3,
      May: 4, June: 5, July: 6, August: 7,
      September: 8, October: 9, November: 10, December: 11,
    };
    return slots.map((slot) => {
      const [datePart, time] = slot.split(" - ");
      const [day, monthName, year] = datePart.split(" ");
      return {
        year: Number(year),
        month: monthMap[monthName],
        day: Number(day),
        time,
      };
    });
  };

  const bookedSlots = convertSlotsToObjects(alreadyBooked);
  const isBooked = (day, time) =>
    bookedSlots.some(
      (b) =>
        b.year === year &&
        b.month === month &&
        b.day === day &&
        b.time === time
    );

  const validateForm = () => {
    if (!patientName || !phone || !age || !gender) {
      alert("Please fill all fields");
      return false;
    }
    if (phone.length < 10) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }
    const ageNum = Number(age);
    if (isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
      alert("Please enter a valid age between 1 and 120");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!selectedDay || !selectedTime) {
      alert("Please select a date and time slot");
      return;
    }
    const slot = `${selectedDay} ${months[month]} ${year} - ${selectedTime}`;
    try {
      setLoading(true);
      const bookingData = {
        FullName: patientName,
        Phone: phone,
        Age: String(age), // backend expects string (unchanged)
        Gender: gender,
        Slot: slot,
        amount,
      };
      await onSubmit(bookingData);
    } finally {
      setLoading(false);
    }
  };

  // Age stepper handlers
  const increaseAge = () => {
    const newAge = Math.min(Number(age) + 1, 120);
    setAge(String(newAge));
  };
  const decreaseAge = () => {
    const newAge = Math.max(Number(age) - 1, 1);
    setAge(String(newAge));
  };
  const handleAgeChange = (e) => {
    let val = e.target.value;
    if (val === "") {
      setAge("");
      return;
    }
    let num = Number(val);
    if (!isNaN(num)) {
      num = Math.min(120, Math.max(1, num));
      setAge(String(num));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
      <motion.div className="bg-white w-full max-w-4xl rounded-xl overflow-hidden my-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4 bg-indigo-600 text-white">
          <h2 className="flex items-center text-base sm:text-lg font-semibold">
            <FaCalendarAlt className="mr-2" />
            Book Appointment
          </h2>
          <FaTimes onClick={onClose} className="cursor-pointer text-xl" />
        </div>

        {/* Step 1: Patient Details */}
        {step === 1 && (
          <div className="p-4 sm:p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={decreaseAge}
                  disabled={!age || Number(age) <= 1}
                  className="p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaMinus />
                </button>
                <input
                  type="number"
                  min="1"
                  max="120"
                  value={age}
                  onChange={handleAgeChange}
                  className="flex-1 border border-gray-300 p-3 rounded-lg text-center focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={increaseAge}
                  disabled={!age || Number(age) >= 120}
                  className="p-3 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 disabled:opacity-50"
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <div className="flex flex-wrap gap-3">
                {["Male", "Female", "Other"].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGender(g)}
                    className={`px-5 py-2 rounded-lg border transition ${
                      gender === g
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-gray-100 border-gray-300 text-gray-700"
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={() => {
                if (validateForm()) setStep(2);
              }}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Next: Select Slot
            </button>
          </div>
        )}

        {/* Step 2: Calendar & Time */}
        {step === 2 && (
          <div className="p-4 sm:p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Calendar */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">{months[month]} {year}</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMonth((m) => Math.max(0, m - 1))}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={month === 0}
                    >
                      ◀
                    </button>
                    <button
                      onClick={() => setMonth((m) => Math.min(11, m + 1))}
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={month === 11}
                    >
                      ▶
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center">
                  {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
                    <div key={d} className="text-xs sm:text-sm font-medium text-gray-500">{d}</div>
                  ))}
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2"></div>
                  ))}
                  {days.map((day) => (
                    <button
                      key={day}
                      onClick={() => setSelectedDay(day)}
                      className={`p-2 sm:p-3 rounded-lg text-sm sm:text-base transition ${
                        selectedDay === day
                          ? "bg-indigo-600 text-white"
                          : "bg-gray-100 hover:bg-gray-200"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-3">Select Time</h3>
                <div className="space-y-2">
                  {times.map((time) => {
                    const booked = selectedDay && isBooked(selectedDay, time);
                    return (
                      <button
                        key={time}
                        disabled={booked}
                        onClick={() => setSelectedTime(time)}
                        className={`w-full p-3 rounded-lg text-sm sm:text-base transition ${
                          booked
                            ? "bg-red-100 text-red-500 cursor-not-allowed line-through"
                            : selectedTime === time
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
                {selectedDay && selectedTime && (
                  <p className="mt-4 text-green-600 flex items-center text-sm">
                    <FaInfoCircle className="mr-2" />
                    {selectedDay} {months[month]} - {selectedTime}
                  </p>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="mt-6 w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
                >
                  {loading ? "Processing..." : `Confirm & Pay ₹${amount}`}
                </button>
              </div>
            </div>
            <button
              onClick={() => setStep(1)}
              className="mt-6 text-indigo-600 hover:underline text-sm"
            >
              ← Back to Patient Details
            </button>
          </div>
        )}
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
  const { login, url, user, token ,therapists} = useAppContext();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
   const [showModal, setShowModal] = useState(false);
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


    const therapist = useMemo(() => therapists?.find((d) => d._id === id), [therapists, id]);

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
      setShowProcessingModal(true);
      setShowModal(false);
      const transactionId = "T" + Date.now();
      const MUID = "MUID" + Date.now();
      const userId = user?.id;
      const data = {
        ...bookingData,
        userId,
        TherapistId: therapist._id,
        MUID,
        transactionId,
      };
      const response = await axios.post(`${url}/api/phonepe/payment3`, data);
      if (response?.data?.redirectUrl) {
        localStorage.setItem('pendingAppointment', JSON.stringify({
          ...data,
          expert: therapist
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