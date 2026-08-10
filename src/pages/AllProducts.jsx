import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  X,
  ChevronDown,
  RotateCcw,
  CheckCircle,
  PackageCheck,
  PackageX,
  SlidersHorizontal,
  ArrowUpRight,
} from "lucide-react";


/* =========================================================
   CATEGORIES
========================================================= */

const ALL_CATEGORIES = [
"Bridal collection",
    "Kanthastitch",
    "Saraswati Pujo Special",
    "Pure Silk Replica",
    "Pure Silk",
    "Fancy Saree",
    "All saree",
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

const AllProducts = () => {

  const { allProduct, url } = useAppContext();


  /* =======================================================
     STATES
  ======================================================= */

  const [searchQuery, setSearchQuery] = useState("");

  const [sortBy, setSortBy] =
    useState("default");

  const [priceRange, setPriceRange] =
    useState([0, 3000]);

  const [stockStatus, setStockStatus] =
    useState("all");

  const [selectedCategory, setSelectedCategory] =
    useState("all");

  const [selectedSubCategory, setSelectedSubCategory] =
    useState("all");

  const [showFilters, setShowFilters] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [openSection, setOpenSection] =
    useState("price");


  /* =======================================================
     LOADING
  ======================================================= */

  useEffect(() => {
    if (allProduct) {
      setIsLoading(false);
    }
  }, [allProduct]);


  /* =======================================================
     SUB CATEGORIES
  ======================================================= */

  const availableSubCategories = useMemo(() => {
    if (!allProduct) return [];

    if (selectedCategory === "all") {
      return [];
    }

    const subs = [
      ...new Set(
        allProduct
          .filter(
            (product) =>
              product.category === selectedCategory
          )
          .map(
            (product) =>
              product.subCategory || "other"
          )
      ),
    ];

    return ["all", ...subs];
  }, [
    allProduct,
    selectedCategory,
  ]);


  /* =======================================================
     FILTERING
  ======================================================= */

  const filteredProducts = useMemo(() => {
    let products = [...(allProduct || [])];


    /* Category */

    if (selectedCategory !== "all") {
      products = products.filter(
        (product) =>
          product.category === selectedCategory
      );
    }


    /* Subcategory */

    if (selectedSubCategory !== "all") {
      products = products.filter(
        (product) =>
          product.subCategory ===
          selectedSubCategory
      );
    }


    /* Search */

    if (searchQuery.trim()) {
      const query =
        searchQuery.toLowerCase().trim();

      products = products.filter(
        (product) =>
          product.productName
            ?.toLowerCase()
            .includes(query)
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
        (a, b) => a.price - b.price
      );
    }

    if (sortBy === "priceHighLow") {
      products.sort(
        (a, b) => b.price - a.price
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
    searchQuery,
    priceRange,
    sortBy,
    stockStatus,
    selectedCategory,
    selectedSubCategory,
  ]);


  /* =======================================================
     RESET
  ======================================================= */

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 3000]);
    setSortBy("default");
    setStockStatus("all");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setShowFilters(false);
  };


  /* =======================================================
     FILTER SECTION
  ======================================================= */

  const FilterSection = ({
    id,
    title,
    children,
  }) => {
    const isOpen =
      openSection === id;

    return (
      <div
        className="
          border-b
          border-[#741522]/10
          pb-5
          mb-5
        "
      >

        <button
          type="button"
          onClick={() =>
            setOpenSection(
              isOpen ? "" : id
            )
          }
          className="
            w-full
            flex
            items-center
            justify-between
            text-left
          "
        >

          <span
            className="
              text-[9px]
              tracking-[0.22em]
              uppercase
              text-[#4b2929]
            "
          >
            {title}
          </span>

          <ChevronDown
            size={15}
            strokeWidth={1}
            className={`
              text-[#741522]
              transition-transform
              duration-300
              ${isOpen ? "rotate-180" : ""}
            `}
          />

        </button>


        <AnimatePresence initial={false}>

          {isOpen && (
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
                duration: 0.3,
              }}
              className="
                overflow-hidden
                mt-5
              "
            >
              {children}
            </motion.div>
          )}

        </AnimatePresence>

      </div>
    );
  };


  /* =======================================================
     LOADING SCREEN
  ======================================================= */

  if (isLoading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#f8f4eb]
          flex
          items-center
          justify-center
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="text-center"
        >

          <div
            className="
              font-serif
              text-[32px]
              tracking-[0.25em]
              text-[#741522]
            "
          >
            DARSH
          </div>

          <div
            className="
              mt-4
              w-20
              h-px
              mx-auto
              bg-[#d4ad54]
            "
          />

          <p
            className="
              mt-4
              text-[8px]
              tracking-[0.35em]
              uppercase
              text-[#806c63]
              animate-pulse
            "
          >
            Loading the collection
          </p>

        </motion.div>

      </div>
    );
  }


  /* =======================================================
     MAIN
  ======================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#f8f4eb]
        text-[#3f1616]
        overflow-hidden
      "
    >


      {/* ===================================================
          HEADER / SHOP INTRO
      =================================================== */}

      <section
        className="
          relative
          border-b
          border-[#741522]/10
        "
      >

        <div
          className="
            max-w-[1180px]
            mx-auto
            px-5
            sm:px-8
            lg:px-10
            pt-16
            sm:pt-20
            lg:pt-24
            pb-10
          "
        >

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
          >

            {/* Eyebrow */}

            <div
              className="
                flex
                items-center
                gap-3
                mb-5
              "
            >

              <span
                className="
                  w-7
                  h-px
                  bg-[#d4ad54]
                "
              />

              <span
                className="
                  text-[8px]
                  tracking-[0.4em]
                  uppercase
                  text-[#977e73]
                "
              >
                THE SHOP
              </span>

            </div>


            {/* Heading */}

            <h1
              className="
                font-serif
                font-normal
                text-[#3f1616]
                text-[42px]
                sm:text-[52px]
                md:text-[60px]
                leading-[1.05]
                tracking-[-0.025em]
              "
            >
              Every saree,
              <span className="italic">
                {" "}one place.
              </span>
            </h1>


            {/* Description */}

            <p
              className="
                mt-5
                max-w-[560px]
                text-[10px]
                sm:text-[12px]
                leading-6
                text-[#806c63]
              "
            >
              Explore our complete collection
              of handpicked sarees and
              handcrafted pieces. Each weave
              carries its own story, texture and
              character.
            </p>

          </motion.div>


          {/* =================================================
              CATEGORY TABS
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.25,
              duration: 0.6,
            }}
            className="
              mt-8
              flex
              gap-2
              overflow-x-auto
              pb-2
              scrollbar-hide
            "
          >

            {ALL_CATEGORIES.map(
              (category) => {

                const active =
                  selectedCategory ===
                  category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(
                        category
                      );

                      setSelectedSubCategory(
                        "all"
                      );
                    }}
                    className={`
                      shrink-0
                      px-5
                      py-2.5
                      border
                      text-[8px]
                      tracking-[0.22em]
                      uppercase
                      transition-all
                      duration-300
                      ${
                        active
                          ? `
                            bg-[#741522]
                            text-[#f8f4eb]
                            border-[#741522]
                          `
                          : `
                            bg-transparent
                            text-[#6f5b53]
                            border-[#741522]/15
                            hover:border-[#741522]/40
                            hover:text-[#741522]
                          `
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              }
            )}

          </motion.div>

        </div>

      </section>


      {/* ===================================================
          SUBCATEGORY
      =================================================== */}

      <AnimatePresence>

        {selectedCategory !== "all" &&
          availableSubCategories.length >
            0 && (

            <motion.section
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="
                border-b
                border-[#741522]/10
                overflow-hidden
              "
            >

              <div
                className="
                  max-w-[1180px]
                  mx-auto
                  px-5
                  sm:px-8
                  lg:px-10
                  py-5
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                    overflow-x-auto
                    scrollbar-hide
                  "
                >

                  <span
                    className="
                      shrink-0
                      text-[7px]
                      tracking-[0.25em]
                      uppercase
                      text-[#977e73]
                    "
                  >
                    {selectedCategory}
                  </span>


                  <span
                    className="
                      w-px
                      h-4
                      bg-[#741522]/15
                    "
                  />


                  {availableSubCategories.map(
                    (sub) => {

                      const active =
                        selectedSubCategory ===
                        sub;

                      return (
                        <button
                          key={sub}
                          type="button"
                          onClick={() =>
                            setSelectedSubCategory(
                              sub
                            )
                          }
                          className={`
                            shrink-0
                            text-[8px]
                            uppercase
                            tracking-[0.16em]
                            transition-colors
                            ${
                              active
                                ? "text-[#741522]"
                                : "text-[#806c63] hover:text-[#741522]"
                            }
                          `}
                        >
                          {sub}
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </motion.section>

          )}

      </AnimatePresence>


      {/* ===================================================
          PRODUCTS AREA
      =================================================== */}

      <section
        className="
          max-w-[1180px]
          mx-auto
          px-5
          sm:px-8
          lg:px-10
          py-12
          sm:py-14
          lg:py-16
        "
      >

        <div
          className="
            flex
            flex-col
            lg:flex-row
            gap-10
          "
        >


          {/* =================================================
              DESKTOP FILTER
          ================================================= */}

          <aside
            className="
              hidden
              lg:block
              w-[235px]
              shrink-0
            "
          >

            <div
              className="
                sticky
                top-24
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between
                  mb-7
                "
              >

                <h2
                  className="
                    font-serif
                    text-[22px]
                    text-[#3f1616]
                  "
                >
                  Refine
                </h2>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="
                    text-[7px]
                    tracking-[0.18em]
                    uppercase
                    text-[#977e73]
                    hover:text-[#741522]
                    transition-colors
                  "
                >
                  Reset
                </button>

              </div>


              {/* PRICE */}

              <FilterSection
                id="priceDesktop"
                title="Price Range"
              >

                <div className="space-y-4">

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      text-[10px]
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


                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([
                        priceRange[0],
                        Number(
                          e.target.value
                        ),
                      ])
                    }
                    className="
                      w-full
                      accent-[#741522]
                    "
                  />

                </div>

              </FilterSection>


              {/* AVAILABILITY */}

              <FilterSection
                id="stockDesktop"
                title="Availability"
              >

                <div className="space-y-3">

                  <StockRadio
                    name="desktop-stock"
                    checked={
                      stockStatus ===
                      "all"
                    }
                    onChange={() =>
                      setStockStatus("all")
                    }
                    label="All pieces"
                  />


                  <StockRadio
                    name="desktop-stock"
                    checked={
                      stockStatus ===
                      "inStock"
                    }
                    onChange={() =>
                      setStockStatus(
                        "inStock"
                      )
                    }
                    label="In stock"
                    icon={
                      <PackageCheck
                        size={13}
                      />
                    }
                  />


                  <StockRadio
                    name="desktop-stock"
                    checked={
                      stockStatus ===
                      "outOfStock"
                    }
                    onChange={() =>
                      setStockStatus(
                        "outOfStock"
                      )
                    }
                    label="Out of stock"
                    icon={
                      <PackageX
                        size={13}
                      />
                    }
                  />

                </div>

              </FilterSection>


              {/* SORT */}

              <FilterSection
                id="sortDesktop"
                title="Sort By"
              >

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    h-10
                    px-3
                    bg-transparent
                    border
                    border-[#741522]/15
                    outline-none
                    text-[9px]
                    text-[#5e4941]
                    focus:border-[#741522]
                  "
                >

                  <option value="default">
                    Recommended
                  </option>

                  <option value="priceLowHigh">
                    Price: Low → High
                  </option>

                  <option value="priceHighLow">
                    Price: High → Low
                  </option>

                  <option value="newest">
                    Newest First
                  </option>

                </select>

              </FilterSection>


              {/* FILTER SUMMARY */}

              <div
                className="
                  mt-7
                  pt-6
                  border-t
                  border-[#741522]/10
                "
              >

                <p
                  className="
                    text-[8px]
                    tracking-[0.15em]
                    uppercase
                    text-[#977e73]
                  "
                >
                  SHOWING
                </p>

                <p
                  className="
                    font-serif
                    text-[26px]
                    text-[#741522]
                    mt-1
                  "
                >
                  {filteredProducts.length}
                </p>

                <p
                  className="
                    text-[9px]
                    text-[#806c63]
                  "
                >
                  pieces in this collection
                </p>

              </div>

            </div>

          </aside>


          {/* =================================================
              PRODUCTS
          ================================================= */}

          <div className="flex-1 min-w-0">


            {/* ===============================================
                TOOLBAR
            =============================================== */}

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:items-center
                justify-between
                gap-4
                mb-7
              "
            >

              {/* Search */}

              <div
                className="
                  relative
                  w-full
                  sm:max-w-[390px]
                "
              >

                <Search
                  size={16}
                  strokeWidth={1.2}
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    text-[#977e73]
                  "
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  placeholder="Search the collection..."
                  className="
                    w-full
                    h-10
                    pl-7
                    pr-7
                    bg-transparent
                    border-b
                    border-[#741522]/20
                    outline-none
                    text-[10px]
                    text-[#3f1616]
                    placeholder:text-[#a6948b]
                    focus:border-[#741522]
                    transition-colors
                  "
                />

                {searchQuery && (
                  <button
                    type="button"
                    onClick={() =>
                      setSearchQuery("")
                    }
                    className="
                      absolute
                      right-0
                      top-1/2
                      -translate-y-1/2
                      text-[#977e73]
                      hover:text-[#741522]
                    "
                  >
                    <X size={14} />
                  </button>
                )}

              </div>


              {/* Right controls */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  sm:justify-end
                  gap-4
                "
              >

                <p
                  className="
                    text-[8px]
                    tracking-[0.16em]
                    uppercase
                    text-[#977e73]
                  "
                >
                  {filteredProducts.length}
                  {" "}products
                </p>


                {/* Mobile Filter */}

                <button
                  type="button"
                  onClick={() =>
                    setShowFilters(true)
                  }
                  className="
                    lg:hidden
                    inline-flex
                    items-center
                    gap-2
                    h-9
                    px-4
                    border
                    border-[#741522]/20
                    text-[8px]
                    tracking-[0.18em]
                    uppercase
                    text-[#741522]
                  "
                >

                  <SlidersHorizontal
                    size={13}
                    strokeWidth={1.2}
                  />

                  Filter

                </button>


                {/* Mobile Sort */}

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value
                    )
                  }
                  className="
                    lg:hidden
                    h-9
                    px-3
                    bg-transparent
                    border
                    border-[#741522]/20
                    text-[8px]
                    text-[#741522]
                    outline-none
                  "
                >

                  <option value="default">
                    Sort
                  </option>

                  <option value="priceLowHigh">
                    Price ↑
                  </option>

                  <option value="priceHighLow">
                    Price ↓
                  </option>

                  <option value="newest">
                    Newest
                  </option>

                </select>

              </div>

            </div>


            {/* ===============================================
                PRODUCT GRID
            =============================================== */}

            {filteredProducts.length > 0 ? (

              <motion.div
                layout
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  gap-x-4
                  sm:gap-x-5
                  gap-y-9
                  sm:gap-y-12
                "
              >

                <AnimatePresence mode="popLayout">

                  {filteredProducts.map(
                    (product, index) => (

                      <motion.div
                        layout
                        key={product._id}
                        initial={{
                          opacity: 0,
                          y: 25,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.45,
                          delay:
                            index * 0.035,
                        }}
                        className="
                          min-w-0
                          group
                        "
                      >

                        <div
                          className="
                            relative
                            transition-transform
                            duration-500
                            group-hover:-translate-y-1
                          "
                        >

                          <ProductCard
                            product={{
                              id: product._id,
                              name:
                                product.productName,
                              image:
                                product
                                  .images?.[0]
                                  ? `${url}/img/${product.images[0]}`
                                  : "",
                              price:
                                product.price,
                              description:
                                product.description,
                              stock:
                                product.stock,
                            }}
                            isCompactMobile={true}
                            onAddToCart={() => {}}
                            onToggleWishlist={() => {}}
                          />

                        </div>

                      </motion.div>

                    )
                  )}

                </AnimatePresence>

              </motion.div>

            ) : (

              /* =============================================
                 EMPTY STATE
              ============================================= */

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
                  min-h-[420px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  border-t
                  border-b
                  border-[#741522]/10
                "
              >

                <div
                  className="
                    w-16
                    h-16
                    border
                    border-[#d4ad54]
                    flex
                    items-center
                    justify-center
                    mb-6
                  "
                >

                  <span
                    className="
                      font-serif
                      text-[22px]
                      italic
                      text-[#741522]
                    "
                  >
                    D
                  </span>

                </div>


                <h3
                  className="
                    font-serif
                    text-[27px]
                    text-[#3f1616]
                  "
                >
                  No pieces found.
                </h3>


                <p
                  className="
                    mt-3
                    max-w-[350px]
                    text-[10px]
                    leading-5
                    text-[#806c63]
                  "
                >
                  Try another search or
                  adjust your filters to
                  discover more of the
                  collection.
                </p>


                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="
                    group
                    mt-6
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    bg-[#741522]
                    text-[#f8f4eb]
                    text-[8px]
                    tracking-[0.2em]
                    uppercase
                    hover:bg-[#d4ad54]
                    hover:text-[#741522]
                    transition-all
                    duration-300
                  "
                >

                  <RotateCcw size={13} />

                  Reset Filters

                </button>

              </motion.div>

            )}

          </div>

        </div>

      </section>


      {/* ===================================================
          MOBILE FILTER DRAWER
      =================================================== */}

      <AnimatePresence>

        {showFilters && (
          <>
            {/* Overlay */}

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
                setShowFilters(false)
              }
              className="
                fixed
                inset-0
                z-[80]
                bg-[#3f1616]/40
                backdrop-blur-[2px]
                lg:hidden
              "
            />


            {/* Drawer */}

            <motion.aside
              initial={{
                x: "-100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "-100%",
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
              }}
              className="
                fixed
                left-0
                top-0
                bottom-0
                z-[90]
                w-[88%]
                max-w-[390px]
                bg-[#f8f4eb]
                overflow-y-auto
                lg:hidden
              "
            >

              <div
                className="
                  px-6
                  py-7
                "
              >

                {/* Drawer Header */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    pb-6
                    border-b
                    border-[#741522]/10
                  "
                >

                  <div>

                    <p
                      className="
                        text-[7px]
                        tracking-[0.3em]
                        uppercase
                        text-[#977e73]
                      "
                    >
                      THE SHOP
                    </p>

                    <h2
                      className="
                        font-serif
                        text-[28px]
                        mt-1
                        text-[#3f1616]
                      "
                    >
                      Refine
                    </h2>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      setShowFilters(false)
                    }
                    className="
                      w-9
                      h-9
                      border
                      border-[#741522]/15
                      flex
                      items-center
                      justify-center
                      text-[#741522]
                    "
                  >

                    <X size={17} />

                  </button>

                </div>


                <div className="pt-7">

                  {/* Price */}

                  <FilterSection
                    id="mobilePrice"
                    title="Price Range"
                  >

                    <div className="space-y-5">

                      <div
                        className="
                          flex
                          justify-between
                          text-[10px]
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


                      <input
                        type="range"
                        min="0"
                        max="3000"
                        step="100"
                        value={
                          priceRange[1]
                        }
                        onChange={(e) =>
                          setPriceRange([
                            priceRange[0],
                            Number(
                              e.target.value
                            ),
                          ])
                        }
                        className="
                          w-full
                          accent-[#741522]
                        "
                      />

                    </div>

                  </FilterSection>


                  {/* Availability */}

                  <FilterSection
                    id="mobileStock"
                    title="Availability"
                  >

                    <div className="space-y-4">

                      <StockRadio
                        name="mobile-stock"
                        checked={
                          stockStatus ===
                          "all"
                        }
                        onChange={() =>
                          setStockStatus(
                            "all"
                          )
                        }
                        label="All pieces"
                      />


                      <StockRadio
                        name="mobile-stock"
                        checked={
                          stockStatus ===
                          "inStock"
                        }
                        onChange={() =>
                          setStockStatus(
                            "inStock"
                          )
                        }
                        label="In stock"
                        icon={
                          <PackageCheck
                            size={13}
                          />
                        }
                      />


                      <StockRadio
                        name="mobile-stock"
                        checked={
                          stockStatus ===
                          "outOfStock"
                        }
                        onChange={() =>
                          setStockStatus(
                            "outOfStock"
                          )
                        }
                        label="Out of stock"
                        icon={
                          <PackageX
                            size={13}
                          />
                        }
                      />

                    </div>

                  </FilterSection>


                  {/* Sort */}

                  <FilterSection
                    id="mobileSort"
                    title="Sort By"
                  >

                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(
                          e.target.value
                        )
                      }
                      className="
                        w-full
                        h-11
                        px-3
                        bg-transparent
                        border
                        border-[#741522]/15
                        text-[9px]
                        outline-none
                      "
                    >

                      <option value="default">
                        Recommended
                      </option>

                      <option value="priceLowHigh">
                        Price: Low → High
                      </option>

                      <option value="priceHighLow">
                        Price: High → Low
                      </option>

                      <option value="newest">
                        Newest First
                      </option>

                    </select>

                  </FilterSection>


                  {/* Buttons */}

                  <div
                    className="
                      grid
                      grid-cols-2
                      gap-3
                      mt-8
                    "
                  >

                    <button
                      type="button"
                      onClick={
                        handleResetFilters
                      }
                      className="
                        h-11
                        border
                        border-[#741522]/20
                        text-[#741522]
                        text-[8px]
                        tracking-[0.18em]
                        uppercase
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >

                      <RotateCcw
                        size={13}
                      />

                      Reset

                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        setShowFilters(
                          false
                        )
                      }
                      className="
                        h-11
                        bg-[#741522]
                        text-[#f8f4eb]
                        text-[8px]
                        tracking-[0.18em]
                        uppercase
                        flex
                        items-center
                        justify-center
                        gap-2
                      "
                    >

                      <CheckCircle
                        size={13}
                      />

                      Apply

                    </button>

                  </div>

                </div>

              </div>

            </motion.aside>
          </>
        )}

      </AnimatePresence>


      {/* ===================================================
          BOTTOM EDITORIAL CTA
      =================================================== */}

      <section
        className="
          bg-[#741522]
          text-center
          py-16
          sm:py-20
          px-5
        "
      >

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.7,
          }}
        >

          <p
            className="
              text-[7px]
              tracking-[0.4em]
              uppercase
              text-[#d4ad54]
              mb-4
            "
          >
            DARSH HANDWOVEN
          </p>


          <h2
            className="
              font-serif
              italic
              text-[#f8f4eb]
              text-[30px]
              sm:text-[40px]
            "
          >
            Find a weave worth keeping.
          </h2>


          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="
              group
              inline-flex
              items-center
              gap-3
              mt-7
              border
              border-[#d4ad54]
              px-7
              py-3
              text-[8px]
              tracking-[0.25em]
              uppercase
              text-[#d4ad54]
              hover:bg-[#d4ad54]
              hover:text-[#741522]
              transition-all
              duration-300
            "
          >

            Explore Again

            <ArrowUpRight
              size={14}
              strokeWidth={1.2}
              className="
                transition-transform
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />

          </button>

        </motion.div>

      </section>


      {/* ===================================================
          LOCAL STYLES
      =================================================== */}

      <style>
        {`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          input[type="range"] {
            height: 2px;
            cursor: pointer;
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
   STOCK RADIO
========================================================= */

const StockRadio = ({
  name,
  checked,
  onChange,
  label,
  icon,
}) => {
  return (
    <label
      className="
        flex
        items-center
        gap-3
        cursor-pointer
        group
      "
    >

      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="
          sr-only
        "
      />


      <span
        className={`
          w-4
          h-4
          rounded-full
          border
          flex
          items-center
          justify-center
          transition-all
          ${
            checked
              ? "border-[#741522]"
              : "border-[#806c63]/40"
          }
        `}
      >

        {checked && (
          <span
            className="
              w-2
              h-2
              rounded-full
              bg-[#741522]
            "
          />
        )}

      </span>


      <span
        className={`
          flex
          items-center
          gap-2
          text-[10px]
          transition-colors
          ${
            checked
              ? "text-[#741522]"
              : "text-[#806c63] group-hover:text-[#741522]"
          }
        `}
      >

        {icon}

        {label}

      </span>

    </label>
  );
};


export default AllProducts;