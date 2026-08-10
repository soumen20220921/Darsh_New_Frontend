import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Crown,
  ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";

const AccountInfo = () => {
  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  useEffect(() => {
    const email =
      localStorage.getItem("email") ||
      "user@example.com";

    const name =
      localStorage.getItem("name") ||
      "Darsh Customer";

    setUserData({
      email,
      name,
    });
  }, []);

  return (
    <div className="space-y-5 sm:space-y-7">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          y: -15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/25
          bg-gradient-to-r
          from-[#741522]
          via-[#851c28]
          to-[#5f111b]
          p-5
          shadow-lg
          sm:p-6
        "
      >

        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -right-10
            -top-10
            h-32
            w-32
            rounded-full
            bg-[#d4ad54]/15
            blur-2xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-12
            left-1/3
            h-28
            w-28
            rounded-full
            bg-white/5
            blur-2xl
          "
        />

        <div className="relative z-10 flex items-center justify-between gap-4">

          <div className="flex items-center gap-3 sm:gap-4">

            {/* Icon */}

            <motion.div
              initial={{
                scale: 0.8,
                rotate: -10,
              }}
              animate={{
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.5,
              }}
              className="
                flex
                h-12
                w-12
                flex-shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-[#e7c875]/40
                bg-[#fffdf8]/10
                text-[#f5d98a]
                backdrop-blur-sm
                sm:h-14
                sm:w-14
              "
            >
              <User className="h-6 w-6 sm:h-7 sm:w-7" />
            </motion.div>

            <div>

              <div
                className="
                  mb-1
                  flex
                  items-center
                  gap-2
                "
              >
                <Sparkles className="h-3.5 w-3.5 text-[#e7c875]" />

                <span
                  className="
                    text-[9px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#f5d98a]
                  "
                >
                  My Account
                </span>
              </div>

              <h2
                className="
                  font-serif
                  text-xl
                  font-semibold
                  text-white
                  sm:text-2xl
                "
              >
                Profile Information
              </h2>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-white/70
                  sm:text-xs
                "
              >
                Your personal details and account information
              </p>

            </div>

          </div>


          {/* Online badge */}

          <div
            className="
              hidden
              items-center
              gap-2
              rounded-full
              border
              border-[#e7c875]/30
              bg-white/10
              px-3
              py-1.5
              backdrop-blur-sm
              sm:flex
            "
          >

            <span className="relative flex h-2.5 w-2.5">

              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-[#d4ad54]
                  opacity-60
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-[#e7c875]
                "
              />

            </span>

            <span
              className="
                text-[10px]
                font-semibold
                text-[#f8e8b2]
              "
            >
              Online
            </span>

          </div>

        </div>

      </motion.div>


      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.1,
          duration: 0.5,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/20
          bg-[#fffdf8]
          shadow-sm
          transition-all
          duration-300
          hover:shadow-lg
        "
      >

        {/* Section heading */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-[#741522]/10
            bg-gradient-to-r
            from-[#faf3e5]
            to-[#fffdf8]
            px-4
            py-4
            sm:px-6
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#741522]
              text-[#f5d98a]
              shadow-md
            "
          >
            <User className="h-5 w-5" />
          </div>

          <div>

            <h3
              className="
                text-sm
                font-bold
                text-[#4a1815]
                sm:text-base
              "
            >
              Personal Information
            </h3>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[#9b806d]
                sm:text-xs
              "
            >
              Your basic account details
            </p>

          </div>

        </div>


        {/* Content */}

        <div className="p-4 sm:p-6">

          <div
            className="
              grid
              grid-cols-1
              gap-4
              md:grid-cols-2
            "
          >

            {/* Full Name */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/15
                bg-[#faf6ee]
                p-4
                transition-all
                duration-300
                hover:border-[#d4ad54]/40
                hover:shadow-sm
              "
            >

              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                "
              >

                <label
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#9b806d]
                  "
                >
                  Full Name
                </label>

                <User
                  className="
                    h-4
                    w-4
                    text-[#b88732]
                  "
                />

              </div>

              <div
                className="
                  rounded-xl
                  border
                  border-[#d4ad54]/15
                  bg-[#fffdf8]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#4a1815]
                  shadow-sm
                "
              >
                {userData.name}
              </div>

            </motion.div>


            {/* Account Type */}

            <motion.div
              whileHover={{
                y: -2,
              }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/15
                bg-[#faf6ee]
                p-4
                transition-all
                duration-300
                hover:border-[#d4ad54]/40
                hover:shadow-sm
              "
            >

              <div
                className="
                  mb-2
                  flex
                  items-center
                  justify-between
                "
              >

                <label
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#9b806d]
                  "
                >
                  Account Type
                </label>

                <Crown
                  className="
                    h-4
                    w-4
                    text-[#b88732]
                  "
                />

              </div>

              <div
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#d4ad54]/15
                  bg-[#fffdf8]
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-[#741522]
                  shadow-sm
                "
              >

                <Sparkles className="h-4 w-4 text-[#b88732]" />

                Premium Customer

              </div>

            </motion.div>

          </div>

        </div>

      </motion.section>


      {/* =====================================================
          CONTACT INFORMATION
      ===================================================== */}

      <motion.section
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.5,
        }}
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/20
          bg-[#fffdf8]
          shadow-sm
          transition-all
          duration-300
          hover:shadow-lg
        "
      >

        {/* Heading */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-[#741522]/10
            bg-gradient-to-r
            from-[#faf3e5]
            to-[#fffdf8]
            px-4
            py-4
            sm:px-6
          "
        >

          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-[#741522]
              text-[#f5d98a]
              shadow-md
            "
          >
            <Mail className="h-5 w-5" />
          </div>

          <div>

            <h3
              className="
                text-sm
                font-bold
                text-[#4a1815]
                sm:text-base
              "
            >
              Contact Information
            </h3>

            <p
              className="
                mt-0.5
                text-[10px]
                text-[#9b806d]
                sm:text-xs
              "
            >
              Your registered contact details
            </p>

          </div>

        </div>


        {/* Contact */}

        <div className="p-4 sm:p-6">

          <motion.div
            whileHover={{
              y: -2,
            }}
            className="
              rounded-2xl
              border
              border-[#d4ad54]/15
              bg-[#faf6ee]
              p-4
              transition-all
              duration-300
              hover:border-[#d4ad54]/40
              hover:shadow-sm
            "
          >

            <div
              className="
                mb-2
                flex
                items-center
                justify-between
              "
            >

              <label
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9b806d]
                "
              >
                Email Address / Phone
              </label>

              <Mail
                className="
                  h-4
                  w-4
                  text-[#b88732]
                "
              />

            </div>


            <div
              className="
                break-all
                rounded-xl
                border
                border-[#d4ad54]/15
                bg-[#fffdf8]
                px-4
                py-3
                text-sm
                font-semibold
                text-[#4a1815]
                shadow-sm
              "
            >
              {userData.email}
            </div>


            {/* Verified */}

            <div
              className="
                mt-3
                flex
                items-center
                gap-2
                text-xs
                font-medium
                text-[#7b704e]
              "
            >

              <CheckCircle2
                className="
                  h-4
                  w-4
                  text-[#b88732]
                "
              />

              <span>
                Contact information verified
              </span>

            </div>

          </motion.div>

        </div>

      </motion.section>


      {/* =====================================================
          SECURITY / TRUST CARD
      ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          delay: 0.3,
          duration: 0.5,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/30
          bg-gradient-to-r
          from-[#f7ecd9]
          via-[#fff9ef]
          to-[#f2dfbd]
          p-5
          shadow-inner
          sm:p-6
        "
      >

        {/* Animated shine */}

        <motion.div
          animate={{
            x: ["-120%", "120%"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            w-1/3
            skew-x-[-20deg]
            bg-gradient-to-r
            from-transparent
            via-white/40
            to-transparent
          "
        />


        <div
          className="
            relative
            z-10
            flex
            flex-col
            items-center
            gap-4
            text-center
            sm:flex-row
            sm:text-left
          "
        >

          <div
            className="
              flex
              h-12
              w-12
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-[#741522]
              text-[#f5d98a]
              shadow-lg
            "
          >
            <ShieldCheck className="h-6 w-6" />
          </div>


          <div className="flex-1">

            <h3
              className="
                font-serif
                text-base
                font-bold
                text-[#4a1815]
                sm:text-lg
              "
            >
              Your Darsh Account is Protected
            </h3>

            <p
              className="
                mt-1
                text-xs
                leading-5
                text-[#806c63]
                sm:text-sm
              "
            >
              Your profile information is securely
              associated with your Darsh account.
              Continue shopping with confidence.
            </p>

          </div>


          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-[#d4ad54]/40
              bg-[#fffdf8]/70
              px-3
              py-1.5
              text-[9px]
              font-bold
              uppercase
              tracking-wider
              text-[#741522]
            "
          >

            <CheckCircle2 className="h-3.5 w-3.5 text-[#b88732]" />

            Secure

          </div>

        </div>

      </motion.div>


      {/* =====================================================
          WELCOME FOOTER
      ===================================================== */}

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
          delay: 0.4,
          duration: 0.5,
        }}
        className="
          relative
          overflow-hidden
          rounded-2xl
          border
          border-[#d4ad54]/25
          bg-[#741522]
          px-5
          py-5
          text-center
          shadow-lg
          sm:px-8
        "
      >

        {/* Decorative pattern */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-40
            w-40
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#d4ad54]/10
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-1/2
            h-28
            w-28
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#d4ad54]/10
          "
        />


        <div className="relative z-10">

          <div
            className="
              mb-2
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <Sparkles
              className="
                h-4
                w-4
                text-[#e7c875]
                animate-pulse
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#e7c875]
              "
            >
              Welcome Back
            </span>

            <Sparkles
              className="
                h-4
                w-4
                text-[#e7c875]
                animate-pulse
              "
            />

          </div>


          <p
            className="
              text-sm
              font-medium
              text-white
              sm:text-base
            "
          >
            Welcome back,{" "}
            <span
              className="
                font-bold
                text-[#f5d98a]
              "
            >
              {userData.name}
            </span>
            !
          </p>


          <p
            className="
              mt-1
              text-[10px]
              text-white/65
              sm:text-xs
            "
          >
            Your Darsh profile is ready for your next
            beautiful shopping experience.
          </p>


          <div
            className="
              mx-auto
              mt-4
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <span
              className="
                h-px
                w-10
                bg-[#d4ad54]/50
              "
            />

            <ShoppingBag
              className="
                h-4
                w-4
                text-[#e7c875]
              "
            />

            <span
              className="
                h-px
                w-10
                bg-[#d4ad54]/50
              "
            />

          </div>

        </div>

      </motion.div>

    </div>
  );
};

export default AccountInfo;