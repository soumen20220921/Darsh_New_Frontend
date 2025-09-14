import { useNavigate } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ArrowLeft,
  ChevronDown,
  RotateCcw,
  CheckCircle,
  PackageCheck,
  PackageX,
  Sparkles,
  Blocks,
} from "lucide-react";

const ALL_CATEGORIES = [
  "all",
  "saree",
  "blouse",
  "men",
  "kids",
  "jwellary",
  "acceceries",
  "home decor",
  "footwear",
  "beauty",
  "electronics",
  
];

const AllProducts = () => {
  const navigate = useNavigate();
  const { allProduct, url } = useAppContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 3000]);
  const [stockStatus, setStockStatus] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState("price");

  useEffect(() => {
    if (allProduct) {
      setIsLoading(false);
    }
  }, [allProduct]);

  // Extract unique subCategories for selected category
  const availableSubCategories = useMemo(() => {
    if (!allProduct) return [];
    if (selectedCategory === "all") return [];

    const subs = [
      ...new Set(
        allProduct
          .filter((p) => p.category === selectedCategory)
          .map((p) => p.subCategory || "other")
      ),
    ];
    return ["all", ...subs];
  }, [allProduct, selectedCategory]);

  // Filtering logic
  const filteredProducts = useMemo(() => {
    let products = allProduct || [];

    if (selectedCategory !== "all") {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (selectedSubCategory !== "all") {
      products = products.filter((p) => p.subCategory === selectedSubCategory);
    }

    if (searchQuery) {
      products = products.filter((p) =>
        p.productName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    products = products.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (stockStatus === "inStock") {
      products = products.filter((p) => p.stock > 0);
    } else if (stockStatus === "outOfStock") {
      products = products.filter((p) => !p.stock || p.stock === 0);
    }

    if (sortBy === "priceLowHigh") {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceHighLow") {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === "newest") {
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriceRange([0, 3000]);
    setSortBy("default");
    setStockStatus("all");
    setSelectedCategory("all");
    setSelectedSubCategory("all");
    setShowFilters(false);
  };

  const handleApplyFilters = () => {
    setShowFilters(false);
  };

  const FilterSection = ({ id, title, children }) => (
    <div className="border-b pb-3 mb-3">
      <button
        className="flex justify-between items-center w-full text-left font-medium text-gray-700"
        onClick={() => setOpenSection(openSection === id ? "" : id)}
      >
        {title}
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            openSection === id ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {openSection === id && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="mt-3 text-sm text-gray-600 space-y-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-700 animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.div
        className="relative h-60 md:h-80 rounded-b-3xl mb-10 overflow-hidden"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="./IMG/all.png"
          alt="All Products"
          className="w-full h-full object-cover scale-105 hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-4">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl md:text-5xl font-bold mb-2 flex items-center gap-2 animate-fade-in-down">
            <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            All Products
          </h1>
          <p className="text-lg">Discover our entire collection</p>
        </div>
      </motion.div>

      {/* Category Tabs */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <motion.div
          className="flex gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 scrollbar-thumb-rounded-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {ALL_CATEGORIES.map((category) => (
            <motion.button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedSubCategory("all");
              }}
              className={`
                flex-shrink-0 px-6 py-2 rounded-full font-medium text-sm capitalize whitespace-nowrap transition-all duration-300
                ${
                  selectedCategory === category
                    ? "bg-white text-gray-800 border-2 border-indigo-500 shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Subcategory Tabs */}
      {selectedCategory !== "all" && availableSubCategories.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <motion.h3
            className="text-center text-lg md:text-xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Explore {selectedCategory}
          </motion.h3>
          <motion.div
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-100 scrollbar-thumb-rounded-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            {availableSubCategories.map((sub) => (
              <motion.button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`
                  flex-shrink-0 px-5 py-1.5 rounded-full font-medium text-xs capitalize transition-all duration-300
                  ${
                    selectedSubCategory === sub
                      ? "bg-indigo-600 text-white shadow-md"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {sub}
              </motion.button>
            ))}
          </motion.div>
        </div>
      )}
      {/* Filters + Products */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-10">
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="fixed left-0 top-0 h-full w-full max-w-sm z-40 bg-white p-6 overflow-y-auto rounded-r-2xl md:hidden"
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-700">Filters</h3>
                <X
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setShowFilters(false)}
                />
              </div>

              {/* Accordion Filters */}
              <FilterSection id="price" title="Price Range">
                <div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) =>
                        setPriceRange([Number(e.target.value), priceRange[1]])
                      }
                      className="w-20 border rounded-lg px-2 py-1 text-sm"
                    />
                    <span className="text-gray-500">-</span>
                    <input
                      type="number"
                      min="0"
                      max="3000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-20 border rounded-lg px-2 py-1 text-sm"
                    />
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], Number(e.target.value)])
                    }
                    className="w-full mt-3"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    ₹{priceRange[0]} - ₹{priceRange[1]}
                  </p>
                </div>
              </FilterSection>

              <FilterSection id="stock" title="Availability">
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    value="all"
                    checked={stockStatus === "all"}
                    onChange={() => setStockStatus("all")}
                  />
                  <span className="text-sm text-gray-600">All</span>
                </label>
                <label className="flex items-center gap-2 mb-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    value="inStock"
                    checked={stockStatus === "inStock"}
                    onChange={() => setStockStatus("inStock")}
                  />
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <PackageCheck className="w-4 h-4 text-green-500" /> In Stock
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="stock"
                    value="outOfStock"
                    checked={stockStatus === "outOfStock"}
                    onChange={() => setStockStatus("outOfStock")}
                  />
                  <span className="text-sm text-gray-600 flex items-center gap-1">
                    <PackageX className="w-4 h-4 text-red-500" /> Out of Stock
                  </span>
                </label>
              </FilterSection>

              <FilterSection id="sort" title="Sort By">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="default">Default</option>
                  <option value="priceLowHigh">Price: Low → High</option>
                  <option value="priceHighLow">Price: High → Low</option>
                  <option value="newest">Newest</option>
                </select>
              </FilterSection>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 px-4 py-2 flex items-center justify-center gap-2 border rounded-xl text-gray-600 hover:bg-gray-100"
                >
                  <RotateCcw className="w-4 h-4" /> Reset
                </button>
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 px-4 py-2 flex items-center justify-center gap-2 bg-indigo-500 text-white rounded-xl shadow hover:bg-indigo-600"
                >
                  <CheckCircle className="w-4 h-4" /> Apply
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Filters */}
        <motion.div
          className="hidden md:block md:w-1/4 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 h-fit sticky top-4"
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h3 className="text-lg font-semibold text-indigo-600 mb-4">
            Filters
          </h3>
          <FilterSection id="priceDesktop" title="Price Range">
            <input
              type="range"
              min="0"
              max="3000"
              step="100"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="w-full accent-indigo-500"
            />
            <p>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </p>
          </FilterSection>
          <FilterSection id="stockDesktop" title="Availability">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stockDesktop"
                value="all"
                checked={stockStatus === "all"}
                onChange={() => setStockStatus("all")}
              />
              All
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stockDesktop"
                value="inStock"
                checked={stockStatus === "inStock"}
                onChange={() => setStockStatus("inStock")}
              />
              <PackageCheck className="w-4 h-4 text-green-500" /> In Stock
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stockDesktop"
                value="outOfStock"
                checked={stockStatus === "outOfStock"}
                onChange={() => setStockStatus("outOfStock")}
              />
              <PackageX className="w-4 h-4 text-red-500" /> Out of Stock
            </label>
          </FilterSection>
          <FilterSection id="sortDesktop" title="Sort By">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full border rounded-xl px-3 py-2 focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Default</option>
              <option value="priceLowHigh">Price: Low → High</option>
              <option value="priceHighLow">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </FilterSection>
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleResetFilters}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow hover:shadow-lg transition"
            >
              <RotateCcw className="inline w-4 h-4 mr-1" /> Reset
            </button>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <button
              className="flex md:hidden items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl shadow"
              onClick={() => setShowFilters(true)}
            >
              <Filter className="w-5 h-5" /> Filters
            </button>
          </div>

          <motion.p
            className="text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Showing <b>{filteredProducts.length}</b> products
          </motion.p>

          <motion.div
            className="grid grid-cols-2 mb-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <motion.div
                  key={product._id}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
                  }}
                >
                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.productName,
                      image: product.images?.[0]
                        ? `${url}/img/${product.images[0]}`
                        : "",
                      price: product.price,
                      description: product.description,
                      stock: product.stock,
                    }}
                    isCompactMobile={true}
                    onAddToCart={() => {}}
                    onToggleWishlist={() => {}}
                  />
                </motion.div>
              ))
            ) : (
              <motion.div
                className="text-gray-600 col-span-full text-center py-10 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                 <motion.div
                className="col-span-full text-center py-10 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <Blocks className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg">No products found for this subcategory.</p>
                <button
                  onClick={handleResetFilters}
                  className="mt-4 text-sm text-indigo-500 hover:text-indigo-600 flex items-center gap-1 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Reset Filters
                </button>
              </motion.div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
