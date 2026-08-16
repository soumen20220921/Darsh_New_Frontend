import { useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";

import { motion, AnimatePresence } from "framer-motion";

import {
  X,
  ChevronDown,
  RotateCcw,
  PackageCheck,
  PackageX,
  Sparkles,
  Blocks,
  SlidersHorizontal,
  Gem,
  Crown,
  Heart,
  ArrowUpRight,
  Truck,
  ShieldCheck,
  Gift,
} from "lucide-react";


const isPremiumProduct = (product) => {
  if (!product) return false;

  const explicitPremium =
    product.isPremium === true ||
    product.premium === true ||
    product.is_premium === true ||
    product.isPremium === "true" ||
    product.premium === "true";

  if (explicitPremium) return true;

  const searchable = [
    product.productName,
    product.category,
    product.subCategory,
    product.description,
    product.collection,
    product.tag,
    product.label,
    product.badge,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return /(premium|luxury|exclusive|bridal|royal|silk mark|handcrafted)/i.test(
    searchable
  );
};

const formatPrice = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ");

const getProductId = (product) =>
  product?._id || product?.id || product?.productId || null;

const getProductName = (product) =>
  product?.productName || product?.name || product?.title || "Saree";

const matchesCategory = (product, categoryName) => {
  const target = normalizeText(categoryName);
  const values = [
    product?.category,
    product?.categoryName,
    product?.subCategory,
    product?.collection,
    product?.type,
  ]
    .filter(Boolean)
    .map(normalizeText);

  if (values.includes(target)) return true;
  return values.some((value) => value.includes(target) || target.includes(value));
};

const Categories = () => {
  const { name } = useParams();

  const { allProduct, url } = useAppContext();


  /* ============================================================
     STATE
  ============================================================ */

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");

  const [priceRange, setPriceRange] = useState([
    0,
    3000,
  ]);

  const [priceBounds, setPriceBounds] = useState([
    0,
    3000,
  ]);

  const [premiumOnly, setPremiumOnly] = useState(false);

  const [stockStatus, setStockStatus] =
    useState("all");

  const [showFilters, setShowFilters] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [selectedSubCategory, setSelectedSubCategory] =
    useState("all");

  const [availableSubcategories, setAvailableSubcategories] =
    useState([]);

  const [openSection, setOpenSection] =
    useState("price");

  const [quickPrice, setQuickPrice] = useState("all");
   

  /* ============================================================
     CATEGORY DATA
  ============================================================ */

  const categories = [
    {
      id: "1",
      name: "Pure Silk",
      image: "/IMG/p7.jpg",
    },
    {
      id: "2",
      name: "Cotton Handloom",
      image: "/IMG/p8.jpg",
    },
    {
      id: "3",
      name: "Bandhani",
      image: "/IMG/p9.jpg",
    },
    {
      id: "4",
      name: "Festive Edit",
      image: "/IMG/p10.jpg",
    },
    
  ];


  /* ============================================================
     CATEGORY IMAGE
  ============================================================ */

  const currentCategory = categories.find(
    (category) =>
      category.name.toLowerCase() ===
      name?.toLowerCase()
  );


  /* ============================================================
     LOADING + SUBCATEGORY
  ============================================================ */

  useEffect(() => {
    if (!allProduct) return;

    setIsLoading(false);

    const categoryProducts = allProduct.filter(
      (product) => matchesCategory(product, name)
    );

    const subCats = new Set();

    categoryProducts.forEach((product) => {
      if (product.subCategory) {
        subCats.add(product.subCategory);
      }
    });

    setAvailableSubcategories(
      Array.from(subCats)
    );

    const prices = categoryProducts
      .map((product) => Number(product.price))
      .filter((price) => Number.isFinite(price) && price >= 0);

    const minPrice = prices.length
      ? Math.floor(Math.min(...prices) / 100) * 100
      : 0;

    const maxPrice = prices.length
      ? Math.ceil(Math.max(...prices) / 100) * 100
      : 3000;

    const safeMax = Math.max(maxPrice, minPrice + 100);

    setPriceBounds([minPrice, safeMax]);

    setPriceRange((current) => {
      const currentMin = Number(current[0]);
      const currentMax = Number(current[1]);

      if (
        currentMin < minPrice ||
        currentMin > safeMax ||
        currentMax < minPrice ||
        currentMax > safeMax ||
        currentMax <= currentMin
      ) {
        return [minPrice, safeMax];
      }

      return current;
    });

  }, [allProduct, name]);


  /* ============================================================
     FILTER PRODUCTS
  ============================================================ */

  const filteredProducts = useMemo(() => {
    let products =
      allProduct?.filter(
        (product) => matchesCategory(product, name)
      ) || [];


    /* Subcategory */

    if (selectedSubCategory !== "all") {
      products = products.filter(
        (product) =>
          product.subCategory
            ?.toLowerCase() ===
          selectedSubCategory.toLowerCase()
      );
    }


    /* Premium */

    if (premiumOnly) {
      products = products.filter(isPremiumProduct);
    }


    /* Search */

    if (searchQuery.trim()) {
      products = products.filter((product) =>
        product.productName
          ?.toLowerCase()
          .includes(
            searchQuery.toLowerCase()
          )
      );
    }


    /* Price */

    products = products.filter(
      (product) =>
        product.price >= priceRange[0] &&
        product.price <= priceRange[1]
    );


    /* Stock */

    if (stockStatus === "inStock") {
      products = products.filter(
        (product) => product.stock > 0
      );
    }

    if (stockStatus === "outOfStock") {
      products = products.filter(
        (product) =>
          !product.stock ||
          product.stock === 0
      );
    }


    /* Sorting */

    if (sortBy === "priceLowHigh") {
      products.sort(
        (a, b) => Number(a.price || 0) - Number(b.price || 0)
      );
    }

    if (sortBy === "priceHighLow") {
      products.sort(
        (a, b) => Number(b.price || 0) - Number(a.price || 0)
      );
    }

    if (sortBy === "newest") {
      products.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }

    return products;

  }, [
    allProduct,
    name,
    selectedSubCategory,
    premiumOnly,
    searchQuery,
    priceRange,
    sortBy,
    stockStatus,
  ]);


  const premiumProductCount = useMemo(
    () =>
      (allProduct || []).filter((product) =>
        matchesCategory(product, name)
      ).filter(isPremiumProduct).length,
    [allProduct, name]
  );

  const categoryProductCount = useMemo(
    () =>
      (allProduct || []).filter((product) =>
        matchesCategory(product, name)
      ).length,
    [allProduct, name]
  );

  const inStockCount = useMemo(
    () =>
      (allProduct || []).filter((product) =>
        matchesCategory(product, name)
      ).filter((product) => Number(product?.stock || 0) > 0).length,
    [allProduct, name]
  );

  const averagePrice = useMemo(() => {
    const list = (allProduct || []).filter((product) => matchesCategory(product, name));
    if (!list.length) return 0;
    return Math.round(
      list.reduce((sum, product) => sum + Number(product?.price || 0), 0) / list.length
    );
  }, [allProduct, name]);

  const activeFilterCount = [
    premiumOnly,
    selectedSubCategory !== "all",
    searchQuery.trim(),
    stockStatus !== "all",
    priceRange[0] !== priceBounds[0] || priceRange[1] !== priceBounds[1],
    sortBy !== "default",
  ].filter(Boolean).length;

  /* ============================================================
     RESET
  ============================================================ */

  const handleResetFilters = () => {
    setPriceRange(priceBounds);
    setPremiumOnly(false);
    setSortBy("default");
    setStockStatus("all");
    setSelectedSubCategory("all");
    setSearchQuery("");
    setQuickPrice("all");
    setShowFilters(false);
  };


  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const applyQuickPrice = (key) => {
    setQuickPrice(key);
    if (key === "all") {
      setPriceRange(priceBounds);
      return;
    }

    const presets = {
      under1500: [priceBounds[0], Math.min(priceBounds[1], 1500)],
      under3000: [priceBounds[0], Math.min(priceBounds[1], 3000)],
      premium: [Math.max(priceBounds[0], 5000), priceBounds[1]],
    };

    const next = presets[key];
    if (next) {
      const min = Math.min(next[0], next[1]);
      const max = Math.max(next[0], next[1]);
      setPriceRange([min, max]);
    }
  };



  /* ============================================================
     FILTER SECTION
  ============================================================ */

  const FilterSection = ({
    id,
    title,
    icon,
    children,
  }) => (
    <div className="border-b border-[#d4ad54]/15 pb-5 mb-5">

      <button
        type="button"
        onClick={() =>
          setOpenSection(
            openSection === id ? "" : id
          )
        }
        className="
          flex
          w-full
          items-center
          justify-between
          text-left
          group
        "
      >

        <span
          className="
            flex
            items-center
            gap-2.5
            text-sm
            font-bold
            text-[#4a1815]
          "
        >
          {icon}

          {title}
        </span>

        <ChevronDown
          className={`
            h-4
            w-4
            text-[#a99082]
            transition-transform
            duration-300
            ${
              openSection === id
                ? "rotate-180 text-[#741522]"
                : ""
            }
          `}
        />

      </button>


      <AnimatePresence initial={false}>

        {openSection === id && (

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
            transition={{
              duration: 0.25,
            }}
            className="
              overflow-hidden
              pt-4
            "
          >
            {children}
          </motion.div>

        )}

      </AnimatePresence>

    </div>
  );


  /* ============================================================
     LOADING
  ============================================================ */

  if (isLoading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#fffdf8]
        "
      >

        <div className="text-center">

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              mx-auto
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              border-2
              border-[#d4ad54]/20
              border-t-[#741522]
            "
          >
            <Gem
              className="
                h-5
                w-5
                text-[#b88732]
              "
            />
          </motion.div>

          <p
            className="
              mt-4
              font-serif
              text-lg
              font-semibold
              text-[#741522]
            "
          >
            Curating your collection...
          </p>

          <p
            className="
              mt-1
              text-xs
              text-[#a99082]
            "
          >
            Please wait
          </p>

        </div>

      </div>
    );
  }


  return (
    <div
      className="
        min-h-screen
        overflow-hidden
        bg-[#fffdf8]
      "
    >

      {/* ========================================================
          HERO
      ======================================================== */}

      <section
        className="
          relative
          h-[270px]
          overflow-hidden
          sm:h-[320px]
          lg:h-[390px]
        "
      >

        {currentCategory?.image ? (
          <motion.img
            initial={{
              scale: 1.08,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 1,
            }}
            src={currentCategory.image}
            alt={name}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
            "
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-br
              from-[#741522]
              via-[#861d29]
              to-[#4a1815]
            "
          />
        )}


        {/* Overlay */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-[#2b0d10]/40
            via-[#4a1815]/55
            to-[#2b0d10]/80
          "
        />


        {/* Decorative glow */}

        <div
          className="
            absolute
            -right-20
            -top-20
            h-64
            w-64
            rounded-full
            bg-[#d4ad54]/15
            blur-3xl
          "
        />




        {/* Hero content */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            flex-col
            items-center
            justify-center
            px-4
            text-center
            text-white
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
            }}
          >

            <div
              className="
                mb-4
                flex
                items-center
                justify-center
                gap-2
              "
            >

              <Sparkles
                className="
                  h-4
                  w-4
                  text-[#f5d98a]
                "
              />

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.35em]
                  text-[#f5d98a]
                "
              >
                Darsh Collection
              </span>

              <Sparkles
                className="
                  h-4
                  w-4
                  text-[#f5d98a]
                "
              />

            </div>


            <h1
              className="
                font-serif
                text-4xl
                font-bold
                capitalize
                sm:text-5xl
                lg:text-6xl
              "
            >
              {name}
            </h1>


            <div
              className="
                mx-auto
                mt-4
                h-0.5
                w-16
                bg-gradient-to-r
                from-transparent
                via-[#d4ad54]
                to-transparent
              "
            />


            <p
              className="
                mt-4
                text-xs
                text-white/75
                sm:text-sm
              "
            >
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "piece"
                : "pieces"}{" "}
              available
            </p>

          </motion.div>

        </div>

      </section>


      {/* ========================================================
          MAIN
      ======================================================== */}

      <div
        className="
          mx-auto
          max-w-[1500px]
          px-4
          py-7
          sm:px-6
          lg:px-8
          lg:py-10
        "
      >

        {/* ======================================================
            COLLECTION SNAPSHOT + QUICK PRICE
        ====================================================== */}
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7  overflow-hidden rounded-[1.5rem] border border-[#d4ad54]/20 bg-[#fffdf8] shadow-[0_10px_40px_rgba(74,24,21,0.06)]"
        >

          <div className="flex flex-col gap-3 border-t border-[#741522]/10 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#741522]">Shop by budget</p>
              <p className="mt-1 text-[10px] text-[#806c63]">Quickly discover a price point without opening filters.</p>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {[
                ["all", "All prices"],
                ["under1500", "Under ₹1,500"],
                ["under3000", "Under ₹3,000"],
                ["premium", "₹5,000+"] ,
              ].map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => applyQuickPrice(key)}
                  className={`flex-shrink-0 rounded-full border px-4 py-2 text-[8px] font-bold transition-all ${quickPrice === key ? "border-[#741522] bg-[#741522] text-white" : "border-[#d4ad54]/30 bg-[#faf3e5] text-[#741522] hover:border-[#741522]/40"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </motion.section>

        


        {/* ======================================================
            CONTENT GRID
        ====================================================== */}

        <div
          className="
            grid
            gap-7
            lg:grid-cols-[260px_1fr]
            xl:grid-cols-[280px_1fr]
          "
        >

          {/* ====================================================
              DESKTOP FILTER
          ==================================================== */}

          <motion.aside
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            className="
              hidden
              h-fit
              rounded-[1.5rem]
              border
              border-[#d4ad54]/20
              bg-white
              p-5
              shadow-[0_10px_40px_rgba(74,24,21,0.07)]
              lg:block
              lg:sticky
              lg:top-24
            "
          >

            <div className="mb-6">

              <p
                className="
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-[0.25em]
                  text-[#b88732]
                "
              >
                Refine Collection
              </p>

              <h3
                className="
                  mt-1
                  font-serif
                  text-2xl
                  font-bold
                  text-[#4a1815]
                "
              >
                Filters
              </h3>

              <div
                className="
                  mt-3
                  h-0.5
                  w-12
                  bg-gradient-to-r
                  from-[#741522]
                  to-[#d4ad54]
                "
              />

            </div>


            {/* Price */}

            <FilterSection
              id="price"
              title="Price Range"
              icon={
                <span className="font-bold text-[#b88732]">
                  ₹
                </span>
              }
            >

              <input
                type="range"
                min={priceBounds[0]}
                max={priceBounds[1]}
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    Number(e.target.value),
                  ])
                }
                className="
                  w-full
                  accent-[#741522]
                "
              />

              <div
                className="
                  mt-2
                  flex
                  justify-between
                  text-xs
                  font-semibold
                  text-[#806c63]
                "
              >
                <span>
                  ₹{priceRange[0]}
                </span>

                <span>
                  ₹{priceRange[1]}
                </span>
              </div>

            </FilterSection>




            {/* Stock */}

            <FilterSection
              id="stock"
              title="Availability"
              icon={
                <PackageCheck className="h-4 w-4 text-[#b88732]" />
              }
            >

              <div className="space-y-3">

                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-sm
                    text-[#5f4b44]
                  "
                >
                  <input
                    type="radio"
                    name="desktopStock"
                    value="all"
                    checked={
                      stockStatus === "all"
                    }
                    onChange={() =>
                      setStockStatus("all")
                    }
                    className="accent-[#741522]"
                  />

                  All Products
                </label>


                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-sm
                    text-[#5f4b44]
                  "
                >
                  <input
                    type="radio"
                    name="desktopStock"
                    value="inStock"
                    checked={
                      stockStatus ===
                      "inStock"
                    }
                    onChange={() =>
                      setStockStatus(
                        "inStock"
                      )
                    }
                    className="accent-[#741522]"
                  />

                  <PackageCheck className="h-4 w-4 text-green-600" />

                  In Stock
                </label>


                <label
                  className="
                    flex
                    cursor-pointer
                    items-center
                    gap-2
                    text-sm
                    text-[#5f4b44]
                  "
                >
                  <input
                    type="radio"
                    name="desktopStock"
                    value="outOfStock"
                    checked={
                      stockStatus ===
                      "outOfStock"
                    }
                    onChange={() =>
                      setStockStatus(
                        "outOfStock"
                      )
                    }
                    className="accent-[#741522]"
                  />

                  <PackageX className="h-4 w-4 text-red-500" />

                  Out of Stock
                </label>

              </div>

            </FilterSection>


            {/* Sort */}

            <FilterSection
              id="sort"
              title="Sort By"
              icon={
                <SlidersHorizontal className="h-4 w-4 text-[#b88732]" />
              }
            >

              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#d8cabe]
                  bg-white
                  px-3
                  py-2.5
                  text-sm
                  text-[#4a1815]
                  outline-none
                  focus:border-[#741522]
                  focus:ring-2
                  focus:ring-[#741522]/10
                "
              >

                <option value="default">
                  Recommended
                </option>

                <option value="priceLowHigh">
                  Price: Low to High
                </option>

                <option value="priceHighLow">
                  Price: High to Low
                </option>

                <option value="newest">
                  Newest First
                </option>

              </select>

            </FilterSection>


            <button
              onClick={handleResetFilters}
              className="
                flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-[#d4ad54]/30
                bg-[#faf3e5]
                px-4
                py-3
                text-sm
                font-bold
                text-[#741522]
                transition-all
                duration-300
                hover:bg-[#f3e8d2]
                hover:shadow-md
              "
            >

              <RotateCcw className="h-4 w-4" />

              Reset Filters

            </button>

          </motion.aside>


          {/* ====================================================
              PRODUCTS AREA
          ==================================================== */}

          <main className="min-w-0">


            {/* ==================================================
                SUBCATEGORY TABS
            ================================================== */}

            {availableSubcategories.length >
              0 && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mb-7
                  flex
                  gap-2
                  overflow-x-auto
                  pb-2
                  [scrollbar-width:none]
                  [&::-webkit-scrollbar]:hidden
                "
              >

                {/* PREMIUM QUICK FILTER */}

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() =>
                    setPremiumOnly((value) => !value)
                  }
                  className={`
                    flex-shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    transition-all
                    duration-300
                    ${
                      premiumOnly
                        ? "border-[#d4ad54] bg-gradient-to-r from-[#741522] to-[#9b2432] text-white shadow-md"
                        : "border-[#d4ad54]/40 bg-[#faf3e5] text-[#741522] hover:border-[#741522]/40"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    <Crown className="h-3.5 w-3.5" />
                    Premium
                  </span>
                </motion.button>


                {/* ALL */}

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setSelectedSubCategory(
                      "all"
                    )
                  }
                  className={`
                    flex-shrink-0
                    rounded-full
                    border
                    px-5
                    py-2.5
                    text-xs
                    font-bold
                    capitalize
                    transition-all
                    duration-300
                    ${
                      selectedSubCategory ===
                      "all"
                        ? "border-[#741522] bg-[#741522] text-white shadow-md"
                        : "border-[#d4ad54]/25 bg-white text-[#5f4b44] hover:border-[#741522]/40 hover:bg-[#faf3e5]"
                    }
                  `}
                >
                  All
                </motion.button>


                {availableSubcategories.map(
                  (subCat) => (

                    <motion.button
                      key={subCat}
                      whileTap={{
                        scale: 0.95,
                      }}
                      onClick={() =>
                        setSelectedSubCategory(
                          subCat
                        )
                      }
                      className={`
                        flex-shrink-0
                        rounded-full
                        border
                        px-5
                        py-2.5
                        text-xs
                        font-bold
                        capitalize
                        transition-all
                        duration-300
                        ${
                          selectedSubCategory ===
                          subCat
                            ? "border-[#741522] bg-[#741522] text-white shadow-md"
                            : "border-[#d4ad54]/25 bg-white text-[#5f4b44] hover:border-[#741522]/40 hover:bg-[#faf3e5]"
                        }
                      `}
                    >
                      {subCat}
                    </motion.button>

                  )
                )}

              </motion.div>

            )}


            {/* ==================================================
                RESULT HEADER
            ================================================== */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
              "
            >

              <div>

                <p
                  className="
                    text-[9px]
                    font-bold
                    uppercase
                    tracking-[0.22em]
                    text-[#b88732]
                  "
                >
                  Curated For You
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    text-[#806c63]
                  "
                >
                  Showing{" "}
                  <span
                    className="
                      font-bold
                      text-[#741522]
                    "
                  >
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>

                {premiumOnly && (
                  <div
                    className="
                      mt-2
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-full
                      bg-[#faf3e5]
                      px-2.5
                      py-1
                      text-[9px]
                      font-bold
                      uppercase
                      tracking-[0.12em]
                      text-[#741522]
                    "
                  >
                    <Crown className="h-3 w-3 text-[#b88732]" />
                    Premium Collection
                  </div>
                )}

              </div>


              {selectedSubCategory !==
                "all" && (

                <button
                  onClick={() =>
                    setSelectedSubCategory(
                      "all"
                    )
                  }
                  className="
                    hidden
                    items-center
                    gap-1
                    text-xs
                    font-semibold
                    text-[#741522]
                    sm:flex
                  "
                >
                  Clear category
                  <X className="h-3.5 w-3.5" />
                </button>

              )}

            </div>


            {/* ==================================================
                PRODUCT GRID
            ================================================== */}

            <motion.div
              layout
              className="
                grid
                grid-cols-2
                gap-3
                sm:gap-5
                md:grid-cols-3
                xl:grid-cols-4
              "
            >

              <AnimatePresence mode="popLayout">

                {filteredProducts.length >
                0 ? (

                  filteredProducts.map(
                    (product, index) => (

                      <motion.div
                        layout
                        key={getProductId(product) || `${getProductName(product)}-${index}`}
                        initial={{
                          opacity: 0,
                          y: 25,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        transition={{
                          duration: 0.35,
                          delay:
                            index * 0.035,
                        }}
                        whileHover={{
                          y: -5,
                        }}
                        className="relative min-w-0"
                      >

                        {isPremiumProduct(product) && (
                          <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="
                              pointer-events-none
                              absolute
                              left-2
                              top-2
                              z-20
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              border-[#f5d98a]/70
                              bg-[#741522]/95
                              px-2.5
                              py-1.5
                              text-[9px]
                              font-bold
                              uppercase
                              tracking-[0.12em]
                              text-[#f5d98a]
                              shadow-lg
                            "
                          >
                            <Crown className="h-3 w-3" />
                            Premium
                          </motion.div>
                        )}

                        <ProductCard
                          product={{
                            id: getProductId(product),
                            name:
                              product.productName,
                            image:
                              product.images?.[0]
                                ? `${url}/img/${product.images[0]}`
                                : "",
                            price:
                              product.price,
                            oldPrice:
                              product.oldprice,
                            stock:
                              product.stock,
                            isNew:
                              index < 3,
                          }}
                          isCompactMobile={
                            true
                          }
                          onAddToCart={() => {}}
                          onToggleWishlist={() => {}}
                        />

                      </motion.div>

                    )
                  )

                ) : (

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      col-span-full
                      rounded-[2rem]
                      border
                      border-[#d4ad54]/20
                      bg-white
                      px-6
                      py-16
                      text-center
                      shadow-sm
                    "
                  >

                    <motion.div
                      animate={{
                        y: [0, -7, 0],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                      }}
                      className="
                        mx-auto
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-[#faf3e5]
                        text-[#741522]
                      "
                    >
                      <Blocks className="h-9 w-9" />
                    </motion.div>


                    <h3
                      className="
                        mt-5
                        font-serif
                        text-2xl
                        font-bold
                        text-[#4a1815]
                      "
                    >
                      Nothing Found
                    </h3>


                    <p
                      className="
                        mx-auto
                        mt-2
                        max-w-md
                        text-sm
                        leading-6
                        text-[#806c63]
                      "
                    >
                      We couldn't find any
                      products matching your
                      current filters.
                    </p>


                    <button
                      onClick={handleResetFilters}
                      className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-[#741522]
                        px-6
                        py-3
                        text-xs
                        font-bold
                        text-white
                        shadow-lg
                        transition
                        hover:bg-[#5f111b]
                      "
                    >

                      <RotateCcw className="h-4 w-4" />

                      Reset Filters

                    </button>

                  </motion.div>

                )}

              </AnimatePresence>

            </motion.div>


            {/* ==================================================
                SHOPPING PROMISE + WISHLIST CTA
            ================================================== */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 grid gap-3 sm:grid-cols-3"
            >
              {[
                [Truck, "Free shipping", "On every product"],
                [ShieldCheck, "Secure checkout", "Safe & protected"],
                [Gift, "Gift ready", "Packed with care"],
              ].map(([Icon, title, text]) => (
                <div key={title} className="flex items-center gap-3 rounded-2xl border border-[#741522]/10 bg-white px-4 py-4">
                  <Icon className="h-5 w-5 shrink-0 text-[#741522]" strokeWidth={1.25} />
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-[#4a1815]">{title}</p>
                    <p className="mt-1 text-[9px] text-[#977e73]">{text}</p>
                  </div>
                </div>
              ))}
            </motion.section>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <a href="/wishlist" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#741522]/20 bg-white px-5 py-3 text-[8px] font-bold uppercase tracking-[0.16em] text-[#741522] transition hover:bg-[#faf3e5]">
                <Heart className="h-4 w-4" />
                View Wishlist
              </a>
              <a href="/allproducts" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#741522] px-5 py-3 text-[8px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#5f111b]">
                Explore All Sarees
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            {/* ==================================================
                BOTTOM BRAND BANNER
            ================================================== */}

            {filteredProducts.length > 0 && (

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                className="
                  mt-12
                  overflow-hidden
                  rounded-[1.5rem]
                  border
                  border-[#d4ad54]/20
                  bg-gradient-to-r
                  from-[#741522]
                  via-[#861d29]
                  to-[#5f111b]
                  p-6
                  text-center
                  shadow-xl
                  sm:p-8
                "
              >

                <div
                  className="
                    mx-auto
                    flex
                    max-w-2xl
                    flex-col
                    items-center
                  "
                >

                  <Sparkles
                    className="
                      h-5
                      w-5
                      text-[#f5d98a]
                    "
                  />


                  <h3
                    className="
                      mt-3
                      font-serif
                      text-xl
                      font-bold
                      text-white
                      sm:text-2xl
                    "
                  >
                    Discover the Darsh Difference
                  </h3>


                  <p
                    className="
                      mt-2
                      text-xs
                      leading-5
                      text-white/65
                      sm:text-sm
                    "
                  >
                    Handpicked collections,
                    timeless craftsmanship and
                    beautiful Indian traditions,
                    curated specially for you.
                  </p>


                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      gap-3
                    "
                  >

                    <div
                      className="
                        h-px
                        w-10
                        bg-[#d4ad54]/50
                      "
                    />

                    <span
                      className="
                        text-[9px]
                        font-bold
                        uppercase
                        tracking-[0.3em]
                        text-[#f5d98a]
                      "
                    >
                      Darsh
                    </span>

                    <div
                      className="
                        h-px
                        w-10
                        bg-[#d4ad54]/50
                      "
                    />

                  </div>

                </div>

              </motion.div>

            )}

          </main>

        </div>

      </div>

    </div>
  );
};

export default Categories;