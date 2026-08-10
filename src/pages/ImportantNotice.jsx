import React, { useEffect, useState } from "react";
import {
  CircleAlert,
  Languages,
  ShieldAlert,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImportantNotice = () => {
  const [showBengali, setShowBengali] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBengali(true);
    }, 120000);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    setShowBengali((previous) => !previous);
  };

  return (
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
        duration: 0.5,
      }}
      className="relative overflow-hidden bg-[#fcfaf5] border border-[#dfd2c1] shadow-[0_12px_35px_rgba(89,50,40,0.07)]"
    >
      {/* =====================================================
          TOP GOLD LINE
      ===================================================== */}

      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#c9a24a]" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          {/* Animated icon */}

          <motion.div
            animate={{
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative w-9 h-9 flex-shrink-0 flex items-center justify-center bg-[#f7ecdc] border border-[#e2d0aa]"
          >
            <CircleAlert
              className="w-4 h-4 text-[#9a741d]"
              strokeWidth={1.5}
            />

            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#76131d]" />
          </motion.div>

          <div className="min-w-0">
            <p className="text-[9px] tracking-[0.28em] uppercase text-[#977e73]">
              Darsh
            </p>

            <h3 className="font-serif text-base sm:text-lg text-[#351216] leading-tight">
              Important Notice
            </h3>
          </div>
        </div>

        {/* Right controls */}

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Change notice language"
            className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[#dfd2c1] bg-[#fffdf8] text-[#765c52] hover:text-[#76131d] hover:border-[#c9a24a] transition-all duration-300 text-[10px] sm:text-xs"
          >
            <Languages className="w-3.5 h-3.5" />

            <span className="hidden sm:inline">
              {showBengali ? "English" : "বাংলা"}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              setIsExpanded((previous) => !previous)
            }
            aria-label={
              isExpanded
                ? "Collapse notice"
                : "Expand notice"
            }
            className="w-8 h-8 flex items-center justify-center border border-[#dfd2c1] text-[#977e73] hover:text-[#76131d] hover:border-[#c9a24a] transition-all duration-300"
          >
            <motion.div
              animate={{
                rotate: isExpanded ? 180 : 0,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>
      </div>

      {/* =====================================================
          NOTICE CONTENT
      ===================================================== */}

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              <div className="border-l-2 border-[#76131d] bg-[#f8f0e4] px-4 py-3">
                <AnimatePresence mode="wait">
                  {!showBengali ? (
                    <motion.div
                      key="english"
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 8,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <p className="text-xs sm:text-sm text-[#5d4039] leading-6">
                        <span className="font-semibold text-[#76131d]">
                          Important:
                        </span>{" "}
                        After the delivery of the product, we{" "}
                        <span className="font-semibold text-[#5d0e16]">
                          must need the parcel opening video
                        </span>
                        , otherwise the return policy will not be
                        approved.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="bengali"
                      initial={{
                        opacity: 0,
                        x: 8,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -8,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      <p
                        lang="bn"
                        className="text-xs sm:text-sm text-[#5d4039] leading-7"
                      >
                        <span className="font-semibold text-[#76131d]">
                          গুরুত্বপূর্ণ:
                        </span>{" "}
                        পণ্য সরবরাহের পর আমরা{" "}
                        <span className="font-semibold text-[#5d0e16]">
                          অবশ্যই পার্সেল খোলার ভিডিও চাই
                        </span>
                        , অন্যথায় রিটার্ন নীতি অনুমোদিত হবে না।
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Small security note */}

              <div className="flex items-center gap-2 mt-3">
                <ShieldAlert className="w-3.5 h-3.5 text-[#c9a24a] flex-shrink-0" />

                <p className="text-[9px] sm:text-[10px] text-[#977e73] leading-4">
                  Please record the complete parcel opening process
                  clearly from start to finish.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          BOTTOM DECORATION
      ===================================================== */}

      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-1/3 h-[1px] bg-[#c9a24a]/50"
      />
    </motion.div>
  );
};

export default ImportantNotice;