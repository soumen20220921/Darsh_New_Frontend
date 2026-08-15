import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Link } from "react-router-dom";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Flame,
  Heart,
  Crown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import SignatureWeaves from "../components/SignatureWeaves";
import Hero from "../components/Hero";

import { useAppContext } from "../context/AppContext.jsx";

import Reels from "./Reels.jsx";
import FestiveBanner from "./FestiveBanner.jsx";

/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = [
  {
    id: "silk",
    name: "Pure Silk",
    subtitle: " PURE Silk Collections",
    image: "/IMG/p7.jpg",
    path: "/Categories/Pure Silk",
  },
  {
    id: "cotton",
    name: "Cotton Handloom",
    subtitle: " Everyday breathable drapes",
    image: "/IMG/p8.jpg",
    path: "/Categories/Cotton Handloom",
  },
  {
    id: "bandhani",
    name: "Bandhani",
    subtitle: " Traditional tie-dye artistry",
    image: "/IMG/p9.jpg",
    path: "/Categories/Bandhani",
  },
  {
    id: "festive",
    name: "Festive Edit",
    subtitle: " Celebrate in style with our curated collection",
    image: "/IMG/p10.jpg",
    path: "/Categories/Festive Edit",
  },
];

/* =========================================================
   FALLBACK PRODUCTS
   Only used when API has no products.
========================================================= */

const fallbackProducts = [
  {
    id: "demo-1",
    productName: "Emerald Kanjivaram",
    category: "PURE MULBERRY SILK · KANCHIPURAM",
    price: 18900,
    image: "/IMG/saree.png",
    badge: "BESTSELLER",
    color: "red",
  },
  {
    id: "demo-2",
    productName: "Blush Chiffon Aari",
    category: "SILK CHIFFON · LUCKNOW",
    price: 7450,
    image: "/IMG/saree.png",
    badge: "NEW",
    color: "white",
  },
  {
    id: "demo-3",
    productName: "Indigo Handloom",
    category: "KHADI COTTON · BHUJ",
    price: 4200,
    image: "/IMG/home.png",
    badge: "NEW",
    color: "blue",
  },
  {
    id: "demo-4",
    productName: "Mustard Tussar",
    category: "TUSSAR SILK · BHAGALPUR",
    price: 9800,
    image: "/IMG/saree.png",
    color: "yellow",
  },
  {
    id: "demo-5",
    productName: "Ivory Kota Doria",
    category: "KOTA COTTON SILK · KOTA",
    price: 5300,
    image: "/IMG/saree.png",
    badge: "FESTIVE",
    color: "white",
  },
  {
    id: "demo-6",
    productName: "Plum Bandhani",
    category: "GAJI SILK · JAMNAGAR",
    price: 11200,
    image: "/IMG/all.png",
    color: "red",
  },
];

/* =========================================================
   LUXURY PRODUCT CARD
========================================================= */

