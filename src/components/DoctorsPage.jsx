import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FaStethoscope, 
  FaUserMd, 
  FaSearch, 
  FaStar, 
  FaMapMarkerAlt, 
  FaClock,
  FaFilter,
  FaPhone,
  FaExclamationTriangle,
  FaTimes,
  FaSignInAlt,
  FaShieldAlt,
  FaTicketAlt,
  FaCalendarCheck,
  FaDownload,
  FaShare,
  FaQrcode,
  FaIdCard,
  FaHospital,
  FaRegCalendarAlt,
  FaUser,
  FaMobileAlt,
  FaRupeeSign,
  FaCheckCircle,
} from "react-icons/fa";
import { Stethoscope, CalendarHeart, Users, FileText, ArrowLeft, X } from "lucide-react";
import { useAppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

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
          <div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center">
              <FaExclamationTriangle className="mr-2" /> Login Required
            </h2>
            <p className="text-sm text-orange-100">Please login to book appointment</p>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-white/20 p-1 sm:p-2 rounded-full transition"
          >
            <FaTimes size={18} />
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
            <p className="text-gray-600 text-xs sm:text-sm">
              You need to be logged in to book an appointment. This helps us keep your medical records secure and provide better service.
            </p>
          </div>

          <div className="bg-orange-50 border-l-4 border-orange-400 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start">
              <FaShieldAlt className="text-orange-500 mt-0.5 mr-3 flex-shrink-0 text-sm" />
              <div>
                <h4 className="font-semibold text-orange-800 text-xs sm:text-sm mb-1">
                  Why login is required?
                </h4>
                <p className="text-orange-700 text-xs">
                  • Secure medical records<br/>
                  • Appointment history<br/>
                  • Faster future bookings<br/>
                  • Personalized care
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
            >
              <FaSignInAlt className="mr-2" /> Login to Your Account
            </button>

            <button
              onClick={handleSignup}
              className="w-full border-2 border-orange-500 text-orange-600 py-3 rounded-xl font-semibold hover:bg-orange-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              Create New Account
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

const AppointmentTicket = ({ appointment, onClose, doctor }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  const getTimeSlot = (half, time) => {
    if (half === 'First Half') {
      return `Morning (${time})`;
    } else if (half === 'Second Half') {
      return `Evening (${time})`;
    }
    return time;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid':
        return { text: 'Confirmed', color: 'bg-green-100 text-green-800', icon: FaCheckCircle };
      case 'Not Paid':
        return { text: 'Pending Payment', color: 'bg-yellow-100 text-yellow-800', icon: FaClock };
      default:
        return { text: status, color: 'bg-gray-100 text-gray-800', icon: FaClock };
    }
  };

  const downloadTicketAsPDF = async () => {
    setIsDownloading(true);
    try {
      const pdfContainer = document.createElement('div');
       pdfContainer.style.position = "absolute";
       pdfContainer.style.left = "-9999px";
       pdfContainer.style.width = "794px"; 
       pdfContainer.style.padding = "40px";
       pdfContainer.style.background = "white";
       pdfContainer.style.fontFamily = "'Poppins', Arial, sans-serif";
       pdfContainer.style.color = "#1f2937";
      
      const StatusBadge = getStatusBadge(appointment.payStatus);
      const formattedDate = formatDate(appointment.Date);
      const timeSlot = getTimeSlot(appointment.Half, appointment.Time);

      pdfContainer.innerHTML = `
        <div id="pdf-ticket" style="border: 2px solid #e5e7eb; border-radius: 16px; padding: 40px; background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); position: relative;">
          <!-- Decorative corners -->
          <div style="position: absolute; top: -2px; left: -2px; width: 16px; height: 16px; background: #10b981; border-radius: 4px 0 0 0;"></div>
          <div style="position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; background: #10b981; border-radius: 0 4px 0 0;"></div>
          <div style="position: absolute; bottom: -2px; left: -2px; width: 16px; height: 16px; background: #10b981; border-radius: 0 0 0 4px;"></div>
          <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; background: #10b981; border-radius: 0 0 4px 0;"></div>
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #059669 0%, #2563eb 100%); border-radius: 12px; color: white;">
            <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">MEDICAL APPOINTMENT TICKET</div>
            <div style="font-size: 14px; opacity: 0.9; margin-top: 6px;">
            Booked via <a href="https://pomwb.com" style="color: #dcfce7; text-decoration: underline;">pomwb.com</a>
          </div>
          </div>

          <!-- Status and Token -->
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; margin-bottom: 25px; gap: 15px;">
          <div style="padding: 8px 18px; background: ${
            StatusBadge.color.includes("green") ? "#dcfce7" : "#fef3c7"
          }; color: ${
        StatusBadge.color.includes("green") ? "#166534" : "#92400e"
      }; border-radius: 20px; font-weight: 600; font-size: 13px;">
            ${StatusBadge.text}
          </div>
          <div style="padding: 8px 18px; background: #e0f2fe; color: #1e40af; border-radius: 20px; font-weight: 600; font-size: 13px;">
            Token ID: ${appointment._id?.slice(-8).toUpperCase() || "N/A"}
          </div>
        </div>


          <!-- Two Column Layout -->
           <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
          <!-- Patient Info -->
          <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 10px;">
              👤 Patient Information
            </h3>
            <div style="font-size: 14px; line-height: 1.6;">
              <div><b>Name:</b> ${appointment.FullName}</div>
              <div><b>Phone:</b> ${appointment.Phone}</div>
              <div><b>User ID:</b> ${appointment.userId?.slice(-8) || "N/A"}</div>
            </div>
          </div>

          <!-- Doctor Info -->
          <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb;">
            <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 10px;">
              ⚕️ Doctor Information
            </h3>
            <div style="font-size: 14px; line-height: 1.6;">
              <div><b>Name:</b> Dr. ${doctor?.name || "Not specified"}</div>
              <div><b>Specialization:</b> ${
                doctor?.specialization || "Not specified"
              }</div>
              <div><b>Experience:</b> ${doctor?.experience || "N/A"} years</div>
              ${
                doctor?.qualification
                  ? `<div><b>Qualification:</b> ${doctor.qualification}</div>`
                  : ""
              }
            </div>
          </div>
        </div>

          <!-- Appointment Details -->
           <div style="background: #eff6ff; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #1e3a8a; margin-bottom: 10px;">
            📅 Appointment Details
          </h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
            <div><b>Date:</b> ${formattedDate}</div>
            <div><b>Time Slot:</b> ${timeSlot}</div>
            <div><b>Consultation Fee:</b> ₹${appointment.amount}</div>
            <div><b>Transaction ID:</b> ${
              appointment.transactionId?.slice(-12) || "N/A"
            }</div>
          </div>
        </div>

          <!-- Payment Information -->
          <div style="background: #f3f4f6; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
          <h3 style="font-size: 16px; font-weight: 600; color: #059669; margin-bottom: 10px;">
            💳 Payment Information
          </h3>
          <div style="display: flex; justify-content: space-between; flex-wrap: wrap; gap: 15px; font-size: 14px;">
            <div>
              <b>Status:</b> ${
                appointment.payStatus === "paid"
                  ? "<span style='color:#059669;'>Payment Successful</span>"
                  : "<span style='color:#b45309;'>Payment Pending</span>"
              }
            </div>
            <div>
              <b>Merchant ID:</b> ${appointment.marchentId?.slice(-8) || "N/A"}
            </div>
          </div>
        </div>

          <!-- Important Instructions -->
          <div style="background: #fff7ed; border-left: 4px solid #d97706; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h4 style="color: #92400e; font-weight: 600; font-size: 14px;">⚠️ Important Instructions</h4>
          <ul style="font-size: 12px; margin-top: 10px; line-height: 1.6; color: #92400e;">
            <li>Arrive at least 15 minutes before appointment time</li>
            <li>Carry this ticket (digital or printed) and valid ID proof</li>
            <li>Bring past prescriptions or reports if available</li>
            <li>In case of emergencies, appointments may be delayed</li>
            ${
              appointment.payStatus !== "paid"
                ? `<li style="color:#dc2626; font-weight:bold;">Please complete payment to confirm your appointment</li>`
                : ""
            }
          </ul>
        </div>


          <!-- Footer -->
        <div style="text-align:center; color:#6b7280; font-size:12px; border-top:1px solid #e5e7eb; padding-top:15px;">
          <div>Generated on ${new Date().toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}</div>
          <div style="margin-top:5px;">
            Visit <a href="https://pomwb.com" style="color:#2563eb; text-decoration:underline;">pomwb.com</a> | 📞 Support: +91-7363054510
          </div>
        </div>
      </div>
      `;

      document.body.appendChild(pdfContainer);

      const canvas = await html2canvas(pdfContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
        pdf.setFillColor(248, 250, 252);
    pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
    pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      pdf.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight - 20);
      
    pdf.setFontSize(36);
    pdf.setTextColor(200);
    pdf.setGState(new pdf.GState({ opacity: 0.1 }));
    pdf.text("POMWB", pdfWidth / 2, pdfHeight / 1.9, { align: "center" });
    pdf.setGState(new pdf.GState({ opacity: 1 }));

    pdf.setFontSize(8);
    pdf.setTextColor(120, 120, 120);
    pdf.text(`Generated securely by pomwb.com • ${new Date().toLocaleString()}`, 10, pdfHeight - 5);


      pdf.save(`appointment-ticket-${appointment._id?.slice(-8) || 'POMWB'}.pdf`);

      document.body.removeChild(pdfContainer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      downloadTicketAsText(appointment, doctor);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadTicketAsText = (appointment, doctor) => {
    const StatusBadge = getStatusBadge(appointment.payStatus);
    const ticketContent = `
MEDICAL APPOINTMENT TICKET
===========================

PATIENT INFORMATION:
-------------------
Name: ${appointment.FullName}
Phone: ${appointment.Phone}
Appointment Date: ${formatDate(appointment.Date)}
Time Slot: ${getTimeSlot(appointment.Half, appointment.Time)}
Token: #${appointment._id?.slice(-8).toUpperCase() || 'N/A'}

DOCTOR INFORMATION:
------------------
Dr. ${doctor?.name || 'Not specified'}
Specialization: ${doctor?.specialization || 'Not specified'}
Experience: ${doctor?.experience || 'Not specified'} years

APPOINTMENT DETAILS:
-------------------
Consultation Fee: ₹${appointment.amount}
Status: ${StatusBadge.text}
Transaction ID: ${appointment.transactionId}

IMPORTANT INSTRUCTIONS:
----------------------
• Please arrive 15 minutes before your appointment time
• Bring your ID proof and previous medical reports
• Carry this ticket (digital or printed)
• Consultations might be delayed in case of emergencies

Booked on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `appointment-${appointment._id?.slice(-8) || 'ticket'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadTicket = async () => {
    setIsDownloading(true);
    try {
      await downloadTicketAsPDF();
    } catch (error) {
      console.error('Download failed:', error);
      downloadTicketAsText(appointment, doctor);
    } finally {
      setIsDownloading(false);
    }
  };

 const shareTicket = async () => {
    const shareText = `My appointment with Dr. ${doctor?.name} on ${formatDate(appointment.Date)} at ${getTimeSlot(appointment.Half, appointment.Time)}. Token: #${appointment._id?.slice(-8).toUpperCase()}`;
    
    const shareData = {
      title: 'Medical Appointment Ticket',
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showNotification('Appointment shared successfully!', 'success');
      } catch (error) {
        console.log('Sharing cancelled:', error);
      }
    } else {
      const textToCopy = `
Appointment Details:
──────────────────
Doctor: Dr. ${doctor?.name}
Date: ${formatDate(appointment.Date)}
Time: ${getTimeSlot(appointment.Half, appointment.Time)}
Token: #${appointment._id?.slice(-8).toUpperCase()}
Status: ${appointment.payStatus === 'paid' ? 'Confirmed' : 'Pending Payment'}

View online: ${window.location.href}
      `;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        showNotification('Appointment details copied to clipboard!', 'success');
      });
    }
  };

  const StatusBadge = getStatusBadge(appointment.payStatus);
  const StatusIcon = StatusBadge.icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold flex items-center">
                <FaTicketAlt className="mr-2 sm:mr-3" />
                Appointment {appointment.payStatus === 'paid' ? 'Confirmed' : 'Pending'}
              </h2>
              <p className="text-green-100 mt-1 text-xs sm:text-sm">
                {appointment.payStatus === 'paid' 
                  ? 'Your appointment has been booked successfully' 
                  : 'Payment pending for appointment confirmation'
                }
              </p>
            </div>
            <button
              onClick={onClose}
              className="hover:bg-white/20 p-1 sm:p-2 rounded-full transition flex-shrink-0"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-dashed border-green-200 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full -translate-x-1 -translate-y-1 sm:-translate-x-2 sm:-translate-y-2"></div>
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full translate-x-1 -translate-y-1 sm:translate-x-2 sm:-translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full -translate-x-1 translate-y-1 sm:-translate-x-2 sm:translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-green-500 rounded-full translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2"></div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <FaQrcode className="text-gray-400 text-6xl sm:text-9xl" />
            </div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <FaHospital className="text-green-600 text-xl sm:text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Medical Appointment Ticket</h3>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                  <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center ${StatusBadge.color}`}>
                    <StatusIcon className="mr-1" size={10} />
                    {StatusBadge.text}
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Token #{appointment._id?.slice(-8).toUpperCase() || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <FaIdCard className="mr-2 text-blue-500" />
                    Patient Information
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p><span className="font-medium">Name:</span> {appointment.FullName}</p>
                    <p className="flex items-center">
                      <FaMobileAlt className="mr-2 text-gray-400" size={10} />
                      <span>{appointment.Phone}</span>
                    </p>
                    <p><span className="font-medium">User ID:</span> {appointment.userId?.slice(-8)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <FaUserMd className="mr-2 text-purple-500" />
                    Doctor Information
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p className="font-medium">Dr. {doctor?.name || 'Loading...'}</p>
                    <p className="text-blue-600">{doctor?.specialization || 'Not specified'}</p>
                    <p><span className="font-medium">Exp:</span> {doctor?.experience || 'Not specified'} years</p>
                    {doctor?.qualification && (
                      <p className="text-gray-600">{doctor.qualification}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Appointment Details */}
              <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <FaRegCalendarAlt className="mr-2 text-blue-500" />
                  Appointment Details
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{formatDate(appointment.Date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time Slot</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{getTimeSlot(appointment.Half, appointment.Time)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Fees</p>
                    <p className="font-semibold text-green-600 flex items-center text-sm sm:text-base">
                      <FaRupeeSign size={10} className="mr-1" />
                      {appointment.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transaction ID</p>
                    <p className="font-semibold text-gray-900 text-xs">{appointment.transactionId?.slice(-12)}</p>
                  </div>
                </div>
              </div>

              {/* Payment Status */}
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-700 mb-2 flex items-center text-sm sm:text-base">
                  <FaCheckCircle className="mr-2 text-green-500" />
                  Payment Information
                </h4>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <p className="text-xs text-gray-600">Status</p>
                    <p className={`font-semibold text-sm sm:text-base ${
                      appointment.payStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {appointment.payStatus === 'paid' ? 'Payment Successful' : 'Payment Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Merchant ID</p>
                    <p className="font-semibold text-gray-900 text-xs">{appointment.marchentId?.slice(-8)}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 text-xs sm:text-sm mb-2">Important Instructions</h4>
                <ul className="text-yellow-700 text-xs space-y-1">
                  <li>• Please arrive 15 minutes before your appointment time</li>
                  <li>• Carry this ticket (digital or printed)</li>
                  <li>• Consultations might be delayed in case of emergencies</li>
                  {appointment.payStatus !== 'paid' && (
                    <li className="text-red-600 font-semibold">• Complete payment to confirm your appointment</li>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
              onClick={downloadTicket}
              disabled={isDownloading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
            >
              <FaDownload className="mr-2" />
              {isDownloading ? 'Generating PDF...' : 'Download PDF Ticket'}
            </button>
            <button
              onClick={shareTicket}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>

          {appointment.payStatus !== 'paid' && (
            <div className="mt-3 sm:mt-4 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
              <p className="text-red-700 text-xs sm:text-sm text-center">
                ⚠️ Your appointment is not confirmed yet. Please complete the payment.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const TicketsSection = () => {
  const { booking, login, doctors } = useAppContext();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [view, setView] = useState('upcoming');
  const [loadingDoctors, setLoadingDoctors] = useState({});

  const getDoctorForAppointment = (appointment) => {
    return doctors.find(doctor => doctor._id === appointment.doctorId);
  };

  const now = new Date();
  
  const paidAppointments = booking?.filter(apt => apt.payStatus === 'paid') || [];

  const upcomingAppointments = paidAppointments.filter(apt => {
    const aptDate = new Date(apt.Date);
    return aptDate >= now;
  });

  const pastAppointments = paidAppointments.filter(apt => {
    const aptDate = new Date(apt.Date);
    return aptDate < now;
  });

  const appointmentsToShow = view === 'upcoming' ? upcomingAppointments : pastAppointments;

  const getStatusBadge = (appointment) => {
    const aptDate = new Date(appointment.Date);
    if (aptDate < now) {
      return { text: 'Completed', color: 'bg-gray-100 text-gray-800', icon: FaCheckCircle };
    } else {
      return { text: 'Confirmed', color: 'bg-green-100 text-green-800', icon: FaCheckCircle };
    }
  };

  const formatAppointmentDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return dateString;
    }
  };

  if (!login) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft p-6 sm:p-8 text-center border border-gray-200">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaTicketAlt className="text-orange-500 text-2xl sm:text-3xl" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">Login to View Tickets</h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">Please login to see your appointment tickets and booking history</p>
        <Link
          to="/auth"
          className="inline-flex items-center bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
        >
          <FaSignInAlt className="mr-2" />
          Login Now
        </Link>
      </div>
    );
  }

  if (!booking || paidAppointments.length === 0) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft p-6 sm:p-8 text-center border border-gray-200">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaCalendarCheck className="text-blue-500 text-2xl sm:text-3xl" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">No Paid Appointments</h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          {booking && booking.length > 0 
            ? "You have appointments but no paid bookings yet." 
            : "You haven't booked any appointments yet."}
        </p>
        <Link
          to="/doctors"
          className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
        >
          <FaStethoscope className="mr-2" />
          Book Appointment
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center">
              <FaTicketAlt className="mr-2 sm:mr-3" />
              My Appointments
            </h2>
            <p className="text-blue-100 mt-1 text-sm">
              {upcomingAppointments.length} upcoming • {pastAppointments.length} completed
            </p>
          </div>
          <div className="flex space-x-1 sm:space-x-2 mt-3 sm:mt-0">
            <button
              onClick={() => setView('upcoming')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold transition duration-200 text-xs sm:text-sm ${
                view === 'upcoming' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500/50 text-white hover:bg-blue-500/70'
              }`}
            >
              Upcoming ({upcomingAppointments.length})
            </button>
            <button
              onClick={() => setView('past')}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold transition duration-200 text-xs sm:text-sm ${
                view === 'past' 
                  ? 'bg-white text-blue-600' 
                  : 'bg-blue-500/50 text-white hover:bg-blue-500/70'
              }`}
            >
              Completed ({pastAppointments.length})
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {appointmentsToShow.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaCalendarCheck className="text-gray-400 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              No {view === 'upcoming' ? 'Upcoming' : 'Completed'} Appointments
            </h3>
            <p className="text-gray-500 text-sm">
              {view === 'upcoming' 
                ? "You don't have any upcoming paid appointments." 
                : "You haven't completed any paid appointments yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {appointmentsToShow.map((appointment, index) => {
              const doctor = getDoctorForAppointment(appointment);
              const statusBadge = getStatusBadge(appointment);
              const StatusIcon = statusBadge.icon;

              return (
                <motion.div
                  key={appointment._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                            Dr. {doctor?.name || 'Loading doctor...'}
                          </h4>
                          <p className="text-blue-600 font-medium text-sm">
                            {doctor?.specialization || 'Specialization not available'}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-0">
                          <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center ${statusBadge.color}`}>
                            <StatusIcon className="mr-1" size={10} />
                            {statusBadge.text}
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                            #{appointment._id?.slice(-8).toUpperCase() || 'N/A'}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaRegCalendarAlt className="mr-2 text-blue-500 flex-shrink-0" />
                          <span className="truncate">{formatAppointmentDate(appointment.Date)}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-2 text-green-500 flex-shrink-0" />
                          <span className="truncate">
                            {appointment.Half} ({appointment.Time})
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUserMd className="mr-2 text-purple-500 flex-shrink-0" />
                          <span>Exp: {doctor?.experience || 'N/A'} yrs</span>
                        </div>
                        <div className="flex items-center text-green-600 font-semibold">
                          <FaRupeeSign size={10} className="mr-1 flex-shrink-0" />
                          <span>{appointment.amount}</span>
                        </div>
                      </div>

                      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
                        <div className="flex items-center">
                          <FaUser className="mr-2 text-gray-400 flex-shrink-0" />
                          <span>Patient: {appointment.FullName}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMobileAlt className="mr-2 text-gray-400 flex-shrink-0" />
                          <span>{appointment.Phone}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-1 justify-center mt-3 lg:mt-0 lg:ml-4">
                      <button
                        onClick={() => setSelectedAppointment(appointment)}
                        className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-9 py-2 sm:px-4 sm:py-2 rounded-xl hover:shadow-lg transition duration-200 font-semibold text-xs sm:text-sm"
                      >
                        <FaTicketAlt className="mr-2" />
                        View Ticket
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {selectedAppointment && (
        <AppointmentTicket
          appointment={selectedAppointment}
          doctor={getDoctorForAppointment(selectedAppointment)}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
};

const DoctorCard = ({ doctor, isLoggedIn, onLoginRequired }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { url } = useAppContext();

  if (!doctor) {
    return null;
  }

  const doctorName = doctor.name || 'Doctor Name Not Available';
  const doctorSpecialization = doctor.specialization || 'Specialization Not Available';
  const doctorExperience = doctor.experience || '0';
  const doctorFees = doctor.fees || '0';
  const doctorDescription = doctor.description || 'No description available.';
  const doctorQualification = doctor.qualification || 'Qualification not specified';
  const doctorLanguages = doctor.languages || ['Bengali', 'English' ];
  const doctorLocation = doctor.location || '';
  const doctorRating = doctor.rating || "4.8";

  const handleContactClick = (type) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowContactModal(true);
  };

  const handleBookAppointment = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full mx-auto mb-3 sm:mb-4">
          <FaExclamationTriangle className="text-yellow-600 text-lg sm:text-xl" />
        </div>
        
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
          Contact Support
        </h3>
        
        <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">
          To schedule a phone consultation with {" "}
          <span className="font-semibold">Dr. {doctorName}</span>, please call the Doctor Assistant during their regular business hours.
        </p>

        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">
              📞 +91 7363054510
            </div>
            <p className="text-blue-500 text-xs sm:text-sm">Business Hours</p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => window.open(`tel:+917363054510`, '_self')}
            className="w-full bg-green-600 text-white font-semibold py-2 sm:py-3 px-4 rounded-xl hover:bg-green-700 transition duration-200 text-sm sm:text-base"
          >
            Call Now
          </button>
          
          <button
            onClick={() => setShowContactModal(false)}
            className="w-full bg-gray-200 text-gray-700 font-semibold py-2 sm:py-3 px-4 rounded-xl hover:bg-gray-300 transition duration-200 text-sm sm:text-base"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const getImageSrc = () => {
    if (imageError || !doctor.image || !doctor.image._id) {
      return "/default-doctor.jpg";
    }
    return `${url}/img/${doctor.image._id}`;
  };

  return (
    <>
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="p-4 sm:p-6">
          <div className="block lg:hidden">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-2xl shadow-md border-2 border-white ${!isImageLoaded ? 'animate-pulse' : ''}`}>
                  <img
                    src={getImageSrc()}
                    alt={doctorName}
                    className={`w-full h-full object-cover rounded-2xl ${isImageLoaded ? 'block' : 'hidden'}`}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                      setIsImageLoaded(true);
                      setImageError(true);
                      e.target.src = "/default-doctor.jpg";
                    }}
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2  rounded-full text-xs font-bold">
                  {doctorExperience}+ yrs
                </div>
              </div>
              
              <div className="flex-grow min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">
                  Dr. {doctorName}
                </h3>
                <p className="text-blue-600 font-semibold flex items-center text-sm">
                  <FaStethoscope className="mr-2 flex-shrink-0" />
                  <span className="truncate">{doctorSpecialization}</span>
                </p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1 text-xs" />
                    <span className="text-sm font-semibold text-gray-700">
                      {doctorRating}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaUserMd className="mr-2 text-blue-500 flex-shrink-0" />
                <span className="truncate">{doctorQualification}</span>
              </div>
              
              {doctorLocation && (
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />
                  <span className="truncate">{doctorLocation}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-green-600 font-semibold">
                <FaClock className="mr-2 flex-shrink-0" />
                <span>Available</span>
              </div>
            </div>

            <div className="mb-3 sm:mb-4">
              <p className={`text-gray-600 text-sm leading-relaxed ${
                showFullDescription ? '' : 'line-clamp-2'
              }`}>
                {doctorDescription}
              </p>
              {doctorDescription && doctorDescription.length > 100 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-600 text-sm font-medium mt-1"
                >
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {doctorLanguages.slice(0, 2).map((lang, index) => (
                <span key={index} className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs border border-gray-200">
                  Speak: {lang}
                </span>
              ))}
              {doctorLanguages.length > 2 && (
                <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs border border-gray-200">
                  +{doctorLanguages.length - 2} more
                </span>
              )}
            </div>

            <div className="bg-gray-50 rounded-2xl p-3 sm:p-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">
                    ₹{doctorFees}
                  </div>
                  <p className="text-xs text-gray-500">Consultation Fee</p>
                </div>
                
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleContactClick("call")}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition duration-200"
                  >
                    <FaPhone size={12} />
                  </button>
                </div>
              </div>
              
              <Link 
                to={isLoggedIn ? `/doctor/${doctor._id}` : "#"}
                onClick={handleBookAppointment}
                className={`block w-full font-semibold py-2 sm:py-3 px-4 rounded-xl text-center transition duration-200 text-sm sm:text-base ${
                  isLoggedIn 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    : "bg-gradient-to-r from-purple-600 to-purple-600 text-white hover:shadow-lg"
                }`}
              >
                {isLoggedIn ? "View Profile" : "Login to Book"}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-start gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl shadow-md border-4 border-white ${!isImageLoaded ? 'animate-pulse' : ''}`}>
                <img
                  src={getImageSrc()}
                  alt={doctorName}
                  className={`w-full h-full object-cover rounded-2xl ${isImageLoaded ? 'block' : 'hidden'}`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={(e) => {
                    setIsImageLoaded(true);
                    setImageError(true);
                    e.target.src = "/default-doctor.jpg";
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                {doctorExperience}+ yrs
              </div>
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">
                    Dr. {doctorName}
                  </h3>
                  <p className="text-blue-600 font-semibold mb-2 flex items-center">
                    <FaStethoscope className="mr-2 flex-shrink-0" />
                    <span className="truncate">{doctorSpecialization}</span>
                  </p>
                </div>
                <div className="flex items-center flex-shrink-0 ml-4">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold text-gray-700">
                      {doctorRating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-2 sm:mb-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUserMd className="mr-2 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{doctorQualification}</span>
                </div>
                {doctorLocation && (
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-2 text-red-500 flex-shrink-0" />
                    <span className="truncate">{doctorLocation}</span>
                  </div>
                )}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3 sm:mb-4 max-w-2xl line-clamp-2">
                {doctorDescription}
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {doctorLanguages.slice(0, 4).map((lang, index) => (
                    <span key={index} className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs border border-gray-200">
                      {lang}
                    </span>
                  ))}
                  {doctorLanguages.length > 4 && (
                    <span className="bg-gray-50 text-gray-700 px-2 py-1 rounded-full text-xs border border-gray-200">
                      +{doctorLanguages.length - 4} more
                    </span>
                  )}
                </div>
                
                <div className="flex items-center text-sm text-green-600 font-semibold">
                  <FaClock className="mr-2 flex-shrink-0" />
                  <span>Available</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0 w-48 sm:w-64 flex flex-col gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">
                  ₹{doctorFees}
                </div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3">
                <button 
                  onClick={() => handleContactClick("call")}
                  className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-2 rounded-xl hover:bg-blue-100 transition duration-200 text-sm font-medium"
                >
                  <FaPhone size={12} />
                  Call
                </button>
              </div>

              <Link 
                to={isLoggedIn ? `/doctor/${doctor._id}` : "#"}
                onClick={handleBookAppointment}
                className={`font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-center transition duration-200 transform hover:scale-105 text-sm sm:text-base ${
                  isLoggedIn 
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg"
                    : "bg-gradient-to-r from-purple-600 to-purple-600 text-white hover:shadow-lg"
                }`}
              >
                {isLoggedIn ? "Book Appointment" : "Login to Book"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showContactModal && <ContactModal />}
      {showLoginModal && (
        <LoginRequiredModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setShowLoginModal(false)}
          onContinueAsGuest={() => setShowLoginModal(false)}
        />
      )}
    </>
  );
};

const MobileFilters = ({ 
  showFilters, 
  toggleFilters, 
  search, 
  handleSearchChange, 
  filterSpecialization, 
  handleFilterChange, 
  sortBy, 
  handleSortChange, 
  allSpecializations,
  login,
  setShowLoginModal 
}) => {
  return (
    <>
      <div className="lg:hidden mb-4">
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search doctors..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base"
          />
          <button
            onClick={toggleFilters}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-xl"
          >
            <FaFilter size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white rounded-2xl shadow-lg p-4 mb-6 border border-gray-200 overflow-hidden"
          >
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

              {!login && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-3">
                  <p className="text-orange-800 text-sm text-center mb-2">
                    🔒 Login to book appointments
                  </p>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition duration-200 text-sm"
                  >
                    Login Now
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const DoctorsPage = () => {
  const [search, setSearch] = useState("");
  const [filterSpecialization, setFilterSpecialization] = useState("All");
  const [sortBy, setSortBy] = useState("experience");
  const [showFilters, setShowFilters] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'doctors');
  
  const { doctors, login, doctorsLoading, doctorsError, booking } = useAppContext();

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'tickets') {
      setActiveTab('tickets');
    } else {
      setActiveTab('doctors');
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'doctors') {
      setSearchParams({}); 
    } else {
      setSearchParams({ tab }); 
    }
  };

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
          return (b.experience || 0) - (a.experience || 0);
        case "fees":
          return (a.fees || 0) - (b.fees || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "name":
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

  if (doctorsLoading) {
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

  if (doctorsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FaExclamationTriangle className="text-red-500 text-2xl sm:text-3xl" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3">Error Loading Doctors</h3>
          <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6">{doctorsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-blue-50 via-indigo-50 to-pink-50 border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 via-pink-100/20 to-transparent animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
          
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="p-2 sm:p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-indigo-100 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-600 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent truncate">
                {activeTab === 'doctors' ? 'Book Doctor Appointment' : 'My Appointments'}
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2 leading-snug">
                {activeTab === 'doctors' 
                  ? "Schedule your consultation with trusted medical experts in just minutes."
                  : "Manage and view all your appointment tickets and history."
                }
                {!login && activeTab === 'doctors' && (
                  <span className="block text-xs sm:text-sm text-orange-600 font-medium mt-1">
                    🔒 Login to book appointments
                  </span>
                )}
              </p>

              {activeTab === 'doctors' && (
                <div className="lg:hidden mt-2 inline-flex items-center gap-2 text-indigo-600 font-semibold bg-indigo-50 px-2 py-1 rounded-lg text-xs">
                  <Users className="w-3 h-3" />
                  {filteredDoctors.length} Doctors Available
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {activeTab === 'doctors' ? (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 px-4 py-3 lg:px-6 lg:py-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 lg:p-3 rounded-full bg-indigo-100">
                  <CalendarHeart className="w-5 h-5 lg:w-6 lg:h-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Doctors Available</p>
                  <p className="text-xl lg:text-2xl font-bold text-indigo-700">{filteredDoctors.length}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl border border-indigo-100 px-4 py-3 lg:px-6 lg:py-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 lg:p-3 rounded-full bg-green-100">
                  <FaTicketAlt className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Total Appointments</p>
                  <p className="text-xl lg:text-2xl font-bold text-green-700">{booking?.length || 0}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex space-x-2 sm:space-x-4 mb-6 sm:mb-8">
          <button
            onClick={() => handleTabChange('doctors')}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold transition duration-200 flex items-center text-sm sm:text-base ${
              activeTab === 'doctors'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FaStethoscope className="mr-2" />
            Find Doctors
          </button>
          
          <button
            onClick={() => handleTabChange('tickets')}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold transition duration-200 flex items-center relative text-sm sm:text-base ${
              activeTab === 'tickets'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FaTicketAlt className="mr-2" />
            My Appointments
            {login && booking && booking.length > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center text-xs">
                {booking.length}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'doctors' ? (
            <motion.div
              key="doctors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                <MobileFilters
                  showFilters={showFilters}
                  toggleFilters={toggleFilters}
                  search={search}
                  handleSearchChange={handleSearchChange}
                  filterSpecialization={filterSpecialization}
                  handleFilterChange={handleFilterChange}
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                  allSpecializations={allSpecializations}
                  login={login}
                  setShowLoginModal={setShowLoginModal}
                />

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

                      {!login && (
                        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                          <p className="text-orange-800 text-sm text-center mb-2">
                            🔒 Login to book appointments
                          </p>
                          <button
                            onClick={() => setShowLoginModal(true)}
                            className="block w-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition duration-200 text-sm"
                          >
                            Login Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Doctors List */}
                <div className="flex-grow">
                  <div className="hidden lg:flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Doctors
                      <span className="text-gray-500 text-lg ml-2">
                        ({filteredDoctors.length} found)
                      </span>
                    </h2>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <DoctorCard 
                          key={doctor._id} 
                          doctor={doctor} 
                          isLoggedIn={login}
                          onLoginRequired={() => setShowLoginModal(true)}
                        />
                      ))
                    ) : (
                      <div className="text-center p-8 sm:p-12 bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                          <FaSearch className="text-gray-400 text-2xl sm:text-3xl" />
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 mb-2 sm:mb-3">
                          No Doctors Found
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md mx-auto">
                          Try adjusting your search criteria or clear filters to see all doctors
                        </p>
                        <button
                          onClick={() => {
                            setSearch("");
                            setFilterSpecialization("All");
                            setShowFilters(false);
                          }}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
                        >
                          Clear Filters
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tickets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TicketsSection />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {showLoginModal && (
        <LoginRequiredModal 
          onClose={() => setShowLoginModal(false)}
          onLogin={() => setShowLoginModal(false)}
          onContinueAsGuest={() => setShowLoginModal(false)}
        />
      )}
    </div>
  );
};

export default DoctorsPage;