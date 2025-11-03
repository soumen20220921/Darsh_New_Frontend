import React, { useState, useEffect } from "react";
import { User, MapPin, Package, LogOut, Ticket, Calendar, Clock, UserCheck, Shield,  ChevronRight, HelpCircle, Phone } from "lucide-react";
import AccountInfo from "../components/AccountInfo";
import AddressInfo from "../components/AddressInfo";
import OrderInfo from "../components/MyOrders";
import { useNavigate, useSearchParams } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import { FaUserMd } from "react-icons/fa";

const AccountAppointments = () => {
  const { booking, doctors, login } = useAppContext();
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return timeString.replace(/(AM|PM)/, ' $1');
  };

  const getDoctorForAppointment = (appointment) => {
    return doctors.find(doctor => doctor._id === appointment.doctorId);
  };

  const getStatusBadge = (appointment) => {
    if (appointment.payStatus !== 'paid') {
      return { 
        text: 'Payment Pending', 
        color: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        icon: '⏳'
      };
    }
    
    const aptDate = new Date(appointment.Date);
    const now = new Date();
    if (aptDate < now) {
      return { 
        text: 'Completed', 
        color: 'bg-gray-100 text-gray-800 border border-gray-200',
        icon: '✅'
      };
    } else {
      return { 
        text: 'Confirmed', 
        color: 'bg-green-100 text-green-800 border border-green-200',
        icon: '📅'
      };
    }
  };

  const getUpcomingAppointmentCount = () => {
    return booking.filter(apt => {
      const aptDate = new Date(apt.Date);
      const now = new Date();
      return (aptDate >= now || apt.payStatus !== 'paid') && apt.payStatus === 'paid';
    }).length;
  };

  if (!login) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8 sm:py-12"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
          <UserCheck className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          Access Your Appointments
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base lg:text-lg">
          Sign in to view your medical appointments, consultation history, and upcoming visits.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/auth')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 lg:px-10 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Sign In to Continue
        </motion.button>
      </motion.div>
    );
  }

  if (!booking || booking.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 sm:py-12 lg:py-16"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 lg:mb-8 shadow-lg">
          <Calendar className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-green-600" />
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
          No Appointments Booked
        </h2>
        <p className="text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto text-sm sm:text-base lg:text-lg leading-relaxed">
          Start your healthcare journey by booking a consultation with our certified medical professionals.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/doctors')}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Book Your First Appointment
        </motion.button>
      </motion.div>
    );
  }

  const now = new Date();
  const upcomingAppointments = booking
    .filter(apt => new Date(apt.Date) >= now || apt.payStatus !== 'paid')
    .sort((a, b) => new Date(a.Date) - new Date(b.Date));
  
  const pastAppointments = booking
    .filter(apt => new Date(apt.Date) < now && apt.payStatus === 'paid')
    .sort((a, b) => new Date(b.Date) - new Date(a.Date));

  return (
    <div className="space-y-6 sm:space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex-1">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            My Appointments
          </h2>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base lg:text-lg">Manage and track all your medical consultations</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 lg:mt-0">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/doctors?tab=tickets')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />
            Detailed Tickets
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/doctors')}
            className="border-2 border-green-500 text-green-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base"
          >
            <UserCheck className="h-4 w-4 sm:h-5 sm:w-5" />
            New Appointment
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
      >
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-blue-600">{booking.length}</div>
          <div className="text-xs sm:text-sm text-blue-800 font-medium mt-1 sm:mt-2">Total Appointments</div>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-green-600">{getUpcomingAppointmentCount()}</div>
          <div className="text-xs sm:text-sm text-green-800 font-medium mt-1 sm:mt-2">Upcoming</div>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-purple-600">{pastAppointments.length}</div>
          <div className="text-xs sm:text-sm text-purple-800 font-medium mt-1 sm:mt-2">Completed</div>
        </div>
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-orange-600">
            {booking.filter(apt => apt.payStatus !== 'paid').length}
          </div>
          <div className="text-xs sm:text-sm text-orange-800 font-medium mt-1 sm:mt-2">Pending Payment</div>
        </div>
      </motion.div>

      {upcomingAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-green-500 rounded-full"></div>
            <h3 className="sm:text-xl lg:text-2xl font-bold text-gray-900">Upcoming Appointments</h3>
            <span className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {upcomingAppointments.length}
            </span>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            {upcomingAppointments.map((appointment, index) => {
              const doctor = getDoctorForAppointment(appointment);
              const statusBadge = getStatusBadge(appointment);
              
              return (
                <motion.div
                  key={appointment._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-gray-100 sm:border-2 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg sm:hover:shadow-2xl hover:border-blue-200 transition-all duration-500 group"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-blue-600" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                              Dr. {doctor?.name || 'Loading...'}
                            </h4>
                            <p className="text-blue-600 font-semibold text-sm sm:text-base mt-1 truncate">{doctor?.specialization}</p>
                            <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{doctor?.hospital}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 sm:gap-2 w-fit ${statusBadge.color}`}>
                          <span className="text-xs sm:text-sm">{statusBadge.icon}</span>
                          <span className="hidden sm:inline">{statusBadge.text}</span>
                          <span className="sm:hidden">{statusBadge.text.split(' ')[0]}</span>
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 text-gray-700">
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                          <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-gray-500">Date</div>
                            <div className="font-semibold text-xs sm:text-sm truncate">{formatDate(appointment.Date)}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-gray-500">Time</div>
                            <div className="font-semibold text-xs sm:text-sm truncate">{formatTime(appointment.Time)} {appointment.Half}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                          <User className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-gray-500">Patient</div>
                            <div className="font-semibold text-xs sm:text-sm truncate">{appointment.FullName}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-3 bg-gray-50 rounded-lg p-2 sm:p-3">
                          <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm text-gray-500">Status</div>
                            <div className="font-semibold text-xs sm:text-sm truncate capitalize">{appointment.payStatus}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-2 sm:gap-3">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/doctors?tab=tickets')}
                        className="bg-blue-600 text-white px-4 py-2 sm:px-5 sm:py-2.5 lg:px-6 lg:py-3 rounded-lg sm:rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-xs sm:text-sm"
                      >
                        View Details
                      </motion.button>
                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {pastAppointments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 sm:space-y-6"
        >
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-gray-500 rounded-full"></div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">Appointment History</h3>
            <span className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
              {pastAppointments.length}
            </span>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            {pastAppointments.slice(0, 5).map((appointment, index) => {
              const doctor = getDoctorForAppointment(appointment);
              
              return (
                <motion.div
                  key={appointment._id || index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gray-200 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
                        <UserCheck className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 text-gray-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="font-bold text-base sm:text-lg text-gray-900 truncate">
                          Dr. {doctor?.name || 'Loading...'}
                        </h4>
                        <p className="text-blue-600 text-sm font-medium truncate">{doctor?.specialization}</p>
                        <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                            {formatDate(appointment.Date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                            {formatTime(appointment.Time)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700">
                        Completed
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/doctors?tab=tickets')}
                        className="text-blue-600 hover:text-blue-800 font-semibold text-xs sm:text-sm"
                      >
                        View Record
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {pastAppointments.length > 5 && (
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/doctors?tab=tickets')}
                className="text-blue-600 hover:text-blue-800 font-semibold text-sm sm:text-base lg:text-lg"
              >
                View All {pastAppointments.length} Past Appointments →
              </motion.button>
            </div>
          )}
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 text-center text-white shadow-lg sm:shadow-2xl"
      >
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Continue Your Healthcare Journey</h3>
        <p className="text-blue-100 mb-4 sm:mb-6 text-xs sm:text-sm lg:text-base max-w-2xl mx-auto">
          Book follow-up consultations or explore our network of specialist doctors for comprehensive care.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/doctors')}
            className="bg-white text-blue-600 px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-bold text-xs sm:text-sm lg:text-base shadow-lg hover:shadow-xl transition-all"
          >
            Book New Appointment
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

const SupportCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-4 sm:p-6 text-center border border-green-200"
  >
    <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full mx-auto mb-3 sm:mb-4">
      <HelpCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
    </div>
    <div className="text-sm sm:text-base font-semibold text-gray-800 mb-2">Need Help?</div>
    <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Our support team is here to assist you</p>
    <div className="flex flex-col sm:flex-row gap-2 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open('tel:+917363054510')}
        className="flex items-center justify-center gap-2 bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-green-700 transition-all"
      >
        <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
        Call Support
      </motion.button>
    </div>
  </motion.div>
);

const Account = () => {
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  const [showModal, setShowModal] = useState(false);
  const [comp, setComp] = useState(1);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const tabs = [
    { id: 1, label: "Profile", icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />, description: "Personal information" },
    { id: 2, label: "Addresses", icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />, description: "Delivery addresses" },
    { id: 3, label: "Orders", icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" />, description: "Order history" },
    { id: 4, label: "Appointments", icon: <Ticket className="h-4 w-4 sm:h-5 sm:w-5" />, description: "Medical appointments" },
    { id: 7, label: "Logout", icon: <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />, description: "Sign out safely", isDanger: true },
  ];

  useEffect(() => {
    const tabFromUrl = searchParams.get('tab');
    if (tabFromUrl) {
      const tabId = parseInt(tabFromUrl);
      if (tabId >= 1 && tabId <= tabs.length) {
        setComp(tabId);
      }
    }
  }, [searchParams, tabs.length]);

  const handleTabChange = (tabId) => {
    setComp(tabId);
    setIsMobileMenuOpen(false);
    if (tabId === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ tab: tabId.toString() });
    }
  };

  const logOut = () => setShowModal(true);

  const confirmLogout = () => {
    setShowModal(false);

    const audio = new Audio("./IMG/logout.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => console.log("Sound autoplay blocked"));

    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.clear();
      navigate("/auth");
      window.location.reload();
    }, 1200);
  };

  const cancelLogout = () => setShowModal(false);

  const handleViewDetailedAppointments = () => {
    navigate('/doctors?tab=tickets');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <AnimatePresence>
      {!isLoggingOut && (
        <motion.div
          key="account-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 font-inter"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8"
            >
              <div className="text-center lg:text-left mb-4 sm:mb-6 lg:mb-0">
                <h1 className="text-xl sm:text-3xl lg:text-4xl font-bold text-gray-900 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {getGreeting()}, {userName?.split(' ')[0] || 'User'}!
                </h1>
                <p className="text-gray-600 mt-1 sm:mt-2 text-xs sm:text-base lg:text-lg">Manage your account and healthcare services</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleViewDetailedAppointments}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-green-600 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-green-700 transition-all font-semibold shadow-lg hover:shadow-xl text-xs sm:text-sm"
                >
                  <Ticket className="h-3 w-3 sm:h-4 sm:w-4" />
                  All Appointments
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/doctors')}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-blue-600 text-white px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-lg hover:shadow-xl text-xs sm:text-sm"
                >
                  <FaUserMd className="h-3 w-3 sm:h-4 sm:w-4" />
                  Doctors
                </motion.button>
              </div>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8">
              <div className="hidden lg:block lg:w-72 xl:w-80 flex-shrink-0">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 sticky top-4 sm:top-8 transition-all duration-500 hover:shadow-2xl border border-gray-100"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto mb-3 sm:mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 animate-pulse blur-lg opacity-40"></div>
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-xl border-4 border-white">
                        <User className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-blue-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-green-400 rounded-full border-2 sm:border-3 lg:border-4 border-white shadow-lg"></div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">
                      {userName || "User Name"}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm truncate mb-2 sm:mb-3">
                      {userEmail || "user@example.com"}
                    </p>
                    <div className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold inline-block">
                      Premium Member
                    </div>
                  </div>

                  <nav className="space-y-2 sm:space-y-3">
                    {tabs.map((item) => (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        onClick={() => {
                          if (item.id === 7) {
                            logOut();
                          } else {
                            handleTabChange(item.id);
                          }
                        }}
                        className={`w-full flex items-center space-x-3 sm:space-x-4 px-3 sm:px-4 lg:px-5 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-medium transition-all duration-300 text-left group ${
                          comp === item.id
                            ? "bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 shadow-md border border-blue-100"
                            : item.isDanger
                            ? "text-red-600 hover:bg-red-50 hover:shadow-md"
                            : "text-gray-600 hover:bg-gray-50 hover:shadow-md"
                        }`}
                      >
                        <div className={`p-1.5 sm:p-2 rounded-lg ${
                          comp === item.id 
                            ? "bg-blue-100 text-blue-600" 
                            : item.isDanger
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        } group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm sm:text-base">{item.label}</div>
                          <div className="text-xs text-gray-500 mt-0.5 truncate">{item.description}</div>
                        </div>
                        {comp === item.id && (
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </motion.button>
                    ))}
                  </nav>

                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                    <SupportCard />
                  </div>
                </motion.div>
              </div>

              <div className="flex-1">
                <div className="hidden lg:block">
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100"
                  >
                    {comp === 1 && <AccountInfo />}
                    {comp === 2 && <AddressInfo />}
                    {comp === 3 && <OrderInfo />}
                    {comp === 4 && <AccountAppointments />}
                  </motion.div>
                </div>

                <div className="lg:hidden space-y-4 sm:space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 text-center border border-gray-100"
                  >
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 animate-pulse blur-md opacity-40"></div>
                      <div className="relative w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center shadow-lg border-4 border-white">
                        <User className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 truncate">
                      {userName || "User Name"}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 truncate">
                      {userEmail || "user@example.com"}
                    </p>
                    <div className="bg-blue-50 text-blue-700 px-2 sm:px-3 py-1 rounded-full text-xs font-semibold inline-block">
                      Active Account
                    </div>
                  </motion.div>

                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="w-full bg-white rounded-xl sm:rounded-2xl shadow-lg p-3 sm:p-4 flex items-center justify-between font-semibold text-gray-900 border border-gray-100"
                  >
                    <span className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                      {tabs.find(tab => tab.id === comp)?.icon}
                      {tabs.find(tab => tab.id === comp)?.label}
                    </span>
                    <motion.div
                      animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500" />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                      >
                        <div className="grid grid-cols-2 gap-2 p-3 sm:p-4">
                          {tabs.map((tab) => (
                            <motion.button
                              key={tab.id}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (tab.id === 7) {
                                  logOut();
                                } else {
                                  handleTabChange(tab.id);
                                }
                              }}
                              className={`flex flex-col items-center p-3 rounded-lg sm:rounded-xl transition-all ${
                                comp === tab.id
                                  ? tab.isDanger
                                    ? "bg-red-50 text-red-600"
                                    : "bg-blue-50 text-blue-600"
                                  : tab.isDanger
                                  ? "text-red-500 hover:bg-red-50"
                                  : "text-gray-600 hover:bg-gray-50"
                              }`}
                            >
                              <div className={`p-2 rounded-lg mb-1 sm:mb-2 ${
                                comp === tab.id
                                  ? tab.isDanger
                                    ? "bg-red-100"
                                    : "bg-blue-100"
                                  : "bg-gray-100"
                              }`}>
                                {tab.icon}
                              </div>
                              <span className="text-xs sm:text-sm font-medium text-center">{tab.label}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 border border-gray-100"
                  >
                    {comp === 1 && <AccountInfo />}
                    {comp === 2 && <AddressInfo />}
                    {comp === 3 && <OrderInfo />}
                    {comp === 4 && <AccountAppointments />}
                    
                    {comp === 7 && (
                      <div className="text-center py-6 sm:py-8">
                        <LogOut className="h-10 w-10 sm:h-12 sm:w-12 text-red-400 mx-auto mb-2 sm:mb-3" />
                        <h3 className="text-lg sm:text-xl font-bold text-red-600 mb-3 sm:mb-4">Ready to Leave?</h3>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={logOut}
                          className="px-6 sm:px-8 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-red-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                        >
                          Sign Out Now
                        </motion.button>
                      </div>
                    )}
                  </motion.div>

                  <div className="lg:hidden">
                    <SupportCard />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Account;