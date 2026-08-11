import { useParams } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";

import { motion, AnimatePresence } from "framer-motion";

import {
  Search,
  Filter,
  X,
  ChevronDown,
  RotateCcw,
  CheckCircle,
  PackageCheck,
  PackageX,
  Sparkles,
  Blocks,
  SlidersHorizontal,
  Gem,
} from "lucide-react";


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
   

  /* ============================================================
     CATEGORY DATA
  ============================================================ */

  const categories = [
    {
      id: "1",
      name: "Silk Saree",
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

    const subCats = new Set();

    allProduct.forEach((product) => {
      if (
        product.category?.toLowerCase() ===
          name?.toLowerCase() &&
        product.subCategory
      ) {
        subCats.add(
          product.subCategory.toLowerCase()
        );
      }
    });

    setAvailableSubcategories(
      Array.from(subCats)
    );

  }, [allProduct, name]);


  /* ============================================================
     FILTER PRODUCTS
  ============================================================ */

  const filteredProducts = useMemo(() => {
    let products =
      allProduct?.filter(
        (product) =>
          product.category?.toLowerCase() ===
          name?.toLowerCase()
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
    name,
    selectedSubCategory,
    searchQuery,
    priceRange,
    sortBy,
    stockStatus,
  ]);


  /* ============================================================
     RESET
  ============================================================ */

  const handleResetFilters = () => {
    setPriceRange([0, 3000]);
    setSortBy("default");
    setStockStatus("all");
    setSelectedSubCategory("all");
    setSearchQuery("");
    setShowFilters(false);
  };


  const handleApplyFilters = () => {
    setShowFilters(false);
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
            MOBILE FILTER OVERLAY
        ====================================================== */}

        <AnimatePresence>

          {showFilters && (

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
                  setShowFilters(false)
                }
                className="
                  fixed
                  inset-0
                  z-40
                  bg-[#2b0d10]/60
                  backdrop-blur-sm
                  md:hidden
                "
              />


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
                  z-50
                  h-full
                  w-[88%]
                  max-w-sm
                  overflow-y-auto
                  bg-[#fffdf8]
                  p-5
                  shadow-2xl
                  md:hidden
                "
              >

                <div
                  className="
                    mb-7
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
                        tracking-[0.25em]
                        text-[#b88732]
                      "
                    >
                      Refine
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

                  </div>


                  <button
                    onClick={() =>
                      setShowFilters(false)
                    }
                    className="
                      flex
                      h-9
                      w-9
                      items-center
                      justify-center
                      rounded-full
                      bg-[#f3e8d2]
                      text-[#741522]
                    "
                  >
                    <X className="h-4 w-4" />
                  </button>

                </div>


                {/* Price */}

                <FilterSection
                  id="price"
                  title="Price Range"
                  icon={
                    <span className="text-[#b88732]">
                      ₹
                    </span>
                  }
                >

                  <div className="space-y-4">

                    <div
                      className="
                        flex
                        items-center
                        gap-2
                      "
                    >

                      <input
                        type="number"
                        min="0"
                        max="3000"
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([
                            Number(
                              e.target.value
                            ),
                            priceRange[1],
                          ])
                        }
                        className="
                          w-full
                          rounded-xl
                          border
                          border-[#d8cabe]
                          bg-white
                          px-3
                          py-2
                          text-sm
                          outline-none
                          focus:border-[#741522]
                          focus:ring-2
                          focus:ring-[#741522]/10
                        "
                      />

                      <span className="text-[#a99082]">
                        —
                      </span>

                      <input
                        type="number"
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
                          rounded-xl
                          border
                          border-[#d8cabe]
                          bg-white
                          px-3
                          py-2
                          text-sm
                          outline-none
                          focus:border-[#741522]
                          focus:ring-2
                          focus:ring-[#741522]/10
                        "
                      />

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


                    <div
                      className="
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

                  </div>

                </FilterSection>


                {/* Availability */}

                <FilterSection
                  id="stock"
                  title="Availability"
                  icon={
                    <PackageCheck className="h-4 w-4 text-[#b88732]" />
                  }
                >

                  <div className="space-y-3">

                    {[
                      {
                        value: "all",
                        label: "All Products",
                      },
                      {
                        value: "inStock",
                        label: "In Stock",
                        icon: (
                          <PackageCheck className="h-4 w-4 text-green-600" />
                        ),
                      },
                      {
                        value: "outOfStock",
                        label: "Out of Stock",
                        icon: (
                          <PackageX className="h-4 w-4 text-red-500" />
                        ),
                      },
                    ].map((item) => (

                      <label
                        key={item.value}
                        className="
                          flex
                          cursor-pointer
                          items-center
                          gap-3
                          rounded-xl
                          p-2
                          transition
                          hover:bg-[#faf3e5]
                        "
                      >

                        <input
                          type="radio"
                          name="mobileStock"
                          value={item.value}
                          checked={
                            stockStatus ===
                            item.value
                          }
                          onChange={() =>
                            setStockStatus(
                              item.value
                            )
                          }
                          className="accent-[#741522]"
                        />

                        {item.icon}

                        <span
                          className="
                            text-sm
                            text-[#5f4b44]
                          "
                        >
                          {item.label}
                        </span>

                      </label>

                    ))}

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
                      py-3
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


                <div className="flex gap-3">

                  <button
                    onClick={handleResetFilters}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-[#d4ad54]/30
                      bg-white
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-[#741522]
                      transition
                      hover:bg-[#faf3e5]
                    "
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </button>


                  <button
                    onClick={handleApplyFilters}
                    className="
                      flex
                      flex-1
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-[#741522]
                      px-4
                      py-3
                      text-sm
                      font-bold
                      text-white
                      shadow-lg
                    "
                  >
                    <CheckCircle className="h-4 w-4" />
                    Apply
                  </button>

                </div>

              </motion.aside>
            </>

          )}

        </AnimatePresence>


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
                min="0"
                max="3000"
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

            {/* Search + Mobile Filter */}

            <div
              className="
                mb-6
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >

              <div
                className="
                  group
                  relative
                  flex-1
                "
              >

                <Search
                  className="
                    absolute
                    left-4
                    top-1/2
                    h-4
                    w-4
                    -translate-y-1/2
                    text-[#a99082]
                    transition
                    group-focus-within:text-[#741522]
                  "
                />

                <input
                  type="text"
                  placeholder={`Search ${name}...`}
                  value={searchQuery}
                  onChange={(e) =>
                    setSearchQuery(
                      e.target.value
                    )
                  }
                  className="
                    h-12
                    w-full
                    rounded-xl
                    border
                    border-[#d8cabe]
                    bg-white
                    pl-11
                    pr-4
                    text-sm
                    text-[#4a1815]
                    shadow-sm
                    outline-none
                    transition-all
                    duration-300
                    placeholder:text-[#a99082]
                    focus:border-[#741522]
                    focus:ring-4
                    focus:ring-[#741522]/10
                  "
                />

              </div>


              <button
                onClick={() =>
                  setShowFilters(true)
                }
                className="
                  flex
                  h-12
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#741522]
                  px-5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  transition
                  hover:bg-[#5f111b]
                  lg:hidden
                "
              >

                <Filter className="h-4 w-4" />

                Filters

              </button>

            </div>


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
                        key={product._id}
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
                      >

                        <ProductCard
                          product={{
                            id: product._id,
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