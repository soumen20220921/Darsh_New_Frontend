import React from "react";
import { motion } from "framer-motion";

import {
  BsBank2,
  BsQrCodeScan,
} from "react-icons/bs";

import { IoMdWallet } from "react-icons/io";

import {
  SiPaytm,
  SiPhonepe,
} from "react-icons/si";

import {
  FaGooglePay,
  FaCcAmazonPay,
} from "react-icons/fa6";

import { IoCardOutline } from "react-icons/io5";

import {
  ShieldCheck,
  LockKeyhole,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from "lucide-react";

const PaymentOptions = () => {
  const paymentMethods = [
    {
      icon: <IoCardOutline />,
      title: "Credit / Debit Cards",
      description:
        "Pay securely using major debit and credit cards.",
    },
  {
      icon: <BsQrCodeScan />,
      title: "UPI Payments",
      description:
        "Make quick and convenient payments through UPI.",
    },
    {
      icon: <BsBank2 />,
      title: "Net Banking",
      description:
        "Pay directly from your preferred bank account.",
    },
    {
      icon: <IoMdWallet />,
      title: "Digital Wallets",
      description:
        "Use supported digital wallets for a convenient checkout.",
    },
    {
      icon: <SiPhonepe />,
      title: "PhonePe",
      description:
        "Complete your purchase quickly through PhonePe.",
    },
    {
      icon: <SiPaytm />,
      title: "Paytm",
      description:
        "Enjoy a simple and convenient Paytm payment experience.",
    },
    {
      icon: <FaGooglePay />,
      title: "Google Pay",
      description:
        "Make fast and convenient UPI payments with Google Pay.",
    },
    {
      icon: <FaCcAmazonPay />,
      title: "Amazon Pay",
      description:
        "Pay conveniently using your Amazon Pay balance.",
    },
  ];

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
    },

    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      },
    }),
  };

  return (
    <main className="min-h-screen bg-[#f8f3e9] text-[#351216] overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pt-12 pb-10 sm:pt-16 sm:pb-14">

        {/* Background glow */}

        <div
          className="
            pointer-events-none
            absolute
            top-0
            left-1/2
            -translate-x-1/2
            w-[420px]
            h-[220px]
            sm:w-[520px]
            sm:h-[260px]
            rounded-full
            bg-[#c9a24a]/10
            blur-3xl
          "
        />

        {/* Decorative square */}

        <div
          className="
            pointer-events-none
            absolute
            top-20
            left-8
            hidden
            lg:block
            w-16
            h-16
            border
            border-[#c9a24a]/10
            rotate-45
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            top-28
            right-10
            hidden
            lg:block
            w-20
            h-20
            border
            border-[#76131d]/10
            rotate-12
          "
        />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Small label */}

          <motion.p
            initial={{ opacity: 0, y: -10 }}
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
            Darsh · Secure Checkout
          </motion.p>

          {/* Decorative divider */}

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

          {/* Main heading */}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            Payment Options
          </motion.h1>

          {/* Subtitle */}

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
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
            Choose from multiple convenient payment methods
            for a simple and reliable shopping experience.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          SECURITY INFORMATION
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
            max-w-5xl
            mx-auto
            bg-[#fcfaf5]
            border
            border-[#dfd2c1]
            shadow-[0_12px_35px_rgba(89,50,40,0.07)]
          "
        >

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-3
            "
          >

            {/* Secure */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                p-4
                border-b
                sm:border-b-0
                sm:border-r
                border-[#e5dbce]
              "
            >
              <div
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  bg-[#f5eedf]
                  border
                  border-[#d8c59a]
                "
              >
                <LockKeyhole
                  className="w-4 h-4 text-[#9a741d]"
                  strokeWidth={1.4}
                />
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    tracking-[0.2em]
                    uppercase
                    text-[#a58f82]
                  "
                >
                  Secure
                </p>

                <p
                  className="
                    text-xs
                    font-medium
                    text-[#5d0e16]
                  "
                >
                  Protected Checkout
                </p>
              </div>
            </div>

            {/* Payment */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                p-4
                border-b
                sm:border-b-0
                sm:border-r
                border-[#e5dbce]
              "
            >
              <div
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  bg-[#f6e8e5]
                  border
                  border-[#d9b9b5]
                "
              >
                <CheckCircle2
                  className="w-4 h-4 text-[#76131d]"
                  strokeWidth={1.4}
                />
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    tracking-[0.2em]
                    uppercase
                    text-[#a58f82]
                  "
                >
                  Payment
                </p>

                <p
                  className="
                    text-xs
                    font-medium
                    text-[#5d0e16]
                  "
                >
                  Multiple Methods
                </p>
              </div>
            </div>

            {/* Experience */}

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                p-4
              "
            >
              <div
                className="
                  w-9
                  h-9
                  flex
                  items-center
                  justify-center
                  bg-[#f5eedf]
                  border
                  border-[#d8c59a]
                "
              >
                <ShieldCheck
                  className="w-4 h-4 text-[#9a741d]"
                  strokeWidth={1.4}
                />
              </div>

              <div>
                <p
                  className="
                    text-[8px]
                    tracking-[0.2em]
                    uppercase
                    text-[#a58f82]
                  "
                >
                  Experience
                </p>

                <p
                  className="
                    text-xs
                    font-medium
                    text-[#5d0e16]
                  "
                >
                  Simple & Reliable
                </p>
              </div>
            </div>

          </div>
        </motion.div>
      </section>

      {/* =====================================================
          PAYMENT METHOD CARDS
      ===================================================== */}

      <section className="px-4 pb-16 sm:pb-20">

        <motion.div
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
            sm:grid-cols-2
            lg:grid-cols-3
            gap-5
          "
        >

          {paymentMethods.map((method, index) => (
            <motion.article
              key={method.title}
              custom={index}
              variants={cardVariants}
              whileHover={{
                y: -6,
              }}
              className="
                group
                relative
                overflow-hidden
                bg-[#fcfaf5]
                border
                border-[#dfd2c1]
                shadow-[0_10px_30px_rgba(89,50,40,0.055)]
                hover:shadow-[0_20px_45px_rgba(89,50,40,0.12)]
                transition-shadow
                duration-300
              "
            >

              {/* Animated top line */}

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

              <div className="p-5 sm:p-6">

                {/* Icon row */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    mb-5
                  "
                >
                  <motion.div
                    whileHover={{
                      rotate: 5,
                      scale: 1.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 15,
                    }}
                    className="
                      w-14
                      h-14
                      flex
                      items-center
                      justify-center
                      bg-[#f5eedf]
                      border
                      border-[#d8c59a]
                      text-[#76131d]
                      text-2xl
                    "
                  >
                    {method.icon}
                  </motion.div>

                  <ChevronRight
                    className="
                      w-5
                      h-5
                      text-[#c9a24a]/50
                      group-hover:translate-x-1
                      transition-transform
                      duration-300
                    "
                  />
                </div>

                {/* Label */}

                <p
                  className="
                    text-[8px]
                    tracking-[0.25em]
                    uppercase
                    text-[#a58f82]
                    mb-1
                  "
                >
                  Payment Method
                </p>

                {/* Title */}

                <h2
                  className="
                    font-serif
                    text-xl
                    sm:text-[22px]
                    text-[#351216]
                    group-hover:text-[#76131d]
                    transition-colors
                    duration-300
                  "
                >
                  {method.title}
                </h2>

                {/* Divider */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-4
                    mb-4
                  "
                >
                  <span className="w-6 h-px bg-[#c9a24a]" />

                  <span className="w-1 h-1 rounded-full bg-[#c9a24a]" />

                  <span className="flex-1 h-px bg-[#e8dfd3]" />
                </div>

                {/* Description */}

                <p
                  className="
                    text-sm
                    text-[#765c52]
                    leading-6
                  "
                >
                  {method.description}
                </p>

                {/* Status */}

                <div
                  className="
                    flex
                    items-center
                    gap-2
                    mt-5
                    pt-4
                    border-t
                    border-[#ebe2d8]
                  "
                >
                  <motion.span
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="
                      w-1.5
                      h-1.5
                      rounded-full
                      bg-[#9a741d]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      tracking-[0.15em]
                      uppercase
                      text-[#977e73]
                    "
                  >
                    Available at checkout
                  </span>
                </div>

              </div>
            </motion.article>
          ))}

        </motion.div>
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}

      <section className="px-4 pb-12">

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
            relative
            max-w-5xl
            mx-auto
            overflow-hidden
            bg-[#5d0e16]
            text-center
            px-5
            py-8
            sm:py-10
            shadow-[0_18px_45px_rgba(89,50,40,0.15)]
          "
        >

          {/* Decorative circle */}

          <div
            className="
              pointer-events-none
              absolute
              -top-16
              -right-16
              w-36
              h-36
              rounded-full
              border
              border-[#c9a24a]/20
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              -left-10
              w-40
              h-40
              rounded-full
              border
              border-[#c9a24a]/10
            "
          />

          <Sparkles
            className="
              w-5
              h-5
              mx-auto
              text-[#c9a24a]
            "
            strokeWidth={1.3}
          />

          <h2
            className="
              font-serif
              text-2xl
              sm:text-3xl
              text-[#f8f3e9]
              mt-3
            "
          >
            Shop with confidence
          </h2>

          <p
            className="
              max-w-xl
              mx-auto
              mt-2
              text-xs
              sm:text-sm
              text-[#eadfd2]
              leading-6
            "
          >
            Select your preferred payment method at checkout
            and enjoy a smooth shopping experience with Darsh.
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
            <span className="w-10 h-px bg-[#c9a24a]" />

            <span
              className="
                text-[8px]
                tracking-[0.3em]
                uppercase
                text-[#c9a24a]
              "
            >
              Darsh Handlooms
            </span>

            <span className="w-10 h-px bg-[#c9a24a]" />
          </div>

        </motion.div>
      </section>

    </main>
  );
};

export default PaymentOptions;