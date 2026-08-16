import React, { useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronRight,
  Heart,
  Crown,
  Truck,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Gift,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

/* =========================================================
   SAREES BY COLOR PAGE
   Dynamic color collection + wishlist + premium product card
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

const getProductId = (product) =>
  product?._id || product?.id || product?.productId || null;

const getProductName = (product) =>
  product?.productName ||
  product?.name ||
  product?.title ||
  "Handwoven Saree";

const getProductColorText = (product) =>
  [
    product?.color,
    product?.colour,
    product?.productColor,
    product?.colors,
    product?.colours,
    product?.shade,
    product?.variant?.color,
    product?.variants?.[0]?.color,
  ]
    .flatMap((value) =>
      Array.isArray(value) ? value : value ? [value] : []
    )
    .join(" ")
    .toLowerCase()
    .trim();

const matchesColor = (product, colorKey) => {
  const text = getProductColorText(product);

  const aliases = {
    red: [
      "red",
     
    ],
    white: [
      "white",
     
    ],
    yellow: [
      "yellow",
      
    ],
    blue: [
      "blue",
      
    ],
  };

  return (
    aliases[colorKey]?.some((alias) =>
      text.includes(alias)
    ) || false
  );
};

const getProductImage = (product, url) => {
  const rawImage =
    product?.images?.[0] ||
    product?.image ||
    product?.img ||
    product?.thumbnail;

  if (!rawImage) return "/IMG/saree.png";

  const image = String(rawImage);

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (product?.images?.[0] && url) {
    return `${url}/img/${image}`;
  }

  return image;
};

const getOldPrice = (product) =>
  Number(
    product?.oldPrice ??
      product?.oldprice ??
      product?.originalPrice ??
      product?.mrp ??
      0
  );

const isPremiumProduct = (product) => {
  const price = Number(product?.price || 0);

  const name = String(
    product?.productName ||
      product?.name ||
      product?.title ||
      ""
  ).toLowerCase();

  const category = String(
    product?.category ||
      product?.subCategory ||
      product?.fabric ||
      ""
  ).toLowerCase();

  return (
    price >= 5000 ||
    name.includes("premium") ||
    name.includes("kanjivaram") ||
    name.includes("kanchipuram") ||
    name.includes("banarasi") ||
    name.includes("muga") ||
    name.includes("tussar") ||
    name.includes("gadwal") ||
    category.includes("premium")
  );
};

const readWishlist = () => {
  try {
    const parsed = JSON.parse(
      localStorage.getItem("wishlist") || "[]"
    );

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const normalizeWishlistItem = (product) => {
  const id = getProductId(product);

  return {
    ...product,
    id,
    _id: product?._id || id,
    productName: getProductName(product),
    name: getProductName(product),
    image:
      product?.image ||
      product?.images?.[0] ||
      product?.img ||
      "/IMG/saree.png",
    price: Number(product?.price || 0),
    oldPrice: getOldPrice(product),
  };
};

/* =========================================================
   PRODUCT CARD
   Wishlist is intentionally self-contained.
   It uses the same localStorage + window event pattern
   so the card does not depend on wishlist props.
========================================================= */

const ProductCard = ({ product, url, index = 0 }) => {
  const productId = getProductId(product);

  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    if (!productId) {
      setIsWishlisted(false);
      return undefined;
    }

    const syncWishlist = () => {
      const saved = readWishlist();

      setIsWishlisted(
        saved.some(
          (item) =>
            String(getProductId(item)) ===
            String(productId)
        )
      );
    };

    syncWishlist();

    window.addEventListener(
      "darsh-wishlist-updated",
      syncWishlist
    );

    return () => {
      window.removeEventListener(
        "darsh-wishlist-updated",
        syncWishlist
      );
    };
  }, [productId]);

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) return;

    try {
      const current = readWishlist();

      const exists = current.some(
        (item) =>
          String(getProductId(item)) ===
          String(productId)
      );

      const updated = exists
        ? current.filter(
            (item) =>
              String(getProductId(item)) !==
              String(productId)
          )
        : [
            ...current,
            normalizeWishlistItem(product),
          ];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      setIsWishlisted(!exists);

      window.dispatchEvent(
        new Event("darsh-wishlist-updated")
      );
    } catch (error) {
      console.error(
        "Wishlist update failed:",
        error
      );
    }
  };

  if (!product) return null;

  const name = getProductName(product);
  const image = getProductImage(product, url);
  const price = Number(product?.price || 0);
  const oldPrice = getOldPrice(product);

  const premium = isPremiumProduct(product);

  const rating = Number(product?.rating || 0);
  const reviews = Number(product?.reviews || 0);

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : Number(product?.discount || 0);

  const isNew =
    Boolean(product?.isNew) ||
    Boolean(product?.newArrival) ||
    String(product?.tag || "").toLowerCase() ===
      "new";

  const productLink = productId
    ? `/productDetails/${productId}`
    : "/allproducts";

  const goTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 18,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.42,
        delay: Math.min(index * 0.035, 0.2),
      }}
      whileHover={{
        y: -4,
      }}
      className="group relative w-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#eee5d5]">
        <Link
          to={productLink}
          onClick={goTop}
          className="relative block aspect-[0.78] overflow-hidden"
        >
          <img
            src={image}
            alt={`${name} - Darsh`}
            className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
            loading="lazy"
            onError={(event) => {
              event.currentTarget.src =
                "/IMG/saree.png";
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#4c1117]/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Top badges */}
          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
            {isNew && (
              <span className="bg-[#d4ad54] px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.16em] text-[#4a211f]">
                New
              </span>
            )}

           
          </div>

          {/* Wishlist */}
          <motion.button
            type="button"
            onClick={toggleWishlist}
            whileTap={{ scale: 0.84 }}
            whileHover={{ scale: 1.05 }}
            aria-label={
              isWishlisted
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
            aria-pressed={isWishlisted}
            className={`absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border shadow-[0_6px_20px_rgba(63,22,22,.14)] backdrop-blur-md transition-all duration-300 ${
              isWishlisted
                ? "border-[#741522] bg-[#741522] text-white"
                : "border-white/70 bg-[#fffdf8]/95 text-[#741522] hover:bg-white"
            }`}
          >
            <motion.span
              animate={
                isWishlisted
                  ? {
                      scale: [1, 1.24, 1],
                      rotate: [0, -8, 8, 0],
                    }
                  : {
                      scale: 1,
                    }
              }
              transition={{
                duration: 0.35,
              }}
            >
              <Heart
                size={16}
                strokeWidth={1.5}
                fill={
                  isWishlisted
                    ? "currentColor"
                    : "none"
                }
              />
            </motion.span>
          </motion.button>

       

          {/* Premium */}
          {premium && (
            <span className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#d4ad54]/45 bg-[#fffdf8]/95 px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#741522] shadow-sm backdrop-blur-md">
              <Crown
                size={9}
                className="text-[#c9a24a]"
              />
              Premium
            </span>
          )}

          {/* Desktop hover CTA */}
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-3 justify-center p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
            <span className="inline-flex items-center gap-2 bg-[#f8f4eb]/95 px-4 py-2.5 text-[7px] uppercase tracking-[0.18em] text-[#741522] shadow-md">
              View Saree
              <ArrowUpRight size={13} />
            </span>
          </div>
        </Link>
      </div>

      {/* Details */}
      <div className="pt-3.5">
        <div className="flex items-start justify-between gap-2">
          <Link
            to={productLink}
            onClick={goTop}
            className="min-w-0"
          >
            <h3 className="line-clamp-2 font-serif text-[16px] leading-[1.2] text-[#3f1616] transition-colors duration-300 group-hover:text-[#741522] sm:text-[18px]">
              {name}
            </h3>
          </Link>

          <div className="shrink-0 text-right">
            <div className="whitespace-nowrap text-[11px] font-medium text-[#3d1714] sm:text-[12px]">
              ₹{price.toLocaleString("en-IN")}
            </div>

            {oldPrice > price && (
              <div className="mt-0.5 whitespace-nowrap text-[8px] text-[#9c8980] line-through">
                ₹{oldPrice.toLocaleString(
                  "en-IN"
                )}
              </div>
            )}
          </div>
        </div>

        <p className="mt-1.5 truncate text-[7px] uppercase tracking-[0.16em] text-[#977e73]">
          {product?.fabric ||
            product?.category ||
            product?.subCategory ||
            "HANDWOVEN · DARSH"}
        </p>

        {rating > 0 && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className="text-[9px] tracking-[1px] text-[#b58b32]">
              {"★".repeat(
                Math.min(5, Math.floor(rating))
              )}
              {"☆".repeat(
                Math.max(
                  0,
                  5 - Math.floor(rating)
                )
              )}
            </span>

            {reviews > 0 && (
              <span className="text-[8px] text-[#9c8980]">
                ({reviews})
              </span>
            )}
          </div>
        )}

        <div className="mt-2.5 flex items-center gap-1.5 text-[6px] uppercase tracking-[0.1em] text-[#977e73]">
          <Check
            size={10}
            className="text-[#741522]"
          />
          {premium
            ? "Premium edit • Free shipping"
            : "Free shipping • Secure checkout"}
        </div>

        {/* Mobile CTA */}
        <Link
          to={productLink}
          onClick={goTop}
          className="mt-3 inline-flex items-center gap-1.5 text-[7px] uppercase tracking-[0.18em] text-[#741522] sm:hidden"
        >
          View piece
          <ArrowUpRight size={11} />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d4ad54] transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
};

