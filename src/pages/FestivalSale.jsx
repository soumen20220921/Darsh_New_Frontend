import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowDownUp,
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Clock3,
  Filter,
  Flame,
  Heart,
  RotateCcw,
  Search,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
  X,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAppContext } from "../context/AppContext.jsx";

/* =========================================================
   FESTIVAL SETTINGS
========================================================= */

const FESTIVAL_CONFIG = {
  festivalName: "Special For Rakshabandhan",
  title: "Rakshabandhan Sale",
  offer: "60% OFF",
  subtitle:
    "Celebrate the beautiful bond of Rakhi with exclusive Darsh sarees.",
  image: "/IMG/festival.png",

  // Raksha Bandhan 2026 — Friday, August 28, 2026.
  // Sale closes at 11:59:59 PM IST.
  saleEndsAt: "2026-08-28T23:59:59+05:30",
  saleEndText: "Sale ends Friday, August 28, 2026 at 11:59 PM IST",
  festivalDateText: "Raksha Bandhan • Friday, August 28, 2026",
};

/* =========================================================
   PRODUCT HELPERS
========================================================= */

const getProductId = (product) =>
  product?._id ||
  product?.id ||
  product?.productId ||
  product?.product_id ||
  null;

const getProductName = (product) =>
  product?.productName ||
  product?.name ||
  product?.title ||
  "Darsh Saree";

const getProductPrice = (product) => {
  const price = Number(
    product?.price ??
      product?.sellingPrice ??
      product?.salePrice ??
      0
  );

  return Number.isFinite(price) ? price : 0;
};

const getOriginalPrice = (product) => {
  const values = [
    product?.originalPrice,
    product?.oldPrice,
    product?.oldprice,
    product?.mrp,
    product?.MRP,
    product?.regularPrice,
    product?.compareAtPrice,
  ];

  for (const value of values) {
    const number = Number(value);

    if (
      Number.isFinite(number) &&
      number > 0
    ) {
      return number;
    }
  }

  return 0;
};

/* =========================================================
   DISCOUNT CALCULATOR
========================================================= */

const getProductDiscount = (product) => {
  const explicitValues = [
    product?.discount,
    product?.discountPercentage,
    product?.discountPercent,
    product?.offerPercentage,
    product?.offerPercent,
    product?.salePercentage,
    product?.salePercent,
  ];

  for (const value of explicitValues) {
    if (
      typeof value === "string" &&
      value.includes("%")
    ) {
      const parsed = Number(
        value.replace("%", "").trim()
      );

      if (
        Number.isFinite(parsed) &&
        parsed >= 0 &&
        parsed <= 100
      ) {
        return Math.round(parsed);
      }
    }

    const parsed = Number(value);

    if (
      Number.isFinite(parsed) &&
      parsed >= 0 &&
      parsed <= 100
    ) {
      return Math.round(parsed);
    }
  }

  /* Fallback: calculate from MRP/original price */

  const originalPrice =
    getOriginalPrice(product);

  const price = getProductPrice(product);

  if (
    originalPrice > 0 &&
    price >= 0 &&
    price < originalPrice
  ) {
    return Math.round(
      ((originalPrice - price) /
        originalPrice) *
        100
    );
  }

  return 0;
};

/* =========================================================
   STOCK HELPERS
========================================================= */

const getStock = (product) => {
  const values = [
    product?.stock,
    product?.quantity,
    product?.inventory,
    product?.availableQuantity,
  ];

  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      const parsed = Number(value);

      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
  }

  return null;
};

const isOutOfStock = (product) => {
  const stock = getStock(product);

  return stock !== null && stock <= 0;
};

/* =========================================================
   IMAGE HELPER
========================================================= */

const getProductImage = (product, url) => {
  const fallback = "/IMG/saree.png";

  if (!product) {
    return fallback;
  }

  let image =
    product?.image ||
    product?.img ||
    product?.thumbnail ||
    product?.mainImage ||
    null;

  if (!image) {
    if (
      Array.isArray(product?.images) &&
      product.images.length > 0
    ) {
      image = product.images[0];
    }
  }

  if (!image) {
    return fallback;
  }

  image = String(image);

  if (
    image.startsWith("http://") ||
    image.startsWith("https://") ||
    image.startsWith("data:")
  ) {
    return image;
  }

  if (image.startsWith("/")) {
    return image;
  }

  if (url) {
    return `${url}/img/${image}`;
  }

  return image;
};

/* =========================================================
   COLOR HELPERS
========================================================= */

const getProductColor = (product) => {
  const color =
    product?.color ||
    product?.colour ||
    product?.productColor ||
    "";

  return String(color).trim();
};

/* =========================================================
   WISHLIST
========================================================= */

const WISHLIST_KEY = "wishlist";

