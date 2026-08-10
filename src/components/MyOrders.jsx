import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from "react";

import {
  ShoppingBag,
  Loader2,
  ArrowRight,
  ChevronUp,
  Package,
  CheckCircle,
  Truck,
  LayoutDashboard,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  AlertCircle,
  XCircle,
  Sparkles,
  Crown,
  Clock3,
  ShieldCheck,
} from "lucide-react";

import axios from "axios";
import { useAppContext } from "../context/AppContext";
import OrderDetails from "./OrderDetails";
import { useMediaQuery } from "react-responsive";
import { motion, AnimatePresence } from "framer-motion";


/* ============================================================
   ORDER SUMMARY CARD
============================================================ */

const OrderSummaryCard = ({
  title,
  count,
  icon,
  type,
  active,
  onClick,
}) => {
  return (
    <motion.button
      whileHover={{
        y: -4,
      }}
      whileTap={{
        scale: 0.97,
      }}
      onClick={onClick}
      className={`
        group
        relative
        w-full
        overflow-hidden
        rounded-2xl
        border
        p-4
        text-left
        shadow-sm
        transition-all
        duration-300
        sm:p-5
        ${
          active
            ? "border-[#d4ad54]/50 bg-[#741522] shadow-lg"
            : "border-[#d4ad54]/20 bg-[#fffdf8] hover:border-[#d4ad54]/40 hover:shadow-lg"
        }
      `}
    >
      {/* Decorative glow */}

      <div
        className={`
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          blur-2xl
          transition-opacity
          ${
            active
              ? "bg-[#e7c875]/15"
              : "bg-[#d4ad54]/10 opacity-0 group-hover:opacity-100"
          }
        `}
      />

      <div className="relative z-10 flex items-center gap-3">

        <div
          className={`
            flex
            h-11
            w-11
            flex-shrink-0
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300
            ${
              active
                ? "bg-white/10 text-[#f5d98a]"
                : "bg-[#f3e8d2] text-[#741522]"
            }
          `}
        >
          {React.cloneElement(icon, {
            className: "h-5 w-5",
          })}
        </div>

        <div className="min-w-0">

          <p
            className={`
              truncate
              text-[10px]
              font-semibold
              uppercase
              tracking-wider
              ${
                active
                  ? "text-white/65"
                  : "text-[#9b806d]"
              }
            `}
          >
            {title}
          </p>

          <h3
            className={`
              mt-1
              text-xl
              font-bold
              ${
                active
                  ? "text-[#f5d98a]"
                  : "text-[#4a1815]"
              }
              sm:text-2xl
            `}
          >
            {count}
          </h3>

        </div>

      </div>

    </motion.button>
  );
};


/* ============================================================
   STATUS BADGE
============================================================ */

const StatusBadge = ({
  trackingId,
  orderAccept,
  orderReject,
}) => {

  let config = {
    text: "New Order",
    bg: "bg-[#fff4cf]",
    textColor: "text-[#876517]",
    border: "border-[#e7c875]/40",
    icon: (
      <Package className="h-3.5 w-3.5" />
    ),
  };

  if (trackingId) {
    config = {
      text: "Dispatched",
      bg: "bg-[#f3e8d2]",
      textColor: "text-[#741522]",
      border: "border-[#d4ad54]/40",
      icon: (
        <Truck className="h-3.5 w-3.5" />
      ),
    };
  } else if (orderAccept) {
    config = {
      text: "Accepted",
      bg: "bg-[#f0f5e9]",
      textColor: "text-[#496b35]",
      border: "border-[#b7c99e]",
      icon: (
        <CheckCircle className="h-3.5 w-3.5" />
      ),
    };
  } else if (orderReject) {
    config = {
      text: "Rejected",
      bg: "bg-[#fff0ef]",
      textColor: "text-[#a13d3d]",
      border: "border-red-200",
      icon: (
        <XCircle className="h-3.5 w-3.5" />
      ),
    };
  }

  return (
    <span
      className={`
        inline-flex
        items-center
        gap-1.5
        rounded-full
        border
        px-2.5
        py-1
        text-[10px]
        font-bold
        ${config.bg}
        ${config.textColor}
        ${config.border}
      `}
    >
      {config.icon}
      {config.text}
    </span>
  );
};


