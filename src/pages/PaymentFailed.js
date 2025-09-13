import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { AiOutlineReload } from "react-icons/ai";
import { motion } from "framer-motion";

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToHome = () => navigate("/");
  const tryAgain = () => navigate("/cart");

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.2 }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -30 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 120, damping: 12, delay: 0.4 }
    }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.15, 1],
      opacity: [1, 0.85, 1],
      transition: { duration: 2, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const floatVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 10, -10, 0],
      transition: { duration: 5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-red-50 via-white to-rose-100 font-sans overflow-hidden">
      {/* Floating Icons */}
      <motion.div
        className="absolute top-12 left-6 sm:left-16 text-5xl sm:text-6xl text-rose-200"
        variants={floatVariants}
        animate="animate"
      >
        💳
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-6 sm:right-16 text-6xl sm:text-7xl text-red-200"
        variants={floatVariants}
        animate="animate"
      >
        ⚠️
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-1/4 text-4xl sm:text-5xl text-rose-100"
        variants={floatVariants}
        animate="animate"
      >
        💔
      </motion.div>

      {/* Failed Card */}
      <motion.div
        className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl text-center border border-red-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-rose-500 to-red-400 animate-pulse rounded-t-3xl" />

        <div className="flex justify-center -mt-16 sm:-mt-20 mb-6 sm:mb-10">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white shadow-xl border-4 border-red-300"
            variants={iconVariants}
          >
            <motion.div variants={pulseVariants} animate="pulse">
              <FaTimesCircle className="text-5xl sm:text-6xl text-red-600 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-red-700 tracking-tight mb-3">
            Payment Failed!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600">
            Oops 😟 Something went wrong with your transaction.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={tryAgain}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg 
                       bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg 
                       transition-all hover:from-red-600 hover:to-rose-700
                       focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
          >
            <AiOutlineReload className="text-lg sm:text-xl" /> Try Again
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg 
                       bg-gray-200 text-gray-800 shadow-md transition-all hover:bg-gray-300
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
          >
            <FaHouseChimney className="text-lg sm:text-xl" /> Go to Home
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentFailedPage;
