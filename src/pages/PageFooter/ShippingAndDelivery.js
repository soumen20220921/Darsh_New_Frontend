import React from "react";
import { motion } from "framer-motion";
import {
  FaShippingFast,
  FaBoxOpen,
  FaFileInvoice,
  FaGlobe,
  FaExclamationTriangle,
  FaHeadset,
} from "react-icons/fa";
import {
  Sparkles,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const ShippingAndDelivery = () => {
  const sections = [
    {
      number: "01",
      title: "Processing Time",
      icon: <FaShippingFast />,
      text:
        "All orders are shipped within 2-3 business days and delivered within 7-10 business days. Orders are not shipped or delivered on weekends or holidays. High order volume may occasionally cause shipping delays.",
    },
    {
      number: "02",
      title: "Shipping Rates & Delivery Estimates",
      icon: <FaBoxOpen />,
      text:
        "Shipping charges for your order will be calculated at checkout. Delivery estimates may vary depending on your location, courier availability, and other delivery conditions.",
    },
    {
      number: "03",
      title: "Shipment Confirmation & Order Tracking",
      icon: <FaFileInvoice />,
      text:
        "You will receive a Shipment Confirmation email once your order has shipped, containing your tracking number or tracking details. Tracking information may become active within 24 hours.",
    },
    {
      number: "04",
      title: "Customs, Duties & Taxes",
      icon: <FaGlobe />,
      text:
        "We are not responsible for customs duties or taxes that may be applied to your order. Any additional fees imposed during or after shipping are the responsibility of the customer.",
    },
    {
      number: "05",
      title: "Damages & Lost Shipments",
      icon: <FaExclamationTriangle />,
      text:
        "We are not liable for products damaged or lost during shipping. If you receive a damaged order, please contact the shipment carrier and keep all packaging and damaged goods for the claim process. A video unboxing is mandatory for damage-related claims.",
    },
    {
      number: "06",
      title: "Contact Information",
      icon: <FaHeadset />,
      text:
        "If you have any questions about shipping or delivery, please contact us at contactdarsh9@gmail.com or +91 9907804710.",
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

        {/* Background glow */}

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

        {/* Decorative rotating element */}

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
            rotate: [0, -30, -60, -30, 0],
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
            rounded-full
            border
            border-[#76131d]/10
          "
        />

        <div className="relative max-w-5xl mx-auto text-center">

          {/* Small label */}

          <motion.p
            initial={{
              opacity: 0,
              y: -12,
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
            Darsh · Delivery Information
          </motion.p>

          {/* Gold divider */}

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
            Shipping & Delivery
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
            Everything you need to know about order processing,
            shipping, tracking and delivery.
          </motion.p>

        </div>
      </section>

      {/* =====================================================
          DELIVERY HIGHLIGHTS
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
            grid
            grid-cols-1
            sm:grid-cols-3
            bg-[#fcfaf5]
            border
            border-[#dfd2c1]
            shadow-[0_12px_35px_rgba(89,50,40,0.07)]
          "
        >

          {/* Processing */}

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
                w-10
                h-10
                flex
                items-center
                justify-center
                bg-[#f5eedf]
                border
                border-[#d8c59a]
                text-[#76131d]
              "
            >
              <FaShippingFast />
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
                Processing
              </p>

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#5d0e16]
                "
              >
                2-3 Business Days
              </p>
            </div>
          </div>

          {/* Delivery */}

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
                w-10
                h-10
                flex
                items-center
                justify-center
                bg-[#f6e8e5]
                border
                border-[#d9b9b5]
                text-[#76131d]
              "
            >
              <MapPin
                className="w-5 h-5"
                strokeWidth={1.5}
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
                Delivery
              </p>

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#5d0e16]
                "
              >
                7-10 Business Days
              </p>
            </div>
          </div>

          {/* Tracking */}

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
                w-10
                h-10
                flex
                items-center
                justify-center
                bg-[#f5eedf]
                border
                border-[#d8c59a]
                text-[#9a741d]
              "
            >
              <CheckCircle2
                className="w-5 h-5"
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
                Tracking
              </p>

              <p
                className="
                  text-xs
                  font-semibold
                  text-[#5d0e16]
                "
              >
                Available After Shipping
              </p>
            </div>
          </div>

        </motion.div>
      </section>

      {/* =====================================================
          SHIPPING CARDS
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
            lg:grid-cols-3
            gap-5
            sm:gap-6
          "
        >

          {sections.map((section) => (
            <motion.article
              key={section.title}
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

              {/* Gold animated top border */}

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

                {/* Number */}

                <div
                  className="
                    absolute
                    top-4
                    right-5
                    text-[10px]
                    tracking-[0.2em]
                    text-[#c9a24a]
                    font-semibold
                  "
                >
                  {section.number}
                </div>

                {/* Icon */}

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
                    mb-5
                  "
                >
                  {section.icon}
                </motion.div>

                {/* Small label */}

                <p
                  className="
                    text-[8px]
                    tracking-[0.25em]
                    uppercase
                    text-[#a58f82]
                    mb-1
                  "
                >
                  Shipping Information
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
                    pr-8
                  "
                >
                  {section.title}
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
                  <span className="w-7 h-px bg-[#c9a24a]" />

                  <span className="w-1 h-1 rounded-full bg-[#c9a24a]" />

                  <span className="flex-1 h-px bg-[#e8dfd3]" />
                </div>

                {/* Text */}

                <p
                  className="
                    text-sm
                    text-[#765c52]
                    leading-6
                  "
                >
                  {section.text}
                </p>

                {/* Bottom status */}

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
                    Darsh Delivery Care
                  </span>
                </div>

              </div>
            </motion.article>
          ))}

        </motion.div>
      </section>

      {/* =====================================================
          DELIVERY NOTE
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
            bg-[#5d0e16]
            text-center
            px-5
            py-8
            sm:px-10
            sm:py-10
            relative
            overflow-hidden
            shadow-[0_18px_45px_rgba(89,50,40,0.15)]
          "
        >

          {/* Decorative circles */}

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

          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaShippingFast
              className="
                mx-auto
                text-3xl
                text-[#c9a24a]
              "
            />
          </motion.div>

          <h2
            className="
              mt-4
              font-serif
              text-2xl
              sm:text-3xl
              text-[#f8f3e9]
            "
          >
            Your order, carefully delivered
          </h2>

          <p
            className="
              max-w-xl
              mx-auto
              mt-3
              text-xs
              sm:text-sm
              text-[#eadfd2]
              leading-6
            "
          >
            We carefully prepare every order so your selected
            collection reaches you safely and beautifully.
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
                tracking-[0.3em]
                uppercase
                text-[#c9a24a]
              "
            >
              Darsh Handlooms
            </span>

            <span className="w-8 sm:w-12 h-px bg-[#c9a24a]" />
          </div>

        </motion.div>

      </section>

    </main>
  );
};

export default ShippingAndDelivery;