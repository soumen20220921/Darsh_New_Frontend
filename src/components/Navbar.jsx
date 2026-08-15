import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  Search,
  ShoppingBag,
  Menu,
  X,
  UserRound,
  Package,
  ChevronRight,
  ChevronDown,
  Heart,
  Truck,
  Sparkles,
  ArrowUpRight,
  Crown,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

/* ============================================================
   CONSTANTS
============================================================ */

const WISHLIST_KEY = "wishlist";

const DELHIVERY_TRACKING_URL =
  "https://www.delhivery.com/tracking";

/* ============================================================
   AWB HELPER
   Supports different backend field names.
============================================================ */

const getOrderAwb = (orderItem) => {
  if (!orderItem) return "";

  return (
    orderItem?.awb ||
    orderItem?.AWB ||
    orderItem?.awbNumber ||
    orderItem?.awb_number ||
    orderItem?.trackingId ||
    orderItem?.trackingID ||
    orderItem?.trackingNumber ||
    orderItem?.tracking_number ||
    orderItem?.waybill ||
    orderItem?.wayBill ||
    orderItem?.shipment?.awb ||
    orderItem?.shipment?.awbNumber ||
    orderItem?.shipment?.waybill ||
    orderItem?.shipping?.awb ||
    orderItem?.shipping?.awbNumber ||
    orderItem?.delivery?.awb ||
    orderItem?.delivery?.awbNumber ||
    ""
  );
};

/* ============================================================
   CHECK REAL AWB
============================================================ */

const isValidAwb = (awb) => {
  if (!awb) return false;

  const value = String(awb).trim();

  if (!value) return false;

  const invalidValues = [
    "pending",
    "null",
    "undefined",
    "n/a",
    "na",
    "-",
    "not assigned",
    "not available",
  ];

  return !invalidValues.includes(
    value.toLowerCase()
  );
};

/* ============================================================
   CATEGORY NAME
============================================================ */

const cleanCategory = (value) => {
  if (!value) return "";

  return String(value)
    .replace(/\s+/g, " ")
    .trim();
};

