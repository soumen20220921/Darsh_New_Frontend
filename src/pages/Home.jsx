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
} from "lucide-react";

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
    name: "Silk Sarees",
    subtitle: " PURE Silk Collections",
    image: "/IMG/p7.jpg",
    path: "/Categories/Silk Saree",
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
  },
  {
    id: "demo-2",
    productName: "Blush Chiffon Aari",
    category: "SILK CHIFFON · LUCKNOW",
    price: 7450,
    image: "/IMG/saree.png",
    badge: "NEW",
  },
  {
    id: "demo-3",
    productName: "Indigo Handloom",
    category: "KHADI COTTON · BHUJ",
    price: 4200,
    image: "/IMG/home.png",
    badge: "NEW",
  },
  {
    id: "demo-4",
    productName: "Mustard Tussar",
    category: "TUSSAR SILK · BHAGALPUR",
    price: 9800,
    image: "/IMG/saree.png",
  },
  {
    id: "demo-5",
    productName: "Ivory Kota Doria",
    category: "KOTA COTTON SILK · KOTA",
    price: 5300,
    image: "/IMG/saree.png",
    badge: "FESTIVE",
  },
  {
    id: "demo-6",
    productName: "Plum Bandhani",
    category: "GAJI SILK · JAMNAGAR",
    price: 11200,
    image: "/IMG/all.png",
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
   HOME COMPONENT
========================================================= */

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
              to="/Categories/Silk Saree"
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
                px-4
                pb-4
                touch-pan-x
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
                  px-4
                  pb-4
                  touch-pan-x
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

          .new-arrivals-mobile::-webkit-scrollbar,
          .hot-sales-mobile::-webkit-scrollbar {
            display: none;
          }

          .new-arrivals-mobile,
          .hot-sales-mobile {
            -ms-overflow-style: none;
            scrollbar-width: none;
            scroll-behavior: smooth;
            overscroll-behavior-x: contain;
            -webkit-overflow-scrolling: touch;
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