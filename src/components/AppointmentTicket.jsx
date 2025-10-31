import React, { useState, useEffect, useRef } from "react";
import { 
  FaCheckCircle, 
  FaCalendarAlt, 
  FaUserMd, 
  FaMapMarkerAlt,
  FaTimes,
  FaQrcode,
  FaStethoscope,
  FaPhone,
  FaEnvelope,
  FaRupeeSign,
  FaIdCard,
  FaStar,
  FaArrowLeft,
  FaArrowRight
} from "react-icons/fa";

// ✅ Enhanced Dummy Data Generator
const generateDummyAppointment = (doctor) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "05:00 PM", "06:00 PM", "07:00 PM"];
  const halves = ["Morning", "Evening"];
  const statuses = ['confirmed', 'pending', 'cancelled'];
  
  return {
    FullName: "John Doe",
    Phone: "+91 98765 43210",
    Date: tomorrow.toISOString().split('T')[0],
    Half: halves[Math.floor(Math.random() * halves.length)],
    Time: timeSlots[Math.floor(Math.random() * timeSlots.length)],
    amount: doctor.fees,
    transactionId: "TXN" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    bookingDate: new Date().toISOString(),
    appointmentId: "APT" + Math.random().toString(36).substr(2, 6).toUpperCase(),
    patientAge: Math.floor(Math.random() * 60) + 18,
    patientGender: ["Male", "Female"][Math.floor(Math.random() * 2)],
    symptoms: ["Chest Pain", "Headache", "Fever", "Cough"][Math.floor(Math.random() * 4)]
  };
};

// ✅ Enhanced Dummy Doctor Data
const dummyDoctors = [
  {
    _id: "doc_123",
    name: "Sarah Johnson",
    specialization: "Cardiologist",
    qualification: "MD, DM Cardiology",
    experience: 12,
    fees: 800,
    rating: 4.8,
    location: "Apollo Hospital, Delhi",
    imageUrl: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
    languages: ["English", "Hindi", "Spanish"],
    description: "Senior Cardiologist with 12+ years of experience in interventional cardiology. Specialized in angioplasty and heart disease management.",
    services: ["Heart Checkup", "ECG", "Echo", "Angioplasty"],
    availability: ["Mon", "Wed", "Fri"],
    nextAvailable: "2024-01-15"
  },
  {
    _id: "doc_124",
    name: "Rajesh Kumar",
    specialization: "Neurologist",
    qualification: "MD, DM Neurology",
    experience: 8,
    fees: 1200,
    rating: 4.9,
    location: "Max Hospital, Mumbai",
    imageUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&h=150&fit=crop&crop=face",
    languages: ["English", "Hindi", "Marathi"],
    description: "Expert neurologist specializing in brain and nervous system disorders.",
    services: ["Brain MRI", "EEG", "Neurological Consultation"],
    availability: ["Tue", "Thu", "Sat"],
    nextAvailable: "2024-01-16"
  }
];

const StatusBadge = ({ status }) => {
  const statusConfig = {
    confirmed: { color: "bg-green-100 text-green-800 border-green-200", text: "Confirmed" },
    pending: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Pending" },
    cancelled: { color: "bg-red-100 text-red-800 border-red-200", text: "Cancelled" }
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      {config.text}
    </span>
  );
};

