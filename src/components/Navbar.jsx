import React, {
  useCallback,
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
  Home,
  Grid3X3,
  LogIn,
  MapPin,
  Copy,
} from "lucide-react";
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

/* ============================================================
   CONFIG
============================================================ */

const WISHLIST_KEY = "wishlist";
const LOGO_SRC = "/IMG/Logo.jpg";
const COURIER_PARTNERS = ["DTDC", "India Post"];

const COURIER_TRACKING_URLS = {
  "DTDC": "https://www.dtdc.com/track-your-shipment/",
  "India Post": "https://www.tracktry.com/couriers/india-post",
};

const DEFAULT_COURIER = "DTDC";
const DEFAULT_TRACKING_LABEL = "Tracking ID not assigned";

const cleanCategory = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).replace(/\s+/g, " ").trim();
};

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

const getOrderCourier = (orderItem) => {
  if (!orderItem) return "";

  return (
    orderItem?.courierPartner ||
    orderItem?.courier ||
    orderItem?.shipment?.courierPartner ||
    orderItem?.shipment?.courier ||
    orderItem?.shipping?.courierPartner ||
    orderItem?.shipping?.courier ||
    ""
  );
};

const normalizeCourier = (courier) => {
  const key = String(courier || "").trim().toLowerCase();
  if (key.includes("dtdc")) return "DTDC";
  if (key.includes("india post") || key.includes("indiapost")) return "India Post";
  return "";
};

const getCourierLabel = (courier) =>
  normalizeCourier(courier) || DEFAULT_COURIER;

const isValidAwb = (awb) => {
  if (!awb) return false;
  const value = String(awb).trim();
  if (!value) return false;
  const invalidValues = new Set([
    "pending", "null", "undefined", "n/a", "na", "-",
    "not assigned", "not available", "tracking id not assigned",
  ]);
  return !invalidValues.has(value.toLowerCase());
};




