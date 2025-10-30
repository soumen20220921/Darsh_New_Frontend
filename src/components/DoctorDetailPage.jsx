import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FaGraduationCap,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaHospitalSymbol,
  FaTimes,
  FaCalendarAlt,
} from "react-icons/fa";

// --- DEMO DATA FOR DETAIL PAGE ---
const DUMMY_DOCTOR_DETAILS = [
    {
        _id: "1",
        name: "Dr. Ananya Sharma",
        specialization: "Cardiologist",
        qualification: "MBBS, MD (Cardiology), FACC",
        experience: 12,
        fees: 800,
        description:
            "Dr. Sharma is a highly skilled interventional cardiologist with over a decade of experience in treating complex heart diseases. She has a strong focus on preventive cardiology and patient education. Her expertise includes angioplasty, pacemaker implantation, and managing chronic heart failure. She is known for her compassionate approach and commitment to utilizing the latest advancements in cardiac care.",
        imageUrl: "https://via.placeholder.com/200/500099/FFFFFF?text=Dr.A.S",
        clinicLocation: "City Central Hospital, New Delhi",
        // Example slots - you would fetch actual dates/times from your API
        availableSlots: [
            { day: "Monday", time: "9:00 AM - 1:00 PM" },
            { day: "Wednesday", time: "3:00 PM - 7:00 PM" },
            { day: "Friday", time: "10:00 AM - 2:00 PM" },
        ],
        services: [
            "Echocardiography",
            "Stress Tests",
            "Holter Monitoring",
            "Heart Disease Management",
        ],
    },
    {
        _id: "2",
        name: "Dr. Rohan Verma",
        specialization: "Pediatrician",
        qualification: "MBBS, DCH, MD (Pediatrics)",
        experience: 8,
        fees: 650,
        description:
            "Dr. Verma is a dedicated pediatrician with a passion for child health and development. With 8 years of experience, he has expertise in managing a wide range of pediatric conditions, from common illnesses to chronic diseases. He emphasizes preventive care, nutrition, and immunization to ensure the well-being of his young patients. Dr. Verma is known for his friendly demeanor and ability to connect with children and their families.",
        imageUrl: "https://via.placeholder.com/200/007bff/FFFFFF?text=Dr.R.V",
        clinicLocation: "Sunshine Children's Clinic, Mumbai",
        availableSlots: [
            { day: "Tuesday", time: "10:00 AM - 2:00 PM" },
            { day: "Thursday", time: "4:00 PM - 8:00 PM" },

            { day: "Saturday", time: "9:00 AM - 1:00 PM" },
        ],
        services: [
            "Well Child Visits",
            "Immunizations",
            "Growth and Development Monitoring",
            "Management of Acute and Chronic Illnesses",
        ],
    },
];


const BookingModal = ({ doctor, slot, onClose }) => {
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!patientName || !patientPhone) {
        alert("Please fill in your name and phone number.");
        return;
    }
    
    console.log("Booking Request Sent:", {
        doctorId: doctor._id,
        doctorName: doctor.name,
        slot: slot,
        patientName,
        patientPhone,
        reason,
    });

    alert(
        `Appointment booked successfully!\n
        Doctor: ${doctor.name}\n
        Slot: ${slot.day} (${slot.time})\n
        We will contact you at ${patientPhone}.`
    );

    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-2xl transform transition-all duration-300 scale-100">
        
        <div className="p-5 border-b flex justify-between items-center bg-indigo-600 rounded-t-xl">
          <h3 className="text-xl font-bold text-white flex items-center">
            <FaCalendarAlt className="mr-2" />
            Book Appointment
          </h3>
          <button onClick={onClose} className="text-white hover:text-indigo-200 transition">
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-5 bg-indigo-50 border-b">
            <p className="font-semibold text-lg text-indigo-700">
                <span className="text-gray-600">You are booking for:</span> {doctor.name}
            </p>
            <p className="text-md text-gray-700 mt-1">
                <span className="font-bold">{slot.day}</span> at **{slot.time}**
            </p>
            <p className="text-2xl font-extrabold text-green-600 mt-2">
                Fee: ₹{doctor.fees}
            </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="E.g., Anil Kumar"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              required
              placeholder="E.g., 9876543210"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit (Optional)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Briefly describe your symptoms or query..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold py-3 rounded-xl text-lg shadow-lg hover:shadow-teal-500/50 transition-all duration-300 transform hover:scale-[1.01] active:scale-95"
          >
            Confirm & Pay Later
          </button>
        </form>
      </div>
    </div>
  );
};


