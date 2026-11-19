import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CalendarClock,
  ChevronRight,
  Sparkles,
  ShieldCheck,
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

  return value === true || value === 1 || value === "true" || value === "1";
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
  Number(product?.originalPrice || product?.oldPrice || product?.oldprice || 0);

const fabricOf = (product) =>
  product?.fabric ||
  product?.subCategory ||
  product?.category ||
  "Signature Collection";

const formatPrice = (value) =>
  Number(value || 0).toLocaleString("en-IN");

const ImageFallback = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-[#eee2d1]">
    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#741522]/15 bg-white/70 text-[#741522]">
      <Sparkles size={20} strokeWidth={1.2} />
    </div>
  </div>
);

const ProductLink = ({ product, children, className = "" }) => {
  const id = product?._id || product?.id;

  return (
    <Link
      to={`/productDetails/${id}`}
      onClick={() =>
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
      className={className}
    >
      {children}
    </Link>
  );
};

/* =========================================================
   FEATURED CARD — USED WHEN ONLY ONE PRODUCT IS AVAILABLE
========================================================= */

const FeaturedPrebooking = ({ product, url }) => {
  const name = productName(product);
  const price = priceOf(product);
  const oldPrice = oldPriceOf(product);
  const image = imageOf(product, url);
  const fabric = fabricOf(product);

  return (
    <ProductLink product={product} className="group block">
      <article className="grid overflow-hidden rounded-[1.6rem] border border-[#ead9c7] bg-[#fffdf9] shadow-[0_18px_55px_rgba(63,22,22,.10)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_65px_rgba(63,22,22,.16)] md:grid-cols-[minmax(0,1.05fr)_minmax(320px,.95fr)]">
        <div className="relative min-h-[260px] overflow-hidden bg-[#eee2d1] sm:min-h-[340px] md:min-h-[390px]">
          {image ? (
            <img
              src={image}
              alt={`${name} - Pre-booking`}
              loading="eager"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            />
          ) : (
            <ImageFallback />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#321015]/45 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#321015]/10" />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-[#741522]/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.16em] text-white shadow-lg backdrop-blur">
            <Sparkles size={12} />
            Pre-booking exclusive
          </span>
          <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[.14em] text-[#741522] md:hidden">
            Limited featured design
          </span>
        </div>

        <div className="flex flex-col justify-center p-5 sm:p-8 md:p-10 lg:p-12">
          <div className="flex items-center gap-2 text-[#a98232]">
            <span className="h-px w-7 bg-[#c6a45b]" />
            <span className="text-[10px] font-bold uppercase tracking-[.24em]">
              Darsh curated selection
            </span>
          </div>

          <p className="mt-4 text-xs font-semibold uppercase tracking-[.18em] text-[#9b7d6b]">
            {fabric}
          </p>

          <h3 className="mt-2 font-serif text-2xl leading-tight text-[#4a161c] sm:text-3xl lg:text-[2.6rem]">
            {name}
          </h3>

          <p className="mt-3 max-w-lg text-sm leading-6 text-[#806b60]">
            Secure your favourite design in advance. This selected piece is
            available through our pre-booking collection.
          </p>

          <div className="mt-6 flex flex-wrap items-end gap-x-3 gap-y-1">
            <span className="text-2xl font-bold text-[#741522] sm:text-3xl">
              ₹{formatPrice(price)}
            </span>
            {oldPrice > price && (
              <span className="pb-1 text-sm text-[#a99a90] line-through">
                ₹{formatPrice(oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#eadfd4] pt-5">
            <span className="inline-flex items-center gap-2 text-xs text-[#8c766a]">
              <CalendarClock size={15} className="text-[#a98232]" />
              30–40 days dispatch
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-[#8c766a]">
              <ShieldCheck size={15} className="text-[#a98232]" />
              Pre-booking collection
            </span>
          </div>

          <span className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#741522] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#741522]/15 transition duration-300 group-hover:bg-[#5b101b] sm:w-fit sm:min-w-[190px]">
            Explore this design
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </article>
    </ProductLink>
  );
};

/* =========================================================
   PRODUCT CARD — USED FOR TWO OR THREE PRODUCTS
========================================================= */

const PrebookingProductCard = ({ product, url, index }) => {
  const name = productName(product);
  const price = priceOf(product);
  const oldPrice = oldPriceOf(product);
  const image = imageOf(product, url);
  const fabric = fabricOf(product);

  return (
    <ProductLink product={product} className="group block h-full">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#ead9c7] bg-[#fffdf9] shadow-[0_10px_30px_rgba(63,22,22,.07)] transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(63,22,22,.14)]">
        <div className="relative aspect-[.82] overflow-hidden bg-[#eee2d1]">
          {image ? (
            <img
              src={image}
              alt={`${name} - Pre-booking`}
              loading={index === 0 ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          ) : (
            <ImageFallback />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-[#321015]/65 via-transparent to-transparent opacity-90" />

          <span className="absolute left-3 top-3 rounded-full border border-white/25 bg-[#741522]/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-white backdrop-blur">
            Pre-book
          </span>

          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#741522] shadow-lg transition duration-300 group-hover:bg-[#e7c979]">
            <ChevronRight size={17} />
          </span>

          <div className="absolute bottom-4 left-4 right-14">
            <p className="line-clamp-2 font-serif text-xl leading-tight text-white sm:text-2xl">
              {name}
            </p>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[.17em] text-[#9b7d6b]">
            {fabric}
          </p>

          <div className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-lg font-bold text-[#741522]">
              ₹{formatPrice(price)}
            </span>
            {oldPrice > price && (
              <span className="text-xs text-[#a99a90] line-through">
                ₹{formatPrice(oldPrice)}
              </span>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-[#eee3d8] pt-3 mt-4">
            <span className="inline-flex items-center gap-1.5 text-[11px] text-[#8c766a]">
              <CalendarClock size={13} className="text-[#a98232]" />
              30–40 days dispatch
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#741522]">
              View
            </span>
          </div>
        </div>
      </article>
    </ProductLink>
  );
};

/* =========================================================
   MAIN SECTION
========================================================= */

const PrebookingSection = () => {
  const { allProduct, url } = useAppContext();

  const prebookingProducts = useMemo(() => {
    if (!Array.isArray(allProduct)) return [];
    return allProduct.filter(isPrebooking);
  }, [allProduct]);

  // Keep the homepage clean when no pre-booking products are available.
  if (prebookingProducts.length === 0) return null;

  // Homepage preview is intentionally limited to three products.
  const visibleProducts = prebookingProducts.slice(0, 3);
  const count = visibleProducts.length;

  return (
    <section className="relative overflow-hidden bg-[#f7efe3] py-9 sm:py-12 lg:py-16">
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#d9bd8c]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#741522]/[0.06] blur-3xl" />

      <div className="relative mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-[#6a2b2a]/10 bg-[#411917] shadow-[0_22px_65px_rgba(63,22,22,.14)] sm:rounded-[2rem]">
          {/* Section heading */}
          <div className="relative overflow-hidden px-5 py-6 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
            <div className="pointer-events-none absolute -right-10 -top-20 h-64 w-64 rounded-full border border-[#e7c979]/10" />
            <div className="pointer-events-none absolute -right-2 -top-12 h-48 w-48 rounded-full border border-[#e7c979]/10" />

            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 text-[#e7c979]">
                  <Sparkles size={14} />
                  <span className="text-[10px] font-bold uppercase tracking-[.25em] sm:text-[11px]">
                    Darsh pre-booking
                  </span>
                </div>

                <h2 className="mt-2 font-serif text-[1.75rem] leading-tight text-[#fffaf1] sm:text-3xl lg:text-4xl">
                  Reserve before it arrives
                </h2>

                <p className="mt-2 max-w-xl text-xs leading-5 text-[#ead8c2] sm:text-sm sm:leading-6">
                  Discover selected designs and reserve your favourite saree
                  in advance.
                </p>
              </div>

              <Link
                to="/prebooking"
                onClick={() =>
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  })
                }
                className="group inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full border border-[#e7c979]/50 px-5 py-3 text-xs font-bold uppercase tracking-[.13em] text-[#fffaf1] transition duration-300 hover:border-[#e7c979] hover:bg-[#e7c979] hover:text-[#411917] sm:w-auto"
              >
                Explore all designs
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Product display */}
          <div className="border-t border-[#e7c979]/15 bg-[#f7efe3] p-3 sm:p-5 lg:p-7">
            {count === 1 ? (
              <FeaturedPrebooking product={visibleProducts[0]} url={url} />
            ) : (
              <div className="grid grid-flow-col auto-cols-[minmax(78%,1fr)] gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide sm:grid-flow-row sm:auto-cols-auto sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-3 lg:gap-6">
                {visibleProducts.map((product, index) => (
                  <div
                    key={product?._id || product?.id || index}
                    className="snap-start animate-[prebookFade_.45s_ease-out_both]"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <PrebookingProductCard
                      product={product}
                      url={url}
                      index={index}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer information */}
          <div className="flex flex-col gap-2 border-t border-[#e7c979]/15 bg-[#411917] px-5 py-4 text-[10px] text-[#d7c2ad] sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <span>
              {prebookingProducts.length}{" "}
              {prebookingProducts.length === 1 ? "design" : "designs"} available
            </span>
            <span className="inline-flex items-center gap-2 text-[#e7c979]">
              <CalendarClock size={13} />
              Made after demand · 30–40 days dispatch
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes prebookFade {
          from {
            opacity: 0;
            transform: translateY(10px);
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
          *,
          *::before,
          *::after {
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
