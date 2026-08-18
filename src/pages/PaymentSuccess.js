import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Home,
  FileCheck2,
  Star,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const PaymentConfirmationPage = () => {
  const { getCart, token, url } = useAppContext();

  const [rating, setRating] = useState(0);
  const [clearingCart, setClearingCart] = useState(true);
  const [clearError, setClearError] = useState(false);
  const clearStartedRef = useRef(false);

  const navigate = useNavigate();

  /* -------------------------------------------------------
     Scroll + clear cart
  ------------------------------------------------------- */

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (clearStartedRef.current) return;
    clearStartedRef.current = true;

    let cancelled = false;

    const clearCart = async () => {
      if (!token || !url) {
        if (!cancelled) setClearingCart(false);
        return;
      }

      try {
        await axios.delete(`${url}/api/cart/clearCart`, {
          headers: { Auth: token },
        });

        if (!cancelled && typeof getCart === "function") {
          await getCart();
        }
      } catch (error) {
        if (!cancelled) {
          setClearError(true);
          console.error(
            "Unable to clear cart:",
            error?.response?.data || error?.message || error
          );
        }
      } finally {
        if (!cancelled) setClearingCart(false);
      }
    };

    clearCart();

    return () => {
      cancelled = true;
    };
  }, [token, url, getCart]);

  /* -------------------------------------------------------
     Navigation
  ------------------------------------------------------- */

  const goToHome = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate("/");
  };

  const viewOrders = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate("/account?tab=3");
  };

  const continueShopping = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    navigate("/allproducts");
  };

  const handleRating = (value) => {
    setRating(value);
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
        delay: 0.12,
      },
    },
  };

  const successIconVariants = {
    hidden: {
      opacity: 0,
      scale: 0.45,
      rotate: -25,
    },

    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 160,
        damping: 12,
        delay: 0.35,
      },
    },
  };

  const floatingLeft = {
    animate: {
      y: [0, -12, 0],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const floatingRight = {
    animate: {
      y: [0, 12, 0],
      rotate: [0, -6, 6, 0],
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
      opacity: [1, 0.82, 1],
      transition: {
        duration: 2.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <main className="relative flex min-h-[calc(100svh-1px)] w-full items-center justify-center overflow-hidden bg-[#f8f3e9] px-3 py-6 sm:px-5 sm:py-10 md:py-14">

      {/* =====================================================
          BACKGROUND DECORATION
      ===================================================== */}

      <div className="absolute inset-0 pointer-events-none">

        {/* Soft background glow */}

        <div className="absolute top-1/4 left-1/4 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-[#ead9a7]/20 blur-3xl" />

        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 sm:w-[420px] sm:h-[420px] rounded-full bg-[#76131d]/5 blur-3xl" />

        {/* Floating shopping bag */}

        <motion.div
          variants={floatingLeft}
          animate="animate"
          className="absolute left-3 top-20 sm:left-10 lg:left-20"
        >
          <ShoppingBag
            className="w-7 h-7 sm:w-10 sm:h-10 text-[#c9a24a]/45"
            strokeWidth={1}
          />
        </motion.div>

        {/* Floating sparkle */}

        <motion.div
          variants={floatingRight}
          animate="animate"
          className="absolute bottom-16 right-3 sm:right-10 lg:right-20"
        >
          <Sparkles
            className="w-8 h-8 sm:w-11 sm:h-11 text-[#c9a24a]/40"
            strokeWidth={1}
          />
        </motion.div>

        {/* Decorative stars */}

        <motion.div
          variants={floatingLeft}
          animate="animate"
          className="absolute top-1/3 right-[12%] hidden md:block text-[#c9a24a]/50 text-2xl"
        >
          ✦
        </motion.div>

        <motion.div
          variants={floatingRight}
          animate="animate"
          className="absolute bottom-1/3 left-[12%] hidden md:block text-[#76131d]/20 text-xl"
        >
          ✦
        </motion.div>
      </div>

      {/* =====================================================
          SUCCESS CARD
      ===================================================== */}

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-xl"
      >
        <div className="relative max-h-[calc(100svh-2rem)] overflow-y-auto rounded-[1.5rem] bg-[#fcfaf5] px-4 py-7 text-center shadow-[0_25px_70px_rgba(89,50,40,0.12)] sm:max-h-none sm:rounded-none sm:px-8 sm:py-10 md:px-10 md:py-11">

          {/* Top maroon line */}

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#76131d]" />

          {/* Decorative corners */}

          <div className="absolute top-5 left-5 w-8 h-8 border-l border-t border-[#c9a24a]/60" />

          <div className="absolute top-5 right-5 w-8 h-8 border-r border-t border-[#c9a24a]/60" />

          <div className="absolute bottom-5 left-5 w-8 h-8 border-l border-b border-[#c9a24a]/60" />

          <div className="absolute bottom-5 right-5 w-8 h-8 border-r border-b border-[#c9a24a]/60" />

          {/* =================================================
              BRAND
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
              SUCCESS ICON
          ================================================= */}

          <div className="flex justify-center mt-6 mb-6 sm:mt-8 sm:mb-7">
            <motion.div
              variants={successIconVariants}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              {/* Outer pulse ring */}

              <motion.div
                variants={pulse}
                animate="animate"
                className="absolute -inset-4 rounded-full border border-[#c9a24a]/35"
              />

              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-[4.5rem] w-[4.5rem] items-center justify-center sm:h-24 sm:w-24 rounded-full bg-[#f5eedf] border border-[#d8c59a]"
              >
                <CheckCircle2
                  className="w-11 h-11 sm:w-14 sm:h-14 text-[#9a741d]"
                  strokeWidth={1.25}
                />
              </motion.div>

              {/* Small gold dot */}

              <motion.span
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-[#c9a24a] rounded-full"
              />
            </motion.div>
          </div>

          {/* =================================================
              SUCCESS TEXT
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
              Order confirmed
            </p>

            <h1 className="font-serif text-[1.7rem] leading-tight sm:text-4xl md:text-5xl text-[#351216] leading-tight">
              Thank you for your order
            </h1>

            <p className="mx-auto mt-4 max-w-md text-xs leading-6 text-[#765c52] sm:mt-5 sm:text-base sm:leading-7">
              Your purchase has been confirmed successfully.
              We are delighted to prepare your beautiful handloom
              collection for you.
            </p>
          </motion.div>

          {/* =================================================
              ORDER STATUS
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
            className="mt-6 border border-[#dfd2c1] bg-[#f8f0e4] p-3.5 sm:mt-7 sm:p-4"
          >
            <div className="flex items-center justify-center gap-3">
              <ShieldCheck
                className="w-5 h-5 text-[#9a741d]"
                strokeWidth={1.4}
              />

              <div className="text-left">
                <p className="text-sm font-semibold text-[#5d0e16]">
                  Your order is confirmed
                </p>

                <p className="text-xs text-[#765c52] mt-1">
                  You can view your order details from your account.
                </p>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              RATING
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
              delay: 0.8,
              duration: 0.5,
            }}
            className="mt-6 border-t border-dashed border-[#dfd2c1] pt-5 sm:mt-7 sm:pt-6"
          >
            <p className="text-[9px] tracking-[0.25em] uppercase text-[#977e73] mb-2">
              Your experience
            </p>

            <p className="font-serif text-lg text-[#351216] mb-4">
              How was your shopping experience?
            </p>

            <div className="flex justify-center items-center gap-2 sm:gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() => handleRating(star)}
                  whileHover={{
                    scale: 1.25,
                    rotate: 6,
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  aria-label={`Rate ${star} out of 5`}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 sm:w-7 sm:h-7 transition-all duration-300 ${
                      star <= rating
                        ? "fill-[#c9a24a] text-[#c9a24a]"
                        : "text-[#cdbfae] hover:text-[#c9a24a]"
                    }`}
                    strokeWidth={1.3}
                  />
                </motion.button>
              ))}
            </div>

            {rating > 0 && (
              <motion.p
                initial={{
                  opacity: 0,
                  y: 5,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="text-xs text-[#977e73] mt-3"
              >
                Thank you for rating us {rating}/5.
              </motion.p>
            )}
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
              delay: 0.95,
              duration: 0.5,
            }}
            className="mt-6 grid grid-cols-1 gap-2.5 sm:mt-7 sm:grid-cols-2 sm:gap-3"
          >
            {/* View Orders */}

            <motion.button
              type="button"
              onClick={viewOrders}
              whileHover={{
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-5 bg-[#76131d] text-white text-[10px] sm:text-xs tracking-[0.2em] uppercase shadow-lg hover:bg-[#5d0e16] hover:shadow-xl transition-all duration-300"
            >
              <FileCheck2 className="w-4 h-4" />

              View orders
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
              CONTINUE SHOPPING
          ================================================= */}

          <motion.button
            type="button"
            onClick={continueShopping}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 1.1,
            }}
            className="mt-5 inline-flex min-h-9 items-center gap-2 px-2 text-[9px] tracking-[0.2em] uppercase text-[#977e73] hover:text-[#76131d] transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />

            Continue shopping

            <ArrowRight className="w-3.5 h-3.5" />
          </motion.button>

          {/* =================================================
              CART CLEAR STATUS
          ================================================= */}

          <div className="mt-5 border-t border-[#e3d8c8] pt-4">
            <div className="flex items-center justify-center gap-2">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  clearingCart
                    ? "bg-[#c9a24a] animate-pulse"
                    : "bg-green-600"
                }`}
              />

              <p className="text-[9px] tracking-[0.2em] uppercase text-[#b09b8c]">
                {clearingCart
                  ? "Updating your shopping bag"
                  : clearError
                  ? "Shopping bag will refresh shortly"
                  : "Shopping bag updated"}
              </p>
            </div>
          </div>

          {/* Bottom brand */}

          <p className="text-[8px] tracking-[0.3em] uppercase text-[#c0ad9d] mt-4">
            Handwoven with care · Darsh
          </p>
        </div>
      </motion.div>
    </main>
  );
};

export default PaymentConfirmationPage;