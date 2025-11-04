import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  ShoppingBag,
  Loader2,
  ArrowRight,
  ChevronUp,
  Package,
  CheckCircle,
  Truck,
  LayoutDashboard,
  Filter,
  Search,
  Calendar,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import OrderDetails from "./OrderDetails";
import { useMediaQuery } from "react-responsive";

const OrderSummaryCard = ({ title, count, icon, bgColor, textColor, onClick }) => (
  <div
    onClick={onClick}
    className={`flex-1 min-w-0 p-4 sm:p-5 rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${bgColor} ${
      onClick ? "active:scale-95" : ""
    }`}
  >
    <div className="flex-wrap md:flex items-center space-x-1">
      <div className={`p-2 sm:p-3 rounded-full ${textColor}`}>
        {React.cloneElement(icon, { className: "w-5 h-5 sm:w-6 sm:h-6" })}
      </div>
      <div className="min-w-0">
        <p className="text-xs sm:text-sm font-medium text-gray-500 truncate">{title}</p>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mt-1">{count}</h3>
      </div>
    </div>
  </div>
);

const StatusBadge = ({ status, trackingId, orderAccept, orderReject }) => {
  const getStatusConfig = () => {
    if (trackingId) {
      return {
        text: "Dispatched",
        bg: "bg-blue-100",
        textColor: "text-blue-700",
        icon: <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
      };
    }
    if (orderAccept) {
      return {
        text: "Accepted",
        bg: "bg-green-100",
        textColor: "text-green-700",
        icon: <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      };
    }
     if (orderReject) {
      return {
        text: "Rejected",
        bg: "bg-red-100",
        textColor: "text-red-700",
        icon: <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4" />
      };
    }
    return {
      text: "New",
      bg: "bg-yellow-100",
      textColor: "text-yellow-700",
      icon: <Package className="w-3 h-3 sm:w-4 sm:h-4" />
    };
  };

  const config = getStatusConfig();

  return (
    <div className={`inline-flex items-center space-x-1 px-2 sm:px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${config.bg} ${config.textColor}`}>
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isSummaryVisible, setIsSummaryVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [refreshing, setRefreshing] = useState(false);

  const { token, url } = useAppContext();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });

  const fetchMyOrders = useCallback(async (showRefresh = false) => {
    if (!token) {
      setError("You must be logged in to view your orders.");
      setLoading(false);
      return;
    }
    
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    
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
      setRefreshing(false);
    }
  }, [token, url]);

  useEffect(() => {
    fetchMyOrders();
  }, [fetchMyOrders]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
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

  const filteredOrders = useMemo(() => {
    return paidOrders.filter(order => {
      const matchesSearch = order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.amount.toString().includes(searchTerm);
      
      const matchesStatus = statusFilter === "all" ||
        (statusFilter === "new" && !order.orderAccept && !order.orderReject) ||
        (statusFilter === "accepted" && order.orderAccept) ||
        (statusFilter === "dispatched" && order.trackingId) ||
        (statusFilter === "rejected" && order.orderReject);
      
      return matchesSearch && matchesStatus;
    });
  }, [paidOrders, searchTerm, statusFilter]);

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
      }else if (order.orderReject) {
        counts.rejected += 1;
      } else {
        counts.new += 1;
      }
    });

    return counts;
  }, [paidOrders]);

  const handleSummaryClick = (type) => {
    if (isMobile) {
      setIsSummaryVisible(false);
    }
    setStatusFilter(type === "total" ? "all" : type);
    setTimeout(() => {
      document.getElementById("orders-section")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (selectedOrder) {
    return (
      <OrderDetails 
        order={selectedOrder} 
        onClose={() => setSelectedOrder(null)} 
        onRefresh={() => fetchMyOrders(true)}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50">
        <div className="relative">
          <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-4" />
          <div className="absolute inset-0 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-medium text-gray-700 mt-4">Loading your orders...</p>
        <p className="text-gray-500 mt-2">Getting everything ready for you</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-red-50 to-red-100 px-4 animate-fade-in">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 transform hover:scale-105 transition-transform">
          <AlertCircle className="h-16 w-16 text-red-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Order History Unavailable
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">{error}</p>
        <button
          onClick={() => fetchMyOrders()}
          className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105 flex items-center space-x-2"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Try Again</span>
        </button>
      </div>
    );
  }

  if (paidOrders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 animate-fade-in">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 transform hover:scale-105 transition-transform">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          No Paid Orders Found
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          You don't have any paid orders yet. Once you complete a purchase, it will
          appear here.
        </p>
        <button
          onClick={() => (window.location.href = "/")}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300 font-semibold text-lg flex items-center space-x-2"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Start Shopping</span>
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 relative max-w-7xl mx-auto">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              My Orders
            </h2>
            <p className="hidden md:block text-gray-600 text-sm sm:text-base">
              Manage and track your purchases in one place
            </p>
          </div>
          <button
            onClick={() => fetchMyOrders(true)}
            disabled={refreshing}
            className="px-2 md:px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium text-xs sm:text-base flex items-center space-x-1 md:space-x-2 self-start sm:self-auto disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 md:w-4 md:h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing..' : 'Refresh'}</span>
          </button>
        </div>
      </div>


      {/* Summary Cards */}
      {isMobile && (
        <button
          onClick={() => setIsSummaryVisible(!isSummaryVisible)}
          className="flex items-center justify-center w-full py-3 bg-white rounded-xl shadow-md border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm"
        >
          <LayoutDashboard size={18} className="mr-2" />
          {isSummaryVisible ? "Hide Summary" : "Show Summary"}
          <ChevronUp 
            className={`ml-2 w-4 h-4 transform transition-transform duration-300 ${
              isSummaryVisible ? "rotate-180" : ""
            }`} 
          />
        </button>
      )}

      {(isSummaryVisible || !isMobile) && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 animate-fade-in-up">
          <OrderSummaryCard
            title="Total Orders"
            count={orderCounts.total}
            icon={<ShoppingBag />}
            bgColor="bg-indigo-50 hover:bg-indigo-100"
            textColor="text-indigo-600"
            onClick={() => handleSummaryClick("total")}
          />
          <OrderSummaryCard
            title="New Orders"
            count={orderCounts.new}
            icon={<Package />}
            bgColor="bg-yellow-50 hover:bg-yellow-100"
            textColor="text-yellow-600"
            onClick={() => handleSummaryClick("new")}
          />
          <OrderSummaryCard
            title="Accepted"
            count={orderCounts.accepted}
            icon={<CheckCircle />}
            bgColor="bg-green-50 hover:bg-green-100"
            textColor="text-green-600"
            onClick={() => handleSummaryClick("accepted")}
          />
          <OrderSummaryCard
            title="Dispatched"
            count={orderCounts.dispatched}
            icon={<Truck />}
            bgColor="bg-blue-50 hover:bg-blue-100"
            textColor="text-blue-600"
            onClick={() => handleSummaryClick("dispatched")}
          />
        </div>
      )}

      {/* Orders List */}
      <div id="orders-section" className="space-y-4 sm:space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Orders ({filteredOrders.length})
          </h3>
          {(searchTerm || statusFilter !== "all") && (
            <button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
              }}
              className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear filters
            </button>
          )}
        </div>

        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
            <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 text-sm">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <div
                key={order._id}
                className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-300 hover:shadow-lg hover:border-indigo-200 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Order Info */}
                <div className="flex-1 min-w-0 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <p className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded">
                      {order._id}
                    </p>
                    <StatusBadge
                      status={order.status}
                      trackingId={order.trackingId}
                      orderAccept={order.orderAccept}
                      orderReject={order.orderReject}
                    />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <h3 className="text-lg font-bold text-gray-900">
                      ₹{order.amount}
                    </h3>
                    <span>•</span>
                    <span>{order.orderItems?.length || 0} items</span>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    scrollToTop();
                  }}
                  className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 font-medium text-sm flex items-center justify-center space-x-2 group"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all duration-300 z-50 transform hover:scale-110"
        >
          <ChevronUp className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}
    </div>
  );
};

export default MyOrders;