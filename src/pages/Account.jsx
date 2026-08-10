import React, { useState, useEffect } from "react";
import {
  User,
  MapPin,
  Package,
  LogOut,
  ChevronRight,
  HelpCircle,
  Phone,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import AccountInfo from "../components/AccountInfo";
import AddressInfo from "../components/AddressInfo";
import OrderInfo from "../components/MyOrders";

import { useNavigate, useSearchParams } from "react-router-dom";
import LogoutModal from "./LogoutModal";

import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext";


/* =========================================================
   DARSH SUPPORT CARD
========================================================= */

const SupportCard = () => {
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
      transition={{
        duration: 0.5,
      }}
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-[#d4ad54]/30
        bg-gradient-to-br
        from-[#fffdf8]
        via-[#f8f1e5]
        to-[#f3e4d0]
        p-4
        shadow-sm
        sm:p-5
      "
    >

      {/* Decorative glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-8
          -top-8
          h-20
          w-20
          rounded-full
          bg-[#d4ad54]/10
          blur-2xl
        "
      />

      <div className="relative z-10 text-center">

        {/* Icon */}

        <div
          className="
            mx-auto
            mb-3
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-[#d4ad54]/50
            bg-[#741522]
            text-[#f8f4eb]
            shadow-md
          "
        >
          <HelpCircle className="h-5 w-5" />
        </div>

        <h3
          className="
            text-sm
            font-bold
            text-[#4a1815]
            sm:text-base
          "
        >
          Need Help?
        </h3>

        <p
          className="
            mt-1
            text-xs
            leading-5
            text-[#806c63]
          "
        >
          Our Darsh support team is here to help you.
        </p>

        {/* Contact buttons */}

        <div className="mt-4 flex flex-col gap-2">

          <motion.button
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.97,
            }}
            onClick={() => {
              window.location.href = "tel:+917363054510";
            }}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#741522]
              px-3
              py-2.5
              text-xs
              font-semibold
              text-[#fffdf8]
              shadow-md
              transition-all
              duration-300
              hover:bg-[#5a1018]
              hover:shadow-lg
            "
          >
            <Phone className="h-4 w-4" />
            Call Support
          </motion.button>

        </div>

      </div>
    </motion.div>
  );
};


/* =========================================================
   ACCOUNT PAGE
========================================================= */

const Account = () => {

  /* =======================================================
     USER DATA
  ======================================================= */

  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");


  /* =======================================================
     STATE
  ======================================================= */

  const [showModal, setShowModal] = useState(false);

  const [comp, setComp] = useState(1);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const [isMobileMenuOpen, setIsMobileMenuOpen] =
    useState(false);


  const navigate = useNavigate();


  /* =======================================================
     APP CONTEXT
  ======================================================= */

  const { login } = useAppContext();


  /* =======================================================
     ACCOUNT TABS
  ======================================================= */

  const tabs = [
    {
      id: 1,
      label: "Profile",
      description: "Personal information",
      icon: <User className="h-4 w-4 sm:h-5 sm:w-5" />,
    },

    {
      id: 2,
      label: "Addresses",
      description: "Delivery addresses",
      icon: <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />,
    },

    {
      id: 3,
      label: "My Orders",
      description: "Order history",
      icon: <Package className="h-4 w-4 sm:h-5 sm:w-5" />,
    },

    {
      id: 7,
      label: "Logout",
      description: "Sign out safely",
      icon: <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />,
      isDanger: true,
    },
  ];


  /* =======================================================
     URL TAB SYNC
  ======================================================= */

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl) {
      const tabId = parseInt(tabFromUrl, 10);

      const validTab = tabs.some(
        (tab) => tab.id === tabId
      );

      if (validTab && tabId !== 7) {
        setComp(tabId);
      }
    }
  }, [searchParams]);


  /* =======================================================
     TAB CHANGE
  ======================================================= */

  const handleTabChange = (tabId) => {

    if (tabId === 7) {
      logOut();
      return;
    }

    setComp(tabId);

    setIsMobileMenuOpen(false);

    if (tabId === 1) {
      setSearchParams({});
    } else {
      setSearchParams({
        tab: tabId.toString(),
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };


  /* =======================================================
     LOGOUT
  ======================================================= */

  const logOut = () => {
    setShowModal(true);
  };


  /* =======================================================
     CONFIRM LOGOUT
  ======================================================= */

  const confirmLogout = () => {

    setShowModal(false);

    /* Logout sound */

    const audio = new Audio("./IMG/logout.mp3");

    audio.volume = 0.3;

    audio
      .play()
      .catch(() => {
        console.log(
          "Logout sound autoplay blocked"
        );
      });


    setIsLoggingOut(true);


    setTimeout(() => {

      localStorage.clear();

      navigate("/auth");

      window.location.reload();

    }, 1200);
  };


  /* =======================================================
     CANCEL LOGOUT
  ======================================================= */

  const cancelLogout = () => {
    setShowModal(false);
  };


  /* =======================================================
     GREETING
  ======================================================= */

  const getGreeting = () => {

    const hour = new Date().getHours();

    if (hour < 12) {
      return "Good Morning";
    }

    if (hour < 18) {
      return "Good Afternoon";
    }

    return "Good Evening";
  };


  /* =======================================================
     FIRST NAME
  ======================================================= */

  const displayName =
    userName?.trim()
      ? userName.split(" ")[0]
      : "Dear Customer";


  /* =======================================================
     CURRENT TAB
  ======================================================= */

  const currentTab =
    tabs.find((tab) => tab.id === comp) ||
    tabs[0];


  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <AnimatePresence mode="wait">

      {!isLoggingOut && (

        <motion.main
          key="account-page"

          initial={{
            opacity: 0,
          }}

          animate={{
            opacity: 1,
          }}

          exit={{
            opacity: 0,
            scale: 0.97,
          }}

          transition={{
            duration: 0.5,
          }}

          className="
            min-h-screen
            overflow-hidden
            bg-gradient-to-br
            from-[#fbf7ef]
            via-[#fffdf8]
            to-[#f3e8d2]
            font-sans
          "
        >

          {/* =================================================
              BACKGROUND DECORATION
          ================================================= */}

          <div
            className="
              pointer-events-none
              fixed
              -left-40
              -top-40
              h-80
              w-80
              rounded-full
              bg-[#741522]/5
              blur-3xl
            "
          />

          <div
            className="
              pointer-events-none
              fixed
              -bottom-40
              -right-40
              h-96
              w-96
              rounded-full
              bg-[#d4ad54]/10
              blur-3xl
            "
          />


          {/* =================================================
              MAIN CONTAINER
          ================================================= */}

          <div
            className="
              relative
              z-10
              mx-auto
              max-w-7xl
              px-3
              py-5
              sm:px-5
              sm:py-7
              lg:px-7
              lg:py-9
            "
          >

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <motion.div
              initial={{
                opacity: 0,
                y: -25,
              }}

              animate={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.6,
              }}

              className="
                mb-6
                flex
                flex-col
                items-center
                justify-between
                gap-4
                sm:mb-8
                lg:flex-row
              "
            >

              {/* Heading */}

              <div
                className="
                  text-center
                  lg:text-left
                "
              >

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-center
                    gap-2
                    lg:justify-start
                  "
                >

                  <Sparkles
                    className="
                      h-4
                      w-4
                      text-[#d4ad54]
                      animate-pulse
                    "
                  />

                  <span
                    className="
                      text-[8px]
                      font-semibold
                      uppercase
                      tracking-[0.3em]
                      text-[#9b7429]
                    "
                  >
                    DARSH ACCOUNT
                  </span>

                  <Sparkles
                    className="
                      h-4
                      w-4
                      text-[#d4ad54]
                      animate-pulse
                    "
                  />

                </div>


                <h1
                  className="
                    font-serif
                    text-2xl
                    font-semibold
                    leading-tight
                    text-[#5a1820]
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {getGreeting()},{" "}
                  <span className="text-[#741522]">
                    {displayName}!
                  </span>
                </h1>


                <p
                  className="
                    mt-2
                    text-xs
                    text-[#806c63]
                    sm:text-sm
                    lg:text-base
                  "
                >
                  Manage your profile, orders and
                  delivery preferences.
                </p>

              </div>


              {/* Member badge */}

              <div
                className="
                  flex
                  items-center
                  gap-3
                  rounded-full
                  border
                  border-[#d4ad54]/40
                  bg-[#fffdf8]/80
                  px-4
                  py-2
                  shadow-sm
                  backdrop-blur-sm
                "
              >

                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    text-[#f8f4eb]
                  "
                >
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>

                  <p
                    className="
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-wider
                      text-[#741522]
                    "
                  >
                    Darsh Member
                  </p>

                  <p
                    className="
                      text-[8px]
                      text-[#9b806d]
                    "
                  >
                    Your account is secure
                  </p>

                </div>

              </div>

            </motion.div>


            {/* =================================================
                CONTENT
            ================================================= */}

            <div
              className="
                flex
                flex-col
                gap-5
                lg:flex-row
                lg:gap-7
              "
            >

              {/* =================================================
                  DESKTOP SIDEBAR
              ================================================= */}

              <aside
                className="
                  hidden
                  w-72
                  flex-shrink-0
                  lg:block
                  xl:w-80
                "
              >

                <motion.div
                  initial={{
                    opacity: 0,
                    x: -25,
                  }}

                  animate={{
                    opacity: 1,
                    x: 0,
                  }}

                  transition={{
                    duration: 0.6,
                  }}

                  className="
                    sticky
                    top-5
                    overflow-hidden
                    rounded-3xl
                    border
                    border-[#d4ad54]/25
                    bg-[#fffdf8]/90
                    p-5
                    shadow-[0_20px_60px_rgba(63,22,22,0.08)]
                    backdrop-blur-xl
                    xl:p-6
                  "
                >

                  {/* =================================================
                      PROFILE
                  ================================================= */}

                  <div
                    className="
                      mb-6
                      text-center
                    "
                  >

                    <div
                      className="
                        relative
                        mx-auto
                        mb-4
                        h-24
                        w-24
                      "
                    >

                      {/* Glow */}

                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          bg-[#d4ad54]/30
                          blur-xl
                          animate-pulse
                        "
                      />

                      {/* Avatar */}

                      <div
                        className="
                          relative
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-[#fffdf8]
                          bg-gradient-to-br
                          from-[#f3e4d0]
                          to-[#ead9b7]
                          text-[#741522]
                          shadow-xl
                        "
                      >

                        <User className="h-10 w-10" />

                      </div>


                      {/* Online */}

                      <div
                        className="
                          absolute
                          bottom-1
                          right-1
                          h-5
                          w-5
                          rounded-full
                          border-4
                          border-[#fffdf8]
                          bg-[#b88732]
                          shadow-md
                        "
                      />

                    </div>


                    <h3
                      className="
                        truncate
                        text-lg
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      {userName || "Darsh Customer"}
                    </h3>


                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-[#806c63]
                      "
                    >
                      {userEmail ||
                        "customer@darsh.com"}
                    </p>


                    <span
                      className="
                        mt-3
                        inline-flex
                        items-center
                        gap-1.5
                        rounded-full
                        border
                        border-[#d4ad54]/30
                        bg-[#f3e8d2]
                        px-3
                        py-1
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-wider
                        text-[#741522]
                      "
                    >
                      <Sparkles className="h-3 w-3" />
                      Premium Member
                    </span>

                  </div>


                  {/* =================================================
                      NAVIGATION
                  ================================================= */}

                  <nav className="space-y-2">

                    {tabs.map((item) => {

                      const isActive =
                        comp === item.id;

                      return (
                        <motion.button
                          key={item.id}

                          whileHover={{
                            x: 4,
                          }}

                          whileTap={{
                            scale: 0.97,
                          }}

                          onClick={() =>
                            handleTabChange(item.id)
                          }

                          className={`
                            group
                            flex
                            w-full
                            items-center
                            gap-3
                            rounded-2xl
                            px-3
                            py-3
                            text-left
                            transition-all
                            duration-300
                            ${
                              isActive
                                ? "border border-[#d4ad54]/30 bg-gradient-to-r from-[#f3e8d2] to-[#f8f1e5] text-[#741522] shadow-sm"
                                : item.isDanger
                                ? "text-[#9b3f46] hover:bg-[#f8e8e8]"
                                : "text-[#806c63] hover:bg-[#f8f1e5] hover:text-[#741522]"
                            }
                          `}
                        >

                          {/* Icon */}

                          <div
                            className={`
                              flex
                              h-10
                              w-10
                              flex-shrink-0
                              items-center
                              justify-center
                              rounded-xl
                              transition-all
                              duration-300
                              ${
                                isActive
                                  ? "bg-[#741522] text-[#fffdf8] shadow-md"
                                  : item.isDanger
                                  ? "bg-[#f7e4e5] text-[#9b3f46]"
                                  : "bg-[#f3e8d2] text-[#806c63] group-hover:bg-[#ead9b7] group-hover:text-[#741522]"
                              }
                            `}
                          >
                            {item.icon}
                          </div>


                          {/* Text */}

                          <div className="min-w-0 flex-1">

                            <div
                              className={`
                                text-sm
                                font-semibold
                                ${
                                  item.isDanger
                                    ? "text-[#9b3f46]"
                                    : ""
                                }
                              `}
                            >
                              {item.label}
                            </div>

                            <div
                              className="
                                mt-0.5
                                truncate
                                text-[10px]
                                text-[#9b806d]
                              "
                            >
                              {item.description}
                            </div>

                          </div>


                          {/* Active indicator */}

                          {isActive && (
                            <div
                              className="
                                h-2
                                w-2
                                rounded-full
                                bg-[#d4ad54]
                                shadow-[0_0_8px_rgba(212,173,84,0.5)]
                              "
                            />
                          )}

                        </motion.button>
                      );
                    })}

                  </nav>


                  {/* =================================================
                      SUPPORT
                  ================================================= */}

                  <div
                    className="
                      mt-6
                      border-t
                      border-[#741522]/10
                      pt-5
                    "
                  >
                    <SupportCard />
                  </div>

                </motion.div>

              </aside>


              {/* =================================================
                  MAIN CONTENT
              ================================================= */}

              <section className="min-w-0 flex-1">

                {/* =================================================
                    DESKTOP CONTENT
                ================================================= */}

                <div className="hidden lg:block">

                  <AnimatePresence mode="wait">

                    <motion.div
                      key={comp}

                      initial={{
                        opacity: 0,
                        y: 20,
                      }}

                      animate={{
                        opacity: 1,
                        y: 0,
                      }}

                      exit={{
                        opacity: 0,
                        y: -15,
                      }}

                      transition={{
                        duration: 0.4,
                      }}

                      className="
                        min-h-[500px]
                        overflow-hidden
                        rounded-3xl
                        border
                        border-[#d4ad54]/20
                        bg-[#fffdf8]
                        p-5
                        shadow-[0_20px_60px_rgba(63,22,22,0.08)]
                        sm:p-7
                        lg:p-8
                      "
                    >

                      {comp === 1 && (
                        <AccountInfo />
                      )}

                      {comp === 2 && (
                        <AddressInfo />
                      )}

                      {comp === 3 && (
                        <OrderInfo />
                      )}

                    </motion.div>

                  </AnimatePresence>

                </div>


                {/* =================================================
                    MOBILE CONTENT
                ================================================= */}

                <div
                  className="
                    space-y-4
                    lg:hidden
                  "
                >

                  {/* =================================================
                      MOBILE PROFILE
                  ================================================= */}

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -20,
                    }}

                    animate={{
                      opacity: 1,
                      y: 0,
                    }}

                    className="
                      overflow-hidden
                      rounded-3xl
                      border
                      border-[#d4ad54]/25
                      bg-[#fffdf8]
                      p-5
                      text-center
                      shadow-[0_15px_40px_rgba(63,22,22,0.07)]
                    "
                  >

                    <div
                      className="
                        relative
                        mx-auto
                        mb-3
                        h-20
                        w-20
                      "
                    >

                      <div
                        className="
                          absolute
                          inset-0
                          rounded-full
                          bg-[#d4ad54]/25
                          blur-lg
                          animate-pulse
                        "
                      />

                      <div
                        className="
                          relative
                          flex
                          h-full
                          w-full
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-[#fffdf8]
                          bg-gradient-to-br
                          from-[#f3e4d0]
                          to-[#ead9b7]
                          text-[#741522]
                          shadow-lg
                        "
                      >
                        <User className="h-8 w-8" />
                      </div>

                    </div>


                    <h3
                      className="
                        truncate
                        text-lg
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      {userName || "Darsh Customer"}
                    </h3>


                    <p
                      className="
                        mt-1
                        truncate
                        text-xs
                        text-[#806c63]
                      "
                    >
                      {userEmail ||
                        "customer@darsh.com"}
                    </p>


                    <span
                      className="
                        mt-3
                        inline-flex
                        items-center
                        gap-1
                        rounded-full
                        bg-[#f3e8d2]
                        px-3
                        py-1
                        text-[9px]
                        font-semibold
                        text-[#741522]
                      "
                    >
                      <ShoppingBag className="h-3 w-3" />
                      Active Account
                    </span>

                  </motion.div>


                  {/* =================================================
                      MOBILE TAB SELECTOR
                  ================================================= */}

                  <motion.button
                    whileTap={{
                      scale: 0.98,
                    }}

                    onClick={() =>
                      setIsMobileMenuOpen(
                        !isMobileMenuOpen
                      )
                    }

                    className="
                      flex
                      w-full
                      items-center
                      justify-between
                      rounded-2xl
                      border
                      border-[#d4ad54]/25
                      bg-[#fffdf8]
                      p-4
                      text-left
                      shadow-md
                    "
                  >

                    <span className="flex items-center gap-3">

                      <div
                        className="
                          flex
                          h-9
                          w-9
                          items-center
                          justify-center
                          rounded-xl
                          bg-[#741522]
                          text-[#fffdf8]
                        "
                      >
                        {currentTab.icon}
                      </div>

                      <span>

                        <span
                          className="
                            block
                            text-sm
                            font-bold
                            text-[#4a1815]
                          "
                        >
                          {currentTab.label}
                        </span>

                        <span
                          className="
                            block
                            text-[10px]
                            text-[#9b806d]
                          "
                        >
                          {currentTab.description}
                        </span>

                      </span>

                    </span>


                    <motion.div
                      animate={{
                        rotate:
                          isMobileMenuOpen
                            ? 90
                            : 0,
                      }}

                      transition={{
                        duration: 0.3,
                      }}
                    >
                      <ChevronRight
                        className="
                          h-5
                          w-5
                          text-[#9b806d]
                        "
                      />
                    </motion.div>

                  </motion.button>


                  {/* =================================================
                      MOBILE MENU
                  ================================================= */}

                  <AnimatePresence>

                    {isMobileMenuOpen && (

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

                        transition={{
                          duration: 0.3,
                        }}

                        className="
                          overflow-hidden
                          rounded-2xl
                          border
                          border-[#d4ad54]/20
                          bg-[#fffdf8]
                          shadow-md
                        "
                      >

                        <div
                          className="
                            grid
                            grid-cols-2
                            gap-2
                            p-3
                          "
                        >

                          {tabs.map((tab) => {

                            const active =
                              comp === tab.id;

                            return (
                              <motion.button
                                key={tab.id}

                                whileTap={{
                                  scale: 0.95,
                                }}

                                onClick={() =>
                                  handleTabChange(
                                    tab.id
                                  )
                                }

                                className={`
                                  flex
                                  flex-col
                                  items-center
                                  justify-center
                                  rounded-xl
                                  p-3
                                  transition-all
                                  duration-300
                                  ${
                                    active
                                      ? "bg-[#f3e8d2] text-[#741522]"
                                      : tab.isDanger
                                      ? "text-[#9b3f46] hover:bg-[#f8e8e8]"
                                      : "text-[#806c63] hover:bg-[#f8f1e5]"
                                  }
                                `}
                              >

                                <div
                                  className={`
                                    mb-2
                                    flex
                                    h-9
                                    w-9
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${
                                      active
                                        ? "bg-[#741522] text-[#fffdf8]"
                                        : tab.isDanger
                                        ? "bg-[#f7e4e5] text-[#9b3f46]"
                                        : "bg-[#f3e8d2]"
                                    }
                                  `}
                                >
                                  {tab.icon}
                                </div>

                                <span
                                  className="
                                    text-[11px]
                                    font-semibold
                                  "
                                >
                                  {tab.label}
                                </span>

                              </motion.button>
                            );
                          })}

                        </div>

                      </motion.div>
                    )}

                  </AnimatePresence>


                  {/* =================================================
                      MOBILE MAIN CONTENT
                  ================================================= */}

                  <AnimatePresence mode="wait">

                    <motion.div
                      key={comp}

                      initial={{
                        opacity: 0,
                        x: 20,
                      }}

                      animate={{
                        opacity: 1,
                        x: 0,
                      }}

                      exit={{
                        opacity: 0,
                        x: -20,
                      }}

                      transition={{
                        duration: 0.4,
                      }}

                      className="
                        min-h-[400px]
                        overflow-hidden
                        rounded-3xl
                        border
                        border-[#d4ad54]/20
                        bg-[#fffdf8]
                        p-4
                        shadow-lg
                        sm:p-6
                      "
                    >

                      {comp === 1 && (
                        <AccountInfo />
                      )}

                      {comp === 2 && (
                        <AddressInfo />
                      )}

                      {comp === 3 && (
                        <OrderInfo />
                      )}

                    </motion.div>

                  </AnimatePresence>


                  {/* =================================================
                      MOBILE SUPPORT
                  ================================================= */}

                  <SupportCard />

                </div>

              </section>

            </div>


            {/* =================================================
                BOTTOM BRAND LINE
            ================================================= */}

            <div
              className="
                mt-8
                flex
                flex-col
                items-center
                justify-center
                gap-2
                text-center
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className="
                    h-px
                    w-8
                    bg-[#d4ad54]
                  "
                />

                <Sparkles
                  className="
                    h-3
                    w-3
                    text-[#d4ad54]
                  "
                />

                <span
                  className="
                    h-px
                    w-8
                    bg-[#d4ad54]
                  "
                />

              </div>

              <p
                className="
                  text-[8px]
                  uppercase
                  tracking-[0.3em]
                  text-[#9b806d]
                "
              >
                DARSH · Timeless Weaves
              </p>

            </div>

          </div>


          {/* =================================================
              LOGOUT MODAL
          ================================================= */}

          {showModal && (
            <LogoutModal
              onConfirm={confirmLogout}
              onCancel={cancelLogout}
            />
          )}

        </motion.main>

      )}

    </AnimatePresence>
  );
};


export default Account;