/* ============================================================
   MAIN COMPONENT
============================================================ */

const MyOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [showScrollTop, setShowScrollTop] =
    useState(false);

  const [isSummaryVisible, setIsSummaryVisible] =
    useState(false);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [refreshing, setRefreshing] =
    useState(false);

  const { token, url } = useAppContext();

  const isMobile = useMediaQuery({
    maxWidth: 767,
  });


  /* ============================================================
     FETCH ORDERS
  ============================================================ */

  const fetchMyOrders = useCallback(
    async (showRefresh = false) => {

      if (!token) {
        setError(
          "You must be logged in to view your orders."
        );

        setLoading(false);
        return;
      }

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError(null);

      try {

        const response = await axios.get(
          `${url}/api/payment/getOrderById`,
          {
            headers: {
              Auth: token,
            },
          }
        );

        setOrders(
          response.data.orders || []
        );

      } catch (err) {

        console.error(
          "Error fetching orders:",
          err
        );

        setError(
          "Failed to fetch orders. Please try again."
        );

      } finally {

        setLoading(false);
        setRefreshing(false);

      }

    },
    [token, url]
  );


  /* ============================================================
     INITIAL FETCH
  ============================================================ */

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);


  /* ============================================================
     SCROLL BUTTON
  ============================================================ */

  useEffect(() => {

    const handleScroll = () => {
      setShowScrollTop(
        window.scrollY > 300
      );
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };

  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* ============================================================
     PAID ORDERS
  ============================================================ */

  const paidOrders = useMemo(
    () =>
      orders.filter(
        (order) =>
          order.payStatus === "paid"
      ),
    [orders]
  );


  /* ============================================================
     FILTERED ORDERS
  ============================================================ */

  const filteredOrders = useMemo(() => {

    return paidOrders.filter(
      (order) => {

        const orderId =
          order._id?.toLowerCase() || "";

        const amount =
          order.amount?.toString() || "";

        const query =
          searchTerm.toLowerCase();

        const matchesSearch =
          orderId.includes(query) ||
          amount.includes(query);

        const matchesStatus =
          statusFilter === "all" ||
          (
            statusFilter === "new" &&
            !order.orderAccept &&
            !order.orderReject &&
            !order.trackingId
          ) ||
          (
            statusFilter === "accepted" &&
            order.orderAccept
          ) ||
          (
            statusFilter === "dispatched" &&
            order.trackingId
          ) ||
          (
            statusFilter === "rejected" &&
            order.orderReject
          );

        return (
          matchesSearch &&
          matchesStatus
        );
      }
    );

  }, [
    paidOrders,
    searchTerm,
    statusFilter,
  ]);


  /* ============================================================
     ORDER COUNTS
  ============================================================ */

  const orderCounts = useMemo(() => {

    const counts = {
      total: paidOrders.length,
      new: 0,
      accepted: 0,
      dispatched: 0,
      rejected: 0,
    };

    paidOrders.forEach(
      (order) => {

        if (order.trackingId) {

          counts.dispatched += 1;

        } else if (order.orderAccept) {

          counts.accepted += 1;

        } else if (order.orderReject) {

          counts.rejected += 1;

        } else {

          counts.new += 1;

        }

      }
    );

    return counts;

  }, [paidOrders]);


  /* ============================================================
     SUMMARY CLICK
  ============================================================ */

  const handleSummaryClick = (
    type
  ) => {

    if (isMobile) {
      setIsSummaryVisible(false);
    }

    setStatusFilter(
      type === "total"
        ? "all"
        : type
    );

    setTimeout(() => {

      document
        .getElementById(
          "orders-section"
        )
        ?.scrollIntoView({
          behavior: "smooth",
        });

    }, 100);

  };


  /* ============================================================
     SELECT ORDER
  ============================================================ */

  if (selectedOrder) {

    return (
      <OrderDetails
        order={selectedOrder}
        onClose={() =>
          setSelectedOrder(null)
        }
        onRefresh={() =>
          fetchMyOrders(true)
        }
      />
    );

  }


  /* ============================================================
     LOADING
  ============================================================ */

  if (loading) {

    return (
      <div
        className="
          flex
          min-h-[65vh]
          flex-col
          items-center
          justify-center
          bg-gradient-to-br
          from-[#faf3e5]
          via-[#fffdf8]
          to-[#f3e8d2]
          px-4
        "
      >

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border-4
            border-[#ead9b7]
            border-t-[#741522]
          "
        >
          <ShoppingBag
            className="
              h-6
              w-6
              text-[#741522]
            "
          />
        </motion.div>

        <h2
          className="
            mt-6
            font-serif
            text-xl
            font-bold
            text-[#4a1815]
          "
        >
          Preparing Your Orders
        </h2>

        <p
          className="
            mt-2
            text-xs
            text-[#806c63]
          "
        >
          Getting your Darsh shopping history ready...
        </p>

      </div>
    );

  }


  /* ============================================================
     ERROR
  ============================================================ */

  if (error) {

    return (
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="
          flex
          min-h-[65vh]
          flex-col
          items-center
          justify-center
          bg-[#fffdf8]
          px-4
          text-center
        "
      >

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-red-200
            bg-red-50
          "
        >
          <AlertCircle
            className="
              h-9
              w-9
              text-red-500
            "
          />
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
          Order History Unavailable
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-[#806c63]
          "
        >
          {error}
        </p>

        <motion.button
          whileHover={{
            scale: 1.04,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() =>
            fetchMyOrders()
          }
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
            hover:bg-[#5f111b]
          "
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </motion.button>

      </motion.div>
    );

  }


  /* ============================================================
     NO ORDERS
  ============================================================ */

  if (paidOrders.length === 0) {

    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        className="
          flex
          min-h-[65vh]
          flex-col
          items-center
          justify-center
          bg-gradient-to-br
          from-[#faf3e5]
          via-[#fffdf8]
          to-[#f3e8d2]
          px-4
          text-center
        "
      >

        <motion.div
          animate={{
            y: [0, -7, 0],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
          }}
          className="
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            border
            border-[#d4ad54]/40
            bg-[#f3e8d2]
            text-[#741522]
            shadow-lg
          "
        >
          <ShoppingBag className="h-11 w-11" />
        </motion.div>

        <h2
          className="
            mt-7
            font-serif
            text-2xl
            font-bold
            text-[#4a1815]
            sm:text-3xl
          "
        >
          No Orders Yet
        </h2>

        <p
          className="
            mt-2
            max-w-md
            text-sm
            leading-6
            text-[#806c63]
          "
        >
          Your completed purchases will appear
          here. Discover beautiful collections
          from Darsh and start your journey.
        </p>

        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
          onClick={() =>
            (window.location.href = "/")
          }
          className="
            mt-7
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-[#741522]
            px-7
            py-3
            text-sm
            font-bold
            text-white
            shadow-lg
            hover:bg-[#5f111b]
          "
        >
          <ShoppingBag className="h-4 w-4" />
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </motion.button>

      </motion.div>
    );

  }


  /* ============================================================
     MAIN PAGE
  ============================================================ */

  return (

    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#fffdf8]
      "
    >

      {/* Background decorative glow */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          top-40
          h-64
          w-64
          rounded-full
          bg-[#d4ad54]/8
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-32
          top-20
          h-72
          w-72
          rounded-full
          bg-[#741522]/5
          blur-3xl
        "
      />


      <div
        className="
          relative
          z-10
          mx-auto
          max-w-7xl
          space-y-5
          px-4
          py-5
          sm:space-y-7
          sm:px-6
          sm:py-7
          lg:px-8
        "
      >

        {/* =====================================================
            PAGE HEADER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -20,
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
            rounded-3xl
            border
            border-[#d4ad54]/25
            bg-gradient-to-r
            from-[#741522]
            via-[#851c28]
            to-[#5f111b]
            p-5
            shadow-lg
            sm:p-7
          "
        >

          <div
            className="
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-36
              w-36
              rounded-full
              bg-[#e7c875]/10
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              h-20
              w-40
              -translate-x-1/2
              rounded-full
              bg-white/5
              blur-2xl
            "
          />

          <div
            className="
              relative
              z-10
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div className="flex items-center gap-4">

              <motion.div
                animate={{
                  y: [0, -3, 0],
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
                <ShoppingBag className="h-7 w-7" />
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
                      text-[#e7c875]
                    "
                  />

                  <span
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.3em]
                      text-[#f5d98a]
                    "
                  >
                    Darsh Collection
                  </span>

                </div>

                <h1
                  className="
                    mt-1
                    font-serif
                    text-2xl
                    font-bold
                    text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  My Orders
                </h1>

                <p
                  className="
                    mt-1
                    text-xs
                    text-white/65
                    sm:text-sm
                  "
                >
                  Manage and track your purchases in one place
                </p>

              </div>

            </div>


            {/* Refresh */}

            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              onClick={() =>
                fetchMyOrders(true)
              }
              disabled={refreshing}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#e7c875]/40
                bg-white/10
                px-4
                py-2.5
                text-xs
                font-bold
                text-[#f8e8b2]
                backdrop-blur-sm
                transition-all
                hover:bg-white/20
                disabled:opacity-50
                sm:text-sm
              "
            >

              <RefreshCw
                className={`
                  h-4
                  w-4
                  ${
                    refreshing
                      ? "animate-spin"
                      : ""
                  }
                `}
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh Orders"}

            </motion.button>

          </div>

        </motion.div>


        {/* =====================================================
            MOBILE SUMMARY TOGGLE
        ===================================================== */}

        {isMobile && (

          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            onClick={() =>
              setIsSummaryVisible(
                !isSummaryVisible
              )
            }
            className="
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#d4ad54]/20
              bg-[#fffdf8]
              py-3
              text-xs
              font-bold
              text-[#741522]
              shadow-sm
            "
          >

            <LayoutDashboard className="h-4 w-4" />

            {isSummaryVisible
              ? "Hide Order Summary"
              : "Show Order Summary"}

            <ChevronUp
              className={`
                h-4
                w-4
                transition-transform
                ${
                  isSummaryVisible
                    ? "rotate-180"
                    : ""
                }
              `}
            />

          </motion.button>

        )}


        {/* =====================================================
            SUMMARY CARDS
        ===================================================== */}

        <AnimatePresence>

          {(isSummaryVisible ||
            !isMobile) && (

            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="
                grid
                grid-cols-2
                gap-3
                overflow-hidden
                lg:grid-cols-5
              "
            >

              <OrderSummaryCard
                title="Total Orders"
                count={orderCounts.total}
                icon={<ShoppingBag />}
                active={
                  statusFilter === "all"
                }
                onClick={() =>
                  handleSummaryClick(
                    "total"
                  )
                }
              />

              <OrderSummaryCard
                title="New"
                count={orderCounts.new}
                icon={<Package />}
                active={
                  statusFilter === "new"
                }
                onClick={() =>
                  handleSummaryClick(
                    "new"
                  )
                }
              />

              <OrderSummaryCard
                title="Accepted"
                count={orderCounts.accepted}
                icon={<CheckCircle />}
                active={
                  statusFilter === "accepted"
                }
                onClick={() =>
                  handleSummaryClick(
                    "accepted"
                  )
                }
              />

              <OrderSummaryCard
                title="Dispatched"
                count={orderCounts.dispatched}
                icon={<Truck />}
                active={
                  statusFilter === "dispatched"
                }
                onClick={() =>
                  handleSummaryClick(
                    "dispatched"
                  )
                }
              />

              <OrderSummaryCard
                title="Rejected"
                count={orderCounts.rejected}
                icon={<XCircle />}
                active={
                  statusFilter === "rejected"
                }
                onClick={() =>
                  handleSummaryClick(
                    "rejected"
                  )
                }
              />

            </motion.div>

          )}

        </AnimatePresence>


        {/* =====================================================
            SEARCH + FILTER
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
            delay: 0.1,
          }}
          className="
            rounded-2xl
            border
            border-[#d4ad54]/20
            bg-[#fffdf8]
            p-4
            shadow-sm
            sm:p-5
          "
        >

          <div
            className="
              flex
              flex-col
              gap-3
              lg:flex-row
              lg:items-center
            "
          >

            {/* Search */}

            <div className="relative flex-1">

              <Search
                className="
                  absolute
                  left-3
                  top-1/2
                  h-4
                  w-4
                  -translate-y-1/2
                  text-[#a48455]
                "
              />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(
                    e.target.value
                  )
                }
                placeholder="Search by order ID or amount..."
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#d4ad54]/20
                  bg-[#faf6ee]
                  py-3
                  pl-10
                  pr-4
                  text-sm
                  text-[#4a1815]
                  outline-none
                  transition-all
                  placeholder:text-[#b5a59b]
                  focus:border-[#741522]
                  focus:bg-[#fffdf8]
                  focus:ring-2
                  focus:ring-[#d4ad54]/15
                "
              />

            </div>


            {/* Filter */}

            <div
              className="
                flex
                items-center
                gap-2
              "
            >

              <Filter
                className="
                  hidden
                  h-4
                  w-4
                  text-[#a48455]
                  sm:block
                "
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(
                    e.target.value
                  )
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#d4ad54]/20
                  bg-[#faf6ee]
                  px-4
                  py-3
                  text-xs
                  font-semibold
                  text-[#4a1815]
                  outline-none
                  focus:border-[#741522]
                  sm:w-auto
                "
              >

                <option value="all">
                  All Orders
                </option>

                <option value="new">
                  New Orders
                </option>

                <option value="accepted">
                  Accepted
                </option>

                <option value="dispatched">
                  Dispatched
                </option>

                <option value="rejected">
                  Rejected
                </option>

              </select>

            </div>

          </div>

        </motion.div>


        {/* =====================================================
            ORDERS
        ===================================================== */}

        <div
          id="orders-section"
          className="space-y-4 sm:space-y-5"
        >

          <div
            className="
              flex
              flex-col
              gap-2
              sm:flex-row
              sm:items-center
              sm:justify-between
            "
          >

            <div>

              <h3
                className="
                  font-serif
                  text-xl
                  font-bold
                  text-[#4a1815]
                "
              >
                Your Orders
              </h3>

              <p
                className="
                  mt-1
                  text-[10px]
                  text-[#9b806d]
                  sm:text-xs
                "
              >
                {filteredOrders.length} order
                {filteredOrders.length !== 1
                  ? "s"
                  : ""}{" "}
                displayed
              </p>

            </div>


            {(searchTerm ||
              statusFilter !== "all") && (

              <button
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="
                  w-fit
                  text-xs
                  font-semibold
                  text-[#741522]
                  hover:text-[#b88732]
                "
              >
                Clear Filters
              </button>

            )}

          </div>


          {/* No filtered orders */}

          {filteredOrders.length === 0 ? (

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                rounded-3xl
                border
                border-[#d4ad54]/20
                bg-[#fffdf8]
                px-5
                py-14
                text-center
                shadow-sm
              "
            >

              <div
                className="
                  mx-auto
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-[#f3e8d2]
                  text-[#741522]
                "
              >
                <Filter className="h-7 w-7" />
              </div>

              <h3
                className="
                  mt-5
                  font-serif
                  text-lg
                  font-bold
                  text-[#4a1815]
                "
              >
                No Orders Found
              </h3>

              <p
                className="
                  mx-auto
                  mt-2
                  max-w-sm
                  text-xs
                  leading-5
                  text-[#806c63]
                "
              >
                Try changing your search or
                order status filter.
              </p>

            </motion.div>

          ) : (

            <div className="space-y-4">

              {filteredOrders.map(
                (order, index) => (

                  <motion.div
                    key={order._id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.06,
                      duration: 0.4,
                    }}
                    whileHover={{
                      y: -3,
                    }}
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-2xl
                      border
                      border-[#d4ad54]/20
                      bg-[#fffdf8]
                      p-4
                      shadow-sm
                      transition-all
                      duration-300
                      hover:border-[#d4ad54]/40
                      hover:shadow-lg
                      sm:p-5
                    "
                  >

                    {/* Gold top line */}

                    <div
                      className="
                        absolute
                        left-0
                        right-0
                        top-0
                        h-0.5
                        bg-gradient-to-r
                        from-transparent
                        via-[#d4ad54]
                        to-transparent
                        opacity-0
                        transition-opacity
                        group-hover:opacity-100
                      "
                    />


                    <div
                      className="
                        flex
                        flex-col
                        gap-4
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                      "
                    >

                      {/* Order details */}

                      <div className="min-w-0 flex-1">

                        <div
                          className="
                            flex
                            flex-col
                            gap-2
                            sm:flex-row
                            sm:items-center
                            sm:gap-3
                          "
                        >

                          <div
                            className="
                              flex
                              h-9
                              w-9
                              flex-shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              bg-[#f3e8d2]
                              text-[#741522]
                            "
                          >
                            <Package className="h-4 w-4" />
                          </div>

                          <div className="min-w-0">

                            <p
                              className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-[#9b806d]
                              "
                            >
                              Order ID
                            </p>

                            <p
                              className="
                                mt-0.5
                                truncate
                                font-mono
                                text-xs
                                font-semibold
                                text-[#4a1815]
                              "
                            >
                              {order._id}
                            </p>

                          </div>

                          <StatusBadge
                            trackingId={
                              order.trackingId
                            }
                            orderAccept={
                              order.orderAccept
                            }
                            orderReject={
                              order.orderReject
                            }
                          />

                        </div>


                        {/* Amount */}

                        <div
                          className="
                            mt-4
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                          "
                        >

                          <div>

                            <p
                              className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-[#9b806d]
                              "
                            >
                              Order Value
                            </p>

                            <p
                              className="
                                mt-0.5
                                text-xl
                                font-bold
                                text-[#741522]
                              "
                            >
                              ₹{order.amount}
                            </p>

                          </div>


                          <div
                            className="
                              h-8
                              w-px
                              bg-[#d4ad54]/20
                            "
                          />


                          <div>

                            <p
                              className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-[#9b806d]
                              "
                            >
                              Items
                            </p>

                            <p
                              className="
                                mt-1
                                flex
                                items-center
                                gap-1.5
                                text-sm
                                font-semibold
                                text-[#4a1815]
                              "
                            >
                              <ShoppingBag className="h-3.5 w-3.5 text-[#b88732]" />

                              {order.orderItems
                                ?.length || 0}
                            </p>

                          </div>


                          <div
                            className="
                              h-8
                              w-px
                              bg-[#d4ad54]/20
                            "
                          />


                          <div>

                            <p
                              className="
                                text-[9px]
                                font-bold
                                uppercase
                                tracking-wider
                                text-[#9b806d]
                              "
                            >
                              Payment
                            </p>

                            <p
                              className="
                                mt-1
                                flex
                                items-center
                                gap-1.5
                                text-xs
                                font-bold
                                text-[#496b35]
                              "
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                              Paid
                            </p>

                          </div>

                        </div>

                      </div>


                      {/* Action */}

                      <motion.button
                        whileHover={{
                          scale: 1.03,
                        }}
                        whileTap={{
                          scale: 0.97,
                        }}
                        onClick={() => {

                          setSelectedOrder(
                            order
                          );

                          scrollToTop();

                        }}
                        className="
                          flex
                          w-full
                          items-center
                          justify-center
                          gap-2
                          rounded-xl
                          bg-[#741522]
                          px-5
                          py-3
                          text-xs
                          font-bold
                          text-white
                          shadow-md
                          transition-all
                          duration-300
                          hover:bg-[#5f111b]
                          hover:shadow-lg
                          sm:w-auto
                        "
                      >

                        View Details

                        <ArrowRight
                          className="
                            h-4
                            w-4
                            transition-transform
                            group-hover:translate-x-1
                          "
                        />

                      </motion.button>

                    </div>

                  </motion.div>

                )
              )}

            </div>

          )}

        </div>


        {/* =====================================================
            TRUST FOOTER
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
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

          <ShieldCheck
            className="
              h-4
              w-4
              text-[#b88732]
            "
          />

          <p
            className="
              text-[10px]
              font-medium
              text-[#806c63]
              sm:text-xs
            "
          >
            Your orders are securely managed
            through your Darsh account.
          </p>

          <Sparkles
            className="
              h-3.5
              w-3.5
              text-[#b88732]
            "
          />

        </motion.div>

      </div>


      {/* =====================================================
          SCROLL TOP
      ===================================================== */}

      <AnimatePresence>

        {showScrollTop && (

          <motion.button
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            whileHover={{
              scale: 1.08,
            }}
            whileTap={{
              scale: 0.92,
            }}
            onClick={scrollToTop}
            className="
              fixed
              bottom-5
              right-5
              z-50
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-[#e7c875]/40
              bg-[#741522]
              text-[#f5d98a]
              shadow-xl
              sm:bottom-7
              sm:right-7
            "
          >
            <ChevronUp className="h-5 w-5" />
          </motion.button>

        )}

      </AnimatePresence>

    </div>
  );
};

export default MyOrders;