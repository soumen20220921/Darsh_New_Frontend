import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  Flame,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

const DARSH_WISHLIST_KEY = "wishlist";

const getWishlistId = (product) =>
  product?._id || product?.id || product?.productId || null;

const readDarshWishlist = () => {
  try {
    const raw = localStorage.getItem(DARSH_WISHLIST_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const emitWishlistUpdate = () => {
  window.dispatchEvent(new Event("wishlistUpdated"));
  window.dispatchEvent(new Event("darsh-wishlist-updated"));
};

const getImage = (product, url) => {
  if (product?.images?.[0]) return `${url}/img/${product.images[0]}`;
  return product?.image || product?.img || "/IMG/saree.png";
};

const getPrice = (product) => Number(product?.price || 0);

const getOldPrice = (product) =>
  product?.originalPrice || product?.oldPrice || product?.oldprice || null;

const getName = (product) =>
  product?.productName || product?.name || "Handwoven Saree";

const getCategory = (product) =>
  product?.fabric ||
  product?.category ||
  product?.subCategory ||
  "HANDWOVEN · DARSH";



const DarshWishlistButton = ({ product }) => {
  const productId = getWishlistId(product);

  const [wished, setWished] = useState(() =>
    productId
      ? readDarshWishlist().some(
          (item) => getWishlistId(item) === productId
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
          (item) => getWishlistId(item) === productId
        )
      );
    };

    window.addEventListener("wishlistUpdated", sync);
    window.addEventListener("darsh-wishlist-updated", sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener("wishlistUpdated", sync);
      window.removeEventListener("darsh-wishlist-updated", sync);
      window.removeEventListener("storage", sync);
    };
  }, [productId]);

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) return;

    const current = readDarshWishlist();
    const exists = current.some(
      (item) => getWishlistId(item) === productId
    );

    const next = exists
      ? current.filter((item) => getWishlistId(item) !== productId)
      : [
          ...current,
          {
            ...product,
            id: product?.id || productId,
            _id: product?._id || productId,
            name: getName(product),
            productName: getName(product),
            price: getPrice(product),
            image:
              product?.image ||
              product?.images?.[0] ||
              product?.img ||
              "/IMG/saree.png",
          },
        ];

    try {
      localStorage.setItem(DARSH_WISHLIST_KEY, JSON.stringify(next));
      setWished(!exists);
      emitWishlistUpdate();
    } catch {
      // Keep the UI usable if browser storage is unavailable.
    }
  };

  if (!productId) return null;

  return (
    <motion.button
      type="button"
      aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={wished}
      onClick={toggleWishlist}
      whileTap={{ scale: 0.88 }}
      className={`absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-md transition-all sm:right-4 sm:top-4 ${
        wished
          ? "border-[#741522] bg-[#741522] text-white shadow-lg"
          : "border-white/70 bg-white/90 text-[#741522] hover:border-[#d4ad54] hover:bg-white"
      }`}
    >
      <Heart
        size={17}
        strokeWidth={1.7}
        fill={wished ? "currentColor" : "none"}
      />
      {wished && (
        <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-[#e7c979]" />
      )}
    </motion.button>
  );
};

