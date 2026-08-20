import React, { useEffect, useMemo, useRef, useState } from "react";
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
  Heart,
  Clock3,
  ArrowRight,
  Edit3,
  Camera,
  Trash2,
  CheckCircle2,
  X,
} from "lucide-react";

import AccountInfo from "../components/AccountInfo";
import AddressInfo from "../components/AddressInfo";
import OrderInfo from "../components/MyOrders";

import { useNavigate, useSearchParams } from "react-router-dom";
import LogoutModal from "./LogoutModal";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useAppContext } from "../context/AppContext";





const PROFILE_IMAGE_KEY = "darshProfileImage";

const SupportCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="relative overflow-hidden rounded-[24px] border border-[#d4ad54]/25 bg-gradient-to-br from-[#fffdf8] via-[#f8f1e5] to-[#f3e4d0] p-4 shadow-[0_14px_35px_rgba(63,22,22,0.06)] sm:p-5"
  >
    <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-[#741522]/10" />
    <div className="pointer-events-none absolute -bottom-16 -left-10 h-28 w-28 rounded-full bg-[#d4ad54]/10 blur-2xl" />

    <div className="relative z-10">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#741522] text-white shadow-md">
          <HelpCircle className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-[#9b7429]">
            Darsh Care
          </p>
          <h3 className="mt-1 font-serif text-base font-semibold text-[#4a1815]">
            Need help?
          </h3>
          <p className="mt-1 text-[10px] leading-4 text-[#806c63]">
            Our support team is ready to help with your orders and account.
          </p>
        </div>
      </div>

      <motion.button
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          window.location.href = "tel:+917363054510";
        }}
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#741522] px-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-md transition hover:bg-[#5a1018]"
      >
        <Phone className="h-4 w-4" />
        Call support
      </motion.button>
    </div>
  </motion.div>
);

