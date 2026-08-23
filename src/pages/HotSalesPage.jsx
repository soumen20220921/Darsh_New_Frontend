import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Eye,
  Flame,
  Heart,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Timer,
  Truck,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../context/AppContext.jsx";

/* ============================================================
   DARSH HOT SALES
   Responsive / Mobile First / Premium Sale Experience
============================================================ */

const WISHLIST_KEY = "wishlist";

/* ============================================================
   HELPERS
============================================================ */

const getId = (product) =>
  product?._id ||
  product?.id ||
  product?.productId ||
  null;

const getName = (product) =>
  product?.productName ||
  product?.name ||
  "Darsh Saree";

const getPrice = (product) =>
  Number(product?.price) || 0;

const getOriginalPrice = (product) =>
  Number(
    product?.originalPrice ||
      product?.oldPrice ||
      product?.oldprice ||
      0
  );

const getDiscount = (product) => {
  const price = getPrice(product);
  const original = getOriginalPrice(product);

  if (!original || original <= price || !price) {
    return 0;
  }

  return Math.round(
    ((original - price) / original) * 100
  );
};

const getCategory = (product) =>
  product?.subCategory ||
  product?.category ||
  product?.fabric ||
  "Darsh Collection";

const getStock = (product) => {
  const stock = Number(product?.stock);

  return Number.isFinite(stock) ? stock : null;
};

const getImage = (product, url) => {
  if (!product) {
    return "/IMG/saree.png";
  }

  const firstImage = product?.images?.[0];

  if (firstImage) {
    if (
      firstImage.startsWith("http://") ||
      firstImage.startsWith("https://") ||
      firstImage.startsWith("/")
    ) {
      return firstImage;
    }

    return `${url}/img/${firstImage}`;
  }

  return (
    product?.image ||
    product?.img ||
    product?.thumbnail ||
    "/IMG/saree.png"
  );
};

