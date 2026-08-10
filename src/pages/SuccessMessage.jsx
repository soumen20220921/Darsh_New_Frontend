import React, { useEffect } from "react";
import {
  CheckCircle,
  Sparkles,
  Crown,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const SuccessMessage = ({ name }) => {
  /* ============================================================
     CONFETTI
  ============================================================ */

  useEffect(() => {
    const duration = 1800;
    const animationEnd = Date.now() + duration;

    const colors = [
      "#741522",
      "#d4ad54",
      "#f5d98a",
      "#ffffff",
    ];

    const fire = () => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) return;

      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        startVelocity: 45,
        origin: {
          x: 0,
          y: 0.65,
        },
        colors,
      });

      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        startVelocity: 45,
        origin: {
          x: 1,
          y: 0.65,
        },
        colors,
      });

      requestAnimationFrame(fire);
    };

    fire();

    return () => {
      confetti.reset();
    };
  }, []);


  /* ============================================================
     ANIMATION VARIANTS
  ============================================================ */

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.88,
      y: 30,
    },

    visible: {
      opacity: 1,
      scale: 1,
      y: 0,

      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        staggerChildren: 0.15,
      },
    },
  };


  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };


  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#fffdf8]
        px-4
        py-8
        sm:px-6
        sm:py-12
      "
    >

      {/* ========================================================
          BACKGROUND DECORATIONS
      ======================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        {/* Maroon glow */}

        <motion.div
          animate={{
            x: [0, 35, 0],
            y: [0, -25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-24
            top-10
            h-72
            w-72
            rounded-full
            bg-[#741522]/10
            blur-3xl
          "
        />


        {/* Gold glow */}

        <motion.div
          animate={{
            x: [0, -30, 0],
            y: [0, 25, 0],
            scale: [1, 1.12, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-24
            -right-20
            h-80
            w-80
            rounded-full
            bg-[#d4ad54]/15
            blur-3xl
          "
        />


        {/* Center glow */}

        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.08, 0.16, 0.08],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[28rem]
            w-[28rem]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#741522]/10
            blur-3xl
          "
        />


        {/* Rotating decorative ring */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#d4ad54]/15
            sm:h-[500px]
            sm:w-[500px]
          "
        />


        {/* Second ring */}

        <motion.div
          animate={{
            rotate: -360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            absolute
            left-1/2
            top-1/2
            h-[280px]
            w-[280px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border
            border-[#741522]/10
            sm:h-[420px]
            sm:w-[420px]
          "
        />


        {/* Floating particles */}

        <motion.span
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="
            absolute
            left-[15%]
            top-[25%]
            h-2
            w-2
            rounded-full
            bg-[#d4ad54]
          "
        />

        <motion.span
          animate={{
            y: [0, 20, 0],
            opacity: [0.2, 0.7, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0.5,
          }}
          className="
            absolute
            right-[17%]
            top-[30%]
            h-3
            w-3
            rounded-full
            bg-[#741522]
          "
        />

        <motion.span
          animate={{
            y: [0, -15, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
          }}
          className="
            absolute
            bottom-[22%]
            left-[20%]
            h-2
            w-2
            rounded-full
            bg-[#d4ad54]
          "
        />

      </div>


      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[calc(100vh-4rem)]
          items-center
          justify-center
        "
      >

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="
            relative
            w-full
            max-w-lg
            overflow-hidden
            rounded-[2rem]
            border
            border-[#d4ad54]/30
            bg-white/90
            p-6
            text-center
            shadow-[0_25px_80px_rgba(74,24,21,0.16)]
            backdrop-blur-xl
            sm:p-10
          "
        >

          {/* ====================================================
              TOP GOLD LINE
          ==================================================== */}

          <div
            className="
              absolute
              left-0
              right-0
              top-0
              h-1.5
              bg-gradient-to-r
              from-[#741522]
              via-[#d4ad54]
              to-[#741522]
            "
          />


          {/* ====================================================
              BRAND
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              mb-7
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
                tracking-[0.3em]
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


          {/* ====================================================
              SUCCESS ICON
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              relative
              mx-auto
              mb-7
              flex
              h-28
              w-28
              items-center
              justify-center
            "
          >

            {/* Outer animated ring */}

            <motion.div
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.35, 0.1, 0.35],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                inset-0
                rounded-full
                border
                border-[#d4ad54]
              "
            />


            {/* Second ring */}

            <motion.div
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                absolute
                -inset-2
                rounded-full
                border
                border-[#741522]/10
              "
            />


            {/* Main icon */}

            <div
              className="
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                bg-gradient-to-br
                from-[#741522]
                via-[#861d29]
                to-[#5f111b]
                shadow-xl
              "
            >

              <CheckCircle
                className="
                  h-12
                  w-12
                  text-[#f5d98a]
                  stroke-[1.7]
                "
              />

            </div>


            {/* Crown */}

            <motion.div
              animate={{
                y: [0, -3, 0],
                rotate: [0, 4, -4, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
              className="
                absolute
                -right-1
                -top-1
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-full
                border
                border-[#d4ad54]/40
                bg-[#faf3e5]
                text-[#b88732]
                shadow-sm
              "
            >
              <Crown className="h-4 w-4" />
            </motion.div>

          </motion.div>


          {/* ====================================================
              HEADING
          ==================================================== */}

          <motion.div variants={itemVariants}>

            <p
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.25em]
                text-[#b88732]
              "
            >
              Registration Complete
            </p>


            <h1
              className="
                mt-2
                font-serif
                text-3xl
                font-bold
                leading-tight
                text-[#4a1815]
                sm:text-4xl
              "
            >
              Welcome,{" "}
              <span className="text-[#741522]">
                {name}
              </span>
              !
            </h1>


            <div
              className="
                mx-auto
                mt-4
                h-0.5
                w-16
                rounded-full
                bg-gradient-to-r
                from-[#741522]
                via-[#d4ad54]
                to-[#741522]
              "
            />

          </motion.div>


          {/* ====================================================
              MESSAGE
          ==================================================== */}

          <motion.p
            variants={itemVariants}
            className="
              mx-auto
              mt-5
              max-w-md
              text-sm
              leading-6
              text-[#806c63]
              sm:text-base
            "
          >
            Your Darsh account has been created
            successfully. We're delighted to have
            you join our journey of timeless Indian
            craftsmanship.
          </motion.p>


          {/* ====================================================
              BENEFITS
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              mt-7
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >

            <div
              className="
                rounded-xl
                border
                border-[#d4ad54]/20
                bg-[#faf3e5]
                p-3
              "
            >

              <Sparkles
                className="
                  mx-auto
                  h-4
                  w-4
                  text-[#b88732]
                "
              />

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  text-[#4a1815]
                "
              >
                New Collections
              </p>

            </div>


            <div
              className="
                rounded-xl
                border
                border-[#d4ad54]/20
                bg-[#faf3e5]
                p-3
              "
            >

              <ShieldCheck
                className="
                  mx-auto
                  h-4
                  w-4
                  text-[#b88732]
                "
              />

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  text-[#4a1815]
                "
              >
                Secure Account
              </p>

            </div>


            <div
              className="
                rounded-xl
                border
                border-[#d4ad54]/20
                bg-[#faf3e5]
                p-3
              "
            >

              <Crown
                className="
                  mx-auto
                  h-4
                  w-4
                  text-[#b88732]
                "
              />

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  text-[#4a1815]
                "
              >
                Darsh Member
              </p>

            </div>

          </motion.div>


          {/* ====================================================
              STATUS
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-green-200
              bg-green-50
              px-4
              py-3
            "
          >

            <CheckCircle
              className="
                h-4
                w-4
                text-green-600
              "
            />

            <span
              className="
                text-xs
                font-semibold
                text-green-700
              "
            >
              Account created successfully
            </span>

          </motion.div>


          {/* ====================================================
              CONTINUE MESSAGE
          ==================================================== */}

          <motion.div
            variants={itemVariants}
            className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-[10px]
              text-[#a99082]
            "
          >

            <span>
              Taking you to your account
            </span>

            <motion.span
              animate={{
                x: [0, 4, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <ArrowRight
                className="
                  h-3.5
                  w-3.5
                  text-[#b88732]
                "
              />
            </motion.span>

          </motion.div>


          {/* ====================================================
              BOTTOM DECORATION
          ==================================================== */}

          <div
            className="
              mt-7
              flex
              items-center
              justify-center
              gap-2
            "
          >

            <div
              className="
                h-px
                w-12
                bg-[#d4ad54]/30
              "
            />

            <Sparkles
              className="
                h-3
                w-3
                text-[#d4ad54]
              "
            />

            <div
              className="
                h-px
                w-12
                bg-[#d4ad54]/30
              "
            />

          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default SuccessMessage;