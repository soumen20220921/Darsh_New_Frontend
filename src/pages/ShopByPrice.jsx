import React, { useMemo, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Gift,
  SlidersHorizontal,
  Heart,
  Crown,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

const PRICE_RANGES = [
  {
    id: "under-2000",
    label: "Under ₹2,000",
    min: 0,
    max: 1999,
    note: "Easy everyday picks",
  },
  {
    id: "2000-5000",
    label: "₹2,000 – ₹5,000",
    min: 2000,
    max: 5000,
    note: "Handloom favourites",
  },
  {
    id: "5001-10000",
    label: "₹5,001 – ₹10,000",
    min: 5001,
    max: 10000,
    note: "Premium occasions",
  },
  {
    id: "above-10000",
    label: "Above ₹10,000",
    min: 10001,
    max: Infinity,
    note: "Heirloom edit",
  },
];

const fallbackProducts = [
  {
    id: "demo-1",
    productName: "Emerald Kanjivaram",
    price: 18900,
    image: "/IMG/saree.png",
  },
];

const getProductId = (product) =>
  product?._id || product?.id || product?.productId;

const getProductName = (product) =>
  product?.productName || product?.name || product?.title || "Handwoven Saree";

const getProductImage = (product, url) => {
  const image =
    product?.images?.[0] ||
    product?.image ||
    product?.img ||
    product?.thumbnail;

  if (!image) return "/IMG/saree.png";

  return String(image).startsWith("http")
    ? image
    : product?.images?.[0]
      ? `${url}/img/${image}`
      : image;
};


const getProductOldPrice = (product) =>
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

const normalizeWishlistItem = (product) => {
  const id = getProductId(product);

  return {
    ...product,
    id,
    _id: product?._id || id,
    name:
      product?.name ||
      product?.productName ||
      product?.title ||
      "Darsh Saree",
    productName:
      product?.productName ||
      product?.name ||
      product?.title ||
      "Darsh Saree",
    image:
      product?.image ||
      product?.images?.[0] ||
      product?.img ||
      "/IMG/saree.png",
    price: Number(product?.price || 0),
    oldPrice: getProductOldPrice(product),
  };
};

const showWishlistMessage = (message) => {
  // Prefer the app's existing toast event if another component listens for it.
  try {
    window.dispatchEvent(
      new CustomEvent("darsh-toast", {
        detail: {
          message,
          type: "success",
        },
      })
    );
  } catch {
    // Ignore notification-only failures; wishlist state must still work.
  }
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

const PriceProductCard = ({
  product,
  url,
  index,
  onWishlistChange,
}) => {
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

    return () =>
      window.removeEventListener(
        "darsh-wishlist-updated",
        syncWishlist
      );
  }, [productId]);

  if (!product) return null;

  const name = getProductName(product);
  const price = Number(product?.price || 0);
  const oldPrice = getProductOldPrice(product);
  const image = getProductImage(product, url);
  const premium = isPremiumProduct(product);
  const rating = Number(product?.rating || 0);
  const reviews = Number(product?.reviews || 0);

  const discount =
    oldPrice > price
      ? Math.round(
          ((oldPrice - price) / oldPrice) * 100
        )
      : null;

  const productLink = productId
    ? `/productDetails/${productId}`
    : "/allproducts";

  const toggleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) {
      showWishlistMessage("Product ID not available");
      return;
    }

    try {
      const items = readWishlist();

      const exists = items.some(
        (item) =>
          String(getProductId(item)) ===
          String(productId)
      );

      const updated = exists
        ? items.filter(
            (item) =>
              String(getProductId(item)) !==
              String(productId)
          )
        : [...items, normalizeWishlistItem(product)];

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updated)
      );

      setIsWishlisted(!exists);

      window.dispatchEvent(
        new Event("darsh-wishlist-updated")
      );

      if (onWishlistChange) {
        onWishlistChange();
      }

      showWishlistMessage(
        exists
          ? "Removed from wishlist"
          : "Added to wishlist"
      );
    } catch {
      showWishlistMessage("Unable to update wishlist");
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.035, 0.18),
      }}
      whileHover={{ y: -4 }}
      className="group relative w-full text-[#3f1616]"
    >
      <div className="relative overflow-hidden bg-[#eee5d5]">
        <Link
          to={productLink}
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
          className="relative block aspect-[3/4] overflow-hidden"
        >
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-[1.045]"
            onError={(event) => {
              event.currentTarget.src = "/IMG/saree.png";
            }}
          />

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3f1616]/25 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

          <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-2">
            {product?.isNew && (
              <span className="bg-[#d4ad54] px-2.5 py-1.5 text-[7px] uppercase tracking-[0.18em] text-[#4a211f]">
                New
              </span>
            )}

           
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fffdf8]/95 px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.12em] text-[#741522] shadow-sm backdrop-blur-md">
                <Truck size={9} />
            Free shipping
              </span>
          
          </div>

          <span className="absolute bottom-3 left-3 z-10 ">
           
          </span>

          {premium && (
            <span className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full border border-[#c9a24a]/50 bg-[#fffdf8]/95 px-2.5 py-1.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#741522] shadow-sm backdrop-blur-md">
              <Crown size={10} className="text-[#c9a24a]" />
              Premium
            </span>
          )}

          <motion.button
            type="button"
            onClick={toggleWishlist}
            whileTap={{ scale: 0.86 }}
            whileHover={{ scale: 1.05 }}
            aria-label={
              isWishlisted
                ? "Remove from wishlist"
                : "Add to wishlist"
            }
            aria-pressed={isWishlisted}
            className="absolute right-3 top-3 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-white/60 bg-[#fffdf8]/95 text-[#741522] shadow-lg backdrop-blur-md transition hover:bg-[#741522] hover:text-white"
          >
            <motion.span
              animate={
                isWishlisted
                  ? {
                      scale: [1, 1.25, 1],
                      rotate: [0, -8, 8, 0],
                    }
                  : { scale: 1 }
              }
              transition={{ duration: 0.35 }}
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

          <div className="absolute inset-x-0 bottom-0 flex translate-y-3 justify-end p-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:p-4">
            <span className="inline-flex items-center gap-2 bg-[#f8f4eb] px-3 py-2 text-[7px] uppercase tracking-[0.18em] text-[#741522] shadow-sm">
              View
              <ArrowUpRight size={13} />
            </span>
          </div>
        </Link>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={productLink}
            onClick={() =>
              window.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth",
              })
            }
            className="min-w-0"
          >
            <h3 className="line-clamp-2 font-serif text-[16px] leading-[1.2] text-[#3f1616] transition-colors group-hover:text-[#741522] sm:text-[18px]">
              {name}
            </h3>
          </Link>

          <div className="shrink-0 text-right">
            <div className="whitespace-nowrap text-[11px] text-[#3f1616] sm:text-[12px]">
              ₹{price.toLocaleString("en-IN")}
            </div>

            {oldPrice > price && (
              <div className="mt-0.5 whitespace-nowrap text-[9px] text-[#9c8980] line-through">
                ₹{oldPrice.toLocaleString("en-IN")}
              </div>
            )}
          </div>
        </div>

        {(product?.fabric ||
          product?.category ||
          product?.subCategory) && (
          <p className="mt-2 truncate text-[7px] uppercase tracking-[0.16em] text-[#927c71] sm:text-[8px]">
            {product?.fabric ||
              product?.subCategory ||
              product?.category}
          </p>
        )}

        {rating > 0 && (
          <div className="mt-2 flex items-center gap-2">
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

        <div className="mt-2.5 flex items-center gap-1.5 text-[6px] uppercase tracking-[0.12em] text-[#977e73]">
          <Check size={10} className="text-[#741522]" />
          {premium
            ? "Premium edit • Free shipping"
            : "Free shipping • Secure checkout"}
        </div>

        <Link
          to={productLink}
          className="mt-3 inline-flex items-center gap-1.5 text-[7px] uppercase tracking-[0.2em] text-[#741522] opacity-70 transition hover:opacity-100 sm:hidden"
        >
          View piece
          <ArrowUpRight size={11} />
        </Link>
      </div>

      <div className="absolute bottom-0 left-0 h-px w-0 bg-[#d4ad54] transition-all duration-700 group-hover:w-full" />
    </motion.article>
  );
};