const DoctorDetailPage = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [selectedSlot, setSelectedSlot] = useState(null);

  useEffect(() => {
    const fetchedDoctor = DUMMY_DOCTOR_DETAILS.find(doc => doc._id === id);
    
    setDoctor(fetchedDoctor);
    setLoading(false);
  }, [id]);

  const handleBookSlot = (slot) => {
    setSelectedSlot(slot);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading Doctor Profile...</p>
      </div>
    );
  }

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
        
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 mb-8 border-t-4 border-indigo-500">
           <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="flex-shrink-0">
              <img
                src={doctor.imageUrl}
                alt={doctor.name}
                className="w-40 h-40 object-cover rounded-full ring-8 ring-white shadow-2xl border-4 border-indigo-100"
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <span className="text-sm font-medium text-pink-500 bg-pink-50 px-3 py-1 rounded-full uppercase tracking-wider">
                {doctor.specialization} Specialist
              </span>
              <h1 className="text-4xl font-extrabold text-gray-900 mt-2 mb-2">
                {doctor.name}
              </h1>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-gray-600 mt-4">
                <p className="flex items-center text-sm font-medium">
                  <FaGraduationCap className="text-indigo-500 mr-2" />
                  {doctor.qualification.split(',')[0]}
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaBriefcase className="text-indigo-500 mr-2" />
                  {doctor.experience}+ Years Exp.
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaMoneyBillWave className="text-indigo-500 mr-2" />
                  ₹{doctor.fees} Fee
                </p>
                <p className="flex items-center text-sm font-medium">
                  <FaHospitalSymbol className="text-indigo-500 mr-2" />
                  {doctor.clinicLocation.split(',')[0]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                About {doctor.name}
              </h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {doctor.description}
              </p>
            </section>

            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Areas of Expertise
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {doctor.services.map((service, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <FaCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </section>
             
            <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                Full Qualifications
              </h2>
              <ul className="space-y-2 text-gray-700">
                 {doctor.qualification.split(',').map((qual, index) => (
                    <li key={index} className="flex items-start">
                        <FaGraduationCap className="text-indigo-500 mr-3 mt-1 flex-shrink-0" />
                        {qual.trim()}
                    </li>
                 ))}
              </ul>
            </section>

          </div>

          <div className="lg:col-span-1 space-y-8">
            
            <div className="sticky top-24 bg-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-200">
              <h3 className="text-2xl font-extrabold text-indigo-700 mb-4">
                Book Your Slot
              </h3>
              
              <div className="flex justify-between items-center py-3 border-b border-indigo-200">
                <span className="flex items-center text-gray-600 font-medium">
                  <FaMoneyBillWave className="mr-2 text-xl text-green-600" />
                  Consultation Fee
                </span>
                <span className="text-3xl font-extrabold text-green-600">
                  ₹{doctor.fees}
                </span>
              </div>
              
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                  <FaClock className="inline mr-2 text-pink-500" />
                  Select an Available Slot:
                </h4>
                <ul className="space-y-2">
                  {doctor.availableSlots.map((slot, index) => (
                    <li key={index}>
                        <button
                            type="button"
                            onClick={() => handleBookSlot(slot)} 
                            className="w-full text-left bg-white p-3 rounded-lg border-2 border-green-200 
                                       shadow-md hover:bg-green-100 hover:border-green-500 transition-all duration-200 
                                       active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-green-300"
                        >
                            <span className="font-bold text-green-700 block">{slot.day}</span>
                            <span className="text-sm text-gray-600">{slot.time}</span>
                            <span className="text-xs text-indigo-500 ml-2 float-right">Click to Book</span>
                        </button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-indigo-200">
                 <p className="text-sm text-gray-600 text-center">
                    All bookings are confirmed upon manual verification.
                 </p>
              </div>
            </div>

          </div>
        </div>
      </div>
      
      {selectedSlot && (
        <BookingModal 
            doctor={doctor} 
            slot={selectedSlot} 
            onClose={() => setSelectedSlot(null)} 
        />
      )}
    </div>
  );
};

export default DoctorDetailPage;