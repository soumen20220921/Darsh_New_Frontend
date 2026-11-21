import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  FaWhatsapp,
  FaTimes,
} from "react-icons/fa";
import {
  Phone,
  ShieldCheck,
  Sparkles,
  Headset,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CONTACTS = [
  {
    id: 1,
    number: "6295061098",
    label: "Customer Support",
    description: "For general questions and assistance",
    color: "#741522",
  },
  {
    id: 2,
    number: "8927370455",
    label: "Order Assistance",
    description: "For orders, delivery and tracking",
    color: "#9B772B",
  },
  {
    id: 3,
    number: "9883277103",
    label: "General Enquiries",
    description: "For products, sarees and enquiries",
    color: "#168447",
  },
];

const DEFAULT_MESSAGE =
  "Hi! I'm visiting the Darsh website and would like some assistance. Please let me know how you can help.";

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [phoneError, setPhoneError] = useState("");

  // Lock background scroll and support Escape while the dialog is open.
  useEffect(() => {
    if (!open || typeof document === "undefined") return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handlePhoneChange = (event) => {
    const value = event.target.value.replace(/[^\d+\-\s()]/g, "");
    setPhone(value);

    if (phoneError) setPhoneError("");
  };

  const handleChat = (contact) => {
    const cleanPhone = phone.replace(/\D/g, "");

    if (phone.trim() && cleanPhone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number.");
      return;
    }

    setPhoneError("");

    const text = [
      "Hello Darsh Team!",
      "",
      phone.trim() ? `My Contact Number: ${cleanPhone}` : "",
      message.trim() || DEFAULT_MESSAGE,
      "",
      "Thank you!",
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/91${contact.number}?text=${encodeURIComponent(
      text
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.94, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 280, damping: 26 },
    },
    exit: {
      opacity: 0,
      scale: 0.97,
      y: 16,
      transition: { duration: 0.18 },
    },
  };

  return (
    <>
      {/* Centered WhatsApp dialog */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                key="whatsapp-dialog-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onMouseDown={(event) => {
                  if (event.target === event.currentTarget) {
                    setOpen(false);
                  }
                }}
                className="fixed inset-0 z-[99999] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#1d0b0e]/70 p-3 backdrop-blur-md sm:p-5"
              >
                <motion.section
                  variants={popupVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="darsh-whatsapp-title"
                  onMouseDown={(event) => event.stopPropagation()}
                  className="relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-[560px] flex-col overflow-hidden rounded-[1.5rem] border border-[#dfd2c1] bg-[#fcfaf5] shadow-[0_30px_100px_rgba(0,0,0,.45)] sm:max-h-[calc(100dvh-3rem)] sm:rounded-[1.8rem]"
                >
                  <div className="h-1 w-full shrink-0 bg-gradient-to-r from-[#741522] via-[#d4ad54] to-[#741522]" />

                  {/* Header */}
                  <header className="relative shrink-0 overflow-hidden bg-[#741522] px-5 py-5 sm:px-7 sm:py-6">
                    <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border border-white/10" />
                    <div className="pointer-events-none absolute -right-5 -top-16 h-48 w-48 rounded-full border border-white/10" />

                    <div className="relative flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner sm:h-14 sm:w-14">
                          <FaWhatsapp className="text-white" size={27} />
                          <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full border-2 border-[#741522] bg-[#25D366]" />
                        </div>

                        <div className="min-w-0">
                          <p className="text-[9px] font-bold uppercase tracking-[.25em] text-white/60 sm:text-[10px]">
                            Darsh customer care
                          </p>
                          <h2
                            id="darsh-whatsapp-title"
                            className="mt-0.5 font-serif text-xl text-white sm:text-2xl"
                          >
                            We're here to help!
                          </h2>
                          <p className="mt-1 text-[11px] text-white/70 sm:text-xs">
                            Choose your preferred contact
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close WhatsApp chat"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                      >
                        <FaTimes size={16} />
                      </button>
                    </div>
                  </header>

                  {/* Scrollable body */}
                  <div className="min-h-0 flex-1 space-y-5 overflow-y-auto overscroll-contain p-4 sm:space-y-6 sm:p-6">
                    <div className="flex gap-3 rounded-xl border border-[#eadcc8] bg-[#f8f0e4] p-3.5 sm:p-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#9a741d]">
                        <Headset size={19} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#741522]">
                          Welcome to Darsh!
                        </p>
                        <p className="mt-1 text-xs leading-5 text-[#765c52] sm:text-[13px]">
                          Have questions about sarees, orders, payments or
                          delivery? Our team is ready to assist you.
                        </p>
                      </div>
                    </div>

                    

                    {/* Contact numbers */}
                    <div>
                      <div className="mb-3 flex items-end justify-between gap-3">
                        <div>
                          <h3 className="text-xs font-bold uppercase tracking-[.16em] text-[#741522]">
                            Contact our team
                          </h3>
                          <p className="mt-1 text-[11px] text-[#977e73]">
                            Select a department to start WhatsApp.
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full bg-[#e8f7ed] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#168447]">
                          3 contacts
                        </span>
                      </div>

                      <div className="space-y-2.5">
                        {CONTACTS.map((contact, index) => (
                          <motion.article
                            key={contact.id}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.07 }}
                            className="group rounded-xl border border-[#eadfd2] bg-white p-3 transition duration-300 hover:border-[#c9a24a] hover:shadow-[0_8px_24px_rgba(89,50,40,.08)] sm:p-4"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                                style={{
                                  backgroundColor: `${contact.color}12`,
                                  color: contact.color,
                                }}
                              >
                                <Phone size={17} />
                              </div>

                              <div className="min-w-0 flex-1">
                                <p className="text-[9px] font-semibold uppercase tracking-[.13em] text-[#977e73]">
                                  {contact.label}
                                </p>
                                <p className="mt-0.5 text-sm font-bold tracking-wide text-[#351216] sm:text-base">
                                  +91 {contact.number}
                                </p>
                                <p className="mt-0.5 text-[10px] leading-4 text-[#9a8b80] sm:text-[11px]">
                                  {contact.description}
                                </p>
                              </div>

                              <button
                                type="button"
                                onClick={() => handleChat(contact)}
                                aria-label={`Chat on WhatsApp with ${contact.number}`}
                                className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-2.5 text-[10px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#1DA851] hover:shadow-md active:scale-95 sm:px-4 sm:text-xs"
                              >
                                <FaWhatsapp size={15} />
                                <span>Chat</span>
                                <ArrowUpRight size={12} />
                              </button>
                            </div>
                          </motion.article>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-2 rounded-lg bg-[#f5efe7] px-3 py-2.5">
                      <ShieldCheck size={15} className="shrink-0 text-[#b18a2b]" />
                      <p className="text-center text-[10px] leading-4 text-[#977e73]">
                        You'll be redirected to WhatsApp to send your message.
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <footer className="flex shrink-0 items-center justify-center gap-2 border-t border-[#eadfd2] bg-[#fffdf9] px-4 py-3">
                    <span className="h-px w-6 bg-[#c9a24a]" />
                    <Sparkles size={12} className="text-[#c9a24a]" />
                    <span className="text-[9px] font-semibold uppercase tracking-[.28em] text-[#a18a79]">
                      Darsh Handlooms
                    </span>
                    <span className="h-px w-6 bg-[#c9a24a]" />
                  </footer>
                </motion.section>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}

      {/* Floating WhatsApp launcher */}
      <div className="fixed bottom-5 left-4 z-[99998] sm:bottom-6 sm:left-6">
        <motion.span
          aria-hidden="true"
          animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#25D366]"
        />

        <motion.button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.94 }}
          aria-label={open ? "Close WhatsApp chat" : "Open WhatsApp chat"}
          aria-expanded={open}
          className="relative flex h-13 w-13 items-center justify-center rounded-full   bg-[#25D366] text-white shadow-[0_10px_35px_rgba(37,211,102,.35)] transition hover:bg-[#1DA851] sm:h-14 sm:w-14"
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="close"
                initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
              >
                <FaTimes size={21} />
              </motion.span>
            ) : (
              <motion.span
                key="whatsapp"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
              >
                <FaWhatsapp size={27} />
              </motion.span>
            )}
          </AnimatePresence>

          {!open && (
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full border-2 border-white bg-[#168447]" />
          )}
        </motion.button>
      </div>
    </>
  );
};

export default WhatsAppChat;