const readWishlist = () => {
  try {
    const raw =
      localStorage.getItem(WISHLIST_KEY);

    if (!raw) return [];

    const parsed = JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem(
      WISHLIST_KEY,
      JSON.stringify(items)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    window.dispatchEvent(
      new Event("darsh-wishlist-updated")
    );
  } catch {
    // Ignore localStorage errors.
  }
};

/* =========================================================
   WISHLIST BUTTON
========================================================= */

const WishlistButton = ({ product }) => {
  const id = getProductId(product);

  const [liked, setLiked] = useState(() => {
    if (!id) return false;

    return readWishlist().some(
      (item) =>
        String(getProductId(item)) ===
        String(id)
    );
  });

  useEffect(() => {
    const syncWishlist = () => {
      if (!id) return;

      const items = readWishlist();

      setLiked(
        items.some(
          (item) =>
            String(getProductId(item)) ===
            String(id)
        )
      );
    };

    window.addEventListener(
      "wishlistUpdated",
      syncWishlist
    );

    window.addEventListener(
      "darsh-wishlist-updated",
      syncWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        syncWishlist
      );

      window.removeEventListener(
        "darsh-wishlist-updated",
        syncWishlist
      );
    };
  }, [id]);

  const handleWishlist = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!id) return;

    const current = readWishlist();

    const exists = current.some(
      (item) =>
        String(getProductId(item)) ===
        String(id)
    );

    let next;

    if (exists) {
      next = current.filter(
        (item) =>
          String(getProductId(item)) !==
          String(id)
      );
    } else {
      next = [
        ...current,
        {
          ...product,
          id:
            product?.id ||
            product?._id ||
            id,
          _id:
            product?._id ||
            product?.id ||
            id,
          name: getProductName(product),
          productName: getProductName(product),
          price: getProductPrice(product),
          image:
            product?.image ||
            product?.images?.[0] ||
            "/IMG/saree.png",
        },
      ];
    }

    saveWishlist(next);
    setLiked(!exists);
  };

  if (!id) return null;

  return (
    <motion.button
      type="button"
      onClick={handleWishlist}
      whileTap={{ scale: 0.82 }}
      whileHover={{ scale: 1.08 }}
      aria-label={
        liked
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      className={`absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-md transition-all ${
        liked
          ? "border-[#741522] bg-[#741522] text-white"
          : "border-white/80 bg-white/90 text-[#741522]"
      }`}
    >
      <Heart
        size={16}
        fill={
          liked
            ? "currentColor"
            : "none"
        }
      />
    </motion.button>
  );
};

/* =========================================================
   FESTIVAL COUNTDOWN
========================================================= */

