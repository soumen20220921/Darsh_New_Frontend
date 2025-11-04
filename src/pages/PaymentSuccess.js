import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaStar } from "react-icons/fa";
import { FaHouseChimney } from "react-icons/fa6";
import { AiOutlineFileDone } from "react-icons/ai";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const PaymentConfirmationPage = () => {
  const {getCart,token,url} = useAppContext();
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
     clearcart();
  }, []);

  const goToHome = () => navigate("/");
  const viewOrders = () => navigate("/account?tab=3");
  const handleRating = (rate) => setRating(rate);

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
  const clearcart = async () => {
    try {
      
      await axios.delete(`${url}/api/cart/clearCart`, {
          headers: {
            Auth: token,
          },
        });
      getCart();
    } catch (error) {
      console.log(error.message);
    }
  };
 
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 via-white to-yellow-100 font-sans overflow-hidden">
      <motion.div
        className="absolute top-10 left-4 sm:left-12 text-5xl sm:text-6xl text-amber-200"
        variants={floatVariants}
        animate="animate"
      >
        🎉
      </motion.div>
      <motion.div
        className="absolute bottom-12 right-4 sm:right-12 text-6xl sm:text-7xl text-yellow-200"
        variants={floatVariants}
        animate="animate"
      >
        💳
      </motion.div>
      <motion.div
        className="absolute top-1/4 right-1/4 text-4xl sm:text-5xl text-amber-100"
        variants={floatVariants}
        animate="animate"
      >
        ⭐
      </motion.div>

      {/* Success Card */}
      <motion.div
        className="relative w-full max-w-md sm:max-w-lg p-6 sm:p-10 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl text-center border border-amber-200"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="absolute top-0 left-0 w-full h-1  bg-gradient-to-r from-amber-500  via-yellow-500 to-amber-400 animate-pulse rounded-t-3xl" />

        {/* Success Icon */}
        <div className="flex justify-center -mt-16 sm:-mt-20 mb-6 sm:mb-10">
          <motion.div
            className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-white shadow-xl border-4 border-amber-300"
            variants={iconVariants}
          >
            <motion.div variants={pulseVariants} animate="pulse">
              <FaCheckCircle className="text-5xl sm:text-6xl text-amber-600 drop-shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-amber-700 tracking-tight mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-slate-600">
            Thank you for your purchase. Your order is confirmed 🎊
          </p>
        </div>

        {/* Rating */}
        <div className="my-6 sm:my-8 pt-4 border-t border-dashed border-slate-300">
          <p className="text-sm sm:text-base text-slate-700 font-semibold mb-3">
            How was your experience?
          </p>
          <div className="flex justify-center items-center gap-2 sm:gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <motion.div
                key={star}
                whileHover={{ scale: 1.3, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaStar
                  onClick={() => handleRating(star)}
                  className={`text-xl sm:text-2xl md:text-3xl cursor-pointer transition-colors duration-200 
                              ${star <= rating ? "text-amber-500" : "text-gray-400"} hover:text-amber-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-6">
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goToHome}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg 
                       bg-gradient-to-r from-amber-500 to-yellow-600 text-white shadow-lg 
                       transition-all hover:from-amber-600 hover:to-yellow-700
                       focus:outline-none focus:ring-4 focus:ring-amber-400 focus:ring-opacity-50"
          >
            <FaHouseChimney className="text-lg sm:text-xl" /> Go to Home
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={viewOrders}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg 
                       bg-gray-200 text-gray-800 shadow-md transition-all hover:bg-gray-300
                       focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
          >
            <AiOutlineFileDone className="text-lg sm:text-xl" /> View Orders
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentConfirmationPage;
