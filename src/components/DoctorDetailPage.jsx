import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaTimes,
  FaCalendarAlt,
  FaHospitalSymbol,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import axios from "axios";


// ✅ Booking Modal Component
const BookingModal = ({ doctor, onClose, user,url }) => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [half, setHalf] = useState("");
  const [time, setTime] = useState("");

  const amount = doctor.fees; // Doctor fee for payment

const handleDateChange = (e) => {
  const selectedDate = e.target.value;
  const today = new Date().toISOString().split("T")[0];

  // ✅ Block past dates
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

  // ✅ Block Sat / Sun
  if (weekday === "Saturday" || weekday === "Sunday") {
    alert("Weekends are not allowed. Please select a weekday.");
    setDate("");
    setDay("");
    return;
  }

  setDay(weekday);
};


  const handlePayment = async () => {
    try {
      const transactionId = "T" + Date.now();
      const MUID = "MUID" + Date.now();
      const userId = user?.id || "guest";

      const data = {
        userId,
        FullName: patientName,
        Phone: phone,
        Date: date,
        Half: half,
        Time: time,
        amount,
        MUID,
        transactionId,
      };

      const response = await axios.post(
        `${url}/api/phonepe/payment2`,
        data
      );

      if (response?.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else {
        alert("Failed to redirect to PhonePe.");
      }
      
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed, please try again.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!patientName || !date || !phone || !half || !time) {
      alert("Please fill all fields.");
      return;
    }

    handlePayment();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg animate-fade-in">

        {/* Header */}
        <div className="flex justify-between items-center bg-indigo-600 text-white p-4 rounded-t-xl">
          <h2 className="text-lg font-bold flex items-center">
            <FaCalendarAlt className="mr-2" /> Book Appointment
          </h2>
          <button onClick={onClose}>
            <FaTimes size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">

          {/* Name */}
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            placeholder="Full Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          {/* Phone */}
          <input
            type="tel"
            className="w-full border rounded-lg p-2"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* Date */}
          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={date}
            onChange={handleDateChange}
            required
          />

          {day && (
            <p className="text-sm font-semibold text-indigo-700">
              Day: {day}
            </p>
          )}

          {/* Half */}
          <select
            className="w-full border rounded-lg p-2"
            value={half}
            onChange={(e) => setHalf(e.target.value)}
            required
          >
            <option value="">Select Half</option>
            <option value="Morning">Morning</option>
            <option value="Evening">Evening</option>
          </select>

          {/* Time */}
          <select
            className="w-full border rounded-lg p-2"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          >
            <option value="">Select Time Slot</option>
            <option value="09:00 AM">09:00 AM</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="05:00 PM">05:00 PM</option>
            <option value="06:00 PM">06:00 PM</option>
            <option value="07:00 PM">07:00 PM</option>
          </select>

          <button
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Confirm & Pay ₹{amount}
          </button>
        </form>

      </div>
    </div>
  );
};


// ✅ Doctor Detail Page 
const DoctorDetailPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { doctors,url,user } = useAppContext();

  const doctor = useMemo(() => doctors?.find((p) => p._id === id), [doctors, id]);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-2xl">Doctor not found! 😔</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-4 sm:px-6">

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8 border-t-4 border-indigo-500">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-40 h-40 object-cover rounded-full ring-8 ring-white shadow-2xl border-4 border-indigo-100"
            />

            <div className="flex-grow text-center md:text-left">
              <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                {doctor.specialization}
              </span>
              <h1 className="text-4xl font-extrabold mt-2 mb-2">
                {doctor.name}
              </h1>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 mt-4">
                <p className="flex items-center text-sm font-medium">
                  <FaGraduationCap className="text-indigo-500 mr-2" />
                  {doctor.qualification?.split(",")[0]}
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaBriefcase className="text-indigo-500 mr-2" />
                  {doctor.experience}+ Years
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaMoneyBillWave className="text-indigo-500 mr-2" />₹{doctor.fees}
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaHospitalSymbol className="text-indigo-500 mr-2" />
                  {doctor.clinicLocation?.split(",")[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2"></div>

          {/* Booking Box */}
          <div className="sticky top-24 bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200">
            <h3 className="text-2xl font-extrabold text-indigo-700 mb-4">Book Your Slot</h3>

            <div className="flex justify-between py-3 border-b border-indigo-200">
              <span className="flex items-center text-gray-600 font-medium">
                <FaMoneyBillWave className="mr-2 text-green-600" /> Consultation Fee
              </span>
              <span className="text-3xl font-extrabold text-green-600">₹{doctor.fees}</span>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="mt-5 w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {showModal && <BookingModal url={url} user={user} doctor={doctor} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default DoctorDetailPage;
