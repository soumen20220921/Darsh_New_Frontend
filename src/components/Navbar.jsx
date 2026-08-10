import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingBag,
  Menu,
  X,
  UserRound,
  Package,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    setLogin,
    totalItems,
    order = [],
  } = useAppContext();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  // ============================================================
  // DARSH LOGO
  // ============================================================

  const logoSrc = "/IMG/Logo.jpg";

  // ============================================================
  // USER NAME
  // ============================================================

  const userName = localStorage.getItem("name");

  // ============================================================
  // PAID ORDER COUNT
  // ============================================================

  const paidOrderCount = Array.isArray(order)
    ? order.filter(
        (item) =>
          item?.payStatus &&
          item.payStatus.toLowerCase() === "paid"
      ).length
    : 0;

  // ============================================================
  // LOGIN CHECK
  // ============================================================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogin(true);
    }
  }, [setLogin]);

  // ============================================================
  // SCROLL EFFECT
  // ============================================================

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // ============================================================
  // CLOSE MOBILE MENU WHEN ROUTE CHANGES
  // ============================================================

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  // ============================================================
  // PREVENT BODY SCROLL WHEN MOBILE MENU IS OPEN
  // ============================================================

  useEffect(() => {
    if (mobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenu]);

  // ============================================================
  // NAVIGATION
  // ============================================================

  const goTo = (path) => {
    setMobileMenu(false);

    navigate(path);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  // ============================================================
  // ACTIVE ROUTE
  // ============================================================

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  return (
    <>
      {/* ========================================================
          ANNOUNCEMENT BAR
      ======================================================== */}

      <div
        className="
          relative
          z-[70]
          h-[31px]
          overflow-hidden
          bg-[#741522]
          text-[#FFF9F0]
          flex
          items-center
          justify-center
        "
      >
        <div
          className="
            flex
            items-center
            whitespace-nowrap
            text-[5.5px]
            font-medium
            tracking-[0.28em]
            sm:text-[9px]
            sm:tracking-[0.32em]
          "
        >
          <span>FREE SHIPPING ACROSS INDIA</span>

          <span className="mx-2 opacity-50 sm:mx-3">
            ◆
          </span>

          <span>HANDLOOM COLLECTION</span>

          <span className="mx-2 opacity-50 sm:mx-3">
            ◆
          </span>

          <span>CRAFTED WITH LOVE</span>
        </div>

        {/* Shine */}

        <div
          className="
            absolute
            top-0
            -left-[100%]
            h-full
            w-[35%]
            bg-gradient-to-r
            from-transparent
            via-white/10
            to-transparent
            animate-[navbarShine_6s_ease-in-out_infinite]
          "
        />
      </div>

      {/* ========================================================
          MAIN NAVBAR
      ======================================================== */}

      <header
        className={`
          sticky
          top-0
          z-[60]
          border-b
          border-[#741522]/10
          bg-[#F8F5ED]/95
          backdrop-blur-xl
          transition-all
          duration-500
          ease-out

          ${
            scrolled
              ? "shadow-[0_8px_30px_rgba(74,35,25,0.10)]"
              : "shadow-none"
          }
        `}
      >
        <div
          className={`
            relative
            mx-auto
            flex
            max-w-[1500px]
            items-center
            justify-between
            px-4
            sm:px-7
            lg:px-12

            transition-all
            duration-500

            ${
              scrolled
                ? "h-[64px] sm:h-[70px]"
                : "h-[75px] sm:h-[84px]"
            }
          `}
        >
          {/* ==================================================
              DARSH CIRCULAR LOGO
          ================================================== */}

          <Link
            to="/"
            aria-label="Darsh Home"
            onClick={() => {
              setMobileMenu(false);

              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            className="
              group
              relative
              flex
              items-center
              select-none
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.7,
                rotate: -10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`
                relative
                flex
                items-center
                justify-center
                rounded-full
                transition-all
                duration-500

                ${
                  scrolled
                    ? "h-[52px] w-[52px] sm:h-[58px] sm:w-[58px]"
                    : "h-[61px] w-[61px] sm:h-[68px] sm:w-[68px]"
                }
              `}
            >
              {/* Soft Glow */}

              <div
                className="
                  absolute
                  -inset-2
                  rounded-full
                  bg-[#C9A24A]/10
                  blur-lg
                  opacity-0
                  transition-all
                  duration-500
                  group-hover:opacity-100
                  group-hover:scale-110
                "
              />

              {/* Outer Circle */}

              <div
                className="
                  absolute
                  inset-0
                  rounded-full
                  border
                  border-[#C9A24A]
                  bg-[#FFFDF8]
                  shadow-[0_5px_20px_rgba(116,21,34,0.12)]
                  transition-all
                  duration-500
                  group-hover:border-[#741522]
                  group-hover:shadow-[0_8px_28px_rgba(201,162,74,0.28)]
                "
              />

              {/* Inner Circle */}

              <div
                className="
                  absolute
                  inset-[5px]
                  rounded-full
                  border
                  border-[#C9A24A]/40
                  pointer-events-none
                  transition-all
                  duration-500
                  group-hover:inset-[4px]
                  group-hover:border-[#C9A24A]/70
                "
              />

              {/* Top Decorative Dot */}

              <span
                className="
                  absolute
                  top-[6px]
                  left-1/2
                  z-20
                  h-[3px]
                  w-[3px]
                  -translate-x-1/2
                  rounded-full
                  bg-[#C9A24A]
                "
              />

              {/* Bottom Decorative Dot */}

              <span
                className="
                  absolute
                  bottom-[6px]
                  left-1/2
                  z-20
                  h-[3px]
                  w-[3px]
                  -translate-x-1/2
                  rounded-full
                  bg-[#C9A24A]
                "
              />

              {/* Left Decorative Dot */}

              <span
                className="
                  absolute
                  left-[6px]
                  top-1/2
                  z-20
                  h-[2px]
                  w-[2px]
                  -translate-y-1/2
                  rounded-full
                  bg-[#C9A24A]
                "
              />

              {/* Right Decorative Dot */}

              <span
                className="
                  absolute
                  right-[6px]
                  top-1/2
                  z-20
                  h-[2px]
                  w-[2px]
                  -translate-y-1/2
                  rounded-full
                  bg-[#C9A24A]
                "
              />

              {/* Logo Image */}

              <motion.img
                src={logoSrc}
                alt="Darsh"
                whileHover={{
                  scale: 1.07,
                }}
                transition={{
                  duration: 0.35,
                  ease: "easeOut",
                }}
                className="
                  relative
                  z-10
                  h-[76%]
                  w-[76%]
                  rounded-full
                  object-contain
                  p-1
                  mix-blend-multiply
                "
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />

              {/* Animated Sparkle */}

              <motion.div
                animate={{
                  scale: [1, 1.18, 1],
                  rotate: [0, 8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="
                  absolute
                  -right-[3px]
                  -top-[3px]
                  z-30
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-[#FFFDF8]
                  shadow-sm
                "
              >
                <Sparkles
                  size={11}
                  strokeWidth={1.5}
                  className="text-[#C9A24A]"
                />
              </motion.div>
            </motion.div>

            {/* Desktop Brand Text */}

            <div
              className="
                ml-3
                flex-col
                justify-center
              "
            >
              <span
                className="
                  font-serif
                  text-[15px]
                  font-semibold
                  tracking-[0.25em]
                  text-[#741522]
                "
              >
                DARSH
              </span>

              <span
                className="
                  mt-0.5
                  hidden 
                  sm:flex
                  text-[6.5px]
                  font-medium
                  tracking-[0.28em]
                  text-[#806B63]
                "
              >
                HANDWOVEN SAREES
              </span>
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
          ================================================== */}

          <nav
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-8
              lg:flex
              xl:gap-11
            "
          >
            {/* SHOP */}

            <button
              onClick={() => goTo("/")}
              className={`
                group
                relative
                py-3
                text-[10px]
                font-medium
                tracking-[0.28em]
                transition-colors
                duration-300
                xl:text-[11px]

                ${
                  isActive("/")
                    ? "text-[#741522]"
                    : "text-[#806B63] hover:text-[#741522]"
                }
              `}
            >
              SHOP

              <span
                className={`
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  bg-[#741522]
                  transition-all
                  duration-500

                  ${
                    isActive("/")
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }
                `}
              />
            </button>

            {/* NEW ARRIVALS */}

            <button
              onClick={() => goTo("/newarrivals")}
              className="
                group
                relative
                flex
                items-center
                gap-1.5
                py-3
                text-[10px]
                font-medium
                tracking-[0.25em]
                text-[#806B63]
                transition-colors
                duration-300
                hover:text-[#741522]
                xl:text-[11px]
              "
            >
              NEW ARRIVALS

              <Sparkles
                size={11}
                strokeWidth={1.5}
                className="
                  text-[#C9A24A]
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-0
                  bg-[#741522]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>

            {/* HOT SALES */}

            <button
              onClick={() => goTo("/hotsales")}
              className="
                group
                relative
                py-3
                text-[10px]
                font-medium
                tracking-[0.28em]
                text-[#806B63]
                transition-colors
                duration-300
                hover:text-[#741522]
                xl:text-[11px]
              "
            >
              HOT SALES

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-0
                  bg-[#741522]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>

            {/* OUR STORY */}

            <button
              onClick={() => goTo("/aboutus")}
              className="
                group
                relative
                py-3
                text-[10px]
                font-medium
                tracking-[0.28em]
                text-[#806B63]
                transition-colors
                duration-300
                hover:text-[#741522]
                xl:text-[11px]
              "
            >
              OUR STORY

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-0
                  bg-[#741522]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>

            {/* CONTACT */}

            <button
              onClick={() => goTo("/contactus")}
              className="
                group
                relative
                py-3
                text-[10px]
                font-medium
                tracking-[0.28em]
                text-[#806B63]
                transition-colors
                duration-300
                hover:text-[#741522]
                xl:text-[11px]
              "
            >
              CONTACT

              <span
                className="
                  absolute
                  bottom-0
                  left-0
                  h-[1px]
                  w-0
                  bg-[#741522]
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </button>
          </nav>

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div
            className="
              flex
              items-center
              gap-0.5
              sm:gap-1
            "
          >
            {/* SEARCH */}

            <button
              onClick={() => goTo("/allproducts")}
              aria-label="Search"
              className="
                group
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[#6E5A52]
                transition-all
                duration-300
                hover:text-[#741522]
                sm:h-10
                sm:w-10
              "
            >
              <Search
                size={20}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:scale-110
                "
              />

              <span
                className="
                  absolute
                  bottom-1
                  left-1/2
                  h-[1px]
                  w-0
                  -translate-x-1/2
                  bg-[#741522]
                  transition-all
                  duration-300
                  group-hover:w-5
                "
              />
            </button>

            {/* ACCOUNT */}

            <button
              onClick={() =>
                goTo(
                  login
                    ? "/account?tab=1"
                    : "/account"
                )
              }
              aria-label="Account"
              className="
                group
                hidden
                h-10
                w-10
                items-center
                justify-center
                text-[#6E5A52]
                transition-all
                duration-300
                hover:text-[#741522]
                sm:flex
              "
            >
              <UserRound
                size={20}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />
            </button>

            {/* CART */}

            <button
              onClick={() => goTo("/cart")}
              aria-label="Shopping bag"
              className="
                group
                relative
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[#741522]
                sm:h-10
                sm:w-10
              "
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />

              {totalItems > 0 && (
                <motion.span
                  initial={{
                    scale: 0,
                    opacity: 0,
                  }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                  }}
                  className="
                    absolute
                    -right-0.5
                    -top-0.5
                    flex
                    h-[17px]
                    min-w-[17px]
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]
                    px-1
                    text-[8px]
                    font-semibold
                    text-white
                  "
                >
                  {totalItems > 9
                    ? "9+"
                    : totalItems}
                </motion.span>
              )}
            </button>

            {/* MOBILE MENU */}

            <button
              onClick={() =>
                setMobileMenu(!mobileMenu)
              }
              aria-label="Open menu"
              className="
                ml-1
                flex
                h-9
                w-9
                items-center
                justify-center
                text-[#741522]
                lg:hidden
                sm:h-10
                sm:w-10
              "
            >
              <AnimatePresence mode="wait">
                {mobileMenu ? (
                  <motion.div
                    key="close"
                    initial={{
                      rotate: -90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: 90,
                      opacity: 0,
                    }}
                  >
                    <X
                      size={24}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{
                      rotate: 90,
                      opacity: 0,
                    }}
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={{
                      rotate: -90,
                      opacity: 0,
                    }}
                  >
                    <Menu
                      size={24}
                      strokeWidth={1.5}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================
          MOBILE MENU
      ======================================================== */}

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="
              fixed
              inset-0
              z-[55]
              lg:hidden
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            {/* Overlay */}

            <motion.div
              onClick={() =>
                setMobileMenu(false)
              }
              className="
                absolute
                inset-0
                bg-[#351B18]/45
                backdrop-blur-sm
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            />

            {/* Drawer */}

            <motion.div
              className="
                absolute
                right-0
                top-0
                flex
                h-full
                w-[88%]
                max-w-[420px]
                flex-col
                overflow-hidden
                bg-[#F8F5ED]
                shadow-2xl
              "
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* =================================================
                  MOBILE DRAWER HEADER
              ================================================= */}

              <div
                className="
                  flex
                  h-[96px]
                  shrink-0
                  items-center
                  justify-between
                  border-b
                  border-[#741522]/10
                  px-5
                  sm:h-[105px]
                  sm:px-7
                "
              >
                {/* Circle Logo */}

                <Link
                  to="/"
                  onClick={() => {
                    setMobileMenu(false);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                    group
                    flex
                    items-center
                  "
                >
                  <div
                    className="
                      relative
                      flex
                      h-[61px]
                      w-[61px]
                      items-center
                      justify-center
                      rounded-full
                    "
                  >
                    {/* Outer */}

                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#C9A24A]
                        bg-[#FFFDF8]
                        shadow-[0_6px_20px_rgba(116,21,34,0.12)]
                      "
                    />

                    {/* Inner */}

                    <div
                      className="
                        absolute
                        inset-[5px]
                        rounded-full
                        border
                        border-[#C9A24A]/40
                      "
                    />

                    {/* Logo */}

                    <img
                      src={logoSrc}
                      alt="Darsh"
                      className="
                        relative
                        z-10
                        h-[76%]
                        w-[76%]
                        rounded-full
                        object-contain
                        p-1
                        mix-blend-multiply
                        transition-transform
                        duration-500
                        group-hover:scale-105
                      "
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                    {/* Sparkle */}

                    <Sparkles
                      size={11}
                      strokeWidth={1.5}
                      className="
                        absolute
                        -right-1
                        -top-1
                        z-20
                        text-[#C9A24A]
                      "
                    />
                  </div>

                  <div className="ml-3">
                    <p
                      className="
                        font-serif
                        text-[11px]
                        font-semibold
                        tracking-[0.25em]
                        text-[#741522]
                      "
                    >
                      DARSH
                    </p>

                    <p
                      className="
                        mt-0.5
                        text-[6.5px]
                        tracking-[0.28em]
                        text-[#806B63]
                      "
                    >
                      HANDWOVEN SAREES
                    </p>
                  </div>
                </Link>

                {/* Close */}

                <button
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  aria-label="Close menu"
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#741522]/20
                    text-[#741522]
                    transition-all
                    duration-300
                    hover:bg-[#741522]
                    hover:text-white
                  "
                >
                  <X
                    size={20}
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* =================================================
                  MOBILE NAVIGATION
              ================================================= */}

              <div
                className="
                  flex-1
                  overflow-y-auto
                  px-6
                  pb-28
                  pt-8
                  sm:px-7
                  sm:pt-10
                "
              >
                {/* Welcome */}

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
                    delay: 0.15,
                  }}
                  className="mb-8 sm:mb-10"
                >
                  <p
                    className="
                      mb-2
                      text-[8px]
                      uppercase
                      tracking-[0.3em]
                      text-[#9A8982]
                    "
                  >
                    {login
                      ? "WELCOME BACK"
                      : "WELCOME TO"}
                  </p>

                  <h2
                    className="
                      font-serif
                      text-xl
                      text-[#3F302B]
                      sm:text-2xl
                    "
                  >
                    {login
                      ? userName || "Darsh"
                      : "The Darsh Collection"}
                  </h2>
                </motion.div>

                <div className="space-y-0">
                  {/* SHOP */}

                  <MobileNavItem
                    number="01"
                    label="SHOP"
                    onClick={() => goTo("/")}
                    active={isActive("/")}
                  />

                  {/* NEW ARRIVALS */}

                  <MobileNavItem
                    number="02"
                    label="NEW ARRIVALS"
                    onClick={() =>
                      goTo("/newarrivals")
                    }
                    icon={
                      <Sparkles
                        size={16}
                        strokeWidth={1.3}
                      />
                    }
                  />

                  {/* HOT SALES */}

                  <MobileNavItem
                    number="03"
                    label="HOT SALES"
                    onClick={() =>
                      goTo("/hotsales")
                    }
                  />

                  {/* ACCOUNT */}

                  <MobileNavItem
                    number="04"
                    label={
                      login
                        ? "MY ACCOUNT"
                        : "LOGIN / SIGN UP"
                    }
                    onClick={() =>
                      goTo(
                        login
                          ? "/account?tab=1"
                          : "/account"
                      )
                    }
                    icon={
                      <UserRound
                        size={17}
                        strokeWidth={1.3}
                      />
                    }
                  />

                  {/* SHOPPING BAG */}

                  <MobileNavItem
                    number="05"
                    label="SHOPPING BAG"
                    onClick={() =>
                      goTo("/cart")
                    }
                    badge={
                      totalItems > 0
                        ? totalItems
                        : null
                    }
                    icon={
                      <ShoppingBag
                        size={17}
                        strokeWidth={1.3}
                      />
                    }
                  />

                  {/* ORDERS */}

                  {login && (
                    <MobileNavItem
                      number="06"
                      label="MY ORDERS"
                      onClick={() =>
                        goTo("/account?tab=3")
                      }
                      badge={
                        paidOrderCount > 0
                          ? paidOrderCount
                          : null
                      }
                      icon={
                        <Package
                          size={17}
                          strokeWidth={1.3}
                        />
                      }
                    />
                  )}

                  {/* OUR STORY */}

                  <MobileNavItem
                    number="07"
                    label="OUR STORY"
                    onClick={() =>
                      goTo("/aboutus")
                    }
                  />

                  {/* CONTACT */}

                  <MobileNavItem
                    number="08"
                    label="CONTACT"
                    onClick={() =>
                      goTo("/contactus")
                    }
                  />
                </div>

                {/* Quote */}

                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  transition={{
                    delay: 0.55,
                  }}
                  className="mt-12 sm:mt-14"
                >
                  <div
                    className="
                      mb-4
                      h-[1px]
                      w-8
                      bg-[#741522]
                    "
                  />

                  <p
                    className="
                      font-serif
                      text-sm
                      italic
                      leading-relaxed
                      text-[#806B63]
                    "
                  >
                    Woven with tradition,
                    <br />
                    made for today.
                  </p>
                </motion.div>
              </div>

              {/* =================================================
                  MOBILE FOOTER
              ================================================= */}

              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  right-0
                  border-t
                  border-[#741522]/10
                  bg-[#F8F5ED]/95
                  px-5
                  py-4
                  backdrop-blur-md
                  sm:px-7
                  sm:py-5
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                  "
                >
                  <Sparkles
                    size={10}
                    strokeWidth={1.2}
                    className="text-[#C9A24A]"
                  />

                  <p
                    className="
                      text-[7px]
                      tracking-[0.22em]
                      text-[#9A8982]
                      sm:text-[8px]
                    "
                  >
                    © DARSH · HANDWOVEN SAREES
                  </p>

                  <Sparkles
                    size={10}
                    strokeWidth={1.2}
                    className="text-[#C9A24A]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================
          CUSTOM ANIMATIONS
      ======================================================== */}

      <style>
        {`
          @keyframes navbarShine {
            0% {
              left: -100%;
            }

            45%,
            100% {
              left: 130%;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
        `}
      </style>
    </>
  );
};

/* ============================================================
   MOBILE NAV ITEM
============================================================ */

const MobileNavItem = ({
  number,
  label,
  onClick,
  icon,
  badge,
  active,
}) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        border-b
        border-[#741522]/10
        py-4
        text-left
        sm:py-5
      "
    >
      <div className="flex items-center gap-4">
        <span
          className={`
            text-[8px]
            tracking-[0.2em]
            ${
              active
                ? "text-[#C9A24A]"
                : "text-[#9A8982]"
            }
          `}
        >
          {number}
        </span>

        <span
          className={`
            text-[11px]
            tracking-[0.25em]
            transition-colors
            sm:text-[12px]

            ${
              active
                ? "font-semibold text-[#741522]"
                : "text-[#5C4942] group-hover:text-[#741522]"
            }
          `}
        >
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        {badge !== null &&
          badge !== undefined && (
            <span
              className="
                flex
                h-5
                min-w-5
                items-center
                justify-center
                rounded-full
                bg-[#741522]
                px-1.5
                text-[9px]
                font-medium
                text-white
              "
            >
              {badge > 9 ? "9+" : badge}
            </span>
          )}

        {icon ? (
          <span
            className={`
              ${
                active
                  ? "text-[#741522]"
                  : "text-[#9A8982]"
              }
              transition-colors
              group-hover:text-[#741522]
            `}
          >
            {icon}
          </span>
        ) : (
          <ChevronRight
            size={17}
            strokeWidth={1.2}
            className="
              text-[#9A8982]
              transition-transform
              duration-300
              group-hover:translate-x-1
              group-hover:text-[#741522]
            "
          />
        )}
      </div>
    </motion.button>
  );
};

export default Navbar;