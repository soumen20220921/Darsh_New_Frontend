import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Info,
  Link2,
  AlertTriangle,
  Scale,
  Mail,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const Disclaimer = () => {
  const sections = [
    {
      number: "01",
      title: "General Information",
      icon: Info,
      content:
        "The information contained on this website is provided for general information purposes only. Darsh endeavors to keep the information accurate and up to date; however, we make no representations or warranties of any kind regarding the completeness, accuracy, reliability, suitability, or availability of the information presented on the website.",
      accent: "maroon",
    },

    {
      number: "02",
      title: "Product Descriptions",
      icon: Shield,
      content:
        "Darsh attempts to describe our products as accurately as possible. However, product descriptions, specifications, colours, pricing, availability, photographs, and other website content may occasionally contain errors or variations. Actual product colours may also differ slightly depending on your device display and photography conditions.",
      accent: "gold",
    },

    {
      number: "03",
      title: "External Links",
      icon: Link2,
      content:
        "Our website may contain links to third-party websites or services that are not owned or controlled by Darsh. These links are provided for convenience and do not necessarily imply endorsement, sponsorship, or recommendation. We are not responsible for the content, availability, privacy practices, or policies of third-party websites.",
      accent: "maroon",
    },

    {
      number: "04",
      title: "Limitation of Liability",
      icon: AlertTriangle,
      content:
        "Darsh will not be liable for damages arising from the use of, or inability to use, this website or its content, including direct, indirect, incidental, punitive, special, or consequential damages, to the extent permitted under applicable law.",
      accent: "gold",
    },

    {
      number: "05",
      title: "Legal Compliance",
      icon: Scale,
      content:
        "Darsh is committed to operating in accordance with applicable Indian laws and regulations relevant to e-commerce, consumer protection, product sales, payment processing, and data privacy. Policies and practices may be updated from time to time to reflect applicable legal or operational requirements.",
      accent: "maroon",
    },

    {
      number: "06",
      title: "Contact Information",
      icon: Mail,
      content:
        "If you have any questions regarding this disclaimer or our website practices, please contact our support team. We will be happy to assist you with your concerns.",
      accent: "gold",
      contact: true,
    },
  ];

  /* -------------------------------------------------------
     Animation
  ------------------------------------------------------- */

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#f8f3e9] text-[#351216] overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pt-12 pb-10 sm:pt-16 sm:pb-14">

        {/* Background glow */}

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[260px] bg-[#c9a24a]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="absolute top-10 left-10 w-20 h-20 border border-[#c9a24a]/10 rotate-45 hidden lg:block" />

        <div className="absolute top-20 right-12 w-16 h-16 border border-[#76131d]/10 rotate-12 hidden lg:block" />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Brand label */}

          <motion.p
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="
              text-[9px]
              sm:text-[10px]
              tracking-[0.4em]
              uppercase
              text-[#977e73]
              mb-3
            "
          >
            Darsh · Website Information
          </motion.p>

          {/* Decorative divider */}

          <motion.div
            initial={{
              opacity: 0,
              scaleX: 0,
            }}
            animate={{
              opacity: 1,
              scaleX: 1,
            }}
            transition={{
              duration: 0.7,
            }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="w-12 sm:w-16 h-px bg-[#c9a24a]" />

            <span className="text-[#c9a24a] text-sm">
              ✦
            </span>

            <span className="w-12 sm:w-16 h-px bg-[#c9a24a]" />
          </motion.div>

          {/* Title */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
            }}
            className="
              font-serif
              text-4xl
              sm:text-5xl
              md:text-6xl
              text-[#351216]
              leading-tight
            "
          >
            Disclaimer
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.3,
            }}
            className="
              max-w-2xl
              mx-auto
              mt-5
              text-sm
              sm:text-base
              text-[#765c52]
              leading-7
            "
          >
            Please read the following information carefully to
            understand the nature and limitations of the information
            provided through the Darsh website.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          NOTICE
      ===================================================== */}

      <section className="px-4 pb-8">
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
            amount: 0.2,
          }}
          className="
            relative
            max-w-5xl
            mx-auto
            overflow-hidden
            bg-[#fcfaf5]
            border
            border-[#dfd2c1]
            shadow-[0_15px_45px_rgba(89,50,40,0.07)]
          "
        >
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c9a24a]" />

          <div className="flex items-start gap-4 p-5 sm:p-6">

            <div className="
              flex-shrink-0
              w-11
              h-11
              flex
              items-center
              justify-center
              bg-[#f5eedf]
              border
              border-[#d8c59a]
            ">
              <Shield
                className="w-5 h-5 text-[#9a741d]"
                strokeWidth={1.4}
              />
            </div>

            <div>
              <p className="
                text-[9px]
                tracking-[0.25em]
                uppercase
                text-[#9a741d]
                mb-1
              ">
                Please note
              </p>

              <h2 className="
                font-serif
                text-lg
                sm:text-xl
                text-[#5d0e16]
              ">
                Information may change over time
              </h2>

              <p className="
                text-xs
                sm:text-sm
                text-[#765c52]
                leading-6
                mt-2
              ">
                Product information, pricing, availability, policies,
                and website content may be updated when necessary.
                Please refer to the latest information available on
                the website.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          DISCLAIMER CARDS
      ===================================================== */}

      <section className="px-4 pb-14 sm:pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
          "
        >
          {sections.map((section) => {
            const Icon = section.icon;
            const isGold = section.accent === "gold";

            return (
              <motion.article
                key={section.number}
                variants={cardVariants}
                whileHover={{
                  y: -4,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-[#fcfaf5]
                  border
                  border-[#dfd2c1]
                  shadow-[0_12px_35px_rgba(89,50,40,0.06)]
                  hover:shadow-[0_20px_45px_rgba(89,50,40,0.11)]
                  transition-shadow
                  duration-300
                "
              >
                {/* Side accent */}

                <div
                  className={`
                    absolute
                    top-0
                    bottom-0
                    left-0
                    w-[3px]
                    ${
                      isGold
                        ? "bg-[#c9a24a]"
                        : "bg-[#76131d]"
                    }
                  `}
                />

                <div className="p-5 sm:p-7">

                  {/* Header */}

                  <div className="flex items-center gap-4">

                    {/* Number */}

                    <div
                      className={`
                        flex-shrink-0
                        w-11
                        h-11
                        sm:w-12
                        sm:h-12
                        flex
                        items-center
                        justify-center
                        border
                        ${
                          isGold
                            ? "bg-[#f5eedf] border-[#d8c59a]"
                            : "bg-[#f6e8e5] border-[#d9b9b5]"
                        }
                      `}
                    >
                      <span
                        className={`
                          text-xs
                          sm:text-sm
                          font-semibold
                          tracking-widest
                          ${
                            isGold
                              ? "text-[#9a741d]"
                              : "text-[#76131d]"
                          }
                        `}
                      >
                        {section.number}
                      </span>
                    </div>

                    {/* Icon */}

                    <div
                      className={`
                        w-10
                        h-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        ${
                          isGold
                            ? "text-[#9a741d]"
                            : "text-[#76131d]"
                        }
                      `}
                    >
                      <Icon
                        className="w-6 h-6"
                        strokeWidth={1.25}
                      />
                    </div>

                    {/* Heading */}

                    <div className="flex-1 min-w-0">

                      <p className="
                        text-[8px]
                        tracking-[0.25em]
                        uppercase
                        text-[#a58f82]
                        mb-1
                      ">
                        Information
                      </p>

                      <h2 className="
                        font-serif
                        text-lg
                        sm:text-xl
                        text-[#351216]
                      ">
                        {section.title}
                      </h2>
                    </div>

                    <ChevronRight
                      className="
                        hidden
                        sm:block
                        w-5
                        h-5
                        text-[#c9a24a]/50
                        group-hover:translate-x-1
                        transition-transform
                      "
                    />
                  </div>

                  {/* Divider */}

                  <div className="
                    flex
                    items-center
                    gap-3
                    mt-5
                    mb-5
                  ">
                    <span
                      className={`
                        w-8
                        h-px
                        ${
                          isGold
                            ? "bg-[#c9a24a]"
                            : "bg-[#76131d]"
                        }
                      `}
                    />

                    <span className="w-1 h-1 rounded-full bg-[#c9a24a]" />

                    <span className="flex-1 h-px bg-[#e8dfd3]" />
                  </div>

                  {/* Content */}

                  <p className="
                    text-sm
                    sm:text-[15px]
                    text-[#765c52]
                    leading-7
                  ">
                    {section.content}
                  </p>

                  {/* Contact */}

                  {section.contact && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">

                      <a
                        href="mailto:darshweb2004@gmail.com"
                        className="
                          flex
                          items-center
                          gap-3
                          p-3.5
                          bg-[#f8f0e4]
                          border
                          border-[#e5d8c8]
                          hover:border-[#c9a24a]
                          transition-colors
                        "
                      >
                        <Mail
                          className="w-4 h-4 text-[#9a741d]"
                          strokeWidth={1.5}
                        />

                        <div>
                          <p className="
                            text-[8px]
                            tracking-[0.2em]
                            uppercase
                            text-[#a58f82]
                          ">
                            Email
                          </p>

                          <p className="
                            text-xs
                            text-[#5d0e16]
                            mt-1
                            break-all
                          ">
                           darshweb2004@gmail.com
                          </p>
                        </div>
                      </a>

                      <a
                        href="tel:+919883277103"
                        className="
                          flex
                          items-center
                          gap-3
                          p-3.5
                          bg-[#f8f0e4]
                          border
                          border-[#e5d8c8]
                          hover:border-[#c9a24a]
                          transition-colors
                        "
                      >
                        <Mail
                          className="w-4 h-4 text-[#9a741d]"
                          strokeWidth={1.5}
                        />

                        <div>
                          <p className="
                            text-[8px]
                            tracking-[0.2em]
                            uppercase
                            text-[#a58f82]
                          ">
                            Phone
                          </p>

                          <p className="
                            text-xs
                            text-[#5d0e16]
                            mt-1
                          ">
                            +91 9883277103
                          </p>
                        </div>
                      </a>
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </section>

      {/* =====================================================
          BOTTOM LEGAL NOTE
      ===================================================== */}

      <section className="px-4 pb-12">
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
          className="
            max-w-5xl
            mx-auto
            border-t
            border-[#dfd2c1]
            pt-7
            text-center
          "
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#c9a24a]" />

            <CheckCircle2
              className="w-4 h-4 text-[#c9a24a]"
              strokeWidth={1.3}
            />

            <span className="w-8 h-px bg-[#c9a24a]" />
          </div>

          <p className="
            text-[9px]
            tracking-[0.3em]
            uppercase
            text-[#b09b8c]
          ">
            Darsh Handlooms
          </p>

          <p className="
            text-xs
            text-[#977e73]
            mt-2
          ">
            Thank you for visiting our website.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default Disclaimer;