const LuxuryProductCard = ({
  product,
  url,
  index = 0,
}) => {
  if (!product) return null;

  const productId =
    product?._id || product?.id;

  const image =
    product?.images?.[0]
      ? `${url}/img/${product.images[0]}`
      : product?.image ||
        "/IMG/saree.png";

  const name =
    product?.productName ||
    product?.name ||
    "Handwoven Saree";

  const category =
    product?.fabric ||
    product?.category ||
    product?.subCategory ||
    "HANDWOVEN · DARSH";

  const price =
    Number(product?.price) || 0;

  const oldPrice =
    product?.originalPrice ||
    product?.oldprice ||
    product?.oldPrice;

 

  return (
    <Link
      to={`/productDetails/${productId}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      className="
        group
        block
        min-w-0
        opacity-0
        animate-[productReveal_700ms_ease-out_forwards]
      "
      style={{
        animationDelay: `${index * 90}ms`,
      }}
    >
      {/* =================================================
          IMAGE
      ================================================= */}

      <div
        className="
          relative
          aspect-[0.78]
          overflow-hidden
          bg-[#eee5d5]
        "
      >
        <DarshWishlistButton product={product} />
        <img
          src={image}
          alt={`${name} - Darsh Saree`}
          loading={
            index > 2
              ? "lazy"
              : "eager"
          }
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-[1200ms]
            ease-out
            group-hover:scale-[1.045]
          "
        />

        {/* Soft overlay */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-[#4c1117]/35
            via-transparent
            to-transparent
            opacity-0
            transition-opacity
            duration-500
            group-hover:opacity-100
          "
        />

        {/* =================================================
            BADGES
        ================================================= */}

        <div
          className="
            absolute
            left-3
            top-3
            flex
            flex-col
            gap-2
            sm:left-4
            sm:top-4
          "
        >
          {product?.badge && (
            <span
              className="
                bg-[#d4ad54]
                px-3
                py-1.5
                text-[7px]
                font-medium
                uppercase
                tracking-[0.22em]
                text-[#4a1815]
                sm:text-[8px]
              "
            >
              {product.badge}
            </span>
          )}

        
        </div>

        {/* =================================================
            DESKTOP VIEW BUTTON
        ================================================= */}

        <div
          className="
            absolute
            bottom-4
            left-1/2
            -translate-x-1/2
            translate-y-4
            opacity-0
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span
            className="
              flex
              items-center
              gap-2
              whitespace-nowrap
              bg-[#f8f4eb]/95
              px-5
              py-2.5
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#741522]
              shadow-lg
              backdrop-blur-sm
            "
          >
            View Saree

            <ArrowRight
              size={13}
              strokeWidth={1.2}
            />
          </span>
        </div>
      </div>

      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <div className="pt-4 sm:pt-5">
        <div
          className="
            flex
            items-start
            justify-between
            gap-3
          "
        >
          <h3
            className="
              min-w-0
              font-serif
              text-[16px]
              leading-[1.15]
              text-[#3f1616]
              transition-colors
              duration-300
              group-hover:text-[#741522]
              sm:text-[19px]
            "
          >
            {name}
          </h3>

          {/* Price */}

          <div
            className="
              shrink-0
              text-right
            "
          >
            <p
              className="
                whitespace-nowrap
                text-[11px]
                text-[#3d1714]
                sm:text-[12px]
              "
            >
              ₹
              {price.toLocaleString(
                "en-IN"
              )}
            </p>

            {oldPrice && (
              <p
                className="
                  mt-0.5
                  whitespace-nowrap
                  text-[9px]
                  text-[#8e7770]
                  line-through
                "
              >
                ₹
                {Number(
                  oldPrice
                ).toLocaleString(
                  "en-IN"
                )}
              </p>
            )}
          </div>
        </div>

        {/* Product meta */}

        <p
          className="
            mt-2
            truncate
            text-[7px]
            uppercase
            tracking-[0.22em]
            text-[#977e73]
            sm:text-[8px]
          "
        >
          {category}
        </p>

        {/* Mobile actions */}

        <div
          className="
            mt-4
            grid
            grid-cols-2
            gap-2
            sm:hidden
          "
        >
          

          <span
            className="
              flex
              min-h-[40px]
              items-center
              justify-center
              bg-[#741522]
              px-2
              text-[7px]
              uppercase
              tracking-[0.15em]
              text-[#f8f4eb]
            "
          >
            Shop now
          </span>
        </div>
      </div>
    </Link>
  );
};

/* =========================================================
   COLOR STORIES
   Only the four main storefront colors are shown.
========================================================= */

const COLOR_STORIES = [
  {
    key: "red",
    label: "RED",
    subtitle: "Bold & timeless",
    swatches: ["#8f1725", "#c83b45", "#5f0d17"],
  },
  {
    key: "white",
    label: "WHITE",
    subtitle: "Pure & elegant",
    swatches: ["#fffaf0", "#e9e2d4", "#cfc7b8"],
  },
  {
    key: "yellow",
    label: "YELLOW",
    subtitle: "Warm & radiant",
    swatches: ["#d4a72c", "#f0c94b", "#b98217"],
  },
  {
    key: "blue",
    label: "BLUE",
    subtitle: "Calm & graceful",
    swatches: ["#173b67", "#356a9f", "#0d2744"],
  },
];

const getProductColorText = (product) => {
  const values = [
    product?.color,
    product?.colour,
    product?.productColor,
    product?.colors,
    product?.colours,
    product?.shade,
    product?.variant?.color,
    product?.variants?.[0]?.color,
  ];

  return values
    .flatMap((value) =>
      Array.isArray(value) ? value : value ? [value] : []
    )
    .join(" ")
    .toLowerCase()
    .trim();
};

const matchesColor = (product, colorKey) => {
  const colorText = getProductColorText(product);

  if (!colorText) return false;

  const colorAliases = {
    red: [
      "red",
      "maroon",
      "crimson",
      "scarlet",
      "wine",
      "burgundy",
      "rani",
      "vermilion",
    ],
    white: [
      "white",
      "ivory",
      "cream",
      "off white",
      "off-white",
      "pearl",
      "beige",
      "ekru",
      "ecru",
    ],
    yellow: [
      "yellow",
      "mustard",
      "golden yellow",
      "lemon",
      "haldi",
      "turmeric",
      "ochre",
      "ochre yellow",
    ],
    blue: [
      "blue",
      "navy",
      "royal blue",
      "sky blue",
      "powder blue",
      "indigo",
      "cobalt",
      "teal blue",
      "denim",
      "midnight blue",
    ],
  };

  return colorAliases[colorKey]?.some((alias) =>
    colorText.includes(alias)
  );
};

const ColorStories = ({ products, url }) => {
  const previewColors = COLOR_STORIES.map((color) => ({
    ...color,
    count: products.filter((product) => matchesColor(product, color.key)).length,
    product:
      products.find((product) => matchesColor(product, color.key)) || null,
  }));

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-[#741522]/10
        bg-[#f3eadb]
        py-12
        sm:py-16
        lg:py-20
      "
    >
      <div className="mx-auto w-full max-w-[1120px] px-5 sm:px-8 lg:px-0">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-3 text-[8px] font-medium uppercase tracking-[0.35em] text-[#977e73] sm:text-[9px]">
              THE DARSH COLOR EDIT
            </p>

            <h2 className="font-serif text-[32px] font-normal leading-none text-[#3f1616] sm:text-[42px]">
              Sarees by color
            </h2>

            <p className="mt-3 max-w-[480px] text-[11px] leading-5 text-[#806c63] sm:text-[12px]">
              Find your favourite shade from our four signature color edits.
            </p>
          </div>

          <Link
            to="/sarees-by-color"
            className="
              group
              inline-flex
              w-fit
              items-center
              gap-2
              border
              border-[#741522]/40
              px-5
              py-2.5
              text-[7px]
              uppercase
              tracking-[0.24em]
              text-[#741522]
              transition-all
              duration-300
              hover:bg-[#741522]
              hover:text-[#f8f4eb]
              sm:px-6
              sm:py-3
            "
          >
            View all colors
            <ArrowRight
              size={13}
              strokeWidth={1.2}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 sm:grid-cols-4 sm:gap-4">
          {previewColors.map((color) => (
            <Link
              key={color.key}
              to={`/sarees-by-color?color=${color.key}`}
              className="
                group
                relative
                overflow-hidden
                border
                border-[#741522]/10
                bg-[#f8f4eb]
                p-3
                transition-all
                duration-500
                hover:-translate-y-1
                hover:border-[#741522]/30
                hover:shadow-xl
                sm:p-4
              "
            >
              <div className="relative aspect-[1.15] overflow-hidden bg-[#eee5d5]">
                {color.product ? (
                  <img
                    src={
                      color.product?.images?.[0]
                        ? `${url}/img/${color.product.images[0]}`
                        : color.product?.image || "/IMG/saree.png"
                    }
                    alt={`${color.label} sarees`}
                    loading="lazy"
                    className="
                      absolute inset-0 h-full w-full object-cover
                      transition-transform duration-700
                      group-hover:scale-105
                    "
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-[#e8dece]">
                    <div
                      className="h-20 w-20 rounded-full shadow-inner sm:h-24 sm:w-24"
                      style={{
                        background: `linear-gradient(135deg, ${color.swatches[0]}, ${color.swatches[1]})`,
                      }}
                    />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#3f1616]/80 to-transparent px-3 pb-3 pt-8">
                  <span className="text-[7px] uppercase tracking-[0.25em] text-[#f8f4eb]">
                    {color.count > 0 ? `${color.count} pieces` : "Explore edit"}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-3">
                <div>
                  <h3 className="font-serif text-[20px] leading-none text-[#3f1616] sm:text-[23px]">
                    {color.label}
                  </h3>
                  <p className="mt-1.5 text-[7px] uppercase tracking-[0.16em] text-[#977e73]">
                    {color.subtitle}
                  </p>
                </div>

                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522] transition-all duration-300 group-hover:bg-[#741522] group-hover:text-[#f8f4eb]">
                  <ArrowRight size={13} strokeWidth={1.2} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

/* =========================================================
   HOME COMPONENT
========================================================= */


/* ============================================================
   SHARED DARSH WISHLIST BUTTON
   Source of truth: localStorage "wishlist"
   Compatible with the existing Wishlist page.
============================================================ */

const DARSH_WISHLIST_KEY = "wishlist";

const getWishlistId = (product) =>
  product?._id || product?.id || product?.productId || null;

const readDarshWishlist = () => {
  try {
    const raw = localStorage.getItem(
      DARSH_WISHLIST_KEY
    );

    const parsed = raw ? JSON.parse(raw) : [];

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
};

const emitWishlistUpdate = () => {
  /*
    Keep both events so older components continue
    working while the new pages use one source of truth.
  */
  window.dispatchEvent(
    new Event("wishlistUpdated")
  );

  window.dispatchEvent(
    new Event("darsh-wishlist-updated")
  );
};

const DarshWishlistButton = ({
  product,
  className = "",
}) => {
  const productId = getWishlistId(product);

  const [wished, setWished] = useState(() =>
    productId
      ? readDarshWishlist().some(
          (item) =>
            getWishlistId(item) ===
            productId
        )
      : false
  );

  useEffect(() => {
    const sync = () => {
      if (!productId) {
        setWished(false);
        return;
      }

      setWished(
        readDarshWishlist().some(
          (item) =>
            getWishlistId(item) ===
            productId
        )
      );
    };

    sync();

    window.addEventListener(
      "wishlistUpdated",
      sync
    );

    window.addEventListener(
      "darsh-wishlist-updated",
      sync
    );

    window.addEventListener(
      "storage",
      sync
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        sync
      );

      window.removeEventListener(
        "darsh-wishlist-updated",
        sync
      );

      window.removeEventListener(
        "storage",
        sync
      );
    };
  }, [productId]);

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) {
      return;
    }

    const current =
      readDarshWishlist();

    const exists = current.some(
      (item) =>
        getWishlistId(item) ===
        productId
    );

    const next = exists
      ? current.filter(
          (item) =>
            getWishlistId(item) !==
            productId
        )
      : [
          ...current,
          {
            ...product,
            id:
              product?.id ||
              productId,
            _id:
              product?._id ||
              productId,
            name:
              product?.name ||
              product?.productName ||
              "Darsh Saree",
            productName:
              product?.productName ||
              product?.name ||
              "Darsh Saree",
            price: Number(
              product?.price || 0
            ),
            image:
      product?.image ||
      product?.images?.[0] ||
      product?.img ||
      "/IMG/placeholder.jpg",
    price: Number(product?.price || 0),
          },
        ];

    try {
      localStorage.setItem(
        DARSH_WISHLIST_KEY,
        JSON.stringify(next)
      );

      setWished(!exists);
      emitWishlistUpdate();
    } catch {
      // Ignore storage failures gracefully.
    }
  };

  if (!productId) {
    return null;
  }

  return (
    <motion.button
      type="button"
      aria-label={
        wished
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      aria-pressed={wished}
      onClick={toggleWishlist}
      whileTap={{
        scale: 0.88,
      }}
      whileHover={{
        scale: 1.08,
      }}
      className={`
        group/wishlist
        absolute
        right-3
        top-3
        z-30
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        border
        shadow-sm
        backdrop-blur-md
        transition-all
        duration-300
        sm:right-4
        sm:top-4
        sm:h-10
        sm:w-10

        ${
          wished
            ? "border-[#741522] bg-[#741522] text-white shadow-[0_8px_25px_rgba(116,21,34,.28)]"
            : "border-white/80 bg-white/85 text-[#741522] hover:border-[#C9A24A] hover:bg-white"
        }

        ${className}
      `}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={wished ? "liked" : "idle"}
          initial={{
            scale: 0.55,
            opacity: 0,
            rotate: -12,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            rotate: 0,
          }}
          exit={{
            scale: 0.55,
            opacity: 0,
          }}
          transition={{
            duration: 0.2,
          }}
        >
          <Heart
            size={17}
            strokeWidth={1.7}
            fill={
              wished
                ? "currentColor"
                : "none"
          }
          />
        </motion.span>
      </AnimatePresence>

      {wished && (
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
            pointer-events-none
            absolute
            -right-0.5
            -top-0.5
            h-2
            w-2
            rounded-full
            bg-[#E7C979]
          "
        />
      )}
    </motion.button>
  );
};

const Home = () => {
  const {
    allProduct,
    url,
  } = useAppContext();

  /* =================================================
     NEW ARRIVAL STATE
  ================================================= */

  const [newIndex, setNewIndex] =
    useState(0);

  const [
    isNewArrivalPaused,
    setIsNewArrivalPaused,
  ] = useState(false);

  const mobileRailRef =
    useRef(null);

  const newAutoScrollRef =
    useRef(null);

  /* =================================================
     HOT SALES STATE
  ================================================= */

  const [hotIndex, setHotIndex] =
    useState(0);

  const [
    isHotSalesPaused,
    setIsHotSalesPaused,
  ] = useState(false);

  const hotMobileRailRef =
    useRef(null);

  const hotAutoScrollRef =
    useRef(null);

  /* =================================================
     PRODUCTS
  ================================================= */

  const products = useMemo(() => {
    if (!allProduct?.length) {
      return fallbackProducts;
    }

    return allProduct;
  }, [allProduct]);

  /* =================================================
     NEW ARRIVALS
  ================================================= */

  const newArrivals = useMemo(() => {
    let items = [];

    if (!allProduct?.length) {
      items =
        fallbackProducts.slice(0, 8);
    } else {
      items = [...allProduct]
        .sort(
          (a, b) =>
            new Date(
              b?.createdAt || 0
            ) -
            new Date(
              a?.createdAt || 0
            )
        )
        .slice(0, 8);
    }

    return items.map(
      (product, index) => ({
        ...product,
        badge:
          product?.badge ||
          (index < 3
            ? "NEW"
            : undefined),
      })
    );
  }, [allProduct]);

  /* =================================================
     HOT SALES

     API FIELD:
     hotSell
  ================================================= */

  const hotSales = useMemo(() => {
    if (!allProduct?.length) {
      return [];
    }

    return allProduct
      .filter(
        (product) =>
          product?.hotSell === true ||
          product?.hotSell === "true" ||
          product?.hotSell === 1
      )
      .slice(0, 8)
      .map((product) => ({
        ...product,
        badge:
          product?.badge || "HOT",
      }));
  }, [allProduct]);

  

  const premiumSarees = useMemo(() => {
    const source = Array.isArray(allProduct)
      ? [...allProduct]
      : [...fallbackProducts];


   

    const getPremiumText = (product) =>
      [
        product?.productName,
        product?.name,
        product?.title,
        product?.fabric,
        product?.description,
        product?.shortDescription,
        ...(Array.isArray(product?.tags)
          ? product.tags
          : []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

  

      

    /*
      IMPORTANT:
      No category check here.
      A product priced ₹5,000+ is eligible.
    */
    const eligiblePremiumProducts =
      source.filter(
        (product) =>
          Number(product?.price || 0) >= 5000
      );

    return eligiblePremiumProducts
      .sort((a, b) => {
        
        // 2. Higher-value products next
        return (
          Number(b?.price || 0) -
          Number(a?.price || 0)
        );
      })
      .filter(
        (product, index, array) =>
          array.findIndex(
            (item) =>
              String(
                item?._id || item?.id
              ) ===
              String(
                product?._id || product?.id
              )
          ) === index
      )
      .slice(0, 8)
      .map((product) => ({
        ...product,
        badge:
          product?.badge || "PREMIUM",
      }));
  }, [allProduct, fallbackProducts]);
  /* =================================================
     RESET INDICES
  ================================================= */

  useEffect(() => {
    setNewIndex(0);
  }, [newArrivals.length]);

  useEffect(() => {
    setHotIndex(0);
  }, [hotSales.length]);

  /* =================================================
     NEW ARRIVALS DESKTOP AUTOPLAY
  ================================================= */

  useEffect(() => {
    if (
      newArrivals.length <= 3 ||
      isNewArrivalPaused
    ) {
      return;
    }

    newAutoScrollRef.current =
      setInterval(() => {
        setNewIndex((prev) => {
          const max =
            Math.max(
              newArrivals.length - 3,
              0
            );

          return prev >= max
            ? 0
            : prev + 1;
        });
      }, 4500);

    return () => {
      clearInterval(
        newAutoScrollRef.current
      );
    };
  }, [
    newArrivals.length,
    isNewArrivalPaused,
  ]);

  /* =================================================
     NEW ARRIVALS MOBILE AUTOPLAY
  ================================================= */

  useEffect(() => {
    const rail =
      mobileRailRef.current;

    if (
      !rail ||
      newArrivals.length <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (isNewArrivalPaused) {
        return;
      }

      const card =
        rail.querySelector(
          "[data-new-arrival-card]"
        );

      if (!card) {
        return;
      }

      const cardWidth =
        card.offsetWidth;

      const gap = 16;

      const maxScroll =
        rail.scrollWidth -
        rail.clientWidth;

      if (
        rail.scrollLeft +
          cardWidth +
          gap >=
        maxScroll - 10
      ) {
        rail.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        rail.scrollBy({
          left:
            cardWidth + gap,
          behavior: "smooth",
        });
      }
    }, 4200);

    return () =>
      clearInterval(timer);
  }, [
    newArrivals.length,
    isNewArrivalPaused,
  ]);

  /* =================================================
     NEW ARRIVAL NEXT
  ================================================= */

  const nextNew = () => {
    setNewIndex((prev) => {
      const max =
        Math.max(
          newArrivals.length - 3,
          0
        );

      return prev >= max
        ? 0
        : prev + 1;
    });
  };

  /* =================================================
     NEW ARRIVAL PREVIOUS
  ================================================= */

  const previousNew = () => {
    setNewIndex((prev) => {
      const max =
        Math.max(
          newArrivals.length - 3,
          0
        );

      return prev <= 0
        ? max
        : prev - 1;
    });
  };

  /* =================================================
     NEW ARRIVAL MOBILE NEXT
  ================================================= */

  const scrollMobileNext = () => {
    const rail =
      mobileRailRef.current;

    if (!rail) return;

    const card =
      rail.querySelector(
        "[data-new-arrival-card]"
      );

    if (!card) return;

    rail.scrollBy({
      left:
        card.offsetWidth + 16,
      behavior: "smooth",
    });
  };

  /* =================================================
     HOT SALES DESKTOP AUTOPLAY
  ================================================= */

  useEffect(() => {
    if (
      hotSales.length <= 3 ||
      isHotSalesPaused
    ) {
      return;
    }

    hotAutoScrollRef.current =
      setInterval(() => {
        setHotIndex((prev) => {
          const max =
            Math.max(
              hotSales.length - 3,
              0
            );

          return prev >= max
            ? 0
            : prev + 1;
        });
      }, 4200);

    return () => {
      clearInterval(
        hotAutoScrollRef.current
      );
    };
  }, [
    hotSales.length,
    isHotSalesPaused,
  ]);

  /* =================================================
     HOT SALES MOBILE AUTOPLAY
  ================================================= */

  useEffect(() => {
    const rail =
      hotMobileRailRef.current;

    if (
      !rail ||
      hotSales.length <= 1
    ) {
      return;
    }

    const timer = setInterval(() => {
      if (isHotSalesPaused) {
        return;
      }

      const card =
        rail.querySelector(
          "[data-hot-sale-card]"
        );

      if (!card) {
        return;
      }

      const cardWidth =
        card.offsetWidth;

      const gap = 16;

      const maxScroll =
        rail.scrollWidth -
        rail.clientWidth;

      if (
        rail.scrollLeft +
          cardWidth +
          gap >=
        maxScroll - 10
      ) {
        rail.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        rail.scrollBy({
          left:
            cardWidth + gap,
          behavior: "smooth",
        });
      }
    }, 4000);

    return () =>
      clearInterval(timer);
  }, [
    hotSales.length,
    isHotSalesPaused,
  ]);

  /* =================================================
     HOT SALES NEXT
  ================================================= */

  const nextHot = () => {
    setHotIndex((prev) => {
      const max =
        Math.max(
          hotSales.length - 3,
          0
        );

      return prev >= max
        ? 0
        : prev + 1;
    });
  };

  /* =================================================
     HOT SALES PREVIOUS
  ================================================= */

  const previousHot = () => {
    setHotIndex((prev) => {
      const max =
        Math.max(
          hotSales.length - 3,
          0
        );

      return prev <= 0
        ? max
        : prev - 1;
    });
  };

  /* =================================================
     HOT SALES MOBILE NEXT
  ================================================= */

  const scrollHotMobileNext = () => {
    const rail =
      hotMobileRailRef.current;

    if (!rail) return;

    const card =
      rail.querySelector(
        "[data-hot-sale-card]"
      );

    if (!card) return;

    rail.scrollBy({
      left:
        card.offsetWidth + 16,
      behavior: "smooth",
    });
  };

  /* =================================================
     SCROLL TOP
  ================================================= */

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  /* =================================================
     RENDER
  ================================================= */

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#f8f4eb]
        text-[#3f1616]
      "
    >

      {/* =================================================
          HERO
      ================================================= */}

      <Hero />

      {/* =================================================
          SIGNATURE WEAVES
      ================================================= */}

      <SignatureWeaves />

      {/* =================================================
          FIND YOUR WEAVE
      ================================================= */}

      <section
        className="
          relative
          border-b
          border-[#741522]/10
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            max-w-[1120px]
            px-5
            sm:px-8
            lg:px-0
          "
        >

          {/* Header */}

          <div
            className="
              mb-9
              flex
              flex-col
              gap-7
              sm:mb-11
              sm:flex-row
              sm:items-end
              sm:justify-between
            "
          >
            <div>

              <p
                className="
                  mb-4
                  text-[8px]
                  uppercase
                  tracking-[0.38em]
                  text-[#977e73]
                  sm:text-[9px]
                "
              >
                SHOP BY CATEGORY
              </p>

              <h2
                className="
                  font-serif
                  text-[35px]
                  font-normal
                  leading-none
                  text-[#3f1616]
                  sm:text-[48px]
                  lg:text-[54px]
                "
              >
                Find your weave
              </h2>

            </div>

            <Link
              to="/allproducts"
              onClick={scrollTop}
              className="
                self-start
                border
                border-[#741522]/50
                px-7
                py-3.5
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#741522]
                transition-all
                duration-300
                hover:bg-[#741522]
                hover:text-[#f8f4eb]
                sm:self-auto
              "
            >
              All Categories
            </Link>
          </div>

          {/* Category grid */}

          <div
            className="
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-2
              lg:grid-cols-4
              lg:grid-rows-[225px_225px]
            "
          >

            {/* Silk */}

            <Link
              to="/Categories/Pure Silk"
              onClick={scrollTop}
              className="
                group
                relative
                min-h-[390px]
                overflow-hidden
                sm:col-span-2
                lg:row-span-2
                lg:min-h-0
              "
            >
              <img
                src={categories[0].image}
                alt={categories[0].name}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  group-hover:scale-[1.06]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#65171b]/85
                  via-[#65171b]/10
                  to-transparent
                "
              />

              <CategoryText
                title={
                  categories[0].name
                }
                subtitle={
                  categories[0].subtitle
                }
              />
            </Link>

            {/* Cotton */}

            <CategoryTile
              category={categories[1]}
              scrollTop={scrollTop}
            />

            {/* Bandhani */}

            <CategoryTile
              category={categories[2]}
              scrollTop={scrollTop}
            />

            {/* Festive */}

            <Link
              to="/Categories/Festive Edit"
              onClick={scrollTop}
              className="
                group
                relative
                min-h-[230px]
                overflow-hidden
                sm:col-span-2
              "
            >
              <img
                src={categories[3].image}
                alt={categories[3].name}
                className="
                  absolute
                  inset-0
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-[1400ms]
                  group-hover:scale-[1.06]
                "
              />

              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-[#7d2c24]/80
                  via-[#7d2c24]/10
                  to-transparent
                "
              />

              <CategoryText
                title={
                  categories[3].name
                }
                subtitle={
                  categories[3].subtitle
                }
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          COLOR STORIES
          Placed between Find Your Weave and New Arrivals.
      ========================================================= */}

      <ColorStories
        products={products}
        url={url}
      />

      {/* =========================================================
          PREMIUM SAREES — COMPACT HOME EDIT
      ========================================================= */}

      {premiumSarees.length > 0 && (
        <section
          className="
            relative overflow-hidden
            border-b border-[#741522]/10
            bg-[#3f1616]
            py-10 sm:py-12
          "
        >
          <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles size={12} className="text-[#E7C979]" />
                  <span className="text-[7px] uppercase tracking-[0.34em] text-[#d8c2a7] sm:text-[8px]">
                    THE DARSH SIGNATURE EDIT
                  </span>
                </div>
                <h2 className="font-serif text-[30px] leading-none text-[#fff8ed] sm:text-[38px]">
                  Premium Sarees
                </h2>
                <p className="mt-2 max-w-[520px] text-[10px] leading-5 text-[#dccdc0] sm:text-[11px]">
                  A refined edit of exceptional silks, heirloom weaves and statement drapes.
                </p>
              </div>

              <Link
                to="/premium-sarees"
                onClick={scrollTop}
                className="group inline-flex w-fit shrink-0 items-center gap-2 border border-[#d4ad54]/55 px-5 py-2.5 text-[7px] uppercase tracking-[0.24em] text-[#f4d98a] transition-all duration-300 hover:bg-[#d4ad54] hover:text-[#3f1616] sm:px-6"
              >
                Explore premium
                <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-4">
              {premiumSarees.map((product, index) => {
                const id = product?._id || product?.id;
                const image = product?.images?.[0]
                  ? `${url}/img/${product.images[0]}`
                  : product?.image || "/IMG/saree.png";
                const name = product?.productName || product?.name || "Premium Saree";
                const price = Number(product?.price || 0);

                return (
                  <Link
                    key={id || index}
                    to={`/productDetails/${id}`}
                    onClick={scrollTop}
                    className="group relative overflow-hidden border border-white/10 bg-[#4a1c1e]"
                  >
                    <div className="relative aspect-[0.82] overflow-hidden">
                      <DarshWishlistButton product={product} />
                      <img
                        src={image}
                        alt={`${name} - Darsh Premium Saree`}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.05]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#210b0d]/90 via-transparent to-transparent" />
                      <span className="absolute flex flex-nowrap gap-1 left-2 top-2 border border-[#f1d78c]/45 bg-[#3f1616]/75 px-2 py-1 text-[6px] uppercase tracking-[0.18em] text-[#f5d98a] backdrop-blur-sm">
                        <Crown size={10} /> PREMIUM
                      </span>
                      <div className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                        <h3 className="truncate font-serif text-[15px] text-white sm:text-[18px]">{name}</h3>
                        <p className="mt-1 text-[8px] tracking-[0.12em] text-[#eadaca]">
                          ₹{price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="pointer-events-none absolute -right-24 top-0 h-48 w-48 rounded-full bg-[#d4ad54]/10 blur-3xl" />
        </section>
      )}

      {/* =========================================================
          NEW ARRIVALS
      ========================================================= */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#741522]/10
          bg-[#f8f4eb]
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            w-full
            max-w-[1240px]
            px-4
            sm:px-6
            lg:px-8
          "
        >

          {/* Header */}

          <div
            className="
              mb-8
              flex
              flex-col
              gap-6
              sm:mb-10
              sm:flex-row
              sm:items-end
              sm:justify-between
              lg:mb-12
            "
          >
            <div
              className="
                max-w-[620px]
              "
            >

              <p
                className="
                  mb-3
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.35em]
                  text-[#977e73]
                  sm:text-[9px]
                "
              >
                JUST OFF THE LOOM
              </p>

              <h2
                className="
                  font-serif
                  text-[38px]
                  font-normal
                  leading-[0.95]
                  tracking-[-0.02em]
                  text-[#3f1616]
                  sm:text-[48px]
                  lg:text-[54px]
                "
              >
                New arrivals
              </h2>

              <p
                className="
                  mt-5
                  max-w-[500px]
                  text-[12px]
                  leading-6
                  text-[#806c63]
                  sm:text-[13px]
                "
              >
                Fresh weaves added this week —
                each one a single piece,
                never repeated.
              </p>
            </div>

            {/* Desktop arrows */}

            <div
              className="
                hidden
                items-center
                gap-2
                sm:flex
              "
            >
              <button
                type="button"
                onClick={previousNew}
                onMouseEnter={() =>
                  setIsNewArrivalPaused(true)
                }
                onMouseLeave={() =>
                  setIsNewArrivalPaused(false)
                }
                aria-label="Previous new arrivals"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-[#741522]/20
                  text-[#741522]
                  transition-all
                  duration-300
                  hover:bg-[#741522]
                  hover:text-[#f8f4eb]
                "
              >
                <ChevronLeft
                  size={17}
                  strokeWidth={1.2}
                />
              </button>

              <button
                type="button"
                onClick={nextNew}
                onMouseEnter={() =>
                  setIsNewArrivalPaused(true)
                }
                onMouseLeave={() =>
                  setIsNewArrivalPaused(false)
                }
                aria-label="Next new arrivals"
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  border
                  border-[#741522]/20
                  text-[#741522]
                  transition-all
                  duration-300
                  hover:bg-[#741522]
                  hover:text-[#f8f4eb]
                "
              >
                <ChevronRight
                  size={17}
                  strokeWidth={1.2}
                />
              </button>
            </div>
          </div>

          {/* Desktop */}

          <div
            className="hidden sm:block"
            onMouseEnter={() =>
              setIsNewArrivalPaused(true)
            }
            onMouseLeave={() =>
              setIsNewArrivalPaused(false)
            }
          >
            <div
              className="
                grid
                grid-cols-2
                gap-5
                lg:grid-cols-3
                lg:gap-6
              "
            >
              {newArrivals
                .slice(
                  newIndex,
                  newIndex + 3
                )
                .map(
                  (
                    product,
                    index
                  ) => (
                    <LuxuryProductCard
                      key={
                        product?._id ||
                        product?.id
                      }
                      product={product}
                      url={url}
                      index={index}
                    />
                  )
                )}
            </div>
          </div>

          {/* Mobile */}

          <div
            className="
              -mx-4
              block
              sm:hidden
              pl-4
            "
          >
            <div
              ref={mobileRailRef}
              onTouchStart={() =>
                setIsNewArrivalPaused(true)
              }
              onTouchEnd={() => {
                setTimeout(() => {
                  setIsNewArrivalPaused(
                    false
                  );
                }, 1200);
              }}
              className="
                new-arrivals-mobile
                flex
                snap-x
                snap-mandatory
                gap-4
                overflow-x-auto
                overscroll-x-contain
                overscroll-y-auto
                px-4
                pb-4
                touch-auto
              "
            >
              {newArrivals.map(
                (
                  product,
                  index
                ) => (
                  <div
                    key={
                      product?._id ||
                      product?.id
                    }
                    data-new-arrival-card
                    className="
                      w-[82vw]
                      max-w-[340px]
                      flex-none
                      snap-start
                    "
                  >
                    <LuxuryProductCard
                      product={product}
                      url={url}
                      index={index}
                    />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Mobile helper */}

          <div
            className="
              mt-5
              flex
              flex-col
              items-center
              gap-3
              sm:hidden
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  h-px
                  w-7
                  bg-[#741522]/30
                "
              />

              <span
                className="
                  text-[7px]
                  uppercase
                  tracking-[0.28em]
                  text-[#977e73]
                "
              >
                Swipe new arrivals
              </span>

              <ChevronRight
                size={13}
                strokeWidth={1.2}
                className="text-[#741522]"
              />
            </div>

            <button
              type="button"
              onClick={scrollMobileNext}
              aria-label="Next new arrival"
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#741522]/20
                text-[#741522]
                transition-all
                duration-300
                active:scale-90
              "
            >
              <ChevronRight
                size={15}
                strokeWidth={1.2}
              />
            </button>
          </div>

          {/* Desktop progress */}

          <div
            className="
              mt-9
              hidden
              items-center
              justify-center
              gap-2
              sm:flex
            "
          >
            {Array.from({
              length: Math.max(
                newArrivals.length - 2,
                1
              ),
            }).map(
              (_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to new arrivals ${
                    index + 1
                  }`}
                  onClick={() =>
                    setNewIndex(index)
                  }
                  className="
                    h-px
                    transition-all
                    duration-500
                  "
                  style={{
                    width:
                      index === newIndex
                        ? "36px"
                        : "16px",
                    background:
                      index === newIndex
                        ? "#741522"
                        : "rgba(116,21,34,0.20)",
                  }}
                />
              )
            )}
          </div>

          {/* =================================================
              VIEW ALL NEW ARRIVALS
          ================================================= */}

          <div
            className="
              mt-10
              flex
              justify-center
              sm:mt-12
            "
          >
            <Link
              to="/newarrivals"
              onClick={scrollTop}
              className="
                group
                inline-flex
                items-center
                gap-3
                border
                border-[#741522]/45
                bg-transparent
                px-7
                py-3.5
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-[#741522]
                transition-all
                duration-300
                hover:bg-[#741522]
                hover:text-[#f8f4eb]
                hover:shadow-lg
                active:scale-95
                sm:px-9
                sm:py-4
              "
            >
              <Sparkles
                size={14}
                strokeWidth={1.3}
                className="
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                "
              />

              <span>
                View all new arrivals
              </span>

              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>

        {/* Decorative light */}

        <div
          className="
            pointer-events-none
            absolute
            -right-32
            top-20
            hidden
            h-72
            w-72
            rounded-full
            bg-[#d4ad54]/[0.035]
            blur-3xl
            lg:block
          "
        />
      </section>

      {/* =========================================================
          HOT SALES
      ========================================================= */}

      {hotSales.length > 0 && (
        <section
          className="
            relative
            overflow-hidden
            border-b
            border-[#741522]/10
            bg-[#f3eadb]
            py-16
            sm:py-20
            lg:py-24
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1240px]
              px-4
              sm:px-6
              lg:px-8
            "
          >

            {/* Header */}

            <div
              className="
                mb-8
                flex
                flex-col
                gap-6
                sm:mb-10
                sm:flex-row
                sm:items-end
                sm:justify-between
                lg:mb-12
              "
            >
              <div
                className="
                  max-w-[620px]
                "
              >
                <div
                  className="
                    mb-4
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
                      border
                      border-[#d4ad54]/50
                      bg-[#f8f4eb]
                    "
                  >
                    <Flame
                      size={16}
                      strokeWidth={1.3}
                      className="
                        animate-pulse
                        text-[#741522]
                      "
                    />
                  </div>

                  <p
                    className="
                      text-[8px]
                      font-medium
                      uppercase
                      tracking-[0.35em]
                      text-[#977e73]
                      sm:text-[9px]
                    "
                  >
                    THE DARSH SALE EDIT
                  </p>
                </div>

                <h2
                  className="
                    font-serif
                    text-[38px]
                    font-normal
                    leading-[0.95]
                    tracking-[-0.02em]
                    text-[#3f1616]
                    sm:text-[48px]
                    lg:text-[54px]
                  "
                >
                  Hot sales
                </h2>

                <p
                  className="
                    mt-5
                    max-w-[500px]
                    text-[12px]
                    leading-6
                    text-[#806c63]
                    sm:text-[13px]
                  "
                >
                  Handpicked favourites at
                  special prices — discover
                  the pieces everyone is
                  reaching for.
                </p>
              </div>

              {/* Desktop arrows */}

              <div
                className="
                  hidden
                  items-center
                  gap-2
                  sm:flex
                "
              >
                <button
                  type="button"
                  onClick={previousHot}
                  onMouseEnter={() =>
                    setIsHotSalesPaused(true)
                  }
                  onMouseLeave={() =>
                    setIsHotSalesPaused(false)
                  }
                  aria-label="Previous hot sales"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-[#741522]/20
                    text-[#741522]
                    transition-all
                    duration-300
                    hover:bg-[#741522]
                    hover:text-[#f8f4eb]
                  "
                >
                  <ChevronLeft
                    size={17}
                    strokeWidth={1.2}
                  />
                </button>

                <button
                  type="button"
                  onClick={nextHot}
                  onMouseEnter={() =>
                    setIsHotSalesPaused(true)
                  }
                  onMouseLeave={() =>
                    setIsHotSalesPaused(false)
                  }
                  aria-label="Next hot sales"
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-[#741522]/20
                    text-[#741522]
                    transition-all
                    duration-300
                    hover:bg-[#741522]
                    hover:text-[#f8f4eb]
                  "
                >
                  <ChevronRight
                    size={17}
                    strokeWidth={1.2}
                  />
                </button>
              </div>
            </div>

            {/* Desktop products */}

            <div
              className="hidden sm:block"
              onMouseEnter={() =>
                setIsHotSalesPaused(true)
              }
              onMouseLeave={() =>
                setIsHotSalesPaused(false)
              }
            >
              <div
                className="
                  grid
                  grid-cols-2
                  gap-5
                  lg:grid-cols-3
                  lg:gap-6
                "
              >
                {hotSales
                  .slice(
                    hotIndex,
                    hotIndex + 3
                  )
                  .map(
                    (
                      product,
                      index
                    ) => (
                      <LuxuryProductCard
                        key={
                          product?._id ||
                          product?.id
                        }
                        product={{
                          ...product,
                          badge:
                            product?.badge ||
                            "HOT",
                        }}
                        url={url}
                        index={index}
                      />
                    )
                  )}
              </div>
            </div>

            {/* Mobile products */}

            <div
              className="
                -mx-4
                block
                min-w-0
                sm:hidden
                pl-4
              "
            >
              <div
                ref={hotMobileRailRef}
                onTouchStart={() =>
                  setIsHotSalesPaused(true)
                }
                onTouchEnd={() => {
                  setTimeout(() => {
                    setIsHotSalesPaused(
                      false
                    );
                  }, 1200);
                }}
                className="
                  hot-sales-mobile
                  flex
                  snap-x
                  snap-mandatory
                  gap-4
                  overflow-x-auto
                  overscroll-x-contain
                  overscroll-y-auto
                  px-4
                  pb-4
                  touch-auto
                "
              >
                {hotSales.map(
                  (
                    product,
                    index
                  ) => (
                    <div
                      key={
                        product?._id ||
                        product?.id
                      }
                      data-hot-sale-card
                      className="
                        w-[82vw]
                        max-w-[340px]
                        flex-none
                        snap-start
                      "
                    >
                      <LuxuryProductCard
                        product={{
                          ...product,
                          badge:
                            product?.badge ||
                            "HOT",
                        }}
                        url={url}
                        index={index}
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            {/* Mobile helper */}

            <div
              className="
                mt-5
                flex
                flex-col
                items-center
                gap-4
                sm:hidden
              "
            >
              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >
                <span
                  className="
                    h-px
                    w-7
                    bg-[#741522]/30
                  "
                />

                <span
                  className="
                    text-[7px]
                    uppercase
                    tracking-[0.28em]
                    text-[#977e73]
                  "
                >
                  Swipe hot picks
                </span>

                <ChevronRight
                  size={13}
                  strokeWidth={1.2}
                  className="text-[#741522]"
                />
              </div>

              <button
                type="button"
                onClick={
                  scrollHotMobileNext
                }
                aria-label="Next hot sale"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-[#741522]/20
                  text-[#741522]
                  transition-all
                  duration-300
                  active:scale-90
                "
              >
                <ChevronRight
                  size={15}
                  strokeWidth={1.2}
                />
              </button>
            </div>

            {/* Desktop progress */}

            <div
              className="
                mt-9
                hidden
                items-center
                justify-center
                gap-2
                sm:flex
              "
            >
              {Array.from({
                length: Math.max(
                  hotSales.length - 2,
                  1
                ),
              }).map(
                (_, index) => (
                  <button
                    key={index}
                    type="button"
                    aria-label={`Go to hot sales ${
                      index + 1
                    }`}
                    onClick={() =>
                      setHotIndex(index)
                    }
                    className="
                      h-px
                      transition-all
                      duration-500
                    "
                    style={{
                      width:
                        index === hotIndex
                          ? "36px"
                          : "16px",
                      background:
                        index === hotIndex
                          ? "#741522"
                          : "rgba(116,21,34,0.20)",
                    }}
                  />
                )
              )}
            </div>

            {/* =================================================
                VIEW ALL HOT SALES
            ================================================= */}

            <div
              className="
                mt-10
                flex
                justify-center
                sm:mt-12
              "
            >
              <Link
                to="/hotsales"
                onClick={scrollTop}
                className="
                  group
                  inline-flex
                  items-center
                  gap-3
                  border
                  border-[#741522]/45
                  bg-transparent
                  px-7
                  py-3.5
                  text-[8px]
                  uppercase
                  tracking-[0.28em]
                  text-[#741522]
                  transition-all
                  duration-300
                  hover:bg-[#741522]
                  hover:text-[#f8f4eb]
                  hover:shadow-lg
                  active:scale-95
                  sm:px-9
                  sm:py-4
                "
              >
                <Flame
                  size={14}
                  strokeWidth={1.3}
                  className="
                    transition-transform
                    duration-300
                    group-hover:scale-110
                  "
                />

                <span>
                  View all hot sales
                </span>

                <ArrowRight
                  size={14}
                  strokeWidth={1.2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </Link>
            </div>
          </div>

          {/* Decorative gold light */}

          <div
            className="
              pointer-events-none
              absolute
              -left-32
              bottom-10
              hidden
              h-72
              w-72
              rounded-full
              bg-[#d4ad54]/[0.04]
              blur-3xl
              lg:block
            "
          />
        </section>
      )}

      {/* =========================================================
          SAREES IN THE SHOP
      ========================================================= */}

      <section
        className="
          border-b
          border-[#741522]/10
          py-16
          sm:py-20
          lg:py-24
        "
      >
        <div
          className="
            mx-auto
            max-w-[1120px]
            px-5
            sm:px-8
            lg:px-0
          "
        >

          {/* Heading */}

          <div
            className="
              mb-10
              text-center
              sm:mb-12
            "
          >
            <p
              className="
                mb-4
                text-[8px]
                uppercase
                tracking-[0.4em]
                text-[#977e73]
              "
            >
              THE DARSH EDIT
            </p>

            <h2
              className="
                font-serif
                text-[36px]
                text-[#3f1616]
                sm:text-[48px]
              "
            >
              Sarees in the shop
            </h2>
          </div>

          {/* Product grid */}

          <div
            className="
              grid
              grid-cols-2
              gap-x-4
              gap-y-12
              sm:gap-x-6
              sm:gap-y-16
              md:grid-cols-3
            "
          >
            {products
              .slice(0, 6)
              .map(
                (
                  product,
                  index
                ) => (
                  <LuxuryProductCard
                    key={
                      product?._id ||
                      product?.id
                    }
                    product={product}
                    url={url}
                    index={index}
                  />
                )
              )}
          </div>

          {/* Shop all */}

          <div
            className="
              mt-14
              flex
              justify-center
              sm:mt-16
            "
          >
            <Link
              to="/allproducts"
              onClick={scrollTop}
              className="
                group
                inline-flex
                items-center
                gap-4
                border
                border-[#741522]/45
                px-8
                py-4
                text-[8px]
                uppercase
                tracking-[0.28em]
                text-[#741522]
                transition-all
                duration-300
                hover:bg-[#741522]
                hover:text-[#f8f4eb]
              "
            >
              Shop all sarees

              <ArrowRight
                size={14}
                strokeWidth={1.2}
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          REELS
      ========================================================= */}

      <section
        className="
          border-b
          border-[#741522]/10
        "
      >
        <Reels />
      </section>

      {/* =========================================================
          FESTIVE BANNER
      ========================================================= */}

      <FestiveBanner />

      {/* =========================================================
          ANIMATIONS
      ========================================================= */}

      <style>
        {`
          @keyframes productReveal {
            0% {
              opacity: 0;
              transform: translateY(25px);
            }

            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 639px) {
            .color-stories-mobile {
              scroll-snap-type: x mandatory;
            }

            .color-stories-mobile > * {
              scroll-snap-align: start;
            }
          }

          .new-arrivals-mobile::-webkit-scrollbar,
          .hot-sales-mobile::-webkit-scrollbar {
            display: none;
          }

          .new-arrivals-mobile,
          .hot-sales-mobile {
            overflow-y: visible;
          }

          .new-arrivals-mobile,
          .hot-sales-mobile {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
            overscroll-behavior-x: contain;
            overscroll-behavior-y: auto;
            touch-action: pan-x pan-y;
            -webkit-overflow-scrolling: touch;
          }

          /* Keep horizontal product rails independent without blocking
             normal vertical page scrolling on touch devices. */
          .new-arrivals-mobile,
          .hot-sales-mobile {
            max-width: 100%;
            min-width: 0;
          }

          @media (max-width: 639px) {
            .new-arrivals-mobile,
            .hot-sales-mobile {
              scroll-snap-type: x proximity;
            }

            .new-arrivals-mobile > *,
            .hot-sales-mobile > * {
              scroll-snap-align: start;
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
    </main>
  );
};

/* =========================================================
   CATEGORY TILE
========================================================= */

const CategoryTile = ({
  category,
  scrollTop,
}) => {
  return (
    <Link
      to={category.path}
      onClick={scrollTop}
      className="
        group
        relative
        min-h-[220px]
        overflow-hidden
      "
    >
      <img
        src={category.image}
        alt={category.name}
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          transition-transform
          duration-[1400ms]
          group-hover:scale-[1.07]
        "
      />

      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#65171b]/85
          via-[#65171b]/10
          to-transparent
        "
      />

      <CategoryText
        title={category.name}
        subtitle={category.subtitle}
      />
    </Link>
  );
};

/* =========================================================
   CATEGORY TEXT
========================================================= */

const CategoryText = ({
  title,
  subtitle,
}) => {
  return (
    <div
      className="
        absolute
        bottom-5
        left-5
        right-5
        text-[#f8f4eb]
      "
    >
      <div
        className="
          flex
          items-end
          justify-between
          gap-3
        "
      >
        <div>
          <h3
            className="
              font-serif
              text-[19px]
              leading-none
              sm:text-[21px]
            "
          >
            {title}
          </h3>

          <p
            className="
              mt-2
              text-[7px]
              tracking-[0.2em]
              text-[#e6d2ae]
            "
          >
            {subtitle}
          </p>
        </div>

        <ArrowRight
          size={18}
          strokeWidth={1}
          className="
            text-[#d5af55]
            transition-transform
            duration-300
            group-hover:translate-x-1
          "
        />
      </div>
    </div>
  );
};

export default Home;