import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Lock,
  RefreshCcw,
  Mail,
  Share2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Information We Collect",
      icon: <Database />,
      content: [
        {
          label: "Personal Information",
          text:
            "We collect personal details such as your name, email address, shipping address, phone number, and payment information when you make a purchase, create an account, or contact us.",
        },
        {
          label: "Non-Personal Information",
          text:
            "We may collect non-personal data such as browser type, operating system, and browsing behavior to improve our website and services.",
        },
      ],
    },
    {
      title: "How We Use Your Information",
      icon: <ShieldCheck />,
      content: [
        {
          label: "To Process Orders",
          text:
            "We use your personal information to process and fulfill your orders.",
        },
        {
          label: "To Communicate",
          text:
            "We use your contact information to send you updates about your order, respond to inquiries, and send promotional materials if you have opted in.",
        },
        {
          label: "To Improve Our Services",
          text:
            "We analyze non-personal information to understand user behavior and enhance our website's performance.",
        },
      ],
    },
    {
      title: "Information Sharing",
      icon: <Share2 />,
      content: [
        {
          label: "Third-Party Service Providers",
          text:
            "We may share your information with third-party service providers who assist us in operating our website, processing payments, and delivering orders.",
        },
        {
          label: "Legal Requirements",
          text:
            "We may disclose your information if required by law or to protect our rights.",
        },
      ],
    },
    {
      title: "Data Security",
      icon: <Lock />,
      content: [
        {
          label: "Protecting Your Information",
          text:
            "We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.",
        },
      ],
    },
    {
      title: "Your Rights",
      icon: <CheckCircle2 />,
      content: [
        {
          label: "Access and Correction",
          text:
            "You have the right to access and correct your personal information. You can update your account details through our website.",
        },
        {
          label: "Opt-Out",
          text:
            "You can opt-out of receiving promotional emails by following the unsubscribe instructions in the emails.",
        },
      ],
    },
    {
      title: "Changes to This Policy",
      icon: <RefreshCcw />,
      content: [
        {
          label: "Policy Updates",
          text:
            "We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the revised date will be indicated at the top of the policy.",
        },
      ],
    },
  ];

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

        {/* Decorative background glow */}

        <div
          className="
            pointer-events-none
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[380px]
            h-[220px]
            sm:w-[520px]
            sm:h-[280px]
            rounded-full
            bg-[#c9a24a]/10
            blur-3xl
          "
        />

        <motion.div
          animate={{
            rotate: [0, 45, 90, 45, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            top-16
            left-8
            hidden
            lg:block
            w-20
            h-20
            border
            border-[#c9a24a]/15
          "
        />

        <motion.div
          animate={{
            rotate: [0, -35, -70, -35, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            top-24
            right-10
            hidden
            lg:block
            w-24
            h-24
            border
            border-[#76131d]/10
            rounded-full
          "
        />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Small label */}

          <motion.p
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
              text-[9px]
              sm:text-[10px]
              tracking-[0.4em]
              uppercase
              text-[#977e73]
              mb-3
            "
          >
            Darsh · Your Privacy Matters
          </motion.p>

          {/* Gold divider */}

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.7 }}
            className="
              flex
              items-center
              justify-center
              gap-3
              mb-5
            "
          >
            <span className="w-10 sm:w-16 h-px bg-[#c9a24a]" />

            <Sparkles
              className="w-4 h-4 text-[#c9a24a]"
              strokeWidth={1.3}
            />

            <span className="w-10 sm:w-16 h-px bg-[#c9a24a]" />
          </motion.div>

          {/* Heading */}

          <motion.h1
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1,
            }}
            className="
              font-serif
              text-4xl
              sm:text-5xl
              md:text-6xl
              leading-tight
              text-[#351216]
            "
          >
            Privacy Policy
          </motion.h1>

          {/* Intro */}

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
              delay: 0.25,
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
            Your trust is important to us. This policy explains how
            we collect, use, protect, and manage your information
            when you use our website and services.
          </motion.p>

        </div>
      </section>

      {/* =====================================================
          OWNER INFORMATION
      ===================================================== */}

      <section className="px-4 pb-8">

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
            duration: 0.6,
            delay: 0.35,
          }}
          className="
            max-w-4xl
            mx-auto
            bg-[#5d0e16]
            px-5
            py-5
            sm:px-8
            sm:py-6
            shadow-[0_15px_40px_rgba(89,50,40,0.12)]
            relative
            overflow-hidden
          "
        >

          {/* Decorative circle */}

          <div
            className="
              absolute
              -right-12
              -top-12
              w-32
              h-32
              rounded-full
              border
              border-[#c9a24a]/20
            "
          />

          <div
            className="
              relative
              flex
              flex-col
              sm:flex-row
              items-center
              justify-center
              gap-3
              text-center
            "
          >

            <ShieldCheck
              className="w-6 h-6 text-[#c9a24a]"
              strokeWidth={1.4}
            />

            <p className="text-sm sm:text-base text-[#f8f3e9]">
              This website is Owned & Operated by{" "}
              <span className="font-semibold text-[#e0bd69]">
                DARSH
              </span>
            </p>

          </div>
        </motion.div>

      </section>

      {/* =====================================================
          POLICY CARDS
      ===================================================== */}

      <section className="px-4 pb-16 sm:pb-20">

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.08,
          }}
          className="
            max-w-5xl
            mx-auto
            grid
            grid-cols-1
            md:grid-cols-2
            gap-5
            sm:gap-6
          "
        >

          {sections.map((section, index) => (
            <motion.article
              key={section.title}
              variants={cardVariants}
              whileHover={{
                y: -5,
              }}
              className="
                group
                relative
                overflow-hidden
                bg-[#fcfaf5]
                border
                border-[#dfd2c1]
                shadow-[0_10px_30px_rgba(89,50,40,0.055)]
                hover:shadow-[0_18px_42px_rgba(89,50,40,0.12)]
                transition-shadow
                duration-300
              "
            >

              {/* Top animated line */}

              <div
                className="
                  absolute
                  top-0
                  left-0
                  right-0
                  h-[2px]
                  bg-[#c9a24a]
                  origin-left
                  scale-x-0
                  group-hover:scale-x-100
                  transition-transform
                  duration-500
                "
              />

              <div className="p-5 sm:p-7">

                {/* Header */}

                <div className="flex items-center gap-4">

                  <motion.div
                    whileHover={{
                      scale: 1.08,
                      rotate: 4,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="
                      shrink-0
                      w-12
                      h-12
                      sm:w-14
                      sm:h-14
                      flex
                      items-center
                      justify-center
                      bg-[#f5eedf]
                      border
                      border-[#d8c59a]
                      text-[#76131d]
                    "
                  >
                    {React.cloneElement(section.icon, {
                      className: "w-6 h-6 sm:w-7 sm:h-7",
                      strokeWidth: 1.4,
                    })}
                  </motion.div>

                  <div className="min-w-0">

                    <p
                      className="
                        text-[8px]
                        tracking-[0.22em]
                        uppercase
                        text-[#a58f82]
                        mb-1
                      "
                    >
                      Privacy & Security
                    </p>

                    <h2
                      className="
                        font-serif
                        text-xl
                        sm:text-2xl
                        text-[#351216]
                        group-hover:text-[#76131d]
                        transition-colors
                        duration-300
                      "
                    >
                      {section.title}
                    </h2>

                  </div>

                </div>

                {/* Divider */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    mb-5
                  "
                >
                  <span className="w-8 h-px bg-[#c9a24a]" />
                  <span className="w-1 h-1 rounded-full bg-[#c9a24a]" />
                  <span className="flex-1 h-px bg-[#e8dfd3]" />
                </div>

                {/* Content */}

                <div className="space-y-5">

                  {section.content.map((item, itemIndex) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: -8,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.4,
                        delay: itemIndex * 0.08,
                      }}
                    >

                      <div className="flex items-start gap-2">

                        <ChevronRight
                          className="
                            shrink-0
                            w-4
                            h-4
                            mt-1
                            text-[#c9a24a]
                          "
                          strokeWidth={2}
                        />

                        <div>

                          <h3
                            className="
                              text-sm
                              sm:text-[15px]
                              font-semibold
                              text-[#5d0e16]
                            "
                          >
                            {item.label}
                          </h3>

                          <p
                            className="
                              mt-1.5
                              text-sm
                              text-[#765c52]
                              leading-6
                            "
                          >
                            {item.text}
                          </p>

                        </div>

                      </div>

                    </motion.div>
                  ))}

                </div>

              </div>

            </motion.article>
          ))}

        </motion.div>

      </section>

      {/* =====================================================
          CONTACT / FOOTER CTA
      ===================================================== */}

      <section className="px-4 pb-14">

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.6,
          }}
          className="
            max-w-5xl
            mx-auto
            bg-[#f1e7d8]
            border
            border-[#d9c7ae]
            px-5
            py-8
            sm:px-10
            sm:py-10
            text-center
            relative
            overflow-hidden
          "
        >

          <div
            className="
              absolute
              -top-20
              -right-20
              w-40
              h-40
              rounded-full
              border
              border-[#c9a24a]/20
            "
          />

          <Mail
            className="
              w-7
              h-7
              mx-auto
              text-[#76131d]
            "
            strokeWidth={1.4}
          />

          <p
            className="
              mt-4
              text-[9px]
              tracking-[0.3em]
              uppercase
              text-[#977e73]
            "
          >
            Privacy Questions
          </p>

          <h2
            className="
              mt-2
              font-serif
              text-2xl
              sm:text-3xl
              text-[#351216]
            "
          >
            We're here to help
          </h2>

          <p
            className="
              max-w-xl
              mx-auto
              mt-3
              text-sm
              text-[#765c52]
              leading-6
            "
          >
            If you have questions about this Privacy Policy
            or how your information is handled, please contact
            our support team.
          </p>

          <div
            className="
              flex
              items-center
              justify-center
              gap-3
              mt-5
            "
          >
            <span className="w-8 sm:w-12 h-px bg-[#c9a24a]" />

            <span
              className="
                text-[8px]
                tracking-[0.25em]
                uppercase
                text-[#76131d]
              "
            >
              Darsh
            </span>

            <span className="w-8 sm:w-12 h-px bg-[#c9a24a]" />
          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default PrivacyPolicy;

