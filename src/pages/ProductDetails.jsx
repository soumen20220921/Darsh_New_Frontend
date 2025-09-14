import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import {
  Truck,
  Shield,
  RotateCcw,
  ShoppingCart,
  Minus,
  Plus,
  Share2,
  Copy,
  Loader2,
  Check,
  ArrowLeft,
  Star,
  Clock,
  CircleOff,
  Hourglass,
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProduct, token, getCart,url  } = useAppContext();

  const product = useMemo(() => allProduct?.find((p) => p._id === id), [allProduct, id]);
  const similarProducts = useMemo(
    () =>
      allProduct?.filter((p) => p.category === product?.category && p._id !== product._id) || [],
    [allProduct, product]
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specifications");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showFAQ, setShowFAQ] = useState({});
  const [isExpanded, setIsExpanded] = useState(false);
  const [notification, setNotification] = useState({
  message: '',
  type: '',
  visible: false,
});
  const [countdown, setCountdown] = useState(null);
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  
  const showNotification = (message, type) => {
  setNotification({ message, type, visible: true });

  setTimeout(() => {
    setNotification((prev) => ({ ...prev, visible: false }));
  }, 3000); 
};

useEffect(() => {
  let timer;
  if (isLowStock) {
    setCountdown(120); 
    showNotification("Hurry! Only a few left in stock ⚡", "warning");
    timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  return () => clearInterval(timer); 
}, [isLowStock]);


  const images = useMemo(
    () => product?.images?.map((img) => `${url}/img/${img}`) || [],
    [product, url]
  );

  useEffect(() => {
    setIsAdded(false);
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo(0, 0);
  }, [id]);

  const handleAddToCart = useCallback(async () => {
  if (!token) {
    showNotification("Please login first to add items to your cart.", 'warning');
    return;
  }
  if (!product) {
    showNotification("Product data not found.", 'error');
    return;
  }
  if (quantity > product.stock) {
    showNotification(`Only ${product.stock} items left in stock.`, 'error');
    return;
  }

  setLoading(true);
  try {
    const cartDetails = {
      productId: id,
      title: product.productName,
      price: product.price * quantity,
      qty: quantity,
      imgSrc: product.images[0],
    };

    const response = await axios.post(
       `${url}/api/cart/addToCart`,
      cartDetails,
      { headers: { Auth: token, "Content-Type": "application/json" } }
    );

    if (response.data.success) {
      getCart();
      showNotification("Item added to cart!", 'success');
      setIsAdded(true);
    } else {
      showNotification(response.data.message || "Failed to add item.", 'error');
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    showNotification("Something went wrong. Please try again.", 'error');
  } finally {
    setLoading(false);
  }
}, [token, product, quantity, id, getCart, url]);

  const handleShare = async (platform) => {
    if (!product) return;
    const shareUrl = `${window.location.origin}/productDetails/${id}`;
    const shareText = `Check out this product: ${product.productName} at ${shareUrl}`;

    try {
      if (navigator.share) {
        await navigator.share({ title: product.productName, text: shareText, url: shareUrl });
      } else {
        switch (platform) {
          case "whatsapp":
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
            break;
          case "telegram":
            window.open(
              `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(product.productName)}`,
              "_blank"
            );
            break;
          case "facebook":
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
            break;
          case "copy":
            await navigator.clipboard.writeText(shareUrl);
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("Failed to share:", error);
    } finally {
      setShowShareModal(false);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center font-inter p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white p-8 rounded-lg shadow-lg max-w-lg"
        >
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  const rating = product.rating ?? 4.4;
  

  const faqs = [
    { q: "What is the warranty?", a:  " This product does not come with a manufacturer's warranty." },
    { q: "How long to deliver?", a: "Usually 5-7 business days depending on your location." },
    { q: "Can I return the product?", a: "Yes! We offer easy 7-day returns. If you're not satisfied, simply follow our returns process for a smooth refund or replacement." },
  ];

  // const priceDisplay = (
  //   <div className="flex items-baseline gap-3">
  //     <span className="text-2xl sm:text-3xl font-bold text-blue-600">₹{product.price}</span>
  //     {product.originalPrice && (
  //       <span className="text-sm line-through text-gray-400">₹{product.originalPrice}</span>
  //     )}
  //     {product.discount && <span className="text-sm text-green-600">{product.discount}% off</span>}
  //   </div>
  // );

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {notification.visible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 16, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 sm:px-6"
        >
          <div
            className={`w-full max-w-[95%] sm:max-w-sm md:max-w-md lg:max-w-lg relative flex items-center gap-3 p-3 sm:p-4 rounded-xl shadow-lg border-l-4
        ${notification.type === "success" ? "bg-green-50 border-green-400" : ""}
        ${notification.type === "error" ? "bg-red-50 border-red-400" : ""}
        ${
          notification.type === "warning"
            ? "bg-yellow-50 border-yellow-400"
            : ""
        }
      `}
          >
            {/* Icon */}
            <div className="flex-shrink-0">
              {notification.type === "success" && (
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
              )}
              {notification.type === "error" && (
                <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              )}
              {notification.type === "warning" && (
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                {notification.message}
              </p>
            </div>

            {/* Close Button */}
            <div className="flex-shrink-0">
              <motion.button
                onClick={() =>
                  setNotification({ ...notification, visible: false })
                }
                whileHover={{ rotate: 90 }}
                className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              navigate(-1);
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 text-blue-600 hover:underline"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
          <div className="hidden sm:flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              {" "}
              <Star className="h-4 w-4 text-yellow-400" /> {rating}
            </span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline">Free returns • 7 days</span>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            <div className="col-span-1">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={images[selectedImage] || "placeholder"}
                    src={images[selectedImage]}
                    alt={product.productName}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="   object-contain bg-white"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto py-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(idx);
                    }}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 ${
                      selectedImage === idx
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200"
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img}
                      alt={`thumb-${idx}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="col-span-1">
              <div className="lg:sticky lg:top-8 lg:pt-8 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                    {product.productName}
                  </h1>
                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-3xl font-bold text-blue-600">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="line-through text-gray-500 text-lg">
                          ₹{product.originalPrice}
                        </span>
                        <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                          -
                          {Math.round(
                            ((product.originalPrice - product.price) /
                              product.originalPrice) *
                              100
                          )}
                          % OFF
                        </span>
                      </>
                    )}
                  </div>
                </motion.div>

                {/* Stock info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`w-full p-4 rounded-xl shadow-sm border 
        ${isOutOfStock ? "bg-red-50 border-red-200" : ""}
        ${isLowStock ? "bg-orange-50 border-orange-200" : ""}
        ${!isOutOfStock && !isLowStock ? "bg-green-50 border-green-200" : ""}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 text-gray-700">
                    <div className="flex items-center gap-2">
                      <span className="text-sm sm:text-lg">Status:</span>
                      <span
                        className={`font-semibold text-sm sm:text-lg ${
                          isOutOfStock
                            ? "text-red-500"
                            : isLowStock
                            ? "text-orange-500"
                            : "text-green-600"
                        }`}
                      >
                        {isOutOfStock
                          ? "Out of Stock"
                          : isLowStock
                          ? `Low Stock! (${product.stock} left)`
                          : `In Stock (${product.stock} available)`}
                      </span>
                    </div>
                    {isLowStock && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                        }}
                        className="flex items-center gap-1 text-orange-500 font-bold mt-2 sm:mt-0"
                      >
                        <Hourglass className="h-4 w-4 animate-spin" />
                        <span className="text-xs sm:text-sm">
                          {countdown}s left
                        </span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Product Description - New Design */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-100"
                >
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    About this product
                  </h3>
                  <div
                    className={`text-gray-700 leading-relaxed transition-all duration-300  ${
                      isExpanded
                        ? ""
                        : "line-clamp-2 max-h-20 overflow-hidden relative"
                    }`}
                  >
                    <p>{product.description || "No description available."}</p>
                    {!isExpanded &&
                      product.description &&
                      product.description.length > 150 && (
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none"></div>
                      )}
                  </div>
                  {product.description && product.description.length > 150 && (
                    <button
                      className="mt-4 text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </motion.div>

                {/* Quantity selector */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label
                    htmlFor="quantity"
                    className="block text-lg font-semibold mb-2"
                  >
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-fit shadow-sm">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-5 w-5 text-gray-600" />
                    </button>
                    <span className="px-6 font-bold text-lg text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(product.stock, quantity + 1))
                      }
                      className="p-3 bg-gray-100 hover:bg-gray-200 transition-colors"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                </motion.div>

                {/* Action buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="grid grid-cols-1 gap-4"
                >
                  {!isAdded ? (
                    <motion.button
                      whileHover={{
                        scale: quantity > product.stock ? 1 : 1.02,
                        boxShadow:
                          quantity > product.stock
                            ? "none"
                            : "0 4px 12px rgba(0, 0, 0, 0.1)",
                      }}
                      whileTap={{ scale: quantity > product.stock ? 1 : 0.98 }}
                      onClick={handleAddToCart}
                      disabled={loading || quantity > product.stock}
                      className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 font-semibold text-lg transition-colors disabled:cursor-not-allowed
                         ${
                           quantity > product.stock
                             ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                             : "bg-blue-600 text-white hover:bg-blue-700"
                         }`}
                    >
                      {loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : quantity > product.stock ? (
                        <CircleOff className="h-6 w-6" />
                      ) : (
                        <ShoppingCart className="h-6 w-6" />
                      )}
                      {loading
                        ? "Adding..."
                        : quantity > product.stock
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </motion.button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button className="flex-1 py-4 bg-green-500 text-white rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-green-600 transition-colors">
                        <Check className="h-6 w-6" /> Added
                      </button>
                      <Link
                        to="/cart"
                        className="flex-1 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-xl flex items-center justify-center gap-3 font-semibold hover:bg-blue-50 transition-colors"
                      >
                        View Cart
                      </Link>
                    </div>
                  )}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setShowShareModal(true)}
                      className="flex-1 py-3 border border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Share2 className="h-5 w-5" /> Share
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard?.writeText(window.location.href);
                        showNotification(
                          "Link copied to clipboard!",
                          "success"
                        );
                      }}
                      className="py-3 px-6 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
                      aria-label="Copy product link"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </motion.div>

                {/* Trust badges */}
                <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs text-gray-600">
                  <div className="p-2 rounded-lg border flex flex-col items-center">
                    <Truck className="h-5 w-5" />
                    <span>Free Ship</span>
                  </div>
                  <div className="p-2 rounded-lg border flex flex-col items-center">
                    <Shield className="h-5 w-5" />
                    <span>Warranty</span>
                  </div>
                  <div className="p-2 rounded-lg border flex flex-col items-center">
                    <RotateCcw className="h-5 w-5" />
                    <span>7 Days</span>
                  </div>
                </div>

                {/* Delivery estimator */}
                <div className="mt-4 text-sm bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>Estimated delivery</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    5-7 business days to your location.
                  </p>
                </div>

                {/* Suggested bundle */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-100 rounded-3xl shadow-lg"
                >
                  <h4 className="text-sm font-semibold">
                    Frequently bought together
                  </h4>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={images[0]}
                      alt="mini"
                      className="w-12 h-12 object-contain rounded-md bg-white p-1"
                    />
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{product.productName}</div>
                      <div className="text-xs text-gray-500">
                        ₹{product.price}
                      </div>
                    </div>
                  </div>
                  {/* <button className="mt-3 w-full py-2 text-sm border rounded-lg">Add Bundle</button> */}
                </motion.div>

                {/* <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-6 p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 border border-blue-100 rounded-3xl shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-bold text-gray-900">
                      Bundle & Save
                    </h4>
                    <span className="text-blue-600 font-bold">+10% off</span>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={images[0]}
                        alt="main product"
                        className="w-20 h-20 object-contain rounded-xl bg-white p-2 border border-gray-200"
                      />
                    </div>
                    <Plus className="hidden sm:block text-gray-400 h-6 w-6" />
                    <div className="flex-shrink-0">
                      <img
                        src="https://via.placeholder.com/100x100" // Placeholder for bundle item
                        alt="accessory"
                        className="w-20 h-20 object-contain rounded-xl bg-white p-2 border border-gray-200"
                      />
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                      <p className="font-medium text-gray-800">
                        Add a product accessory to your order
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Get both for a discounted price of{" "}
                        <span className="text-blue-600 font-semibold">
                          ₹{(product.price * 1.5).toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 w-full py-3 text-sm font-semibold border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-colors">
                    Add Bundle to Cart
                  </button>
                </motion.div> */}
              </div>
            </div>
          </div>

          {/* Detailed Tabs section */}
          <div className="mt-12 border-t pt-8">
            <div className="flex space-x-4 border-b overflow-x-auto">
              {["specifications" , "highlights" ].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 capitalize font-semibold ${
                    activeTab === tab
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="p-4 text-gray-700">
            {activeTab === "specifications" && (
                <p>{product.specification || "No specifications provided."}</p>
              )}
              {activeTab === "highlights" && (
                <ul className="list-disc list-inside space-y-2">
                  <li>High-resolution display for vivid visuals.</li>
                  <li>Long-lasting battery for all-day use.</li>
                  <li>Powerful processor for multitasking.</li>
                  <li>Ergonomic design for comfort.</li>
                  <li>Integrated security features.</li>
                </ul>
              )}
              {/* {activeTab === "description" && (
                <p>{product.description || "No description available."}</p>
              )} */}
              
            </div>
          </div>

          {/* Reviews & FAQ Section */}
          <div className="mt-8">
            <div className="mt-6">
              <h4 className="text-lg font-semibold mb-2">
                Frequently Asked Questions
              </h4>
              <div className="space-y-2">
                {faqs.map((f, i) => (
                  <div key={i} className="border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setShowFAQ((s) => ({ ...s, [i]: !s[i] }))}
                      className="w-full text-left px-4 py-3 flex items-center justify-between"
                      aria-expanded={showFAQ[i]}
                    >
                      <span className="font-medium">{f.q}</span>
                      <span className="text-sm text-gray-500">
                        {showFAQ[i] ? "-" : "+"}
                      </span>
                    </button>
                    <AnimatePresence>
                      {showFAQ[i] && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-4 pb-4 text-gray-700"
                        >
                          {f.a}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Similar products compact row */}
          {similarProducts.length > 0 && (
            <div className="mt-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900 text-center sm:text-left">
                Similar Products
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                {similarProducts.slice(0, 4).map((item) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    key={item._id}
                    className="relative bg-white rounded-2xl shadow-md hover:shadow-xl p-3 sm:p-4 cursor-pointer group overflow-hidden border border-gray-100 hover:border-pink-300 transition-all"
                    onClick={() => navigate(`/productDetails/${item._id}`)}
                  >
                    {/* Product Image */}
                    <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden flex items-center justify-center bg-gray-50">
                      <img
                        src={
                          item.images?.[0]
                            ? `${url}/img/${item.images[0]}`
                            : "https://placehold.co/200x200"
                        }
                        alt={item.productName}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                      />

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    {/* Product Info */}
                    <div className="mt-3 space-y-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate group-hover:text-pink-600 transition-colors">
                        {item.productName}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm sm:text-lg">
                        ₹{item.price}
                      </p>
                    </div>

                    {/* Discount Tag */}
                    {item.originalPrice && item.price < item.originalPrice && (
                      <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full shadow-md animate-bounce">
                        -
                        {Math.round(
                          ((item.originalPrice - item.price) /
                            item.originalPrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>

           {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                Share this product
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <button
                  onClick={() => handleShare("whatsapp")}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-green-50 hover:bg-green-100 transition"
                >
                  <FaWhatsapp className="h-6 w-6 text-green-600" />
                  <span className="text-xs font-medium text-gray-700">WhatsApp</span>
                </button>
                <button
                  onClick={() => handleShare("telegram")}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition"
                >
                  <FaTelegram className="h-6 w-6 text-blue-500" />
                  <span className="text-xs font-medium text-gray-700">Telegram</span>
                </button>
                <button
                  onClick={() => handleShare("facebook")}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-blue-100 hover:bg-blue-200 transition"
                >
                  <FaFacebook className="h-6 w-6 text-blue-700" />
                  <span className="text-xs font-medium text-gray-700">Facebook</span>
                </button>
                <button
                  onClick={() => handleShare("copy")}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
                >
                  <Copy className="h-6 w-6 text-gray-600" />
                  <span className="text-xs font-medium text-gray-700">Copy Link</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ProductDetails;