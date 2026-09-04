import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

/* =========================================================
   HELPERS
========================================================= */

const isPrebooking = (product) => {
  const value =
    product?.preBooking ??
    product?.prebooking ??
    product?.isPreBooking ??
    product?.isPrebooking ??
    product?.is_prebooking;

  return (
    value === true ||
    value === 1 ||
    value === "true" ||
    value === "1"
  );
};

const imageOf = (product, url) => {
  const raw =
    product?.images?.[0] ||
    product?.image ||
    product?.thumbnail ||
    "";

  if (!raw) return "";

  if (
    /^https?:\/\//i.test(raw) ||
    raw.startsWith("data:") ||
    raw.startsWith("/")
  ) {
    return raw;
  }

  return `${String(url || "").replace(/\/$/, "")}/img/${raw}`;
};

const productName = (product) =>
  product?.productName ||
  product?.name ||
  product?.title ||
  "Pre-booking Saree";

const priceOf = (product) => Number(product?.price || 0);

const oldPriceOf = (product) =>
  Number(
    product?.originalPrice ||
      product?.oldPrice ||
      product?.oldprice ||
      0
  );

const fabricOf = (product) =>
  product?.fabric ||
  product?.subCategory ||
  product?.category ||
  "Signature Collection";

/* =========================================================
   IMAGE FALLBACK
========================================================= */

const ImageFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#eee2d1]">
    <div
      className="
        flex h-10 w-10 items-center justify-center
        rounded-full
        border border-[#741522]/15
        bg-white/60
        text-[#741522]
      "
    >
      <Sparkles size={16} strokeWidth={1.2} />
    </div>
  </div>
);

/* =========================================================
   ONE PRODUCT
   SPECIAL COMPACT FEATURED DESIGN
========================================================= */

const SinglePrebooking = ({ product, url }) => {
  const id = product?._id || product?.id;

  const name = productName(product);
  const price = priceOf(product);
  const oldPrice = oldPriceOf(product);
  const fabric = fabricOf(product);
  const image = imageOf(product, url);

  return (
    <Link
      to={`/productDetails/${id}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="group block"
    >
      <article
        className="
          relative overflow-hidden
          rounded-[1.25rem]
          border border-[#741522]/10
          bg-white
          shadow-[0_8px_28px_rgba(63,22,22,.07)]
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-[0_15px_40px_rgba(63,22,22,.12)]
        "
      >
        <div className="flex min-h-[145px] sm:min-h-[160px]">
          {/* =================================================
              IMAGE
          ================================================= */}

          <div
            className="
              relative
              h-[145px] w-[115px]
              shrink-0 overflow-hidden
              bg-[#eee2d1]
              sm:h-[160px] sm:w-[130px]
            "
          >
            {image ? (
              <img
                src={image}
                alt={`${name} - Pre-booking`}
                loading="eager"
                className="
                  h-full w-full object-cover
                  transition-transform duration-700
                  group-hover:scale-[1.05]
                "
              />
            ) : (
              <ImageFallback />
            )}

            {/* IMAGE OVERLAY */}
            <div
              className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t
                from-[#3d1117]/35
                via-transparent
                to-transparent
              "
            />

            {/* BADGE */}
            <span
              className="
                absolute left-2 top-2
                rounded-full
                bg-[#741522]/90
                px-2 py-1
                text-[5.5px] font-semibold
                uppercase tracking-[.15em]
                text-white
                backdrop-blur-sm
              "
            >
              Pre-book
            </span>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              flex min-w-0
              flex-1 flex-col
              justify-center
              px-3 py-3
              sm:px-5
            "
          >
            {/* SMALL LABEL */}

            <div className="flex items-center gap-1.5 text-[#b18a2b]">
              <Sparkles size={10} />

              <span
                className="
                  text-[5.5px]
                  font-semibold
                  uppercase
                  tracking-[.2em]
                "
              >
                Featured pre-booking
              </span>
            </div>

            {/* NAME */}

            <h3
              className="
                mt-1.5
                line-clamp-2
                font-serif
                text-[18px]
                leading-[1.08]
                text-[#4a161c]
                sm:text-[22px]
              "
            >
              {name}
            </h3>

            {/* FABRIC */}

            <p
              className="
                mt-1
                truncate
                text-[6px]
                font-medium
                uppercase
                tracking-[.18em]
                text-[#9b7d6b]
              "
            >
              {fabric}
            </p>

            {/* PRICE */}

            <div className="mt-2.5 flex items-center gap-2">
              <span
                className="
                  text-[15px]
                  font-semibold
                  text-[#741522]
                  sm:text-[17px]
                "
              >
                ₹{price.toLocaleString("en-IN")}
              </span>

              {oldPrice > price && (
                <span className="text-[8px] text-[#aa9990] line-through">
                  ₹{oldPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* DELIVERY */}

            <div
              className="
                mt-2
                flex items-center gap-1.5
                text-[5.5px]
                uppercase tracking-[.08em]
                text-[#9b8376]
              "
            >
              <CalendarClock size={9} />
              30–40 days dispatch
            </div>
          </div>

          {/* =================================================
              ARROW
          ================================================= */}

          <div className="flex w-9 shrink-0 items-center justify-center">
            <span
              className="
                flex h-7 w-7
                items-center justify-center
                rounded-full
                border border-[#741522]/10
                text-[#741522]
                transition-all duration-300
                group-hover:border-[#e7c979]
                group-hover:bg-[#e7c979]
              "
            >
              <ArrowRight size={12} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* =========================================================
   2 / 3 PRODUCT CARD
========================================================= */

const ProductCard = ({ product, url, index }) => {
  const id = product?._id || product?.id;

  const name = productName(product);
  const price = priceOf(product);
  const oldPrice = oldPriceOf(product);
  const fabric = fabricOf(product);
  const image = imageOf(product, url);

  return (
    <Link
      to={`/productDetails/${id}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className="
        group
        block
        min-w-[205px]
        snap-start
        sm:min-w-0
      "
    >
      <article
        className="
          overflow-hidden
          rounded-[1.1rem]
          border border-[#741522]/10
          bg-white
          shadow-[0_7px_25px_rgba(63,22,22,.06)]
          transition-all duration-300
          hover:-translate-y-1
          hover:shadow-[0_14px_35px_rgba(63,22,22,.12)]
        "
      >
        {/* IMAGE */}

        <div
          className="
            relative
            aspect-[.84]
            overflow-hidden
            bg-[#eee2d1]
          "
        >
          {image ? (
            <img
              src={image}
              alt={`${name} - Pre-booking`}
              loading={index === 0 ? "eager" : "lazy"}
              className="
                h-full w-full object-cover
                transition-transform duration-700
                group-hover:scale-[1.045]
              "
            />
          ) : (
            <ImageFallback />
          )}

          {/* OVERLAY */}

          <div
            className="
              pointer-events-none absolute inset-x-0
              bottom-0 h-1/3
              bg-gradient-to-t
              from-[#3d1117]/60
              to-transparent
            "
          />

          {/* BADGE */}

          <span
            className="
              absolute left-2.5 top-2.5
              rounded-full
              bg-[#741522]/90
              px-2.5 py-1
              text-[5.5px]
              font-semibold
              uppercase
              tracking-[.15em]
              text-white
            "
          >
            Pre-book
          </span>

          {/* ARROW */}

          <span
            className="
              absolute bottom-2.5 right-2.5
              flex h-7 w-7
              items-center justify-center
              rounded-full
              bg-white/90
              text-[#741522]
              transition-all duration-300
              group-hover:bg-[#e7c979]
            "
          >
            <ChevronRight size={13} />
          </span>

          {/* NAME ON IMAGE */}

          <div
            className="
              absolute bottom-2.5 left-2.5 right-10
            "
          >
            <p
              className="
                line-clamp-2
                font-serif
                text-[16px]
                leading-[1.05]
                text-white
              "
            >
              {name}
            </p>
          </div>
        </div>

        {/* CONTENT */}

        <div className="p-3">
          <p
            className="
              truncate
              text-[6px]
              font-medium
              uppercase
              tracking-[.17em]
              text-[#9b7d6b]
            "
          >
            {fabric}
          </p>

          <div className="mt-2 flex items-center justify-between gap-2">
            <div className="flex items-baseline gap-1.5">
              <span
                className="
                  text-[13px]
                  font-semibold
                  text-[#741522]
                "
              >
                ₹{price.toLocaleString("en-IN")}
              </span>

              {oldPrice > price && (
                <span className="text-[8px] text-[#aa9990] line-through">
                  ₹{oldPrice.toLocaleString("en-IN")}
                </span>
              )}
            </div>

            <span
              className="
                whitespace-nowrap
                text-[5.5px]
                text-[#9b8376]
              "
            >
              30–40 days
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const PrebookingSection = () => {
  const { allProduct, url } = useAppContext();

  /* =======================================================
     FIND PRE-BOOKING PRODUCTS
  ======================================================= */

  const prebookingProducts = useMemo(() => {
    if (!Array.isArray(allProduct)) return [];

    return allProduct.filter(isPrebooking);
  }, [allProduct]);

  /* =======================================================
     IMPORTANT

     If there are NO pre-booking products:
     render NOTHING.

     This completely removes the section from homepage.
  ======================================================= */

  if (prebookingProducts.length === 0) {
    return null;
  }

  /* Maximum 3 products on homepage */

  const visibleProducts = prebookingProducts.slice(0, 3);

  const count = visibleProducts.length;

  return (
    <section
      className="
        relative overflow-hidden
        bg-[#f7efe3]
        py-5 sm:py-7
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1180px]
          px-4
          sm:px-6
          lg:px-8
        "
      >
        {/* =================================================
            MAIN COMPACT CONTAINER
        ================================================= */}

        <div
          className="
            relative overflow-hidden
            rounded-[1.3rem]
            bg-[#411917]
            px-3.5 py-4
            shadow-[0_10px_40px_rgba(63,22,22,.10)]
            sm:px-5 sm:py-5
          "
        >
          {/* =================================================
              HEADER
          ================================================= */}

          <div
            className="
              flex
              items-center
              justify-between
              gap-3
            "
          >
            {/* LEFT */}

            <div className="min-w-0">
              <div
                className="
                  flex items-center
                  gap-1.5
                  text-[#e7c979]
                "
              >
                <Sparkles size={9} />

                <span
                  className="
                    text-[5.5px]
                    font-semibold
                    uppercase
                    tracking-[.25em]
                  "
                >
                  Darsh Pre-booking
                </span>
              </div>

              <h2
                className="
                  mt-1
                  truncate
                  font-serif
                  text-[20px]
                  leading-none
                  text-[#fffaf1]
                  sm:text-[24px]
                "
              >
                Reserve before it arrives
              </h2>

              <p
                className="
                  mt-1.5
                  hidden
                  text-[7px]
                  leading-4
                  text-[#ead8c2]
                  sm:block
                "
              >
                Selected designs are produced after pre-booking.
              </p>
            </div>

            {/* EXPLORE ALL */}

            <Link
              to="/prebooking"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="
                group
                flex shrink-0
                items-center
                gap-1
                rounded-full
                border border-[#e7c979]/40
                px-2.5 py-1.5
                text-[5.5px]
                font-semibold
                uppercase
                tracking-[.16em]
                text-[#fffaf1]
                transition-all duration-300
                hover:bg-[#e7c979]
                hover:text-[#4c1117]
                sm:px-3 sm:py-2
              "
            >
              <span className="hidden sm:inline">
                Explore all
              </span>

              <span className="sm:hidden">
                View all
              </span>

              <ArrowRight
                size={10}
                className="
                  transition-transform
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </div>

          {/* =================================================
              PRODUCT AREA
          ================================================= */}

          <div className="mt-3.5">
            {/* =================================================
                ONE PRODUCT

                Special design
            ================================================= */}

            {count === 1 && (
              <div
                className="
                  animate-[prebookFade_.45s_ease-out]
                "
              >
                <SinglePrebooking
                  product={visibleProducts[0]}
                  url={url}
                />
              </div>
            )}

            {/* =================================================
                TWO / THREE PRODUCTS
            ================================================= */}

            {count > 1 && (
              <div
                className="
                  flex
                  snap-x
                  snap-mandatory
                  gap-2.5
                  overflow-x-auto
                  pb-1
                  scrollbar-hide

                  sm:grid
                  sm:grid-cols-2
                  sm:overflow-visible

                  lg:grid-cols-3
                "
              >
                {visibleProducts.map((product, index) => (
                  <ProductCard
                    key={
                      product?._id ||
                      product?.id ||
                      index
                    }
                    product={product}
                    url={url}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>

          {/* =================================================
              SMALL BOTTOM INFO
          ================================================= */}

          <div
            className="
              mt-3
              flex
              items-center
              justify-between
              border-t border-[#e7c979]/10
              pt-2.5
            "
          >
            <span
              className="
                text-[5.5px]
                text-[#cdb5a0]
              "
            >
              {prebookingProducts.length}{" "}
              {prebookingProducts.length === 1
                ? "design"
                : "designs"}{" "}
              available
            </span>

            <span
              className="
                flex items-center
                gap-1
                text-[5.5px]
                text-[#e7c979]
              "
            >
              Made after demand
              <CalendarClock size={8} />
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          ANIMATION + SCROLLBAR
      ===================================================== */}

      <style>{`
        @keyframes prebookFade {
          from {
            opacity: 0;
            transform: translateY(7px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PrebookingSection;
