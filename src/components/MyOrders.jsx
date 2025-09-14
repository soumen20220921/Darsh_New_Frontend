import React, { useState, useEffect, useMemo, useCallback  } from "react";
import {
  ShoppingBag,
  Loader2,
  ArrowRight,
  ChevronUp,
  Package,
  CheckCircle,
  Truck,
  LayoutDashboard,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import OrderDetails from "./OrderDetails";
import { useMediaQuery } from "react-responsive";

const OrderSummaryCard = ({ title, count, icon, bgColor, textColor }) => (
  <div
    className={`flex-1 min-w-0 p-5 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl ${bgColor}`}
  >
    <div className="flex items-center space-x-4">
      <div className={`p-3 rounded-full ${textColor}`}>{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800 mt-1">{count}</h3>
      </div>
    </div>
  </div>
);

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);

  const { token,url } = useAppContext();
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Fetch Orders
   const fetchMyOrders = useCallback(async () => {
    if (!token) {
      setError("You must be logged in to view your orders.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}/api/payment/getOrderById`, {
        headers: { Auth: token },
      });
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [token, url]);

 useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setShowScrollTop(true);
      else setShowScrollTop(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paidOrders = useMemo(
    () => orders.filter((order) => order.payStatus === "paid"),
    [orders]
  );

  const orderCounts = useMemo(() => {
    const counts = {
      total: paidOrders.length,
      new: 0,
      accepted: 0,
      dispatched: 0,
    };

    paidOrders.forEach((order) => {
      if (order.trackingId) {
        counts.dispatched += 1;
      } else if (order.orderAccept) {
        counts.accepted += 1;
      } else if (!order.orderAccept && !order.orderReject) {
        counts.new += 1;
      }
    });

    return counts;
  }, [paidOrders]);

  if (selectedOrder) {
    return (
      <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 animate-gradient-x">
        <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
        <p className="text-xl font-medium text-gray-700">Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-red-50 to-red-100 px-4 animate-fade-in">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 transform hover:scale-105 transition-transform">
          <ShoppingBag className="h-16 w-16 text-red-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order History Unavailable
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">{error}</p>
        <button
          onClick={fetchMyOrders}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (paidOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 animate-fade-in">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 transform hover:scale-105 transition-transform">
          <ShoppingBag className="h-16 w-16 text-gray-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Paid Orders Found
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          You don’t have any paid orders yet. Once you complete a purchase, it will
          appear here.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300 font-semibold text-lg"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 relative">
      {/* Header */}
      <div className="animate-fade-in">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          My Orders
        </h2>
        <p className="text-gray-600">A quick overview of your successful purchases.</p>
      </div>

      {isMobile && (
        <button
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
          className="flex items-center justify-center w-full py-3 bg-white rounded-2xl shadow-md border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <LayoutDashboard size={20} className="mr-2" />
          {isSummaryVisible ? "Hide Summary" : "Show Summary"}
        </button>
      )}

      {(isSummaryVisible || !isMobile) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
          <OrderSummaryCard
            title="Total Orders"
            count={orderCounts.total}
            icon={<ShoppingBag className="w-8 h-8 text-indigo-600" />}
            bgColor="bg-indigo-50"
            textColor="text-indigo-600"
          />
          <OrderSummaryCard
            title="New Orders"
            count={orderCounts.new}
            icon={<Package className="w-8 h-8 text-yellow-600" />}
            bgColor="bg-yellow-50"
            textColor="text-yellow-600"
          />
          <OrderSummaryCard
            title="Accepted Orders"
            count={orderCounts.accepted}
            icon={<CheckCircle className="w-8 h-8 text-green-600" />}
            bgColor="bg-green-50"
            textColor="text-green-600"
          />
          <OrderSummaryCard
            title="Tracking Id Orders"
            count={orderCounts.dispatched}
            icon={<Truck className="w-8 h-8 text-blue-600" />}
            bgColor="bg-blue-50"
            textColor="text-blue-600"
          />
        </div>
      )}

      {/* Orders List */}
      <div className="space-y-6">
        {paidOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 transform animate-fade-in"
          >
            {/* Order Info */}
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500 mb-1">
                Order ID:
                <span className="font-mono text-gray-800">
                  {isMobile ? `${order._id.substring(0, 8)}...` : order._id}
                </span>
              </p>
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Total: ₹{order.amount}
              </h3>
              <p className="text-sm text-gray-600">
                {order.orderItems?.length || 0} items
              </p>
            </div>

            {/* Status and Action */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Status</p>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                    order.trackingId
                      ? "bg-blue-100 text-blue-600 animate-pulse"
                      : order.orderAccept
                      ? "bg-green-100 text-green-600 animate-pulse"
                      : order.orderReject
                      ? "bg-red-100 text-red-600 animate-pulse"
                      : "bg-yellow-100 text-yellow-600 animate-pulse"
                  }`}
                >
                  {order.trackingId
                    ? "Tracking ID"
                    : order.orderAccept
                    ? "Accepted"
                    : order.orderReject
                    ? "Rejected"
                    : "New"}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedOrder(order);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="p-3 bg-white animate-arrowMove rounded-lg shadow hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300"
              >
                <ArrowRight className="w-5 h-5 text-indigo-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default MyOrders;
