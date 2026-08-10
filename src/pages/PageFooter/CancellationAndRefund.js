import React from "react";
import { motion } from "framer-motion";
import {
  Ban,
  RefreshCw,
  ArrowLeftRight,
  RotateCcw,
  Truck,
  Phone,
  Mail,
  ShieldCheck,
  FileVideo,
  ChevronRight,
} from "lucide-react";

const CancellationAndRefund = () => {
  const sections = [
    {
      number: "01",
      title: "Order Cancellation",
      icon: Ban,
      accent: "maroon",
      content: [
        "Orders can be cancelled before they are shipped.",
        "Once the order has been dispatched, cancellation requests will no longer be accepted.",
        "To cancel your order, please email us with your order ID at contactdarsh9@gmail.com",
      ],
    },

    {
      number: "02",
      title: "Refund Policy",
      icon: RefreshCw,
      accent: "gold",
      content: [
        "Once your refund request is approved, the amount will be credited to your bank account within 7-10 business days.",
        "If delays occur, please contact your bank or payment provider for assistance.",
      ],
    },

    {
      number: "03",
      title: "Exchange Policy",
      icon: ArrowLeftRight,
      accent: "maroon",
      content: [
        "Exchanges are available only for defective or damaged items.",
        "Request must be submitted within 3 days of receiving the product.",
        "Exchanges will be done within 5 days of delivery.",
      ],
    },

    {
      number: "04",
      title: "Return Policy",
      icon: RotateCcw,
      accent: "gold",
      important: true,
      content: [
        "Returns are accepted for products that are damaged, defective, or incorrect upon delivery.",
        "An unboxing video is mandatory for all return or refund requests.",
        "Items must be unused, in their original packaging, and include all original tags and proof of purchase.",
        "If you receive a damaged product, you must return it within 2 days of delivery to be eligible for a refund.",
        "Approved refunds will be credited within 5 to 7 working days.",
      ],
    },

    {
      number: "05",
      title: "Shipping Policy",
      icon: Truck,
      accent: "maroon",
      content: [
        "Once an order is placed, delivery will take up to 7 business days to the provided address.",
      ],
    },

    {
      number: "06",
      title: "Contact Us",
      icon: Phone,
      accent: "gold",
      contact: true,
      content: [
        "Email: contactdarsh9@gmail.com",
        "Phone: +91 9907804710",
      ],
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
        duration: 0.55,
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

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[#c9a24a]/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">

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
            Darsh · Customer Policy
          </motion.p>

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
              text-3xl
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              text-[#351216]
              leading-tight
            "
          >
            Return, Exchange
            <br className="sm:hidden" />{" "}
            & Cancellation
          </motion.h1>

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
            Please review our policies carefully to understand
            the cancellation, return, exchange, refund, and
            shipping guidelines before placing your order.
          </motion.p>
        </div>
      </section>

      {/* =====================================================
          IMPORTANT RETURN NOTICE
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
            max-w-5xl
            mx-auto
            relative
            overflow-hidden
            bg-[#fcfaf5]
            border
            border-[#dfd2c1]
            shadow-[0_15px_45px_rgba(89,50,40,0.08)]
          "
        >
          {/* Gold line */}

          <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#c9a24a]" />

          <div className="flex flex-col sm:flex-row gap-4 p-5 sm:p-6">

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
              <FileVideo
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
                Important return requirement
              </p>

              <h2 className="
                font-serif
                text-lg
                sm:text-xl
                text-[#5d0e16]
              ">
                Please record your parcel opening
              </h2>

              <p className="
                text-xs
                sm:text-sm
                text-[#765c52]
                leading-6
                mt-2
              ">
                An unboxing video is mandatory for return or
                refund requests. Please record the complete
                parcel opening process clearly from start to finish.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* =====================================================
          POLICY CARDS
      ===================================================== */}

      <section className="px-4 pb-14 sm:pb-20">
        <div className="max-w-5xl mx-auto space-y-5">

          {sections.map((section, index) => {
            const Icon = section.icon;

            const isGold = section.accent === "gold";

            return (
              <motion.article
                key={section.number}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                whileHover={{
                  y: -3,
                }}
                className="
                  group
                  relative
                  overflow-hidden
                  bg-[#fcfaf5]
                  border
                  border-[#dfd2c1]
                  shadow-[0_12px_35px_rgba(89,50,40,0.06)]
                  hover:shadow-[0_18px_45px_rgba(89,50,40,0.11)]
                  transition-shadow
                  duration-300
                "
              >

                {/* Side accent */}

                <div
                  className={`
                    absolute
                    left-0
                    top-0
                    bottom-0
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
                        hidden
                        sm:flex
                        w-10
                        h-10
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

                    <div className="flex-1 min-w-0">

                      <p className="
                        text-[8px]
                        tracking-[0.25em]
                        uppercase
                        text-[#a58f82]
                        mb-1
                      ">
                        Policy
                      </p>

                      <h2 className="
                        font-serif
                        text-xl
                        sm:text-2xl
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
                        text-[#c9a24a]/60
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

                  {section.contact ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      <a
                        href="mailto:contactdarsh9@gmail.com"
                        className="
                          flex
                          items-center
                          gap-3
                          p-4
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
                            uppercase
                            tracking-[0.2em]
                            text-[#a58f82]
                          ">
                            Email
                          </p>

                          <p className="
                            text-xs
                            sm:text-sm
                            text-[#5d0e16]
                            mt-1
                            break-all
                          ">
                            contactdarsh9@gmail.com
                          </p>
                        </div>
                      </a>

                      <a
                        href="tel:+919907804710"
                        className="
                          flex
                          items-center
                          gap-3
                          p-4
                          bg-[#f8f0e4]
                          border
                          border-[#e5d8c8]
                          hover:border-[#c9a24a]
                          transition-colors
                        "
                      >
                        <Phone
                          className="w-4 h-4 text-[#9a741d]"
                          strokeWidth={1.5}
                        />

                        <div>
                          <p className="
                            text-[8px]
                            uppercase
                            tracking-[0.2em]
                            text-[#a58f82]
                          ">
                            Phone
                          </p>

                          <p className="
                            text-xs
                            sm:text-sm
                            text-[#5d0e16]
                            mt-1
                          ">
                            +91 9907804710
                          </p>
                        </div>
                      </a>
                    </div>
                  ) : (
                    <ul className="space-y-3">
                      {section.content.map((point, idx) => (
                        <motion.li
                          key={idx}
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
                            delay:
                              index * 0.08 +
                              idx * 0.06,
                          }}
                          className="
                            flex
                            items-start
                            gap-3
                            text-sm
                            sm:text-base
                            text-[#765c52]
                            leading-6
                          "
                        >
                          <span className="
                            flex-shrink-0
                            mt-2
                            w-1.5
                            h-1.5
                            rounded-full
                            bg-[#c9a24a]
                          " />

                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  )}

                  {/* Special return warning */}

                  {section.important && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.98,
                      }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      className="
                        mt-5
                        flex
                        items-start
                        gap-3
                        p-4
                        bg-[#f6e8e5]
                        border-l-2
                        border-[#76131d]
                      "
                    >
                      <ShieldCheck
                        className="
                          w-5
                          h-5
                          flex-shrink-0
                          text-[#76131d]
                        "
                        strokeWidth={1.4}
                      />

                      <p className="
                        text-xs
                        sm:text-sm
                        text-[#5d0e16]
                        leading-5
                      ">
                        <span className="font-semibold">
                          Important:
                        </span>{" "}
                        An unboxing video is mandatory for all
                        return and refund requests.
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* =====================================================
          FOOTER NOTE
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
            text-center
            border-t
            border-[#dfd2c1]
            pt-7
          "
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-px bg-[#c9a24a]" />

            <span className="text-[#c9a24a]">
              ✦
            </span>

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
            Thank you for shopping with us.
          </p>
        </motion.div>
      </section>
    </main>
  );
};

export default CancellationAndRefund;