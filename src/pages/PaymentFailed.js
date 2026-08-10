import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  Home,
  RefreshCcw,
  ShoppingBag,
  ShieldAlert,
} from "lucide-react";
import { motion } from "framer-motion";

const PaymentFailedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const goToHome = () => {
    navigate("/");
  };

  const tryAgain = () => {
    navigate("/cart");
  };

  const goBack = () => {
    navigate(-1);
  };

  /* -------------------------------------------------------
     Animations
  ------------------------------------------------------- */

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 45,
      scale: 0.94,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 16,
        delay: 0.15,
      },
    },
  };

  const iconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      rotate: -20,
    },

    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 12,
        delay: 0.35,
      },
    },
  };

  const floatingLeft = {
    animate: {
      y: [0, -12, 0],
      rotate: [0, 4, -4, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingRight = {
    animate: {
      y: [0, 14, 0],
      rotate: [0, -5, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const pulse = {
    animate: {
      scale: [1, 1.06, 1],
      opacity: [1, 0.85, 1],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative min-h-[85vh] overflow-hidden bg-[#f8f3e9] flex items-center justify-center px-4 py-14 sm:py-20">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Soft radial glow */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#ead9a7]/20 blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-[#76131d]/5 blur-3xl" />

        {/* Floating shopping bag */}
        <motion.div
          variants={floatingLeft}
          animate="animate"
          className="absolute top-20 left-5 sm:left-14 lg:left-24"
        >
          <ShoppingBag
            className="w-7 h-7 sm:w-10 sm:h-10 text-[#c9a24a]/45"
            strokeWidth={1}
          />
        </motion.div>

        {/* Floating alert */}
        <motion.div
          variants={floatingRight}
          animate="animate"
          className="absolute bottom-20 right-5 sm:right-14 lg:right-24"
        >
          <AlertCircle
            className="w-8 h-8 sm:w-11 sm:h-11 text-[#76131d]/25"
            strokeWidth={1}
          />
        </motion.div>

        {/* Small decorative mark */}
        <motion.div
          variants={floatingLeft}
          animate="animate"
          className="absolute top-1/3 right-[12%] hidden md:block"
        >
          <span className="text-[#c9a24a]/50 text-2xl">
            ✦
          </span>
        </motion.div>

        <motion.div
          variants={floatingRight}
          animate="animate"
          className="absolute bottom-1/3 left-[12%] hidden md:block"
        >
          <span className="text-[#76131d]/20 text-xl">
            ✦
          </span>
        </motion.div>
      </div>

      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-lg"
      >
        <div className="relative bg-[#fcfaf5] border border-[#dfd2c1] shadow-[0_25px_70px_rgba(89,50,40,0.12)] px-6 py-9 sm:px-10 sm:py-12 text-center">

          {/* Top maroon line */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#76131d]" />

          {/* Gold corner decoration */}
          <div className="absolute top-5 left-5 w-8 h-8 border-l border-t border-[#c9a24a]/60" />

          <div className="absolute top-5 right-5 w-8 h-8 border-r border-t border-[#c9a24a]/60" />

          <div className="absolute bottom-5 left-5 w-8 h-8 border-l border-b border-[#c9a24a]/60" />

          <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-[#c9a24a]/60" />

          {/* =================================================
              BRAND LABEL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
            }}
          >
            <p className="text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-[#977e73]">
              Darsh Handlooms
            </p>

            <div className="flex items-center justify-center gap-3 mt-3">
              <span className="w-8 h-px bg-[#c9a24a]" />

              <span className="text-[#c9a24a] text-xs">
                ✦
              </span>

              <span className="w-8 h-px bg-[#c9a24a]" />
            </div>
          </motion.div>

          {/* =================================================
              FAILED ICON
          ================================================= */}

          <div className="flex justify-center mt-8 mb-7">
            <motion.div
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Outer ring */}
              <motion.div
                variants={pulse}
                animate="animate"
                className="absolute -inset-3 sm:-inset-4 rounded-full border border-[#76131d]/20"
              />

              {/* Icon circle */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-[#f6e8e5] border border-[#d9b9b5]">
                <AlertCircle
                  className="w-11 h-11 sm:w-14 sm:h-14 text-[#76131d]"
                  strokeWidth={1.25}
                />
              </div>
            </motion.div>
          </div>

          {/* =================================================
              TITLE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
          >
            <p className="text-[9px] tracking-[0.32em] uppercase text-[#977e73] mb-2">
              Payment status
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#351216] leading-tight">
              Payment could not be completed
            </h1>

            <p className="text-sm sm:text-base text-[#765c52] leading-7 max-w-md mx-auto mt-5">
              Something went wrong while processing your transaction.
              No need to worry — you can safely return to your cart and
              try the payment again.
            </p>
          </motion.div>

          {/* =================================================
              NOTICE
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.65,
              duration: 0.5,
            }}
            className="mt-7 border-l-2 border-[#c9a24a] bg-[#f8f0e4] p-4 text-left"
          >
            <div className="flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-[#c9a24a] flex-shrink-0 mt-0.5" />

              <div>
                <p className="text-sm font-semibold text-[#5d0e16]">
                  Your cart is still safe
                </p>

                <p className="text-xs sm:text-sm text-[#765c52] leading-5 mt-1">
                  Your selected sarees remain in your shopping bag.
                  Please try the payment again or return to the home
                  page.
                </p>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              ACTION BUTTONS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.8,
              duration: 0.5,
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-7"
          >
            {/* Try Again */}

            <motion.button
              type="button"
              onClick={tryAgain}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#76131d] text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase shadow-lg hover:bg-[#5d0e16] hover:shadow-xl transition-all duration-300"
            >
              <RefreshCcw className="w-4 h-4" />

              Try again
            </motion.button>

            {/* Home */}

            <motion.button
              type="button"
              onClick={goToHome}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 border border-[#d9ccba] bg-[#fffdf8] text-[#765c52] text-[10px] sm:text-xs tracking-[0.2em] uppercase hover:border-[#76131d] hover:text-[#76131d] transition-all duration-300"
            >
              <Home className="w-4 h-4" />

              Home
            </motion.button>
          </motion.div>

          {/* =================================================
              BACK LINK
          ================================================= */}

          <motion.button
            type="button"
            onClick={goBack}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1,
            }}
            className="inline-flex items-center gap-2 mt-7 text-[9px] tracking-[0.2em] uppercase text-[#977e73] hover:text-[#76131d] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />

            Go back
          </motion.button>

          {/* =================================================
              BOTTOM BRAND LINE
          ================================================= */}

          <div className="mt-8 pt-5 border-t border-[#e3d8c8]">
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#b09b8c]">
              Handwoven with care · Darsh
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default PaymentFailedPage;