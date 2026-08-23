import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  ArrowRight,
  Facebook,
  Sparkles,
  Instagram,
  Youtube,
} from "lucide-react";


const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);


  /* =====================================================
     CONTACT INFORMATION
  ===================================================== */

  const contactDetails = [
    {
      icon: Mail,
      label: "EMAIL",
      value: "darshweb2004@gmail.com",
      href: "mailto:darshweb2004@gmail.com",
    },

    {
      icon: Phone,
      label: "PHONE",
      value: "+91 9883277103",
      href: "tel:+919883277103",
    },

    {
      icon: MapPin,
      label: "ADDRESS",
      value: "Patrasayer, Bankura Patrasayer, West Bengal 722206",
    },
  ];


  /* =====================================================
     FORM CHANGE
  ===================================================== */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };


  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      Replace this with your backend/API call later.
      For now, the enquiry is captured locally.
    */

    console.log("Darsh enquiry:", formData);

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };


  return (
    <main
      className="
        min-h-screen
        bg-[#f8f4eb]
        text-[#3f1616]
        overflow-hidden
      "
    >
      {/* =====================================================
          TOP INTRO
      ===================================================== */}

      <section
        className="
          relative
          border-b
          border-[#741522]/10
          py-16
          sm:py-20
          lg:py-24
        "
      >
        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -left-40
            -top-40
            w-[450px]
            h-[450px]
            rounded-full
            border
            border-[#d4ad54]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-40
            -bottom-40
            w-[450px]
            h-[450px]
            rounded-full
            border
            border-[#741522]/5
          "
        />

        <div
          className="
            relative
            z-10
            max-w-[1120px]
            mx-auto
            px-5
            sm:px-8
            lg:px-0
          "
        >
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1fr_1.05fr]
              gap-12
              lg:gap-20
            "
          >
            {/* =================================================
                LEFT CONTENT
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: -35,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                flex
                flex-col
                justify-center
              "
            >
              {/* Eyebrow */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  mb-6
                "
              >
                <span
                  className="
                    w-8
                    h-px
                    bg-[#d4ad54]
                  "
                />

                <span
                  className="
                    text-[8px]
                    sm:text-[9px]
                    tracking-[0.42em]
                    uppercase
                    text-[#977e73]
                  "
                >
                  SAY HELLO
                </span>
              </div>

              {/* Heading */}

              <h1
                className="
                  font-serif
                  font-normal
                  text-[#3f1616]
                  text-[43px]
                  sm:text-[53px]
                  md:text-[62px]
                  lg:text-[66px]
                  leading-[1.02]
                  tracking-[-0.03em]
                "
              >
                Talk to the
                <span
                  className="
                    block
                    italic
                    text-[#741522]
                  "
                >
                  Darsh studio.
                </span>
              </h1>

              {/* Divider */}

              <div
                className="
                  w-14
                  h-px
                  bg-[#d4ad54]
                  mt-7
                  mb-7
                "
              />

              {/* Description */}

              <p
                className="
                  max-w-[530px]
                  text-[11px]
                  sm:text-[12px]
                  md:text-[13px]
                  leading-6
                  text-[#806c63]
                "
              >
                Have a question about a saree, fabric, availability, styling or
                your order? Send us an enquiry and our team will get back to
                you.
              </p>

              {/* =================================================
                  CONTACT DETAILS
              ================================================= */}

              <div
                className="
                  mt-10
                  border-t
                  border-[#741522]/15
                "
              >
                {contactDetails.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      target={item.label === "ADDRESS" ? "_blank" : undefined}
                      rel={
                        item.label === "ADDRESS"
                          ? "noopener noreferrer"
                          : undefined
                      }
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        delay: 0.3 + index * 0.12,
                        duration: 0.6,
                      }}
                      className="
                          group
                          flex
                          items-center
                          gap-5
                          py-5
                          border-b
                          border-[#741522]/15
                        "
                    >
                      {/* Icon */}

                      <div
                        className="
                            w-10
                            h-10
                            shrink-0
                            border
                            border-[#d4ad54]/60
                            flex
                            items-center
                            justify-center
                            text-[#741522]
                            transition-all
                            duration-300
                            group-hover:bg-[#741522]
                            group-hover:text-[#d4ad54]
                          "
                      >
                        <Icon size={16} strokeWidth={1.2} />
                      </div>

                      {/* Text */}

                      <div className="min-w-0">
                        <p
                          className="
                              text-[7px]
                              tracking-[0.3em]
                              uppercase
                              text-[#977e73]
                              mb-1
                            "
                        >
                          {item.label}
                        </p>

                        <p
                          className="
                              text-[11px]
                              sm:text-[12px]
                              text-[#3f1616]
                              break-words
                              group-hover:text-[#741522]
                              transition-colors
                            "
                        >
                          {item.value}
                        </p>
                      </div>

                      <ArrowRight
                        size={13}
                        strokeWidth={1}
                        className="
                            ml-auto
                            shrink-0
                            text-[#d4ad54]
                            opacity-0
                            -translate-x-2
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all
                          "
                      />
                    </motion.a>
                  );
                })}
              </div>

              {/* =================================================
                  SOCIAL
              ================================================= */}

              <div className="flex  mt-7 items-center gap-3">
                <span
                  className="
      text-[7px]
      tracking-[0.3em]
      uppercase
      text-[#977e73]
      mr-1
    "
                >
                  FOLLOW DARSH
                </span>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/Darshpage"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Darsh Facebook"
                  className="
      w-9 h-9
      border border-[#741522]/25
      flex items-center justify-center
      text-[#741522]
      transition-all duration-300
      hover:bg-[#741522]
      hover:text-[#f8f4eb]
    "
                >
                  <Facebook size={15} strokeWidth={1.2} />
                </a>

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/darsh_bysathi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Darsh Instagram"
                  className="
      w-9 h-9
      border border-[#741522]/25
      flex items-center justify-center
      text-[#741522]
      transition-all duration-300
      hover:bg-[#741522]
      hover:text-[#f8f4eb]
    "
                >
                  <Instagram size={15} strokeWidth={1.2} />
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@darsh7901?si=6uplC1BKqxBEYZbt"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Darsh YouTube"
                  className="
      w-9 h-9
      border border-[#741522]/25
      flex items-center justify-center
      text-[#741522]
      transition-all duration-300
      hover:bg-[#741522]
      hover:text-[#f8f4eb]
    "
                >
                  <Youtube size={15} strokeWidth={1.2} />
                </a>
              </div>
            </motion.div>

            {/* =================================================
                FORM
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                x: 35,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.9,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className="
                  relative
                  bg-[#fbf8f2]
                  border
                  border-[#741522]/15
                  p-6
                  sm:p-8
                  lg:p-10
                "
              >
                {/* Gold corner */}

                <div
                  className="
                    absolute
                    top-0
                    right-0
                    w-20
                    h-20
                    border-t
                    border-r
                    border-[#d4ad54]
                    pointer-events-none
                  "
                />

                <div
                  className="
                    absolute
                    bottom-0
                    left-0
                    w-20
                    h-20
                    border-b
                    border-l
                    border-[#d4ad54]/50
                    pointer-events-none
                  "
                />

                {/* Form header */}

                <div className="mb-8">
                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      mb-4
                    "
                  >
                    <Sparkles
                      size={15}
                      strokeWidth={1}
                      className="
                        text-[#d4ad54]
                      "
                    />

                    <span
                      className="
                        text-[7px]
                        tracking-[0.32em]
                        uppercase
                        text-[#977e73]
                      "
                    >
                      CONTACT DARSH
                    </span>
                  </div>

                  <h2
                    className="
                      font-serif
                      font-normal
                      text-[29px]
                      sm:text-[34px]
                      text-[#3f1616]
                    "
                  >
                    Send an enquiry
                  </h2>

                  <p
                    className="
                      text-[10px]
                      sm:text-[11px]
                      text-[#806c63]
                      mt-3
                      leading-5
                    "
                  >
                    Tell us what you're looking for and we'll be happy to help.
                  </p>
                </div>

                {/* =================================================
                    FORM
                ================================================= */}

                <form
                  onSubmit={handleSubmit}
                  className="
                    space-y-6
                  "
                >
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="name"
                      className="
                        block
                        text-[7px]
                        tracking-[0.32em]
                        uppercase
                        text-[#806c63]
                        mb-2
                      "
                    >
                      NAME
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                      className="
                        w-full
                        h-12
                        px-4
                        bg-transparent
                        border
                        border-[#741522]/15
                        outline-none
                        text-[12px]
                        text-[#3f1616]
                        placeholder:text-[#a99a91]
                        focus:border-[#741522]
                        transition-colors
                      "
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="email"
                      className="
                        block
                        text-[7px]
                        tracking-[0.32em]
                        uppercase
                        text-[#806c63]
                        mb-2
                      "
                    >
                      EMAIL
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      className="
                        w-full
                        h-12
                        px-4
                        bg-transparent
                        border
                        border-[#741522]/15
                        outline-none
                        text-[12px]
                        text-[#3f1616]
                        placeholder:text-[#a99a91]
                        focus:border-[#741522]
                        transition-colors
                      "
                    />
                  </div>

                  {/* Message */}

                  <div>
                    <label
                      htmlFor="message"
                      className="
                        block
                        text-[7px]
                        tracking-[0.32em]
                        uppercase
                        text-[#806c63]
                        mb-2
                      "
                    >
                      MESSAGE
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us how we can help..."
                      required
                      rows={6}
                      className="
                        w-full
                        px-4
                        py-3
                        bg-transparent
                        border
                        border-[#741522]/15
                        outline-none
                        resize-none
                        text-[12px]
                        leading-5
                        text-[#3f1616]
                        placeholder:text-[#a99a91]
                        focus:border-[#741522]
                        transition-colors
                      "
                    />
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="
                      group
                      w-full
                      h-12
                      flex
                      items-center
                      justify-center
                      gap-3
                      bg-[#741522]
                      text-[#f8f4eb]
                      text-[8px]
                      tracking-[0.3em]
                      uppercase
                      transition-all
                      duration-400
                      hover:bg-[#d4ad54]
                      hover:text-[#4b1519]
                    "
                  >
                    {submitted ? "ENQUIRY RECEIVED" : "SEND ENQUIRY"}

                    <Send
                      size={14}
                      strokeWidth={1.2}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                  {/* Success */}

                  {submitted && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="
                        text-center
                        text-[9px]
                        text-[#741522]
                      "
                    >
                      Thank you. Your enquiry has been received.
                    </motion.p>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          SERVICE STRIP
      ===================================================== */}

      <section
        className="
          bg-[#eee5d6]
          border-y
          border-[#741522]/10
          py-12
          sm:py-14
        "
      >
        <div
          className="
            max-w-[1000px]
            mx-auto
            px-5
            sm:px-8
          "
        >
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
              divide-y
              sm:divide-y-0
              sm:divide-x
              divide-[#741522]/15
            "
          >
            <ContactFeature
              number="01"
              title="Need help choosing?"
              text="Tell us what kind of saree or weave you're looking for."
            />

            <ContactFeature
              number="02"
              title="Have an order question?"
              text="Send your enquiry with your order details and we'll help."
            />

            <ContactFeature
              number="03"
              title="Follow our collections"
              text="Discover new arrivals and saree inspiration on Darsh."
            />
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        className="
          bg-[#741522]
          text-center
          py-16
          sm:py-20
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >
          <p
            className="
              text-[8px]
              tracking-[0.4em]
              uppercase
              text-[#d9bd78]
              mb-4
            "
          >
            DARSH
          </p>

          <h2
            className="
              font-serif
              italic
              text-[#f8f4eb]
              text-[32px]
              sm:text-[43px]
            "
          >
            Let's talk about your next saree.
          </h2>

          <a
            href="tel:+919883277103"
            className="
              group
              inline-flex
              items-center
              gap-3
              mt-7
              border
              border-[#d4ad54]
              text-[#d9bd78]
              px-7
              py-3.5
              text-[8px]
              tracking-[0.28em]
              uppercase
              transition-all
              duration-300
              hover:bg-[#d4ad54]
              hover:text-[#741522]
            "
          >
            Call Darsh
            <Phone
              size={14}
              strokeWidth={1.2}
              className="
                transition-transform
                group-hover:scale-110
              "
            />
          </a>
        </motion.div>
      </section>

      {/* =====================================================
          REDUCED MOTION
      ===================================================== */}

      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </main>
  );
};


/* =========================================================
   FEATURE COMPONENT
========================================================= */

const ContactFeature = ({
  number,
  title,
  text,
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        px-5
        sm:px-8
        py-6
        sm:py-3
        text-center
      "
    >

      <span
        className="
          text-[7px]
          tracking-[0.25em]
          text-[#a18b80]
        "
      >
        {number}
      </span>

      <h3
        className="
          font-serif
          text-[18px]
          sm:text-[19px]
          text-[#3f1616]
          mt-3
        "
      >
        {title}
      </h3>

      <p
        className="
          max-w-[230px]
          mx-auto
          mt-2
          text-[9px]
          sm:text-[10px]
          leading-5
          text-[#806c63]
        "
      >
        {text}
      </p>

    </motion.div>
  );
};


export default ContactUs;