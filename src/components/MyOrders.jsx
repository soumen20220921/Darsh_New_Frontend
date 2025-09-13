import React, { useState, useEffect } from 'react';
import { ShoppingBag, Loader2, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAppContext } from '../context/AppContext';
import OrderDetails from './OrderDetails';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { token,url } = useAppContext();

  const fetchMyOrders = async () => {
    if (!token) {
      setError("You must be logged in to view your orders.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `${url}/api/payment/getOrderById`,
        { headers: { Auth: token } }
      );
      setOrders(response.data.orders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyOrders();
  }, [token]);

  if (selectedOrder) {
    return <OrderDetails order={selectedOrder} onClose={() => setSelectedOrder(null)} />;
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
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order History Unavailable</h2>
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

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-blue-50 to-indigo-50 px-4 animate-fade-in">
        <div className="bg-white rounded-full shadow-xl p-6 mb-6 transform hover:scale-105 transition-transform">
          <ShoppingBag className="h-16 w-16 text-gray-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">No Orders Found</h2>
        <p className="text-gray-600 mb-6 max-w-md">You haven't placed any orders yet. Start shopping now!</p>
        <button
          onClick={() => window.location.href = '/'}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-2xl shadow-lg hover:scale-105 transform transition-transform duration-300 font-semibold text-lg"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 animate-fade-in">Your Orders</h2>
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg border border-gray-200 p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-transform duration-300 hover:shadow-2xl hover:-translate-y-1 transform animate-fade-in"
        >
          {/* Order Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-1">
              Order ID: <span className="font-mono text-gray-800">{order._id.substring(0, 10)}...</span>
            </p>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Total: ₹{order.amount}</h3>
            <p className="text-sm text-gray-600">{order.orderItems?.length || 0} items</p>
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
                  ? "Shipped"
                  : order.orderAccept
                  ? "Accepted"
                  : order.orderReject
                  ? "Rejected"
                  : "New"}
              </span>
            </div>
            <button
              onClick={() => setSelectedOrder(order)}
              className="p-3 bg-white rounded-lg shadow hover:bg-gray-100 transition-colors transform hover:scale-105 duration-300"
            >
              <ArrowRight className="w-5 h-5 text-indigo-600" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