const AppointmentTicket = ({ onClose, showDemo = true }) => {
  const [appointment, setAppointment] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const ticketRef = useRef(null);

  useEffect(() => {
    if (showDemo) {
      setDoctor(dummyDoctors[currentDoctorIndex]);
      setAppointment(generateDummyAppointment(dummyDoctors[currentDoctorIndex]));
    }
  }, [showDemo, currentDoctorIndex]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };


  const generateQRCode = () => {
    if (!appointment) return "";
    const qrData = JSON.stringify({
      doctor: doctor.name,
      patient: appointment.FullName,
      date: appointment.Date,
      time: appointment.Time,
      id: appointment.transactionId
    });
    return `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(qrData)}`;
  };

 
  
  const nextDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev + 1) % dummyDoctors.length);
  };

  const prevDoctor = () => {
    setCurrentDoctorIndex((prev) => (prev - 1 + dummyDoctors.length) % dummyDoctors.length);
  };

  if (!appointment || !doctor) {
    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div ref={ticketRef} className="bg-white w-full max-w-6xl rounded-3xl shadow-2xl animate-fadeIn overflow-hidden max-h-[95vh] overflow-y-auto">
        {showDemo && (
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-3 px-4 flex justify-between items-center">
            <span className="text-sm font-medium flex items-center">
              🎯 DEMO MODE - Showing Sample Ticket
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevDoctor}
                className="p-1 hover:bg-white/20 rounded-full transition"
                title="Previous Doctor"
              >
                <FaArrowLeft size={14} />
              </button>
              <button
                onClick={nextDoctor}
                className="p-1 hover:bg-white/20 rounded-full transition"
                title="Next Doctor"
              >
                <FaArrowRight size={14} />
              </button>
            </div>
          </div>
        )}
        
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 relative">
          <div className="flex justify-between items-start">
            <div className="flex items-center">
              <FaCheckCircle className="text-4xl mr-4 animate-pulse" />
              <div>
                <h2 className="text-lg md:text-3xl whitespace-nowrap font-bold">Booking {appointment.status === 'confirmed' ? 'Confirmed!' : appointment.status}</h2>
                <p className="text-green-100 text-xs md:text-base">
                  {appointment.status === 'confirmed' 
                    ? 'Your appointment has been scheduled successfully' 
                    : `Your appointment is ${appointment.status}`}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              
              <button
                onClick={onClose}
                className="hover:bg-white/20 p-2 rounded-full transition"
              >
                <FaTimes size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center justify-between mt-4 gap-2">
            <div className="flex items-center gap-4">
              <StatusBadge status={appointment.status} />
              <span className="hidden md:block text-green-100 text-sm">
                ID: {appointment.transactionId}
              </span>
            </div>
            <span className="text-green-100 text-sm">
              Booked on: {new Date(appointment.bookingDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        <div className="border-b bg-gray-50">
          <div className="hidden md:flex overflow-x-auto">
            {["details", "doctor", "instructions"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition ${
                  activeTab === tab
                    ? "border-green-600 text-green-600 bg-white"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab === "details" && "Appointment Details"}
                {tab === "doctor" && "Doctor Info"}
                {tab === "instructions" && "Instructions"}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="block lg:hidden space-y-6">
            <div className="bg-white border border-gray-200 rounded-2xl p-4">
              <div className="flex items-start gap-4">
                <img
                  src={doctor.imageUrl}
                  alt={doctor.name}
                  className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-gray-900 truncate">Dr. {doctor.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm flex items-center">
                    <FaStethoscope className="mr-1" />
                    {doctor.specialization}
                  </p>
                  <div className="flex items-center mt-1 text-gray-600 text-xs">
                    <FaMapMarkerAlt className="mr-1" />
                    <span className="truncate">{doctor.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-green-600 flex items-center justify-end">
                    <FaRupeeSign size={12} />
                    {doctor.fees}
                  </div>
                  <div className="flex items-center justify-end mt-1">
                    <FaStar className="text-yellow-500 mr-1 text-xs" />
                    <span className="text-sm font-semibold text-gray-700">{doctor.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {(activeTab === "details" || activeTab === "doctor") && (
              <div className="space-y-4">
                <DetailCard
                  icon={<FaUserMd className="text-blue-600" />}
                  title="Patient Information"
                  items={[
                    { label: "Full Name", value: appointment.FullName },
                    { label: "Phone", value: appointment.Phone },
                    { label: "Age & Gender", value: `${appointment.patientAge} years, ${appointment.patientGender}` },
                    { label: "Appointment ID", value: appointment.transactionId, icon: <FaIdCard /> }
                  ]}
                  compact
                />

                <DetailCard
                  icon={<FaCalendarAlt className="text-purple-600" />}
                  title="Appointment Details"
                  items={[
                    { label: "Date", value: formatDate(appointment.Date) },
                    { label: "Time", value: `${appointment.Time} (${appointment.Half})` },
                    { label: "Status", value: <StatusBadge status={appointment.status} />, highlight: true }
                  ]}
                  compact
                />

                <div className="bg-white border border-gray-200 rounded-2xl p-4 text-center">
                  <FaQrcode className="text-3xl text-gray-600 mx-auto mb-2" />
                  <img 
                    src={generateQRCode()} 
                    alt="QR Code" 
                    className="w-24 h-24 mx-auto border rounded-lg"
                  />
                  <p className="text-xs text-gray-600 mt-2">Show this QR at reception</p>
                </div>
              </div>
            )}

            
          </div>

          <div className="hidden lg:grid grid-cols-1 xl:grid-cols-4 gap-8">
            <div className="xl:col-span-3 space-y-6">
              {activeTab === "details" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DetailCard
                    icon={<FaUserMd className="text-blue-600" />}
                    title="Patient Information"
                    items={[
                      { label: "Full Name", value: appointment.FullName },
                      { label: "Phone", value: appointment.Phone },
                      { label: "Age & Gender", value: `${appointment.patientAge} years, ${appointment.patientGender}` },
                      { label: "Symptoms", value: appointment.symptoms },
                      { label: "Appointment ID", value: appointment.transactionId, icon: <FaIdCard /> }
                    ]}
                  />

                  <DetailCard
                    icon={<FaCalendarAlt className="text-purple-600" />}
                    title="Appointment Details"
                    items={[
                      { label: "Date", value: formatDate(appointment.Date) },
                      { label: "Time", value: `${appointment.Time} (${appointment.Half})` },
                      { label: "Booked On", value: new Date(appointment.bookingDate).toLocaleDateString() },
                      { label: "Status", value: <StatusBadge status={appointment.status} />, highlight: true }
                    ]}
                  />
                </div>
              )}

              {activeTab === "doctor" && (
                <div className="space-y-6">
                  <div className="flex items-center bg-gray-50 rounded-2xl p-6 border border-gray-200">
                    <img
                      src={doctor.imageUrl}
                      alt={doctor.name}
                      className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-md"
                    />
                    <div className="ml-6 flex-1">
                      <h3 className="text-2xl font-bold text-gray-900">Dr. {doctor.name}</h3>
                      <p className="text-blue-600 font-semibold text-lg flex items-center">
                        <FaStethoscope className="mr-2" />
                        {doctor.specialization}
                      </p>
                      <div className="flex items-center mt-1 text-gray-600">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center mt-2 gap-4">
                        <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                          <FaStar className="text-yellow-500 mr-1" />
                          <span className="font-semibold text-gray-700">{doctor.rating}</span>
                        </div>
                        <span className="text-sm text-gray-500">{doctor.experience}+ years experience</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-600 flex items-center justify-end">
                        <FaRupeeSign size={20} />
                        {doctor.fees}
                      </div>
                      <div className="text-sm text-gray-500 bg-green-100 px-3 py-1 rounded-full mt-2">Consultation Fee</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DetailCard
                      icon="🎓"
                      title="Qualifications"
                      items={[
                        { label: "Specialization", value: doctor.specialization },
                        { label: "Degree", value: doctor.qualification },
                        { label: "Experience", value: `${doctor.experience}+ years` },
                        { label: "Languages", value: doctor.languages.join(", ") }
                      ]}
                    />

                    <DetailCard
                      icon="🕒"
                      title="Availability"
                      items={[
                        { label: "Available Days", value: doctor.availability.join(", ") },
                        { label: "Next Available", value: formatDate(doctor.nextAvailable) },
                        { label: "Services", value: doctor.services.slice(0, 3).join(", ") }
                      ]}
                    />
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h4 className="font-bold text-blue-800 text-lg mb-3">About Dr. {doctor.name}</h4>
                    <p className="text-blue-700 leading-relaxed">{doctor.description}</p>
                  </div>
                </div>
              )}

              {activeTab === "instructions" && (
                <div className="space-y-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                    <h4 className="font-bold text-yellow-800 text-lg mb-4 flex items-center">
                      ⚡ Pre-Appointment Instructions
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-yellow-700">
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Arrive 15 minutes before your scheduled time</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Carry all previous medical records and reports</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Consultation duration is typically 15-20 minutes</span>
                        </div>
                        <div className="flex items-start">
                          <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span>Emergency contact: 9999999999</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                    <h4 className="font-bold text-green-800 text-lg mb-4 flex items-center">
                      🏥 COVID Safety Measures
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Mask is mandatory throughout the visit
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Maintain social distancing in waiting areas
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Use hand sanitizer available at entrance
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Temperature check at reception
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Limited visitors allowed
                        </div>
                        <div className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Digital payments preferred
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 text-center">
                <FaQrcode className="text-4xl text-gray-600 mx-auto mb-3" />
                <img 
                  src={generateQRCode()} 
                  alt="QR Code" 
                  className="w-32 h-32 mx-auto border rounded-lg"
                />
                <p className="text-sm text-gray-600 mt-3">Show this QR at reception</p>
                <p className="text-xs text-gray-400 mt-1">ID: {appointment.transactionId}</p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h5 className="font-semibold text-blue-800 mb-3">Need Help?</h5>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center text-blue-700">
                    <FaPhone className="mr-3" />
                    <span>+91 9999999999</span>
                  </div>
                  <div className="flex items-center text-blue-700">
                    <FaEnvelope className="mr-3" />
                    <span>support@medapp.com</span>
                  </div>
                  <div className="text-xs text-blue-600 mt-2 leading-relaxed">
                    24/7 customer support available for any queries or assistance
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </div>

        <div className="bg-gray-50 border-t p-6 text-center">
          <p className="text-gray-600 text-sm">
            Thank you for choosing our service. We look forward to serving you!
          </p>
          {showDemo && (
            <p className="text-xs text-gray-400 mt-2">
              This is a demo ticket. In real scenario, data will come from actual booking.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailCard = ({ icon, title, items, compact = false }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl ${compact ? 'p-4' : 'p-6'}`}>
    <div className="flex items-center mb-4">
      <span className="text-lg">{icon}</span>
      <h4 className={`font-semibold text-gray-900 ml-3 ${compact ? 'text-base' : 'text-lg'}`}>{title}</h4>
    </div>
    <div className={`space-y-${compact ? '2' : '3'}`}>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between items-start">
          <span className={`text-gray-600 ${compact ? 'text-xs' : 'text-sm'} flex items-center flex-shrink-0`}>
            {item.icon && <span className="mr-2">{item.icon}</span>}
            {item.label}:
          </span>
          <span className={`font-semibold text-right ${compact ? 'text-xs' : 'text-sm'} ${
            item.highlight ? 'text-green-600' : 'text-gray-900'
          } ml-2 flex-1`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default AppointmentTicket;