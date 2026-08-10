import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  SquarePen,
  CircleAlert,
  Loader2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X,
  MapPin,
  Plus,
  Navigation,
  IndianRupee,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import ImportantNotice from "./ImportantNotice";



/* =========================================================
   ORDER CONFIRMATION MODAL
   ========================================================= */

const OrderConfirmationModal = ({
  cart,
  total,
  subtotal,
  shippingCharge,
  platformCharge,
  discount,
  address,
  onConfirm,
  onCancel,
  loadingPayment,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const { url } = useAppContext();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2b1114]/70 backdrop-blur-sm p-3 sm:p-5"
    >
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.92,
          y: isMobile ? 60 : 30,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.92,
          y: isMobile ? 60 : 30,
        }}
        transition={{
          duration: 0.35,
          ease: "easeOut",
        }}
        className={`relative flex flex-col w-full max-w-2xl overflow-hidden bg-[#fcfaf5] border border-[#dfd2c1] shadow-[0_30px_80px_rgba(61,20,20,0.3)] ${
          isMobile ? "max-h-[94vh]" : "max-h-[90vh]"
        }`}
      >
        {/* Top accent */}
        <div className="h-1 bg-[#76131d]" />

        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-[#e3d8c8]">
          <div>
            <p className="text-[9px] tracking-[0.35em] uppercase text-[#9a806f] mb-1">
              Darsh Handlooms
            </p>

            <h2 className="font-serif text-xl sm:text-2xl text-[#351216]">
              Confirm your order
            </h2>
          </div>

          <button
            type="button"
            onClick={onCancel}
            aria-label="Close confirmation"
            className="w-9 h-9 flex items-center justify-center border border-[#dfd2c1] text-[#765c52] hover:text-[#76131d] hover:border-[#76131d] transition-all duration-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-7 py-5 space-y-5">
          {/* Products */}
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#977e73] mb-3">
              Your selection
            </p>

            <div className="space-y-2">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-3 p-2.5 border border-[#e6dccd] bg-white/60"
                >
                  <img
                    src={`${url}/img/${item.imgSrc}`}
                    alt={item.title}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="font-serif text-[#351216] text-sm sm:text-base truncate">
                      {item.title}
                    </p>

                    <p className="text-[11px] text-[#8b746a] mt-1">
                      Quantity: {item.qty}
                    </p>
                  </div>

                  <p className="font-medium text-sm text-[#76131d]">
                    ₹{item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          {address && (
            <div className="border border-[#dfd2c1] bg-white/60 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-serif text-lg text-[#351216] flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#c9a24a]" />
                  Shipping address
                </h4>

                <Link
                  to="/account?tab=2"
                  onClick={() =>
                    window.scrollTo({
                      top: 0,
                      left: 0,
                      behavior: "smooth",
                    })
                  }
                  className="text-[10px] tracking-[0.18em] uppercase text-[#76131d] hover:text-[#5d0e16]"
                >
                  Edit
                </Link>
              </div>

              <div className="text-xs sm:text-sm text-[#765c52] space-y-1 leading-relaxed">
                <p className="font-semibold text-[#351216]">
                  {address.FullName}
                </p>

                <p>{address.Address}</p>

                <p>
                  {address.Add}, {address.VillorCity}, {address.Dist},{" "}
                  {address.State} {address.Pin}
                </p>

                <p>Phone: {address.Phone}</p>
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="border border-[#dfd2c1] bg-[#f7f0e4] p-4 sm:p-5">
            <div className="flex items-center gap-2 mb-4">
              <IndianRupee className="w-4 h-4 text-[#c9a24a]" />

              <h4 className="font-serif text-lg text-[#351216]">
                Order summary
              </h4>
            </div>

            <div className="space-y-2.5 text-sm text-[#765c52]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Platform charge</span>
                <span>₹{platformCharge}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shippingCharge}</span>
              </div>

              <div className="flex justify-between text-green-700">
                <span>Discount</span>
                <span>-₹{discount}</span>
              </div>

              <div className="border-t border-[#d8cbb9] pt-3 mt-3 flex justify-between">
                <span className="font-serif text-lg text-[#351216]">
                  Total
                </span>

                <span className="font-semibold text-lg text-[#76131d]">
                  ₹{total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#e3d8c8] p-4 sm:p-5 flex flex-col sm:flex-row gap-3 bg-[#faf6ee]">
          <button
            type="button"
            onClick={onCancel}
            className="w-full py-3 border border-[#d8cbb9] text-[#765c52] text-xs tracking-[0.18em] uppercase hover:border-[#76131d] hover:text-[#76131d] transition-all duration-300"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loadingPayment}
            className={`w-full py-3 text-xs tracking-[0.18em] uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              loadingPayment
                ? "bg-[#c9a8a8] text-white cursor-not-allowed"
                : "bg-[#76131d] text-white hover:bg-[#5d0e16] hover:-translate-y-0.5 shadow-lg"
            }`}
          >
            {loadingPayment ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing
              </>
            ) : (
              <>
                Confirm & Pay
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/* =========================================================
   ADDRESS REQUIRED SECTION
   ========================================================= */

const AddressSection = ({ onAddAddress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#fcfaf5] border border-[#dfd2c1] p-5 sm:p-6 mb-6 shadow-[0_15px_40px_rgba(89,50,40,0.08)]"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 flex items-center justify-center bg-[#f4e3df] text-[#76131d]">
          <CircleAlert className="w-5 h-5" />
        </div>

        <div>
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#977e73] mb-1">
            Checkout
          </p>

          <h3 className="font-serif text-xl text-[#351216]">
            Shipping address required
          </h3>
        </div>
      </div>

      <p className="text-sm text-[#765c52] leading-6 mb-5">
        Add your delivery address before placing your order. Your address is
        used only for safe and accurate delivery.
      </p>

      <div className="border-l-2 border-[#c9a24a] bg-[#f8f0e3] p-4 mb-5">
        <div className="flex items-start gap-3">
          <Navigation className="w-4 h-4 text-[#c9a24a] mt-1 flex-shrink-0" />

          <div>
            <p className="text-sm font-semibold text-[#5d0e16] mb-1">
              Why we need it
            </p>

            <p className="text-xs sm:text-sm text-[#765c52] leading-5">
              We need the complete address to process delivery and ensure your
              handloom reaches you safely.
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onAddAddress}
        className="w-full py-3.5 bg-[#76131d] text-white text-xs tracking-[0.2em] uppercase flex items-center justify-center gap-2 hover:bg-[#5d0e16] hover:-translate-y-0.5 shadow-lg transition-all duration-300"
      >
        <Plus className="w-4 h-4" />
        Add shipping address
      </button>

      <p className="text-[10px] text-[#977e73] text-center mt-4">
        Your information is kept secure.
      </p>
    </motion.div>
  );
};

/* =========================================================
   CART PAGE
   ========================================================= */

const Cart = () => {
  const navigate = useNavigate();

  const {
    cart: rawCart,
    getCart,
    token,
    address,
    user,
    url,
  } = useAppContext();

  const cart = rawCart || [];

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [showAddressWarning, setShowAddressWarning] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  /* -------------------------------------------------------
     Notification
  ------------------------------------------------------- */

  const showNotification = (message, type) => {
    setNotification({
      message,
      type,
      visible: true,
    });

    setTimeout(() => {
      setNotification((previous) => ({
        ...previous,
        visible: false,
      }));
    }, 3000);
  };

  /* -------------------------------------------------------
     Price calculations
  ------------------------------------------------------- */

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price || 0),
    0
  );

  const platformCharge = 0;
  const shippingCharge = 0;
  const discount = 0;

  const total =
    subtotal + platformCharge + shippingCharge - discount;

  const productCount = cart.length;

  /* -------------------------------------------------------
     Check stock
  ------------------------------------------------------- */

  const checkProductAvailability = async () => {
    try {
      if (cart.length === 0) {
        return false;
      }

      let allProductsAvailable = true;

      for (let i = 0; i < cart.length; i += 1) {
        const item = cart[i];

        const response = await axios.get(
          `${url}/api/product/${item.productId}`
        );

        if (
          response.data &&
          response.data.success &&
          item.qty > response.data.product.stock
        ) {
          await axios.delete(
            `${url}/api/cart/remove/${item.productId}`,
            {
              headers: {
                Auth: token,
              },
            }
          );

          await getCart();

          showNotification(
            `${item.title} quantity reduced due to low stock.`,
            "error"
          );

          allProductsAvailable = false;
        }
      }

      return allProductsAvailable;
    } catch (error) {
      console.error(
        "Error checking product availability:",
        error
      );

      showNotification(
        "Unable to check product availability.",
        "error"
      );

      return false;
    }
  };

  /* -------------------------------------------------------
     Remove item
  ------------------------------------------------------- */

  const removeFromCart = async (productId) => {
    try {
      if (!token) {
        throw new Error("User not authenticated");
      }

      await axios.delete(
        `${url}/api/cart/remove/${productId}`,
        {
          headers: {
            Auth: token,
          },
        }
      );

      await getCart();

      showNotification(
        "Item removed from your cart.",
        "success"
      );
    } catch (error) {
      console.error(
        "Error removing item from cart:",
        error
      );

      showNotification(
        "Unable to remove item.",
        "error"
      );
    }
  };

  /* -------------------------------------------------------
     Checkout
  ------------------------------------------------------- */

  const handleProceedToCheckout = () => {
    if (
      address &&
      address.FullName &&
      address.Phone &&
      cart.length > 0
    ) {
      setShowAddressWarning(false);
      setShowConfirmation(true);
    } else {
      setShowAddressWarning(true);
    }
  };

  /* -------------------------------------------------------
     Add address
     FIXED: navigate() only receives path + options
  ------------------------------------------------------- */

  const handleAddAddress = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    navigate("/account?tab=2", {
      state: {
        scrollToAddress: true,
      },
    });
  };

  /* -------------------------------------------------------
     Payment
  ------------------------------------------------------- */

  const handleConfirmAndPay = async () => {
    setLoadingPayment(true);

    try {
      const productAvailable =
        await checkProductAvailability();

      if (!productAvailable) {
        showNotification(
          "Some products are unavailable. Please refresh your cart.",
          "error"
        );

        return;
      }

      const transactionId = `T${Date.now()}`;
      const MUID = `MUID${Date.now()}`;

      const data = {
        amount: total,
        MUID,
        transactionId,
        cartItems: cart,
        usershipping: address,
        userId: user && user.id ? user.id : "124",
      };

      const orderResponse = await axios.post(
        `${url}/api/phonepe/payment`,
        data
      );

      if (
        orderResponse &&
        orderResponse.data &&
        orderResponse.data.redirectUrl
      ) {
        showNotification(
          "Redirecting to PhonePe...",
          "warning"
        );

        window.location.href =
          orderResponse.data.redirectUrl;
      } else {
        showNotification(
          "Unable to open payment page.",
          "error"
        );
      }
    } catch (error) {
      console.error(
        "Error in handlePayment:",
        error
      );

      showNotification(
        "Payment failed. Please try again.",
        "error"
      );

      navigate("/failure");
    } finally {
      setLoadingPayment(false);
      setShowConfirmation(false);
    }
  };

  /* =======================================================
     EMPTY CART
  ======================================================= */

  if (cart.length === 0) {
    return (
      <section className="min-h-[85vh] bg-[#f8f3e9] flex items-center justify-center px-4 py-16">
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
            duration: 0.7,
          }}
          className="w-full max-w-xl text-center"
        >
          <motion.div
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mx-auto w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center border border-[#dfd2c1] bg-[#fcfaf5] shadow-[0_15px_40px_rgba(89,50,40,0.08)]"
          >
            <ShoppingBag
              className="w-10 h-10 sm:w-12 sm:h-12 text-[#76131d]"
              strokeWidth={1.2}
            />
          </motion.div>

          <p className="mt-8 text-[9px] tracking-[0.35em] uppercase text-[#977e73]">
            Your collection
          </p>

          <h1 className="font-serif text-3xl sm:text-5xl text-[#351216] mt-2">
            Your cart is empty
          </h1>

          <p className="text-sm sm:text-base text-[#765c52] leading-7 max-w-md mx-auto mt-4">
            Your handpicked sarees will appear here once you find something
            special.
          </p>

          <Link
            to="/allproducts"
            className="inline-flex items-center justify-center gap-2 mt-7 px-7 py-3.5 bg-[#76131d] text-white text-xs tracking-[0.2em] uppercase hover:bg-[#5d0e16] hover:-translate-y-0.5 shadow-lg transition-all duration-300"
          >
            Explore sarees
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </section>
    );
  }

  /* =======================================================
     MAIN CART
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#f8f3e9] text-[#351216] py-8 sm:py-12">
      {/* ---------------------------------------------------
          Notification
      --------------------------------------------------- */}

      <AnimatePresence>
        {notification.visible && (
          <motion.div
            initial={{
              opacity: 0,
              y: -30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-[120] w-[calc(100%-2rem)] max-w-md"
          >
            <div
              className={`flex items-center gap-3 px-4 py-3 border shadow-xl ${
                notification.type === "success"
                  ? "bg-[#f2f8f2] border-green-200"
                  : notification.type === "error"
                  ? "bg-[#fff4f3] border-red-200"
                  : "bg-[#fff9ed] border-[#ead9a7]"
              }`}
            >
              {notification.type === "success" && (
                <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
              )}

              {notification.type === "error" && (
                <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
              )}

              {notification.type === "warning" && (
                <AlertCircle className="w-5 h-5 text-[#b3831f] flex-shrink-0" />
              )}

              <p className="flex-1 text-sm text-[#4d3631]">
                {notification.message}
              </p>

              <button
                type="button"
                onClick={() =>
                  setNotification({
                    ...notification,
                    visible: false,
                  })
                }
                className="text-[#977e73] hover:text-[#76131d]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---------------------------------------------------
          Confirmation Modal
      --------------------------------------------------- */}

      <AnimatePresence>
        {showConfirmation && (
          <OrderConfirmationModal
            cart={cart}
            total={total}
            subtotal={subtotal}
            shippingCharge={shippingCharge}
            platformCharge={platformCharge}
            discount={discount}
            address={address}
            onConfirm={handleConfirmAndPay}
            onCancel={() =>
              setShowConfirmation(false)
            }
            loadingPayment={loadingPayment}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* -------------------------------------------------
            Header
        ------------------------------------------------- */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mb-8 sm:mb-10"
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.35em] uppercase text-[#977e73] mb-2">
            Your selection
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-5xl text-[#351216]">
                Shopping bag
              </h1>

              <p className="text-sm text-[#765c52] mt-2">
                {productCount}{" "}
                {productCount === 1
                  ? "saree"
                  : "sarees"}{" "}
                selected for you.
              </p>
            </div>

            <Link
              to="/allproducts"
              className="inline-flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-[#76131d] hover:text-[#5d0e16] transition-colors"
            >
              Continue browsing
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-full h-px bg-[#dfd2c1] mt-7" />
        </motion.div>

        {/* -------------------------------------------------
            Main Grid
        ------------------------------------------------- */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {/* =================================================
              CART ITEMS
          ================================================= */}

          <div className="lg:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.45,
                }}
                className="group relative bg-[#fcfaf5] border border-[#dfd2c1] p-3 sm:p-5 shadow-[0_10px_35px_rgba(89,50,40,0.05)] hover:shadow-[0_18px_45px_rgba(89,50,40,0.1)] transition-all duration-500"
              >
                <div
                  className={`flex gap-4 sm:gap-6 ${
                    isMobile
                      ? "flex-col"
                      : "flex-row items-center"
                  }`}
                >
                  {/* Image */}

                  <Link
                    to={`/productDetails/${item.productId}`}
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      })
                    }
                    className={`relative flex-shrink-0 overflow-hidden bg-[#f3eadc] ${
                      isMobile
                        ? "w-full aspect-[4/3]"
                        : "w-32 h-36 sm:w-40 sm:h-44"
                    }`}
                  >
                    <img
                      src={`${url}/img/${item.imgSrc}`}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#351216]/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>

                  {/* Information */}

                  <div
                    className={`flex-1 min-w-0 ${
                      isMobile ? "text-center" : ""
                    }`}
                  >
                    <p className="text-[9px] tracking-[0.25em] uppercase text-[#977e73] mb-2">
                      Handloom collection
                    </p>

                    <Link
                      to={`/productDetails/${item.productId}`}
                      onClick={() =>
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: "smooth",
                        })
                      }
                      className="font-serif text-xl sm:text-2xl text-[#351216] hover:text-[#76131d] transition-colors line-clamp-2"
                    >
                      {item.title}
                    </Link>

                    <div
                      className={`flex flex-wrap items-center gap-2 mt-3 ${
                        isMobile
                          ? "justify-center"
                          : ""
                      }`}
                    >
                      <span className="px-3 py-1 bg-[#f5ede1] border border-[#e1d5c4] text-[10px] tracking-[0.08em] text-[#765c52]">
                        Qty:{" "}
                        <span className="font-semibold text-[#76131d]">
                          {item.qty}
                        </span>
                      </span>

                      {item.size && (
                        <span className="px-3 py-1 bg-[#f5ede1] border border-[#e1d5c4] text-[10px] tracking-[0.08em] text-[#765c52]">
                          Size:{" "}
                          <span className="font-semibold text-[#76131d]">
                            {item.size}
                          </span>
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#977e73] mt-3">
                      ₹
                      {Number(item.price || 0) /
                        Number(item.qty || 1)}{" "}
                      each
                    </p>
                  </div>

                  {/* Price + Actions */}

                  <div
                    className={`flex ${
                      isMobile
                        ? "items-center justify-between"
                        : "flex-col items-end"
                    } gap-4`}
                  >
                    <p className="font-serif text-xl sm:text-2xl text-[#76131d]">
                      ₹{item.price}
                    </p>

                    <div className="flex items-center gap-2">
                      <Link
                        to={`/productDetails/${item.productId}`}
                        onClick={() =>
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: "smooth",
                          })
                        }
                        aria-label={`Edit ${item.title}`}
                        className="w-10 h-10 flex items-center justify-center border border-[#dfd2c1] text-[#765c52] hover:border-[#76131d] hover:text-[#76131d] hover:bg-[#f8f0e4] transition-all duration-300"
                      >
                        <SquarePen className="w-4 h-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          removeFromCart(item.productId)
                        }
                        aria-label={`Remove ${item.title}`}
                        className="w-10 h-10 flex items-center justify-center border border-[#e1caca] text-[#8f3038] hover:bg-[#f8eaea] hover:border-[#8f3038] transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Hover gold line */}

                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#c9a24a] group-hover:w-full transition-all duration-700" />
              </motion.div>
            ))}

            {/* Trust information */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3"
            >
              <div className="border border-[#dfd2c1] bg-[#fcfaf5] p-4 flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#c9a24a]" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#351216]">
                    Shipping
                  </p>

                  <p className="text-[10px] text-[#977e73] mt-1">
                    Safe delivery
                  </p>
                </div>
              </div>

              <div className="border border-[#dfd2c1] bg-[#fcfaf5] p-4 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-[#c9a24a]" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#351216]">
                    Authentic
                  </p>

                  <p className="text-[10px] text-[#977e73] mt-1">
                    Handloom collection
                  </p>
                </div>
              </div>

              <div className="border border-[#dfd2c1] bg-[#fcfaf5] p-4 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-[#c9a24a]" />

                <div>
                  <p className="text-[10px] uppercase tracking-[0.12em] text-[#351216]">
                    Curated
                  </p>

                  <p className="text-[10px] text-[#977e73] mt-1">
                    Selected with care
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* =================================================
              CHECKOUT SIDEBAR
          ================================================= */}

          <div className="lg:col-span-1">
            {/* Address */}

            {!address || !address.FullName ? (
              <AddressSection
                onAddAddress={handleAddAddress}
              />
            ) : (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-[#fcfaf5] border border-[#dfd2c1] p-5 sm:p-6 mb-6 shadow-[0_15px_40px_rgba(89,50,40,0.07)]"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[9px] tracking-[0.25em] uppercase text-[#977e73] mb-1">
                      Delivery
                    </p>

                    <h3 className="font-serif text-xl text-[#351216] flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#c9a24a]" />
                      Shipping address
                    </h3>
                  </div>

                  <Link
                    to="/account?tab=2"
                    onClick={() =>
                      window.scrollTo({
                        top: 0,
                        left: 0,
                        behavior: "smooth",
                      })
                    }
                    className="text-[9px] tracking-[0.18em] uppercase text-[#76131d] hover:text-[#5d0e16]"
                  >
                    Change
                  </Link>
                </div>

                <div className="bg-[#f8f0e4] border border-[#e3d5c3] p-4 text-sm text-[#765c52] leading-6">
                  <p className="font-semibold text-[#351216]">
                    {address.FullName}
                  </p>

                  <p>{address.Address}</p>

                  <p>
                    {address.Add}, {address.VillorCity},{" "}
                    {address.Dist}, {address.State}{" "}
                    {address.Pin}
                  </p>

                  <p className="mt-2">
                    Phone: {address.Phone}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Order Summary */}

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
                delay: 0.15,
              }}
              className="bg-[#fcfaf5] border border-[#dfd2c1] p-5 sm:p-6 shadow-[0_15px_40px_rgba(89,50,40,0.07)]"
            >
              <div className="flex items-end justify-between border-b border-[#dfd2c1] pb-4 mb-5">
                <div>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-[#977e73] mb-1">
                    Your order
                  </p>

                  <h3 className="font-serif text-2xl text-[#351216]">
                    Summary
                  </h3>
                </div>

                <span className="text-[10px] text-[#977e73]">
                  {productCount} items
                </span>
              </div>

              <div className="space-y-3 text-sm text-[#765c52]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-[#351216]">
                    ₹{subtotal}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Platform charge</span>
                  <span>₹{platformCharge}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>
                    ₹{shippingCharge}

                    {address && address.State && (
                      <span className="text-[10px] text-[#977e73] ml-1">
                        ({address.State})
                      </span>
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-green-700">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              </div>

              {/* Total */}

              <div className="border-t border-[#dfd2c1] mt-5 pt-5">
                <div className="flex justify-between items-center">
                  <span className="font-serif text-xl text-[#351216]">
                    Total
                  </span>

                  <motion.span
                    initial={{
                      scale: 0.9,
                      opacity: 0,
                    }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 250,
                    }}
                    className="font-serif text-2xl text-[#76131d]"
                  >
                    ₹{total}
                  </motion.span>
                </div>
              </div>

              {/* Warning */}

              <AnimatePresence>
                {showAddressWarning && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                      y: -5,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 border-l-2 border-[#76131d] bg-[#f8eaea] p-3 text-sm text-[#76131d] flex items-start gap-2">
                      <CircleAlert className="w-4 h-4 mt-0.5 flex-shrink-0" />

                      <p>
                        Please add a shipping address before
                        checkout.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Checkout */}

              <motion.button
                type="button"
                whileHover={
                  address && address.FullName
                    ? { y: -2 }
                    : {}
                }
                whileTap={
                  address && address.FullName
                    ? { scale: 0.98 }
                    : {}
                }
                onClick={handleProceedToCheckout}
                className={`w-full mt-6 py-3.5 flex items-center justify-center gap-2 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                  address && address.FullName
                    ? "bg-[#76131d] text-white hover:bg-[#5d0e16] shadow-lg hover:shadow-xl"
                    : "bg-[#e2dcd3] text-[#8f8178] cursor-not-allowed"
                }`}
              >
                {address && address.FullName ? (
                  <>
                    Proceed to checkout
                    <ArrowRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4" />
                    Add address first
                  </>
                )}
              </motion.button>

              {/* Continue shopping */}

              <Link
                to="/allproducts"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 border border-[#dfd2c1] text-[#765c52] text-[10px] tracking-[0.18em] uppercase hover:border-[#76131d] hover:text-[#76131d] transition-all duration-300"
              >
                Continue shopping
              </Link>
            </motion.div>

            {/* Important Notice */}

            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.3,
              }}
              className="mt-5"
            >
              <ImportantNotice />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;