const readWishlist = () => {
  try {
    const value = localStorage.getItem(WISHLIST_KEY);

    if (!value) {
      return [];
    }

    const parsed = JSON.parse(value);

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const emitWishlistUpdate = () => {
  window.dispatchEvent(
    new Event("wishlistUpdated")
  );

  window.dispatchEvent(
    new Event("darsh-wishlist-updated")
  );
};

/* ============================================================
   WISHLIST
============================================================ */

const WishlistButton = ({ product }) => {
  const productId = getId(product);

  const [active, setActive] = useState(() => {
    if (!productId) return false;

    return readWishlist().some(
      (item) => getId(item) === productId
    );
  });

  useEffect(() => {
    const sync = () => {
      if (!productId) {
        setActive(false);
        return;
      }

      setActive(
        readWishlist().some(
          (item) => getId(item) === productId
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

  const toggle = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!productId) return;

    const current = readWishlist();

    const exists = current.some(
      (item) => getId(item) === productId
    );

    const next = exists
      ? current.filter(
          (item) => getId(item) !== productId
        )
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
              "/IMG/saree.png",
          },
        ];

    try {
      localStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(next)
      );

      setActive(!exists);
      emitWishlistUpdate();
    } catch {
      // Ignore storage errors.
    }
  };

  if (!productId) {
    return null;
  }

  return (
    <motion.button
      type="button"
      onClick={toggle}
      whileTap={{ scale: 0.86 }}
      aria-label={
        active
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
      aria-pressed={active}
      className={`absolute right-3 top-3 z-20
        flex h-10 w-10 items-center
        justify-center rounded-full
        border backdrop-blur-md
        shadow-lg transition-all
        sm:right-4 sm:top-4
        sm:h-11 sm:w-11
        ${
          active
            ? "border-[#741522] bg-[#741522] text-white"
            : "border-white/80 bg-white/90 text-[#741522]"
        }`}
    >
      <Heart
        size={18}
        fill={active ? "currentColor" : "none"}
        strokeWidth={1.8}
      />

      {active && (
        <span
          className="absolute right-0 top-0
            h-2.5 w-2.5 rounded-full
            bg-[#d4ad54]"
        />
      )}
    </motion.button>
  );
};

/* ============================================================
   PRODUCT CARD
============================================================ */

const ProductCard = ({
  product,
  url,
  index,
}) => {
  const id = getId(product);
  const image = getImage(product, url);
  const price = getPrice(product);
  const original = getOriginalPrice(product);
  const discount = getDiscount(product);
  const stock = getStock(product);

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 24,
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
        delay: Math.min(index * 0.04, 0.2),
      }}
      className="group min-w-0"
    >
      {/* IMAGE */}
      <div
        className="relative overflow-hidden
          bg-[#ebe0d0]"
      >
        <WishlistButton product={product} />

        <Link
          to={`/productDetails/${id}`}
          className="block"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
        >
          <div
            className="relative aspect-[0.76]
              overflow-hidden"
          >
            <img
              src={image}
              alt={getName(product)}
              loading={index > 3 ? "lazy" : "eager"}
              className="h-full w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-[1.055]"
              onError={(event) => {
                event.currentTarget.src =
                  "/IMG/saree.png";
              }}
            />

            {/* Overlay */}
            <div
              className="absolute inset-0
                bg-gradient-to-t
                from-[#3f1616]/50
                via-transparent to-transparent
                opacity-0 transition-opacity
                duration-500
                group-hover:opacity-100"
            />

           


            {/* Low Stock */}
            {stock !== null &&
              stock > 0 &&
              stock <= 5 && (
                <div
                  className="absolute bottom-3
                    right-3 flex items-center
                    gap-1 bg-white/95
                    px-2.5 py-1.5
                    text-[6px] uppercase
                    tracking-[0.1em]
                    text-[#741522]
                    sm:bottom-4 sm:right-4"
                >
                  <Timer size={10} />
                  {stock} left
                </div>
              )}

            {/* Desktop hover */}
            <div
              className="absolute bottom-4
                left-1/2 hidden
                -translate-x-1/2
                translate-y-4
                items-center gap-2
                whitespace-nowrap
                bg-white/95 px-5 py-2.5
                text-[7px] uppercase
                tracking-[0.18em]
                text-[#741522]
                opacity-0 shadow-xl
                transition-all duration-500
                group-hover:translate-y-0
                group-hover:opacity-100
                sm:flex"
            >
              <Eye size={12} />
              View Saree
            </div>
          </div>
        </Link>
      </div>

      {/* DETAILS */}
      <div className="pt-4">
        <div
          className="flex items-start
            justify-between gap-2"
        >
          <Link
            to={`/productDetails/${id}`}
            className="min-w-0"
          >
            <h3
              className="line-clamp-2
                font-serif text-[14px]
                leading-[1.2]
                text-[#3f1616]
                transition-colors
                group-hover:text-[#741522]
                sm:text-[16px]"
            >
              {getName(product)}
            </h3>
          </Link>

          <div
            className="shrink-0 text-right"
          >
            <p
              className="whitespace-nowrap
                text-[10px] font-medium
                text-[#741522]
                sm:text-[11px]"
            >
              ₹{price.toLocaleString("en-IN")}
            </p>

            {original > price && (
              <p
                className="mt-0.5
                  whitespace-nowrap
                  text-[8px]
                  text-[#977e73]
                  line-through"
              >
                ₹{original.toLocaleString("en-IN")}
              </p>
            )}
          </div>
        </div>

        <div
          className="mt-2 flex
            items-center
            justify-between gap-2"
        >
          <p
            className="truncate text-[7px]
              uppercase
              tracking-[0.16em]
              text-[#977e73]"
          >
            {getCategory(product)}
          </p>

          {discount > 0 && (
            <span
              className="shrink-0
                text-[7px]
                font-medium
                text-[#741522]"
            >
              SAVE ₹
              {(original - price).toLocaleString(
                "en-IN"
              )}
            </span>
          )}
        </div>

        {/* Mobile CTA */}
        <Link
          to={`/productDetails/${id}`}
          className="mt-4 flex
            min-h-[39px]
            items-center
            justify-center gap-2
            border
            border-[#741522]/25
            text-[7px]
            uppercase
            tracking-[0.18em]
            text-[#741522]
            transition-colors
            hover:bg-[#741522]
            hover:text-white
            sm:hidden"
        >
          <Eye size={12} />
          View Saree
        </Link>
      </div>
    </motion.article>
  );
};

/* ============================================================
   MAIN
============================================================ */

const HotSalesPage = () => {
  const { allProduct, url } = useAppContext();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Saree");
  const [sort, setSort] =
    useState("featured");
  const [sortOpen, setSortOpen] =
    useState(false);
  
  /* ==========================================================
     HOT PRODUCTS
  ========================================================== */

  const hotSales = useMemo(() => {
    if (!Array.isArray(allProduct)) {
      return [];
    }

    return allProduct.filter(
      (product) =>
        product?.hotSell === true ||
        product?.hotSell === "true" ||
        product?.hotSell === 1 ||
        product?.hotSell === "1"
    );
  }, [allProduct]);

  /* ==========================================================
     DEAL OF DAY
  ========================================================== */

  const deal = useMemo(() => {
    if (!hotSales.length) {
      return null;
    }

    return hotSales.reduce(
      (best, product) => {
        const discount =
          getDiscount(product);

        if (!best) {
          return {
            product,
            discount,
          };
        }

        return discount > best.discount
          ? {
              product,
              discount,
            }
          : best;
      },
      null
    )?.product;
  }, [hotSales]);
 
  const categories = useMemo(() => {
  const sourceProducts = [
    ...(Array.isArray(hotSales) ? hotSales : []),
    ...(deal ? [deal] : []),
  ];

  const categoryMap = new Map();

  sourceProducts.forEach((product) => {
    const rawCategory =
      product?.category ||
      product?.Category ||
      product?.categoryName ||
      product?.collection ||
      "";

    if (!rawCategory) return;

    const value = String(rawCategory).trim();
    if (!value) return;

    const key = value.toLowerCase();

    if (!categoryMap.has(key)) {
      categoryMap.set(key, value);
    }
  });

  return [
    "All Saree",
    ...Array.from(categoryMap.values()),
  ];
}, [hotSales, deal]);

 const products = useMemo(() => {
  const hotProducts = Array.isArray(hotSales)
    ? [...hotSales]
    : [];

  // Make sure Hot Price / Hot Deal is also included
  if (deal) {
    const exists = hotProducts.some(
      (product) => getId(product) === getId(deal)
    );

    if (!exists) {
      hotProducts.unshift(deal);
    }
  }

  let result = hotProducts;

  /* =========================
     CATEGORY
  ========================= */

  if (category !== "All Saree") {
    result = result.filter((product) => {
      const productCategory =
        product?.category ||
        product?.Category ||
        product?.categoryName ||
        product?.collection ||
        "";

      return (
        String(productCategory).trim().toLowerCase() ===
        String(category).trim().toLowerCase()
      );
    });
  }

  /* =========================
     SEARCH
  ========================= */

  const term = search.trim().toLowerCase();

  if (term) {
    result = result.filter((product) => {
      const searchable = [
        getName(product),
        product?.category,
        product?.Category,
        product?.categoryName,
        product?.subCategory,
        product?.fabric,
        product?.material,
        product?.weave,
        product?.occasion,
        product?.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }

  /* =========================
     SORT
  ========================= */

  if (sort === "discount") {
    result.sort(
      (a, b) =>
        Number(getDiscount(b) || 0) -
        Number(getDiscount(a) || 0)
    );
  }

  if (sort === "priceLow") {
    result.sort(
      (a, b) =>
        Number(getPrice(a) || 0) -
        Number(getPrice(b) || 0)
    );
  }

  if (sort === "priceHigh") {
    result.sort(
      (a, b) =>
        Number(getPrice(b) || 0) -
        Number(getPrice(a) || 0)
    );
  }

  return result;
}, [
  hotSales,
  deal,
  category,
  search,
  sort,
]);
  /* ==========================================================
     STATISTICS
  ========================================================== */

  const stats = useMemo(() => {
    const discounts = hotSales
      .map(getDiscount)
      .filter(Boolean);

    return {
      total: hotSales.length,
      maxDiscount: discounts.length
        ? Math.max(...discounts)
        : 0,
      collections: new Set(
        hotSales.map(getCategory)
      ).size,
    };
  }, [hotSales]);

  /* ==========================================================
     SCROLL
  ========================================================== */

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    document.body.style.overflowX =
      "hidden";

    return () => {
      document.body.style.overflowX =
        "";
    };
  }, []);

  return (
    <main
      className="min-h-screen overflow-hidden
        bg-[#f8f4eb]
        text-[#3f1616]"
    >
     

      {/* ======================================================
          HERO
      ====================================================== */}

      <section
        className="relative
          overflow-hidden
          border-b
          border-[#741522]/10
          bg-[#f3eadb]"
      >
        <div
          className="pointer-events-none
            absolute -left-32 -top-32
            h-80 w-80 rounded-full
            bg-[#d4ad54]/10
            blur-3xl"
        />

        <div
          className="pointer-events-none
            absolute -bottom-40
            -right-32 h-96 w-96
            rounded-full
            bg-[#741522]/10
            blur-3xl"
        />

        <Sparkles
          size={20}
          className="absolute
            left-[10%] top-[27%]
            text-[#b88b34]/40
            animate-pulse"
        />

        <Sparkles
          size={17}
          className="absolute
            right-[12%] top-[22%]
            text-[#741522]/30
            animate-pulse"
        />

        <div
          className="relative mx-auto
            max-w-[1250px]
            px-5 py-12
            sm:px-8 sm:py-16
            lg:px-10 lg:py-20"
        >
          {/* Breadcrumb */}
          <div
            className="mb-8 flex
              items-center
              justify-center gap-2
              text-[7px]
              uppercase
              tracking-[0.27em]
              text-[#977e73]"
          >
            <Link
              to="/"
              onClick={scrollTop}
              className="hover:text-[#741522]"
            >
              Home
            </Link>

            <span>/</span>

            <span className="text-[#741522]">
              Hot Sales
            </span>
          </div>

          {/* Label */}
          <div
            className="flex
              items-center
              justify-center gap-3"
          >
            <span
              className="h-px w-8
                bg-[#d4ad54]
                sm:w-14"
            />

            <span
              className="flex
                items-center gap-2
                text-[7px]
                uppercase
                tracking-[0.3em]
                text-[#977e73]
                sm:text-[8px]"
            >
              <Flame
                size={13}
                className="text-[#741522]"
              />
              The Darsh Sale Edit
            </span>

            <span
              className="h-px w-8
                bg-[#d4ad54]
                sm:w-14"
            />
          </div>

          {/* Main title */}
          <h1
            className="mt-5
              text-center
              font-serif
              text-[50px]
              leading-[.9]
              text-[#3f1616]
              sm:text-[70px]
              lg:text-[92px]"
          >
            Hot Sales
          </h1>

          <p
            className="mx-auto mt-6
              max-w-[600px]
              text-center
              text-[11px]
              leading-6
              text-[#806c63]
              sm:text-[13px]"
          >
            Discover handpicked sarees,
            limited-time prices and
            timeless Darsh favourites.
          </p>

          {/* Stats */}
          <div
            className="mx-auto mt-9
              grid max-w-[680px]
              grid-cols-3
              border-y
              border-[#741522]/10"
          >
            <div
              className="px-2 py-5
                text-center"
            >
              <p
                className="font-serif
                  text-[25px]
                  text-[#741522]
                  sm:text-[32px]"
              >
                {stats.total}
              </p>

              <p
                className="mt-1
                  text-[6px]
                  uppercase
                  tracking-[0.2em]
                  text-[#977e73]
                  sm:text-[7px]"
              >
                Hot Picks
              </p>
            </div>

            <div
              className="border-x
                border-[#741522]/10
                px-2 py-5
                text-center"
            >
              <p
                className="font-serif
                  text-[25px]
                  text-[#741522]
                  sm:text-[32px]"
              >
                {stats.maxDiscount}%
              </p>

              <p
                className="mt-1
                  text-[6px]
                  uppercase
                  tracking-[0.2em]
                  text-[#977e73]
                  sm:text-[7px]"
              >
                Max Off
              </p>
            </div>

            <div
              className="px-2 py-5
                text-center"
            >
              <p
                className="font-serif
                  text-[25px]
                  text-[#741522]
                  sm:text-[32px]"
              >
                {stats.collections}
              </p>

              <p
                className="mt-1
                  text-[6px]
                  uppercase
                  tracking-[0.2em]
                  text-[#977e73]
                  sm:text-[7px]"
              >
                Collections
              </p>
            </div>
          </div>

          {/* Feature row */}
          <div
            className="mt-8
              flex flex-wrap
              justify-center
              gap-x-7 gap-y-3"
          >
            <span
              className="flex
                items-center gap-2
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-[#741522]"
            >
              <Zap
                size={12}
                className="text-[#b88b34]"
              />
              Limited Offers
            </span>

            <span
              className="flex
                items-center gap-2
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-[#741522]"
            >
              <Star
                size={12}
                className="text-[#b88b34]"
              />
              Premium Weaves
            </span>

            <span
              className="flex
                items-center gap-2
                text-[7px]
                uppercase
                tracking-[0.18em]
                text-[#741522]"
            >
              <Timer
                size={12}
                className="text-[#b88b34]"
              />
              While Stocks Last
            </span>
          </div>
        </div>
      </section>

       {/* ======================================================
          SALE BAR
      ====================================================== */}

      <div
        className="bg-[#741522]
          px-4 py-2.5
          text-center text-[7px]
          uppercase
          tracking-[0.2em]
          text-white
          sm:text-[8px]"
      >
        <span
          className="inline-flex
            items-center gap-2"
        >
          <Zap
            size={10}
            className="text-[#d4ad54]"
          />

          Darsh Hot Sale

          <span className="opacity-40">
            ·
          </span>

          Limited Time Collection
        </span>
      </div>

      {/* ======================================================
          FEATURED DEAL
      ====================================================== */}

      {deal && (
        <section
          className="px-4 py-12
            sm:px-6 sm:py-16
            lg:px-8 lg:py-20"
        >
          <div
            className="mx-auto
              max-w-[1120px]"
          >
            <div
              className="mb-7 flex
                items-center
                justify-center gap-3"
            >
              <span
                className="h-px w-8
                  bg-[#d4ad54]
                  sm:w-12"
              />

              <span
                className="flex
                  items-center gap-2
                  text-[7px]
                  uppercase
                  tracking-[0.3em]
                  text-[#977e73]"
              >
                <Sparkles
                  size={13}
                  className="text-[#b88b34]"
                />
                Deal Of The Day
              </span>

              <span
                className="h-px w-8
                  bg-[#d4ad54]
                  sm:w-12"
              />
            </div>

            <div
              className="grid
                overflow-hidden
                border
                border-[#d4ad54]/30
                bg-[#f3eadb]
                shadow-[0_20px_70px_rgba(63,22,22,.08)]
                md:grid-cols-2"
            >
              {/* Image */}
              <div
                className="relative
                  aspect-[.88]
                  overflow-hidden
                  sm:aspect-[.82]
                  md:aspect-auto
                  md:min-h-[580px]"
              >
                <WishlistButton
                  product={deal}
                />

                <Link
                  to={`/productDetails/${getId(
                    deal
                  )}`}
                  onClick={scrollTop}
                >
                  <img
                    src={getImage(deal, url)}
                    alt={getName(deal)}
                    className="h-full w-full
                      object-cover
                      transition-transform
                      duration-1000
                      hover:scale-[1.05]"
                    onError={(event) => {
                      event.currentTarget.src =
                        "/IMG/saree.png";
                    }}
                  />
                </Link>

                <div
                  className="absolute
                    left-4 top-4
                    flex items-center gap-2
                    bg-[#741522]
                    px-4 py-2
                    text-[7px]
                    uppercase
                    tracking-[0.2em]
                    text-white
                    sm:left-6 sm:top-6"
                >
                  <Flame size={13} />
                  Best Deal
                </div>

                <div
                  className="absolute
                    bottom-4 right-4
                    flex h-20 w-20
                    flex-col
                    items-center
                    justify-center
                    rounded-full
                    bg-[#d4ad54]
                    text-[#4a1815]
                    shadow-xl
                    sm:bottom-6
                    sm:right-6
                    sm:h-24
                    sm:w-24"
                >
                  <span
                    className="font-serif
                      text-[21px]"
                  >
                    {getDiscount(deal)}%
                  </span>

                  <span
                    className="text-[6px]
                      uppercase
                      tracking-[0.18em]"
                  >
                    OFF
                  </span>
                </div>
              </div>

              {/* Content */}
              <div
                className="flex
                  flex-col
                  justify-center
                  px-6 py-10
                  sm:px-10
                  sm:py-12
                  lg:px-14"
              >
                <p
                  className="text-[7px]
                    uppercase
                    tracking-[0.3em]
                    text-[#977e73]"
                >
                  Editor's Pick
                </p>

                <h2
                  className="mt-4
                    font-serif
                    text-[31px]
                    leading-tight
                    text-[#3f1616]
                    sm:text-[43px]"
                >
                  {getName(deal)}
                </h2>

                <p
                  className="mt-3
                    text-[8px]
                    uppercase
                    tracking-[0.2em]
                    text-[#977e73]"
                >
                  {getCategory(deal)}
                </p>

                <div
                  className="my-7
                    h-px
                    bg-[#741522]/10"
                />

                <div
                  className="flex
                    flex-wrap
                    items-end gap-3"
                >
                  <span
                    className="font-serif
                      text-[30px]
                      text-[#741522]"
                  >
                    ₹
                    {getPrice(deal).toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  {getOriginalPrice(deal) >
                    getPrice(deal) && (
                    <span
                      className="pb-1
                        text-[13px]
                        text-[#977e73]
                        line-through"
                    >
                      ₹
                      {getOriginalPrice(
                        deal
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  )}
                </div>

                {getOriginalPrice(deal) >
                  getPrice(deal) && (
                  <div
                    className="mt-4
                      inline-flex
                      w-fit
                      items-center gap-2
                      bg-[#741522]/5
                      px-3 py-2
                      text-[7px]
                      uppercase
                      tracking-[0.14em]
                      text-[#741522]"
                  >
                    <Check size={11} />
                    Save ₹
                    {(
                      getOriginalPrice(deal) -
                      getPrice(deal)
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </div>
                )}

                <p
                  className="mt-5
                    max-w-[470px]
                    text-[12px]
                    leading-6
                    text-[#806c63]"
                >
                  A special Darsh selection
                  available at an exceptional
                  price for a limited time.
                  Once it is gone, this offer
                  may not return.
                </p>

                <Link
                  to={`/productDetails/${getId(
                    deal
                  )}`}
                  onClick={scrollTop}
                  className="group mt-8
                    flex min-h-[52px]
                    w-full
                    items-center
                    justify-center
                    gap-3
                    bg-[#741522]
                    px-7
                    text-[8px]
                    uppercase
                    tracking-[0.24em]
                    text-white
                    transition-colors
                    hover:bg-[#5e1019]
                    sm:w-fit"
                >
                  <Eye size={14} />

                  View This Saree

                  <ArrowRight
                    size={14}
                    className="transition-transform
                      group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ======================================================
          PRODUCTS
      ====================================================== */}

      <section
        className="border-y
          border-[#741522]/10
          bg-[#f3eadb]
          px-4 py-12
          sm:px-6 sm:py-16
          lg:px-8 lg:py-20"
      >
        <div
          className="mx-auto
            max-w-[1240px]"
        >
          {/* Header */}
          <div
            className="flex
              flex-col gap-5
              lg:flex-row
              lg:items-end
              lg:justify-between"
          >
            <div>
              <div
                className="mb-3
                  flex items-center gap-2
                  text-[7px]
                  uppercase
                  tracking-[0.3em]
                  text-[#977e73]"
              >
                <Flame
                  size={13}
                  className="text-[#b88b34]"
                />
                Limited Time Edit
              </div>

              <h2
                className="font-serif
                  text-[34px]
                  leading-none
                  text-[#3f1616]
                  sm:text-[46px]"
              >
                Shop Hot Picks
              </h2>

              <p
                className="mt-4
                  max-w-[560px]
                  text-[11px]
                  leading-6
                  text-[#806c63]"
              >
                Explore our current sale
                collection and discover
                something beautiful for
                your wardrobe.
              </p>
            </div>

            <span
              className="text-[7px]
                uppercase
                tracking-[0.25em]
                text-[#977e73]"
            >
              {products.length} Pieces
            </span>
          </div>

          {/* Search / Sort */}
          <div
            className="mt-8
              flex flex-col gap-3
              sm:flex-row"
          >
            <div
              className="relative
                min-w-0 flex-1"
            >
              <Search
                size={15}
                className="absolute
                  left-4 top-1/2
                  -translate-y-1/2
                  text-[#977e73]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search hot sale sarees..."
                className="h-12 w-full
                  border
                  border-[#741522]/15
                  bg-[#f8f4eb]
                  pl-11 pr-10
                  text-[10px]
                  text-[#3f1616]
                  outline-none
                  placeholder:text-[#a18d84]
                  focus:border-[#741522]/40"
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    setSearch("")
                  }
                  className="absolute
                    right-3 top-1/2
                    -translate-y-1/2
                    text-[#977e73]"
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <div
              className="relative
                sm:w-[210px]"
            >
              <button
                type="button"
                onClick={() =>
                  setSortOpen(
                    (value) => !value
                  )
                }
                className="flex h-12 w-full
                  items-center
                  justify-between
                  border
                  border-[#741522]/15
                  bg-[#f8f4eb]
                  px-4
                  text-[8px]
                  uppercase
                  tracking-[0.15em]
                  text-[#741522]"
              >
                <span>
                  {sort === "featured"
                    ? "Featured"
                    : sort === "discount"
                    ? "Best Discount"
                    : sort === "priceLow"
                    ? "Price: Low"
                    : "Price: High"}
                </span>

                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    sortOpen
                      ? "rotate-180"
                      : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      y: -5,
                    }}
                    className="absolute
                      left-0 top-[54px]
                      z-40 w-full
                      border
                      border-[#741522]/10
                      bg-[#f8f4eb]
                      p-1 shadow-2xl"
                  >
                    {[
                      [
                        "featured",
                        "Featured",
                      ],
                      [
                        "discount",
                        "Best Discount",
                      ],
                      [
                        "priceLow",
                        "Price Low → High",
                      ],
                      [
                        "priceHigh",
                        "Price High → Low",
                      ],
                    ].map(
                      ([value, label]) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setSort(value);
                            setSortOpen(
                              false
                            );
                          }}
                          className={`flex
                            w-full
                            px-3 py-3
                            text-left
                            text-[8px]
                            uppercase
                            tracking-[0.1em]
                            ${
                              sort === value
                                ? "bg-[#741522] text-white"
                                : "text-[#741522] hover:bg-[#741522]/5"
                            }`}
                        >
                          {label}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Category Pills */}
          <div
            className="mt-5 flex
              gap-2 overflow-x-auto
              pb-2"
            style={{
              scrollbarWidth: "none",
            }}
          >
            {categories.map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`shrink-0
                    rounded-full
                    border px-4 py-2.5
                    text-[7px]
                    uppercase
                    tracking-[0.14em]
                    transition-all
                    ${
                      category === item
                        ? "border-[#741522] bg-[#741522] text-white"
                        : "border-[#741522]/15 bg-[#f8f4eb] text-[#741522] hover:border-[#741522]/40"
                    }`}
                >
                  {item}
                </button>
              )
            )}
          </div>

          {/* Grid */}
          {products.length > 0 ? (
            <div
              className="mt-10
                grid grid-cols-2
                gap-x-4 gap-y-12
                sm:grid-cols-3
                sm:gap-x-5
                sm:gap-y-14
                lg:grid-cols-4
                lg:gap-x-6
                lg:gap-y-16"
            >
              {products.map(
                (product, index) => (
                  <ProductCard
                    key={
                      getId(product) ||
                      `${getName(
                        product
                      )}-${index}`
                    }
                    product={product}
                    url={url}
                    index={index}
                  />
                )
              )}
            </div>
          ) : (
            <div
              className="mt-10
                flex min-h-[340px]
                flex-col
                items-center
                justify-center
                border
                border-[#741522]/10
                bg-[#f8f4eb]
                px-6 text-center"
            >
              <div
                className="flex h-16 w-16
                  items-center
                  justify-center
                  border
                  border-[#d4ad54]/50"
              >
                <Search
                  size={24}
                  className="text-[#b88b34]"
                />
              </div>

              <h3
                className="mt-6
                  font-serif
                  text-[27px]
                  text-[#3f1616]"
              >
                No sale pieces found
              </h3>

              <p
                className="mt-3
                  max-w-[430px]
                  text-[11px]
                  leading-6
                  text-[#806c63]"
              >
                Try another search or
                select a different
                collection.
              </p>

              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setCategory("All");
                }}
                className="mt-7
                  inline-flex
                  items-center
                  gap-2
                  border
                  border-[#741522]/30
                  px-6 py-3
                  text-[7px]
                  uppercase
                  tracking-[0.2em]
                  text-[#741522]
                  transition-colors
                  hover:bg-[#741522]
                  hover:text-white"
              >
                Reset Filters
                <X size={13} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          WHY DARSH
      ====================================================== */}

      <section
        className="bg-[#f8f4eb]"
      >
        <div
          className="mx-auto
            grid max-w-[1100px]
            grid-cols-1
            border-y
            border-[#741522]/10
            sm:grid-cols-2
            lg:grid-cols-4"
        >
          {[
            {
              icon: ShieldCheck,
              title: "Secure Payment",
              text: "Safe checkout",
            },
            {
              icon: Truck,
              title: "Careful Delivery",
              text: "Packed with care",
            },
            {
              icon: Award,
              title: "Premium Quality",
              text: "Selected weaves",
            },
            {
              icon: Check,
              title: "Darsh Promise",
              text: "Quality first",
            },
          ].map(
            (
              item,
              index
            ) => {
              const Icon =
                item.icon;

              return (
                <div
                  key={item.title}
                  className={`flex
                    items-center
                    justify-center
                    gap-3 px-5 py-7
                    ${
                      index > 0
                        ? "border-t border-[#741522]/10 sm:border-l lg:border-t-0"
                        : ""
                    }`}
                >
                  <Icon
                    size={19}
                    className="shrink-0
                      text-[#b88b34]"
                  />

                  <div>
                    <p
                      className="text-[7px]
                        uppercase
                        tracking-[0.18em]
                        text-[#741522]"
                    >
                      {item.title}
                    </p>

                    <p
                      className="mt-1
                        text-[9px]
                        text-[#977e73]"
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </section>

      {/* ======================================================
          SHOPPING GUIDE
      ====================================================== */}

      <section
        className="bg-[#f3eadb]
          px-5 py-14
          sm:px-8 sm:py-16"
      >
        <div
          className="mx-auto
            max-w-[980px]"
        >
          <div className="text-center">
            <p
              className="text-[7px]
                uppercase
                tracking-[0.35em]
                text-[#977e73]"
            >
              Darsh Shopping Guide
            </p>

            <h2
              className="mt-3
                font-serif
                text-[32px]
                text-[#3f1616]
                sm:text-[42px]"
            >
              Find your perfect saree
            </h2>

            <p
              className="mx-auto mt-4
                max-w-[570px]
                text-[11px]
                leading-6
                text-[#806c63]"
            >
              Take a moment to explore
              the collection, compare
              your favourites and choose
              a piece you will love wearing.
            </p>
          </div>

          <div
            className="mt-10
              grid gap-4
              sm:grid-cols-3"
          >
            {[
              {
                no: "01",
                title: "Explore",
                text: "Browse different weaves and collections.",
              },
              {
                no: "02",
                title: "Compare",
                text: "Check price, discount and product details.",
              },
              {
                no: "03",
                title: "Choose",
                text: "Save your favourite or view the saree.",
              },
            ].map(
              (item) => (
                <div
                  key={item.no}
                  className="border
                    border-[#741522]/10
                    bg-[#f8f4eb]
                    p-6 sm:p-7"
                >
                  <span
                    className="font-serif
                      text-[25px]
                      text-[#d4ad54]"
                  >
                    {item.no}
                  </span>

                  <h3
                    className="mt-4
                      font-serif
                      text-[21px]
                      text-[#3f1616]"
                  >
                    {item.title}
                  </h3>

                  <p
                    className="mt-3
                      text-[10px]
                      leading-5
                      text-[#806c63]"
                  >
                    {item.text}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section
        className="relative
          overflow-hidden
          bg-[#741522]
          px-5 py-16
          sm:px-8 sm:py-20"
      >
        <div
          className="pointer-events-none
            absolute -left-24 -top-24
            h-72 w-72
            rounded-full
            bg-white/5
            blur-3xl"
        />

        <div
          className="pointer-events-none
            absolute -bottom-32
            -right-24 h-80 w-80
            rounded-full
            bg-[#d4ad54]/10
            blur-3xl"
        />

        <div
          className="relative
            mx-auto
            max-w-[950px]
            text-center"
        >
          <div
            className="mx-auto
              flex h-12 w-12
              items-center
              justify-center
              border
              border-[#d4ad54]/60"
          >
            <Sparkles
              size={20}
              className="text-[#d4ad54]"
            />
          </div>

          <p
            className="mt-6
              text-[7px]
              uppercase
              tracking-[0.4em]
              text-[#e6d2ae]"
          >
            Discover More From Darsh
          </p>

          <h2
            className="mt-4
              font-serif
              text-[34px]
              leading-tight
              text-[#f8f4eb]
              sm:text-[48px]"
          >
            Your next favourite
            <br />
            saree awaits.
          </h2>

          <p
            className="mx-auto mt-5
              max-w-[560px]
              text-[11px]
              leading-6
              text-[#e6d2ae]/80
              sm:text-[12px]"
          >
            Explore new arrivals,
            timeless classics and
            beautiful handpicked
            Darsh collections.
          </p>

          <div
            className="mt-8
              flex flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row"
          >
            <Link
              to="/allproducts"
              onClick={scrollTop}
              className="group flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-3
                bg-[#f8f4eb]
                px-8
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-[#741522]
                transition-colors
                hover:bg-[#e9dcc6]
                sm:w-auto"
            >
              Explore All Sarees

              <ArrowRight
                size={14}
                className="transition-transform
                  group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/newarrivals"
              onClick={scrollTop}
              className="group flex
                min-h-[52px]
                w-full
                items-center
                justify-center
                gap-3
                border
                border-[#e6d2ae]/50
                px-8
                text-[8px]
                uppercase
                tracking-[0.25em]
                text-white
                transition-colors
                hover:bg-white/10
                sm:w-auto"
            >
              <Sparkles size={14} />

              New Arrivals

              <ArrowRight
                size={14}
                className="transition-transform
                  group-hover:translate-x-1"
              />
            </Link>
          </div>

          <Link
            to="/"
            onClick={scrollTop}
            className="mt-7
              inline-flex
              items-center gap-2
              text-[7px]
              uppercase
              tracking-[0.25em]
              text-[#e6d2ae]/70
              hover:text-white"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* ======================================================
          ACCESSIBILITY / SCROLLBAR
      ====================================================== */}

      <style>
        {`
          .hot-sales-scrollbar-none {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .hot-sales-scrollbar-none::-webkit-scrollbar {
            display: none;
          }

          @media (max-width: 639px) {
            button,
            a,
            input {
              -webkit-tap-highlight-color: transparent;
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