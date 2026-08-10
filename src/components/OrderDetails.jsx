import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  Clock,
  XCircle,
  Phone,
  CreditCard,
  CalendarDays,
  HelpCircle,
  PhoneCall,
  Share2,
  Star,
  Shield,
  RotateCcw,
  User,
  Navigation,
  Sparkles,
  Crown,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import DeliveryEstimateSection from "./DeliveryEstimateSection";
import { useAppContext } from "../context/AppContext";


const OrderDetails = ({ order, onClose }) => {

  const { url } = useAppContext();

  const [copied, setCopied] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [imageError, setImageError] = useState({});


  /* ============================================================
     DATE
  ============================================================ */

  const orderDate = order?.orderDate
    ? new Date(order.orderDate)
    : new Date();

  const estimatedDate = new Date(
    orderDate.getTime() +
      7 * 24 * 60 * 60 * 1000
  );


  /* ============================================================
     ORDER STATUS
  ============================================================ */

  const getStatusInfo = () => {

    if (order?.orderReject) {
      return {
        status: "Order Rejected",
        step: 0,
        icon: XCircle,
        gradient:
          "from-[#8f2431] to-[#5f111b]",
        color: "red",
      };
    }

    if (order?.trackingId) {
      return {
        status: "Shipped & On The Way",
        step: 3,
        icon: Truck,
        gradient:
          "from-[#741522] to-[#a57924]",
        color: "gold",
      };
    }

    if (order?.orderAccept) {
      return {
        status: "Accepted & Processing",
        step: 2,
        icon: Package,
        gradient:
          "from-[#741522] to-[#b88732]",
        color: "maroon",
      };
    }

    return {
      status: "Order Placed",
      step: 1,
      icon: CheckCircle,
      gradient:
        "from-[#741522] to-[#b88732]",
      color: "gold",
    };
  };


  const {
    status,
    step,
    icon,
    gradient,
  } = getStatusInfo();

  const StatusIcon = icon;


  /* ============================================================
     PROGRESS ANIMATION
  ============================================================ */

  useEffect(() => {

    const timer = setTimeout(() => {

      if (step <= 0) {
        setProgressWidth(0);
      } else {
        setProgressWidth(
          (step - 1) * 50
        );
      }

    }, 300);

    return () => clearTimeout(timer);

  }, [step]);


  /* ============================================================
     COPY TRACKING ID
  ============================================================ */

  const handleCopy = async () => {

    if (!order?.trackingId) return;

    try {

      await navigator.clipboard.writeText(
        order.trackingId
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        2000
      );

    } catch (error) {
      console.error(
        "Copy failed:",
        error
      );
    }
  };


  /* ============================================================
     IMAGE ERROR
  ============================================================ */

  const handleImageError = (index) => {

    setImageError((prev) => ({
      ...prev,
      [index]: true,
    }));

  };


  /* ============================================================
     SHARE ORDER
  ============================================================ */

  const handleShareOrder = async () => {

    if (navigator.share) {

      try {

        await navigator.share({
          title: `Darsh Order #${order._id?.substring(
            0,
            8
          )}`,
          text:
            "Check out my Darsh order details.",
          url: window.location.href,
        });

      } catch (error) {
        console.log(
          "Sharing cancelled"
        );
      }

    } else {

      handleCopy();

    }
  };


  /* ============================================================
     STATUS STEPS
  ============================================================ */

  const statusSteps = [
    {
      label: "Placed",
      icon: CheckCircle,
      index: 1,
      description:
        "Order received and confirmed",
      mobileDesc: "Confirmed",
      time: order.orderDate,
    },
    {
      label: "Accepted",
      icon: Package,
      index: 2,
      description:
        "Order accepted and being prepared",
      mobileDesc: "Processing",
      time: order.orderAccept
        ? order.orderDate
        : "Pending",
    },
    {
      label: "Shipped",
      icon: Truck,
      index: 3,
      description:
        "Package dispatched with tracking",
      mobileDesc: "Shipped",
      time: order.trackingId
        ? "Dispatched"
        : "Pending",
    },
  ];


  /* ============================================================
     INVALID ORDER
  ============================================================ */

  if (!order) {

    return (
      <div
        className="
          flex
          min-h-[70vh]
          items-center
          justify-center
          bg-[#fffdf8]
          px-4
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-[#d4ad54]/25
            bg-white
            p-8
            text-center
            shadow-xl
          "
        >

          <div
            className="
              mx-auto
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-full
              bg-[#f3e8d2]
              text-[#741522]
            "
          >
            <Package className="h-9 w-9" />
          </div>

          <h2
            className="
              mt-6
              font-serif
              text-2xl
              font-bold
              text-[#4a1815]
            "
          >
            Order Details Not Found
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-[#806c63]
            "
          >
            Please select a valid order
            from your order history.
          </p>

          <button
            onClick={onClose}
            className="
              mt-6
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#741522]
              px-6
              py-3
              text-sm
              font-bold
              text-white
              shadow-lg
              transition
              hover:bg-[#5f111b]
            "
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Orders
          </button>

        </motion.div>

      </div>
    );
  }


  return (

    <div
      className="
        min-h-screen
        bg-[#fffdf8]
        text-[#4a1815]
      "
    >

      {/* ======================================================
          TOP HEADER
      ====================================================== */}

      <div
        className="
          sticky
          top-0
          z-50
          border-b
          border-[#d4ad54]/20
          bg-[#fffdf8]/95
          backdrop-blur-xl
        "
      >

        <div
          className="
            mx-auto
            flex
            h-16
            max-w-7xl
            items-center
            justify-between
            px-4
            sm:px-6
            lg:px-8
          "
        >

          <div className="flex min-w-0 items-center gap-3">

            <motion.button
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.94,
              }}
              onClick={onClose}
              className="
                flex
                h-10
                w-10
                flex-shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-[#d4ad54]/20
                bg-white
                text-[#741522]
                shadow-sm
                transition
                hover:bg-[#f3e8d2]
              "
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>


            <div className="min-w-0">

              <div
                className="
                  flex
                  items-center
                  gap-1.5
                "
              >

                <Crown
                  className="
                    h-3
                    w-3
                    text-[#b88732]
                  "
                />

                <span
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.25em]
                    text-[#b88732]
                  "
                >
                  Darsh
                </span>

              </div>

              <h1
                className="
                  truncate
                  font-serif
                  text-base
                  font-bold
                  text-[#4a1815]
                  sm:text-lg
                "
              >
                Order #
                {order._id?.substring(
                  0,
                  10
                )}
                ...
              </h1>

            </div>

          </div>


          <div className="flex items-center gap-2">

            <motion.button
              whileHover={{
                scale: 1.06,
              }}
              whileTap={{
                scale: 0.94,
              }}
              onClick={handleShareOrder}
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-[#d4ad54]/20
                bg-white
                text-[#741522]
                shadow-sm
              "
            >
              <Share2 className="h-4 w-4" />
            </motion.button>


            {!order.orderReject && (

              <div
                className="
                  hidden
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-[#d4ad54]/20
                  bg-[#faf3e5]
                  px-3
                  py-2
                  sm:flex
                "
              >

                <CalendarDays
                  className="
                    h-4
                    w-4
                    text-[#b88732]
                  "
                />

                <div>

                  <p
                    className="
                      text-[9px]
                      text-[#9b806d]
                    "
                  >
                    Est. Delivery
                  </p>

                  <p
                    className="
                      text-xs
                      font-bold
                      text-[#741522]
                    "
                  >
                    {estimatedDate.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>


      {/* ======================================================
          MAIN
      ====================================================== */}

      <main
        className="
          mx-auto
          max-w-7xl
          space-y-5
          px-4
          py-5
          sm:space-y-6
          sm:px-6
          sm:py-7
          lg:px-8
        "
      >


        {/* ====================================================
            ORDER HERO / STATUS
        ==================================================== */}

        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            relative
            overflow-hidden
            rounded-3xl
            bg-gradient-to-br
            from-[#741522]
            via-[#861d29]
            to-[#5f111b]
            p-5
            shadow-xl
            sm:p-7
          "
        >

          {/* Decorative circles */}

          <div
            className="
              pointer-events-none
              absolute
              -right-16
              -top-16
              h-44
              w-44
              rounded-full
              bg-[#e7c875]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              -bottom-20
              left-1/3
              h-48
              w-48
              rounded-full
              bg-[#e7c875]/5
              blur-3xl
            "
          />


          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              lg:flex-row
              lg:items-center
              lg:justify-between
            "
          >

            <div className="flex items-center gap-4">

              <motion.div
                animate={{
                  y: [0, -4, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="
                  flex
                  h-14
                  w-14
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-[#e7c875]/40
                  bg-white/10
                  text-[#f5d98a]
                  backdrop-blur-sm
                  sm:h-16
                  sm:w-16
                "
              >

                <StatusIcon className="h-7 w-7" />

              </motion.div>


              <div>

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Sparkles
                    className="
                      h-3.5
                      w-3.5
                      text-[#f5d98a]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.25em]
                      text-[#f5d98a]
                    "
                  >
                    Order Status
                  </span>

                </div>

                <h2
                  className="
                    mt-1
                    font-serif
                    text-xl
                    font-bold
                    text-white
                    sm:text-2xl
                  "
                >
                  {status}
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/65
                  "
                >
                  {order.orderReject
                    ? "Please contact our support team for assistance."
                    : `Step ${step} of ${statusSteps.length} completed`}
                </p>

              </div>

            </div>


            {!order.orderReject && (

              <div
                className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur-sm
                "
              >

                <p
                  className="
                    text-[9px]
                    uppercase
                    tracking-wider
                    text-white/55
                  "
                >
                  Estimated Delivery
                </p>

                <div
                  className="
                    mt-1
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Clock
                    className="
                      h-4
                      w-4
                      text-[#f5d98a]
                    "
                  />

                  <span
                    className="
                      text-sm
                      font-bold
                      text-[#f5d98a]
                    "
                  >
                    {estimatedDate.toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>

                </div>

              </div>

            )}

          </div>


          {/* ==================================================
              STATUS TIMELINE
          ================================================== */}

          {!order.orderReject && (

            <div className="relative z-10 mt-8">

              <div className="relative">

                {/* Background line */}

                <div
                  className="
                    absolute
                    left-[16%]
                    right-[16%]
                    top-5
                    h-1
                    rounded-full
                    bg-white/15
                  "
                />


                {/* Progress */}

                <motion.div
                  initial={{
                    width: 0,
                  }}
                  animate={{
                    width: `${progressWidth * 0.68}%`,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                  }}
                  className="
                    absolute
                    left-[16%]
                    top-5
                    h-1
                    rounded-full
                    bg-gradient-to-r
                    from-[#d4ad54]
                    to-[#f5d98a]
                  "
                />


                <div
                  className="
                    relative
                    flex
                    justify-between
                  "
                >

                  {statusSteps.map(
                    (s, index) => {

                      const StepIcon =
                        s.icon;

                      const completed =
                        step >= s.index;

                      const current =
                        step === s.index;

                      return (
                        <div
                          key={index}
                          className="
                            flex
                            w-1/3
                            flex-col
                            items-center
                          "
                        >

                          <motion.div
                            animate={
                              current
                                ? {
                                    scale: [
                                      1,
                                      1.08,
                                      1,
                                    ],
                                  }
                                : {}
                            }
                            transition={{
                              duration: 1.6,
                              repeat: current
                                ? Infinity
                                : 0,
                            }}
                            className={`
                              relative
                              z-10
                              flex
                              h-10
                              w-10
                              items-center
                              justify-center
                              rounded-full
                              border-4
                              ${
                                completed
                                  ? "border-[#f5d98a] bg-[#741522] text-[#f5d98a]"
                                  : "border-white/20 bg-[#5f111b] text-white/40"
                              }
                            `}
                          >

                            <StepIcon className="h-4 w-4" />

                          </motion.div>


                          <p
                            className={`
                              mt-3
                              text-[10px]
                              font-bold
                              sm:text-xs
                              ${
                                completed
                                  ? "text-white"
                                  : "text-white/45"
                              }
                            `}
                          >
                            {s.label}
                          </p>

                          <p
                            className="
                              mt-1
                              hidden
                              text-[9px]
                              text-white/45
                              sm:block
                            "
                          >
                            {s.description}
                          </p>

                        </div>
                      );

                    }
                  )}

                </div>

              </div>

            </div>

          )}

        </motion.section>


        {/* ====================================================
            TRACKING
        ==================================================== */}

        {order.trackingId &&
          !order.orderReject && (

            <motion.section
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#d4ad54]/25
                bg-[#fffdf8]
                shadow-sm
              "
            >

              <div
                className="
                  bg-gradient-to-r
                  from-[#faf3e5]
                  to-[#f3e8d2]
                  p-4
                  sm:p-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
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
                    "
                  >
                    <Truck className="h-5 w-5" />
                  </div>

                  <div>

                    <h2
                      className="
                        font-serif
                        text-base
                        font-bold
                        text-[#4a1815]
                        sm:text-lg
                      "
                    >
                      Tracking Information
                    </h2>

                    <p
                      className="
                        text-[10px]
                        text-[#9b806d]
                      "
                    >
                      Your package is on its way
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-4 sm:p-5">

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-[#9b806d]
                  "
                >
                  Tracking ID
                </p>

                <div
                  className="
                    mt-2
                    flex
                    flex-col
                    gap-3
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
                >

                  <div
                    className="
                      flex-1
                      break-all
                      rounded-xl
                      border
                      border-[#d4ad54]/20
                      bg-[#faf6ee]
                      p-3
                      font-mono
                      text-xs
                      font-bold
                      text-[#741522]
                      sm:text-sm
                    "
                  >
                    {order.trackingId}
                  </div>

                  <motion.button
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.96,
                    }}
                    onClick={handleCopy}
                    className="
                      flex
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#741522]
                      px-4
                      py-3
                      text-xs
                      font-bold
                      text-white
                      shadow-sm
                    "
                  >

                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy ID
                      </>
                    )}

                  </motion.button>

                </div>


                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(
                    order.trackingId
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#741522]
                    py-2.5
                    text-xs
                    font-bold
                    text-[#741522]
                    transition
                    hover:bg-[#741522]
                    hover:text-white
                  "
                >

                  <ExternalLink className="h-4 w-4" />

                  Track Package

                </a>

              </div>

            </motion.section>

          )}


        {/* ====================================================
            CONTENT GRID
        ==================================================== */}

        <div
          className="
            grid
            grid-cols-1
            gap-5
            xl:grid-cols-3
          "
        >


          {/* ==================================================
              LEFT
          ================================================== */}

          <div
            className="
              space-y-5
              xl:col-span-2
            "
          >


            {/* =================================================
                ORDER ITEMS
            ================================================= */}

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
              }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/20
                bg-[#fffdf8]
                p-4
                shadow-sm
                sm:p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  border-b
                  border-[#d4ad54]/15
                  pb-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
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
                      bg-[#f3e8d2]
                      text-[#741522]
                    "
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </div>

                  <div>

                    <h2
                      className="
                        font-serif
                        text-lg
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      Order Items
                    </h2>

                    <p
                      className="
                        text-[10px]
                        text-[#9b806d]
                      "
                    >
                      {order.orderItems
                        ?.length || 0}{" "}
                      item
                      {order.orderItems
                        ?.length !== 1
                        ? "s"
                        : ""}
                    </p>

                  </div>

                </div>

              </div>


              <div className="mt-5 space-y-3">

                {order.orderItems?.map(
                  (item, index) => (

                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        x: -15,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay:
                          index * 0.07,
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="
                        group
                        flex
                        gap-3
                        rounded-2xl
                        border
                        border-[#d4ad54]/15
                        bg-[#faf6ee]
                        p-3
                        transition-all
                        hover:border-[#d4ad54]/35
                        hover:shadow-sm
                        sm:gap-4
                        sm:p-4
                      "
                    >

                      {/* Image */}

                      <div
                        className="
                          relative
                          h-20
                          w-20
                          flex-shrink-0
                          overflow-hidden
                          rounded-xl
                          bg-[#f3e8d2]
                          sm:h-24
                          sm:w-24
                        "
                      >

                        <img
                          src={
                            !imageError[index] &&
                            item.imgSrc
                              ? `${url}/img/${item.imgSrc}`
                              : "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=200&h=200&fit=crop"
                          }
                          alt={
                            item.title ||
                            "Product"
                          }
                          onError={() =>
                            handleImageError(
                              index
                            )
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />


                        <span
                          className="
                            absolute
                            right-1
                            top-1
                            flex
                            h-6
                            min-w-6
                            items-center
                            justify-center
                            rounded-full
                            bg-[#741522]
                            px-1.5
                            text-[9px]
                            font-bold
                            text-[#f5d98a]
                            shadow-md
                          "
                        >
                          ×{item.qty}
                        </span>

                      </div>


                      {/* Product info */}

                      <div className="min-w-0 flex-1">

                        <h3
                          className="
                            line-clamp-2
                            text-sm
                            font-bold
                            text-[#4a1815]
                            transition
                            group-hover:text-[#741522]
                            sm:text-base
                          "
                        >
                          {item.title}
                        </h3>


                        <div
                          className="
                            mt-2
                            flex
                            flex-wrap
                            gap-x-3
                            gap-y-1
                            text-[10px]
                            text-[#806c63]
                            sm:text-xs
                          "
                        >

                          <span>
                            ₹
                            {(
                              item.price /
                              item.qty
                            ).toLocaleString()}
                            {" "}each
                          </span>

                          <span className="text-[#d4ad54]">
                            •
                          </span>

                          <span
                            className="
                              font-semibold
                              text-[#4a1815]
                            "
                          >
                            Qty: {item.qty}
                          </span>

                          {item.size && (
                            <>
                              <span className="text-[#d4ad54]">
                                •
                              </span>

                              <span
                                className="
                                  font-semibold
                                  text-[#4a1815]
                                "
                              >
                                Size:{" "}
                                {item.size}
                              </span>
                            </>
                          )}

                        </div>


                        <div
                          className="
                            mt-3
                            text-sm
                            font-bold
                            text-[#741522]
                          "
                        >
                          ₹
                          {item.price?.toLocaleString()}
                        </div>

                      </div>


                      <button
                        className="
                          hidden
                          h-8
                          w-8
                          items-center
                          justify-center
                          self-center
                          rounded-lg
                          text-[#b88732]
                          transition
                          hover:bg-[#f3e8d2]
                          sm:flex
                        "
                      >
                        <Star className="h-4 w-4" />
                      </button>

                    </motion.div>

                  )
                )}

              </div>

            </motion.section>


            {/* =================================================
                DELIVERY
            ================================================= */}

            {!order.orderReject && (
              <DeliveryEstimateSection
                order={order}
              />
            )}


            {/* =================================================
                SUPPORT
            ================================================= */}

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
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                border-[#d4ad54]/20
                bg-[#fffdf8]
                shadow-sm
              "
            >

              <div
                className="
                  bg-gradient-to-r
                  from-[#741522]
                  to-[#5f111b]
                  p-5
                  text-white
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-3
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
                      bg-white/10
                      text-[#f5d98a]
                    "
                  >
                    <HelpCircle className="h-5 w-5" />
                  </div>

                  <div>

                    <h2
                      className="
                        font-serif
                        text-lg
                        font-bold
                      "
                    >
                      Help & Support
                    </h2>

                    <p
                      className="
                        text-[10px]
                        text-white/60
                      "
                    >
                      We're here to help
                    </p>

                  </div>

                </div>

              </div>


              <div className="p-5">

                <div
                  className="
                    rounded-xl
                    border
                    border-[#d4ad54]/15
                    bg-[#faf6ee]
                    p-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-lg
                        bg-[#f3e8d2]
                        text-[#741522]
                      "
                    >
                      <RotateCcw className="h-4 w-4" />
                    </div>

                    <div>

                      <p
                        className="
                          text-sm
                          font-bold
                          text-[#4a1815]
                        "
                      >
                        Easy Returns
                      </p>

                      <p
                        className="
                          text-[10px]
                          text-[#806c63]
                        "
                      >
                        7-day return policy
                      </p>

                    </div>

                  </div>

                </div>


                <p
                  className="
                    mt-5
                    text-xs
                    text-[#806c63]
                  "
                >
                  Need immediate help with
                  your order?
                </p>

                <a
                  href="tel:+919907804710"
                  className="
                    mt-3
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#741522]
                    px-4
                    py-3
                    text-xs
                    font-bold
                    text-white
                    shadow-sm
                    transition
                    hover:bg-[#5f111b]
                  "
                >
                  <Phone className="h-4 w-4" />
                  Call Darsh Support
                </a>

              </div>

            </motion.section>

          </div>


          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div className="space-y-5">


            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

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
                delay: 0.15,
              }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/25
                bg-[#fffdf8]
                p-5
                shadow-sm
                sm:p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#d4ad54]/15
                  pb-4
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
                    bg-[#f3e8d2]
                    text-[#741522]
                  "
                >
                  <CreditCard className="h-5 w-5" />
                </div>

                <div>

                  <h2
                    className="
                      font-serif
                      text-lg
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    Order Summary
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-[#9b806d]
                    "
                  >
                    Payment information
                  </p>

                </div>

              </div>


              <div className="space-y-3 py-5">

                <div
                  className="
                    flex
                    justify-between
                    text-xs
                  "
                >
                  <span className="text-[#806c63]">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    ₹
                    {order.amount?.toLocaleString()}
                  </span>
                </div>


                <div
                  className="
                    flex
                    justify-between
                    text-xs
                  "
                >
                  <span className="text-[#806c63]">
                    Shipping
                  </span>

                  <span
                    className="
                      font-semibold
                      text-[#496b35]
                    "
                  >
                    Free
                  </span>
                </div>


                <div
                  className="
                    flex
                    justify-between
                    text-xs
                  "
                >
                  <span className="text-[#806c63]">
                    Tax
                  </span>

                  <span className="font-semibold">
                    Included
                  </span>
                </div>


                <div
                  className="
                    border-t
                    border-[#d4ad54]/15
                    pt-4
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                    "
                  >

                    <span
                      className="
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        font-serif
                        text-xl
                        font-bold
                        text-[#741522]
                      "
                    >
                      ₹
                      {order.amount?.toLocaleString()}
                    </span>

                  </div>

                </div>

              </div>


              <div
                className="
                  rounded-xl
                  bg-[#faf3e5]
                  p-3
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    text-xs
                  "
                >

                  <span className="text-[#806c63]">
                    Payment Method
                  </span>

                  <span className="font-bold text-[#4a1815]">
                    {order.paymentMethod ||
                      "UPI"}
                  </span>

                </div>


                <div
                  className="
                    mt-2
                    flex
                    items-center
                    justify-between
                    text-xs
                  "
                >

                  <span className="text-[#806c63]">
                    Payment Status
                  </span>

                  <span
                    className="
                      flex
                      items-center
                      gap-1
                      font-bold
                      capitalize
                      text-[#496b35]
                    "
                  >
                    <CheckCircle className="h-3.5 w-3.5" />
                    {order.payStatus}
                  </span>

                </div>

              </div>

            </motion.section>


            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

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
                delay: 0.25,
              }}
              className="
                rounded-2xl
                border
                border-[#d4ad54]/20
                bg-[#fffdf8]
                p-5
                shadow-sm
                sm:p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                  border-b
                  border-[#d4ad54]/15
                  pb-4
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
                    bg-[#f3e8d2]
                    text-[#741522]
                  "
                >
                  <MapPin className="h-5 w-5" />
                </div>

                <div>

                  <h2
                    className="
                      font-serif
                      text-lg
                      font-bold
                      text-[#4a1815]
                    "
                  >
                    Shipping Address
                  </h2>

                  <p
                    className="
                      text-[10px]
                      text-[#9b806d]
                    "
                  >
                    Delivery destination
                  </p>

                </div>

              </div>


              <div className="space-y-4 pt-5">

                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <User
                    className="
                      mt-0.5
                      h-4
                      w-4
                      flex-shrink-0
                      text-[#b88732]
                    "
                  />

                  <div>

                    <p
                      className="
                        text-sm
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      {order.userShipping
                        ?.FullName}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#806c63]
                      "
                    >
                      {order.userShipping
                        ?.Phone}
                    </p>

                  </div>

                </div>


                <div
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <Navigation
                    className="
                      mt-0.5
                      h-4
                      w-4
                      flex-shrink-0
                      text-[#b88732]
                    "
                  />

                  <div
                    className="
                      space-y-1
                      text-xs
                      leading-5
                      text-[#806c63]
                    "
                  >

                    <p>
                      {order.userShipping
                        ?.Add}
                    </p>

                    <p>
                      {order.userShipping
                        ?.VillorCity}
                      ,{" "}
                      {order.userShipping
                        ?.Dist}
                    </p>

                    <p>
                      {order.userShipping
                        ?.State}{" "}
                      -{" "}
                      {order.userShipping
                        ?.Pin}
                    </p>

                  </div>

                </div>

              </div>

            </motion.section>


            {/* =================================================
                PREMIUM SUPPORT
            ================================================= */}

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
                delay: 0.35,
              }}
              className="
                relative
                overflow-hidden
                rounded-2xl
                bg-gradient-to-br
                from-[#741522]
                to-[#5f111b]
                p-5
                text-white
                shadow-lg
              "
            >

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-8
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  bg-[#e7c875]/10
                  blur-2xl
                "
              />

              <div className="relative z-10">

                <div
                  className="
                    flex
                    items-center
                    gap-2
                  "
                >

                  <Shield
                    className="
                      h-5
                      w-5
                      text-[#f5d98a]
                    "
                  />

                  <h3
                    className="
                      font-serif
                      font-bold
                    "
                  >
                    Darsh Care
                  </h3>

                </div>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-5
                    text-white/65
                  "
                >
                  Need assistance with your
                  order? Our support team is
                  happy to help.
                </p>

                <a
                  href="tel:+919474048860"
                  className="
                    mt-4
                    flex
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    bg-[#f5d98a]
                    px-4
                    py-3
                    text-xs
                    font-bold
                    text-[#5f111b]
                    transition
                    hover:bg-white
                  "
                >

                  <PhoneCall className="h-4 w-4" />

                  +91 9907804710

                </a>

              </div>

            </motion.div>

          </div>

        </div>


        {/* ====================================================
            BOTTOM TRUST BAR
        ==================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5,
          }}
          className="
            flex
            flex-col
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-[#d4ad54]/20
            bg-gradient-to-r
            from-[#faf3e5]
            via-[#fffdf8]
            to-[#faf3e5]
            p-4
            text-center
            sm:flex-row
          "
        >

          <Shield
            className="
              h-4
              w-4
              text-[#b88732]
            "
          />

          <span
            className="
              text-[10px]
              font-medium
              text-[#806c63]
              sm:text-xs
            "
          >
            Your order information is securely
            managed by Darsh.
          </span>

          <Sparkles
            className="
              h-3.5
              w-3.5
              text-[#b88732]
            "
          />

        </motion.div>

      </main>

    </div>
  );
};

export default OrderDetails;