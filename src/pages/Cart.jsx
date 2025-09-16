import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
  Navigation
} from "lucide-react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import { useState } from "react";
import ImportantNotice from "./ImportantNotice";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const OrderConfirmationModal = ({
  cart,
  total,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4"
    >
      <motion.div
        initial={{ scale: 0.9, y: isMobile ? 100 : 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: isMobile ? 100 : 50 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`bg-white rounded-3xl shadow-2xl relative flex flex-col w-full max-w-lg 
          ${isMobile ? "h-[95vh]" : "max-h-[90vh]"} overflow-hidden`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50 shrink-0">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            📝 Confirm Your Order
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-2 rounded-xl border border-gray-100 hover:shadow-md transition"
              >
                <img
                  src={`${url}/img/${item.imgSrc}`}
                  alt={item.title}
                  className="w-16 h-16 rounded-lg object-cover shadow-sm"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.qty} | Price: ₹{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Address */}
          {address && (
            <div className="bg-white p-4 rounded-xl border border-gray-200 relative group hover:shadow-md transition cursor-pointer">
              <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Shipping to
              </h4>
              <div className="text-sm space-y-1">
                <p className="font-semibold text-gray-800">
                  {address.FullName}
                </p>
                <p>{address.Address}</p>
                <p>
                  {address.Add}, {address.VillorCity}, {address.Dist},{" "}
                  {address.State} {address.Pin}
                </p>
                <p className="text-gray-500">Ph: {address.Phone}</p>
              </div>
              <Link
                to="/account"
                className="absolute top-2 right-2 p-1 text-gray-600 rounded-full hover:bg-gray-200 transition"
              >
                <SquarePen size={16} />
              </Link>
            </div>
          )}

          {/* Total Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-l-4 border-blue-500 shadow-sm">
            <div className="flex justify-between items-center text-lg font-bold text-gray-900">
              <span>Total Amount</span>
              <span className="text-indigo-600">₹{total}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50 flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={onCancel}
            className="w-full py-3 bg-slate-200 text-sm sm:text-base text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loadingPayment}
            className={`w-full py-3 rounded-xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
              loadingPayment
                ? "bg-blue-300 text-white cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 shadow-lg"
            }`}
          >
            {loadingPayment ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Pay"
            )}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AddressSection = ({ onAddAddress }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40 mb-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-red-100 rounded-full">
          <CircleAlert className="h-6 w-6 text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Shipping Address Required</h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        You need to add a shipping address before proceeding to checkout. This helps us deliver your order to the right place.
      </p>
      
      <div className="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border-l-4 border-red-400 mb-6">
        <div className="flex items-start gap-3">
          <Navigation className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-red-700 mb-1">Why we need your address</h4>
            <p className="text-sm text-red-600">
              We need your complete address to estimate delivery time, and ensure your order reaches you safely.
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={onAddAddress}
        className="w-full py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <Plus className="h-5 w-5" />
        Add Shipping Address
      </button>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Your address information is secure and will only be used for delivery purposes.
      </p>
    </motion.div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const { cart: rawCart, getCart, token, address, user, url } = useAppContext();
  const cart = rawCart || [];
  const [showAddressWarning, setShowAddressWarning] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isMobile = useMediaQuery({ maxWidth: 640 });

  const [notification, setNotification] = useState({
    message: "",
    type: "",
    visible: false,
  });

  const showNotification = (message, type) => {
    setNotification({ message, type, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const productCount = cart.length;

  const checkProductAvailability = async () => {
    try {
      if (cart.length > 0) {
        let allProductsAvailable = true;
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
              `${cart[i].title} quantity reduced due to low stock.`,
              'error'
            );
            allProductsAvailable = false;
          }
        }
        return allProductsAvailable;
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

  const handleProceedToCheckout = () => {
    if (address?.FullName && address?.Phone && cart.length > 0) {
      setShowAddressWarning(false);
      setShowConfirmation(true);
    } else {
      setShowAddressWarning(true);
    }
  };

  const handleAddAddress = () => {
    navigate("/account", { state: { scrollToAddress: true } });
  };

  const handleConfirmAndPay = async () => {
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
          showNotification("Redirecting to PhonePe...", "warning");
          window.location.href = orderResponse.data.redirectUrl;
        } else {
          showNotification(
            "Redirecting user to PhonePe payment page...",
            "warning"
          );
        }
      } else {
        showNotification(
          "Some products are unavailable. Please refresh your cart.",
          "error"
        );
      }
    } catch (error) {
      console.error("Error in handlePayment:", error);
      showNotification("Payment failed. Try again later.", "error");
      navigate("/failure");
    } finally {
      setLoadingPayment(false);
      setShowConfirmation(false); 
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
          Looks like you haven't added anything yet. Explore our collection and
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
      <AnimatePresence>
        {showConfirmation && (
          <OrderConfirmationModal
            cart={cart}
            total={total}
            address={address}
            onConfirm={handleConfirmAndPay}
            onCancel={() => setShowConfirmation(false)}
            loadingPayment={loadingPayment}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 animate-fadeIn">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 flex items-center gap-3">
            <span>🛒</span> Shopping Cart
            <span className="bg-blue-600 text-white text-base font-bold px-3 py-1 rounded-full">{productCount}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart?.map((item) => (
              <div
                key={item._id}
                className={`bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/30 p-4 sm:p-6 flex gap-4 hover:shadow-2xl transition-all duration-500 animate-fadeInUp ${isMobile ? "flex-col items-center text-center" : "flex-row items-center"}`}
              >
                <Link
                  to={`/productDetails/${item.productId}`}
                  className={`flex-shrink-0 overflow-hidden rounded-xl group ${isMobile ? "w-40 h-40" : "w-36 h-36"}`}
                >
                  <img
                    src={`${url}/img/${item.imgSrc}`}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 shadow-md"
                  />
                </Link>

                <div className={`flex-1 w-full space-y-2 ${isMobile ? "text-center" : "text-left"}`}>
                  <Link
                    to={`/productDetails/${item.productId}`}
                    className="text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
                  >
                    {item.title}
                  </Link>
                  <div className={`flex items-center gap-2 text-sm text-gray-700 font-medium ${isMobile ? "justify-center" : ""}`}>
                    <span className="bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                      Qty: <span className="text-blue-600 font-bold">{item.qty}</span>
                    </span>
                    <span className="text-gray-500">
                      (₹{item.price / item.qty} each)
                    </span>
                  </div>
                </div>

                <div className={`flex items-center gap-4 ${isMobile ? "flex-row justify-center mt-4" : "flex-col items-end sm:ml-auto w-auto"}`}>
                  <p className="text-xl sm:text-2xl font-bold text-gray-900">₹{item.price}</p>

                  <div className="flex items-center gap-2">
                    <Link
                      to={`/productDetails/${item.productId}`}
                      className="p-3 rounded-full bg-white/70 text-blue-600 hover:bg-blue-100 transition-all transform hover:scale-110 shadow-md"
                    >
                      <SquarePen className="h-5 w-5" />
                    </Link>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-3 rounded-full bg-white/70 text-red-600 hover:bg-red-100 transition-all transform hover:scale-110 shadow-md"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            {!address?.FullName && (
              <AddressSection onAddAddress={handleAddAddress} />
            )}
            
            {address?.FullName && (
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-500" />
                    Shipping Address
                  </h3>
                  <Link
                    to="/account"
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                  >
                    <SquarePen className="h-4 w-4" />
                    Change
                  </Link>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
                  <p className="font-semibold text-gray-800 mb-1">{address.FullName}</p>
                  <p className="text-sm text-gray-600">{address.Address}</p>
                  <p className="text-sm text-gray-600">
                    {address.Add}, {address.VillorCity}, {address.Dist}, {address.State} {address.Pin}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">Phone: {address.Phone}</p>
                </div>
              </div>
            )}

            <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/40 animate-fadeIn">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6 text-gray-700">
                <div className="flex justify-between">
                  <span>Subtotal ({productCount} items)</span>
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
                onClick={handleProceedToCheckout}
                disabled={!address?.FullName}
                className={`w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-lg transition-all duration-300 ${
                  address?.FullName 
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:scale-105 animate-pulse-slow" 
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                {address?.FullName ? "Proceed to Checkout" : "Add Address First"}
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