const SareesByColor = () => {
  const { allProduct = [], url } =
    useAppContext();

  const [searchParams, setSearchParams] =
    useSearchParams();

  const initial = searchParams.get("color");

  const [selectedColor, setSelectedColor] =
    useState(
      COLOR_STORIES.some(
        (item) => item.key === initial
      )
        ? initial
        : "red"
    );

  const [premiumOnly, setPremiumOnly] =
    useState(false);

  const [wishlistCount, setWishlistCount] =
    useState(() => readWishlist().length);

  const products = useMemo(
    () =>
      Array.isArray(allProduct)
        ? allProduct
        : [],
    [allProduct]
  );

  const activeColor =
    COLOR_STORIES.find(
      (item) => item.key === selectedColor
    ) || COLOR_STORIES[0];

  const colorProducts = useMemo(
    () =>
      products.filter((product) =>
        matchesColor(
          product,
          selectedColor
        )
      ),
    [products, selectedColor]
  );

  const filteredProducts = useMemo(
    () =>
      colorProducts.filter(
        (product) =>
          !premiumOnly ||
          isPremiumProduct(product)
      ),
    [colorProducts, premiumOnly]
  );

  const premiumCount = useMemo(
    () =>
      colorProducts.filter(
        isPremiumProduct
      ).length,
    [colorProducts]
  );

  useEffect(() => {
    const syncWishlist = () => {
      setWishlistCount(
        readWishlist().length
      );
    };

    syncWishlist();

    window.addEventListener(
      "darsh-wishlist-updated",
      syncWishlist
    );

    return () => {
      window.removeEventListener(
        "darsh-wishlist-updated",
        syncWishlist
      );
    };
  }, []);

  const changeColor = (key) => {
    setSelectedColor(key);
    setPremiumOnly(false);

    setSearchParams({
      color: key,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f4eb] text-[#3f1616]">
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#3f1616] px-5 pb-14 pt-20 text-[#f8f4eb] sm:px-8 sm:pb-18 sm:pt-24">
        <div className="mx-auto max-w-[1120px]">
          <div className="flex items-center justify-between gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[7px] uppercase tracking-[0.25em] text-[#e6d2ae] transition-opacity hover:opacity-70"
            >
              <ChevronRight
                size={12}
                className="rotate-180"
              />
              Back to home
            </Link>

            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-3 py-2 text-[7px] uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#741522]"
            >
              <Heart size={12} />
              Wishlist

              {wishlistCount > 0 && (
                <span className="rounded-full bg-[#f4d98a] px-1.5 py-0.5 text-[6px] font-bold text-[#3f1616]">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </div>

          <p className="mb-4 mt-9 text-[8px] uppercase tracking-[0.38em] text-[#d4ad54]">
            THE DARSH COLOR EDIT
          </p>

          <h1 className="max-w-[700px] font-serif text-[42px] font-normal leading-[0.94] sm:text-[62px]">
            Sarees by color
          </h1>

          <p className="mt-5 max-w-[560px] text-[12px] leading-6 text-[#e6d2ae]/80 sm:text-[13px]">
            Explore Darsh sarees through four
            signature shades, curated to make
            finding your perfect drape feel
            effortless.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-2 text-[6px] uppercase tracking-[0.14em] text-white/70">
              <Truck size={10} />
              Free shipping
            </span>

            <span className="inline-flex items-center gap-1.5 border border-white/10 bg-white/5 px-3 py-2 text-[6px] uppercase tracking-[0.14em] text-white/70">
              <ShieldCheck size={10} />
              Secure checkout
            </span>
          </div>
        </div>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#d4ad54]/15" />
        <div className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-64 rounded-full border border-white/5" />
      </section>

      {/* =====================================================
          COLOR NAVIGATION
      ===================================================== */}
      <section className="sticky top-0 z-30 border-b border-[#741522]/10 bg-[#f8f4eb]/95 px-4 py-3 backdrop-blur-md sm:px-8">
        <div className="mx-auto max-w-[1120px]">
          <div className="grid grid-cols-4 gap-2 sm:gap-3">
            {COLOR_STORIES.map(
              (color) => {
                const active =
                  selectedColor ===
                  color.key;

                return (
                  <button
                    key={color.key}
                    type="button"
                    onClick={() =>
                      changeColor(
                        color.key
                      )
                    }
                    className={`relative overflow-hidden px-1.5 py-3 text-center transition-all duration-300 sm:px-4 sm:py-3.5 ${
                      active
                        ? "bg-[#741522] text-[#f8f4eb] shadow-sm"
                        : "bg-[#f3eadb] text-[#3f1616] hover:bg-[#eee2d0]"
                    }`}
                  >
                    <span className="mx-auto mb-1.5 flex justify-center gap-1">
                      {color.swatches.map(
                        (
                          swatch,
                          index
                        ) => (
                          <span
                            key={index}
                            className="h-2.5 w-2.5 rounded-full border border-black/10"
                            style={{
                              backgroundColor:
                                swatch,
                            }}
                          />
                        )
                      )}
                    </span>

                    <span className="font-serif text-[14px] sm:text-[19px]">
                      {color.label}
                    </span>

                    <span
                      className={`mt-0.5 block truncate text-[5px] uppercase tracking-[0.1em] ${
                        active
                          ? "text-white/55"
                          : "text-[#977e73]"
                      }`}
                    >
                      {color.subtitle}
                    </span>

                    {active && (
                      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[#d4ad54]" />
                    )}
                  </button>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          COLLECTION
      ===================================================== */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1120px] px-5 sm:px-8 lg:px-0">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[7px] uppercase tracking-[0.3em] text-[#977e73]">
                CURATED SHADE
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2.5">
                <h2 className="font-serif text-[31px] leading-none text-[#3f1616] sm:text-[42px]">
                  {activeColor.label}
                </h2>

                <span className="rounded-full border border-[#741522]/10 bg-[#f3eadb] px-2.5 py-1 text-[6px] uppercase tracking-[0.12em] text-[#741522]">
                  {activeColor.subtitle}
                </span>
              </div>

              <p className="mt-2 text-[10px] text-[#806c63] sm:text-[11px]">
                {filteredProducts.length}{" "}
                pieces available
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {premiumCount > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    setPremiumOnly(
                      (value) => !value
                    )
                  }
                  className={`inline-flex items-center gap-1.5 border px-3 py-2 text-[7px] uppercase tracking-[0.12em] transition ${
                    premiumOnly
                      ? "border-[#741522] bg-[#741522] text-white"
                      : "border-[#741522]/15 bg-[#f3eadb] text-[#741522] hover:border-[#741522]/30"
                  }`}
                >
                  <Crown size={11} />
                  {premiumOnly
                    ? "All pieces"
                    : `Premium · ${premiumCount}`}
                </button>
              )}

              <span className="inline-flex items-center gap-1.5 text-[7px] uppercase tracking-[0.2em] text-[#977e73]">
                <Sparkles
                  size={11}
                  className="text-[#c9a24a]"
                />
                Darsh edit
              </span>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <motion.div
              key={`${selectedColor}-${premiumOnly}`}
              initial={{
                opacity: 0,
                y: 12,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.35,
              }}
              className="grid grid-cols-2 gap-x-3 gap-y-10 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6"
            >
              {filteredProducts.map(
                (product, index) => (
                  <ProductCard
                    key={
                      getProductId(
                        product
                      ) ||
                      `color-product-${index}`
                    }
                    product={product}
                    url={url}
                    index={index}
                  />
                )
              )}
            </motion.div>
          ) : (
            <div className="flex min-h-[300px] items-center justify-center border border-dashed border-[#741522]/15 bg-[#f3eadb] px-6 text-center">
              <div>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#741522]/15 text-[#741522]">
                  <Check
                    size={18}
                    strokeWidth={1.2}
                  />
                </div>

                <h3 className="mt-5 font-serif text-[25px] text-[#3f1616]">
                  {premiumOnly
                    ? `More premium ${activeColor.label.toLowerCase()} pieces are coming`
                    : `More ${activeColor.label.toLowerCase()} sarees are coming`}
                </h3>

                <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-[#977e73]">
                  New Darsh pieces are added
                  regularly
                </p>

                {premiumOnly && (
                  <button
                    type="button"
                    onClick={() =>
                      setPremiumOnly(false)
                    }
                    className="mt-5 bg-[#741522] px-5 py-2.5 text-[7px] uppercase tracking-[0.15em] text-white"
                  >
                    Show all {activeColor.label.toLowerCase()}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* =================================================
              PREMIUM FEATURE STRIP
          ================================================= */}
          {premiumCount > 0 && (
            <section className="relative mt-14 overflow-hidden bg-[#3f1616] px-5 py-7 text-white sm:px-8 sm:py-9">
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full border border-[#d4ad54]/20" />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="max-w-xl">
                  <div className="flex items-center gap-2">
                    <Crown
                      size={15}
                      className="text-[#f4d98a]"
                    />
                    <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#f4d98a]">
                      PREMIUM COLOR EDIT
                    </p>
                  </div>

                  <h3 className="mt-2 font-serif text-[25px] sm:text-[31px]">
                    {activeColor.label} in a more
                    luxurious mood.
                  </h3>

                  <p className="mt-2 text-[9px] leading-5 text-white/60">
                    Explore the premium pieces
                    available in this shade and
                    save your favourites with the
                    heart icon.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setPremiumOnly(true)
                  }
                  className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#f4d98a] px-5 py-3 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#3f1616] transition hover:bg-white"
                >
                  View premium
                  <ArrowUpRight size={12} />
                </button>
              </div>
            </section>
          )}

          {/* =================================================
              SHOPPING PROMISE
          ================================================= */}
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
            {[
              [
                Truck,
                "Free shipping",
                "Every product",
              ],
              [
                ShieldCheck,
                "Secure checkout",
                "Protected ordering",
              ],
              [
                Gift,
                "Gift ready",
                "Beautifully packed",
              ],
            ].map(
              ([Icon, title, text]) => (
                <div
                  key={title}
                  className="flex min-h-[82px] items-center gap-3 border border-[#741522]/10 bg-[#fffdf8] px-3.5 py-3.5"
                >
                  <Icon
                    className="h-5 w-5 shrink-0 text-[#741522]"
                    strokeWidth={1.25}
                  />

                  <div>
                    <p className="text-[7px] font-semibold uppercase tracking-[0.12em]">
                      {title}
                    </p>
                    <p className="mt-1 text-[8px] text-[#977e73]">
                      {text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/wishlist"
              className="inline-flex w-full items-center justify-center gap-2 border border-[#741522]/25 px-6 py-3 text-[7px] uppercase tracking-[0.2em] text-[#741522] transition hover:bg-[#741522] hover:text-white sm:w-auto"
            >
              <Heart size={12} />
              Open wishlist
              {wishlistCount > 0 &&
                ` · ${wishlistCount}`}
            </Link>

            <Link
              to="/allproducts"
              className="inline-flex w-full items-center justify-center gap-2 bg-[#741522] px-6 py-3 text-[7px] uppercase tracking-[0.2em] text-white transition hover:bg-[#5d0f18] sm:w-auto"
            >
              Explore all products
              <ArrowUpRight size={12} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SareesByColor;