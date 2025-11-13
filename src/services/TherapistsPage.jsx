import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  FaUser, 
  FaSearch, 
  FaStar, 
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
  FaRegCalendarAlt,
  FaMobileAlt,
  FaRupeeSign,
  FaCheckCircle,
  FaCalendarDay,
  FaHeart,
  FaComments,
  FaAward,
  FaUsers,
  FaSpa,
  FaCalendarPlus,
  FaSun,
  FaMoon 
} from "react-icons/fa";
import { Users, CalendarHeart, MessageCircle, Shield } from "lucide-react";
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
        <div className="flex justify-between items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 sm:p-6 rounded-t-2xl">
          <div>
            <h2 className="text-lg sm:text-xl font-bold flex items-center">
              <FaExclamationTriangle className="mr-2" /> Login Required
            </h2>
            <p className="text-sm text-purple-100">Please login to book service</p>
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaSignInAlt className="text-purple-500 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
              Login to Continue
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm">
              You need to be logged in to book a beauty & wellness service. This ensures personalized care and service history.
            </p>
          </div>

          <div className="bg-purple-50 border-l-4 border-purple-400 p-3 sm:p-4 rounded-lg">
            <div className="flex items-start">
              <FaShieldAlt className="text-purple-500 mt-0.5 mr-3 flex-shrink-0 text-sm" />
              <div>
                <h4 className="font-semibold text-purple-800 text-xs sm:text-sm mb-1">
                  Why login is required?
                </h4>
                <p className="text-purple-700 text-xs">
                  • Secure and confidential bookings<br/>
                  • Service history tracking<br/>
                  • Personalized treatment plans<br/>
                  • Progress monitoring
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center text-sm sm:text-base"
            >
              <FaSignInAlt className="mr-2" /> Login to Your Account
            </button>

            <button
              onClick={handleSignup}
              className="w-full border-2 border-purple-500 text-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all duration-200 flex items-center justify-center text-sm sm:text-base"
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

