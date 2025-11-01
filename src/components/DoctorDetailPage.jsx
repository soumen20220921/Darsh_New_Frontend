import React, { useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaTimes,
  FaCalendarAlt,
  FaShieldAlt,
  FaUserMd,
  FaCheckCircle,
} from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const BookingModal = ({ doctor, onClose, user, url }) => {
  const [patientName, setPatientName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [day, setDay] = useState("");
  const [half, setHalf] = useState("");
  const [time, setTime] = useState("");

  const amount = doctor.fees;

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
  };

  const handlePayment = async () => {
    try {
      const transactionId = "T" + Date.now();
      const MUID = "MUID" + Date.now();
      const userId = user?.id || "guest";

      const data = {
        userId,
        doctorId:doctor._id,
        FullName: patientName,
        Phone: phone,
        Date: date,
        Half: half,
        Time: time,
        amount,
        MUID,
        transactionId,
      };

      const response = await axios.post(`${url}/api/phonepe/payment2`, data);
      if (response?.data?.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      } else alert("Failed to redirect to PhonePe.");
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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl animate-fadeIn scale-95 ">
        <div className="flex justify-between items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div>
            <h2 className="text-md md:text-xl font-bold flex items-center">
              <FaCalendarAlt className="mr-2" /> Book Appointment
            </h2>
            <p className="text-sm text-indigo-100">with 
            {doctor.name}</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-center bg-gray-50 p-4 rounded-xl border">
            <img
              src={doctor.imageUrl}
              alt={doctor.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-200"
            />
            <div className="ml-3 flex-1">
              <h3 className="font-semibold text-gray-800">
                {doctor.name}
              </h3>
              <p className="text-sm text-gray-600">{doctor.specialization}</p>
            </div>
            <div className="ml-auto text-green-600 font-bold">₹{amount}</div>
          </div>

          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <input
                type="text"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Appointment Date *
              </label>
              <input
                type="date"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                value={date}
                onChange={handleDateChange}
              />
            </div>

            {day && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-3 text-sm">
                <p className="font-semibold text-indigo-700">
                  Selected: {day}, {date}
                </p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Session *
                </label>
                <select
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={half}
                  onChange={(e) => setHalf(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>Morning</option>
                  <option>Evening</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Time Slot *
                </label>
                <select
                  className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="">Select</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>05:00 PM</option>
                  <option>06:00 PM</option>
                  <option>07:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
          >
            <FaCheckCircle className="mr-2" /> Confirm & Pay ₹{amount}
          </button>

          <p className="text-xs text-center text-gray-500 flex items-center justify-center">
            <FaShieldAlt className="mr-1" /> Your payment is secure
          </p>
        </form>
      </div>
    </div>
  );
};

const DoctorDetailPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { doctors, url, user } = useAppContext();

  const doctor = useMemo(() => doctors?.find((d) => d._id === id), [doctors, id]);

  if (!doctor)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <FaUserMd className="mx-auto text-red-500 text-4xl mb-3" />
          <h2 className="text-xl font-bold">Doctor Not Found</h2>
          <button
            onClick={() => window.history.back()}
            className="mt-4 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 transition hover:shadow-2xl">
          <img
            src={doctor.imageUrl}
            alt={doctor.name}
            className="w-48 h-48 object-cover rounded-2xl shadow-lg border-4 border-indigo-100"
          />

          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-2">
             
             {doctor.name}
            </h1>
            <p className="text-indigo-600 font-semibold mb-4">
              {doctor.specialization}
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              {doctor.bio ||
                `An experienced ${doctor.specialization} with ${doctor.experience}+ years of medical excellence.`}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <InfoCard icon={<FaGraduationCap />} label="Education" value={doctor.qualification} color="blue" />
              <InfoCard icon={<FaBriefcase />} label="Experience" value={`${doctor.experience}+ yrs`} color="green" />
              <InfoCard icon={<FaMoneyBillWave />} label="Fees" value={`₹${doctor.fees}`} color="purple" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-6 space-y-6">
            <Section title={`About ${doctor.name}`}>
             
             {doctor.name} is a highly regarded {doctor.specialization} known for compassionate and effective treatment.
            </Section>

            <Section title="Specialization & Services">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(doctor.services || ["General Consultation", "Health Checkup", "Treatment Planning", "Follow-up Care"]).map((service, i) => (
                  <div key={i} className="flex items-center bg-gray-50 p-3 rounded-lg text-gray-700">
                    <FaCheckCircle className="text-green-500 mr-2" /> {service}
                  </div>
                ))}
              </div>
            </Section>
          </div>

          <aside className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-2xl shadow-xl p-6 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-1">Book Appointment</h3>
              <p className="text-sm text-indigo-100 opacity-80">
                Secure your consultation slot today
              </p>
            </div>

            <div className="border-t border-indigo-400/30 pt-4 space-y-2">
              <p className="flex justify-between">
                <span>Consultation Fee</span> <span className="font-bold text-2xl">₹{doctor.fees}</span>
              </p>
              <p className="flex justify-between text-sm opacity-80">
                <span>Taxes & charges</span> <span>₹0</span>
              </p>
            </div>

            <ul className="text-sm space-y-2 opacity-90">
              <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-400" />Instant confirmation</li>
              <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-400" />Secure payment</li>
              <li className="flex items-center"><FaCheckCircle className="mr-2 text-green-400" />24/7 support</li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-white text-indigo-700 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200"
            >
              <FaCalendarAlt className="inline-block mr-2" /> Book Appointment Now
            </button>
          </aside>
        </div>
      </div>

      {showModal && (
        <BookingModal
          url={url}
          user={user}
          doctor={doctor}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value, color }) => (
  <div className={`bg-${color}-50 border border-${color}-100 p-4 rounded-xl`}>
    <div className={`text-${color}-700 font-semibold flex items-center mb-1`}>
      {icon} <span className="ml-2">{label}</span>
    </div>
    <p className="text-gray-700 text-sm">{value || "N/A"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <div>
    <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
    <div className="text-gray-700">{children}</div>
  </div>
);

export default DoctorDetailPage;
