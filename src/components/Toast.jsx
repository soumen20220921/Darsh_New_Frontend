import React from "react";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Info,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({
  type = "success",
  message = "Product added to cart!",
  onClose,
}) => {
  /* -------------------------------------------------------
     Darsh Toast Variants
  ------------------------------------------------------- */

  const variants = {
    success: {
      icon: CheckCircle2,
      label: "Success",
      accent: "#9a741d",
      iconBg: "bg-[#f5eedf]",
      iconBorder: "border-[#d8c59a]",
      iconText: "text-[#9a741d]",
      line: "bg-[#c9a24a]",
    },

    error: {
      icon: XCircle,
      label: "Something went wrong",
      accent: "#76131d",
      iconBg: "bg-[#f6e8e5]",
      iconBorder: "border-[#d9b9b5]",
      iconText: "text-[#76131d]",
      line: "bg-[#76131d]",
    },

    warning: {
      icon: AlertCircle,
      label: "Please note",
      accent: "#9a741d",
      iconBg: "bg-[#f8f0e4]",
      iconBorder: "border-[#dfcc9f]",
      iconText: "text-[#9a741d]",
      line: "bg-[#c9a24a]",
    },

    info: {
      icon: Info,
      label: "Information",
      accent: "#765c52",
      iconBg: "bg-[#f2eee8]",
      iconBorder: "border-[#d8cdc0]",
      iconText: "text-[#765c52]",
      line: "bg-[#977e73]",
    },
  };

  const variant = variants[type] || variants.success;

  const Icon = variant.icon;

  /* -------------------------------------------------------
     Animation
  ------------------------------------------------------- */

  const toastVariants = {
    hidden: {
      opacity: 0,
      x: 60,
      scale: 0.94,
    },

    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 280,
        damping: 24,
      },
    },

    exit: {
      opacity: 0,
      x: 50,
      scale: 0.96,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.div
        variants={toastVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        role="alert"
        aria-live="polite"
        className="
          fixed
          top-5
          right-4
          sm:right-5
          z-[100]
          w-[calc(100%-2rem)]
          max-w-[390px]
        "
      >
        <div
          className="
            relative
            overflow-hidden
            bg-[#fcfaf5]
            border
            border-[#dfd2c1]
            shadow-[0_18px_50px_rgba(89,50,40,0.16)]
          "
        >
          {/* =================================================
              TOP ACCENT LINE
          ================================================= */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
            className={`absolute top-0 left-0 right-0 h-[3px] origin-left ${variant.line}`}
          />

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="flex items-start gap-3 p-4 sm:p-5">

            {/* Icon */}

            <motion.div
              initial={{
                scale: 0.7,
                rotate: -10,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 14,
                delay: 0.1,
              }}
              className={`
                relative
                flex-shrink-0
                w-10
                h-10
                rounded-full
                flex
                items-center
                justify-center
                border
                ${variant.iconBg}
                ${variant.iconBorder}
              `}
            >
              <Icon
                className={`w-5 h-5 ${variant.iconText}`}
                strokeWidth={1.6}
              />

              {/* Small animated dot */}

              <motion.span
                animate={{
                  scale: [1, 1.25, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#c9a24a]"
              />
            </motion.div>

            {/* Message */}

            <div className="flex-1 min-w-0 pt-0.5">

              <div className="flex items-center gap-2">
                <p
                  className="
                    text-[9px]
                    sm:text-[10px]
                    tracking-[0.25em]
                    uppercase
                    text-[#977e73]
                    font-medium
                  "
                >
                  {variant.label}
                </p>

                <Sparkles
                  className="w-3 h-3 text-[#c9a24a]"
                  strokeWidth={1.4}
                />
              </div>

              <p
                className="
                  mt-1
                  text-sm
                  sm:text-[15px]
                  leading-5
                  text-[#351216]
                  font-medium
                  break-words
                "
              >
                {message}
              </p>
            </div>

            {/* Close */}

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close notification"
                className="
                  flex-shrink-0
                  w-7
                  h-7
                  flex
                  items-center
                  justify-center
                  text-[#a58f82]
                  hover:text-[#76131d]
                  hover:bg-[#f5eee5]
                  transition-all
                  duration-200
                "
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* =================================================
              BOTTOM BRAND
          ================================================= */}

          <div className="px-4 sm:px-5 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-px bg-[#c9a24a]/60" />

              <p className="text-[7px] tracking-[0.28em] uppercase text-[#b09b8c]">
                Darsh Handlooms
              </p>

              <span className="flex-1 h-px bg-[#e7ddd0]" />
            </div>
          </div>

          {/* =================================================
              PROGRESS ANIMATION
          ================================================= */}

          <motion.div
            initial={{
              scaleX: 1,
            }}
            animate={{
              scaleX: 0,
            }}
            transition={{
              duration: 4,
              ease: "linear",
            }}
            className={`h-[2px] origin-left ${variant.line}`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;