const ServiceTicket = ({ session, onClose, therapist }) => {
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
      
      const StatusBadge = getStatusBadge(session.payStatus);
      const formattedDate = formatDate(session.Date);
      const timeSlot = getTimeSlot(session.Half, session.Time);

      pdfContainer.innerHTML = `
        <div id="pdf-ticket" style="border: 2px solid #e5e7eb; border-radius: 16px; padding: 40px; background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%); position: relative;">
          <!-- Decorative corners -->
          <div style="position: absolute; top: -2px; left: -2px; width: 16px; height: 16px; background: #8b5cf6; border-radius: 4px 0 0 0;"></div>
          <div style="position: absolute; top: -2px; right: -2px; width: 16px; height: 16px; background: #8b5cf6; border-radius: 0 4px 0 0;"></div>
          <div style="position: absolute; bottom: -2px; left: -2px; width: 16px; height: 16px; background: #8b5cf6; border-radius: 0 0 0 4px;"></div>
          <div style="position: absolute; bottom: -2px; right: -2px; width: 16px; height: 16px; background: #8b5cf6; border-radius: 0 0 4px 0;"></div>
          
          <!-- Header -->
          <div style="text-align: center; margin-bottom: 30px; padding: 20px; background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%); border-radius: 12px; color: white;">
            <div style="font-size: 28px; font-weight: bold; margin-bottom: 8px;">BEAUTY & WELLNESS SERVICE TICKET</div>
            <div style="font-size: 14px; opacity: 0.9; margin-top: 6px;">
              Premium beauty treatments and wellness therapies
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
            <div style="padding: 8px 18px; background: #e0e7ff; color: #3730a3; border-radius: 20px; font-weight: 600; font-size: 13px;">
              Service ID: ${session._id?.slice(-8).toUpperCase() || "N/A"}
            </div>
          </div>

          <!-- Two Column Layout -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 25px; margin-bottom: 25px;">
            <!-- Client Info -->
            <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 10px;">
                👤 Client Information
              </h3>
              <div style="font-size: 14px; line-height: 1.6;">
                <div><b>Name:</b> ${session.FullName}</div>
                <div><b>Phone:</b> ${session.Phone}</div>
                <div><b>User ID:</b> ${session.userId?.slice(-8) || "N/A"}</div>
              </div>
            </div>

            <!-- Therapist Info -->
            <div style="background: white; border-radius: 12px; padding: 25px; border: 1px solid #e5e7eb;">
              <h3 style="font-size: 16px; font-weight: 600; color: #374151; margin-bottom: 10px;">
                ✨ Expert Information
              </h3>
              <div style="font-size: 14px; line-height: 1.6;">
                <div><b>Name:</b> ${therapist?.name || "Not specified"}</div>
                <div><b>Specialties:</b> ${
                  therapist?.specialties?.join(", ") || "Not specified"
                }</div>
                <div><b>Experience:</b> ${therapist?.experience || "N/A"}</div>
                ${
                  therapist?.certification
                    ? `<div><b>Certification:</b> ${therapist.certification}</div>`
                    : ""
                }
              </div>
            </div>
          </div>

          <!-- Service Details -->
          <div style="background: #eef2ff; padding: 25px; border-radius: 12px; margin-bottom: 25px;">
            <h3 style="font-size: 16px; font-weight: 600; color: #3730a3; margin-bottom: 10px;">
              📅 Service Details
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
              <div><b>Date:</b> ${formattedDate}</div>
              <div><b>Time Slot:</b> ${timeSlot}</div>
              <div><b>Service Fee:</b> ₹${session.amount}</div>
              <div><b>Transaction ID:</b> ${
                session.transactionId?.slice(-12) || "N/A"
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
                  session.payStatus === "paid"
                    ? "<span style='color:#059669;'>Payment Successful</span>"
                    : "<span style='color:#b45309;'>Payment Pending</span>"
                }
              </div>
              <div>
                <b>Merchant ID:</b> ${session.marchentId?.slice(-8) || "N/A"}
              </div>
            </div>
          </div>

          <!-- Important Instructions -->
          <div style="background: #fdf2f8; border-left: 4px solid #ec4899; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
            <h4 style="color: #be185d; font-weight: 600; font-size: 14px;">💆‍♀️ Service Guidelines</h4>
            <ul style="font-size: 12px; margin-top: 10px; line-height: 1.6; color: #be185d;">
              <li>Arrive 10 minutes before scheduled time</li>
              <li>Wear comfortable clothing for treatments</li>
              <li>Inform about any allergies or medical conditions</li>
              <li>Keep your booking confirmation ready</li>
              ${
                session.payStatus !== "paid"
                  ? `<li style="color:#dc2626; font-weight:bold;">Please complete payment to confirm your service</li>`
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
              Premium Beauty & Wellness Service • Your comfort is our priority
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
      
      pdf.setFillColor(250, 245, 255);
      pdf.rect(0, 0, pdfWidth, pdfHeight, "F");
      pdf.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight - 20);
      
      pdf.setFontSize(36);
      pdf.setTextColor(200);
      pdf.setGState(new pdf.GState({ opacity: 0.1 }));
      pdf.text("BEAUTY & WELLNESS", pdfWidth / 2, pdfHeight / 1.9, { align: "center" });
      pdf.setGState(new pdf.GState({ opacity: 1 }));

      pdf.setFontSize(8);
      pdf.setTextColor(120, 120, 120);
      pdf.text(`Premium Service • ${new Date().toLocaleString()}`, 10, pdfHeight - 5);

      pdf.save(`beauty-wellness-service-${session._id?.slice(-8) || 'service'}.pdf`);

      document.body.removeChild(pdfContainer);

    } catch (error) {
      console.error('Error generating PDF:', error);
      downloadTicketAsText(session, therapist);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadTicketAsText = (session, therapist) => {
    const StatusBadge = getStatusBadge(session.payStatus);
    const ticketContent = `
BEAUTY & WELLNESS SERVICE TICKET
=================================

CLIENT INFORMATION:
-------------------
Name: ${session.FullName}
Phone: ${session.Phone}
Service Date: ${formatDate(session.Date)}
Time Slot: ${getTimeSlot(session.Half, session.Time)}
Service ID: #${session._id?.slice(-8).toUpperCase() || 'N/A'}

EXPERT INFORMATION:
-------------------
${therapist?.name || 'Not specified'}
Specialties: ${therapist?.specialties?.join(", ") || 'Not specified'}
Experience: ${therapist?.experience || 'Not specified'}

SERVICE DETAILS:
----------------
Service Fee: ₹${session.amount}
Status: ${StatusBadge.text}
Transaction ID: ${session.transactionId}

IMPORTANT INSTRUCTIONS:
----------------------
• Arrive 10 minutes before scheduled time
• Wear comfortable clothing
• Inform about allergies or medical conditions
• Keep booking confirmation ready

Booked on: ${new Date().toLocaleDateString()}
    `;
    
    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `beauty-wellness-service-${session._id?.slice(-8) || 'service'}.txt`;
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
      downloadTicketAsText(session, therapist);
    } finally {
      setIsDownloading(false);
    }
  };

  const shareTicket = async () => {
    const shareText = `My beauty & wellness service with ${therapist?.name} on ${formatDate(session.Date)} at ${getTimeSlot(session.Half, session.Time)}. Service ID: #${session._id?.slice(-8).toUpperCase()}`;
    
    const shareData = {
      title: 'Beauty & Wellness Service Ticket',
      text: shareText,
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Sharing cancelled:', error);
      }
    } else {
      const textToCopy = `
Beauty & Wellness Service Details:
────────────────────────────────
Expert: ${therapist?.name}
Date: ${formatDate(session.Date)}
Time: ${getTimeSlot(session.Half, session.Time)}
Service ID: #${session._id?.slice(-8).toUpperCase()}
Status: ${session.payStatus === 'paid' ? 'Confirmed' : 'Pending Payment'}

View online: ${window.location.href}
      `;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        // showNotification('Service details copied to clipboard!', 'success');
      });
    }
  };

  const StatusBadge = getStatusBadge(session.payStatus);
  const StatusIcon = StatusBadge.icon;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto"
      >
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg sm:text-2xl font-bold flex items-center">
                <FaSpa className="mr-2 sm:mr-3" />
                Service {session.payStatus === 'paid' ? 'Confirmed' : 'Pending'}
              </h2>
              <p className="text-purple-100 mt-1 text-xs sm:text-sm">
                {session.payStatus === 'paid' 
                  ? 'Your beauty & wellness service has been booked successfully' 
                  : 'Payment pending for service confirmation'
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
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-dashed border-purple-200 rounded-2xl p-4 sm:p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full -translate-x-1 -translate-y-1 sm:-translate-x-2 sm:-translate-y-2"></div>
            <div className="absolute top-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full translate-x-1 -translate-y-1 sm:translate-x-2 sm:-translate-y-2"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full -translate-x-1 translate-y-1 sm:-translate-x-2 sm:translate-y-2"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 sm:w-4 sm:h-4 bg-purple-500 rounded-full translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2"></div>
            
            <div className="absolute inset-0 flex items-center justify-center opacity-5">
              <FaSpa className="text-purple-400 text-6xl sm:text-9xl" />
            </div>

            <div className="relative z-10">
              {/* Header Section */}
              <div className="text-center mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3">
                  <FaSpa className="text-purple-600 text-xl sm:text-2xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Beauty & Wellness Service Ticket</h3>
                <div className="flex flex-wrap justify-center items-center gap-2 mt-2">
                  <div className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center ${StatusBadge.color}`}>
                    <StatusIcon className="mr-1" size={10} />
                    {StatusBadge.text}
                  </div>
                  <div className="bg-indigo-100 text-indigo-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Service #${session._id?.slice(-8).toUpperCase() || 'N/A'}
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <FaIdCard className="mr-2 text-indigo-500" />
                    Client Information
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p><span className="font-medium">Name:</span> {session.FullName}</p>
                    <p className="flex items-center">
                      <FaMobileAlt className="mr-2 text-gray-400" size={10} />
                      <span>{session.Phone}</span>
                    </p>
                    <p><span className="font-medium">User ID:</span> {session.userId?.slice(-8)}</p>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                    <FaUser className="mr-2 text-purple-500" />
                    Expert Information
                  </h4>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <p className="font-medium">{therapist?.name || 'Loading...'}</p>
                    <p className="text-purple-600">{therapist?.specialties?.slice(0, 2).join(", ") || 'Not specified'}</p>
                    <p><span className="font-medium">Exp:</span> {therapist?.experience || 'Not specified'}</p>
                    {therapist?.certification && (
                      <p className="text-gray-600">{therapist.certification}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Service Details */}
              <div className="bg-indigo-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                  <FaRegCalendarAlt className="mr-2 text-indigo-500" />
                  Service Details
                </h4>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Date</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{formatDate(session.Date)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Time Slot</p>
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{getTimeSlot(session.Half, session.Time)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Service Fee</p>
                    <p className="font-semibold text-green-600 flex items-center text-sm sm:text-base">
                      <FaRupeeSign size={10} className="mr-1" />
                      {session.amount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Transaction ID</p>
                    <p className="font-semibold text-gray-900 text-xs">{session.transactionId?.slice(-12)}</p>
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
                      session.payStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'
                    }`}>
                      {session.payStatus === 'paid' ? 'Payment Successful' : 'Payment Pending'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Merchant ID</p>
                    <p className="font-semibold text-gray-900 text-xs">{session.marchentId?.slice(-8)}</p>
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-pink-50 border-l-4 border-pink-400 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-pink-800 text-xs sm:text-sm mb-2">💆‍♀️ Service Guidelines</h4>
                <ul className="text-pink-700 text-xs space-y-1">
                  <li>• Arrive 10 minutes before scheduled time</li>
                  <li>• Wear comfortable clothing for treatments</li>
                  <li>• Inform about any allergies or medical conditions</li>
                  <li>• Keep booking confirmation ready</li>
                  {session.payStatus !== 'paid' && (
                    <li className="text-red-600 font-semibold">• Complete payment to confirm your service</li>
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
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center disabled:opacity-50 text-sm sm:text-base"
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

          {session.payStatus !== 'paid' && (
            <div className="mt-3 sm:mt-4 bg-red-50 border border-red-200 rounded-xl p-3 sm:p-4">
              <p className="text-red-700 text-xs sm:text-sm text-center">
                ⚠️ Your service is not confirmed yet. Please complete the payment.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ServicesSection = () => {
  const { booking, login, therapists } = useAppContext();
  const [selectedSession, setSelectedSession] = useState(null);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const view = searchParams.get('view') || "upcoming";

  const now = new Date();

  const parseSessionTime = (timeStr, half) => {
    if (!timeStr) return now;
    let [hours, minutes] = timeStr.split(":").map(Number);
    if (half?.toLowerCase() === "pm" && hours < 12) hours += 12;
    if (half?.toLowerCase() === "am" && hours === 12) hours = 0;

    const d = new Date();
    d.setHours(hours, minutes || 0, 0, 0);
    return d;
  };

  const getTherapistForSession = (session) =>
    therapists.find((therapist) => therapist._id === session.therapistId);

  const paidSessions = booking?.filter((session) => session.payStatus === "paid") || [];

  const currentDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const todaysSessions = paidSessions.filter((session) => {
    const sessionDate = new Date(session.Date);
    const sessionOnlyDate = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    return sessionOnlyDate.getTime() === currentDate.getTime();
  });

  const upcomingSessions = paidSessions.filter((session) => {
    const sessionDate = new Date(session.Date);
    const sessionOnlyDate = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    return sessionOnlyDate > currentDate;
  });

  const pastSessions = paidSessions.filter((session) => {
    const sessionDate = new Date(session.Date);
    const sessionOnlyDate = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    return sessionOnlyDate < currentDate;
  });

  const getSessionsToShow = () => {
    switch (view) {
      case "today":
        return todaysSessions;
      case "completed":
        return pastSessions;
      case "upcoming":
      default:
        return upcomingSessions;
    }
  };

  const sessionsToShow = getSessionsToShow();

  const setView = (newView) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('view', newView);
    setSearchParams(newSearchParams);
  };

  const getStatusBadge = (session) => {
    const sessionDate = new Date(session.Date);
    const sessionOnlyDate = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());
    const sessionTime = parseSessionTime(session.Time, session.Half);

    if (sessionOnlyDate.getTime() === currentDate.getTime()) {
      if (sessionTime <= now) {
        return { 
          text: "Completed Today", 
          color: "bg-blue-100 text-blue-800", 
          icon: FaCheckCircle 
        };
      } else if (sessionTime.getTime() - now.getTime() <= 30 * 60 * 1000) {
        return { 
          text: "Starting Soon", 
          color: "bg-orange-100 text-orange-800", 
          icon: FaClock 
        };
      } else {
        return { 
          text: "Today", 
          color: "bg-green-100 text-green-800", 
          icon: FaCalendarDay 
        };
      }
    }
    
    if (sessionOnlyDate < currentDate) {
      return { 
        text: "Completed", 
        color: "bg-gray-100 text-gray-800", 
        icon: FaCheckCircle 
      };
    }
    
    return { 
      text: "Confirmed", 
      color: "bg-green-100 text-green-800", 
      icon: FaCheckCircle 
    };
  };

  const formatSessionDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      if (date.toDateString() === today.toDateString()) {
        return "Today";
      }
      if (date.toDateString() === tomorrow.toDateString()) {
        return "Tomorrow";
      }

      return date.toLocaleDateString("en-IN", {
        weekday: 'short',
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (error) {
      return dateString;
    }
  };

  if (!login) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft p-6 sm:p-8 text-center border border-gray-200">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaTicketAlt className="text-purple-500 text-2xl sm:text-3xl" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          Login to View Services
        </h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Please login to see your beauty & wellness services and booking history.
        </p>
        <Link
          to="/auth"
          className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
        >
          <FaSignInAlt className="mr-2" />
          Login Now
        </Link>
      </div>
    );
  }

  if (!booking || paidSessions.length === 0) {
    return (
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft p-6 sm:p-8 text-center border border-gray-200">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
          <FaCalendarCheck className="text-indigo-500 text-2xl sm:text-3xl" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
          No Beauty & Wellness Services
        </h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          {booking && booking.length > 0
            ? "You have services but no paid bookings yet."
            : "You haven't booked any beauty & wellness services yet."}
        </p>
        <Link
          to="/therapists"
          className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
        >
          <FaUser className="mr-2" />
          Book Service
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center">
              <FaSpa className="mr-2 sm:mr-3" />
              My Beauty & Wellness Services
            </h2>
            <p className="text-purple-100 mt-1 text-sm">
              {todaysSessions.length} today • {upcomingSessions.length} upcoming • {pastSessions.length} completed
            </p>
          </div>

          {/* Three Tabs */}
          <div className="flex space-x-1 sm:space-x-2 mt-3 sm:mt-0">
            <button
              onClick={() => setView("today")}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold transition duration-200 text-xs sm:text-sm ${
                view === "today"
                  ? "bg-white text-purple-600"
                  : "bg-purple-500/50 text-white hover:bg-purple-500/70"
              }`}
            >
              Today ({todaysSessions.length})
            </button>
            <button
              onClick={() => setView("upcoming")}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold transition duration-200 text-xs sm:text-sm ${
                view === "upcoming"
                  ? "bg-white text-purple-600"
                  : "bg-purple-500/50 text-white hover:bg-purple-500/70"
              }`}
            >
              Upcoming ({upcomingSessions.length})
            </button>
            <button
              onClick={() => setView("completed")}
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-xl font-semibold transition duration-200 text-xs sm:text-sm ${
                view === "completed"
                  ? "bg-white text-purple-600"
                  : "bg-purple-500/50 text-white hover:bg-purple-500/70"
              }`}
            >
              Completed ({pastSessions.length})
            </button>
          </div>
        </div>
      </div>

      {/* Service Cards */}
      <div className="p-4 sm:p-6">
        {sessionsToShow.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <FaCalendarCheck className="text-gray-400 text-xl sm:text-2xl" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-2">
              No {view === "today" ? "Today's" : view === "upcoming" ? "Upcoming" : "Completed"} Services
            </h3>
            <p className="text-gray-500 text-sm">
              {view === "today" 
                ? "You don't have any services scheduled for today."
                : view === "upcoming"
                ? "You don't have any upcoming services."
                : "You haven't completed any services yet."}
            </p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {sessionsToShow.map((session, index) => {
              const therapist = getTherapistForSession(session);
              const statusBadge = getStatusBadge(session);
              const StatusIcon = statusBadge.icon;

              return (
                <motion.div
                  key={session._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200 hover:shadow-md transition duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      {/* Expert Info */}
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 sm:mb-3">
                        <div>
                          <h4 className="font-bold text-gray-900 text-base sm:text-lg">
                            {therapist?.name || "Loading expert..."}
                          </h4>
                          <p className="text-purple-600 font-medium text-sm">
                            {therapist?.specialties?.slice(0, 2).join(", ") || "Specialties not available"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 sm:space-x-4 mt-1 sm:mt-0">
                          <div
                            className={`px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center ${statusBadge.color}`}
                          >
                            <StatusIcon className="mr-1" size={10} />
                            {statusBadge.text}
                          </div>
                          <span className="bg-green-100 text-green-800 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold">
                            #{session._id?.slice(-8).toUpperCase() || "N/A"}
                          </span>
                        </div>
                      </div>

                      {/* Service Info */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="flex items-center text-gray-600">
                          <FaRegCalendarAlt className="mr-2 text-purple-500 flex-shrink-0" />
                          <span className="truncate font-medium">
                            {formatSessionDate(session.Date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaClock className="mr-2 text-green-500 flex-shrink-0" />
                          <span className="truncate">
                            {session.Half} ({session.Time})
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <FaUser className="mr-2 text-pink-500 flex-shrink-0" />
                          <span>Exp: {therapist?.experience || "N/A"}</span>
                        </div>
                        <div className="flex items-center text-green-600 font-semibold">
                          <FaRupeeSign size={10} className="mr-1 flex-shrink-0" />
                          <span>{session.amount}</span>
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row sm:items-center text-xs sm:text-sm text-gray-600 gap-1 sm:gap-2">
                        <div className="flex items-center">
                          <FaUser className="mr-2 text-gray-400 flex-shrink-0" />
                          <span>Client: {session.FullName}</span>
                        </div>
                        <div className="flex items-center">
                          <FaMobileAlt className="mr-2 text-gray-400 flex-shrink-0" />
                          <span>{session.Phone}</span>
                        </div>
                      </div>
                    </div>

                    {/* View Ticket Button */}
                    <div className="flex space-x-1 justify-center mt-3 lg:mt-0 lg:ml-4">
                      <button
                        onClick={() => setSelectedSession(session)}
                        className="flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white px-9 py-2 sm:px-4 sm:py-2 rounded-xl hover:shadow-lg transition duration-200 font-semibold text-xs sm:text-sm"
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

      {/* Ticket Modal */}
      {selectedSession && (
        <ServiceTicket
          session={selectedSession}
          therapist={getTherapistForSession(selectedSession)}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  );
};

const ExpertCard = ({ therapist, isLoggedIn, onLoginRequired }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState({ morning: 0, evening: 0 });

  const { url } = useAppContext();

  // Initialize available slots from therapist data
  useEffect(() => {
    if (therapist) {
      setAvailableSlots({
        morning: parseInt(therapist.morningSlot) || 0,
        evening: parseInt(therapist.eveningSlot) || 0
      });
    }
  }, [therapist]);

  if (!therapist) return null;

  const therapistName = therapist.name || "Expert Name Not Available";
  const therapistSpecialties = therapist.specialties || ["Beauty Treatments"];
  const therapistExperience = therapist.experience || "0 years";
  const therapistFee = therapist.fee || "0";
  const therapistDescription = therapist.description || "No description available.";
  const therapistCertification = therapist.certification || "Certification not specified";
  const therapistResponseTime = therapist.responseTime || "Within 24 hours";
  const therapistRating = therapist.rating || "4.9";
  const therapistClientsServed = therapist.clientsServed || "100";
  const therapistBadge = therapist.badge || "";

  const handleContactClick = (type) => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    setShowContactModal(true);
  };

  const handleBookService = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  const getImageSrc = () => {
    if (imageError || !therapist.image || !therapist.image._id) {
      return "/default-expert.jpg";
    }
    return `${url}/img/${therapist.image._id}`;
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Popular":
        return "bg-orange-100 text-orange-800";
      case "Top Rated":
        return "bg-yellow-100 text-yellow-800";
      case "Expert":
        return "bg-purple-100 text-purple-800";
      case "New":
        return "bg-green-100 text-green-800";
      case "Senior":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const SlotAvailability = () => {
    const getSlotStatus = (count) => {
      if (count === 0) return { text: "No slots", color: "text-red-500", bg: "bg-red-50", border: "border-red-200" };
      if (count <= 2) return { text: `${count} slot${count > 1 ? 's' : ''} left`, color: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" };
      return { text: `${count} slots avail`, color: "text-green-500", bg: "bg-green-50", border: "border-green-200" };
    };

    const morningStatus = getSlotStatus(availableSlots.morning);
    const eveningStatus = getSlotStatus(availableSlots.evening);

    return (
      <div className="mt-4 sm:mt-14  bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-2xl p-3 border border-blue-200/60 shadow-sm">
  <div className="flex items-center justify-between mb-4">
    <div className="flex items-center gap-2">
      <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl shadow-sm">
        <FaCalendarPlus className="text-white text-sm sm:text-base" />
      </div>
      <div>
        <h4 className="font-bold text-gray-900 text-sm sm:text-base">Available Slots Today</h4>
        <p className="text-xs text-gray-500 mt-0.5">Real-time availability</p>
      </div>
    </div>
    
    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
      availableSlots.morning > 0 || availableSlots.evening > 0 
        ? 'bg-green-100 text-green-700 border border-green-200' 
        : 'bg-gray-100 text-gray-600 border border-gray-200'
    }`}>
      {availableSlots.morning > 0 || availableSlots.evening > 0 ? 'Available' : 'Fully Booked'}
    </div>
  </div>
  
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 mb-4">
    <div className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
      morningStatus.bg
    } ${morningStatus.border} hover:shadow-md hover:scale-[1.02]`}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-200/20 to-orange-200/10 rounded-full -translate-y-4 translate-x-4"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-3 rounded-xl shadow-sm ${
            availableSlots.morning > 0 ? 'bg-yellow-100' : 'bg-gray-100'
          }`}>
            <FaSun className={`text-lg ${
              availableSlots.morning > 0 ? 'text-yellow-600' : 'text-gray-400'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900 text-sm truncate">Morning Session</span>
              {availableSlots.morning <= 2 && availableSlots.morning > 0 && (
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold whitespace-nowrap">
                  Filling Fast
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FaClock className="text-gray-400" />
              <span>9:00 AM - 12:00 PM</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end ml-3">
          <div className={`text-lg font-bold ${morningStatus.color}`}>
            {availableSlots.morning}
          </div>
          <div className={`text-[10px] font-semibold whitespace-nowrap ${morningStatus.color}`}>
            {availableSlots.morning === 1 ? 'slot' : 'slots'}
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs  font-medium ${morningStatus.color}`}>
          {morningStatus.text}
        </span>
        {availableSlots.morning > 0 && (
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                availableSlots.morning >= 5 ? 'bg-green-400' : 
                availableSlots.morning >= 3 ? 'bg-yellow-400' : 'bg-orange-400'
              }`}
              style={{ 
                width: `${Math.min((availableSlots.morning / 10) * 100, 100)}%` 
              }}
            ></div>
          </div>
        )}
      </div>
    </div>

    <div className={`group relative overflow-hidden rounded-xl p-4 transition-all duration-300 ${
      eveningStatus.bg
    } ${eveningStatus.border} hover:shadow-md hover:scale-[1.02]`}>
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200/20 to-purple-200/10 rounded-full -translate-y-4 translate-x-4"></div>
      
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className={`p-3 rounded-xl shadow-sm ${
            availableSlots.evening > 0 ? 'bg-indigo-100' : 'bg-gray-100'
          }`}>
            <FaMoon className={`text-lg ${
              availableSlots.evening > 0 ? 'text-indigo-600' : 'text-gray-400'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-gray-900 text-sm truncate">Evening Session</span>
              {availableSlots.evening <= 2 && availableSlots.evening > 0 && (
                <span className="px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded text-[10px] font-bold whitespace-nowrap">
                  Filling Fast
                </span>
              )}
            </div>
            <div className="text-xs text-gray-600 flex items-center gap-1.5">
              <FaClock className="text-gray-400" />
              <span>5:00 PM - 8:00 PM</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end ml-3">
          <div className={`text-lg font-bold ${eveningStatus.color}`}>
            {availableSlots.evening}
          </div>
          <div className={`text-[10px] font-semibold whitespace-nowrap ${eveningStatus.color}`}>
            {availableSlots.evening === 1 ? 'slot' : 'slots'}
          </div>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <span className={`text-xs font-medium ${eveningStatus.color}`}>
          {eveningStatus.text}
        </span>
        {availableSlots.evening > 0 && (
          <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                availableSlots.evening >= 5 ? 'bg-green-400' : 
                availableSlots.evening >= 3 ? 'bg-yellow-400' : 'bg-orange-400'
              }`}
              style={{ 
                width: `${Math.min((availableSlots.evening / 10) * 100, 100)}%` 
              }}
            ></div>
          </div>
        )}
      </div>
    </div>
  </div>

  <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-200/60">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-medium text-gray-700">Quick Book:</span>
        <span className="text-xs text-gray-600">
          {availableSlots.morning > 0 || availableSlots.evening > 0 
            ? "Reserve your slot now" 
            : "Check back tomorrow for new slots"
          }
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500 whitespace-nowrap">Next available:</span>
        <span className={`text-xs whitespace-nowrap font-bold px-2 py-1 rounded-full ${
          availableSlots.morning > 0 
            ? 'bg-green-100 text-green-700' 
            : availableSlots.evening > 0 
            ? 'bg-blue-100 text-blue-700' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          {availableSlots.morning > 0 ? "Today Morning" : 
           availableSlots.evening > 0 ? "Today Evening" : "Tomorrow"}
        </span>
      </div>
    </div>
  </div>
</div>
    );
  };

  const InfoItem = ({ icon: Icon, label, value, compact = false }) => (
    <div className={`flex items-start gap-3 ${compact ? "sm:items-center" : ""} min-w-0`}>
      <div className="flex-shrink-0 p-2 bg-white/60 rounded-lg border border-gray-100 shadow-sm">
        <Icon className="text-xl sm:text-lg text-gray-600" />
      </div>
      <div className="min-w-0">
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm sm:text-sm font-semibold text-gray-800 truncate">
          {value}
        </div>
      </div>
    </div>
  );

  const ContactModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full mx-auto mb-3 sm:mb-4">
          <FaExclamationTriangle className="text-purple-600 text-lg sm:text-xl" />
        </div>

        <h3 className="text-lg sm:text-xl font-bold text-gray-900 text-center mb-2">
          Contact Support
        </h3>

        <p className="text-gray-600 text-center mb-3 sm:mb-4 text-sm sm:text-base">
          To schedule a beauty & wellness service with{" "}
          <span className="font-semibold">{therapistName}</span>, please contact our
          support team.
        </p>

        <div className="bg-purple-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl font-bold text-purple-600 mb-1">
              📞 +91 7363054510
            </div>
            <p className="text-purple-500 text-xs sm:text-sm">Available 9 AM - 9 PM</p>
          </div>
        </div>

        <div className="space-y-2 sm:space-y-3">
          <button
            onClick={() => window.open(`tel:+917363054510`, "_self")}
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

  return (
    <>
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-soft hover:shadow-card-hover transition-all duration-500 overflow-hidden border border-gray-100">
        <div className="p-4 sm:p-6">
          <div className="block lg:hidden">
            <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
              <div className="relative flex-shrink-0">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-2xl shadow-md border-2 border-white ${
                    !isImageLoaded ? "animate-pulse" : ""
                  }`}
                >
                  <img
                    src={getImageSrc()}
                    alt={therapistName}
                    className={`w-full h-full object-cover rounded-2xl ${isImageLoaded ? "block" : "hidden"}`}
                    onLoad={() => setIsImageLoaded(true)}
                    onError={(e) => {
                      setIsImageLoaded(true);
                      setImageError(true);
                      e.target.src = "/default-expert.jpg";
                    }}
                  />
                </div>
                {therapistBadge && (
                  <div className="absolute -bottom-2 -right-1">
                    <span className={`px-2 py-0 rounded-full text-xs whitespace-nowrap font-bold ${getBadgeColor(therapistBadge)}`}>
                      {therapistBadge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-grow min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">
                  {therapistName}
                </h3>
                {/* <p className="text-purple-600 font-semibold flex items-center text-sm">

                  <span className="truncate">{therapistSpecialties[0]}</span>
                </p> */}
                <div className="flex items-center mt-2">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1 text-xs" />
                    <span className="text-sm font-semibold text-gray-700">{therapistRating}</span>({therapistClientsServed})
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
              <InfoItem icon={FaAward} label="Certification" value={therapistCertification} compact />
              <InfoItem icon={FaClock} label="Response" value={therapistResponseTime} compact />
              <InfoItem icon={FaUsers} label="Clients" value={`${therapistClientsServed}+ served`} compact />
              <InfoItem icon={FaStar} label="Experience" value={`${therapistExperience}`} compact />
            </div>


            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {therapistSpecialties.slice().map((specialty, index) => (
                    <div className="flex">
                    <h3>Specialties:</h3>
                    <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs border border-purple-200">
                      {specialty}
                    </span>
                    </div>
                  ))}
            </div>

            <SlotAvailability />

            <div className="bg-gray-50 rounded-2xl p-3 sm:p-4 mt-4">
              <div className="flex items-center justify-between mb-2 sm:mb-3">
                <div>
                  <div className="text-xl sm:text-2xl font-bold text-green-600">₹{therapistFee}</div>
                  <p className="text-xs text-gray-500">Service Fee</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleContactClick("call")}
                    className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition duration-200"
                    aria-label={`Contact ${therapistName}`}
                  >
                    <FaPhone size={12} />
                  </button>
                </div>
              </div>

              <Link
                to={isLoggedIn ? `/therapist/${therapist._id}` : "#"}
                onClick={handleBookService}
                className={`block w-full font-semibold py-2 sm:py-3 px-4 rounded-xl text-center transition duration-200 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg`}
              >
                {isLoggedIn ? "Book Service" : "Login to Book"}
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-start gap-4 sm:gap-6">
            <div className="relative flex-shrink-0">
              <div className={`w-24 h-24 sm:w-28 sm:h-28 bg-gray-200 rounded-2xl shadow-md border-4 border-white ${!isImageLoaded ? "animate-pulse" : ""}`}>
                <img
                  src={getImageSrc()}
                  alt={therapistName}
                  className={`w-full h-full object-cover rounded-2xl ${isImageLoaded ? "block" : "hidden"}`}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={(e) => {
                    setIsImageLoaded(true);
                    setImageError(true);
                    e.target.src = "/default-expert.jpg";
                  }}
                />
              </div>
              {therapistBadge && (
                <div className="absolute -bottom-2 -right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold shadow-lg ${getBadgeColor(therapistBadge)}`}>
                    {therapistBadge}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <div className="min-w-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 truncate">{therapistName}</h3>
                  {/* <p className="text-purple-600 font-semibold mb-2 flex items-center">
                    <FaUser className="mr-2 flex-shrink-0" />
                    <span className="truncate">{therapistSpecialties.join(", ")}</span>
                  </p> */}
                </div>

                <div className="flex items-center flex-shrink-0 ml-4">
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-500 mr-1" />
                    <span className="text-sm font-semibold text-gray-700">{therapistRating}</span>
                  </div>
                  ({therapistClientsServed})
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 sm:gap-8 mb-3">
                <InfoItem icon={FaAward} label="Certification" value={therapistCertification} />
                <InfoItem icon={FaClock} label="Response Time" value={therapistResponseTime} />
                <InfoItem icon={FaUsers} label="Clients Served" value={`${therapistClientsServed}+`} />
                <InfoItem icon={FaStar} label="Experience" value={therapistExperience} />
              </div>


              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {therapistSpecialties.slice().map((specialty, index) => (
                    <div className="flex">
                    <h3>Specialties:</h3>
                    <span key={index} className="bg-purple-50 text-purple-700 px-2 py-1 rounded-full text-xs border border-purple-200">
                      {specialty}
                    </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center text-sm text-green-600 font-semibold ml-auto">
                  <FaUsers className="mr-2 flex-shrink-0" />
                  <span>{therapistClientsServed}+ clients</span>
                </div>
              </div>

              <SlotAvailability />
            </div>

            <div className="flex-shrink-0 w-48 sm:w-64 flex flex-col gap-3 sm:gap-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1">₹{therapistFee}</div>
                <p className="text-sm text-gray-500">Service Fee</p>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3">
                <button
                  onClick={() => handleContactClick("call")}
                  className="flex items-center gap-2 bg-purple-50 text-purple-600 px-3 py-2 rounded-xl hover:bg-purple-100 transition duration-200 text-sm font-medium"
                  aria-label={`Contact ${therapistName}`}
                >
                  <FaPhone size={12} />
                  Contact
                </button>
              </div>

              <Link
                to={isLoggedIn ? `/therapist/${therapist._id}` : "#"}
                onClick={handleBookService}
                className="font-semibold py-2 sm:py-3 px-4 sm:px-6 rounded-xl text-center transition duration-200 transform hover:scale-105 text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
              >
                {isLoggedIn ? "Book Service" : "Login to Book"}
              </Link>

              <div className="bg-blue-50 rounded-xl p-3 border border-blue-200">
                <div className="text-center text-xs text-blue-700 font-semibold">
                  {availableSlots.morning > 0 || availableSlots.evening > 0 ? (
                    <>
                      <FaCalendarCheck className="inline mr-1" />
                      Slots Available Today
                    </>
                  ) : (
                    <>
                      <FaClock className="inline mr-1" />
                      Check Tomorrow
                    </>
                  )}
                </div>
              </div>
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
  filterSpecialty, 
  handleFilterChange, 
  sortBy, 
  handleSortChange, 
  allSpecialties,
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
            placeholder="Search experts..."
            value={search}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-base"
          />
          <button
            onClick={toggleFilters}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-xl"
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
                  Specialty
                </label>
                <select
                  value={filterSpecialty}
                  onChange={handleFilterChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500"
                >
                  {allSpecialties.map((spec) => (
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500"
                >
                  <option value="experience">Experience</option>
                  <option value="rating">Rating</option>
                  <option value="fee">Fee: Low to High</option>
                  <option value="name">Name</option>
                </select>
              </div>

              {!login && (
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-3">
                  <p className="text-purple-800 text-sm text-center mb-2">
                    🔒 Login to book services
                  </p>
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition duration-200 text-sm"
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

const BeautyWellnessPage = () => {
  const [search, setSearch] = useState("");
  const [filterSpecialty, setFilterSpecialty] = useState("All");
  const [sortBy, setSortBy] = useState("experience");
  const [showFilters, setShowFilters] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'experts');
  
  const { therapists, login, therapistsLoading, therapistsError, booking } = useAppContext();
  
  const paidSessionsCount = login && booking 
    ? booking.filter(session => session.payStatus === 'paid').length 
    : 0;

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl === 'services') {
      setActiveTab('services');
    } else {
      setActiveTab('experts');
    }
  }, [searchParams]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'experts') {
      setSearchParams({}); 
    } else {
      setSearchParams({ tab }); 
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterSpecialty(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const allSpecialties = [
    "All",
    ...new Set(therapists.flatMap(t => t.specialties || []).filter(Boolean)),
  ];

  const filteredExperts = therapists
    .filter((therapist) => {
      const searchMatch = 
        therapist.name?.toLowerCase().includes(search.toLowerCase()) || 
        therapist.description?.toLowerCase().includes(search.toLowerCase()) ||
        (therapist.specialties && therapist.specialties.some(spec => 
          spec.toLowerCase().includes(search.toLowerCase())
        ));
      
      const filterMatch = 
        filterSpecialty === "All" || 
        (therapist.specialties && therapist.specialties.includes(filterSpecialty));
      
      return searchMatch && filterMatch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "experience":
          return (parseInt(b.experience) || 0) - (parseInt(a.experience) || 0);
        case "fee":
          return (parseInt(a.fee) || 0) - (parseInt(b.fee) || 0);
        case "rating":
          return (parseFloat(b.rating) || 0) - (parseFloat(a.rating) || 0);
        case "name":
          return (a.name || '').localeCompare(b.name || '');
        default:
          return 0;
      }
    });

  if (therapistsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Finding Expert Beauty & Wellness Professionals...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we load our premium service providers</p>
        </div>
      </div>
    );
  }

  if (therapistsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <FaExclamationTriangle className="text-red-500 text-2xl sm:text-3xl" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3">Error Loading Experts</h3>
          <p className="text-gray-500 text-base sm:text-lg mb-4 sm:mb-6">{therapistsError}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-purple-50 via-pink-50 to-indigo-50 border-b border-gray-200 shadow-sm overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-100/30 via-pink-100/20 to-transparent animate-pulse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
          
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="p-2 sm:p-4 bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-purple-100 flex items-center justify-center">
              <FaSpa className="w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-purple-600 animate-pulse" />
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent truncate">
                {activeTab === 'experts' ? 'Beauty & Wellness Services' : 'My Services'}
              </h1>

              <p className="text-xs sm:text-sm lg:text-base text-gray-600 mt-1 sm:mt-2 leading-snug">
                {activeTab === 'experts' 
                  ? "Premium beauty treatments, spa services, and wellness therapies for complete relaxation and rejuvenation. Expert therapists, premium products, custom packages."
                  : "Manage and view all your beauty & wellness service bookings and history."
                }
                {!login && activeTab === 'experts' && (
                  <span className="block text-xs sm:text-sm text-purple-600 font-medium mt-1">
                    🔒 Login to book services
                  </span>
                )}
              </p>

              {activeTab === 'experts' && (
                <div className="lg:hidden mt-2 inline-flex items-center gap-2 text-purple-600 font-semibold bg-purple-50 px-2 py-1 rounded-lg text-xs">
                  <Users className="w-3 h-3" />
                  {filteredExperts.length} Experts Available
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            {activeTab === 'experts' ? (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100 px-4 py-3 lg:px-6 lg:py-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 lg:p-3 rounded-full bg-purple-100">
                  <Shield className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Experts Available</p>
                  <p className="text-xl lg:text-2xl font-bold text-purple-700">{filteredExperts.length}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md rounded-2xl border border-purple-100 px-4 py-3 lg:px-6 lg:py-4 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="p-2 lg:p-3 rounded-full bg-green-100">
                  <FaSpa className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-gray-600">Total Services</p>
                  <p className="text-xl lg:text-2xl font-bold text-green-700">{paidSessionsCount || 0}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex space-x-2 sm:space-x-4 mb-6 sm:mb-8">
          <button
            onClick={() => handleTabChange('experts')}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold transition duration-200 flex items-center text-sm sm:text-base ${
              activeTab === 'experts'
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FaUser className="mr-2" />
            Find Experts
          </button>
          
          <button
            onClick={() => handleTabChange('services')}
            className={`px-4 py-2 sm:px-6 sm:py-3 rounded-2xl font-semibold transition duration-200 flex items-center relative text-sm sm:text-base ${
              activeTab === 'services'
                ? 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <FaSpa className="mr-2" />
            My Services
            {paidSessionsCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full w-4 h-4 sm:w-6 sm:h-6 flex items-center justify-center text-xs">
                {paidSessionsCount}
              </span>
            )}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'experts' ? (
            <motion.div
              key="experts"
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
                  filterSpecialty={filterSpecialty}
                  handleFilterChange={handleFilterChange}
                  sortBy={sortBy}
                  handleSortChange={handleSortChange}
                  allSpecialties={allSpecialties}
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
                            placeholder="Search experts..."
                            value={search}
                            onChange={handleSearchChange}
                            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Specialty
                        </label>
                        <select
                          value={filterSpecialty}
                          onChange={handleFilterChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          {allSpecialties.map((spec) => (
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
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        >
                          <option value="experience">Experience (High to Low)</option>
                          <option value="rating">Rating (High to Low)</option>
                          <option value="fee">Fee (Low to High)</option>
                          <option value="name">Name (A-Z)</option>
                        </select>
                      </div>

                      {!login && (
                        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                          <p className="text-purple-800 text-sm text-center mb-2">
                            🔒 Login to book services
                          </p>
                          <button
                            onClick={() => setShowLoginModal(true)}
                            className="block w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition duration-200 text-sm"
                          >
                            Login Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Experts List */}
                <div className="flex-grow">
                  <div className="hidden lg:flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Available Beauty & Wellness Experts
                      <span className="text-gray-500 text-lg ml-2">
                        ({filteredExperts.length} found)
                      </span>
                    </h2>
                  </div>

                  <div className="space-y-4 sm:space-y-6">
                    {filteredExperts.length > 0 ? (
                      filteredExperts.map((therapist) => (
                        <ExpertCard 
                          key={therapist._id} 
                          therapist={therapist} 
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
                          No Experts Found
                        </h3>
                        <p className="text-gray-500 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-md mx-auto">
                          Try adjusting your search criteria or clear filters to see all beauty & wellness experts
                        </p>
                        <button
                          onClick={() => {
                            setSearch("");
                            setFilterSpecialty("All");
                            setShowFilters(false);
                          }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-2 sm:py-3 px-6 sm:px-8 rounded-xl hover:shadow-lg transition duration-200 text-sm sm:text-base"
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
              key="services"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ServicesSection />
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

export default BeautyWellnessPage;