const getCountdown = (targetDate) => {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const difference = target - now;

  if (!Number.isFinite(target) || difference <= 0) {
    return {
      expired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return {
    expired: false,
    days,
    hours,
    minutes,
    seconds,
  };
};

/* =========================================================
   COUNTDOWN BOX
========================================================= */

const CountdownBox = ({ value, label }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35 }}
      className="relative flex h-[58px] w-[58px] items-center justify-center sm:h-[68px] sm:w-[68px] md:h-[76px] md:w-[76px]"
    >
      <div className="absolute inset-0 rounded-full border border-[#741522]/20" />
      <div className="absolute inset-[3px] rounded-full border border-dashed border-[#741522]/20" />

      <div className="relative z-10 flex h-[45px] w-[45px] flex-col items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(116,21,34,.10)] sm:h-[54px] sm:w-[54px] md:h-[60px] md:w-[60px]">
        <motion.span
          key={value}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-[16px] font-bold leading-none text-[#741522] sm:text-[20px] md:text-[22px]"
        >
          {String(value).padStart(2, "0")}
        </motion.span>

        <span className="mt-1 text-[5px] font-semibold uppercase tracking-[0.12em] text-[#977e73] sm:text-[6px]">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

/* =========================================================
   PRODUCT CARD
========================================================= */

const SaleProductCard = ({
  product,
  url,
  index,
}) => {
  const id = getProductId(product);

  const name = getProductName(product);

  const image = getProductImage(
    product,
    url
  );

  const price = getProductPrice(product);

  const originalPrice =
    getOriginalPrice(product);

  const discount =
    getProductDiscount(product);

  const stock = getStock(product);

  const outOfStock =
    isOutOfStock(product);

  const color =
    getProductColor(product);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 28,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.08,
      }}
      transition={{
        duration: 0.45,
        delay: Math.min(
          index * 0.035,
          0.2
        ),
      }}
      className="group min-w-0"
    >
      <Link
        to={`/productDetails/${id}`}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-[5px] border border-[#d9cec0] bg-[#eee5d5]">
          <div className="relative aspect-[0.82] overflow-hidden">
            <WishlistButton
              product={product}
            />

            <img
              src={image}
              alt={`${name} - ${discount}% OFF`}
              loading={
                index > 5
                  ? "lazy"
                  : "eager"
              }
              onError={(event) => {
                if (
                  event.currentTarget.src.endsWith(
                    "/IMG/saree.png"
                  )
                ) {
                  return;
                }

                event.currentTarget.src =
                  "/IMG/saree.png";
              }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />

            {/* Image bottom gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 to-transparent" />

            {/* 60% Badge */}
            <div className="absolute left-2.5 top-2.5 flex min-h-[46px] min-w-[46px] flex-col items-center justify-center rounded-full bg-[#741522] text-white shadow-lg sm:left-3 sm:top-3 sm:min-h-[52px] sm:min-w-[52px]">
              <span className="text-[12px] font-bold leading-none sm:text-[14px]">
                {discount}%
              </span>

              <span className="mt-0.5 text-[5px] font-medium uppercase tracking-[0.14em] sm:text-[6px]">
                OFF
              </span>
            </div>

            {/* Limited Sale */}
            <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 rounded-sm bg-white/95 px-2 py-1.5 text-[5px] font-bold uppercase tracking-[0.14em] text-[#741522] shadow-md sm:bottom-3 sm:left-3 sm:text-[6px]">
              <Zap size={8} />
              60%+ Festival Sale
            </div>

            {outOfStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/45">
                <span className="bg-white px-4 py-2 text-[7px] font-bold uppercase tracking-[0.18em] text-[#741522]">
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* PRODUCT INFO */}
        <div className="px-0.5 pt-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="truncate text-[11px] font-medium leading-5 text-[#3f1616] transition-colors group-hover:text-[#741522] sm:text-[13px]">
                {name}
              </h3>

              
            </div>
          </div>

          {/* Price */}
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-[#741522] sm:text-[13px]">
              ₹
              {price.toLocaleString(
                "en-IN"
              )}
            </span>

            {originalPrice >
              price && (
              <span className="text-[8px] text-[#8f8179] line-through sm:text-[9px]">
                ₹
                {originalPrice.toLocaleString(
                  "en-IN"
                )}
              </span>
            )}

            <span className="text-[7px] font-semibold text-[#198754] sm:text-[8px]">
              {discount}% off
            </span>
          </div>

        </div>
      </Link>
    </motion.article>
  );
};

/* =========================================================
   FILTER SECTION
========================================================= */

const FilterSection = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [open, setOpen] =
    useState(defaultOpen);

  return (
    <div className="border-b border-[#d9cec0] py-5 first:pt-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <span className="text-[10px] font-semibold text-[#3f1616]">
          {title}
        </span>

        {open ? (
          <ChevronUp
            size={13}
            className="text-[#806c63]"
          />
        ) : (
          <ChevronDown
            size={13}
            className="text-[#806c63]"
          />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
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
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* =========================================================
   FILTER SIDEBAR
========================================================= */

const FilterSidebar = ({
  products,
  selectedAvailability,
  setSelectedAvailability,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedColors,
  setSelectedColors,
  maxAvailablePrice,
  onReset,
}) => {
  const colorCounts = useMemo(() => {
    const counts = {};

    products.forEach((product) => {
      const color =
        getProductColor(product);

      if (!color) return;

      counts[color] =
        (counts[color] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);
  }, [products]);

  const toggleColor = (color) => {
    setSelectedColors((current) =>
      current.includes(color)
        ? current.filter(
            (item) => item !== color
          )
        : [...current, color]
    );
  };

  return (
    <aside className="w-full">
      {/* Availability */}
      <FilterSection title="Availability">
        <button
          type="button"
          onClick={onReset}
          className="mb-4 text-[7px] text-[#806c63] underline underline-offset-2"
        >
          Reset
        </button>

        <label className="flex cursor-pointer items-center gap-2 py-1.5">
          <input
            type="radio"
            name="availability"
            checked={
              selectedAvailability ===
              "all"
            }
            onChange={() =>
              setSelectedAvailability(
                "all"
              )
            }
            className="accent-[#741522]"
          />

          <span className="text-[8px] text-[#5e504a]">
            All ({products.length})
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 py-1.5">
          <input
            type="radio"
            name="availability"
            checked={
              selectedAvailability ===
              "in"
            }
            onChange={() =>
              setSelectedAvailability(
                "in"
              )
            }
            className="accent-[#741522]"
          />

          <span className="text-[8px] text-[#5e504a]">
            In stock (
            {
              products.filter(
                (product) =>
                  !isOutOfStock(
                    product
                  )
              ).length
            }
            )
          </span>
        </label>

        <label className="flex cursor-pointer items-center gap-2 py-1.5">
          <input
            type="radio"
            name="availability"
            checked={
              selectedAvailability ===
              "out"
            }
            onChange={() =>
              setSelectedAvailability(
                "out"
              )
            }
            className="accent-[#741522]"
          />

          <span className="text-[8px] text-[#5e504a]">
            Out of stock (
            {
              products.filter(
                (product) =>
                  isOutOfStock(
                    product
                  )
              ).length
            }
            )
          </span>
        </label>
      </FilterSection>

      {/* Price */}
      <FilterSection title="Price">
        <button
          type="button"
          onClick={() => {
            setMinPrice(0);
            setMaxPrice(
              maxAvailablePrice
            );
          }}
          className="mb-4 text-[7px] text-[#806c63] underline underline-offset-2"
        >
          Reset
        </button>

        <div className="mb-4 flex items-center justify-between text-[8px] text-[#806c63]">
          <span>
            ₹
            {minPrice.toLocaleString(
              "en-IN"
            )}
          </span>

          <span>
            ₹
            {maxPrice.toLocaleString(
              "en-IN"
            )}
          </span>
        </div>

        <input
          type="range"
          min="0"
          max={maxAvailablePrice || 1}
          value={minPrice}
          onChange={(event) => {
            const value =
              Number(event.target.value);

            setMinPrice(
              Math.min(
                value,
                maxPrice
              )
            );
          }}
          className="mb-3 h-1 w-full cursor-pointer accent-[#741522]"
        />

        <input
          type="range"
          min="0"
          max={maxAvailablePrice || 1}
          value={maxPrice}
          onChange={(event) => {
            const value =
              Number(event.target.value);

            setMaxPrice(
              Math.max(
                value,
                minPrice
              )
            );
          }}
          className="h-1 w-full cursor-pointer accent-[#741522]"
        />

        <p className="mt-3 text-[7px] text-[#806c63]">
          Price: Rs.{" "}
          {minPrice.toLocaleString(
            "en-IN"
          )}{" "}
          – Rs.{" "}
          {maxPrice.toLocaleString(
            "en-IN"
          )}
        </p>
      </FilterSection>

      {/* Discount */}
      <FilterSection title="Festival Offer">
        <div className="rounded-md border border-[#741522]/10 bg-[#f8f1e7] p-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#741522] text-[#f4d98a]">
              <Tag size={12} />
            </span>

            <div>
              <p className="text-[8px] font-bold text-[#741522]">
                60% OFF & ABOVE
              </p>

              <p className="mt-1 text-[6px] text-[#806c63]">
                Only qualifying products
              </p>
            </div>
          </div>
        </div>
      </FilterSection>

      
    </aside>
  );
};

/* =========================================================
   MAIN FESTIVAL SALE PAGE
========================================================= */

const FestivalSale = () => {
  const {
    allProduct,
    url,
  } = useAppContext();

  /* -------------------------------------------------------
     Countdown
  ------------------------------------------------------- */

  const [countdown, setCountdown] =
    useState(() =>
      getCountdown(
        FESTIVAL_CONFIG.saleEndsAt
      )
    );

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(
        getCountdown(
          FESTIVAL_CONFIG.saleEndsAt
        )
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  /* -------------------------------------------------------
     UI state
  ------------------------------------------------------- */

  const [mobileFiltersOpen, setMobileFiltersOpen] =
    useState(false);

  const [sort, setSort] =
    useState("featured");

  const [search, setSearch] =
    useState("");

  const [selectedAvailability, setSelectedAvailability] =
    useState("all");

  const [selectedColors, setSelectedColors] =
    useState([]);

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(0);

  /* -------------------------------------------------------
     Base 60%+ products
  ------------------------------------------------------- */

  const saleProducts = useMemo(() => {
    if (!Array.isArray(allProduct)) {
      return [];
    }

    const filtered =
      allProduct.filter(
        (product) =>
          getProductDiscount(
            product
          ) >= 60
      );

    /* Remove duplicate products */

    return filtered.filter(
      (product, index, array) =>
        array.findIndex(
          (item) =>
            String(
              getProductId(item)
            ) ===
            String(
              getProductId(product)
            )
        ) === index
    );
  }, [allProduct]);

  /* -------------------------------------------------------
     Price boundaries
  ------------------------------------------------------- */

  const maxAvailablePrice =
    useMemo(() => {
      if (!saleProducts.length) {
        return 50000;
      }

      const max = Math.max(
        ...saleProducts.map(
          getProductPrice
        )
      );

      return Math.max(
        1000,
        Math.ceil(max / 1000) *
          1000
      );
    }, [saleProducts]);

  /* Set initial max price */

  useEffect(() => {
    setMaxPrice(
      maxAvailablePrice
    );
  }, [maxAvailablePrice]);

  /* -------------------------------------------------------
     Filter + Search
  ------------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    let result = [
      ...saleProducts,
    ];

    /* Search */

    const searchValue =
      search.trim().toLowerCase();

    if (searchValue) {
      result = result.filter(
        (product) => {
          const searchable = [
            getProductName(product),
            product?.category,
            product?.subCategory,
            product?.fabric,
            getProductColor(product),
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

          return searchable.includes(
            searchValue
          );
        }
      );
    }

    /* Availability */

    if (
      selectedAvailability ===
      "in"
    ) {
      result = result.filter(
        (product) =>
          !isOutOfStock(product)
      );
    }

    if (
      selectedAvailability ===
      "out"
    ) {
      result = result.filter(
        (product) =>
          isOutOfStock(product)
      );
    }

    /* Price */

    result = result.filter(
      (product) => {
        const price =
          getProductPrice(product);

        return (
          price >= minPrice &&
          price <= maxPrice
        );
      }
    );

    /* Color */

    if (selectedColors.length) {
      result = result.filter(
        (product) =>
          selectedColors.includes(
            getProductColor(product)
          )
      );
    }

    /* Sorting */

    if (sort === "price-low") {
      result.sort(
        (a, b) =>
          getProductPrice(a) -
          getProductPrice(b)
      );
    }

    if (sort === "price-high") {
      result.sort(
        (a, b) =>
          getProductPrice(b) -
          getProductPrice(a)
      );
    }

    if (sort === "discount") {
      result.sort(
        (a, b) =>
          getProductDiscount(b) -
          getProductDiscount(a)
      );
    }

    if (sort === "newest") {
      result.sort((a, b) => {
        const dateA = new Date(
          a?.createdAt ||
            a?.createdDate ||
            0
        ).getTime();

        const dateB = new Date(
          b?.createdAt ||
            b?.createdDate ||
            0
        ).getTime();

        return dateB - dateA;
      });
    }

    return result;
  }, [
    saleProducts,
    search,
    selectedAvailability,
    minPrice,
    maxPrice,
    selectedColors,
    sort,
  ]);

  /* -------------------------------------------------------
     Reset filters
  ------------------------------------------------------- */

  const resetFilters = () => {
    setSelectedAvailability("all");
    setSelectedColors([]);
    setMinPrice(0);
    setMaxPrice(
      maxAvailablePrice
    );
    setSearch("");
  };

  /* -------------------------------------------------------
     Highest discount
  ------------------------------------------------------- */

  const highestDiscount =
    useMemo(() => {
      if (!saleProducts.length) {
        return 60;
      }

      return Math.max(
        60,
        ...saleProducts.map(
          getProductDiscount
        )
      );
    }, [saleProducts]);

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-[#3f1616]">
      {/* =================================================
          TOP HEADING
      ================================================= */}

      <section className="border-b border-[#eee7df] bg-white">
        <div className="mx-auto max-w-[1240px] px-4 pb-3 pt-5 text-center sm:px-6 sm:pt-7">
          <div className="mb-2 flex items-center justify-center gap-2">
            <Sparkles
              size={12}
              className="text-[#741522]"
            />

            <span className="text-[7px] uppercase tracking-[0.28em] text-[#977e73]">
              DARSH FESTIVAL EDIT
            </span>

            <Sparkles
              size={12}
              className="text-[#741522]"
            />
          </div>

          <h1 className="font-serif text-[21px] text-[#3f1616] sm:text-[27px]">
            {FESTIVAL_CONFIG.festivalName}
          </h1>

          <p className="mt-1 text-[7px] uppercase tracking-[0.18em] text-[#977e73]">
            Exclusive 60% OFF collection
          </p>
        </div>
      </section>

     {/* =========================================================
    FESTIVAL HERO BANNER — COMPACT RESPONSIVE
========================================================= */}

<section className="px-3 py-2 ">
  <div className="mx-auto">
    <div
      className="
        group
        relative
        isolate
        min-h-[135px]
        overflow-hidden
        rounded-[8px]
        bg-[#421326]
        shadow-[0_10px_30px_rgba(63,22,22,0.14)]
        sm:min-h-[160px]
        md:min-h-[180px]
        lg:min-h-[195px]
        xl:min-h-[210px]
      "
    >
      {/* BACKGROUND IMAGE */}
      <img
        src={FESTIVAL_CONFIG.image}
        alt="Darsh Rakshabandhan 60 percent sale"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
          object-center
          scale-[0.92]
          transition-transform
          duration-[1400ms]
          ease-out
          group-hover:scale-[0.96]
        "
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />

      {/* DARK OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-r
          from-[#32101f]/95
          via-[#421326]/70
          to-[#421326]/10
        "
      />

      {/* MOBILE OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#2d0e1c]/45
          via-transparent
          to-transparent
          md:hidden
        "
      />

      {/* GOLD LIGHT */}
      <div
        className="
          pointer-events-none
          absolute
          -left-20
          top-1/2
          h-[150px]
          w-[150px]
          -translate-y-1/2
          rounded-full
          bg-[#e8c866]/10
          blur-[45px]
          sm:h-[200px]
          sm:w-[200px]
        "
      />

      {/* SHINE */}
      <motion.div
        animate={{
          x: ["-130%", "170%"],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          repeatDelay: 4,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          inset-y-0
          left-0
          z-10
          w-[18%]
          skew-x-[-18deg]
          bg-gradient-to-r
          from-transparent
          via-white/[0.08]
          to-transparent
        "
      />

      {/* TOP LINE */}
      <div
        className="
          absolute
          left-4
          right-4
          top-3
          h-px
          bg-gradient-to-r
          from-transparent
          via-[#e8c866]/40
          to-transparent
          sm:left-7
          sm:right-7
          sm:top-4
        "
      />

      {/* MAIN CONTENT */}
      <div
        className="
          relative
          z-20
          flex
          min-h-[135px]
          items-center
          px-5
          py-4
          sm:min-h-[160px]
          sm:px-7
          sm:py-5
          md:min-h-[180px]
          md:px-9
          lg:min-h-[195px]
          lg:px-11
        "
      >
        <div
          className="
            w-full
            max-w-[500px]
            pr-[70px]
            sm:max-w-[560px]
            sm:pr-[85px]
            md:max-w-[620px]
            md:pr-[105px]
          "
        >
          {/* LABEL */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            <span
              className="
                h-px
                w-5
                bg-[#e9ca6c]
                sm:w-7
              "
            />

            <span
              className="
                text-[5px]
                font-semibold
                uppercase
                tracking-[0.25em]
                text-[#f0d890]
                sm:text-[6px]
                md:text-[7px]
              "
            >
              Rakshabandhan Special
            </span>
          </motion.div>

          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.05,
            }}
            className="
              mt-1.5
              font-serif
              text-[30px]
              font-medium
              leading-none
              tracking-[-0.035em]
              text-white
              sm:mt-2
              sm:text-[38px]
              md:text-[46px]
              lg:text-[52px]
            "
          >
            60%
            <span
              className="
                ml-1
                text-[#f0d477]
                sm:ml-2
              "
            >
              OFF
            </span>
          </motion.h2>

          {/* DIVIDER */}
          <motion.div
            initial={{
              opacity: 0,
              width: 0,
            }}
            animate={{
              opacity: 1,
              width: "100%",
            }}
            transition={{
              duration: 0.65,
              delay: 0.12,
            }}
            className="
              mt-2
              h-px
              max-w-[180px]
              bg-gradient-to-r
              from-[#e8c866]
              via-[#e8c866]/50
              to-transparent
              sm:mt-2.5
              sm:max-w-[240px]
              md:max-w-[280px]
            "
          />

          {/* DESCRIPTION */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.16,
            }}
            className="
              mt-2
              max-w-[350px]
              text-[6px]
              leading-[1.5]
              text-[#ead8c6]
              sm:mt-2.5
              sm:text-[7px]
              md:text-[8px]
              md:leading-[1.6]
            "
          >
            Celebrate the beautiful bond of love with Darsh.
            Explore our special Rakshabandhan collection with
            selected sarees available at{" "}
            <strong className="text-[#f0d477]">
              60% OFF and above.
            </strong>
          </motion.p>

          {/* OFFER */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.22,
            }}
            className="
              mt-2
              flex
              items-center
              gap-2
              sm:mt-3
              sm:gap-2.5
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-1
                rounded-full
                bg-[#f0d477]
                px-2.5
                py-1
                text-[5px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-[#421326]
                sm:px-3
                sm:py-1.5
                sm:text-[6px]
              "
            >
              <Zap size={7} />
              Minimum 60% OFF
            </span>

            <span
              className="
                hidden
                text-[5px]
                uppercase
                tracking-[0.12em]
                text-[#ead8c6]/75
                sm:block
                sm:text-[6px]
              "
            >
              Limited Collection
            </span>
          </motion.div>
        </div>

        
      </div>

      {/* BOTTOM GOLD LINE */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-30
          h-[1px]
          bg-gradient-to-r
          from-transparent
          via-[#e5c466]
          to-transparent
        "
      />
    </div>
  </div>
</section>

      {/* =================================================
          FESTIVAL COUNTDOWN
      ================================================= */}

      <section className="bg-white px-3 pb-7 pt-1 sm:pb-9 sm:pt-2">
        <div className="mx-auto max-w-[680px]">
          <div className="text-center">
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-7 bg-gradient-to-r from-transparent to-[#741522]/40 sm:w-10" />

              <div className="flex items-center gap-1.5">
                <Clock3 size={12} className="text-[#741522]" />
                <h3 className="font-serif text-[17px] font-semibold text-[#741522] sm:text-[21px]">
                  Sale Ends In
                </h3>
              </div>

              <span className="h-px w-7 bg-gradient-to-l from-transparent to-[#741522]/40 sm:w-10" />
            </div>

            <p className="mt-1.5 text-[6px] font-medium uppercase tracking-[0.16em] text-[#a08e84] sm:text-[7px]">
              {FESTIVAL_CONFIG.festivalDateText}
            </p>
          </div>

          {countdown.expired ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-4 max-w-[430px] rounded-xl border border-[#741522]/10 bg-[#f8f1e7] px-5 py-4 text-center shadow-sm"
            >
              <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-[#741522] text-white">
                <Clock3 size={14} />
              </div>

              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#741522]">
                Festival Sale Ended
              </p>

              <p className="mt-1.5 text-[6px] text-[#806c63]">
                Thank you for celebrating Raksha Bandhan with Darsh.
              </p>
            </motion.div>
          ) : (
            <>
              <div className="mt-3 flex items-center justify-center gap-1 sm:mt-4 sm:gap-2 md:gap-3">
                <CountdownBox value={countdown.days} label="Days" />

                <span className="-mt-3 text-[13px] font-bold text-[#741522]/35 sm:text-[16px]">
                  :
                </span>

                <CountdownBox value={countdown.hours} label="Hours" />

                <span className="-mt-3 text-[13px] font-bold text-[#741522]/35 sm:text-[16px]">
                  :
                </span>

                <CountdownBox value={countdown.minutes} label="Minutes" />

                <span className="-mt-3 text-[13px] font-bold text-[#741522]/35 sm:text-[16px]">
                  :
                </span>

                <CountdownBox value={countdown.seconds} label="Seconds" />
              </div>

              <div className="mt-3 flex items-center justify-center gap-1.5 text-center sm:mt-4">
                <span className="h-1 w-1 animate-pulse rounded-full bg-[#741522]" />

                <p className="text-[6px] font-medium uppercase tracking-[0.15em] text-[#a08e84] sm:text-[7px]">
                  Limited time · Limited collection
                </p>

                <span className="h-1 w-1 animate-pulse rounded-full bg-[#741522]" />
              </div>

              <p className="mt-1.5 text-center text-[5px] text-[#b2a39a] sm:text-[6px]">
                {FESTIVAL_CONFIG.saleEndText}
              </p>
            </>
          )}
        </div>
      </section>

      {/* =================================================
          PRODUCT AREA
      ================================================= */}

      <section className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        {/* Product heading */}
        <div className="mb-6 flex flex-col gap-4 border-b border-[#e2d8ce] pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Flame
                size={12}
                className="text-[#741522]"
              />

              <span className="text-[7px] font-semibold uppercase tracking-[0.25em] text-[#977e73]">
                RAKSHABANDHAN COLLECTION
              </span>
            </div>

            <h2 className="mt-2 font-serif text-[27px] text-[#3f1616] sm:text-[35px]">
              60% Sale
            </h2>

            <p className="mt-1 text-[8px] text-[#806c63] sm:text-[9px]">
              Showing only products with
              60% or more discount.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[7px] uppercase tracking-[0.14em] text-[#977e73]">
              {filteredProducts.length}{" "}
              Products
            </span>
          </div>
        </div>

        {/* =================================================
            MOBILE TOOLBAR
        ================================================= */}

        <div className="mb-5 flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() =>
              setMobileFiltersOpen(
                true
              )
            }
            className="flex h-10 flex-1 items-center justify-center gap-2 border border-[#d9cec0] bg-white text-[7px] font-semibold uppercase tracking-[0.15em] text-[#741522]"
          >
            <Filter size={13} />
            Filters
          </button>

          <select
            value={sort}
            onChange={(event) =>
              setSort(
                event.target.value
              )
            }
            className="h-10 flex-1 border border-[#d9cec0] bg-white px-3 text-[7px] uppercase tracking-[0.12em] text-[#741522] outline-none"
          >
            <option value="featured">
              Sort By
            </option>

            <option value="newest">
              Newest
            </option>

            <option value="discount">
              Highest Discount
            </option>

            <option value="price-low">
              Price Low
            </option>

            <option value="price-high">
              Price High
            </option>
          </select>
        </div>

        {/* =================================================
            DESKTOP GRID AREA
        ================================================= */}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[190px_minmax(0,1fr)] xl:grid-cols-[205px_minmax(0,1fr)]">
          {/* DESKTOP FILTER */}
          <div className="hidden lg:block">
            <FilterSidebar
              products={saleProducts}
              selectedAvailability={
                selectedAvailability
              }
              setSelectedAvailability={
                setSelectedAvailability
              }
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedColors={
                selectedColors
              }
              setSelectedColors={
                setSelectedColors
              }
              maxAvailablePrice={
                maxAvailablePrice
              }
              onReset={
                resetFilters
              }
            />
          </div>

          {/* PRODUCTS */}
          <div className="min-w-0">
            {/* Desktop controls */}
            <div className="mb-5 hidden items-center justify-between border-b border-[#eee5dc] pb-4 lg:flex">
              <div className="flex items-center gap-2">
                <Search
                  size={13}
                  className="text-[#977e73]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search festival sarees..."
                  className="w-[240px] border-0 bg-transparent text-[8px] text-[#3f1616] outline-none placeholder:text-[#a99a91]"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[7px] uppercase tracking-[0.15em] text-[#977e73]">
                  Sort By
                </span>

                <select
                  value={sort}
                  onChange={(
                    event
                  ) =>
                    setSort(
                      event.target
                        .value
                    )
                  }
                  className="h-9 border border-[#d9cec0] bg-white px-3 text-[7px] uppercase tracking-[0.12em] text-[#741522] outline-none"
                >
                  <option value="featured">
                    Featured
                  </option>

                  <option value="newest">
                    Newest
                  </option>

                  <option value="discount">
                    Highest Discount
                  </option>

                  <option value="price-low">
                    Price Low
                  </option>

                  <option value="price-high">
                    Price High
                  </option>
                </select>

                <ArrowDownUp
                  size={12}
                  className="text-[#977e73]"
                />
              </div>
            </div>

            {/* Search on mobile */}
            <div className="mb-5 flex items-center border border-[#e2d8ce] px-3 lg:hidden">
              <Search
                size={13}
                className="text-[#977e73]"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search sale sarees..."
                className="h-10 flex-1 border-0 bg-transparent px-2 text-[8px] outline-none placeholder:text-[#a99a91]"
              />
            </div>


            {/* Product grid */}
            {filteredProducts.length >
            0 ? (
              <div className="grid grid-cols-2 gap-x-2.5 gap-y-8 sm:grid-cols-3 sm:gap-x-4 sm:gap-y-10 xl:grid-cols-4 xl:gap-x-5">
                {filteredProducts.map(
                  (
                    product,
                    index
                  ) => (
                    <SaleProductCard
                      key={
                        getProductId(
                          product
                        ) ||
                        index
                      }
                      product={
                        product
                      }
                      url={url}
                      index={
                        index
                      }
                    />
                  )
                )}
              </div>
            ) : (
              /* EMPTY */
              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="flex min-h-[420px] flex-col items-center justify-center border border-dashed border-[#d9cec0] bg-[#fcfaf7] px-5 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#741522] text-[#f2d982]">
                  <ShoppingBag
                    size={24}
                  />
                </div>

                <h3 className="mt-5 font-serif text-[25px] text-[#3f1616]">
                  No 60% sale products
                  found
                </h3>

                <p className="mt-2 max-w-[430px] text-[9px] leading-5 text-[#806c63]">
                  {saleProducts.length >
                  0
                    ? "Try changing your filters or search."
                    : "Products with a discount of 60% or more will automatically appear here."}
                </p>

                <button
                  type="button"
                  onClick={
                    resetFilters
                  }
                  className="mt-6 inline-flex items-center gap-2 bg-[#741522] px-5 py-3 text-[7px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#5b101c]"
                >
                  Reset Filters
                  <RotateCcw
                    size={11}
                  />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>
      {/* =================================================
          BENEFIT STRIP
      ================================================= */}

      <section className="border-y border-[#e8dfd6] bg-[#faf7f2]">
        <div className="mx-auto grid max-w-[1100px] grid-cols-2 divide-x divide-[#e8dfd6] sm:grid-cols-4">
          <div className="flex items-center gap-2 px-4 py-4 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f2d982]">
              <Tag size={13} />
            </span>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.05em] text-[#3f1616] sm:text-[8px]">
                60%+ OFF
              </p>

              <p className="mt-0.5 text-[5px] text-[#806c63] sm:text-[6px]">
                Selected sarees
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-4 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f2d982]">
              <Truck size={13} />
            </span>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.05em] text-[#3f1616] sm:text-[8px]">
                Free Shipping
              </p>

              <p className="mt-0.5 text-[5px] text-[#806c63] sm:text-[6px]">
                Across India
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-4 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f2d982]">
              <Sparkles size={13} />
            </span>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.05em] text-[#3f1616] sm:text-[8px]">
                Curated Edit
              </p>

              <p className="mt-0.5 text-[5px] text-[#806c63] sm:text-[6px]">
                Darsh Collection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-4 sm:px-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#741522] text-[#f2d982]">
              <Flame size={13} />
            </span>

            <div>
              <p className="text-[7px] font-bold uppercase tracking-[0.05em] text-[#3f1616] sm:text-[8px]">
                Limited Stock
              </p>

              <p className="mt-0.5 text-[5px] text-[#806c63] sm:text-[6px]">
                Shop early
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================
          BOTTOM OFFER
      ================================================= */}

      <section className="overflow-hidden bg-[#741522]">
        <div className="relative mx-auto max-w-[1100px] px-5 py-12 text-center sm:py-16">
          <motion.div
            animate={{
              scale: [
                1,
                1.08,
                1,
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f1d37e]/10 blur-3xl"
          />

          <div className="relative">
            <p className="text-[7px] uppercase tracking-[0.35em] text-[#f1d37e]">
              DARSH · RAKSHABANDHAN
            </p>

            <h2 className="mt-3 font-serif text-[35px] leading-none text-white sm:text-[50px]">
              Celebrate with
              <br />
              60% OFF
            </h2>

            <p className="mx-auto mt-4 max-w-[480px] text-[9px] leading-5 text-[#ead8c6] sm:text-[11px]">
              Beautiful sarees, festive moments
              and special savings from Darsh.
            </p>

            <Link
              to="/allproducts"
              className="group mt-6 inline-flex items-center gap-2 border border-[#f1d37e] px-6 py-3 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#f1d37e] transition-all hover:bg-[#f1d37e] hover:text-[#741522]"
            >
              Explore More Sarees
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          MOBILE FILTER DRAWER
      ================================================= */}

      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
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
              onClick={() =>
                setMobileFiltersOpen(
                  false
                )
              }
              className="fixed inset-0 z-[90] bg-black/45 lg:hidden"
            />

            <motion.div
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
                stiffness: 280,
              }}
              className="fixed right-0 top-0 z-[100] flex h-full w-[88%] max-w-[360px] flex-col bg-white lg:hidden"
            >
              {/* Drawer header */}
              <div className="flex h-[64px] shrink-0 items-center justify-between border-b border-[#e2d8ce] px-5">
                <div>
                  <p className="text-[7px] uppercase tracking-[0.2em] text-[#977e73]">
                    DARSH
                  </p>

                  <h3 className="font-serif text-[20px] text-[#3f1616]">
                    Filters
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      false
                    )
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5eee6] text-[#741522]"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Drawer body */}
              <div className="flex-1 overflow-y-auto px-5 py-6">
                <FilterSidebar
                  products={
                    saleProducts
                  }
                  selectedAvailability={
                    selectedAvailability
                  }
                  setSelectedAvailability={
                    setSelectedAvailability
                  }
                  minPrice={
                    minPrice
                  }
                  setMinPrice={
                    setMinPrice
                  }
                  maxPrice={
                    maxPrice
                  }
                  setMaxPrice={
                    setMaxPrice
                  }
                  selectedColors={
                    selectedColors
                  }
                  setSelectedColors={
                    setSelectedColors
                  }
                  maxAvailablePrice={
                    maxAvailablePrice
                  }
                  onReset={
                    resetFilters
                  }
                />
              </div>

              {/* Drawer footer */}
              <div className="shrink-0 border-t border-[#e2d8ce] bg-white p-4">
                <button
                  type="button"
                  onClick={() =>
                    setMobileFiltersOpen(
                      false
                    )
                  }
                  className="flex h-11 w-full items-center justify-center gap-2 bg-[#741522] text-[7px] font-semibold uppercase tracking-[0.18em] text-white"
                >
                  Show{" "}
                  {
                    filteredProducts.length
                  }{" "}
                  Products
                  <ArrowRight
                    size={12}
                  />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default FestivalSale;