import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const successSound = "./IMG/preview.mp3"; 

const SuccessMessage = ({ name }) => {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
    });

    try {
      const audio = new Audio(successSound);
      audio.volume = 0.2;
      audio.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, []); 

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        when: "beforeChildren", 
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-80 sm:h-80 rounded-full bg-pink-400 mix-blend-lighten filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, delay: 2, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-yellow-400 mix-blend-lighten filter blur-3xl opacity-25"
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/2 left-1/2 w-96 h-96 sm:w-[500px] sm:h-[500px] border-4 border-white border-opacity-10 rounded-full"
      />

      {/* Main Content Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-12 flex flex-col items-center space-y-6 text-center"
      >
        {/* Animated Checkmark */}
        <motion.div
          variants={itemVariants}
          className="p-4 sm:p-6 bg-white/30 rounded-full shadow-xl"
        >
          <CheckCircle className="h-20 w-20 sm:h-28 sm:w-28 text-white stroke-[2]" />
        </motion.div>

        {/* Welcome Text */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg"
        >
          Welcome, {name}!
        </motion.h1>

        {/* Success Message */}
        <motion.p
          variants={itemVariants}
          className="text-white text-opacity-90 text-sm sm:text-lg md:text-xl max-w-lg"
        >
          Your account has been created successfully. We're excited to have you join our community!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SuccessMessage;