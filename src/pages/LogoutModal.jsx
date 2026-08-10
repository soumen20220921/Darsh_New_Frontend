import React from "react";
import { LogOut, X, ShieldCheck, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      <div
        className="
          fixed inset-0 z-[9999]
          flex items-center justify-center
          bg-[#2b0d10]/60
          backdrop-blur-md
          px-4
          py-6
        "
        onClick={onCancel}
      >
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.88,
            y: 25,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0.9,
            y: 20,
          }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-[2rem]
            border
            border-[#d4ad54]/30
            bg-[#fffdf8]
            shadow-[0_25px_80px_rgba(74,24,21,0.30)]
          "
        >

          {/* =====================================================
              Decorative Background
          ====================================================== */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-40
              w-40
              rounded-full
              bg-[#d4ad54]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-16
              h-44
              w-44
              rounded-full
              bg-[#741522]/10
              blur-3xl
            "
          />

          {/* =====================================================
              Top Accent
          ====================================================== */}

          <div
            className="
              h-1.5
              w-full
              bg-gradient-to-r
              from-[#5f111b]
              via-[#d4ad54]
              to-[#5f111b]
            "
          />

          {/* =====================================================
              Close Button
          ====================================================== */}

          <button
            onClick={onCancel}
            aria-label="Close logout dialog"
            className="
              absolute
              right-4
              top-5
              z-20
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              border
              border-[#d4ad54]/20
              bg-white/80
              text-[#806c63]
              shadow-sm
              backdrop-blur
              transition-all
              duration-300
              hover:rotate-90
              hover:bg-[#f3e8d2]
              hover:text-[#741522]
            "
          >
            <X className="h-4 w-4" />
          </button>

          {/* =====================================================
              Content
          ====================================================== */}

          <div className="relative z-10 px-6 pb-7 pt-8 sm:px-8 sm:pb-9">

            {/* Logo / Brand */}

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="
                mb-6
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-[#b88732]
                "
              />

              <span
                className="
                  font-serif
                  text-sm
                  font-bold
                  uppercase
                  tracking-[0.28em]
                  text-[#741522]
                "
              >
                Darsh
              </span>

              <Sparkles
                className="
                  h-3.5
                  w-3.5
                  text-[#b88732]
                "
              />
            </motion.div>


            {/* =================================================
                Logout Icon
            ================================================== */}

            <div className="mb-6 flex justify-center">

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
                  stiffness: 220,
                  damping: 15,
                  delay: 0.1,
                }}
                className="relative"
              >

                {/* Outer ring */}

                <motion.div
                  animate={{
                    scale: [1, 1.12, 1],
                    opacity: [0.25, 0.08, 0.25],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    absolute
                    -inset-4
                    rounded-full
                    border
                    border-[#d4ad54]
                  "
                />

                {/* Icon container */}

                <div
                  className="
                    flex
                    h-24
                    w-24
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#d4ad54]/40
                    bg-gradient-to-br
                    from-[#741522]
                    via-[#861d29]
                    to-[#5f111b]
                    shadow-xl
                  "
                >

                  <LogOut
                    className="
                      h-10
                      w-10
                      text-[#f5d98a]
                    "
                  />

                </div>

                {/* Gold dot */}

                <motion.span
                  animate={{
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 1.8,
                    repeat: Infinity,
                  }}
                  className="
                    absolute
                    -right-1
                    top-2
                    h-3
                    w-3
                    rounded-full
                    bg-[#d4ad54]
                    shadow-lg
                  "
                />

              </motion.div>

            </div>


            {/* =================================================
                Heading
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.18,
              }}
              className="text-center"
            >

              <h3
                className="
                  font-serif
                  text-2xl
                  font-bold
                  text-[#4a1815]
                  sm:text-3xl
                "
              >
                Leaving So Soon?
              </h3>

              <div
                className="
                  mx-auto
                  mt-3
                  h-0.5
                  w-14
                  rounded-full
                  bg-gradient-to-r
                  from-[#741522]
                  via-[#d4ad54]
                  to-[#741522]
                "
              />

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-sm
                  text-sm
                  leading-6
                  text-[#806c63]
                "
              >
                Are you sure you want to log out
                of your Darsh account? You can
                always come back and continue
                exploring our collections.
              </p>

            </motion.div>


            {/* =================================================
                Security Notice
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.25,
              }}
              className="
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-[#d4ad54]/20
                bg-[#faf3e5]
                p-3.5
              "
            >

              <div
                className="
                  flex
                  h-9
                  w-9
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-[#741522]
                  text-[#f5d98a]
                "
              >
                <ShieldCheck className="h-4 w-4" />
              </div>

              <div className="text-left">

                <p
                  className="
                    text-xs
                    font-bold
                    text-[#4a1815]
                  "
                >
                  Your account is secure
                </p>

                <p
                  className="
                    mt-0.5
                    text-[10px]
                    leading-4
                    text-[#806c63]
                  "
                >
                  Your personal information
                  remains protected.
                </p>

              </div>

            </motion.div>


            {/* =================================================
                Buttons
            ================================================== */}

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
                delay: 0.32,
              }}
              className="
                mt-7
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              "
            >

              {/* Logout */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onConfirm}
                className="
                  group
                  flex
                  min-h-[48px]
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#741522]
                  to-[#5f111b]
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-[#741522]/20
                  transition-all
                  duration-300
                  hover:shadow-xl
                "
              >

                <LogOut
                  className="
                    h-4
                    w-4
                    transition-transform
                    duration-300
                    group-hover:translate-x-0.5
                  "
                />

                Logout

              </motion.button>


              {/* Cancel */}

              <motion.button
                whileHover={{
                  scale: 1.02,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                onClick={onCancel}
                className="
                  min-h-[48px]
                  rounded-xl
                  border
                  border-[#d4ad54]/30
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-bold
                  text-[#741522]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:bg-[#faf3e5]
                  hover:shadow-md
                "
              >
                Stay Logged In
              </motion.button>

            </motion.div>


            {/* =================================================
                Bottom Text
            ================================================== */}

            <p
              className="
                mt-5
                text-center
                text-[10px]
                text-[#aa9588]
              "
            >
              You can sign in again anytime.
            </p>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default LogoutModal;