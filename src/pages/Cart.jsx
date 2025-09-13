import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Trash2,
  ShoppingBag,
  SquarePen,
  CircleAlert,
  Loader2,
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";
import ImportantNotice from "./ImportantNotice";
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, getCart, token, address, user,url } = useAppContext();
  const [showAddressWarning, setShowAddressWarning] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);

  const [notification, setNotification] = useState({
    message: '',
    type: '',
    visible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000); 
  };

  const total = cart?.reduce((sum, item) => sum + item.price, 0) || 0;
  const totalItems = cart?.reduce((acc, item) => acc + item.qty, 0);

  const checkProductAvailability = async () => {
    try {
      if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
          const response = await axios.get(
            `${url}/api/product/${cart[i].productId}`
          );
          if (
            response.data.success &&
            cart[i].qty > response.data.product.stock
          ) {
            await axios.delete(
              `${url}/api/cart/remove/${cart[i].productId}`,
              { headers: { Auth: token } }
            );
            getCart();
            showNotification(
              `${cart[i].title} removed - only ${response.data.product.stock} left in stock`,
              'error'
            );
          }
        }
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("Error checking product availability", error);
      showNotification("Error checking product availability", 'error');
      return false;
    }
  };

  const removeFromCart = async (productId) => {
    try {
      if (!token) throw new Error("User not authenticated");
      await axios.delete(
        `${url}/api/cart/remove/${productId}`,
        { headers: { Auth: token } }
      );
      getCart();
      showNotification("Item removed from cart successfully!", 'success');
    } catch (error) {
      console.error("Error removing item from cart:", error);
      showNotification("Failed to remove item", 'error');
    }
  };

  const handlePayment = async () => {
    if (address?.FullName && address?.Phone && cart.length > 0) {
      setShowAddressWarning(false);
      setLoadingPayment(true);
      try {
        const productAvailable = await checkProductAvailability();
        if (productAvailable) {
          const transactionId = "T" + Date.now();
          const MUID = "MUID" + Date.now();
          const data = {
            amount: total,
            MUID,
            transactionId,
            cartItems: cart,
            usershipping: address,
            userId: user?.id || "124",
          };
          const orderResponse = await axios.post(
            `${url}/api/phonepe/payment`,
            data
          );
          if (orderResponse?.data?.redirectUrl) {
            showNotification("Redirecting to PhonePe...", 'warning');
            window.location.href = orderResponse.data.redirectUrl;
          } else {
            showNotification("Redirecting user to PhonePe payment page...", 'warning');
          }
        } else {
          showNotification("Some products are unavailable. Please refresh your cart.", 'error');
        }
      } catch (error) {
        console.error("Error in handlePayment:", error);
        showNotification("Payment failed. Try again later.", 'error');
        navigate("/failure");
      } finally {
        setLoadingPayment(false);
      }
    } else {
      setShowAddressWarning(true);
    }
  };

  if (cart?.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-full shadow-xl p-8 mb-6 animate-bounce-slow">
          <ShoppingBag className="h-16 w-16 text-blue-500" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2 animate-fadeIn">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-6 max-w-md animate-fadeIn delay-200">
          Looks like you haven’t added anything yet. Explore our collection and
          add your favorites!
        </p>
        <Link
          to="/"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transform transition-all duration-300 font-semibold text-lg"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 font-inter py-6 sm:py-8">
      <AnimatePresence>
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
                ${notification.type === "warning" ? "bg-yellow-50 border-yellow-400" : ""}
              `}
            >
              <div className="flex-shrink-0">
                {notification.type === "success" && <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />}
                {notification.type === "error" && <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />}
                {notification.type === "warning" && <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />}
              </div>

              <div className="flex-1">
                <p className="text-sm sm:text-base font-medium text-gray-900 break-words">
                  {notification.message}
                </p>
              </div>

              {/* Close Button */}
              <div className="flex-shrink-0">
                <motion.button
                  onClick={() => setNotification({ ...notification, visible: false })}
                  whileHover={{ rotate: 90 }}
                  className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
                >
                  <X className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center sm:text-left animate-fadeIn">
          🛒 Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart?.map((item) => (
              <div
                key={item._id}
                className="bg-white/70 backdrop-blur-xl rounded-2xl shadow-lg border border-white/30 p-4 flex flex-col sm:flex-row items-center gap-4 hover:shadow-2xl transition-all duration-500 animate-float"
              >
                <Link
                  to={`/productDetails/${item.productId}`}
                  className="w-full sm:w-28 sm:h-28 flex-shrink-0"
                >
                  <img
                    src={`${url}/img/${item.imgSrc}`}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-xl border border-gray-200 transform transition-transform duration-500 hover:scale-110 shadow-md"
                  />
                </Link>

                <div className="flex-1 w-full text-center sm:text-left">
                  <Link
                    to={`/productDetails/${item.productId}`}
                    className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <p className="text-gray-500 text-sm mt-1">
                    Price per item: ₹{item.price / item.qty}
                  </p>
                  <div className="mt-2">
                    <span className="font-medium text-gray-800">
                      Qty:{" "}
                      <span className="text-blue-600 font-bold">{item.qty}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:ml-auto w-full sm:w-auto">
                  <p className="text-lg font-bold text-gray-900">₹{item.price}</p>
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/productDetails/${item.productId}`}
                      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all transform hover:scale-110"
                    >
                      <SquarePen className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-all transform hover:scale-110"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-semibold text-gray-900">₹{total}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-xl text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
              </div>

              {showAddressWarning && (
                <div className="bg-red-100/80 border-l-4 border-red-500 text-red-700 p-4 mb-4 rounded-md animate-shake">
                  <CircleAlert className="h-5 w-5 inline mr-2" />
                  Please add a <span className="font-semibold">shipping address</span>.
                </div>
              )}

              <button
                onClick={handlePayment}
                disabled={loadingPayment}
                className={`w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                  loadingPayment
                    ? "bg-blue-300 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 animate-pulse-slow"
                }`}
              >
                {loadingPayment ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </button>

              <Link
                to="/"
                className="block text-center text-blue-600 hover:text-blue-800 mt-4 font-medium transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
            <ImportantNotice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;