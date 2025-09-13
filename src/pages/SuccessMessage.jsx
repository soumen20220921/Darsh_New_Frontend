// src/components/AuthSuccess.jsx
import React, { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";

const SuccessMessage = ({ name }) => {
  useEffect(() => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 flex items-center justify-center px-4 sm:px-6">
      
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, 0], rotate: [0, 15, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-pink-400 mix-blend-lighten filter blur-3xl opacity-30"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0], rotate: [0, -10, 10, 0] }}
        transition={{ duration: 14, repeat: Infinity, delay: 2 }}
        className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-yellow-400 mix-blend-lighten filter blur-3xl opacity-25"
      />
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 40, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 w-96 h-96 border-4 border-white border-opacity-10 rounded-full"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
        className="relative z-10 max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 sm:p-12 flex flex-col items-center space-y-6"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 250, damping: 15, repeat: Infinity, repeatType: "reverse" }}
          className="p-4 sm:p-6 bg-white/30 rounded-full shadow-xl"
        >
          <CheckCircle className="h-24 w-24 sm:h-28 sm:w-28 text-white stroke-[2]" />
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg text-center"
        >
          Welcome, {name}!
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-white text-opacity-90 text-center text-lg sm:text-xl max-w-lg"
        >
          You've successfully signed in. Explore our products and enjoy your shopping experience!
        </motion.p>

       

        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="absolute top-0 left-1/2 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl mix-blend-lighten"
        />
        <motion.div
          animate={{ rotate: [0, -360] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          className="absolute bottom-0 right-1/3 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl mix-blend-lighten"
        />
      </motion.div>
    </div>
  );
};

export default SuccessMessage;