const Account = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { login, totalItems, url } = useAppContext();

  const userEmail = localStorage.getItem("email") || "";
  const userName = localStorage.getItem("name") || "";

  const [showModal, setShowModal] = useState(false);
  const [comp, setComp] = useState(1);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [paidOrderCount, setPaidOrderCount] = useState(0);
  const [paidOrdersLoading, setPaidOrdersLoading] = useState(true);

  const [wishlistCount, setWishlistCount] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);

  const [profileImage, setProfileImage] = useState(() => {
    try {
      return localStorage.getItem(PROFILE_IMAGE_KEY) || "";
    } catch {
      return "";
    }
  });

  const [imageMenuOpen, setImageMenuOpen] = useState(false);
  const fileInputRef = useRef(null);

  const displayName = userName.trim()
    ? userName.split(" ")[0]
    : "Customer";

  const fullDisplayName = userName.trim() || "Darsh Customer";

  const tabs = useMemo(
    () => [
      {
        id: 1,
        label: "Profile",
        description: "Personal information",
        icon: <User className="h-5 w-5" />,
      },
      {
        id: 2,
        label: "Addresses",
        description: "Delivery addresses",
        icon: <MapPin className="h-5 w-5" />,
      },
      {
        id: 3,
        label: "Orders",
        description: "Order history",
        icon: <Package className="h-5 w-5" />,
      },
      {
        id: 7,
        label: "Logout",
        description: "Sign out safely",
        icon: <LogOut className="h-5 w-5" />,
        isDanger: true,
      },
    ],
    []
  );

  const currentTab = tabs.find((tab) => tab.id === comp) || tabs[0];

  const isPaidOrder = (order) => {
    if (!order || typeof order !== "object") return false;

    const paymentStatus = String(
      order.payStatus ??
        order.paymentStatus ??
        order.payment_status ??
        order.payment?.status ??
        order.payment?.paymentStatus ??
        order.payment?.payment_status ??
        order.payment?.state ??
        order.status ??
        ""
    )
      .trim()
      .toLowerCase();

    const booleanPaid =
      order.isPaid === true ||
      order.paid === true ||
      order.payment?.paid === true ||
      order.payment?.amount_paid === true;

    return (
      booleanPaid ||
      ["paid", "success", "successful", "completed", "captured"].includes(
        paymentStatus
      )
    );
  };

  const readWishlistCount = () => {
    try {
      const raw =
        localStorage.getItem("darshWishlist") ||
        localStorage.getItem("wishlist") ||
        "[]";

      const data = JSON.parse(raw);
      return Array.isArray(data) ? data.length : 0;
    } catch {
      return 0;
    }
  };

  const syncAccountData = () => {
    setWishlistCount(readWishlistCount());

    try {
      const raw = localStorage.getItem("darsh_recently_viewed");
      const viewed = raw ? JSON.parse(raw) : [];
      setRecentActivity(Array.isArray(viewed) ? viewed.slice(0, 3) : []);
    } catch {
      setRecentActivity([]);
    }
  };

  useEffect(() => {
    let cancelled = false;

    const fetchPaidOrderCount = async () => {
      const token = localStorage.getItem("token");

      if (!token || !url) {
        if (!cancelled) {
          setPaidOrderCount(0);
          setPaidOrdersLoading(false);
        }
        return;
      }

      try {
        setPaidOrdersLoading(true);

        const response = await axios.get(`${url}/api/payment/getOrderById`, {
          headers: {
            Auth: token,
          },
        });

        const rawOrders =
          response?.data?.orders ??
          response?.data?.data?.orders ??
          response?.data?.data ??
          response?.data ??
          [];

        const orders = Array.isArray(rawOrders)
          ? rawOrders
          : Array.isArray(rawOrders?.orders)
          ? rawOrders.orders
          : [];

        const paidCount = orders.filter(isPaidOrder).length;

        if (!cancelled) setPaidOrderCount(paidCount);
      } catch (error) {
        console.error("Failed to fetch paid order count:", error);
        if (!cancelled) setPaidOrderCount(0);
      } finally {
        if (!cancelled) setPaidOrdersLoading(false);
      }
    };

    fetchPaidOrderCount();

    const refreshPaidOrders = () => fetchPaidOrderCount();

    window.addEventListener("storage", refreshPaidOrders);
    window.addEventListener("darsh:orders-updated", refreshPaidOrders);
    window.addEventListener("darsh:payment-updated", refreshPaidOrders);

    return () => {
      cancelled = true;
      window.removeEventListener("storage", refreshPaidOrders);
      window.removeEventListener("darsh:orders-updated", refreshPaidOrders);
      window.removeEventListener("darsh:payment-updated", refreshPaidOrders);
    };
  }, [url, login]);

  useEffect(() => {
    syncAccountData();

    window.addEventListener("storage", syncAccountData);
    window.addEventListener("darsh:wishlist-updated", syncAccountData);

    return () => {
      window.removeEventListener("storage", syncAccountData);
      window.removeEventListener("darsh:wishlist-updated", syncAccountData);
    };
  }, []);

  useEffect(() => {
    const tabFromUrl = searchParams.get("tab");

    if (tabFromUrl) {
      const tabId = parseInt(tabFromUrl, 10);
      const validTab = tabs.some((tab) => tab.id === tabId);

      if (validTab && tabId !== 7) setComp(tabId);
    }
  }, [searchParams, tabs]);

  const handleTabChange = (tabId) => {
    if (tabId === 7) {
      setShowModal(true);
      return;
    }

    setComp(tabId);
    setIsMobileMenuOpen(false);

    if (tabId === 1) {
      setSearchParams({});
    } else {
      setSearchParams({ tab: String(tabId) });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const confirmLogout = () => {
    setShowModal(false);

    const audio = new Audio("./IMG/logout.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => {});

    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.clear();
      navigate("/auth");
      window.location.reload();
    }, 1200);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  /*
   * Profile image
   * ------------------------------------------------------------
   * Uses a small local preview and persists it in localStorage.
   * If your backend already stores profile images, replace only
   * handleProfileImageChange with your upload API.
   */
  const handleProfileImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      window.alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      window.alert("Please choose an image smaller than 5MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const result = String(reader.result || "");

      try {
        localStorage.setItem(PROFILE_IMAGE_KEY, result);
        setProfileImage(result);
        setImageMenuOpen(false);
        window.dispatchEvent(new Event("darsh:profile-image-updated"));
      } catch (error) {
        console.error("Could not save profile image:", error);
        window.alert(
          "This image could not be saved. Please choose a smaller image."
        );
      }
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const removeProfileImage = () => {
    try {
      localStorage.removeItem(PROFILE_IMAGE_KEY);
    } catch {
      // Ignore storage errors.
    }

    setProfileImage("");
    setImageMenuOpen(false);
    window.dispatchEvent(new Event("darsh:profile-image-updated"));
  };

  const openImagePicker = () => {
    fileInputRef.current?.click();
  };

  const accountStats = useMemo(
    () => [
      {
        label: "Paid Orders",
        value: paidOrdersLoading ? "…" : paidOrderCount,
        icon: Package,
        tab: 3,
      },
      {
        label: "Wishlist",
        value: wishlistCount,
        icon: Heart,
        path: "/wishlist",
      },
      {
        label: "Bag Items",
        value: Number(totalItems || 0),
        icon: ShoppingBag,
        path: "/cart",
      },
      {
        label: "Addresses",
        value: "—",
        icon: MapPin,
        tab: 2,
      },
    ],
    [paidOrderCount, paidOrdersLoading, wishlistCount, totalItems]
  );

  const getRecentImage = (item) => {
    if (!item) return "https://placehold.co/300x375";

    if (item.image) {
      return String(item.image).startsWith("http")
        ? item.image
        : `${url}/img/${item.image}`;
    }

    if (item.images?.[0]) {
      return String(item.images[0]).startsWith("http")
        ? item.images[0]
        : `${url}/img/${item.images[0]}`;
    }

    return "https://placehold.co/300x375";
  };

  const renderAvatar = (size = "large") => {
    const sizeClass =
      size === "small"
        ? "h-20 w-20"
        : size === "mobile"
        ? "h-24 w-24"
        : "h-28 w-28";

    const iconSize =
      size === "small"
        ? "h-8 w-8"
        : size === "mobile"
        ? "h-9 w-9"
        : "h-11 w-11";

    return (
      <div className={`relative ${sizeClass}`}>
        <div className="absolute -inset-2 rounded-full bg-[#d4ad54]/15 blur-xl" />

        <div className="relative h-full w-full overflow-hidden rounded-full border-[5px] border-[#fffdf8] bg-gradient-to-br from-[#f3e4d0] to-[#ead9b7] text-[#741522] shadow-[0_12px_30px_rgba(63,22,22,0.16)]">
          {profileImage ? (
            <img
              src={profileImage}
              alt={`${fullDisplayName} profile`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <User className={iconSize} strokeWidth={1.8} />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={() => setImageMenuOpen((value) => !value)}
          aria-label="Change profile photo"
          className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border-[3px] border-[#fffdf8] bg-[#741522] text-white shadow-lg transition hover:bg-[#5a1018]"
        >
          <Camera className="h-4 w-4" />
        </button>

        <div className="absolute -bottom-1 -left-1 flex h-6 w-6 items-center justify-center rounded-full border-[3px] border-[#fffdf8] bg-[#d4ad54] text-white shadow">
          <CheckCircle2 className="h-3 w-3" />
        </div>

        {imageMenuOpen && (
          <div className="absolute right-0 top-full z-50 mt-3 w-44 overflow-hidden rounded-2xl border border-[#d4ad54]/25 bg-[#fffdf8] p-1.5 text-left shadow-[0_16px_40px_rgba(63,22,22,0.18)]">
            <button
              type="button"
              onClick={openImagePicker}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#4a1815] transition hover:bg-[#f3e8d2]"
            >
              <Camera className="h-4 w-4 text-[#741522]" />
              Upload image
            </button>

            {profileImage && (
              <button
                type="button"
                onClick={removeProfileImage}
                className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#9b3f46] transition hover:bg-[#f8e8e8]"
              >
                <Trash2 className="h-4 w-4" />
                Remove image
              </button>
            )}

            <button
              type="button"
              onClick={() => setImageMenuOpen(false)}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs text-[#806c63] transition hover:bg-[#f8f1e5]"
            >
              <X className="h-4 w-4" />
              Close
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderTabButton = (item, mobile = false) => {
    const active = comp === item.id;

    return (
      <motion.button
        key={item.id}
        type="button"
        whileHover={!mobile ? { x: 3 } : undefined}
        whileTap={{ scale: 0.98 }}
        onClick={() => handleTabChange(item.id)}
        className={`group flex w-full items-center gap-3 rounded-[18px] text-left transition-all duration-200 ${
          mobile ? "min-w-[132px] flex-1 p-3" : "px-3.5 py-3.5"
        } ${
          active
            ? "bg-[#f3e8d2] text-[#741522] shadow-sm"
            : item.isDanger
            ? "text-[#9b3f46] hover:bg-[#f8e8e8]"
            : "text-[#806c63] hover:bg-[#f8f1e5] hover:text-[#741522]"
        }`}
      >
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] transition ${
            active
              ? "bg-[#741522] text-white shadow-md"
              : item.isDanger
              ? "bg-[#f7e4e5] text-[#9b3f46]"
              : "bg-[#f3e8d2] text-[#806c63] group-hover:bg-[#ead9b7] group-hover:text-[#741522]"
          }`}
        >
          {item.icon}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`block truncate text-sm font-semibold ${
              item.isDanger ? "text-[#9b3f46]" : ""
            }`}
          >
            {item.label}
          </span>
          {!mobile && (
            <span className="mt-0.5 block truncate text-[10px] text-[#9b806d]">
              {item.description}
            </span>
          )}
        </span>

        {active && !mobile && (
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#d4ad54] shadow-[0_0_9px_rgba(212,173,84,0.55)]" />
        )}
      </motion.button>
    );
  };

  const renderOverview = (mobile = false) => (
    <>
      <section className={mobile ? "mb-5" : "mb-8"}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-[#9b7429]">
              Your Darsh space
            </p>
            <h2
              className={`mt-1 font-serif font-semibold text-[#5a1820] ${
                mobile ? "text-xl" : "text-2xl sm:text-3xl"
              }`}
            >
              Welcome back, {displayName}
            </h2>
            <p className="mt-2 max-w-2xl text-[11px] leading-5 text-[#806c63] sm:text-xs">
              Manage your profile, orders, addresses and shopping journey from
              one calm, simple space.
            </p>
          </div>

          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/allproducts")}
            className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#741522] px-5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-md transition hover:bg-[#5a1018] sm:w-auto"
          >
            Explore collection
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>

        <div
          className={`mt-5 grid gap-2.5 ${
            mobile ? "grid-cols-2" : "grid-cols-2 xl:grid-cols-4"
          }`}
        >
          {accountStats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.button
                type="button"
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.985 }}
                onClick={() => {
                  if (stat.tab) handleTabChange(stat.tab);
                  else if (stat.path) navigate(stat.path);
                }}
                className="group rounded-[18px] border border-[#d4ad54]/20 bg-gradient-to-br from-[#fffdf8] to-[#f8f1e5] p-3.5 text-left shadow-sm transition hover:border-[#d4ad54]/45 hover:shadow-md sm:p-4"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#741522] text-white">
                    <Icon className="h-4 w-4" />
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#b08a4d] transition group-hover:translate-x-1" />
                </div>

                <p className="mt-3 font-serif text-xl font-semibold text-[#5a1820] sm:text-2xl">
                  {stat.value}
                </p>
                <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#9b806d]">
                  {stat.label}
                </p>
              </motion.button>
            );
          })}
        </div>
      </section>

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#9b7429]">
              Quick access
            </p>
            <h3 className="mt-1 font-serif text-lg font-semibold text-[#5a1820] sm:text-xl">
              Make yourself at home
            </h3>
          </div>
          <Edit3 className="h-4 w-4 text-[#d4ad54]" />
        </div>

        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {[
            [
              "Edit profile",
              "Update your personal details.",
              Edit3,
              () => setComp(1),
            ],
            [
              "Manage addresses",
              "Update delivery locations.",
              MapPin,
              () => handleTabChange(2),
            ],
            [
              "Track orders",
              "View your order journey.",
              Package,
              () => handleTabChange(3),
            ],
          ].map(([title, text, Icon, action]) => (
            <motion.button
              type="button"
              key={title}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={action}
              className="flex items-start gap-3 rounded-[18px] border border-[#d4ad54]/20 bg-[#fffdf8] p-3.5 text-left transition hover:border-[#d4ad54]/45 hover:bg-[#fdf8ef]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f3e8d2] text-[#741522]">
                <Icon className="h-4 w-4" />
              </span>

              <span>
                <span className="block text-sm font-semibold text-[#4a1815]">
                  {title}
                </span>
                <span className="mt-1 block text-[10px] leading-4 text-[#9b806d]">
                  {text}
                </span>
              </span>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="mb-6 overflow-hidden rounded-[22px] border border-[#d4ad54]/25 bg-gradient-to-r from-[#741522] to-[#8f2a32] p-5 text-white sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#f2d994]" />
              <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#f2d994]">
                Darsh collection
              </span>
            </div>
            <h3 className="mt-2 font-serif text-xl sm:text-2xl">
              Discover your next timeless weave
            </h3>
            <p className="mt-2 max-w-xl text-[10px] leading-5 text-white/70">
              Explore new arrivals, premium sarees and handcrafted collections.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/allproducts")}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#fffdf8] px-5 text-[8px] font-bold uppercase tracking-[0.15em] text-[#741522] transition hover:bg-[#f3e8d2]"
          >
            Shop now
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {recentActivity.length > 0 && (
        <section className="mb-7">
          <div className="mb-3 flex items-end justify-between">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-[#9b7429]">
                Continue browsing
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold text-[#5a1820] sm:text-xl">
                Recently viewed
              </h3>
            </div>
            <Clock3 className="h-4 w-4 text-[#b08a4d]" />
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
            {recentActivity.map((item) => {
              const itemId = item._id || item.id;
              const image = getRecentImage(item);

              return (
                <button
                  type="button"
                  key={itemId}
                  onClick={() =>
                    itemId && navigate(`/productDetails/${itemId}`)
                  }
                  className="group overflow-hidden rounded-[18px] border border-[#d4ad54]/20 bg-[#fffdf8] text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[#f3e8d2]">
                    <img
                      src={image}
                      alt={
                        item.name || item.productName || "Darsh saree"
                      }
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-2.5 sm:p-3">
                    <p className="truncate text-[9px] font-semibold text-[#4a1815] sm:text-[10px]">
                      {item.name || item.productName || "Darsh Saree"}
                    </p>
                    <p className="mt-1 text-[9px] text-[#806c63] sm:text-[10px]">
                      {item.price
                        ? `₹${Number(item.price).toLocaleString("en-IN")}`
                        : "View product"}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      <AccountInfo />
    </>
  );

  const renderCurrentContent = (mobile = false) => {
    if (comp === 1) return renderOverview(mobile);
    if (comp === 2) return <AddressInfo />;
    if (comp === 3) return <OrderInfo />;
    return null;
  };

  return (
    <AnimatePresence mode="wait">
      {!isLoggingOut && (
        <motion.main
          key="account-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45 }}
          className="min-h-screen overflow-hidden bg-[#f7f1e7] font-sans text-[#4a1815]"
        >
          {/* Decorative background */}
          <div className="pointer-events-none fixed -left-36 -top-36 h-80 w-80 rounded-full bg-[#741522]/[0.035] blur-3xl" />
          <div className="pointer-events-none fixed -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#d4ad54]/[0.09] blur-3xl" />

          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/jpg"
            onChange={handleProfileImageChange}
            className="hidden"
          />

          <div className="relative z-10 mx-auto w-full max-w-[1480px] px-3 py-4 sm:px-5 sm:py-6 lg:px-8 lg:py-8">
            {/* Top page heading */}
            <motion.header
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 flex flex-col gap-3 sm:mb-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div>
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="h-px w-7 bg-[#d4ad54]" />
                  <Sparkles className="h-3.5 w-3.5 text-[#d4ad54]" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#9b7429]">
                    Darsh Account
                  </span>
                </div>

                <h1 className="font-serif text-2xl font-semibold leading-tight text-[#5a1820] sm:text-3xl lg:text-4xl">
                  {getGreeting()},{" "}
                  <span className="text-[#741522]">{displayName}!</span>
                </h1>

                <p className="mt-1.5 text-[10px] leading-4 text-[#806c63] sm:text-xs lg:text-sm">
                  Your personal space for profile, orders and delivery
                  preferences.
                </p>
              </div>

              <div className="hidden items-center gap-2.5 rounded-full border border-[#d4ad54]/30 bg-[#fffdf8]/80 px-3 py-2 shadow-sm backdrop-blur-sm sm:flex">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#741522] text-white">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-wider text-[#741522]">
                    Secure account
                  </span>
                  <span className="block text-[8px] text-[#9b806d]">
                    Your details stay private
                  </span>
                </span>
              </div>
            </motion.header>

            {/* Mobile profile hero */}
            <motion.section
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 overflow-visible rounded-[28px] border border-[#d4ad54]/20 bg-[#fffdf8] shadow-[0_16px_45px_rgba(63,22,22,0.07)] lg:hidden"
            >
              <div className="relative h-24 overflow-hidden rounded-t-[28px] bg-[#741522]">
                <div className="absolute -right-8 -top-20 h-44 w-44 rounded-full border border-white/10" />
                <div className="absolute -right-20 top-4 h-32 w-32 rounded-full border border-white/[0.08]" />
                <div className="absolute bottom-0 left-0 h-16 w-48 bg-gradient-to-r from-[#5a1018]/25 to-transparent" />
              </div>

              <div className="relative px-5 pb-5">
                <div className="-mt-14 flex flex-col items-center text-center">
                  {renderAvatar("mobile")}

                  <h2 className="mt-3 max-w-full truncate font-serif text-xl font-semibold text-[#4a1815]">
                    {fullDisplayName}
                  </h2>

                  <p className="mt-1 max-w-[90%] truncate text-[10px] text-[#806c63]">
                    {userEmail || "customer@darsh.com"}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#d4ad54]/30 bg-[#f3e8d2] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.13em] text-[#741522]">
                    <Sparkles className="h-3 w-3" />
                    Premium member
                  </span>
                </div>
              </div>
            </motion.section>

            {/* Main two-column desktop / stacked mobile */}
            <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[330px_minmax(0,1fr)] lg:gap-5 xl:gap-7">
              {/* Desktop sidebar */}
              <aside className="hidden lg:block">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="sticky top-5 overflow-visible rounded-[30px] border border-[#d4ad54]/20 bg-[#fffdf8] shadow-[0_20px_60px_rgba(63,22,22,0.08)]"
                >
                  {/* Maroon header inspired by reference image */}
                  <div className="relative h-32 overflow-hidden rounded-t-[30px] bg-[#741522]">
                    <div className="absolute -right-10 -top-20 h-52 w-52 rounded-full border border-white/10" />
                    <div className="absolute -right-28 top-8 h-48 w-48 rounded-full border border-white/[0.08]" />
                    <div className="absolute bottom-0 left-0 h-14 w-56 bg-gradient-to-r from-[#5a1018]/30 to-transparent" />

                    <div className="absolute left-5 top-5">
                      <span className="rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1 text-[7px] font-bold uppercase tracking-[0.25em] text-white/80">
                        My account
                      </span>
                    </div>
                  </div>

                  {/* Profile identity */}
                  <div className="relative px-5 pb-5">
                    <div className="-mt-14 flex flex-col items-center text-center">
                      {renderAvatar("large")}

                      <h2 className="mt-3 max-w-full truncate font-serif text-xl font-semibold text-[#4a1815]">
                        {fullDisplayName}
                      </h2>

                      <p className="mt-1 max-w-full truncate px-2 text-[10px] text-[#806c63]">
                        {userEmail || "customer@darsh.com"}
                      </p>

                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#d4ad54]/30 bg-[#f3e8d2] px-3.5 py-1.5 text-[8px] font-bold uppercase tracking-[0.14em] text-[#741522]">
                        <Sparkles className="h-3 w-3" />
                        Premium member
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-[#741522]/10 px-4 py-4">
                    <p className="mb-2 px-2 text-[7px] font-bold uppercase tracking-[0.28em] text-[#9b7429]">
                      Account menu
                    </p>

                    <nav className="space-y-1.5">
                      {tabs.map((item) => renderTabButton(item))}
                    </nav>
                  </div>

                  <div className="border-t border-[#741522]/10 p-4">
                    <SupportCard />
                  </div>
                </motion.div>
              </aside>

              {/* Main content */}
              <section className="min-w-0">
                {/* Mobile tab selector */}
                <div className="mb-4 lg:hidden">
                  <motion.button
                    type="button"
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setIsMobileMenuOpen((value) => !value)}
                    className="flex w-full items-center justify-between rounded-[20px] border border-[#d4ad54]/20 bg-[#fffdf8] p-3.5 text-left shadow-[0_10px_30px_rgba(63,22,22,0.05)]"
                  >
                    <span className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] bg-[#741522] text-white">
                        {currentTab.icon}
                      </span>

                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-[#4a1815]">
                          {currentTab.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[9px] text-[#9b806d]">
                          {currentTab.description}
                        </span>
                      </span>
                    </span>

                    <motion.span
                      animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                      className="shrink-0"
                    >
                      <ChevronRight className="h-5 w-5 text-[#9b806d]" />
                    </motion.span>
                  </motion.button>

                  <AnimatePresence>
                    {isMobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22 }}
                        className="mt-2 overflow-hidden rounded-[20px] border border-[#d4ad54]/20 bg-[#fffdf8] p-2 shadow-md"
                      >
                        <div className="flex gap-1.5 overflow-x-auto pb-0.5">
                          {tabs.map((item) => renderTabButton(item, true))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[500px] overflow-hidden rounded-[28px] border border-[#d4ad54]/20 bg-[#fffdf8] p-4 shadow-[0_20px_60px_rgba(63,22,22,0.07)] sm:p-6 lg:p-7 xl:p-8"
                  >
                    {renderCurrentContent(false)}
                  </motion.div>
                </AnimatePresence>

                {/* Mobile support */}
                <div className="mt-4 lg:hidden">
                  <SupportCard />
                </div>
              </section>
            </div>

            {/* Bottom brand */}
            <div className="mt-7 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex items-center gap-2.5">
                <span className="h-px w-7 bg-[#d4ad54]" />
                <Sparkles className="h-3 w-3 text-[#d4ad54]" />
                <span className="h-px w-7 bg-[#d4ad54]" />
              </div>

              <p className="text-[7px] font-bold uppercase tracking-[0.3em] text-[#9b806d]">
                DARSH · TIMELESS WEAVES
              </p>
            </div>
          </div>

          {showModal && (
            <LogoutModal
              onConfirm={confirmLogout}
              onCancel={() => setShowModal(false)}
            />
          )}
        </motion.main>
      )}
    </AnimatePresence>
  );
};

export default Account;