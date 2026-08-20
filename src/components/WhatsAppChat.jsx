import React, { useState } from "react";
import {
  FaWhatsapp,
  FaTimes,
  FaPaperPlane,
} from "react-icons/fa";
import {
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);

  const [phone, setPhone] = useState("");

  const [message, setMessage] = useState(
    "Hi! I'm visiting the Darsh website and would like some assistance. Please let me know how you can help."
  );

  const [phoneError, setPhoneError] = useState("");

  /* -------------------------------------------------------
     WhatsApp Chat
  ------------------------------------------------------- */

  const handleChat = () => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (!cleanPhone) {
      setPhoneError("Please enter your phone number.");
      return;
    }

    if (cleanPhone.length < 10) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }

    setPhoneError("");

    const text =
      `Customer Number: ${cleanPhone}\n\n${message}`;

    const whatsappUrl =
      `https://wa.me/919474048860?text=${encodeURIComponent(text)}`;

    window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* -------------------------------------------------------
     Phone Input
  ------------------------------------------------------- */

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Allow only numbers, spaces, +, -, parentheses
    const cleaned = value.replace(/[^\d+\-()\s]/g, "");

    setPhone(cleaned);

    if (phoneError) {
      setPhoneError("");
    }
  };

  /* -------------------------------------------------------
     Animation
  ------------------------------------------------------- */

  const popupVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.94,
    },

    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 22,
      },
    },

    exit: {
      opacity: 0,
      y: 15,
      scale: 0.96,
      transition: {
        duration: 0.18,
      },
    },
  };

  return (
    <>
      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-[#351216]/20 backdrop-blur-[2px] z-[59] sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* =====================================================
          CHAT POPUP
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <motion.div
            variants={popupVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed
              z-[60]
              bottom-24
              right-4
              left-4
              sm:right-auto
              sm:left-6
              sm:bottom-28
              w-auto
              sm:w-[370px]
              max-w-[calc(100vw-2rem)]
            "
          >
            <div
              className="
                relative
                overflow-hidden
                bg-[#fcfaf5]
                border
                border-[#dfd2c1]
                shadow-[0_25px_70px_rgba(89,50,40,0.20)]
              "
            >
              {/* Top gold line */}

              <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c9a24a]" />

              {/* =================================================
                  HEADER
              ================================================= */}

              <div className="bg-[#76131d] px-5 py-4">
                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                      <FaWhatsapp
                        className="text-white"
                        size={22}
                      />

                      <motion.span
                        animate={{
                          scale: [1, 1.25, 1],
                          opacity: [1, 0.6, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                        className="
                          absolute
                          -top-1
                          -right-1
                          w-2.5
                          h-2.5
                          rounded-full
                          bg-[#c9a24a]
                        "
                      />
                    </div>

                    <div>
                      <p className="text-[8px] tracking-[0.3em] uppercase text-white/60">
                        Darsh Support
                      </p>

                      <h2 className="font-serif text-lg text-white">
                        Chat with us
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close WhatsApp chat"
                    className="
                      w-8
                      h-8
                      rounded-full
                      flex
                      items-center
                      justify-center
                      text-white/80
                      hover:text-white
                      hover:bg-white/10
                      transition-all
                    "
                  >
                    <FaTimes size={15} />
                  </button>
                </div>
              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="p-5 space-y-4">

                {/* Welcome */}

                <div className="flex gap-3 p-3 bg-[#f8f0e4] border-l-2 border-[#c9a24a]">
                  <MessageCircle
                    className="w-4 h-4 text-[#9a741d] flex-shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />

                  <p className="text-xs leading-5 text-[#765c52]">
                    Have a question about a saree, order, delivery,
                    or anything else? We're happy to help.
                  </p>
                </div>

                {/* =================================================
                    PHONE
                ================================================= */}

                <div>
                  <label
                    htmlFor="whatsapp-phone"
                    className="
                      block
                      text-[9px]
                      tracking-[0.2em]
                      uppercase
                      text-[#977e73]
                      mb-2
                    "
                  >
                    Your phone number
                  </label>

                  <input
                    id="whatsapp-phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={handlePhoneChange}
                    className="
                      w-full
                      px-4
                      py-3
                      bg-[#fffdf8]
                      border
                      border-[#dfd2c1]
                      text-sm
                      text-[#351216]
                      placeholder:text-[#b6a59a]
                      outline-none
                      focus:border-[#c9a24a]
                      focus:ring-2
                      focus:ring-[#c9a24a]/10
                      transition-all
                    "
                  />

                  {phoneError && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -4,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="text-[10px] text-[#76131d] mt-1.5"
                    >
                      {phoneError}
                    </motion.p>
                  )}
                </div>

                {/* =================================================
                    MESSAGE
                ================================================= */}

                <div>
                  <label
                    htmlFor="whatsapp-message"
                    className="
                      block
                      text-[9px]
                      tracking-[0.2em]
                      uppercase
                      text-[#977e73]
                      mb-2
                    "
                  >
                    Your message
                  </label>

                  <textarea
                    id="whatsapp-message"
                    rows={4}
                    value={message}
                    onChange={(e) =>
                      setMessage(e.target.value)
                    }
                    placeholder="How can we help you?"
                    className="
                      w-full
                      resize-none
                      px-4
                      py-3
                      bg-[#fffdf8]
                      border
                      border-[#dfd2c1]
                      text-sm
                      text-[#351216]
                      placeholder:text-[#b6a59a]
                      outline-none
                      focus:border-[#c9a24a]
                      focus:ring-2
                      focus:ring-[#c9a24a]/10
                      transition-all
                    "
                  />
                </div>

                {/* =================================================
                    START CHAT BUTTON
                ================================================= */}

                <motion.button
                  type="button"
                  onClick={handleChat}
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    justify-center
                    gap-2
                    py-3.5
                    px-5
                    bg-[#76131d]
                    text-white
                    text-[10px]
                    tracking-[0.2em]
                    uppercase
                    font-medium
                    shadow-lg
                    hover:bg-[#5d0e16]
                    hover:shadow-xl
                    transition-all
                    duration-300
                  "
                >
                  <FaWhatsapp size={16} />

                  Start WhatsApp Chat

                  <FaPaperPlane
                    size={12}
                    className="opacity-70"
                  />
                </motion.button>

                {/* =================================================
                    SECURITY NOTE
                ================================================= */}

                <div className="flex items-center justify-center gap-2 pt-1">
                  <ShieldCheck
                    className="w-3.5 h-3.5 text-[#c9a24a]"
                    strokeWidth={1.5}
                  />

                  <p className="text-[9px] text-[#977e73]">
                    You'll be redirected to WhatsApp securely.
                  </p>
                </div>

                {/* Brand */}

                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="w-5 h-px bg-[#c9a24a]" />

                  <Sparkles
                    className="w-3 h-3 text-[#c9a24a]"
                    strokeWidth={1}
                  />

                  <span className="text-[8px] tracking-[0.3em] uppercase text-[#b09b8c]">
                    Darsh Handlooms
                  </span>

                  <span className="w-5 h-px bg-[#c9a24a]" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          FLOATING WHATSAPP BUTTON
      ===================================================== */}

      <div className="fixed bottom-5 left-5 md:bottom-6 md:left-6 z-[61]">

        {/* Pulse ring */}

        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.35, 0, 0.35],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
          className="
            absolute
            inset-0
            rounded-full
            bg-[#c9a24a]
          "
        />

        {/* Main button */}

        <motion.button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.94,
          }}
          aria-label={
            open
              ? "Close WhatsApp chat"
              : "Open WhatsApp chat"
          }
          className="
            relative
            w-11
            h-11
            sm:w-14
            sm:h-14
            rounded-full
            bg-[#76131d]
            border
            border-[#c9a24a]
            text-white
            shadow-[0_10px_35px_rgba(89,50,40,0.25)]
            flex
            items-center
            justify-center
            transition-all
            duration-300
          "
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{
                  opacity: 0,
                  rotate: -90,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  rotate: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  rotate: 90,
                  scale: 0.7,
                }}
              >
                <FaTimes size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="whatsapp"
                initial={{
                  opacity: 0,
                  scale: 0.7,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.7,
                }}
              >
                <FaWhatsapp size={24} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Online dot */}

          {!open && (
            <span className="
              absolute
              top-0
              right-0
              w-3
              h-3
              rounded-full
              bg-[#2f9e44]
              border-2
              border-[#76131d]
            " />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default WhatsAppChat;