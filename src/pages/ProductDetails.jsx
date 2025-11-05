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
  ZoomIn,
  ZoomOut,
  RotateCw,
  Move,
  Calendar,
  LogIn
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { allProduct, token, getCart, url } = useAppContext();

  const product = useMemo(() => allProduct?.find((p) => p._id === id), [allProduct, id]);
  const similarProducts = useMemo(
    () =>
      allProduct?.filter((p) => p.category === product?.category && p._id !== product._id) || [],
    [allProduct, product]
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showShareModal, setShowShareModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [showFAQ, setShowFAQ] = useState({});
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });
  const [countdown, setCountdown] = useState(null);
  const [zoomMode, setZoomMode] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [deliveryDate, setDeliveryDate] = useState("");

  const stock = product ? Math.max(0, product.stock) : 0;  
  const isLowStock = stock > 0 && stock <= 5;
  const isOutOfStock = stock === 0;

  // Calculate delivery date
  useEffect(() => {
    const calculateDeliveryDate = () => {
      const today = new Date();
      const deliveryDays = 7; // 5-7 business days
      
      // Add business days (excluding weekends)
      let count = 0;
      const deliveryDate = new Date(today);
      
      while (count < deliveryDays) {
        deliveryDate.setDate(deliveryDate.getDate() + 1);
        // Check if it's a weekday (0 = Sunday, 6 = Saturday)
        if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
          count++;
        }
      }
      
      return deliveryDate.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    setDeliveryDate(calculateDeliveryDate());
  }, []);

  useEffect(() => {
    setIsAdded(false);
    setSelectedImage(0);
    setQuantity(1);
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
    window.scrollTo(0, 0);
  }, [id]);

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

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.clientX - startPosition.x,
        y: e.clientY - startPosition.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setStartPosition({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y
      });
    }
  };

  const handleTouchMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPosition({
        x: e.touches[0].clientX - startPosition.x,
        y: e.touches[0].clientY - startPosition.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const toggleZoomMode = () => {
    setZoomMode(!zoomMode);
    if (!zoomMode) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      setZoomLevel(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleAddToCart = useCallback(async () => {
    if (!token) {
      setShowLoginPrompt(true);
      return;
    }
    if (!product) {
      showNotification("Product data not found.", 'error');
      return;
    }
    if (quantity > stock) {
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
  }, [token, product, quantity, id, getCart, url, stock]);

  const handleQuickLogin = () => {
    setShowLoginPrompt(false);
    navigate('/auth', { 
      state: { 
        from: `/productDetails/${id}`,
        message: "Please login to add items to your cart"
      } 
    });
  };

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

  const toggleFAQ = (index) => {
    setShowFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

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

            <div className="flex-1">
              <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                {notification.message}
              </p>
            </div>

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-xl overflow-hidden p-4 sm:p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Image Gallery Section */}
            <div className="col-span-1">
              <div className="relative bg-gray-100 rounded-2xl overflow-hidden shadow-sm">
                <div
                  className="relative h-80 sm:h-96 md:h-[500px] overflow-hidden cursor-zoom-in"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onClick={toggleZoomMode}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={images[selectedImage] || "placeholder"}
                      src={images[selectedImage]}
                      alt={product.productName}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="w-full h-full object-contain bg-white"
                      style={{
                        transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease',
                        cursor: zoomLevel > 1 ? 'grabbing' : 'zoom-in'
                      }}
                    />
                  </AnimatePresence>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleZoomMode();
                    }}
                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-md hover:bg-gray-200 transition-colors"
                    aria-label="Fullscreen view"
                  >
                    {zoomMode ? (
                      <X className="h-4 w-4" />
                    ) : (
                      <ZoomIn className="h-4 w-4" />
                    )}
                  </button>

                  {zoomLevel > 1 && (
                    <div className="absolute top-4 left-4 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
                      {Math.round(zoomLevel * 100)}%
                    </div>
                  )}

                  {zoomLevel > 1 && (
                    <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 bg-black/70 text-white text-xs rounded-md">
                      <Move className="h-3 w-3" /> Drag to pan
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="mt-4 flex gap-3 overflow-x-auto py-2 px-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedImage(idx);
                      setZoomLevel(1);
                      setPosition({ x: 0, y: 0 });
                    }}
                    className={`w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-blue-600 shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
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

            {/* Product Info Section */}
            <div className="col-span-1">
              <div className="flex flex-col h-full">
                {/* Product Title and Rating */}
                <div className="mb-4">
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                    {product.productName}
                  </h1>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {rating} • 142+ Reviews
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price and Stock Info */}
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl font-bold text-gray-900">
                      ₹{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                       ₹{product.originalPrice}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                        {Math.round(
                          ((product.originalPrice - product.price) /
                            product.originalPrice) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                  </div>

                  {/* Stock Information */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                    {isOutOfStock ? (
                      <div className="flex items-center text-red-600">
                        <CircleOff className="h-4 w-4 mr-1" />
                        <span>Out of stock</span>
                      </div>
                    ) : isLowStock ? (
                      <div className="flex items-center text-yellow-600">
                        <Hourglass className="h-4 w-4 mr-1 animate-spin" />
                        <span>Only {stock} left in stock</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <Check className="h-4 w-4 mr-1" />
                        <span>In stock</span>
                      </div>
                    )}
                  </div>

                  {/* Countdown Timer for Low Stock */}
                  {isLowStock && countdown !== null && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-yellow-700 bg-yellow-50 p-2 rounded-lg">
                      <Clock className="h-4 w-4" />
                      <span className="animate-pulse font-medium">
                        Limited time offer: {Math.floor(countdown / 60)}:
                        {String(countdown % 60).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>


                {/* Quantity Selector */}
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
                  <div className="flex items-center gap-3">
                    <div className="flex mb-3 items-center border border-gray-300 rounded-xl overflow-hidden w-fit shadow-sm">
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
                      disabled={quantity >= stock}
                    >
                      <Plus className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                      {stock} available
                    </span>
                  </div>
                </motion.div>

                {/* Add to Cart Button */}
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
                        onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}
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
                
                {/* Delivery Date Information */}
<motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mb-6 mt-4 p-1 bg-blue-50 rounded-xl border border-blue-200"
                >

                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-blue-800 text-xs md:text-sm">
                        Expected Delivery
                      </p>
                      <p className="text-blue-700 font-bold text-sm md:text-lg">
                        {deliveryDate}
                      </p>
                      <p className="text-blue-600 text-[10px] md:text-xs mt-1">
                        Order within next 2 hours for same day processing
                      </p>
                    </div>
                  </div>
                </motion.div>

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
                </motion.div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-6 border-t border-gray-200">
            <div className="flex space-x-4 border-b overflow-x-auto mb-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-4 py-3 font-medium text-sm sm:text-base ${
                  activeTab === "description"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("specifications")}
                className={`px-4 py-3 font-medium text-sm sm:text-base ${
                  activeTab === "specifications"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab("faq")}
                className={`px-4 py-3 font-medium text-sm sm:text-base ${
                  activeTab === "faq"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                FAQ
              </button>
            </div>

            <div className="mb-8">
              {activeTab === "specifications" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <p>{product.specification || "No specifications provided."}</p>
                </div>
              )}

              {activeTab === "description" && (
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {product.description ||
                      "No description available for this product."}
                  </p>
                </div>
              )}

              {activeTab === "faq" && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(index)}
                        className="w-full p-4 text-left font-medium text-gray-900 bg-gray-50 hover:bg-gray-100 flex items-center justify-between"
                      >
                        {faq.q}
                        <Plus
                          className={`h-5 w-5 transition-transform ${
                            showFAQ[index] ? "rotate-45" : ""
                          }`}
                        />
                      </button>
                      {showFAQ[index] && (
                        <div className="p-4 bg-white">
                          <p className="text-gray-700">{faq.a}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Similar Products Section */}
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate group-hover:text-pink-600 transition-colors">
                        {item.productName}
                      </h3>
                      <p className="text-blue-600 font-bold text-sm sm:text-lg">
                        ₹{item.price}
                      </p>
                    </div>

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

      {/* Login Prompt Modal */}
      <AnimatePresence>
        {showLoginPrompt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
            onClick={() => setShowLoginPrompt(false)}
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
                onClick={() => setShowLoginPrompt(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
              
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LogIn className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Login Required
                </h3>
                <p className="text-gray-600">
                  Please login to add items to your cart and continue shopping.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleQuickLogin}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <LogIn className="h-5 w-5" />
                  Login Now
                </button>
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              <p className="text-center text-xs md:text-sm text-gray-500 mt-4">
                New user? <span className="text-blue-600 font-semibold">Create an account in seconds</span>
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

     <AnimatePresence>
        {zoomMode && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center p-4"
            onClick={toggleZoomMode}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="relative max-w-4xl max-h-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedImage]}
                  alt={product.productName}
                  className="max-w-full max-h-full object-contain"
                  style={{
                    transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                    transition: isDragging ? 'none' : 'transform 0.3s ease',
                    cursor: zoomLevel > 1 ? 'grabbing' : 'grab'
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                />

                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 shadow-lg">
                  <button
                    onClick={handleZoomIn}
                    disabled={zoomLevel >= 3}
                    className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    aria-label="Zoom in"
                  >
                    <ZoomIn className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleZoomOut}
                    disabled={zoomLevel <= 1}
                    className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleResetZoom}
                    disabled={zoomLevel === 1}
                    className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    aria-label="Reset zoom"
                  >
                    <RotateCw className="h-5 w-5" />
                  </button>
                  <button
                    onClick={toggleZoomMode}
                    className="p-2 rounded-md hover:bg-gray-200 transition-colors"
                    aria-label="Close fullscreen"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {zoomLevel > 1 && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-sm rounded-md">
                    {Math.round(zoomLevel * 100)}%
                  </div>
                )}

                <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedImage(idx);
                        setZoomLevel(1);
                        setPosition({ x: 0, y: 0 });
                      }}
                      className={`w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border transition-all ${
                        selectedImage === idx
                          ? "border-blue-500 shadow-md"
                          : "border-gray-400"
                      }`}
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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