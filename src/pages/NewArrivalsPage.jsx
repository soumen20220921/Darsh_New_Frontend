import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Eye,
  Heart,
  Flame,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppContext } from "../context/AppContext.jsx";



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

const NewArrivalsPage = () => {
  const {
    allProduct,
    url,
  } = useAppContext();

  /* =========================================================
     SORT PRODUCTS
  ========================================================= */

  const newArrivalsProducts = useMemo(() => {
    if (!allProduct?.length) {
      return [];
    }

    return [...allProduct]
      .sort(
        (a, b) =>
          new Date(
            b?.createdAt || 0
          ) -
          new Date(
            a?.createdAt || 0
          )
      )
      .slice(0, 10);
  }, [allProduct]);

  /* =========================================================
     CHECK MORE PRODUCTS
  ========================================================= */

  const hasMoreProducts =
    allProduct?.length > 10;

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
     PRODUCT IMAGE
  ========================================================= */

  const getProductImage = (product) => {
    if (product?.images?.[0]) {
      return `${url}/img/${product.images[0]}`;
    }

    return (
      product?.image ||
      "/IMG/saree.png"
    );
  };

  /* =========================================================
     PRODUCT PRICE
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
     RENDER
  ========================================================= */

  return (
    <main
      className="
        min-h-screen
        overflow-hidden
        bg-[#f8f4eb]
        text-[#3f1616]
      "
    >

      {/* =====================================================
          HERO / PAGE INTRO
      ===================================================== */}

      <section
        className="
          relative
          overflow-hidden
          border-b
          border-[#741522]/10
          bg-[#f3eadb]
        "
      >
        {/* Decorative circles */}

        <div
          className="
            pointer-events-none
            absolute
            -left-28
            top-10
            h-64
            w-64
            rounded-full
            bg-[#d4ad54]/[0.07]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-28
            bottom-0
            h-72
            w-72
            rounded-full
            bg-[#741522]/[0.045]
            blur-3xl
          "
        />

        <div
          className="
            relative
            mx-auto
            max-w-[1180px]
            px-5
            py-6
            sm:px-8
            sm:py-15
            lg:px-0
            lg:py-18
          "
        >

          {/* Breadcrumb */}

          <div
            className="
              mb-9
              flex
              items-center
              justify-center
              gap-2
              text-[7px]
              uppercase
              tracking-[0.28em]
              text-[#977e73]
              sm:text-[8px]
            "
          >
            <Link
              to="/"
              onClick={scrollTop}
              className="
                transition-colors
                hover:text-[#741522]
              "
            >
              Home
            </Link>

            <span>/</span>

            <span
              className="text-[#741522]"
            >
              New Arrivals
            </span>
          </div>

          {/* Small label */}

          <div
            className="
              mb-5
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-8
                bg-[#d4ad54]
                sm:w-12
              "
            />

            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.38em]
                text-[#977e73]
                sm:text-[9px]
              "
            >
              JUST OFF THE LOOM
            </p>

            <span
              className="
                h-px
                w-8
                bg-[#d4ad54]
                sm:w-12
              "
            />
          </div>

          {/* Main heading */}

          <h1
            className="
              text-center
              font-serif
              text-[44px]
              font-normal
              leading-[0.95]
              tracking-[-0.02em]
              text-[#3f1616]
              sm:text-[58px]
              lg:text-[70px]
            "
          >
            New Arrivals
          </h1>

          {/* Gold line */}

          <div
            className="
              mx-auto
              mt-6
              flex
              items-center
              justify-center
              gap-3
            "
          >
            <span
              className="
                h-px
                w-10
                bg-[#d4ad54]/60
              "
            />

            <Sparkles
              size={14}
              strokeWidth={1}
              className="
                animate-pulse
                text-[#b88b34]
              "
            />

            <span
              className="
                h-px
                w-10
                bg-[#d4ad54]/60
              "
            />
          </div>

         

          {/* Bottom note */}

          <div
            className="
              mt-8
              flex
              flex-wrap
              items-center
              justify-center
              gap-x-6
              gap-y-3
            "
          >
            <span
              className="
                flex
                items-center
                gap-2
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-[#741522]
                sm:text-[8px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#d4ad54]
                "
              />
              Freshly Added
            </span>

            <span
              className="
                flex
                items-center
                gap-2
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-[#741522]
                sm:text-[8px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#d4ad54]
                "
              />
              Handpicked
            </span>

            <span
              className="
                flex
                items-center
                gap-2
                text-[7px]
                uppercase
                tracking-[0.2em]
                text-[#741522]
                sm:text-[8px]
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#d4ad54]
                "
              />
              Darsh Collection
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRODUCTS
      ===================================================== */}

      <section
        className="
          mx-auto
          max-w-[1240px]
          px-4
          py-14
          sm:px-6
          sm:py-18
          lg:px-8
          lg:py-20
        "
      >

        {/* Section top */}

        <div
          className="
            mb-9
            flex
            flex-col
            gap-5
            sm:mb-11
            sm:flex-row
            sm:items-end
            sm:justify-between
          "
        >
          <div>
            <p
              className="
                mb-3
                text-[8px]
                uppercase
                tracking-[0.32em]
                text-[#977e73]
              "
            >
              LATEST FROM DARSH
            </p>

            <h2
              className="
                font-serif
                text-[31px]
                font-normal
                leading-none
                text-[#3f1616]
                sm:text-[40px]
              "
            >
              Fresh off the loom
            </h2>
          </div>

          {/* Product count */}

          {newArrivalsProducts.length >
            0 && (
            <p
              className="
                text-[8px]
                uppercase
                tracking-[0.2em]
                text-[#977e73]
              "
            >
              {newArrivalsProducts.length}{" "}
              New Pieces
            </p>
          )}
        </div>

        {/* ===================================================
            PRODUCT GRID
        =================================================== */}

        {newArrivalsProducts.length >
        0 ? (
          <div
            className="
              grid
              grid-cols-2
              gap-x-4
              gap-y-12
              sm:grid-cols-3
              sm:gap-x-5
              sm:gap-y-14
              lg:grid-cols-4
              lg:gap-x-6
              xl:grid-cols-5
            "
          >
            {newArrivalsProducts.map(
              (
                product,
                index
              ) => {
                const image =
                  getProductImage(
                    product
                  );

                const oldPrice =
                  getOldPrice(
                    product
                  );

             

                return (
                  <article
                    key={
                      product?._id ||
                      product?.id
                    }
                    className="
                      group
                      min-w-0
                      animate-[newArrivalReveal_650ms_ease-out_both]
                    "
                    style={{
                      animationDelay: `${
                        index * 70
                      }ms`,
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
                      <Link
                        to={`/productDetails/${product?._id}`}
                        onClick={
                          scrollTop
                        }
                        className="
                          absolute
                          inset-0
                        "
                      >
                        <img
                          src={image}
                          alt={
                            product?.productName ||
                            "Darsh Saree"
                          }
                          loading={
                            index > 3
                              ? "lazy"
                              : "eager"
                          }
                          className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-[1200ms]
                            ease-out
                            group-hover:scale-[1.05]
                          "
                        />
                      </Link>

                      {/* Image overlay */}

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

                      {/* NEW badge */}

                      <span
                        className="
                          absolute
                          left-3
                          top-3
                          bg-[#d4ad54]
                          px-3
                          py-1.5
                          text-[7px]
                          font-medium
                          uppercase
                          tracking-[0.2em]
                          text-[#4a1815]
                          shadow-sm
                          sm:left-4
                          sm:top-4
                          sm:text-[8px]
                        "
                      >
                        NEW
                      </span>


                      {/* Desktop view */}

                      <Link
                        to={`/productDetails/${product?._id}`}
                        onClick={
                          scrollTop
                        }
                        className="
                          absolute
                          bottom-4
                          left-1/2
                          hidden
                          -translate-x-1/2
                          translate-y-4
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
                          opacity-0
                          shadow-lg
                          backdrop-blur-sm
                          transition-all
                          duration-500
                          group-hover:translate-y-0
                          group-hover:opacity-100
                          sm:flex
                        "
                      >
                        <Eye
                          size={13}
                          strokeWidth={1.2}
                        />

                        View Saree
                      </Link>
                    </div>

                    {/* =================================================
                        PRODUCT DETAILS
                    ================================================= */}

                    <div
                      className="
                        pt-4
                        sm:pt-5
                      "
                    >
                      <div
                        className="
                          flex
                          items-start
                          justify-between
                          gap-2
                        "
                      >
                        <Link
                          to={`/productDetails/${product?._id}`}
                          onClick={
                            scrollTop
                          }
                          className="
                            min-w-0
                          "
                        >
                          <h3
                            className="
                              truncate
                              font-serif
                              text-[15px]
                              leading-tight
                              text-[#3f1616]
                              transition-colors
                              duration-300
                              group-hover:text-[#741522]
                              sm:text-[17px]
                            "
                          >
                            {product?.productName ||
                              "Handwoven Saree"}
                          </h3>
                        </Link>

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
                              text-[10px]
                              text-[#3d1714]
                              sm:text-[11px]
                            "
                          >
                            ₹
                            {Number(
                              product?.price ||
                                0
                            ).toLocaleString(
                              "en-IN"
                            )}
                          </p>

                          {oldPrice && (
                            <p
                              className="
                                mt-0.5
                                text-[8px]
                                text-[#9b837b]
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

                      {/* Category */}

                      <p
                        className="
                          mt-2
                          truncate
                          text-[7px]
                          uppercase
                          tracking-[0.18em]
                          text-[#977e73]
                          sm:text-[8px]
                        "
                      >
                        {product?.fabric ||
                          product?.category ||
                          product?.subCategory ||
                          "HANDWOVEN · DARSH"}
                      </p>

                      {/* Mobile button */}

                      <Link
                        to={`/productDetails/${product?._id}`}
                        onClick={
                          scrollTop
                        }
                        className="
                          mt-4
                          flex
                          min-h-[38px]
                          items-center
                          justify-center
                          gap-2
                          border
                          border-[#741522]/30
                          px-3
                          text-[7px]
                          uppercase
                          tracking-[0.18em]
                          text-[#741522]
                          transition-all
                          duration-300
                          hover:bg-[#741522]
                          hover:text-[#f8f4eb]
                          sm:hidden
                        "
                      >
                        <Eye
                          size={12}
                          strokeWidth={1.2}
                        />

                        View Saree
                      </Link>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        ) : (
          /* =================================================
             EMPTY STATE
          ================================================= */

          <div
            className="
              flex
              min-h-[360px]
              flex-col
              items-center
              justify-center
              border
              border-[#741522]/10
              bg-[#f3eadb]
              px-6
              text-center
            "
          >
            <div
              className="
                flex
                h-16
                w-16
                items-center
                justify-center
                border
                border-[#d4ad54]/50
              "
            >
              <Sparkles
                size={25}
                strokeWidth={1}
                className="
                  text-[#b88b34]
                "
              />
            </div>

            <h3
              className="
                mt-6
                font-serif
                text-[27px]
                text-[#3f1616]
              "
            >
              Something beautiful
              is coming
            </h3>

            <p
              className="
                mt-3
                max-w-[450px]
                text-[12px]
                leading-6
                text-[#806c63]
              "
            >
              No new arrivals have been
              added yet. Check back soon
              for our latest handpicked
              collections.
            </p>

            <Link
              to="/allproducts"
              onClick={scrollTop}
              className="
                mt-7
                inline-flex
                items-center
                gap-3
                bg-[#741522]
                px-7
                py-3.5
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#f8f4eb]
                transition-all
                duration-300
                hover:bg-[#5e101a]
              "
            >
              Explore Collection

              <ArrowRight
                size={14}
                strokeWidth={1.2}
              />
            </Link>
          </div>
        )}

        {/* =====================================================
            VIEW ALL PRODUCTS
        ===================================================== */}

        {hasMoreProducts && (
          <div
            className="
              mt-12
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
                gap-3
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
              View all products

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
        )}

        {/* =====================================================
            BACK TO SHOP
        ===================================================== */}

        <div
          className="
            mt-7
            flex
            justify-center
          "
        >
          <Link
            to="/allproducts"
            onClick={scrollTop}
            className="
              inline-flex
              items-center
              gap-2
              text-[7px]
              uppercase
              tracking-[0.25em]
              text-[#977e73]
              transition-colors
              duration-300
              hover:text-[#741522]
            "
          >
            <ArrowLeft
              size={12}
              strokeWidth={1.2}
            />

            Continue shopping
          </Link>
        </div>
      </section>

      {/* =====================================================
          HOT SALES CTA
      ===================================================== */}

      <section
        className="
          border-t
          border-[#741522]/10
          bg-[#f3eadb]
          px-5
          py-16
          sm:px-8
          sm:py-20
        "
      >
        <div
          className="
            mx-auto
            max-w-[950px]
          "
        >
          <div
            className="
              relative
              overflow-hidden
              border
              border-[#d4ad54]/30
              bg-[#f8f4eb]
              px-6
              py-12
              text-center
              sm:px-12
              sm:py-16
            "
          >

            {/* Decorative elements */}

            <div
              className="
                pointer-events-none
                absolute
                -left-20
                -top-20
                h-40
                w-40
                rounded-full
                bg-[#d4ad54]/[0.07]
                blur-2xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-20
                -right-20
                h-40
                w-40
                rounded-full
                bg-[#741522]/[0.05]
                blur-2xl
              "
            />

            <div
              className="
                relative
              "
            >
              <div
                className="
                  mx-auto
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  border
                  border-[#d4ad54]/50
                "
              >
                <GiftIcon />
              </div>

              <p
                className="
                  mt-5
                  text-[8px]
                  uppercase
                  tracking-[0.38em]
                  text-[#977e73]
                "
              >
                MORE TO DISCOVER
              </p>

              <h2
                className="
                  mt-3
                  font-serif
                  text-[32px]
                  text-[#3f1616]
                  sm:text-[43px]
                "
              >
                Looking for something
                special?
              </h2>

              <p
                className="
                  mx-auto
                  mt-4
                  max-w-[520px]
                  text-[12px]
                  leading-6
                  text-[#806c63]
                "
              >
                Explore our complete collection
                or discover pieces from the Darsh
                Hot Sales edit.
              </p>

              <div
                className="
                  mt-8
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-3
                  sm:flex-row
                "
              >
                {/* All Products */}

                <Link
                  to="/allproducts"
                  onClick={scrollTop}
                  className="
                    group
                    inline-flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    gap-3
                    bg-[#741522]
                    px-7
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-[#f8f4eb]
                    transition-all
                    duration-300
                    hover:bg-[#5e101a]
                    sm:w-auto
                  "
                >
                  <ShoppingBag
                    size={14}
                    strokeWidth={1.2}
                  />

                  Shop All Sarees

                  <ArrowRight
                    size={13}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </Link>

                {/* Hot Sales */}

                <Link
                  to="/hotsales"
                  onClick={scrollTop}
                  className="
                    group
                    inline-flex
                    min-h-[48px]
                    w-full
                    items-center
                    justify-center
                    gap-3
                    border
                    border-[#741522]/35
                    px-7
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-[#741522]
                    transition-all
                    duration-300
                    hover:bg-[#741522]
                    hover:text-[#f8f4eb]
                    sm:w-auto
                  "
                >
                  <Flame
                    size={14}
                    strokeWidth={1.2}
                  />

                  Explore Hot Sales

                  <ArrowRight
                    size={13}
                    className="
                      transition-transform
                      group-hover:translate-x-1
                    "
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ANIMATIONS
      ===================================================== */}

      <style>
        {`
          @keyframes newArrivalReveal {
            0% {
              opacity: 0;
              transform:
                translateY(28px)
                scale(0.985);
            }

            100% {
              opacity: 1;
              transform:
                translateY(0)
                scale(1);
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
   GIFT ICON
========================================================= */

const GiftIcon = () => {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="text-[#b88b34]"
    >
      <path
        d="M20 12v10H4V12"
      />

      <path
        d="M2 7h20v5H2z"
      />

      <path
        d="M12 22V7"
      />

      <path
        d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z"
      />

      <path
        d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z"
      />
    </svg>
  );
};

export default NewArrivalsPage;