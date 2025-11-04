import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaCalendarCheck, FaHome } from "react-icons/fa";
import { MdMedicalServices } from "react-icons/md";
import { motion } from "framer-motion";

const AppointmentSuccessPage = () => {
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  const goToHome = () => navigate("/");
  const viewAppointments = () => navigate("/doctors?tab=tickets");
  const handleRating = (rate) => setRating(rate);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 14, 
        delay: 0.2 
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 120, 
        damping: 12, 
        delay: 0.4 
      }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.85, 1],
      transition: { 
        duration: 2, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 5, -5, 0],
      transition: { 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }
    }
  };

  const bounceVariants = {
    animate: {
      y: [0, -25, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeOut"
      }
    }
  };

  const starVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1 + 1,
        type: "spring",
        stiffness: 200
      }
    })
  };

  const buttonVariants = {
    hover: {
      scale: 1.08,
      boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 17
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
    }
  };

  return (
    <motion.div 
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 font-sans overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Floating Elements */}
      <motion.div
        className="absolute top-10 left-4 sm:left-12 text-5xl sm:text-6xl text-blue-200"
        variants={floatVariants}
        animate="animate"
      >
        🏥
      </motion.div>
      
      <motion.div
        className="absolute bottom-12 right-4 sm:right-12 text-6xl sm:text-7xl text-cyan-200"
        variants={bounceVariants}
        animate="animate"
      >
        ⚕️
      </motion.div>
      
      <motion.div
        className="absolute top-1/4 right-1/4 text-4xl sm:text-5xl text-teal-100"
        variants={floatVariants}
        animate="animate"
      >
        💊
      </motion.div>

      <motion.div
        className="absolute bottom-1/4 left-8 text-4xl sm:text-5xl text-blue-100"
        variants={bounceVariants}
        animate="animate"
        style={{ rotate: 45 }}
      >
        🩺
      </motion.div>

      {/* Success Card */}
      <motion.div
        className="relative mt-14 md:mt-0 mb-12 w-full max-w-md sm:max-w-lg p-6 sm:p-10 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl text-center border border-blue-200"
        variants={cardVariants}
      >
        {/* Animated Gradient Border Top */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-t-3xl" />
        
        {/* Pulse Ring around main icon */}
        <motion.div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border-4 border-blue-200 border-opacity-60"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.7, 0, 0.7],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Success Icon */}
        <div className="flex justify-center -mt-16 sm:-mt-20 mb-6 sm:mb-10">
          <motion.div
            className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white shadow-2xl border-4 border-teal-400 z-10"
            variants={iconVariants}
          >
            <motion.div variants={pulseVariants} animate="pulse">
              <FaCheckCircle className="text-5xl sm:text-6xl text-teal-600 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text Content */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-teal-700 tracking-tight mb-3">
            Appointment Confirmed!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600 mb-2">
            Your appointment has been successfully scheduled
          </p>
          <motion.p 
            className="text-xs sm:text-sm text-slate-500 mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            📅 Your appointment has been confirmed! Check <span className="text-blue-600 font-semibold" >My Appointments</span> to see your booking details.
          </motion.p>
        </motion.div>

        {/* Rating Section */}
        <motion.div 
          className="my-6 sm:my-8 pt-6 border-t border-dashed border-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-sm sm:text-base text-slate-700 font-semibold mb-4">
            Rate your booking experience
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                custom={star}
                variants={starVariants}
                whileHover={{ scale: 1.4, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <MdMedicalServices
                  onClick={() => handleRating(star)}
                  className={`text-xl sm:text-2xl md:text-3xl cursor-pointer transition-all duration-300 
                              ${star <= rating ? "text-yellow-500 drop-shadow-lg" : "text-gray-300"} 
                              hover:text-yellow-500 hover:drop-shadow-md`}
                />
              </motion.div>
            ))}
          </div>
          {rating > 0 && (
            <motion.p 
              className="text-sm text-teal-600 mt-3 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              Thank you for your {rating} star rating! ⭐
            </motion.p>
          )}
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={goToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-sm 
                       bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-xl 
                       transition-all hover:from-teal-600 hover:to-cyan-700
                       focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-opacity-50"
          >
            <FaHome className="text-lg sm:text-xl" /> 
            Go to Home
          </motion.button>

          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={viewAppointments}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-base
                       bg-white text-teal-700 border-2 border-teal-300 shadow-lg transition-all hover:bg-teal-50
                       focus:outline-none focus:ring-4 focus:ring-teal-200 focus:ring-opacity-50"
          >
            <FaCalendarCheck className="text-lg sm:text-xl" /> 
            My Appointments
          </motion.button>
        </motion.div>

        {/* Additional Info */}
        <motion.div 
          className="mt-6 text-xs text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <p>Need help? Contact pomwbweb@gmail.com</p>
        </motion.div>
      </motion.div>

      {/* Confetti-like small elements */}
      <motion.div
        className="absolute top-20 right-20 text-2xl text-teal-300"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        ✨
      </motion.div>
      
      <motion.div
        className="absolute bottom-20 left-20 text-2xl text-blue-300"
        animate={{
          y: [0, -40, 0],
          rotate: [0, -180, 0],
          scale: [1, 1.3, 1]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        🌟
      </motion.div>
    </motion.div>
  );
};

export default AppointmentSuccessPage;