const PriceRange = () => {
  const { allProduct, url } = useAppContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = Array.isArray(allProduct) && allProduct.length
    ? allProduct
    : fallbackProducts;

  const queryRange = searchParams.get("range");
  const initialRange = PRICE_RANGES.some((item) => item.id === queryRange)
    ? queryRange
    : "under-2000";

  const [selectedRange, setSelectedRange] = useState(initialRange);
  const [sort, setSort] = useState("low");
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [wishlistVersion, setWishlistVersion] = useState(0);

  useEffect(() => {
    const sync = () =>
      setWishlistVersion((value) => value + 1);

    window.addEventListener(
      "darsh-wishlist-updated",
      sync
    );

    return () =>
      window.removeEventListener(
        "darsh-wishlist-updated",
        sync
      );
  }, []);

  const selected = PRICE_RANGES.find((item) => item.id === selectedRange);

  const filteredProducts = useMemo(() => {
    if (!selected) return [];

    const result = products.filter((product) => {
      const price = Number(product?.price || 0);
      const inRange =
        price >= selected.min &&
        price <= selected.max;

      return (
        inRange &&
        (!premiumOnly ||
          isPremiumProduct(product))
      );
    });

    return [...result].sort((a, b) => {
      const aPrice = Number(a?.price || 0);
      const bPrice = Number(b?.price || 0);
      return sort === "high" ? bPrice - aPrice : aPrice - bPrice;
    });
  }, [products, selected, sort]);

  const premiumProducts = useMemo(
    () => products.filter(isPremiumProduct),
    [products]
  );

  const wishlistCount = useMemo(() => {
    void wishlistVersion;
    return readWishlist().length;
  }, [wishlistVersion]);

  const selectRange = (id) => {
    setSelectedRange(id);
    setSearchParams({ range: id });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#f8f4eb] text-[#3f1616]">
      <section className="relative overflow-hidden bg-[#741522] px-4 pb-12 pt-10 text-white sm:px-6 sm:pb-16 sm:pt-14">
        <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full border border-[#d4ad54]/20" />

        <div className="relative mx-auto max-w-[1240px]">
          <div className="flex items-center justify-between gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[7px] uppercase tracking-[0.2em] text-white/70 transition hover:text-white"
            >
              <ArrowLeft size={12} />
              Back to home
            </Link>

            <Link
              to="/wishlist"
              className="inline-flex items-center gap-2 border border-white/20 bg-white/5 px-3 py-2 text-[7px] uppercase tracking-[0.14em] text-white transition hover:bg-white hover:text-[#741522]"
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

          <div className="mt-8 max-w-2xl">
            <p className="text-[8px] uppercase tracking-[0.35em] text-[#f4d98a]">
              DARSH CURATED COLLECTION
            </p>
            <h1 className="mt-3 font-serif text-[38px] leading-[0.95] sm:text-[58px]">
              Shop by price
            </h1>
            <p className="mt-4 max-w-xl text-[10px] leading-5 text-white/70 sm:text-[11px]">
              Find a beautiful Darsh weave within your preferred budget. Select
              a range below to instantly explore the live collection.
            </p>
          </div>
        </div>
      </section>

      <section className="sticky top-0 z-20 border-b border-[#741522]/10 bg-[#fffaf2]/95 px-4 py-3 backdrop-blur sm:px-6">
        <div className="mx-auto max-w-[1240px]">
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:overflow-visible sm:px-0"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {PRICE_RANGES.map((range) => {
              const count = products.filter((product) => {
                const price = Number(product?.price || 0);
                return price >= range.min && price <= range.max;
              }).length;

              const active = selectedRange === range.id;

              return (
                <button
                  key={range.id}
                  type="button"
                  onClick={() => selectRange(range.id)}
                  className={`min-w-[145px] shrink-0 border px-3 py-3 text-left transition-all sm:min-w-0 ${
                    active
                      ? "border-[#741522] bg-[#741522] text-white shadow-md"
                      : "border-[#741522]/10 bg-[#f8f4eb] hover:border-[#741522]/30"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <ShoppingBag size={13} className={active ? "text-[#f4d98a]" : "text-[#741522]"} />
                    <span className={`text-[6px] uppercase tracking-[0.1em] ${active ? "text-[#f4d98a]" : "text-[#977e73]"}`}>
                      {count} items
                    </span>
                  </div>
                  <p className="mt-2 font-serif text-[17px]">{range.label}</p>
                  <p className={`mt-1 text-[7px] ${active ? "text-white/60" : "text-[#977e73]"}`}>
                    {range.note}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1240px] px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div className="flex flex-col gap-5 border-b border-[#741522]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[7px] uppercase tracking-[0.25em] text-[#977e73]">
              CURRENT RANGE
            </p>
            <div className="mt-1.5 flex flex-wrap items-center gap-3">
              <h2 className="font-serif text-[28px] leading-none sm:text-[36px]">
                {selected?.label}
              </h2>

             
            </div>
            <p className="mt-2 text-[9px] text-[#977e73]">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1 ? "product" : "products"} available
            </p>
          </div>


          <label className="flex w-full items-center justify-between gap-3 border border-[#741522]/15 bg-[#fffdf8] px-3 py-2.5 sm:w-auto">
            <span className="flex items-center gap-2 text-[7px] uppercase tracking-[0.13em] text-[#977e73]">
              <SlidersHorizontal size={12} />
              Sort
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
              className="bg-transparent text-[8px] font-semibold uppercase tracking-[0.1em] text-[#741522] outline-none"
            >
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </label>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filteredProducts.map((product, index) => (
              <PriceProductCard
                key={
                  getProductId(product) ||
                  `price-${index}`
                }
                product={product}
                url={url}
                index={index}
                onWishlistChange={() =>
                  setWishlistVersion(
                    (value) => value + 1
                  )
                }
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 border border-dashed border-[#741522]/20 bg-[#fffdf8] px-5 py-16 text-center">
            <ShoppingBag className="mx-auto h-9 w-9 text-[#c9a24a]" strokeWidth={1.2} />
            <h3 className="mt-4 font-serif text-[25px]">Nothing in this range yet</h3>
            <p className="mx-auto mt-2 max-w-md text-[10px] leading-5 text-[#977e73]">
              Try another price range and discover more from the current Darsh collection.
            </p>
          </div>
        )}

        {premiumProducts.length > 0 && (
          <section className="relative mt-14 overflow-hidden border border-[#d4ad54]/30 bg-[#3f1616] px-5 py-7 text-white sm:px-8 sm:py-9">
            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full border border-[#d4ad54]/20" />

            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <div className="flex items-center gap-2">
                  <Crown size={15} className="text-[#f4d98a]" />
                  <p className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#f4d98a]">
                    PREMIUM EDIT
                  </p>
                </div>

                <h3 className="mt-2 font-serif text-[27px] sm:text-[34px]">
                  Heritage pieces, elevated beautifully.
                </h3>

                <p className="mt-2 text-[9px] leading-5 text-white/65 sm:text-[10px]">
                  Discover premium and heritage-inspired sarees
                  from the live Darsh collection and save your
                  favourites to wishlist.
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  setPremiumOnly();
                  window.scrollTo({
                    top: 350,
                    behavior: "smooth",
                  });
                }}
                className="inline-flex shrink-0 items-center justify-center gap-2 bg-[#f4d98a] px-5 py-3 text-[7px] font-semibold uppercase tracking-[0.16em] text-[#3f1616] transition hover:bg-white"
              >
                View premium
                <ArrowRight size={12} />
              </button>
            </div>

            <div className="relative mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {premiumProducts
                .slice(0, 3)
                .map((product, index) => (
                  <Link
                    key={
                      getProductId(product) ||
                      `premium-${index}`
                    }
                    to={
                      getProductId(product)
                        ? `/productDetails/${getProductId(
                            product
                          )}`
                        : "/allproducts"
                    }
                    className="group overflow-hidden bg-white/5"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={getProductImage(
                          product,
                          url
                        )}
                        alt={getProductName(product)}
                        loading="lazy"
                        className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                        onError={(event) => {
                          event.currentTarget.src =
                            "/IMG/saree.png";
                        }}
                      />
                    </div>
                    <div className="p-3">
                      <p className="truncate font-serif text-[8px] text-white">
                        {getProductName(product)}
                      </p>
                      <p className="mt-1 text-[7px] text-[#f4d98a]">
                        ₹
                        {Number(
                          product?.price || 0
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </section>
        )}

        <div className="mt-10 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            [Truck, "Free shipping", "Every product"],
            [ShieldCheck, "Secure checkout", "Protected ordering"],
            [Gift, "Gift ready", "Beautifully packed"],
          ].map(([Icon, title, text]) => (
            <div
              key={title}
              className="flex items-center gap-3 border border-[#741522]/10 bg-[#fffdf8] px-4 py-4"
            >
              <Icon className="h-5 w-5 text-[#741522]" strokeWidth={1.25} />
              <div>
                <p className="text-[8px] font-semibold uppercase tracking-[0.14em]">{title}</p>
                <p className="mt-1 text-[8px] text-[#977e73]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            to="/allproducts"
            className="group inline-flex items-center gap-2 bg-[#741522] px-6 py-3 text-[7px] uppercase tracking-[0.2em] text-white transition hover:bg-[#5d0f18]"
          >
            Explore all products
            <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PriceRange;