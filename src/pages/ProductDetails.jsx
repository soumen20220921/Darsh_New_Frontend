import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Truck,
  ShieldCheck,
  RotateCcw,
  ShoppingBag,
  Minus,
  Plus,
  Share2,
  Copy,
  Loader2,
  Check,
  ArrowLeft,
  Star,
  Clock,
  CircleOff,
  Hourglass,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  CalendarDays,
  LogIn,
  X,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* =========================================================
   DARSH PRODUCT DETAILS
   Luxury / Editorial Saree Design
========================================================= */

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { allProduct, token, getCart, url } = useAppContext();

  /* =========================================================
     PRODUCT
  ========================================================= */

  const product = useMemo(
    () => allProduct?.find((item) => item._id === id),
    [allProduct, id],
  );

  const similarProducts = useMemo(() => {
    if (!allProduct || !product) return [];

    return allProduct.filter(
      (item) => item.category === product.category && item._id !== product._id,
    );
  }, [allProduct, product]);

  /* =========================================================
     SAME PRODUCT / COLOR VARIANTS
     Color options appear only when BOTH category and product name match.
  ========================================================= */

  const normalizeValue = useCallback(
    (value) => String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase(),
    [],
  );

  const sameProductColorVariants = useMemo(() => {
    if (!allProduct || !product) return [];

    const categoryKey = normalizeValue(product.category);
    const productNameKey = normalizeValue(product.productName);

    if (!categoryKey || !productNameKey) return [];

    return allProduct.filter((item) => {
      if (!item?._id) return false;

      return (
        normalizeValue(item.category) === categoryKey &&
        normalizeValue(item.productName) === productNameKey
      );
    });
  }, [allProduct, product, normalizeValue]);

  /* =========================================================
     PRODUCT OPTIONS
  ========================================================= */

  const sizes =
    product?.size
      ?.split(",")
      .map((item) => item.trim())
      .filter(Boolean) || [];

  const stock = product ? Math.max(0, Number(product.stock) || 0) : 0;

  const isLowStock = stock > 0 && stock <= 5;

  const isOutOfStock = stock === 0;

  /* =========================================================
     STATES
  ========================================================= */

  const [selectedImage, setSelectedImage] = useState(0);

  const [quantity, setQuantity] = useState(1);

  const [size, setSize] = useState("");

  const [activeTab, setActiveTab] = useState("description");

  const [showShareModal, setShowShareModal] = useState(false);

  const [loading, setLoading] = useState(false);

  const [isAdded, setIsAdded] = useState(false);

  const [showFAQ, setShowFAQ] = useState({});

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  const [deliveryDate, setDeliveryDate] = useState("");

  const [countdown, setCountdown] = useState(null);

  const [zoomMode, setZoomMode] = useState(false);

  const [zoomLevel, setZoomLevel] = useState(1);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const [isDragging, setIsDragging] = useState(false);

  const [startPosition, setStartPosition] = useState({
    x: 0,
    y: 0,
  });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  /* =========================================================
     IMAGES
  ========================================================= */

  const images = useMemo(
    () => product?.images?.map((image) => `${url}/img/${image}`) || [],
    [product, url],
  );

  /* =========================================================
     DELIVERY DATE
  ========================================================= */

  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();

      let days = 0;
      const delivery = new Date(today);

      while (days < 7) {
        delivery.setDate(delivery.getDate() + 1);

        const day = delivery.getDay();

        if (day !== 0 && day !== 6) {
          days++;
        }
      }

      return delivery.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    };

    setDeliveryDate(calculateDeliveryDate());
  }, []);

  /* =========================================================
     RESET WHEN PRODUCT CHANGES
  ========================================================= */

  useEffect(() => {
    setIsAdded(false);
    setSelectedImage(0);
    setQuantity(1);
    setSize("");
    setZoomLevel(1);
    setPosition({
      x: 0,
      y: 0,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [id]);

  /* =========================================================
     NOTIFICATION
  ========================================================= */

  const showNotification = (message, type = "success") => {
    setNotification({
      message,
      type,
      visible: true,
    });

    setTimeout(() => {
      setNotification((previous) => ({
        ...previous,
        visible: false,
      }));
    }, 3000);
  };

/* =========================================================
   LOW STOCK TIMER - 24 HOURS
   Persists per product + stock level in localStorage
========================================================= */

useEffect(() => {
  let timer;

  if (!isLowStock || !product?._id) {
    setCountdown(0);
    return undefined;
  }

  const TIMER_DURATION = 24 * 60 * 60 * 1000;
  const storageKey = `darsh_low_stock_timer_${product._id}_${stock}`;

  let savedEndTime = Number(localStorage.getItem(storageKey));

  // Create timer only once for this product + stock level.
  if (!savedEndTime || savedEndTime <= Date.now()) {
    savedEndTime = Date.now() + TIMER_DURATION;
    localStorage.setItem(storageKey, String(savedEndTime));
  }

  const updateCountdown = () => {
    const remaining = Math.max(
      0,
      Math.floor((savedEndTime - Date.now()) / 1000)
    );

    setCountdown(remaining);

    if (remaining <= 0 && timer) {
      clearInterval(timer);
    }
  };

  updateCountdown();

  timer = setInterval(updateCountdown, 1000);

  return () => {
    if (timer) {
      clearInterval(timer);
    }
  };
}, [isLowStock, product?._id, stock]);

  /* =========================================================
     ZOOM
  ========================================================= */

  const handleZoomIn = () => {
    setZoomLevel((previous) => Math.min(previous + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((previous) => {
      const next = Math.max(previous - 0.5, 1);

      if (next === 1) {
        setPosition({
          x: 0,
          y: 0,
        });
      }

      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);

    setPosition({
      x: 0,
      y: 0,
    });
  };

  const handleMouseDown = (event) => {
    if (zoomLevel <= 1) return;

    setIsDragging(true);

    setStartPosition({
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    });
  };

  const handleMouseMove = (event) => {
    if (!isDragging || zoomLevel <= 1) {
      return;
    }

    setPosition({
      x: event.clientX - startPosition.x,
      y: event.clientY - startPosition.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (event) => {
    if (zoomLevel <= 1) return;

    setIsDragging(true);

    setStartPosition({
      x: event.touches[0].clientX - position.x,
      y: event.touches[0].clientY - position.y,
    });
  };

  const handleTouchMove = (event) => {
    if (!isDragging || zoomLevel <= 1) {
      return;
    }

    setPosition({
      x: event.touches[0].clientX - startPosition.x,
      y: event.touches[0].clientY - startPosition.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleZoomMode = () => {
    setZoomMode((previous) => {
      const next = !previous;

      document.body.style.overflow = next ? "hidden" : "auto";

      if (!next) {
        setZoomLevel(1);

        setPosition({
          x: 0,
          y: 0,
        });
      }

      return next;
    });
  };

  /* =========================================================
     ADD TO CART
  ========================================================= */

  const handleAddToCart = useCallback(async () => {
    if (sizes.length > 0 && !size) {
      showNotification("Please select a size.", "error");
      return;
    }

    if (!token) {
      setShowLoginPrompt(true);
      return;
    }

    if (!product) {
      showNotification("Product information not found.", "error");
      return;
    }

    if (quantity > stock) {
      showNotification(`Only ${stock} items are available.`, "error");
      return;
    }

    setLoading(true);

    try {
      const cartDetails = {
        productId: id,
        title: product.productName,
        price: product.price * quantity,
        qty: quantity,
        size: size || null,
        imgSrc: product.images?.[0],
      };

      const response = await axios.post(
        `${url}/api/cart/addToCart`,
        cartDetails,
        {
          headers: {
            Auth: token,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.data.success) {
        getCart();

        showNotification("Saree added to your bag.", "success");

        setIsAdded(true);
      } else {
        showNotification(
          response.data.message || "Unable to add item.",
          "error",
        );
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      showNotification("Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  }, [sizes, size, token, product, quantity, stock, id, url, getCart]);

  /* =========================================================
     LOGIN
  ========================================================= */

  const handleQuickLogin = () => {
    setShowLoginPrompt(false);

    navigate("/auth", {
      state: {
        from: `/productDetails/${id}`,
        message: "Please login to add items to your bag.",
      },
    });
  };

  /* =========================================================
     SHARE
  ========================================================= */

  const handleShare = async (platform) => {
    if (!product) return;

    const shareUrl = `${window.location.origin}/productDetails/${id}`;

    const shareText = `Discover ${product.productName} at Darsh Handlooms.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: product.productName,
          text: shareText,
          url: shareUrl,
        });
      } else {
        switch (platform) {
          case "whatsapp":
            window.open(
              `https://wa.me/?text=${encodeURIComponent(
                `${shareText} ${shareUrl}`,
              )}`,
              "_blank",
            );
            break;

          case "telegram":
            window.open(
              `https://t.me/share/url?url=${encodeURIComponent(
                shareUrl,
              )}&text=${encodeURIComponent(product.productName)}`,
              "_blank",
            );
            break;

          case "facebook":
            window.open(
              `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl,
              )}`,
              "_blank",
            );
            break;

          case "copy":
            await navigator.clipboard.writeText(shareUrl);

            showNotification("Product link copied.", "success");
            break;

          default:
            break;
        }
      }
    } catch (error) {
      console.error("Share error:", error);
    } finally {
      setShowShareModal(false);
    }
  };

  /* =========================================================
     FAQ
  ========================================================= */

  const faqs = [
    {
      q: "How long does delivery take?",
      a: "Usually 5–7 business days depending on your location.",
    },
    {
      q: "Can I return the saree?",
      a: "We offer a 7-day return policy for eligible products. The saree must be unused and in its original condition.",
    },
    {
      q: "What if I receive a damaged product?",
      a: "Please contact our support team within 48 hours with clear photographs and an opening video of the package.",
    },
    {
      q: "Does the saree include a blouse piece?",
      a: "Please check the product description and specifications for blouse-piece information.",
    },
  ];

  const toggleFAQ = (index) => {
    setShowFAQ((previous) => ({
      ...previous,
      [index]: !previous[index],
    }));
  };

  /* =========================================================
     PRODUCT NOT FOUND
  ========================================================= */

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f8f4ec] flex items-center justify-center px-5">
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            max-w-md
            w-full
            bg-[#fffdf8]
            border
            border-[#dfd4c2]
            p-8
            text-center
            shadow-[0_20px_60px_rgba(55,30,20,0.08)]
          "
        >
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#927665] mb-4">
            Darsh Handlooms
          </p>

          <h1 className="font-serif text-3xl text-[#42151a] mb-3">
            Product not found
          </h1>

          <p className="text-sm text-[#806c60]">
            The saree you are looking for is no longer available.
          </p>

          <Link
            to="/allproducts"
            className="
              inline-flex
              mt-7
              px-6
              py-3
              bg-[#76131d]
              text-white
              text-[10px]
              uppercase
              tracking-[0.2em]
              hover:bg-[#5f0e17]
              transition
            "
          >
            Back to shop
          </Link>
        </motion.div>
      </div>
    );
  }

  const rating = product.rating ?? 4.5;

  const discount =
    product.originalPrice && product.price < product.originalPrice
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : null;

  /* =========================================================
     SMALL LOW STOCK TIMER DISPLAY
  ========================================================= */

  const lowStockHours =
    countdown !== null ? Math.floor(countdown / 3600) : 0;

  const lowStockMinutes =
    countdown !== null ? Math.floor((countdown % 3600) / 60) : 0;

  const lowStockSeconds = countdown !== null ? countdown % 60 : 0;

  const lowStockTime =
    `${String(lowStockHours).padStart(2, "0")}:` +
    `${String(lowStockMinutes).padStart(2, "0")}:` +
    `${String(lowStockSeconds).padStart(2, "0")}`;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        min-h-screen
        bg-[#f8f4ec]
        text-[#42151a]
        font-sans
      "
    >
      {/* =====================================================
          NOTIFICATION
      ===================================================== */}

      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-2rem)] max-w-md"
          >
            <div
              className={`
                flex
                items-center
                gap-3
                px-4
                py-3
                border
                shadow-xl
                backdrop-blur-md
                ${
                  notification.type === "success"
                    ? "bg-[#f5faf4] border-[#b8cdb1]"
                    : notification.type === "warning"
                      ? "bg-[#fff8e9] border-[#dfc181]"
                      : "bg-[#fff3f2] border-[#d8aaa5]"
                }
              `}
            >
              <div className="flex-1 text-sm text-[#4c3b34]">
                {notification.message}
              </div>

              <button
                onClick={() =>
                  setNotification({
                    ...notification,
                    visible: false,
                  })
                }
                className="text-[#826d62] hover:text-[#42151a]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          PAGE CONTAINER
      ===================================================== */}

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8">
        {/* ===================================================
            TOP BAR
        =================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="
            flex
            items-center
            justify-between
            mb-5
          "
        >
          <button
            onClick={() => {
              navigate("/allproducts");

              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              });
            }}
            className="
              group
              inline-flex
              items-center
              gap-2
              text-[9px]
              sm:text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#806c60]
              hover:text-[#76131d]
              transition-colors
            "
          >
            <ArrowLeft
              className="
                h-3.5
                w-3.5
                transition-transform
                group-hover:-translate-x-1
              "
            />
            Back to shop
          </button>

          <div className="hidden sm:flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#8e786c]">
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-[#b48a42] text-[#b48a42]" />
              {rating}
            </span>

            <span className="text-[#cfc1b0]">|</span>

            <span>7 day returns</span>
          </div>
        </motion.div>

        {/* ===================================================
            MAIN PRODUCT
        =================================================== */}

        <motion.section
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
          }}
          className="
            grid
            grid-cols-1
            lg:grid-cols-[1fr_1fr]
            gap-8
            lg:gap-12
          "
        >
          {/* =================================================
              IMAGE SIDE
          ================================================= */}

          <div>
            <div
              className="
                relative
                bg-[#eee4d3]
                overflow-hidden
                border
                border-[#dfd2c0]
              "
            >
              <div
                className="
                  relative
                  aspect-[4/5]
                  sm:aspect-[4/5]
                  overflow-hidden
                  cursor-zoom-in
                "
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={toggleZoomMode}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[selectedImage] || "placeholder"}
                    src={images[selectedImage]}
                    alt={product.productName}
                    initial={{
                      opacity: 0,
                      scale: 1.03,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                    className="
                      w-full
                      h-full
                      object-cover
                      select-none
                    "
                    draggable="false"
                    style={{
                      transform: `
                        scale(${zoomLevel})
                        translate(
                          ${position.x}px,
                          ${position.y}px
                        )
                      `,
                      transition: isDragging ? "none" : "transform 0.35s ease",
                      cursor: zoomLevel > 1 ? "grabbing" : "zoom-in",
                    }}
                  />
                </AnimatePresence>

                {/* Zoom */}

                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    toggleZoomMode();
                  }}
                  className="
                    absolute
                    right-4
                    bottom-4
                    h-9
                    w-9
                    flex
                    items-center
                    justify-center
                    bg-[#fffaf2]/90
                    text-[#5e4439]
                    border
                    border-[#dfd2c0]
                    hover:bg-white
                    transition
                  "
                  aria-label="Zoom image"
                >
                  {zoomMode ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <ZoomIn className="h-4 w-4" />
                  )}
                </button>

                {zoomLevel > 1 && (
                  <div
                    className="
                    absolute
                    top-4
                    right-4
                    px-2
                    py-1
                    bg-[#42151a]/80
                    text-white
                    text-[9px]
                    tracking-widest
                  "
                  >
                    {Math.round(zoomLevel * 100)}%
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnails */}

            {images.length > 1 && (
              <div
                className="
                mt-4
                flex
                gap-3
                overflow-x-auto
                pb-2
              "
              >
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(index);

                      setZoomLevel(1);

                      setPosition({
                        x: 0,
                        y: 0,
                      });
                    }}
                    className={`
                        flex-shrink-0
                        w-16
                        h-20
                        overflow-hidden
                        border
                        transition-all
                        duration-300
                        ${
                          selectedImage === index
                            ? "border-[#76131d] ring-1 ring-[#76131d]/20"
                            : "border-[#ddd0bf] opacity-70 hover:opacity-100"
                        }
                      `}
                  >
                    <img
                      src={image}
                      alt={`View ${index + 1}`}
                      className="
                          w-full
                          h-full
                          object-cover
                        "
                    />
                  </button>
                ))}
              </div>
            )}

            <p
              className="
              mt-2
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-[#988477]
              text-center
            "
            >
              Click image to enlarge
            </p>
          </div>

          {/* =================================================
              PRODUCT INFORMATION
          ================================================= */}

          <div className="flex flex-col">
            {/* Category */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <p
                className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#a27d5f]
                mb-3
              "
              >
                {product.category || "Handwoven Saree"}
              </p>

              <h1
                className="
                font-serif
                text-3xl
                sm:text-4xl
                lg:text-[44px]
                leading-[1.08]
                font-normal
                text-[#42151a]
              "
              >
                {product.productName}
              </h1>

              <p
                className="
                mt-3
                text-[9px]
                sm:text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#947b6d]
              "
              >
                Darsh Handlooms · Crafted with care
              </p>

             
            </motion.div>

            {/* Price */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
              }}
              className="
                mt-7
                pb-6
                border-b
                border-[#dfd2c0]
              "
            >
              <div
                className="
                flex
                items-center
                flex-wrap
                gap-3
              "
              >
                <span
                  className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                  text-[#42151a]
                "
                >
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </span>

                {product.originalPrice && (
                  <span
                    className="
                    text-sm
                    text-[#9c8a7e]
                    line-through
                  "
                  >
                    ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                  </span>
                )}

                {discount && (
                  <span
                    className="
                    px-2
                    py-1
                    bg-[#e8d6aa]
                    text-[#6e511b]
                    text-[8px]
                    uppercase
                    tracking-[0.15em]
                  "
                  >
                    Save {discount}%
                  </span>
                )}
              </div>

              <p
                className="
                mt-2
                text-[10px]
                text-[#907d71]
              "
              >
                Inclusive of applicable taxes · Shipping calculated at checkout
              </p>
            </motion.div>

            {/* Description */}

            <motion.p
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.3,
              }}
              className="
                mt-6
                text-sm
                leading-7
                text-[#735f55]
                max-w-xl
              "
            >
              {product.description ||
                "A thoughtfully crafted saree made for timeless elegance, everyday grace and special occasions."}
            </motion.p>

            {/* blouse Avaliable */}
            <div className="mt-6">
              <label
                className="
                block
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#6f594e]
                mb-3
              "
              >
                Blouse
              </label>

              <div
                className="
                flex
                items-center
                justify-between
                gap-4
              "
              >
                <span
                  className="
                  text-[10px]
                  text-[#958176]
                "
                >
                  {product.blouseAvaliable
                    ? "Blouse piece available"
                    : "No blouse piece"}
                </span>
              </div>
            </div>
            {/* =================================================
                AVAILABLE COLORS / SAME PRODUCT + CATEGORY
            ================================================= */}
            {sameProductColorVariants.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-7"
              >
                <div className="flex items-end justify-between gap-3 mb-3">
                  <div>
                    <label
                      className="
                        block
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-[#6f594e]
                        mb-1
                      "
                    >
                      Available Colors
                    </label>

                    <p className="text-[10px] text-[#958176]">
                      Choose another color of the same saree
                    </p>
                  </div>

                  <span
                    className="
                      shrink-0
                      text-[8px]
                      uppercase
                      tracking-[0.12em]
                      text-[#a27d5f]
                    "
                  >
                    {sameProductColorVariants.length} colors
                  </span>
                </div>

                <div className="relative -mx-1">
                  <div
                    className="
                      flex
                      gap-2.5
                      overflow-x-auto
                      overflow-y-hidden
                      px-1
                      pb-2
                      snap-x
                      snap-mandatory
                      scrollbar-hide
                    "
                    style={{
                      WebkitOverflowScrolling: "touch",
                      scrollbarWidth: "none",
                      msOverflowStyle: "none",
                    }}
                  >
                    {sameProductColorVariants.map((colorProduct, index) => {
                      const isCurrentProduct = colorProduct._id === product._id;

                      const image = colorProduct.images?.[0]
                        ? `${url}/img/${colorProduct.images[0]}`
                        : "https://placehold.co/160x200";

                      return (
                        <motion.button
                          key={colorProduct._id}
                          type="button"
                          whileHover={{ y: -3 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            if (isCurrentProduct) return;

                            navigate(`/productDetails/${colorProduct._id}`);

                            window.scrollTo({
                              top: 0,
                              left: 0,
                              behavior: "smooth",
                            });
                          }}
                          className="
                            group
                            relative
                            shrink-0
                            w-[72px]
                            sm:w-[82px]
                            snap-start
                            text-left
                            outline-none
                          "
                          title={
                            colorProduct.color ||
                            colorProduct.productName ||
                            `Option ${index + 1}`
                          }
                        >
                          <div
                            className={`
                              relative
                              w-full
                              aspect-[4/5]
                              overflow-hidden
                              bg-[#eee4d3]
                              border
                              transition-all
                              duration-300
                              ${
                                isCurrentProduct
                                  ? "border-[#76131d] ring-2 ring-[#76131d]/10 shadow-[0_5px_18px_rgba(118,19,29,0.12)]"
                                  : "border-[#dfd2c0] group-hover:border-[#76131d]/60"
                              }
                            `}
                          >
                            <img
                              src={image}
                              alt={
                                colorProduct.color ||
                                colorProduct.productName ||
                                `Option ${index + 1}`
                              }
                              loading="lazy"
                              draggable="false"
                              className="
                                w-full
                                h-full
                                object-cover
                                transition-transform
                                duration-500
                                group-hover:scale-105
                              "
                            />

                            <div
                              className="
                                absolute
                                inset-x-0
                                bottom-0
                                h-10
                                bg-gradient-to-t
                                from-black/45
                                to-transparent
                                pointer-events-none
                              "
                            />

                            {isCurrentProduct && (
                              <div
                                className="
                                  absolute
                                  top-1.5
                                  right-1.5
                                  h-5
                                  w-5
                                  rounded-full
                                  bg-[#76131d]
                                  text-white
                                  flex
                                  items-center
                                  justify-center
                                  shadow-sm
                                "
                              >
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>
                        </motion.button>
                      );
                    })}
                  </div>

                  <div
                    className="
                      pointer-events-none
                      absolute
                      top-0
                      right-0
                      bottom-2
                      w-8
                      bg-gradient-to-l
                      from-[#f8f4ec]
                      to-transparent
                    "
                  />
                </div>

                {sameProductColorVariants.length > 4 && (
                  <div
                    className="
                      mt-1
                      flex
                      items-center
                      justify-end
                      gap-1.5
                      text-[7px]
                      uppercase
                      tracking-[0.12em]
                      text-[#a28d80]
                    "
                  >
                    <span>Swipe to explore</span>
                    <span className="text-[#76131d]">→</span>
                  </div>
                )}
              </motion.div>
            )}
            {sameProductColorVariants.length === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-[#dfd2c0] bg-[#fffaf2] px-3 py-1.5">
                  <span className="h-2.5 w-2.5 rounded-full border border-[#b9aa99] bg-[#76131d]" />
                  <span className="text-[8px] uppercase tracking-[0.16em] text-[#6f594e]">
                    Color: <span className="font-semibold">Only One Color Available</span>
                  </span>
                </div>
              </motion.div>
            )}

            {/* Size */}

            {sizes.length > 0 && (
              <div className="mt-6">
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  mb-3
                "
                >
                  <label
                    className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-[#6f594e]
                  "
                  >
                    Select size
                  </label>
                </div>

                <div
                  className="
                  flex
                  flex-wrap
                  gap-2
                "
                >
                  {sizes.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setSize(item)}
                      className={`
                          min-w-[52px]
                          px-4
                          py-2.5
                          border
                          text-xs
                          transition-all
                          ${
                            size === item
                              ? "bg-[#76131d] border-[#76131d] text-white"
                              : "bg-[#fffaf2] border-[#d9cbb9] text-[#5f4a40] hover:border-[#76131d]"
                          }
                        `}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* =================================================
                STOCK STATUS
            ================================================= */}

            <div className="mt-5">
              {isOutOfStock ? (
                <div
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-xs
                    text-[#a33d3d]
                  "
                >
                  <CircleOff className="h-4 w-4" />
                  Out of stock
                </div>
              ) : isLowStock ? (
                <div className="space-y-2">
                  {/* Stock message */}
                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      text-xs
                      text-[#a16e25]
                    "
                  >
                    <Hourglass className="h-4 w-4" />

                    <span>
                      Only{" "}
                      <strong className="font-semibold text-[#76131d]">
                        {stock}
                      </strong>{" "}
                      {stock === 1 ? "piece" : "pieces"} left
                    </span>
                  </div>

                  {/* Small 24-hour urgency timer */}
                  <AnimatePresence mode="wait">
                    {countdown !== null && countdown > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -8, scale: 0.96 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -8, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        className="
                          inline-flex
                          max-w-full
                          items-center
                          gap-2
                          rounded-full
                          border
                          border-[#e2c9a2]
                          bg-[#fffaf2]
                          px-3
                          py-1.5
                          shadow-[0_3px_12px_rgba(118,19,29,0.06)]
                        "
                      >
                        {/* Pulsing status dot */}
                        <span className="relative flex h-2 w-2 shrink-0">
                          <motion.span
                            animate={{
                              scale: [1, 1.8, 1],
                              opacity: [0.7, 0, 0.7],
                            }}
                            transition={{
                              duration: 1.5,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                            className="
                              absolute
                              inset-0
                              rounded-full
                              bg-[#c44949]
                            "
                          />
                          <span
                            className="
                              relative
                              h-2
                              w-2
                              rounded-full
                              bg-[#a92d2d]
                            "
                          />
                        </span>

                        <span
                          className="
                            text-[8px]
                            font-semibold
                            uppercase
                            tracking-[0.12em]
                            text-[#76131d]
                          "
                        >
                          Limited stock
                        </span>

                        <span className="h-3 w-px shrink-0 bg-[#dfcdb5]" />

                        <Clock className="h-3 w-3 shrink-0 text-[#a16e25]" />

                        <motion.span
                          key={lowStockTime}
                          initial={{ opacity: 0.4, y: 2 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.15 }}
                          className="
                            min-w-[58px]
                            font-mono
                            text-[10px]
                            font-semibold
                            tracking-[0.08em]
                            text-[#42151a]
                          "
                        >
                          {lowStockTime}
                        </motion.span>

                        <motion.span
                          animate={{ opacity: [0.45, 1, 0.45] }}
                          transition={{
                            duration: 1.8,
                            repeat: Infinity,
                          }}
                          className="
                            hidden
                            sm:inline
                            text-[7px]
                            font-semibold
                            uppercase
                            tracking-[0.1em]
                            text-[#a16e25]
                          "
                        >
                          Selling fast
                        </motion.span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div
                  className="
                    flex
                    items-center
                    gap-2
                    text-xs
                    text-[#58734c]
                  "
                >
                  <Check className="h-4 w-4" />
                  In stock · Ready to dispatch
                </div>
              )}
            </div>

            {/* Quantity */}

            <div className="mt-6">
              <label
                className="
                block
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#6f594e]
                mb-3
              "
              >
                Quantity
              </label>

              <div
                className="
                flex
                items-center
                justify-between
                gap-4
              "
              >
                <div
                  className="
                  flex
                  items-center
                  border
                  border-[#d9cbb9]
                  bg-[#fffaf2]
                "
                >
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-[#6f594e]
                      hover:bg-[#f1e7d8]
                      disabled:opacity-30
                    "
                  >
                    <Minus className="h-4 w-4" />
                  </button>

                  <span
                    className="
                    w-12
                    text-center
                    text-sm
                    text-[#42151a]
                  "
                  >
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                    disabled={quantity >= stock}
                    className="
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      text-[#6f594e]
                      hover:bg-[#f1e7d8]
                      disabled:opacity-30
                    "
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* <span
                  className={`
                    text-[10px]
                    ${
                      isLowStock
                        ? "font-medium text-[#a16e25]"
                        : "text-[#958176]"
                    }
                  `}
                >
                  {isLowStock ? `${stock} left` : `${stock} available`}
                </span> */}
              </div>
            </div>

            {/* Add to bag */}

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
                delay: 0.45,
              }}
              className="mt-5"
            >
              {!isAdded ? (
                <motion.button
                  whileHover={{
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  onClick={handleAddToCart}
                  disabled={loading || isOutOfStock}
                  className="
                    w-full
                    h-12
                    flex
                    items-center
                    justify-center
                    gap-3
                    bg-[#76131d]
                    hover:bg-[#5e0e16]
                    text-white
                    text-[10px]
                    uppercase
                    tracking-[0.22em]
                    transition-all
                    duration-300
                    disabled:bg-[#c8bdb4]
                    disabled:cursor-not-allowed
                    shadow-[0_8px_25px_rgba(118,19,29,0.15)]
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Adding
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4 w-4" />
                      {isOutOfStock ? "Out of stock" : "Add to bag"}
                    </>
                  )}
                </motion.button>
              ) : (
                <div
                  className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  gap-2
                "
                >
                  <div
                    className="
                    h-12
                    flex
                    items-center
                    justify-center
                    gap-2
                    bg-[#e7eee2]
                    border
                    border-[#b8c9ad]
                    text-[#536a4c]
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                  "
                  >
                    <Check className="h-4 w-4" />
                    Added to bag
                  </div>

                  <Link
                    to="/cart"
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "instant",
                      });
                    }}
                    className="
                      h-12
                      flex
                      items-center
                      justify-center
                      gap-2
                      bg-[#fffaf2]
                      border
                      border-[#76131d]
                      text-[#76131d]
                      text-[9px]
                      uppercase
                      tracking-[0.15em]
                      hover:bg-[#f5eadc]
                    "
                  >
                    <ShoppingBag className="h-4 w-4" />
                    View bag
                  </Link>
                </div>
              )}
            </motion.div>

            {/* Share */}

            <div
              className="
              grid
              grid-cols-2
              gap-2
              mt-3
            "
            >
              <button
                onClick={() => setShowShareModal(true)}
                className="
                  h-11
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-[#d9cbb9]
                  text-[#6d594e]
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  hover:border-[#76131d]
                  hover:text-[#76131d]
                  transition
                "
              >
                <Share2 className="h-4 w-4" />
                Share
              </button>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText(window.location.href);

                  showNotification("Product link copied.", "success");
                }}
                className="
                  h-11
                  flex
                  items-center
                  justify-center
                  gap-2
                  border
                  border-[#d9cbb9]
                  text-[#6d594e]
                  text-[9px]
                  uppercase
                  tracking-[0.14em]
                  hover:border-[#76131d]
                  hover:text-[#76131d]
                  transition
                "
              >
                <Copy className="h-4 w-4" />
                Copy link
              </button>
            </div>

            {/* Trust */}

            <div
              className="
              grid
              grid-cols-3
              border-y
              border-[#dfd2c0]
              mt-7
              py-4
            "
            >
              <div
                className="
                text-center
                border-r
                border-[#dfd2c0]
              "
              >
                <Truck
                  className="
                  mx-auto
                  h-4
                  w-4
                  text-[#ad823a]
                  mb-2
                "
                />

                <p
                  className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[#735f55]
                "
                >
                  Free shipping
                </p>
              </div>

              <div
                className="
                text-center
                border-r
                border-[#dfd2c0]
              "
              >
                <ShieldCheck
                  className="
                  mx-auto
                  h-4
                  w-4
                  text-[#ad823a]
                  mb-2
                "
                />

                <p
                  className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[#735f55]
                "
                >
                  Authentic
                </p>
              </div>

              <div className="text-center">
                <RotateCcw
                  className="
                  mx-auto
                  h-4
                  w-4
                  text-[#ad823a]
                  mb-2
                "
                />

                <p
                  className="
                  text-[8px]
                  uppercase
                  tracking-[0.12em]
                  text-[#735f55]
                "
                >
                  7 day returns
                </p>
              </div>
            </div>

            {/* Delivery */}

            <div
              className="
              mt-5
              flex
              gap-3
              bg-[#f1e7d8]
              border
              border-[#dfd0ba]
              p-4
            "
            >
              <CalendarDays
                className="
                h-5
                w-5
                flex-shrink-0
                text-[#9e7737]
              "
              />

              <div>
                <p
                  className="
                  text-[9px]
                  uppercase
                  tracking-[0.16em]
                  text-[#765f50]
                "
                >
                  Expected delivery
                </p>

                <p
                  className="
                  font-serif
                  text-base
                  text-[#42151a]
                  mt-1
                "
                >
                  {deliveryDate}
                </p>

                <p
                  className="
                  text-[9px]
                  text-[#927d70]
                  mt-1
                "
                >
                  Free shipping across India
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ===================================================
            PRODUCT DETAILS
        =================================================== */}

        <section
          className="
          mt-16
          sm:mt-20
          border-t
          border-[#dfd2c0]
          pt-10
        "
        >
          <div
            className="
            flex
            overflow-x-auto
            border-b
            border-[#dfd2c0]
          "
          >
            {[
              ["description", "Description"],
              ["specifications", "Specifications"],
              ["faq", "FAQ"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`
                    flex-shrink-0
                    px-5
                    sm:px-8
                    pb-4
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    transition
                    ${
                      activeTab === key
                        ? "text-[#76131d] border-b-2 border-[#76131d]"
                        : "text-[#927d70] hover:text-[#76131d]"
                    }
                  `}
              >
                {label}
              </button>
            ))}
          </div>

          <div
            className="
            max-w-4xl
            py-8
          "
          >
            {activeTab === "description" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
              >
                <p
                  className="
                  text-sm
                  leading-8
                  text-[#735f55]
                "
                >
                  {product.description ||
                    "This handcrafted saree reflects the beauty of traditional Indian weaving. Each piece is carefully finished and carries the natural character of the textile."}
                </p>
              </motion.div>
            )}

            {activeTab === "specifications" && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  divide-y
                  divide-[#dfd2c0]
                "
              >
                <div
                  className="
                  flex
                  justify-between
                  gap-6
                  py-4
                  text-sm
                "
                >
                  <span
                    className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-[#927d70]
                  "
                  >
                    Category
                  </span>

                  <span className="text-[#5c473e] text-right">
                    {product.category || "Handloom"}
                  </span>
                </div>

                <div
                  className="
                  flex
                  justify-between
                  gap-6
                  py-4
                  text-sm
                "
                >
                  <span
                    className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-[#927d70]
                  "
                  >
                    Fabric
                  </span>

                  <span className="text-[#5c473e] text-right">
                    {product.fabric || "Handwoven textile"}
                  </span>
                </div>

                <div
                  className="
                  flex
                  justify-between
                  gap-6
                  py-4
                  text-sm
                "
                >
                  <span
                    className="
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-[#927d70]
                  "
                  >
                    Bouse piece
                  </span>

                  <span className="text-[#5c473e] text-right">
                   {product.blouseAvaliable ? "Available" : "Not available"}
                  </span>
                  
                </div>
                {/* Hot Sell */}
<div
  className="
    flex
    items-center
    justify-between
    gap-6
    py-4
    text-sm
  "
>
  <span
    className="
      text-[9px]
      uppercase
      tracking-[0.18em]
      text-[#927d70]
    "
  >
    Hot Sell
  </span>

  <span
    className={`
      inline-flex
      items-center
      gap-2
      px-3
      py-1.5
      text-[9px]
      uppercase
      tracking-[0.12em]
      font-medium
      ${
        product.hotSell
          ? "bg-[#f8e5e3] text-[#9d3030] border border-[#e5b9b5]"
          : "bg-[#f3eee7] text-[#88776c] border border-[#ddd1c4]"
      }
    `}
  >
    <span
      className={`
        h-1.5
        w-1.5
        rounded-full
        ${
          product.hotSell
            ? "bg-[#b52f2f] animate-pulse"
            : "bg-[#9c8e84]"
        }
      `}
    />

    {product.hotSell ? "Hot" : "Not Hot"}
  </span>
</div>

                <div
                  className="
                  py-4
                  text-sm
                "
                >
                  <span
                    className="
                    block
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-[#927d70]
                    mb-3
                  "
                  >
                    Product details
                  </span>

                  <p
                    className="
                    leading-7
                    text-[#735f55]
                  "
                  >
                    {product.specification ||
                      "No additional specifications provided."}
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === "faq" && (
              <div className="space-y-2">
                {faqs.map((faq, index) => (
                  <div
                    key={index}
                    className="
                        border-b
                        border-[#dfd2c0]
                      "
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="
                          w-full
                          py-5
                          flex
                          items-center
                          justify-between
                          gap-4
                          text-left
                        "
                    >
                      <span
                        className="
                          font-serif
                          text-lg
                          text-[#42151a]
                        "
                      >
                        {faq.q}
                      </span>

                      <ChevronDown
                        className={`
                            h-4
                            w-4
                            flex-shrink-0
                            text-[#927d70]
                            transition-transform
                            ${showFAQ[index] ? "rotate-180" : ""}
                          `}
                      />
                    </button>

                    <AnimatePresence>
                      {showFAQ[index] && (
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
                          className="overflow-hidden"
                        >
                          <p
                            className="
                              pb-5
                              pr-8
                              text-sm
                              leading-7
                              text-[#806c60]
                            "
                          >
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ===================================================
            YOU MAY ALSO LIKE
        =================================================== */}

        {similarProducts.length > 0 && (
          <section
            className="
            mt-10
            sm:mt-16
            pb-10
          "
          >
            <div
              className="
              flex
              items-end
              justify-between
              mb-7
            "
            >
              <div>
                <p
                  className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-[#a27d5f]
                  mb-2
                "
                >
                  The collection
                </p>

                <h2
                  className="
                  font-serif
                  text-2xl
                  sm:text-3xl
                  text-[#42151a]
                "
                >
                  You may also like
                </h2>
              </div>

              <Sparkles
                className="
                hidden
                sm:block
                h-5
                w-5
                text-[#b48a42]
              "
              />
            </div>

            <div
              className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-3
              sm:gap-5
            "
            >
              {similarProducts.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item._id}
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
                  transition={{
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -5,
                  }}
                  onClick={() => {
                    navigate(`/productDetails/${item._id}`);

                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                        group
                        cursor-pointer
                      "
                >
                  <div
                    className="
                        relative
                        aspect-[4/5]
                        overflow-hidden
                        bg-[#eee4d3]
                        border
                        border-[#dfd2c0]
                      "
                  >
                    <img
                      src={
                        item.images?.[0]
                          ? `${url}/img/${item.images[0]}`
                          : "https://placehold.co/400x500"
                      }
                      alt={item.productName}
                      className="
                            w-full
                            h-full
                            object-cover
                            transition-transform
                            duration-700
                            group-hover:scale-105
                          "
                    />

                    {item.originalPrice && item.price < item.originalPrice && (
                      <span
                        className="
                              absolute
                              top-3
                              left-3
                              bg-[#d0a34b]
                              text-[#42151a]
                              px-2
                              py-1
                              text-[7px]
                              uppercase
                              tracking-[0.15em]
                            "
                      >
                        Sale
                      </span>
                    )}

                    <div
                      className="
                          absolute
                          inset-x-0
                          bottom-0
                          p-3
                          bg-gradient-to-t
                          from-black/30
                          to-transparent
                          opacity-0
                          group-hover:opacity-100
                          transition-opacity
                        "
                    >
                      <span
                        className="
                            text-white
                            text-[8px]
                            uppercase
                            tracking-[0.2em]
                          "
                      >
                        View saree
                      </span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <h3
                      className="
                          font-serif
                          text-base
                          sm:text-lg
                          text-[#42151a]
                          truncate
                        "
                    >
                      {item.productName}
                    </h3>

                    <p
                      className="
                          mt-1
                          text-xs
                          text-[#6f594e]
                        "
                    >
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* =====================================================
          LOGIN MODAL
      ===================================================== */}

      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[90]
              bg-[#321014]/50
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onClick={() => setShowLoginPrompt(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                y: 20,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                relative
                w-full
                max-w-md
                bg-[#fffaf2]
                border
                border-[#dfd2c0]
                p-7
                sm:p-9
                shadow-2xl
              "
            >
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="
                  absolute
                  top-4
                  right-4
                  text-[#927d70]
                  hover:text-[#76131d]
                "
              >
                <X className="h-5 w-5" />
              </button>

              <div className="text-center">
                <div
                  className="
                  mx-auto
                  h-14
                  w-14
                  rounded-full
                  bg-[#f1e3d2]
                  flex
                  items-center
                  justify-center
                  mb-5
                "
                >
                  <LogIn
                    className="
                    h-6
                    w-6
                    text-[#76131d]
                  "
                  />
                </div>

                <p
                  className="
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-[#a27d5f]
                  mb-3
                "
                >
                  Your Darsh bag
                </p>

                <h3
                  className="
                  font-serif
                  text-2xl
                  text-[#42151a]
                "
                >
                  Sign in to continue
                </h3>

                <p
                  className="
                  mt-3
                  text-sm
                  leading-6
                  text-[#806c60]
                "
                >
                  Please sign in to add this beautiful piece to your bag.
                </p>
              </div>

              <div
                className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-2
                mt-7
              "
              >
                <button
                  onClick={handleQuickLogin}
                  className="
                    h-11
                    bg-[#76131d]
                    text-white
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    hover:bg-[#5e0e16]
                    transition
                  "
                >
                  Sign in
                </button>

                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="
                    h-11
                    border
                    border-[#d9cbb9]
                    text-[#624e44]
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    hover:bg-[#f3e9dc]
                  "
                >
                  Continue browsing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          FULLSCREEN ZOOM
      ===================================================== */}

      <AnimatePresence>
        {zoomMode && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[110]
              bg-[#241416]/95
              flex
              items-center
              justify-center
              p-4
            "
            onClick={toggleZoomMode}

             onClick={(event) => {
        // Only close when clicking the backdrop
        if (event.target === event.currentTarget) {
          toggleZoomMode();
        }
      }}
          >
            <button
              onClick={toggleZoomMode}
              className="
                absolute
                top-5
                right-5
                z-10
                h-10
                w-10
                flex
                items-center
                justify-center
                bg-white/10
                border
                border-white/20
                text-white
                hover:bg-white/20
              "
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="
                relative
                w-full
                h-full
                flex
                items-center
                justify-center
              "
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={images[selectedImage]}
                alt={product.productName}
                className="
                  max-w-full
                  max-h-[85vh]
                  object-contain
                  select-none
                "
                draggable="false"
                style={{
                  transform: `
                    scale(${zoomLevel})
                    translate(
                      ${position.x}px,
                      ${position.y}px
                    )
                  `,
                  transition: isDragging ? "none" : "transform 0.3s ease",
                  cursor: zoomLevel > 1 ? "grabbing" : "grab",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              />

              {/* Zoom Controls */}

              <div
                className="
                absolute
                bottom-5
                left-1/2
                -translate-x-1/2
                flex
                items-center
                gap-1
                bg-[#fffaf2]
                p-1
              "
              >
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  className="
                    h-9
                    w-9
                    flex
                    items-center
                    justify-center
                    text-[#5c473e]
                    hover:bg-[#f0e5d7]
                    disabled:opacity-30
                  "
                >
                  <ZoomOut className="h-4 w-4" />
                </button>

                <button
                  onClick={handleResetZoom}
                  className="
                    h-9
                    w-9
                    flex
                    items-center
                    justify-center
                    text-[#5c473e]
                    hover:bg-[#f0e5d7]
                  "
                >
                  <RotateCw className="h-4 w-4" />
                </button>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  className="
                    h-9
                    w-9
                    flex
                    items-center
                    justify-center
                    text-[#5c473e]
                    hover:bg-[#f0e5d7]
                    disabled:opacity-30
                  "
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
              </div>

              {zoomLevel > 1 && (
                <div
                  className="
                  absolute
                  top-5
                  left-5
                  flex
                  items-center
                  gap-2
                  bg-black/40
                  text-white
                  px-3
                  py-2
                  text-[9px]
                  uppercase
                  tracking-[0.15em]
                "
                >
                  <Move className="h-3 w-3" />
                  Drag to explore
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          SHARE MODAL
      ===================================================== */}

      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              fixed
              inset-0
              z-[100]
              bg-[#321014]/50
              backdrop-blur-sm
              flex
              items-center
              justify-center
              p-4
            "
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
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
              onClick={(event) => event.stopPropagation()}
              className="
                relative
                w-full
                max-w-sm
                bg-[#fffaf2]
                border
                border-[#dfd2c0]
                p-7
              "
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="
                  absolute
                  top-4
                  right-4
                  text-[#927d70]
                  hover:text-[#76131d]
                "
              >
                <X className="h-5 w-5" />
              </button>

              <p
                className="
                text-center
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#a27d5f]
              "
              >
                Share the weave
              </p>

              <h3
                className="
                mt-2
                text-center
                font-serif
                text-2xl
                text-[#42151a]
              "
              >
                Share this saree
              </h3>

              <div
                className="
                grid
                grid-cols-2
                gap-2
                mt-7
              "
              >
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                    py-4
                    bg-[#eef6ed]
                    border
                    border-[#cbdcc8]
                    hover:bg-[#e4f0e2]
                  "
                >
                  <FaWhatsapp className="h-5 w-5 text-[#4d8750]" />

                  <span
                    className="
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-[#53654f]
                  "
                  >
                    WhatsApp
                  </span>
                </button>

                <button
                  onClick={() => handleShare("telegram")}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                    py-4
                    bg-[#edf4f8]
                    border
                    border-[#c9dce7]
                    hover:bg-[#e5f0f6]
                  "
                >
                  <FaTelegram className="h-5 w-5 text-[#4284a9]" />

                  <span
                    className="
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-[#536570]
                  "
                  >
                    Telegram
                  </span>
                </button>

                <button
                  onClick={() => handleShare("facebook")}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                    py-4
                    bg-[#eef1f8]
                    border
                    border-[#cbd3e4]
                    hover:bg-[#e4e9f3]
                  "
                >
                  <FaFacebook className="h-5 w-5 text-[#4267a9]" />

                  <span
                    className="
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-[#536070]
                  "
                  >
                    Facebook
                  </span>
                </button>

                <button
                  onClick={() => handleShare("copy")}
                  className="
                    flex
                    flex-col
                    items-center
                    gap-2
                    py-4
                    bg-[#f1e9df]
                    border
                    border-[#dcd0c1]
                    hover:bg-[#ebe0d4]
                  "
                >
                  <Copy
                    className="
                    h-5
                    w-5
                    text-[#715d52]
                  "
                  />

                  <span
                    className="
                    text-[8px]
                    uppercase
                    tracking-[0.12em]
                    text-[#66554c]
                  "
                  >
                    Copy link
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetails;