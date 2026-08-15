import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Award,
  Eye,
  Heart,
  Flame,
  Shield,
  Sparkles,
  Star,
  Timer,
  Truck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppContext } from "../context/AppContext.jsx";


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
              "/IMG/saree.png",
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

const HotSalesPage = () => {
  const { allProduct, url } = useAppContext();

  /* =========================================================
     HOT SALES
  ========================================================= */

  const hotSales = useMemo(() => {
    if (!allProduct?.length) return [];

    return allProduct.filter(
      (product) =>
        product?.hotSell === true ||
        product?.hotSell === "true" ||
        product?.hotSell === 1
    );
  }, [allProduct]);

  /* =========================================================
     DEAL OF THE DAY
  ========================================================= */

  const dealOfTheDay = useMemo(() => {
    if (!hotSales.length) return null;

    let bestProduct = null;
    let bestDiscount = 0;

    hotSales.forEach((product) => {
      const originalPrice =
        Number(product?.originalPrice) || 0;

      const price =
        Number(product?.price) || 0;

      if (
        originalPrice > price &&
        price > 0
      ) {
        const discount = Math.round(
          ((originalPrice - price) /
            originalPrice) *
            100
        );

        if (discount > bestDiscount) {
          bestDiscount = discount;

          bestProduct = {
            ...product,
            discount,
          };
        }
      }
    });

    return bestProduct;
  }, [hotSales]);

  /* =========================================================
     REMAINING PRODUCTS
  ========================================================= */

  const remainingProducts = useMemo(() => {
    return hotSales.filter(
      (product) =>
        product?._id !==
        dealOfTheDay?._id
    );
  }, [hotSales, dealOfTheDay]);

  /* =========================================================
     SCROLL TOP
  ========================================================= */

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  /* =========================================================
     IMAGE
  ========================================================= */

  const getImage = (product) => {
    if (product?.images?.[0]) {
      return `${url}/img/${product.images[0]}`;
    }

    return (
      product?.image ||
      "https://placehold.co/600x750?text=Darsh"
    );
  };

  /* =========================================================
     OLD PRICE
  ========================================================= */

  const getOldPrice = (product) => {
    return (
      product?.originalPrice ||
      product?.oldPrice ||
      product?.oldprice ||
      null
    );
  };

  /* =========================================================
     DISCOUNT
  ========================================================= */

  const getDiscount = (product) => {
    const price =
      Number(product?.price) || 0;

    const oldPrice =
      Number(getOldPrice(product)) || 0;

    if (
      !oldPrice ||
      oldPrice <= price
    ) {
      return null;
    }

    return Math.round(
      ((oldPrice - price) /
        oldPrice) *
        100
    );
  };

  return (
    <main className="min-h-screen bg-[#f8f4eb] text-[#3f1616] overflow-hidden">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden bg-[#f3eadb] border-b border-[#741522]/10">

        <div className="absolute -left-32 -top-20 w-72 h-72 rounded-full bg-[#d4ad54]/10 blur-3xl" />

        <div className="absolute -right-32 -bottom-24 w-80 h-80 rounded-full bg-[#741522]/5 blur-3xl" />

        <div className="absolute inset-0 pointer-events-none">

          <Sparkles
            size={22}
            className="absolute left-[12%] top-[30%] text-[#b88b34]/40 animate-pulse"
          />

          <Sparkles
            size={16}
            className="absolute right-[15%] top-[24%] text-[#741522]/30 animate-pulse"
          />

          <Sparkles
            size={18}
            className="absolute left-[22%] bottom-[20%] text-[#b88b34]/30 animate-pulse"
          />
        </div>

        <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-0 py-16 sm:py-20 lg:py-24">

          {/* Breadcrumb */}

          <div className="flex items-center justify-center gap-2 mb-9 text-[7px] sm:text-[8px] uppercase tracking-[0.28em] text-[#977e73]">

            <Link
              to="/"
              onClick={scrollTop}
              className="hover:text-[#741522] transition-colors"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-[#741522]">
              Hot Sales
            </span>
          </div>

          {/* Label */}

          <div className="flex items-center justify-center gap-3 mb-5">

            <span className="w-8 sm:w-12 h-px bg-[#d4ad54]" />

            <div className="flex items-center gap-2 text-[8px] sm:text-[9px] uppercase tracking-[0.35em] text-[#977e73]">

              <Flame
                size={13}
                className="text-[#741522] animate-pulse"
              />

              THE DARSH SALE EDIT
            </div>

            <span className="w-8 sm:w-12 h-px bg-[#d4ad54]" />

          </div>

          {/* Heading */}

          <h1 className="text-center font-serif text-[46px] sm:text-[60px] lg:text-[72px] leading-none text-[#3f1616]">
            Hot Sales
          </h1>

          {/* Ornament */}

          <div className="flex items-center justify-center gap-3 mt-6">

            <span className="w-10 h-px bg-[#d4ad54]/60" />

            <Flame
              size={17}
              className="text-[#b88b34] animate-pulse"
            />

            <span className="w-10 h-px bg-[#d4ad54]/60" />

          </div>

          <p className="max-w-[600px] mx-auto mt-6 text-center text-[12px] sm:text-[13px] leading-6 sm:leading-7 text-[#806c63]">
            Discover our most-loved sarees at
            exceptional prices. Handpicked
            treasures, limited opportunities,
            timeless elegance.
          </p>

          {/* Features */}

          <div className="mt-9 flex flex-wrap justify-center gap-x-7 gap-y-3">

            <div className="flex items-center gap-2 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-[#741522]">
              <Zap
                size={12}
                className="text-[#b88b34]"
              />
              Limited Offers
            </div>

            <div className="flex items-center gap-2 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-[#741522]">
              <Star
                size={12}
                className="text-[#b88b34]"
              />
              Premium Weaves
            </div>

            <div className="flex items-center gap-2 text-[7px] sm:text-[8px] uppercase tracking-[0.2em] text-[#741522]">
              <Timer
                size={12}
                className="text-[#b88b34]"
              />
              While Stocks Last
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          DEAL OF THE DAY
      ===================================================== */}

      {dealOfTheDay && (
        <section className="bg-[#f8f4eb] px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">

          <div className="max-w-[1100px] mx-auto">

            <div className="flex items-center justify-center gap-3 mb-8">

              <span className="w-8 sm:w-12 h-px bg-[#d4ad54]" />

              <span className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] text-[#977e73]">

                <Sparkles
                  size={13}
                  className="text-[#b88b34]"
                />

                DEAL OF THE DAY
              </span>

              <span className="w-8 sm:w-12 h-px bg-[#d4ad54]" />

            </div>

            <div className="grid md:grid-cols-2 border border-[#d4ad54]/30 bg-[#f3eadb] overflow-hidden">

              {/* Image */}

              <div className="relative min-h-[400px] sm:min-h-[500px] md:min-h-[560px] overflow-hidden">

                <DarshWishlistButton product={dealOfTheDay} />

                <Link
                  to={`/productDetails/${dealOfTheDay._id}`}
                  onClick={scrollTop}
                >
                  <img
                    src={getImage(dealOfTheDay)}
                    alt={dealOfTheDay.productName}
                    className="w-full h-full min-h-[400px] sm:min-h-[500px] md:min-h-[560px] object-cover transition-transform duration-[1200ms] hover:scale-105"
                  />
                </Link>

                {/* HOT */}

                <div className="absolute left-4 top-4 sm:left-6 sm:top-6 flex items-center gap-2 bg-[#741522] px-4 py-2 text-[8px] uppercase tracking-[0.2em] text-[#f8f4eb]">
                  <Flame size={13} />
                  HOT PICK
                </div>

                {/* Discount */}

                <div className="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#d4ad54] text-[#4a1815] flex flex-col items-center justify-center shadow-xl">

                  <span className="text-[17px] font-medium">
                    {dealOfTheDay.discount}%
                  </span>

                  <span className="text-[6px] uppercase tracking-[0.15em]">
                    OFF
                  </span>

                </div>
              </div>

              {/* Content */}

              <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-10 sm:py-12">

                <p className="text-[8px] uppercase tracking-[0.3em] text-[#977e73]">
                  EDITOR'S PICK
                </p>

                <h2 className="mt-4 font-serif text-[32px] sm:text-[42px] leading-tight text-[#3f1616]">
                  {dealOfTheDay.productName}
                </h2>

                <p className="mt-4 text-[8px] uppercase tracking-[0.22em] text-[#977e73]">
                  {dealOfTheDay.fabric ||
                    dealOfTheDay.category ||
                    "HANDWOVEN · DARSH"}
                </p>

                <div className="my-7 h-px bg-[#741522]/10" />

                {/* Price */}

                <div className="flex items-end gap-4">

                  <span className="font-serif text-[28px] text-[#741522]">
                    ₹
                    {Number(
                      dealOfTheDay.price || 0
                    ).toLocaleString("en-IN")}
                  </span>

                  {dealOfTheDay.originalPrice && (
                    <span className="pb-1 text-[13px] text-[#977e73] line-through">
                      ₹
                      {Number(
                        dealOfTheDay.originalPrice
                      ).toLocaleString("en-IN")}
                    </span>
                  )}

                </div>

                <p className="mt-5 max-w-[450px] text-[12px] leading-6 text-[#806c63]">
                  A special Darsh selection,
                  available at an exceptional
                  price for a limited time.
                  Once it's gone, this offer
                  may not return.
                </p>

                <Link
                  to={`/productDetails/${dealOfTheDay._id}`}
                  onClick={scrollTop}
                  className="group mt-8 inline-flex min-h-[50px] w-full sm:w-fit items-center justify-center gap-3 bg-[#741522] px-7 text-[8px] uppercase tracking-[0.25em] text-[#f8f4eb] hover:bg-[#5e101a] transition-all duration-300"
                >

                  <Eye size={14} />

                  View This Saree

                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />

                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          MORE HOT PICKS
      ===================================================== */}

      <section className="bg-[#f3eadb] border-y border-[#741522]/10 px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">

        <div className="max-w-[1240px] mx-auto">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10 sm:mb-12">

            <div>

              <p className="mb-3 flex items-center gap-2 text-[8px] uppercase tracking-[0.32em] text-[#977e73]">

                <Flame
                  size={13}
                  className="text-[#b88b34]"
                />

                LIMITED TIME EDIT
              </p>

              <h2 className="font-serif text-[34px] sm:text-[45px] leading-none text-[#3f1616]">
                More hot picks
              </h2>

              <p className="mt-4 max-w-[520px] text-[12px] leading-6 text-[#806c63]">
                Explore more handpicked sarees
                currently available in our
                special sale edit.
              </p>

            </div>

            <span className="text-[8px] uppercase tracking-[0.25em] text-[#977e73]">
              {remainingProducts.length} Pieces
            </span>

          </div>

          {remainingProducts.length > 0 ? (

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-12 sm:gap-y-14">

              {remainingProducts.map(
                (product, index) => {

                  const image =
                    getImage(product);

                  const oldPrice =
                    getOldPrice(product);

                  const discount =
                    getDiscount(product);

                  return (
                    <article
                      key={product._id}
                      className="group min-w-0 animate-[hotReveal_650ms_ease-out_both]"
                      style={{
                        animationDelay:
                          `${index * 80}ms`,
                      }}
                    >

                      {/* Image */}

                      <div className="relative aspect-[0.78] overflow-hidden bg-[#eee5d5]">

                        <DarshWishlistButton product={product} />

                        <Link
                          to={`/productDetails/${product._id}`}
                          onClick={scrollTop}
                        >
                          <img
                            src={image}
                            alt={product.productName}
                            loading={
                              index > 3
                                ? "lazy"
                                : "eager"
                            }
                            className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                          />
                        </Link>

                        {/* Overlay */}

                        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#4c1117]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* HOT badge */}

                        <div className="absolute left-3 top-3 sm:left-4 sm:top-4 flex items-center gap-1.5 bg-[#741522] px-3 py-1.5 text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-[#f8f4eb]">

                          <Flame
                            size={11}
                            className="animate-pulse"
                          />

                          HOT

                        </div>

                      

                        {/* Desktop button */}

                        <Link
                          to={`/productDetails/${product._id}`}
                          onClick={scrollTop}
                          className="absolute hidden sm:flex left-1/2 bottom-4 -translate-x-1/2 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 items-center gap-2 whitespace-nowrap bg-[#f8f4eb]/95 backdrop-blur-sm px-5 py-2.5 text-[8px] uppercase tracking-[0.2em] text-[#741522] shadow-lg transition-all duration-500"
                        >

                          <Eye size={13} />

                          View Saree

                        </Link>
                      </div>

                      {/* Details */}

                      <div className="pt-4 sm:pt-5">

                        <div className="flex items-start justify-between gap-2">

                          <Link
                            to={`/productDetails/${product._id}`}
                            onClick={scrollTop}
                            className="min-w-0"
                          >
                            <h3 className="truncate font-serif text-[15px] sm:text-[17px] leading-tight text-[#3f1616] group-hover:text-[#741522] transition-colors">
                              {product.productName}
                            </h3>
                          </Link>

                          <div className="shrink-0 text-right">

                            <p className="whitespace-nowrap text-[10px] sm:text-[11px] text-[#3d1714]">
                              ₹
                              {Number(
                                product.price || 0
                              ).toLocaleString(
                                "en-IN"
                              )}
                            </p>

                            {oldPrice && (
                              <p className="mt-0.5 text-[8px] text-[#977e73] line-through">
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

                        <p className="mt-2 truncate text-[7px] sm:text-[8px] uppercase tracking-[0.18em] text-[#977e73]">
                          {product.fabric ||
                            product.category ||
                            product.subCategory ||
                            "SPECIAL SALE · DARSH"}
                        </p>

                        {/* Mobile */}

                        <Link
                          to={`/productDetails/${product._id}`}
                          onClick={scrollTop}
                          className="sm:hidden mt-4 min-h-[38px] flex items-center justify-center gap-2 border border-[#741522]/30 text-[#741522] text-[7px] uppercase tracking-[0.18em] hover:bg-[#741522] hover:text-[#f8f4eb] transition-all"
                        >

                          <Eye size={12} />

                          View Saree

                        </Link>

                      </div>
                    </article>
                  );
                }
              )}

            </div>

          ) : (

            <div className="min-h-[330px] flex flex-col items-center justify-center text-center border border-[#741522]/10 bg-[#f8f4eb] px-6">

              <div className="w-16 h-16 flex items-center justify-center border border-[#d4ad54]/50">

                <Flame
                  size={25}
                  className="text-[#b88b34] animate-pulse"
                />

              </div>

              <h3 className="mt-6 font-serif text-[27px] text-[#3f1616]">
                More offers are coming
              </h3>

              <p className="mt-3 max-w-[450px] text-[12px] leading-6 text-[#806c63]">
                We're preparing more beautiful
                sarees and special prices for you.
              </p>

              <Link
                to="/newarrivals"
                onClick={scrollTop}
                className="mt-7 inline-flex items-center gap-3 border border-[#741522]/35 px-7 py-3.5 text-[8px] uppercase tracking-[0.25em] text-[#741522] hover:bg-[#741522] hover:text-[#f8f4eb] transition-all"
              >
                View New Arrivals

                <ArrowRight size={14} />
              </Link>

            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          TRUST FEATURES
      ===================================================== */}

      <section className="bg-[#f8f4eb] px-5 sm:px-8 py-12 sm:py-14">

        <div className="max-w-[950px] mx-auto grid grid-cols-1 sm:grid-cols-3 border-y border-[#741522]/10 divide-y sm:divide-y-0 sm:divide-x divide-[#741522]/10">

          <div className="flex justify-center items-center gap-3 px-5 py-5 sm:py-7">

            <Shield
              size={18}
              className="text-[#b88b34]"
            />

            <div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#741522]">
                Secure Payment
              </p>

              <p className="mt-1 text-[9px] text-[#977e73]">
                Safe & trusted checkout
              </p>
            </div>

          </div>

          <div className="flex justify-center items-center gap-3 px-5 py-5 sm:py-7">

            <Truck
              size={18}
              className="text-[#b88b34]"
            />

            <div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#741522]">
                Fast Delivery
              </p>

              <p className="mt-1 text-[9px] text-[#977e73]">
                Delivered with care
              </p>
            </div>

          </div>

          <div className="flex justify-center items-center gap-3 px-5 py-5 sm:py-7">

            <Award
              size={18}
              className="text-[#b88b34]"
            />

            <div>
              <p className="text-[8px] uppercase tracking-[0.18em] text-[#741522]">
                Premium Quality
              </p>

              <p className="mt-1 text-[9px] text-[#977e73]">
                Carefully selected weaves
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section className="bg-[#741522] px-5 sm:px-8 py-16 sm:py-20">

        <div className="max-w-[950px] mx-auto text-center">

          <div className="mx-auto w-12 h-12 flex items-center justify-center border border-[#d4ad54]/50">

            <Sparkles
              size={20}
              className="text-[#d4ad54] animate-pulse"
            />

          </div>

          <p className="mt-6 text-[8px] uppercase tracking-[0.4em] text-[#e6d2ae]">
            DISCOVER MORE FROM DARSH
          </p>

          <h2 className="mt-4 font-serif text-[32px] sm:text-[45px] leading-tight text-[#f8f4eb]">
            Your next favourite
            saree awaits.
          </h2>

          <p className="max-w-[560px] mx-auto mt-5 text-[12px] leading-6 text-[#e6d2ae]/80">
            Explore our complete collection
            of handpicked sarees, from new
            arrivals to timeless classics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

            <Link
              to="/allproducts"
              onClick={scrollTop}
              className="group w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-3 bg-[#f8f4eb] px-8 text-[8px] uppercase tracking-[0.25em] text-[#741522] hover:bg-[#e9dcc6] transition-all"
            >
              Explore All Sarees

              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/newarrivals"
              onClick={scrollTop}
              className="group w-full sm:w-auto min-h-[50px] inline-flex items-center justify-center gap-3 border border-[#e6d2ae]/50 px-8 text-[8px] uppercase tracking-[0.25em] text-[#f8f4eb] hover:bg-[#f8f4eb]/10 transition-all"
            >
              <Sparkles size={14} />

              New Arrivals

              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

          </div>

          <Link
            to="/"
            onClick={scrollTop}
            className="mt-7 inline-flex items-center gap-2 text-[7px] uppercase tracking-[0.25em] text-[#e6d2ae]/70 hover:text-[#f8f4eb] transition-colors"
          >
            <ArrowLeft size={12} />

            Back to Home
          </Link>

        </div>
      </section>

      {/* =====================================================
          ANIMATION
      ===================================================== */}

      <style>
        {`
          @keyframes hotReveal {
            0% {
              opacity: 0;
              transform: translateY(28px) scale(0.985);
            }

            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
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

export default HotSalesPage;