/* ============================================================
   NAVBAR
============================================================ */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  const {
    login,
    setLogin,
    totalItems = 0,
    order = [],
    allProduct = [],
  } = useAppContext();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [wishlistCount, setWishlistCount] = useState(0);

  const userName =
    typeof window !== "undefined"
      ? localStorage.getItem("name")
      : "";

  /* ----------------------------------------------------------
     DYNAMIC CATEGORIES
  ---------------------------------------------------------- */

  const dynamicCategories = useMemo(() => {
    if (!Array.isArray(allProduct)) return [];

    const map = new Map();

    allProduct.forEach((product) => {
      const category = cleanCategory(product?.category);
      if (!category) return;

      const key = category.toLowerCase();
      if (!map.has(key)) map.set(key, category);
    });

    return Array.from(map.values()).sort((a, b) =>
      a.localeCompare(b, undefined, {
        sensitivity: "base",
      })
    );
  }, [allProduct]);

  /* ----------------------------------------------------------
     CUSTOMER AWB
  ---------------------------------------------------------- */

  const customerShipments = useMemo(() => {
    if (!Array.isArray(order)) return [];

    const seen = new Set();

    return order
      .map((item) => {
        const awb = getOrderAwb(item);
        const trackingId = String(awb || "").trim();
        const courier = normalizeCourier(getOrderCourier(item));

        if (!isValidAwb(trackingId)) return null;
        if (!COURIER_PARTNERS.includes(courier)) return null;

        const key = `${courier}::${trackingId}`;
        if (seen.has(key)) return null;
        seen.add(key);

        return {
          awb: trackingId,
          courier,
          trackingUrl: COURIER_TRACKING_URLS[courier],
          hasDirectLink: Boolean(COURIER_TRACKING_URLS[courier]),
          orderId: item?._id || item?.orderId || "",
          order: item,
        };
      })
      .filter(Boolean)
      .sort((a, b) => {
        const aDate = new Date(
          a.order?.orderDate ||
          a.order?.createdAt ||
          a.order?.date ||
          0
        ).getTime();

        const bDate = new Date(
          b.order?.orderDate ||
          b.order?.createdAt ||
          b.order?.date ||
          0
        ).getTime();

        return bDate - aDate;
      });
  }, [order]);

  const latestShipment = customerShipments[0] || {
    awb: "",
    courier: DEFAULT_COURIER,
    trackingUrl: COURIER_TRACKING_URLS[DEFAULT_COURIER],
    hasDirectLink: false,
    orderId: "",
    order: null,
    isDefault: true,
  };

  const latestAwb = latestShipment.awb || "";
  const hasTrackableOrder = customerShipments.length > 0;

  /* ----------------------------------------------------------
     WISHLIST COUNT
  ---------------------------------------------------------- */

  const readWishlistCount = useCallback(() => {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      const parsed = raw ? JSON.parse(raw) : [];

      setWishlistCount(
        Array.isArray(parsed) ? parsed.length : 0
      );
    } catch {
      setWishlistCount(0);
    }
  }, []);

  useEffect(() => {
    readWishlistCount();

    const updateWishlist = () => readWishlistCount();

    window.addEventListener(
      "darsh-wishlist-updated",
      updateWishlist
    );
    window.addEventListener(
      "wishlistUpdated",
      updateWishlist
    );
    window.addEventListener(
      "storage",
      updateWishlist
    );

    return () => {
      window.removeEventListener(
        "darsh-wishlist-updated",
        updateWishlist
      );
      window.removeEventListener(
        "wishlistUpdated",
        updateWishlist
      );
      window.removeEventListener(
        "storage",
        updateWishlist
      );
    };
  }, [readWishlistCount]);

  /* ----------------------------------------------------------
     LOGIN
  ---------------------------------------------------------- */

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLogin(true);
    }
  }, [setLogin]);

  /* ----------------------------------------------------------
     SCROLL
  ---------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  /* ----------------------------------------------------------
     CLOSE EVERYTHING WHEN ROUTE CHANGES
  ---------------------------------------------------------- */

  useEffect(() => {
    setMobileMenu(false);
    setCategoryOpen(false);
    setTrackingOpen(false);
  }, [location.pathname]);

  /* ----------------------------------------------------------
     BODY LOCK + ESCAPE KEY
  ---------------------------------------------------------- */

  useEffect(() => {
    const hasOverlay =
      mobileMenu || trackingOpen;

    const previousOverflow =
      document.body.style.overflow;

    if (hasOverlay) {
      document.body.style.overflow = "hidden";
    }

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (trackingOpen) {
        setTrackingOpen(false);
        return;
      }

      if (mobileMenu) {
        setMobileMenu(false);
        setCategoryOpen(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;

      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [mobileMenu, trackingOpen]);

  /* ----------------------------------------------------------
     NAVIGATION
  ---------------------------------------------------------- */

  const goTo = useCallback(
    (path) => {
      setMobileMenu(false);
      setCategoryOpen(false);
      setTrackingOpen(false);

      navigate(path);

      window.setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: reduceMotion
            ? "auto"
            : "smooth",
        });
      }, 0);
    },
    [navigate, reduceMotion]
  );

  const goToCategory = useCallback(
    (category) => {
      if (!category) return;

      setMobileMenu(false);
      setCategoryOpen(false);

      navigate(
        `/Categories/${encodeURIComponent(
          category
        )}`
      );

      window.setTimeout(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: reduceMotion
            ? "auto"
            : "smooth",
        });
      }, 0);
    },
    [navigate, reduceMotion]
  );

  const isActive = useCallback(
    (path) => {
      if (path === "/") {
        return location.pathname === "/";
      }

      return location.pathname.startsWith(path);
    },
    [location.pathname]
  );

  /* ----------------------------------------------------------
     TRACKING
  ---------------------------------------------------------- */

  const openCourierTracking = useCallback((shipmentOrCourier, awbValue) => {
    const courier =
      typeof shipmentOrCourier === "object"
        ? normalizeCourier(shipmentOrCourier?.courier)
        : normalizeCourier(shipmentOrCourier);

    const awb =
      typeof shipmentOrCourier === "object"
        ? String(shipmentOrCourier?.awb || "").trim()
        : String(awbValue || "").trim();

    const baseUrl = COURIER_TRACKING_URLS[courier];

    if (!awb) {
      toast.info("Tracking ID is not assigned yet", { theme: "dark" });
      return;
    }

    if (!baseUrl) {
      toast.info("Courier tracking is not available yet", { theme: "dark" });
      return;
    }

    window.open(baseUrl, "_blank", "noopener,noreferrer");
  }, []);

  const copyTrackingId = useCallback(async (value) => {
    if (!value) {
      toast.info("Tracking ID is not assigned yet", { theme: "dark" });
      return;
    }

    try {
      await navigator.clipboard.writeText(String(value));
      toast.success("Tracking ID copied", { theme: "dark" });
    } catch {
      toast.error("Could not copy Tracking ID", { theme: "dark" });
    }
  }, []);

  const handleTrackSubmit = (event) => {
    event.preventDefault();

    const value = trackingNumber.trim();

    if (!value) {
      if (hasTrackableOrder) {
        setTrackingNumber(latestAwb);
        openCourierTracking(latestShipment);
      } else {
        toast.info("No tracking ID is assigned yet", { theme: "dark" });
      }
      return;
    }

    const matched = customerShipments.find(
      (item) => String(item.awb).trim().toLowerCase() === value.toLowerCase()
    );

    if (!matched) {
      toast.info("Tracking ID not found in your dispatched orders", {
        theme: "dark",
      });
      return;
    }

    setTrackingOpen(false);
    setMobileMenu(false);
    openCourierTracking(matched);
  };

  const useLatestAwb = () => {
    if (!hasTrackableOrder) {
      toast.info("No tracking ID is assigned yet", { theme: "dark" });
      return;
    }

    setTrackingNumber(latestAwb);
  };

  /* ----------------------------------------------------------
     RENDER
  ---------------------------------------------------------- */

  return (
    <>
      {/* ======================================================
          ANNOUNCEMENT BAR
      ====================================================== */}

      <div className="relative z-[80] h-8 overflow-hidden bg-[#741522] text-[#FFF9F0] sm:h-9">
        <div className="flex h-full items-center justify-center overflow-hidden px-3">
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : { x: ["0%", "-2%", "0%"] }
            }
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex max-w-full items-center gap-2 whitespace-nowrap text-[6px] font-medium tracking-[0.22em] sm:gap-3 sm:text-[8px] sm:tracking-[0.28em]"
          >
            <span>FREE SHIPPING ACROSS INDIA</span>
            <span className="opacity-50">◆</span>
            <span>HANDLOOM COLLECTION</span>
            <span className="opacity-50">◆</span>
            <span>CRAFTED WITH LOVE</span>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute -left-[45%] top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[navbarShine_6s_ease-in-out_infinite]" />
      </div>

      {/* ======================================================
          MAIN HEADER
      ====================================================== */}

      <header
        className={`
          sticky top-0 z-[70]
          border-b border-[#741522]/10
          bg-[#F8F5ED]/95
          backdrop-blur-xl
          transition-all duration-300
          ${scrolled
            ? "shadow-[0_8px_30px_rgba(74,35,25,0.10)]"
            : ""}
        `}
      >
        <div
          className={`
            mx-auto flex w-full max-w-[1800px]
            items-center justify-between
            gap-2 px-3
            transition-[height] duration-300
            sm:gap-3 sm:px-5
            md:px-7
            lg:px-9
            xl:px-10
            2xl:px-12
            ${scrolled
              ? "h-[62px] sm:h-[68px]"
              : "h-[72px] sm:h-[80px]"}
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
              setCategoryOpen(false);

              window.scrollTo({
                top: 0,
                behavior: reduceMotion
                  ? "auto"
                  : "smooth",
              });
            }}
            className="group flex min-w-0 shrink-0 items-center"
          >
            <motion.div
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      scale: 0.82,
                      rotate: -8,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.55,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className={`
                relative flex shrink-0
                items-center justify-center
                rounded-full
                ${scrolled
                  ? "h-11 w-11 sm:h-12 sm:w-12"
                  : "h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16"}
              `}
            >
              <div className="absolute -inset-2 rounded-full bg-[#C9A24A]/10 opacity-0 blur-lg transition duration-500 group-hover:scale-110 group-hover:opacity-100" />

              <div className="absolute inset-0 rounded-full border border-[#C9A24A] bg-[#FFFDF8] shadow-[0_5px_20px_rgba(116,21,34,0.12)] transition duration-500 group-hover:border-[#741522]" />

              <div className="absolute inset-[4px] rounded-full border border-[#C9A24A]/40" />

              <motion.img
                src={LOGO_SRC}
                alt="Darsh"
                whileHover={
                  reduceMotion
                    ? undefined
                    : { scale: 1.06 }
                }
                className="relative z-10 h-[76%] w-[76%] rounded-full object-contain p-1 mix-blend-multiply"
                onError={(event) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />

              <motion.div
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        scale: [1, 1.15, 1],
                        rotate: [0, 8, 0],
                      }
                }
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-1 -top-1 z-30 flex h-5 w-5 items-center justify-center rounded-full bg-[#FFFDF8] shadow-sm"
              >
                <Sparkles
                  size={10}
                  className="text-[#C9A24A]"
                />
              </motion.div>
            </motion.div>

            <div className="ml-2 min-w-0 sm:ml-3">
              <span className="block truncate font-serif text-[12px] font-semibold tracking-[0.2em] text-[#741522] sm:text-[15px] lg:text-[18px]">
                DARSH
              </span>

              <span className="mt-0.5 hidden text-[6px] font-medium tracking-[0.25em] text-[#806B63] sm:block lg:text-[6.5px]">
                HANDWOVEN SAREES
              </span>
            </div>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              xl/2xl only — avoids collision on tablets
          ================================================== */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center justify-center gap-1 xl:flex 2xl:gap-2"
          >
            <DesktopNavButton
              label="SHOP"
              active={isActive("/")}
              onClick={() => goTo("/")}
            />

            <DesktopNavButton
              label="NEW ARRIVALS"
              icon={
                <Sparkles
                  size={11}
                  className="text-[#C9A24A]"
                />
              }
              active={isActive(
                "/newarrivals"
              )}
              onClick={() =>
                goTo("/newarrivals")
              }
            />

            <DesktopCategoryMenu
              open={categoryOpen}
              setOpen={setCategoryOpen}
              categories={dynamicCategories}
              onCategory={goToCategory}
              onViewAll={() =>
                goTo("/allproducts")
              }
            />

            <DesktopNavButton
              label="HOT SALES"
              active={isActive("/hotsales")}
              onClick={() =>
                goTo("/hotsales")
              }
            />

            <DesktopNavButton
              label="PREMIUM SAREES"
              premium
              active={isActive(
                "/premium-sarees"
              )}
              icon={
                <Crown
                  size={13}
                  strokeWidth={2}
                />
              }
              onClick={() =>
                goTo("/premium-sarees")
              }
            />

            <DesktopNavButton
              label="OUR STORY"
              active={isActive("/aboutus")}
              onClick={() =>
                goTo("/aboutus")
              }
            />

            <DesktopNavButton
              label="CONTACT"
              active={isActive("/contactus")}
              onClick={() =>
                goTo("/contactus")
              }
            />
          </nav>

          {/* ==================================================
              RIGHT ACTIONS
          ================================================== */}

          <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
            <IconAction
              label="Search products"
              active={isActive("/allproducts")}
              onClick={() =>
                goTo("/allproducts")
              }
            >
              <Search
                size={18}
                strokeWidth={1.6}
              />
            </IconAction>

            <IconAction
              label="Wishlist"
              active={isActive("/wishlist")}
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
                size={18}
                strokeWidth={1.6}
                fill={
                  isActive("/wishlist")
                    ? "currentColor"
                    : "none"
                }
              />
            </IconAction>

            <IconAction
              label="Track your order"
              className="hidden md:flex"
              onClick={() =>
                setTrackingOpen(true)
              }
            >
              <Truck
                size={18}
                strokeWidth={1.6}
              />
            </IconAction>

            <IconAction
              label={
                login
                  ? "My account"
                  : "Login / Account"
              }
              active={isActive("/account")}
              onClick={() =>
                goTo(
                  login
                    ? "/account?tab=1"
                    : "/account"
                )
              }
            >
              <UserRound
                size={18}
                strokeWidth={1.6}
              />
            </IconAction>

            <IconAction
              label="Shopping bag"
              accent
              active={isActive("/cart")}
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
                strokeWidth={1.6}
              />
            </IconAction>

            {/* Menu remains available on tablet/mobile.
                Desktop navigation starts at xl. */}
            <motion.button
              type="button"
              whileTap={
                reduceMotion
                  ? undefined
                  : { scale: 0.92 }
              }
              onClick={() => {
                setMobileMenu(
                  (value) => !value
                );
                setCategoryOpen(false);
              }}
              aria-label={
                mobileMenu
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenu}
              className="ml-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#741522] transition hover:bg-[#741522]/5 sm:h-10 sm:w-10 xl:hidden"
            >
              <AnimatePresence
                mode="wait"
                initial={false}
              >
                {mobileMenu ? (
                  <motion.span
                    key="close"
                    initial={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: -90,
                            opacity: 0,
                          }
                    }
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: 90,
                            opacity: 0,
                          }
                    }
                  >
                    <X size={23} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: 90,
                            opacity: 0,
                          }
                    }
                    animate={{
                      rotate: 0,
                      opacity: 1,
                    }}
                    exit={
                      reduceMotion
                        ? undefined
                        : {
                            rotate: -90,
                            opacity: 0,
                          }
                    }
                  >
                    <Menu size={23} />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </header>

      {/* ======================================================
          MOBILE / TABLET DRAWER
      ====================================================== */}

      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            className="fixed inset-0 z-[100] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay */}
            <button
              type="button"
              aria-label="Close navigation"
              onClick={() => {
                setMobileMenu(false);
                setCategoryOpen(false);
              }}
              className="absolute inset-0 h-full w-full cursor-default bg-[#351B18]/45 backdrop-blur-[2px]"
            />

            {/* Drawer */}
            <motion.aside
              initial={
                reduceMotion
                  ? undefined
                  : { x: "100%" }
              }
              animate={{ x: 0 }}
              exit={
                reduceMotion
                  ? undefined
                  : { x: "100%" }
              }
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.38,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="absolute right-0 top-0 flex h-full w-[min(92vw,460px)] flex-col overflow-hidden border-l border-[#741522]/10 bg-[#F8F5ED] shadow-2xl"
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}
              <div className="flex min-h-[78px] shrink-0 items-center justify-between border-b border-[#741522]/10 px-4 sm:min-h-[92px] sm:px-6">
                <Link
                  to="/"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="flex min-w-0 items-center"
                >
                  <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full sm:h-14 sm:w-14">
                    <div className="absolute inset-0 rounded-full border border-[#C9A24A] bg-[#FFFDF8]" />
                    <div className="absolute inset-[4px] rounded-full border border-[#C9A24A]/40" />
                    <img
                      src={LOGO_SRC}
                      alt="Darsh"
                      className="relative z-10 h-[76%] w-[76%] rounded-full object-contain p-1 mix-blend-multiply"
                    />
                    <Sparkles
                      size={10}
                      className="absolute -right-1 -top-1 z-20 text-[#C9A24A]"
                    />
                  </div>

                  <div className="ml-3 min-w-0">
                    <p className="truncate font-serif text-[12px] font-semibold tracking-[0.24em] text-[#741522] sm:text-[14px]">
                      DARSH
                    </p>
                    <p className="mt-0.5 text-[6px] tracking-[0.26em] text-[#806B63] sm:text-[7px]">
                      HANDWOVEN SAREES
                    </p>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  aria-label="Close menu"
                  className="ml-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522] transition hover:bg-[#741522] hover:text-white"
                >
                  <X size={19} />
                </button>
              </div>

              {/* Welcome Card */}
              <div className="shrink-0 px-5 pb-2 pt-6 sm:px-7 sm:pt-7">
                <div className="rounded-2xl border border-[#741522]/10 bg-[#FFFDF8] p-4 shadow-[0_8px_30px_rgba(74,35,25,0.05)] sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[7px] font-semibold tracking-[0.28em] text-[#C9A24A]">
                        {login
                          ? "WELCOME BACK"
                          : "WELCOME TO DARSH"}
                      </p>

                      <h2 className="mt-1 truncate font-serif text-lg text-[#3F302B] sm:text-xl">
                        {login
                          ? userName ||
                            "Darsh"
                          : "The Darsh Collection"}
                      </h2>
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#741522]/5 text-[#741522]">
                      {login ? (
                        <UserRound size={17} />
                      ) : (
                        <Sparkles size={17} />
                      )}
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <QuickMobileAction
                      icon={
                        <Search
                          size={15}
                        />
                      }
                      label="Search"
                      onClick={() =>
                        goTo(
                          "/allproducts"
                        )
                      }
                    />

                    <QuickMobileAction
                      icon={
                        <Heart
                          size={15}
                        />
                      }
                      label="Wishlist"
                      badge={
                        wishlistCount >
                        0
                          ? wishlistCount
                          : null
                      }
                      onClick={() =>
                        goTo("/wishlist")
                      }
                    />

                    <QuickMobileAction
                      icon={
                        <ShoppingBag
                          size={15}
                        />
                      }
                      label="Bag"
                      badge={
                        totalItems > 0
                          ? totalItems
                          : null
                      }
                      onClick={() =>
                        goTo("/cart")
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Scrollable Nav */}
              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-8 pt-3 [scrollbar-width:thin] sm:px-7">
                <div className="border-t border-[#741522]/10">
                  <MobileNavItem
                    number="01"
                    label="SHOP"
                    active={isActive("/")}
                    icon={<Home size={17} />}
                    onClick={() =>
                      goTo("/")
                    }
                  />

                  {/* Categories */}
                  <div className="border-b border-[#741522]/10">
                    <button
                      type="button"
                      onClick={() =>
                        setCategoryOpen(
                          (value) =>
                            !value
                        )
                      }
                      aria-expanded={
                        categoryOpen
                      }
                      className="group flex w-full items-center justify-between py-4 text-left sm:py-5"
                    >
                      <div className="flex min-w-0 items-center gap-4">
                        <span className="shrink-0 text-[8px] tracking-[0.2em] text-[#C9A24A]">
                          02
                        </span>

                        <span className="truncate text-[10px] font-medium tracking-[0.18em] text-[#5C4942] transition group-hover:text-[#741522] sm:text-[12px] sm:tracking-[0.22em]">
                          SHOP BY CATEGORY
                        </span>
                      </div>

                      <motion.span
                        animate={{
                          rotate:
                            categoryOpen
                              ? 180
                              : 0,
                        }}
                        className="ml-3 shrink-0 text-[#9A8982]"
                      >
                        <ChevronDown
                          size={17}
                        />
                      </motion.span>
                    </button>

                    <AnimatePresence
                      initial={false}
                    >
                      {categoryOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration:
                              reduceMotion
                                ? 0
                                : 0.25,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="mb-4 rounded-2xl border border-[#741522]/10 bg-white/55 p-2">
                            <button
                              type="button"
                              onClick={() =>
                                goTo(
                                  "/allproducts"
                                )
                              }
                              className="mb-1 flex w-full items-center justify-between rounded-xl bg-[#741522] px-3 py-3 text-left text-[8px] font-semibold tracking-[0.16em] text-white"
                            >
                              <span>
                                VIEW ALL PRODUCTS
                              </span>
                              <ArrowUpRight
                                size={13}
                              />
                            </button>

                            <div className="max-h-[330px] overflow-y-auto pr-1">
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
                                      initial={
                                        reduceMotion
                                          ? undefined
                                          : {
                                              opacity: 0,
                                              x: -8,
                                            }
                                      }
                                      animate={{
                                        opacity: 1,
                                        x: 0,
                                      }}
                                      transition={{
                                        delay:
                                          reduceMotion
                                            ? 0
                                            : Math.min(
                                                index *
                                                  0.015,
                                                0.2
                                              ),
                                      }}
                                      onClick={() =>
                                        goToCategory(
                                          category
                                        )
                                      }
                                      className="group flex w-full items-center justify-between gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-[#741522]/5"
                                    >
                                      <span className="min-w-0 truncate text-[9px] tracking-[0.06em] text-[#6E5A52] group-hover:text-[#741522]">
                                        {
                                          category
                                        }
                                      </span>

                                      <ChevronRight
                                        size={
                                          13
                                        }
                                        className="shrink-0 text-[#9A8982] transition group-hover:translate-x-1 group-hover:text-[#741522]"
                                      />
                                    </motion.button>
                                  )
                                )
                              ) : (
                                <div className="px-3 py-8 text-center">
                                  <Grid3X3
                                    size={18}
                                    className="mx-auto mb-2 text-[#C9A24A]"
                                  />
                                  <p className="text-[8px] tracking-[0.15em] text-[#9A8982]">
                                    NO CATEGORIES
                                    AVAILABLE
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <MobileNavItem
                    number="03"
                    label="NEW ARRIVALS"
                    active={isActive(
                      "/newarrivals"
                    )}
                    icon={
                      <Sparkles
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        "/newarrivals"
                      )
                    }
                  />

                  <MobileNavItem
                    number="04"
                    label="PREMIUM SAREES"
                    premium
                    active={isActive(
                      "/premium-sarees"
                    )}
                    icon={
                      <Crown
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        "/premium-sarees"
                      )
                    }
                  />

                  <MobileNavItem
                    number="05"
                    label="HOT SALES"
                    active={isActive(
                      "/hotsales"
                    )}
                    icon={
                      <Sparkles
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        "/hotsales"
                      )
                    }
                  />

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

                  <MobileNavItem
                    number="07"
                    label="TRACK YOUR ORDER"
                    icon={
                      <Truck
                        size={17}
                      />
                    }
                    onClick={() =>
                      setTrackingOpen(
                        true
                      )
                    }
                  />

                  <MobileNavItem
                    number="08"
                    label={
                      login
                        ? "MY ACCOUNT"
                        : "LOGIN / ACCOUNT"
                    }
                    active={isActive(
                      "/account"
                    )}
                    icon={
                      login ? (
                        <UserRound
                          size={17}
                        />
                      ) : (
                        <LogIn
                          size={17}
                        />
                      )
                    }
                    onClick={() =>
                      goTo(
                        login
                          ? "/account?tab=1"
                          : "/account"
                      )
                    }
                  />

                  <MobileNavItem
                    number="09"
                    label="OUR STORY"
                    active={isActive(
                      "/aboutus"
                    )}
                    icon={
                      <MapPin
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        "/aboutus"
                      )
                    }
                  />

                  <MobileNavItem
                    number="10"
                    label="CONTACT"
                    active={isActive(
                      "/contactus"
                    )}
                    icon={
                      <ArrowUpRight
                        size={17}
                      />
                    }
                    onClick={() =>
                      goTo(
                        "/contactus"
                      )
                    }
                  />
                </div>

                {/* Drawer Footer */}
                <div className="mt-7 overflow-hidden rounded-2xl bg-[#741522] p-4 text-white shadow-[0_12px_35px_rgba(116,21,34,0.18)] sm:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[7px] font-semibold tracking-[0.25em] text-[#E7C979]">
                        DARSH EDIT
                      </p>
                      <h3 className="mt-1 font-serif text-lg">
                        Find your perfect
                        weave.
                      </h3>
                      <p className="mt-1 text-[8px] leading-relaxed text-white/70">
                        Handpicked sarees,
                        timeless
                        craftsmanship.
                      </p>
                    </div>

                    <Sparkles
                      size={18}
                      className="shrink-0 text-[#E7C979]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      goTo(
                        "/allproducts"
                      )
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 text-[8px] font-semibold tracking-[0.18em] text-[#741522] transition hover:bg-[#FFF9E2]"
                  >
                    EXPLORE COLLECTION
                    <ArrowUpRight
                      size={13}
                    />
                  </button>
                </div>

                <div className="py-6 text-center">
                  <p className="text-[7px] tracking-[0.2em] text-[#9A8982]">
                    ✦ DARSH · HANDWOVEN
                    SAREES ✦
                  </p>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          TRACKING MODAL
      ====================================================== */}

      <AnimatePresence>
        {trackingOpen && (
          <motion.div
            className="fixed inset-0 z-[130] flex items-center justify-center bg-[#351B18]/55 px-4 py-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() =>
              setTrackingOpen(false)
            }
          >
            <motion.form
              onSubmit={handleTrackSubmit}
              onMouseDown={(event) =>
                event.stopPropagation()
              }
              initial={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 22,
                      scale: 0.97,
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 0,
                      y: 18,
                      scale: 0.97,
                    }
              }
              transition={{
                duration: reduceMotion
                  ? 0
                  : 0.28,
              }}
              className="relative max-h-[92vh] w-full max-w-md overflow-y-auto rounded-[26px] border border-[#C9A24A]/30 bg-[#FFFDF8] p-5 shadow-[0_30px_100px_rgba(35,15,12,0.28)] sm:p-7"
            >
              <button
                type="button"
                onClick={() =>
                  setTrackingOpen(
                    false
                  )
                }
                aria-label="Close tracking dialog"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#741522]/10 text-[#806B63] transition hover:bg-[#741522] hover:text-white sm:right-4 sm:top-4"
              >
                <X size={17} />
              </button>

              <div className="pr-10">
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, -3, 0],
                        }
                  }
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#741522]/5 text-[#741522]"
                >
                  <Truck
                    size={20}
                    strokeWidth={1.5}
                  />
                </motion.div>

                <p className="text-[8px] font-semibold tracking-[0.28em] text-[#C9A24A]">
                  DARSH DELIVERY
                </p>

                <h3 className="mt-1 font-serif text-2xl text-[#3F302B]">
                  Track Your Order
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#806B63]">
                  Enter your AWB /
                  tracking number
                  and continue to
                  Courier tracking.
                </p>
              </div>

              <div className="mt-6 rounded-2xl border border-[#741522]/10 bg-[#F8F5ED] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[7px] font-semibold tracking-[0.2em] text-[#C9A24A]">
                      ACTIVE SHIPMENT
                    </p>

                    <p className="mt-1 text-xs text-[#5C4942]">
                      {hasTrackableOrder
                        ? "Your latest dispatched order"
                        : "Default courier selected — tracking pending"}
                    </p>
                  </div>

                  <Truck
                    size={18}
                    className="shrink-0 text-[#741522]"
                  />
                </div>

                {latestShipment ? (
                  <div className="mt-3 overflow-hidden rounded-xl border border-[#741522]/10 bg-white">
                    <div className="flex items-center justify-between gap-3 border-b border-[#741522]/10 px-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#9A8982]">
                          Courier partner
                        </p>
                        <p className="mt-0.5 truncate text-sm font-bold text-[#741522]">
                          {latestShipment.courier}
                        </p>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#741522]/5 px-2 py-1 text-[7px] font-semibold text-[#741522]">
                        1 courier
                      </span>
                    </div>

                    <div className="px-3 py-3">
                      <p className="text-[7px] font-semibold uppercase tracking-[0.16em] text-[#9A8982]">
                        Tracking ID
                      </p>

                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="min-w-0 flex-1 truncate font-mono text-sm font-bold tracking-wide text-[#3F302B]">
                          {latestShipment.awb || DEFAULT_TRACKING_LABEL}
                        </span>

                        <button
                          type="button"
                          onClick={() => copyTrackingId(latestShipment.awb)}
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#741522]/10 bg-[#F8F5ED] text-[#741522] transition hover:bg-[#741522] hover:text-white"
                          aria-label="Copy tracking ID"
                          title="Copy tracking ID"
                        >
                          <Copy size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => openCourierTracking(latestShipment)}
                        disabled={!latestShipment.hasDirectLink}
                        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#741522] px-4 py-3 text-[8px] font-bold tracking-[0.16em] text-white transition hover:bg-[#5E101C] disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {latestShipment.awb
                          ? `TRACK WITH ${latestShipment.courier.toUpperCase()}`
                          : `WAITING FOR ${latestShipment.courier.toUpperCase()} TRACKING`}
                        <ArrowUpRight size={13} />
                      </button>

                      {!latestShipment.hasDirectLink && (
                        <p className="mt-2 text-center text-[8px] leading-relaxed text-[#9A8982]">
                          Tracking link for this courier is not configured yet.
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 rounded-xl border border-dashed border-[#741522]/15 bg-white px-4 py-5 text-center">
                    <Package size={20} className="mx-auto text-[#C9A24A]" />
                    <p className="mt-2 text-xs font-semibold text-[#5C4942]">
                      Courier partner is ready. Tracking ID will appear here after dispatch.
                    </p>
                  </div>
                )}
              </div>

              <div className="relative mt-4">
                <input
                  value={trackingNumber}
                  onChange={(event) =>
                    setTrackingNumber(event.target.value)
                  }
                  placeholder="Paste tracking ID"
                  autoComplete="off"
                  aria-label="Tracking number"
                  className="w-full rounded-xl border border-[#741522]/15 bg-[#F8F5ED] px-4 py-3.5 pr-11 text-sm text-[#3F302B] outline-none transition placeholder:text-[#A79A94] focus:border-[#C9A24A] focus:ring-4 focus:ring-[#C9A24A]/10"
                />

                <Package
                  size={17}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8982]"
                />
              </div>

              <button
                type="submit"
                disabled={!trackingNumber.trim()}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#741522]/15 bg-white px-5 py-3 text-[8px] font-semibold tracking-[0.18em] text-[#741522] transition hover:bg-[#741522] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                OPEN TRACKING
                <ArrowUpRight size={14} />
              </button>

              {latestShipment && (
                <button
                  type="button"
                  onClick={useLatestAwb}
                  className="mt-3 flex w-full items-center justify-center gap-2 text-[8px] font-semibold tracking-[0.13em] text-[#741522] transition hover:text-[#C9A24A]"
                >
                  USE CURRENT TRACKING ID
                  <ChevronRight size={12} />
                </button>
              )}

              <p className="mt-4 text-center text-[8px] leading-relaxed tracking-[0.03em] text-[#9A8982]">
                Your courier partner is selected by Darsh when the order is dispatched.
                Copy the tracking ID or open the courier tracking link directly.
              </p>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          LOCAL ANIMATION
      ====================================================== */}

      <style>
        {`
          @keyframes navbarShine {
            0% {
              left: -45%;
            }
            45%,
            100% {
              left: 135%;
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
   DESKTOP CATEGORY MENU
============================================================ */

const DesktopCategoryMenu = ({
  open,
  setOpen,
  categories,
  onCategory,
  onViewAll,
}) => {
  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() =>
        setOpen(true)
      }
      onMouseLeave={() =>
        setOpen(false)
      }
    >
      <button
        type="button"
        onClick={() =>
          setOpen((value) => !value)
        }
        aria-expanded={open}
        aria-haspopup="true"
        className="group relative flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-[8px] font-medium tracking-[0.13em] text-[#806B63] transition hover:bg-[#741522]/5 hover:text-[#741522] 2xl:px-3.5 2xl:text-[9px] 2xl:tracking-[0.15em]"
      >
        SHOP BY CATEGORY

        <ChevronDown
          size={11}
          className={`transition-transform duration-300 ${
            open
              ? "rotate-180 text-[#741522]"
              : ""
          }`}
        />

        <span className="absolute bottom-0 left-3 h-px w-0 bg-[#741522] transition-all duration-300 group-hover:w-[calc(100%-24px)]" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-1/2 top-full z-[120] w-[min(760px,calc(100vw-32px))] -translate-x-1/2 pt-3"
          >
            <div className="overflow-hidden rounded-2xl border border-[#741522]/10 bg-[#FFFDF8] p-5 shadow-[0_25px_70px_rgba(74,35,25,0.18)] 2xl:p-6">
              <div className="mb-4 flex items-end justify-between gap-4 border-b border-[#741522]/10 pb-4">
                <div>
                  <p className="text-[7px] font-semibold tracking-[0.28em] text-[#C9A24A]">
                    EXPLORE DARSH
                  </p>

                  <h3 className="mt-1 font-serif text-xl text-[#3F302B]">
                    Shop By Category
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={onViewAll}
                  className="flex shrink-0 items-center gap-1 text-[8px] font-semibold tracking-[0.14em] text-[#741522] transition hover:text-[#C9A24A]"
                >
                  VIEW ALL
                  <ArrowUpRight
                    size={12}
                  />
                </button>
              </div>

              <div className="max-h-[380px] overflow-y-auto pr-1">
                {categories.length > 0 ? (
                  <div className="grid grid-cols-2 gap-1 md:grid-cols-3">
                    {categories.map(
                      (category, index) => (
                        <motion.button
                          key={category}
                          type="button"
                          initial={{
                            opacity: 0,
                            x: -6,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          transition={{
                            delay: Math.min(
                              index * 0.015,
                              0.2
                            ),
                          }}
                          onClick={() =>
                            onCategory(
                              category
                            )
                          }
                          className="group flex min-w-0 items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-left transition hover:bg-[#741522]/5 hover:pl-3"
                        >
                          <span className="min-w-0 truncate text-[8px] tracking-[0.04em] text-[#6E5A52] transition group-hover:text-[#741522] 2xl:text-[9px]">
                            {category}
                          </span>

                          <ChevronRight
                            size={12}
                            className="shrink-0 text-[#C9A24A] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100"
                          />
                        </motion.button>
                      )
                    )}
                  </div>
                ) : (
                  <div className="flex min-h-[130px] items-center justify-center text-center">
                    <div>
                      <Sparkles
                        size={20}
                        className="mx-auto mb-3 text-[#C9A24A]"
                      />
                      <p className="text-[8px] tracking-[0.15em] text-[#9A8982]">
                        NO CATEGORIES
                        AVAILABLE
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl bg-[#741522] px-4 py-3 text-white">
                <div className="flex min-w-0 items-center gap-2">
                  <Sparkles
                    size={13}
                    className="shrink-0 text-[#E7C979]"
                  />
                  <span className="truncate text-[7px] tracking-[0.14em] sm:text-[8px]">
                    FIND YOUR PERFECT
                    WEAVE
                  </span>
                </div>

                <button
                  type="button"
                  onClick={onViewAll}
                  className="shrink-0 text-[7px] font-semibold tracking-[0.13em] underline underline-offset-4 sm:text-[8px]"
                >
                  SHOP NOW
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
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
        group relative flex shrink-0
        items-center gap-1
        
        px-2.5 py-2
        whitespace-nowrap
        text-[8px]
        tracking-[0.12em]
        transition-all duration-300
        2xl:px-3
        2xl:text-[9px]
        2xl:tracking-[0.14em]

        ${
          premium
            ? "overflow-hidden rounded-full border border-[#D7B95C]/60 bg-gradient-to-r from-[#FFF9E2] via-[#F5E4AE] to-[#EED27A] font-semibold text-[#654A0A] shadow-[0_3px_14px_rgba(201,162,74,0.18)] hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(201,162,74,0.28)]"
            : active
              ? " font-semibold text-[#741522]"
              : "border-transparent text-[#806B63] "
        }
      `}
    >
      {premium && (
        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute -left-1/2 top-0 h-full w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent opacity-70 transition-all duration-700 group-hover:left-[120%]" />
        </span>
      )}

      <span className="relative z-10">
        {label}

        {!premium && (
          <span
            className={`
              absolute -bottom-0.5 left-0 h-px
              bg-[#741522]
              transition-all duration-300
              ${
                active
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }
            `}
          />
        )}
      </span>

      {icon && (
        <motion.span
          className="relative z-10"
          animate={{
            y: [0, -1, 0],
          }}
          transition={{
            duration: premium
              ? 2.4
              : 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {icon}
        </motion.span>
      )}

      {premium && (
        <Sparkles
          size={9}
          strokeWidth={2}
          className="relative z-10 text-[#A77B12]"
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
        group relative flex
        h-9 w-9 shrink-0
        items-center justify-center
        rounded-full
        transition-all duration-300
        hover:bg-[#741522]/5
        sm:h-10 sm:w-10
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
          scale: 1.05,
        }}
      >
        {children}
      </motion.span>

      <span className="pointer-events-none absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-[#741522] transition-all duration-300 group-hover:w-4" />

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
          className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#741522] px-1 text-[8px] font-semibold text-white shadow-sm"
        >
          {badge > 9 ? "9+" : badge}
        </motion.span>
      )}
    </button>
  );
};

/* ============================================================
   QUICK MOBILE ACTION
============================================================ */

const QuickMobileAction = ({
  icon,
  label,
  onClick,
  badge = null,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl border border-[#741522]/10 bg-[#F8F5ED] px-2 py-2.5 text-[#741522] transition hover:border-[#C9A24A]/60 hover:bg-white"
    >
      {icon}

      <span className="text-[7px] font-medium tracking-[0.08em] text-[#6E5A52]">
        {label}
      </span>

      {badge !== null && (
        <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#741522] px-1 text-[7px] font-semibold text-white">
          {badge > 9 ? "9+" : badge}
        </span>
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
      whileTap={{ scale: 0.985 }}
      type="button"
      onClick={onClick}
      className={`
        group flex w-full
        items-center justify-between
        border-b py-4 text-left
        transition-all duration-300
        sm:py-5

        ${
          premium
            ? "border-[#D7B95C]/50 bg-gradient-to-r from-[#FFF9E2] via-[#F6E5AF] to-[#EED27A] px-4 shadow-[0_4px_16px_rgba(201,162,74,0.16)]"
            : "border-[#741522]/10"
        }
      `}
    >
      <div className="flex min-w-0 items-center gap-4">
        <span
          className={`
            shrink-0 text-[8px]
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
            min-w-0 truncate
            text-[10px]
            tracking-[0.18em]
            transition-colors
            sm:text-[12px]
            sm:tracking-[0.22em]
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

      <div className="ml-3 flex shrink-0 items-center gap-2">
        {badge !== null && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#741522] px-1.5 text-[9px] font-medium text-white">
            {badge > 9 ? "9+" : badge}
          </span>
        )}

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
          {icon || (
            <ChevronRight
              size={17}
              strokeWidth={1.2}
            />
          )}
        </span>
      </div>
    </motion.button>
  );
};

export default Navbar;