/* ============================================================
   NAVBAR
============================================================ */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    login,
    setLogin,
    totalItems,
    order = [],
    allProduct = [],
  } = useAppContext();

  /* ==========================================================
     STATES
  ========================================================== */

  const [scrolled, setScrolled] =
    useState(false);

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [
    desktopCategoryOpen,
    setDesktopCategoryOpen,
  ] = useState(false);

  const [
    mobileCategoryOpen,
    setMobileCategoryOpen,
  ] = useState(false);

  const [
    trackingOpen,
    setTrackingOpen,
  ] = useState(false);

  const [
    trackingNumber,
    setTrackingNumber,
  ] = useState("");

  const [
    wishlistCount,
    setWishlistCount,
  ] = useState(0);

  /* ==========================================================
     BASIC
  ========================================================== */

  const logoSrc = "/IMG/Logo.jpg";

  const userName =
    localStorage.getItem("name");

  /* ==========================================================
     DYNAMIC CATEGORIES
     
     IMPORTANT:
     No hardcoded category names.
     
     Reads:
     allProduct[].category
  ========================================================== */

  const dynamicCategories = useMemo(() => {
    if (!Array.isArray(allProduct)) {
      return [];
    }

    const categoryMap = new Map();

    allProduct.forEach((product) => {
      const category = cleanCategory(
        product?.category
      );

      if (!category) return;

      const key =
        category.toLowerCase();

      if (!categoryMap.has(key)) {
        categoryMap.set(
          key,
          category
        );
      }
    });

    return Array.from(
      categoryMap.values()
    ).sort((a, b) =>
      a.localeCompare(
        b,
        undefined,
        {
          sensitivity: "base",
        }
      )
    );
  }, [allProduct]);

  /* ==========================================================
     CUSTOMER AWB LIST
     
     ONLY REAL AWBs.
  ========================================================== */

  const customerAwbs = useMemo(() => {
    if (!Array.isArray(order)) {
      return [];
    }

    return order
      .map((item) =>
        getOrderAwb(item)
      )
      .filter((awb) =>
        isValidAwb(awb)
      )
      .map((awb) =>
        String(awb).trim()
      )
      .filter(
        (awb, index, array) =>
          array.indexOf(awb) ===
          index
      );
  }, [order]);

  const hasTrackableOrder =
    customerAwbs.length > 0;

  const latestAwb =
    customerAwbs[0] || "";

  /* ==========================================================
     PAID ORDERS
  ========================================================== */

  const paidOrderCount =
    Array.isArray(order)
      ? order.filter((item) => {
          const status =
            String(
              item?.payStatus || ""
            ).toLowerCase();

          return (
            status === "paid" ||
            status === "success" ||
            status === "completed"
          );
        }).length
      : 0;

  /* ==========================================================
     WISHLIST COUNT
  ========================================================== */

  const readWishlistCount = () => {
    try {
      const raw =
        localStorage.getItem(
          WISHLIST_KEY
        );

      if (!raw) {
        setWishlistCount(0);
        return;
      }

      const parsed =
        JSON.parse(raw);

      setWishlistCount(
        Array.isArray(parsed)
          ? parsed.length
          : 0
      );
    } catch {
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    readWishlistCount();

    const handleWishlistUpdate =
      () => {
        readWishlistCount();
      };

    window.addEventListener(
      "darsh-wishlist-updated",
      handleWishlistUpdate
    );

    window.addEventListener(
      "wishlistUpdated",
      handleWishlistUpdate
    );

    window.addEventListener(
      "storage",
      handleWishlistUpdate
    );

    return () => {
      window.removeEventListener(
        "darsh-wishlist-updated",
        handleWishlistUpdate
      );

      window.removeEventListener(
        "wishlistUpdated",
        handleWishlistUpdate
      );

      window.removeEventListener(
        "storage",
        handleWishlistUpdate
      );
    };
  }, []);

  /* ==========================================================
     LOGIN
  ========================================================== */

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (token) {
      setLogin(true);
    }
  }, [setLogin]);

  /* ==========================================================
     SCROLL
  ========================================================== */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(
        window.scrollY > 25
      );
    };

    handleScroll();

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

  /* ==========================================================
     CLOSE MENUS ON ROUTE
  ========================================================== */

  useEffect(() => {
    setMobileMenu(false);
    setDesktopCategoryOpen(false);
    setMobileCategoryOpen(false);
    setTrackingOpen(false);
  }, [location.pathname]);

  /* ==========================================================
     BODY LOCK
  ========================================================== */

  useEffect(() => {
    const oldOverflow =
      document.body.style.overflow;

    document.body.style.overflow =
      mobileMenu
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow =
        oldOverflow;
    };
  }, [mobileMenu]);

  /* ==========================================================
     NAVIGATION
  ========================================================== */

  const goTo = (path) => {
    setMobileMenu(false);
    setDesktopCategoryOpen(false);
    setMobileCategoryOpen(false);

    navigate(path);

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  /* ==========================================================
     CATEGORY NAVIGATION
     
     Your existing Categories page uses:
     
     /Categories/:name
  ========================================================== */

  const goToCategory = (
    category
  ) => {
    if (!category) return;

    setDesktopCategoryOpen(false);
    setMobileCategoryOpen(false);
    setMobileMenu(false);

    navigate(
      `/Categories/${encodeURIComponent(
        category
      )}`
    );

    window.setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 0);
  };

  /* ==========================================================
     ACTIVE
  ========================================================== */

  const isActive = (path) => {
    if (path === "/") {
      return (
        location.pathname === "/"
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  /* ==========================================================
     TRACKING
     
     Redirect directly to Delhivery.
  ========================================================== */

  const openDelhivery = (awb) => {
    const value =
      String(awb || "").trim();

    if (!value) {
      toast.info(
        "Please enter your AWB / Tracking Number",
        {
          theme: "dark",
        }
      );

      return;
    }

    const url =
      `${DELHIVERY_TRACKING_URL}?awb=${encodeURIComponent(
        value
      )}`;

    window.open(
      url,
      "_blank",
      "noopener,noreferrer"
    );
  };

  /* ==========================================================
     TRACK SUBMIT
  ========================================================== */

  const handleTrackSubmit = (
    event
  ) => {
    event.preventDefault();

    const value =
      trackingNumber.trim();

    if (!value) return;

    setTrackingOpen(false);
    setMobileMenu(false);

    openDelhivery(value);
  };

  /* ==========================================================
     USE LATEST AWB
  ========================================================== */

  const useLatestAwb = () => {
    if (!latestAwb) {
      toast.info(
        "No AWB is available yet",
        {
          theme: "dark",
        }
      );

      return;
    }

    setTrackingNumber(
      latestAwb
    );
  };

  
  return (
    <>
      {/* ======================================================
          ANNOUNCEMENT
      ====================================================== */}

      <div
        className="
          relative
          z-[70]
          flex
          h-[31px]
          items-center
          justify-center
          overflow-hidden
          bg-[#741522]
          text-[#FFF9F0]
        "
      >
        <div
          className="
            flex
            whitespace-nowrap
            text-[5.5px]
            font-medium
            tracking-[0.28em]
            sm:text-[9px]
            sm:tracking-[0.32em]
          "
        >
          <span>
            FREE SHIPPING ACROSS INDIA
          </span>

          <span className="mx-2 opacity-50 sm:mx-3">
            ◆
          </span>

          <span>
            HANDLOOM COLLECTION
          </span>

          <span className="mx-2 opacity-50 sm:mx-3">
            ◆
          </span>

          <span>
            CRAFTED WITH LOVE
          </span>
        </div>

        <div
          className="
            absolute
            -left-[100%]
            top-0
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

      {/* ======================================================
          MAIN HEADER
      ====================================================== */}

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

          ${
            scrolled
              ? "shadow-[0_8px_30px_rgba(74,35,25,0.10)]"
              : ""
          }
        `}
      >
        <div
          className={`
            relative
            mx-auto
            flex
            max-w-[1600px]
            items-center
            justify-between
            px-3
            sm:px-6
            lg:px-8
            xl:px-10
            2xl:px-12

            ${
              scrolled
                ? "h-[64px] sm:h-[70px]"
                : "h-[75px] sm:h-[84px]"
            }
          `}
        >
          {/* ==================================================
              LOGO
          ================================================== */}

          <Link
            to="/"
            aria-label="Darsh Home"
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
              shrink-0
              items-center
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
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className={`
                relative
                flex
                shrink-0
                items-center
                justify-center
                rounded-full

                ${
                  scrolled
                    ? "h-[52px] w-[52px] sm:h-[58px] sm:w-[58px]"
                    : "h-[52px] w-[52px] sm:h-[68px] sm:w-[68px]"
                }
              `}
            >
              <div
                className="
                  absolute
                  -inset-2
                  rounded-full
                  bg-[#C9A24A]/10
                  opacity-0
                  blur-lg
                  transition-all
                  duration-500
                  group-hover:scale-110
                  group-hover:opacity-100
                "
              />

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
                "
              />

              <div
                className="
                  absolute
                  inset-[5px]
                  rounded-full
                  border
                  border-[#C9A24A]/40
                "
              />

              <motion.img
                src={logoSrc}
                alt="Darsh"
                whileHover={{
                  scale: 1.07,
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
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />

              <motion.div
                animate={{
                  scale: [
                    1,
                    1.18,
                    1,
                  ],
                  rotate: [
                    0,
                    8,
                    0,
                  ],
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
                  className="text-[#C9A24A]"
                />
              </motion.div>
            </motion.div>

            <div
              className="
                ml-2
                flex-col
                justify-center
                sm:ml-3
              "
            >
              <span
                className="
                  font-serif
                  text-[12px]
                  sm:text-[15px]
                  font-semibold
                  tracking-[0.22em]
                  text-[#741522]
                  lg:text-[18px]
                "
              >
                DARSH
              </span>

              <span
                className="
                  mt-0.5
                  hidden
                  text-[6px]
                  font-medium
                  tracking-[0.25em]
                  text-[#806B63]
                  lg:text-[6.5px]
                  sm:flex
                "
              >
                HANDWOVEN SAREES
              </span>
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              
              IMPORTANT:
              whitespace-nowrap keeps everything one line.
          ================================================== */}

          <nav
            className="
              absolute
              left-1/2
              hidden
              -translate-x-1/2
              items-center
              gap-4
              whitespace-nowrap
              lg:flex
              xl:gap-5
              2xl:gap-7
            "
          >
            <DesktopNavButton
              label="SHOP"
              active={isActive("/")}
              onClick={() =>
                goTo("/")
              }
            />

            <DesktopNavButton
              label="NEW ARRIVALS"
              icon={
                <Sparkles
                  size={10}
                  className="text-[#C9A24A]"
                />
              }
              onClick={() =>
                goTo("/newarrivals")
              }
            />

            {/* =================================================
                SHOP BY CATEGORY
            ================================================= */}

            <div
              className="
                relative
                shrink-0
              "
              onMouseEnter={() =>
                setDesktopCategoryOpen(
                  true
                )
              }
              onMouseLeave={() =>
                setDesktopCategoryOpen(
                  false
                )
              }
            >
              <button
                type="button"
                onClick={() =>
                  setDesktopCategoryOpen(
                    (value) =>
                      !value
                  )
                }
                className="
                  group
                  relative
                  flex
                  shrink-0
                  items-center
                  gap-1
                  whitespace-nowrap
                  py-3
                  text-[8px]
                  font-medium
                  tracking-[0.14em]
                  text-[#806B63]
                  transition-colors
                  duration-300
                  hover:text-[#741522]
                  xl:text-[9px]
                  xl:tracking-[0.17em]
                  2xl:text-[10px]
                  2xl:tracking-[0.19em]
                "
              >
                SHOP BY CATEGORY

                <ChevronDown
                  size={11}
                  className={`
                    transition-transform
                    duration-300

                    ${
                      desktopCategoryOpen
                        ? "rotate-180 text-[#741522]"
                        : ""
                    }
                  `}
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

              {/* DESKTOP MEGA MENU */}

              <AnimatePresence>
                {desktopCategoryOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      y: 12,
                      scale: 0.98,
                    }}
                    transition={{
                      duration: 0.24,
                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    className="
                      absolute
                      left-1/2
                      top-full
                      z-[100]
                      w-[680px]
                      -translate-x-1/2
                      pt-4
                    "
                  >
                    <div
                      className="
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[#741522]/10
                        bg-[#FFFDF8]
                        p-6
                        shadow-[0_25px_70px_rgba(74,35,25,0.18)]
                      "
                    >
                      {/* HEADER */}

                      <div
                        className="
                          mb-5
                          flex
                          items-end
                          justify-between
                          border-b
                          border-[#741522]/10
                          pb-4
                        "
                      >
                        <div>
                          <p
                            className="
                              text-[7px]
                              font-semibold
                              tracking-[0.28em]
                              text-[#C9A24A]
                            "
                          >
                            EXPLORE DARSH
                          </p>

                          <h3
                            className="
                              mt-1
                              font-serif
                              text-xl
                              text-[#3F302B]
                            "
                          >
                            Shop By Category
                          </h3>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            goTo(
                              "/allproducts"
                            )
                          }
                          className="
                            flex
                            items-center
                            gap-1
                            whitespace-nowrap
                            text-[8px]
                            font-semibold
                            tracking-[0.15em]
                            text-[#741522]
                            transition-colors
                            hover:text-[#C9A24A]
                          "
                        >
                          VIEW ALL
                          <ArrowUpRight
                            size={12}
                          />
                        </button>
                      </div>

                      {/* DYNAMIC CATEGORY GRID */}

                      {dynamicCategories.length >
                      0 ? (
                        <div
                          className="
                            grid
                            max-h-[360px]
                            grid-cols-3
                            gap-x-5
                            gap-y-1
                            overflow-y-auto
                            pr-1
                          "
                        >
                          {dynamicCategories.map(
                            (
                              category,
                              index
                            ) => (
                              <motion.button
                                key={
                                  category
                                }
                                type="button"
                                initial={{
                                  opacity: 0,
                                  x: -7,
                                }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                }}
                                transition={{
                                  delay:
                                    Math.min(
                                      index *
                                        0.02,
                                      0.3
                                    ),
                                }}
                                onClick={() =>
                                  goToCategory(
                                    category
                                  )
                                }
                                className="
                                  group/category
                                  flex
                                  min-w-0
                                  items-center
                                  justify-between
                                  rounded-lg
                                  px-2
                                  py-2.5
                                  text-left
                                  transition-all
                                  duration-200
                                  hover:bg-[#741522]/5
                                  hover:pl-3
                                "
                              >
                                <span
                                  className="
                                    truncate
                                    text-[9px]
                                    tracking-[0.06em]
                                    text-[#6E5A52]
                                    transition-colors
                                    group-hover/category:text-[#741522]
                                  "
                                >
                                  {category}
                                </span>

                                <ChevronRight
                                  size={12}
                                  className="
                                    shrink-0
                                    text-[#C9A24A]
                                    opacity-0
                                    transition-all
                                    duration-200
                                    group-hover/category:translate-x-0.5
                                    group-hover/category:opacity-100
                                  "
                                />
                              </motion.button>
                            )
                          )}
                        </div>
                      ) : (
                        <div
                          className="
                            flex
                            min-h-[140px]
                            items-center
                            justify-center
                            text-center
                          "
                        >
                          <div>
                            <Sparkles
                              size={20}
                              className="
                                mx-auto
                                mb-3
                                text-[#C9A24A]
                              "
                            />

                            <p
                              className="
                                text-[8px]
                                tracking-[0.15em]
                                text-[#9A8982]
                              "
                            >
                              NO CATEGORIES
                              AVAILABLE
                            </p>
                          </div>
                        </div>
                      )}

                      {/* FOOTER */}

                      <div
                        className="
                          mt-5
                          flex
                          items-center
                          justify-between
                          rounded-xl
                          bg-[#741522]
                          px-4
                          py-3
                          text-white
                        "
                      >
                        <div
                          className="
                            flex
                            items-center
                            gap-2
                          "
                        >
                          <Sparkles
                            size={13}
                            className="text-[#E7C979]"
                          />

                          <span
                            className="
                              text-[7px]
                              tracking-[0.15em]
                              sm:text-[8px]
                            "
                          >
                            FIND YOUR
                            PERFECT WEAVE
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            goTo(
                              "/allproducts"
                            )
                          }
                          className="
                            whitespace-nowrap
                            text-[7px]
                            font-semibold
                            tracking-[0.14em]
                            underline
                            underline-offset-4
                            sm:text-[8px]
                          "
                        >
                          SHOP NOW
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <DesktopNavButton
              label="HOT SALES"
              onClick={() =>
                goTo("/hotsales")
              }
            />
            <DesktopNavButton
  label="PREMIUM SAREES"
              active={isActive("/premium-sarees")}
              premium
              icon={<Crown size={17} strokeWidth={2} />}
  onClick={() => goTo("/premium-sarees")}
/>


            <DesktopNavButton
              label="OUR STORY"
              onClick={() =>
                goTo("/aboutus")
              }
            />

          </nav>

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              items-center
              gap-0
              sm:gap-0.5
            "
          >
            {/* SEARCH */}

            <IconAction
              label="Search"
              onClick={() =>
                goTo("/allproducts")
              }
            >
              <Search
                size={19}
                strokeWidth={1.5}
              />
            </IconAction>

            {/* WISHLIST */}

            <IconAction
              label="Wishlist"
              active={isActive(
                "/wishlist"
              )}
              badge={
                wishlistCount > 0
                  ? wishlistCount
                  : null
              }
              onClick={() =>
                goTo("/wishlist")
              }
            >
              <Heart
                size={19}
                strokeWidth={1.5}
                fill={
                  isActive(
                    "/wishlist"
                  )
                    ? "currentColor"
                    : "none"
                }
              />
            </IconAction>

            {/* TRACK */}

            <IconAction
              label="Track Your Order"
              onClick={() =>
                setTrackingOpen(true)
              }
            >
              <Truck
                size={19}
                strokeWidth={1.5}
              />
            </IconAction>

            {/* ACCOUNT */}

            <IconAction
              label="Account"
              onClick={() =>
                goTo(
                  login
                    ? "/account?tab=1"
                    : "/account"
                )
              }
              className="
                hidden
                sm:flex
              "
            >
              <UserRound
                size={19}
                strokeWidth={1.5}
              />
            </IconAction>

            {/* CART */}

            <IconAction
              label="Shopping Bag"
              accent
              active={isActive(
                "/cart"
              )}
              badge={
                totalItems > 0
                  ? totalItems
                  : null
              }
              onClick={() =>
                goTo("/cart")
              }
            >
              <ShoppingBag
                size={19}
                strokeWidth={1.5}
              />
            </IconAction>

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileMenu(
                  (value) =>
                    !value
                )
              }
              aria-label={
                mobileMenu
                  ? "Close menu"
                  : "Open menu"
              }
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
              <AnimatePresence
                mode="wait"
              >
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

      {/* ======================================================
          TRACKING MODAL
      ====================================================== */}

      <AnimatePresence>
        {trackingOpen && (
          <motion.div
            className="
              fixed
              inset-0
              z-[120]
              flex
              items-center
              justify-center
              bg-[#351B18]/50
              px-4
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
            onMouseDown={() =>
              setTrackingOpen(false)
            }
          >
            <motion.form
              onSubmit={
                handleTrackSubmit
              }
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 20,
                scale: 0.96,
              }}
              transition={{
                duration: 0.3,
              }}
              className="
                relative
                w-full
                max-w-md
                overflow-hidden
                rounded-3xl
                border
                border-[#C9A24A]/30
                bg-[#FFFDF8]
                p-6
                shadow-[0_30px_100px_rgba(35,15,12,0.28)]
                sm:p-8
              "
            >
              {/* CLOSE */}

              <button
                type="button"
                onClick={() =>
                  setTrackingOpen(
                    false
                  )
                }
                className="
                  absolute
                  right-4
                  top-4
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#741522]/10
                  text-[#806B63]
                  transition-all
                  hover:bg-[#741522]
                  hover:text-white
                "
              >
                <X size={17} />
              </button>

              {/* HEADER */}

              <div className="mb-6">
                <motion.div
                  animate={{
                    y: [
                      0,
                      -3,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-full
                    bg-[#741522]/5
                    text-[#741522]
                  "
                >
                  <Truck
                    size={20}
                    strokeWidth={1.4}
                  />
                </motion.div>

                <p
                  className="
                    text-[8px]
                    font-semibold
                    tracking-[0.28em]
                    text-[#C9A24A]
                  "
                >
                  DARSH DELIVERY
                </p>

                <h3
                  className="
                    mt-1
                    font-serif
                    text-2xl
                    text-[#3F302B]
                  "
                >
                  Track Your Order
                </h3>

                <p
                  className="
                    mt-2
                    text-xs
                    leading-relaxed
                    text-[#806B63]
                  "
                >
                  Enter your AWB /
                  tracking number
                  and continue to
                  Delhivery tracking.
                </p>
              </div>

              {/* =================================================
                  ORDER STATUS
              ================================================= */}

              <div
                className="
                  mb-4
                  rounded-2xl
                  border
                  border-[#741522]/10
                  bg-[#F8F5ED]
                  p-4
                "
              >
                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-3
                  "
                >
                  <div>
                    <p
                      className="
                        text-[7px]
                        font-semibold
                        tracking-[0.2em]
                        text-[#C9A24A]
                      "
                    >
                      YOUR SHIPMENTS
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-[#5C4942]
                      "
                    >
                      {hasTrackableOrder
                        ? `${customerAwbs.length} shipment${
                            customerAwbs.length >
                            1
                              ? "s"
                              : ""
                          } with AWB`
                        : "No AWB assigned yet"}
                    </p>
                  </div>

                  <Package
                    size={18}
                    className="
                      shrink-0
                      text-[#741522]
                    "
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    goTo(
                      "/account?tab=3"
                    )
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-xl
                    border
                    border-[#741522]/15
                    bg-white
                    px-4
                    py-2.5
                    text-[8px]
                    font-semibold
                    tracking-[0.18em]
                    text-[#741522]
                    transition-all
                    duration-300
                    hover:border-[#741522]
                    hover:bg-[#741522]
                    hover:text-white
                  "
                >
                  VIEW MY ORDERS

                  <ArrowUpRight
                    size={13}
                  />
                </button>
              </div>

              {/* =================================================
                  AWB INPUT
              ================================================= */}

              <div className="relative">
                <input
                  value={
                    trackingNumber
                  }
                  onChange={(
                    event
                  ) =>
                    setTrackingNumber(
                      event.target
                        .value
                    )
                  }
                  placeholder="AWB / Tracking Number"
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#741522]/15
                    bg-[#F8F5ED]
                    px-4
                    py-3.5
                    pr-12
                    text-sm
                    text-[#3F302B]
                    outline-none
                    transition
                    focus:border-[#C9A24A]
                    focus:ring-4
                    focus:ring-[#C9A24A]/10
                  "
                />

                <Package
                  size={17}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#9A8982]
                  "
                />
              </div>

              {/* TRACK */}

              <button
                type="submit"
                disabled={
                  !trackingNumber.trim()
                }
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#741522]
                  px-5
                  py-3.5
                  text-[9px]
                  font-semibold
                  tracking-[0.22em]
                  text-white
                  transition
                  hover:bg-[#5E101C]
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                "
              >
                TRACK ON DELHIVERY

                <ArrowUpRight
                  size={14}
                />
              </button>

              {/* LATEST AWB */}

              {hasTrackableOrder && (
                <button
                  type="button"
                  onClick={
                    useLatestAwb
                  }
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    text-[8px]
                    font-semibold
                    tracking-[0.13em]
                    text-[#741522]
                    transition-colors
                    hover:text-[#C9A24A]
                  "
                >
                  USE LATEST AWB

                  <ChevronRight
                    size={12}
                  />
                </button>
              )}

              {/* HELP */}

              <p
                className="
                  mt-4
                  text-center
                  text-[8px]
                  leading-relaxed
                  tracking-[0.04em]
                  text-[#9A8982]
                "
              >
                Find your AWB:
                <button
                  type="button"
                  onClick={() =>
                    goTo(
                      "/account?tab=3"
                    )
                  }
                  className="
                    mx-1
                    font-semibold
                    text-[#741522]
                    underline
                    underline-offset-2
                  "
                >
                  My Orders
                </button>
                → View Order Details
                → Copy AWB
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          MOBILE DRAWER
      ====================================================== */}

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
            {/* OVERLAY */}

            <motion.div
              onClick={() =>
                setMobileMenu(
                  false
                )
              }
              className="
                absolute
                inset-0
                bg-[#351B18]/45
                backdrop-blur-sm
              "
            />

            {/* DRAWER */}

            <motion.div
              className="
                absolute
                right-0
                top-0
                flex
                h-full
                w-[90%]
                max-w-[440px]
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
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {/* MOBILE HEADER */}

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
                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
                  }
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
                    <div
                      className="
                        absolute
                        inset-0
                        rounded-full
                        border
                        border-[#C9A24A]
                        bg-[#FFFDF8]
                      "
                    />

                    <div
                      className="
                        absolute
                        inset-[5px]
                        rounded-full
                        border
                        border-[#C9A24A]/40
                      "
                    />

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
                      "
                    />

                    <Sparkles
                      size={11}
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

                <button
                  type="button"
                  onClick={() =>
                    setMobileMenu(
                      false
                    )
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
                    hover:bg-[#741522]
                    hover:text-white
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* MOBILE CONTENT */}

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
                  className="
                    mb-8
                    sm:mb-10
                  "
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
                      ? userName ||
                        "Darsh"
                      : "The Darsh Collection"}
                  </h2>
                </motion.div>

                <div>
                  {/* SHOP */}

                  <MobileNavItem
                    number="01"
                    label="SHOP"
                    active={isActive(
                      "/"
                    )}
                    onClick={() =>
                      goTo("/")
                    }
                  />

                  {/* CATEGORY */}

                  <div
                    className="
                      border-b
                      border-[#741522]/10
                    "
                  >
                    <motion.button
                      type="button"
                      whileTap={{
                        scale: 0.985,
                      }}
                      onClick={() =>
                        setMobileCategoryOpen(
                          (value) =>
                            !value
                        )
                      }
                      className="
                        group
                        flex
                        w-full
                        items-center
                        justify-between
                        py-4
                        text-left
                        sm:py-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-center
                          gap-4
                        "
                      >
                        <span
                          className="
                            text-[8px]
                            tracking-[0.2em]
                            text-[#C9A24A]
                          "
                        >
                          02
                        </span>

                        <span
                          className="
                            whitespace-nowrap
                            text-[10px]
                            font-medium
                            tracking-[0.19em]
                            text-[#5C4942]
                            transition-colors
                            group-hover:text-[#741522]
                            sm:text-[12px]
                          "
                        >
                          SHOP BY CATEGORY
                        </span>
                      </div>

                      <motion.div
                        animate={{
                          rotate:
                            mobileCategoryOpen
                              ? 180
                              : 0,
                        }}
                      >
                        <ChevronDown
                          size={17}
                          className="
                            text-[#9A8982]
                          "
                        />
                      </motion.div>
                    </motion.button>

                    <AnimatePresence
                      initial={false}
                    >
                      {mobileCategoryOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height:
                              "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.3,
                          }}
                          className="
                            overflow-hidden
                          "
                        >
                          <div
                            className="
                              mb-4
                              max-h-[380px]
                              overflow-y-auto
                              rounded-2xl
                              border
                              border-[#741522]/10
                              bg-white/45
                              p-3
                            "
                          >
                            {dynamicCategories.length >
                            0 ? (
                              dynamicCategories.map(
                                (
                                  category,
                                  index
                                ) => (
                                  <motion.button
                                    key={
                                      category
                                    }
                                    type="button"
                                    initial={{
                                      opacity: 0,
                                      x: -8,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                    }}
                                    transition={{
                                      delay:
                                        Math.min(
                                          index *
                                            0.02,
                                          0.25
                                        ),
                                    }}
                                    onClick={() =>
                                      goToCategory(
                                        category
                                      )
                                    }
                                    className="
                                      group
                                      flex
                                      w-full
                                      items-center
                                      justify-between
                                      rounded-lg
                                      px-3
                                      py-3
                                      text-left
                                      transition-all
                                      hover:bg-[#741522]/5
                                    "
                                  >
                                    <span
                                      className="
                                        min-w-0
                                        truncate
                                        text-[9px]
                                        tracking-[0.07em]
                                        text-[#6E5A52]
                                        group-hover:text-[#741522]
                                      "
                                    >
                                      {
                                        category
                                      }
                                    </span>

                                    <ChevronRight
                                      size={13}
                                      className="
                                        shrink-0
                                        text-[#9A8982]
                                        transition-transform
                                        group-hover:translate-x-1
                                      "
                                    />
                                  </motion.button>
                                )
                              )
                            ) : (
                              <div
                                className="
                                  py-7
                                  text-center
                                "
                              >
                                <Sparkles
                                  size={18}
                                  className="
                                    mx-auto
                                    mb-2
                                    text-[#C9A24A]
                                  "
                                />

                                <p
                                  className="
                                    text-[8px]
                                    tracking-[0.15em]
                                    text-[#9A8982]
                                  "
                                >
                                  NO CATEGORIES
                                  AVAILABLE
                                </p>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* NEW */}

                  <MobileNavItem
                    number="03"
                    label="NEW ARRIVALS"
                    onClick={() =>
                      goTo(
                        "/newarrivals"
                      )
                    }
                    icon={
                      <Sparkles
                        size={17}
                      />
                    }
                  />

                  {/* PREMIUM */}

                  <MobileNavItem
                    number="04"
                    label="PREMIUM SAREES"
                    active={isActive(
                      "/premium-sarees"
                    )}
                    premium
                    icon={
                      <Crown
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo("/premium-sarees")
                    }
                  />

                  {/* SALES */}

                  <MobileNavItem
                    number="05"
                    label="HOT SALES"
                    onClick={() =>
                      goTo("/hotsales")
                    }
                  />

                  {/* WISHLIST */}

                  <MobileNavItem
                    number="06"
                    label="WISHLIST"
                    active={isActive(
                      "/wishlist"
                    )}
                    badge={
                      wishlistCount >
                      0
                        ? wishlistCount
                        : null
                    }
                    icon={
                      <Heart
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo("/wishlist")
                    }
                  />

                  {/* TRACK */}

                  <MobileNavItem
                    number="07"
                    label="TRACK YOUR ORDER"
                    icon={
                      <Truck
                        size={17}
                      />
                    }
                    onClick={() => {
                      setMobileMenu(
                        false
                      );

                      setTrackingOpen(
                        true
                      );
                    }}
                  />

                  {/* ACCOUNT */}

                  <MobileNavItem
                    number="08"
                    label={
                      login
                        ? "MY ACCOUNT"
                        : "LOGIN / SIGN UP"
                    }
                    icon={
                      <UserRound
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        login
                          ? "/account?tab=1"
                          : "/account"
                      )
                    }
                  />

                  {/* CART */}

                  <MobileNavItem
                    number="09"
                     label="SHOPPING BAG"
                    icon={
                      <ShoppingBag
                        size={17}
                      />
                    }
                    badge={
                      totalItems >
                      0
                        ? totalItems
                        : null
                    }
                    onClick={() =>
                      goTo("/cart")
                    }
                  />

                  {/* ORDERS */}

                  {login && (
                    <MobileNavItem
                      number="10"
                       label="MY ORDERS"
                      icon={
                        <Package
                          size={17}
                        />
                      }
                      badge={
                        paidOrderCount >
                        0
                          ? paidOrderCount
                          : null
                      }
                      onClick={() =>
                        goTo(
                          "/account?tab=3"
                        )
                      }
                    />
                  )}

                  {/* STORY */}

                  <MobileNavItem
                    number="11"
                    label="OUR STORY"
                    onClick={() =>
                      goTo("/aboutus")
                    }
                  />

                  {/* CONTACT */}

                  <MobileNavItem
                    number="12"
                    label="CONTACT"
                    onClick={() =>
                      goTo(
                        "/contactus"
                      )
                    }
                  />
                </div>

                {/* QUOTE */}

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
                    mt-12
                    sm:mt-14
                  "
                >
                  <div
                    className="
                      mb-4
                      h-px
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
                    Woven with
                    tradition,
                    <br />
                    made for today.
                  </p>
                </motion.div>
              </div>

              {/* FOOTER */}

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
                    className="text-[#C9A24A]"
                  />

                  <p
                    className="
                      text-[7px]
                      tracking-[0.2em]
                      text-[#9A8982]
                    "
                  >
                    © DARSH ·
                    HANDWOVEN
                    SAREES
                  </p>

                  <Sparkles
                    size={10}
                    className="text-[#C9A24A]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          ANIMATION
      ====================================================== */}

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
   DESKTOP NAV BUTTON
============================================================ */

const DesktopNavButton = ({
  label,
  onClick,
  active = false,
  icon = null,
  premium = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        group
        relative
        flex
        shrink-0
        items-center
        gap-1.5
        whitespace-nowrap
        rounded-full
        border
        py-2.5
        px-3
        text-[8px]
        font-medium
        tracking-[0.14em]
        transition-all
        duration-300
        xl:text-[9px]
        xl:tracking-[0.17em]
        2xl:text-[10px]
        2xl:tracking-[0.19em]
        ${
          premium
            ? "border-[#D7B95C]/70 bg-gradient-to-r from-[#FFF8D9] via-[#F5DEA0] to-[#E9C968] text-[#654A0A] shadow-[0_3px_14px_rgba(201,162,74,0.22)] hover:-translate-y-0.5 hover:border-[#C9A24A] hover:shadow-[0_6px_18px_rgba(201,162,74,0.30)]"
            : active
              ? "border-transparent text-[#741522]"
              : "border-transparent text-[#806B63] hover:text-[#741522]"
        }
      `}
    >
      {premium && (
        <span
          className="
            pointer-events-none
            absolute
            inset-0
            overflow-hidden
            rounded-full
          "
        >
          <span
            className="
              absolute
              -left-1/2
              top-0
              h-full
              w-1/3
              -skew-x-12
              bg-gradient-to-r
              from-transparent
              via-white/50
              to-transparent
              opacity-70
              transition-all
              duration-700
              group-hover:left-[120%]
            "
          />
        </span>
      )}

      <span className="relative z-10 whitespace-nowrap">
        {label}
        {!premium && (
          <span
            className={`
              absolute
              -bottom-1
              left-0
              h-px
              bg-[#741522]
              transition-all
              duration-500
              ${active ? "w-full" : "w-0 group-hover:w-full"}
            `}
          />
        )}
      </span>

      {icon && (
        <motion.span
          className="relative z-10"
          animate={{ y: [0, -1, 0] }}
          transition={{
            duration: premium ? 2.4 : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      )}

      {premium && (
        <Sparkles
          size={10}
          strokeWidth={2}
          className="relative z-10 text-[#A77B12] opacity-80"
        />
      )}
    </button>
  );
};

/* ============================================================
   ICON ACTION
============================================================ */

const IconAction = ({
  label,
  onClick,
  children,
  badge = null,
  active = false,
  accent = false,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`
        group
        relative
        flex
        h-9
        w-9
        shrink-0
        items-center
        justify-center
        transition-all
        duration-300
        sm:h-10
        sm:w-10

        ${
          active || accent
            ? "text-[#741522]"
            : "text-[#6E5A52] hover:text-[#741522]"
        }

        ${className}
      `}
    >
      <motion.span
        whileHover={{
          y: -1,
          scale: 1.06,
        }}
      >
        {children}
      </motion.span>

      <span
        className="
          absolute
          bottom-1
          left-1/2
          h-px
          w-0
          -translate-x-1/2
          bg-[#741522]
          transition-all
          duration-300
          group-hover:w-5
        "
      />

      {badge !== null && (
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
          {badge > 9
            ? "9+"
            : badge}
        </motion.span>
      )}
    </button>
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
  badge = null,
  active = false,
  premium = false,
}) => {
  return (
    <motion.button
      whileTap={{
        scale: 0.985,
      }}
      type="button"
      onClick={onClick}
      className={`
        group
        flex
        w-full
        items-center
        justify-between
        border-b
        py-4
        text-left
        transition-all
        duration-300
        sm:py-5
        ${
          premium
            ? "border-[#D7B95C]/50 bg-gradient-to-r from-[#FFF9E2] via-[#F6E5AF] to-[#EED27A] px-4 shadow-[0_4px_16px_rgba(201,162,74,0.16)]"
            : "border-[#741522]/10"
        }
      `}
    >
      <div
        className="
          flex
          min-w-0
          items-center
          gap-4
        "
      >
        <span
          className={`
            shrink-0
            text-[8px]
            tracking-[0.2em]

            ${
              premium
                ? "font-semibold text-[#A77B12]"
                : active
                  ? "text-[#C9A24A]"
                  : "text-[#9A8982]"
            }
          `}
        >
          {number}
        </span>

        <span
          className={`
            whitespace-nowrap
            text-[10px]
            tracking-[0.19em]
            transition-colors
            sm:text-[12px]
            sm:tracking-[0.25em]

            ${
              premium
                ? "font-semibold text-[#654A0A]"
                : active
                  ? "font-semibold text-[#741522]"
                  : "text-[#5C4942] group-hover:text-[#741522]"
            }
          `}
        >
          {label}
        </span>
      </div>

      <div
        className="
          ml-3
          flex
          shrink-0
          items-center
          gap-2
        "
      >
        {badge !== null && (
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
            {badge > 9
              ? "9+"
              : badge}
          </span>
        )}

        {icon ? (
          <span
            className={`
              transition-colors
              ${
                premium
                  ? "text-[#8A6410]"
                  : active
                    ? "text-[#741522]"
                    : "text-[#9A8982] group-hover:text-[#741522]"
              }
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
              transition-all
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