const ProductCard = ({ product, index, url, onNavigate }) => {
  const image = getImage(product, url);
  const oldPrice = getOldPrice(product);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.24) }}
      className="group min-w-0"
    >
      <div className="relative overflow-hidden rounded-[2px] bg-[#eee5d5] shadow-[0_8px_30px_rgba(63,22,22,.05)]">
        <div className="relative aspect-[0.78]">
          <Link
            to={`/productDetails/${product?._id}`}
            onClick={onNavigate}
            className="absolute inset-0 z-10"
            aria-label={`View ${getName(product)}`}
          >
            <img
              src={image}
              alt={getName(product)}
              loading={index > 3 ? "lazy" : "eager"}
              className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
            />
          </Link>

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f1616]/35 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />


          <DarshWishlistButton product={product} />

          <Link
            to={`/productDetails/${product?._id}`}
            onClick={onNavigate}
            className="absolute bottom-4 left-1/2 z-20 hidden -translate-x-1/2 translate-y-3 items-center gap-2 whitespace-nowrap bg-[#f8f4eb]/95 px-5 py-3 text-[8px] uppercase tracking-[.2em] text-[#741522] opacity-0 shadow-xl backdrop-blur transition duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
          >
            <Eye size={13} strokeWidth={1.3} />
            View Saree
          </Link>
        </div>
      </div>

      <div className="px-0.5 pt-4 sm:pt-5">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/productDetails/${product?._id}`}
            onClick={onNavigate}
            className="min-w-0"
          >
            <h3 className="truncate font-serif text-[15px] leading-tight text-[#3f1616] transition group-hover:text-[#741522] sm:text-[17px]">
              {getName(product)}
            </h3>
          </Link>

          <div className="shrink-0 text-right">
            <p className="whitespace-nowrap text-[11px] font-medium text-[#3d1714] sm:text-[12px]">
              ₹{getPrice(product).toLocaleString("en-IN")}
            </p>
            {oldPrice && (
              <p className="mt-0.5 text-[8px] text-[#9b837b] line-through">
                ₹{Number(oldPrice).toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>

        <p className="mt-2 truncate text-[7px] uppercase tracking-[.18em] text-[#977e73] sm:text-[8px]">
          {getCategory(product)}
        </p>

        <Link
          to={`/productDetails/${product?._id}`}
          onClick={onNavigate}
          className="mt-4 flex min-h-[40px] items-center justify-center gap-2 border border-[#741522]/25 px-3 text-[7px] uppercase tracking-[.18em] text-[#741522] transition hover:bg-[#741522] hover:text-[#f8f4eb] sm:hidden"
        >
          <Eye size={12} strokeWidth={1.3} />
          View Saree
        </Link>
      </div>
    </motion.article>
  );
};

const NewArrivalsPage = () => {
  const { allProduct, url } = useAppContext();

  const [sortBy, setSortBy] = useState("newest");
  const [visibleCount, setVisibleCount] = useState(10);
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => setShowTopButton(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setVisibleCount(10);
  }, [sortBy, search]);

  const products = useMemo(() => {
    const source = Array.isArray(allProduct) ? [...allProduct] : [];

    const filtered = source.filter((product) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;

      return [
        getName(product),
        getCategory(product),
        product?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q);
    });

    filtered.sort((a, b) => {
      if (sortBy === "priceLow") return getPrice(a) - getPrice(b);
      if (sortBy === "priceHigh") return getPrice(b) - getPrice(a);

      return (
        new Date(b?.createdAt || 0) -
        new Date(a?.createdAt || 0)
      );
    });

    return filtered;
  }, [allProduct, search, sortBy]);

  const visibleProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  const clearSearch = () => setSearch("");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f8f4eb] text-[#3f1616]">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#741522]/10 bg-[#f1e6d5]">
        <div className="pointer-events-none absolute -left-28 top-0 h-72 w-72 rounded-full bg-[#d4ad54]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#741522]/[.06] blur-3xl" />

        <div className="relative mx-auto max-w-[1240px] px-5 py-5 sm:px-5 sm:py-6">
          <div className="mb-8 flex items-center justify-center gap-2 text-[7px] uppercase tracking-[.28em] text-[#977e73] sm:mb-10 sm:text-[8px]">
            <Link
              to="/"
              onClick={scrollTop}
              className="transition hover:text-[#741522]"
            >
              Home
            </Link>
            <span>/</span>
            <span className="text-[#741522]">New Arrivals</span>
          </div>

          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#d4ad54] sm:w-12" />
              <span className="text-[8px] uppercase tracking-[.35em] text-[#977e73] sm:text-[9px]">
                Just off the loom
              </span>
              <span className="h-px w-8 bg-[#d4ad54] sm:w-12" />
            </div>

            <h1 className="font-serif text-[46px] font-normal leading-[.94] tracking-[-.025em] text-[#3f1616] sm:text-[62px] lg:text-[78px]">
              New Arrivals
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[11px] leading-6 text-[#806c63] sm:text-[13px]">
              Discover the latest Darsh sarees, freshly selected for their
              craftsmanship, texture, and timeless character.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[7px] uppercase tracking-[.18em] text-[#741522] sm:text-[8px]">
              {["Freshly Added", "Handpicked", "Limited Pieces"].map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d4ad54]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SHOP TOOLBAR */}
      <section className="sticky top-0 z-30 border-b border-[#741522]/10 bg-[#f8f4eb]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1240px] items-center gap-2 px-4 py-3 sm:px-6 lg:px-10">
          <div className="relative min-w-0 flex-1">
            <Search
              size={15}
              strokeWidth={1.4}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#977e73]"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search new arrivals..."
              aria-label="Search new arrivals"
              className="h-10 w-full rounded-none border border-[#741522]/15 bg-white/60 pl-9 pr-9 text-[10px] text-[#3f1616] outline-none transition placeholder:text-[#a28c83] focus:border-[#741522]/45 focus:bg-white"
            />
            {search && (
              <button
                type="button"
                onClick={clearSearch}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center text-[#741522]"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((value) => !value)}
            aria-expanded={showFilters}
            className={`flex h-10 shrink-0 items-center gap-2 border px-3 text-[8px] uppercase tracking-[.14em] transition sm:px-4 ${
              showFilters
                ? "border-[#741522] bg-[#741522] text-white"
                : "border-[#741522]/15 bg-white/60 text-[#741522] hover:border-[#741522]/40"
            }`}
          >
            <SlidersHorizontal size={14} strokeWidth={1.4} />
            <span className="hidden sm:inline">Sort</span>
          </button>
        </div>

        <AnimatePresence initial={false}>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#741522]/10"
            >
              <div className="mx-auto flex max-w-[1240px] flex-wrap gap-2 px-4 py-3 sm:px-6 lg:px-10">
                {[
                  ["newest", "Newest"],
                  ["priceLow", "Price: Low"],
                  ["priceHigh", "Price: High"],
                ].map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setSortBy(value)}
                    className={`min-h-9 border px-4 text-[7px] uppercase tracking-[.16em] transition ${
                      sortBy === value
                        ? "border-[#741522] bg-[#741522] text-white"
                        : "border-[#741522]/15 bg-white text-[#741522] hover:border-[#741522]/40"
                    }`}
                  >
                    {sortBy === value && (
                      <Check size={11} className="mr-1 inline" />
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* PRODUCTS */}
      <section className="mx-auto max-w-[1240px] px-4 py-4 sm:px-6 sm:py-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[8px] uppercase tracking-[.3em] text-[#977e73]">
              Latest from Darsh
            </p>
            <h2 className="font-serif text-[32px] leading-none sm:text-[42px]">
              Fresh off the loom
            </h2>
          </div>

          <div className="text-[8px] uppercase tracking-[.18em] text-[#977e73]">
            {products.length} {products.length === 1 ? "Piece" : "Pieces"}
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4 lg:gap-x-6 xl:grid-cols-5">
              {visibleProducts.map((product, index) => (
                <ProductCard
                  key={getWishlistId(product) || index}
                  product={product}
                  index={index}
                  url={url}
                  onNavigate={scrollTop}
                />
              ))}
            </div>

            {hasMore && (
              <div className="mt-12 flex justify-center sm:mt-16">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 10)}
                  className="inline-flex min-h-12 items-center gap-3 border border-[#741522]/40 px-8 text-[8px] uppercase tracking-[.24em] text-[#741522] transition hover:bg-[#741522] hover:text-white"
                >
                  Load More
                  <ArrowRight size={14} strokeWidth={1.3} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex min-h-[380px] flex-col items-center justify-center border border-[#741522]/10 bg-[#f1e6d5] px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center border border-[#d4ad54]/50">
              {search ? (
                <Search size={24} strokeWidth={1.2} className="text-[#b88b34]" />
              ) : (
                <Sparkles size={24} strokeWidth={1.2} className="text-[#b88b34]" />
              )}
            </div>

            <h3 className="mt-6 font-serif text-[28px]">
              {search ? "No matching sarees" : "Something beautiful is coming"}
            </h3>

            <p className="mt-3 max-w-md text-[12px] leading-6 text-[#806c63]">
              {search
                ? "Try another product name, fabric, or collection."
                : "No new arrivals have been added yet. Explore the complete Darsh collection while you wait."}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {search && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="min-h-11 border border-[#741522]/30 px-6 text-[8px] uppercase tracking-[.2em] text-[#741522]"
                >
                  Clear Search
                </button>
              )}
              <Link
                to="/allproducts"
                onClick={scrollTop}
                className="inline-flex min-h-11 items-center justify-center gap-3 bg-[#741522] px-7 text-[8px] uppercase tracking-[.2em] text-white transition hover:bg-[#5e101a]"
              >
                Explore Collection
                <ArrowRight size={14} strokeWidth={1.2} />
              </Link>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            to="/allproducts"
            onClick={scrollTop}
            className="inline-flex items-center gap-2 text-[7px] uppercase tracking-[.24em] text-[#977e73] transition hover:text-[#741522]"
          >
            <ArrowLeft size={12} strokeWidth={1.2} />
            Continue Shopping
          </Link>
        </div>
      </section>

      {/* DISCOVERY CTA */}
      <section className="border-t border-[#741522]/10 bg-[#f1e6d5] px-5 py-14 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-[980px]">
          <div className="relative overflow-hidden border border-[#d4ad54]/30 bg-[#f8f4eb] px-6 py-12 text-center shadow-[0_15px_50px_rgba(63,22,22,.04)] sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-[#d4ad54]/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-20 -right-20 h-40 w-40 rounded-full bg-[#741522]/[.06] blur-2xl" />

            <div className="relative">
              <div className="mx-auto flex h-12 w-12 items-center justify-center border border-[#d4ad54]/50">
                <ShoppingBag size={21} strokeWidth={1.2} className="text-[#b88b34]" />
              </div>

              <p className="mt-5 text-[8px] uppercase tracking-[.38em] text-[#977e73]">
                More to discover
              </p>

              <h2 className="mt-3 font-serif text-[32px] sm:text-[44px]">
                Find your next favourite
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-[12px] leading-6 text-[#806c63]">
                Browse every Darsh collection or explore our special offers
                for more handpicked sarees.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/allproducts"
                  onClick={scrollTop}
                  className="inline-flex min-h-12 items-center justify-center gap-3 bg-[#741522] px-7 text-[8px] uppercase tracking-[.22em] text-white transition hover:bg-[#5e101a]"
                >
                  <ShoppingBag size={14} strokeWidth={1.2} />
                  Shop All Sarees
                  <ArrowRight size={13} />
                </Link>

                <Link
                  to="/hotsales"
                  onClick={scrollTop}
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-[#741522]/30 px-7 text-[8px] uppercase tracking-[.22em] text-[#741522] transition hover:bg-[#741522] hover:text-white"
                >
                  <Flame size={14} strokeWidth={1.2} />
                  Explore Hot Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BACK TO TOP */}
      <AnimatePresence>
        {showTopButton && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            type="button"
            onClick={scrollTop}
            aria-label="Back to top"
            className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#741522]/20 bg-[#f8f4eb]/95 text-[#741522] shadow-xl backdrop-blur-md sm:bottom-7 sm:right-7"
          >
            <ArrowLeft size={15} className="rotate-90" />
          </motion.button>
        )}
      </AnimatePresence>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
};

export default NewArrivalsPage;