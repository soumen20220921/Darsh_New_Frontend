import React from "react";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Clock,
  Loader2,
  RefreshCcw,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const OrderInfo = ({ orderId, onClose }) => {
  const { order, getOrder, orderLoading, orderError,url } = useAppContext();

  const getOrderStatus = () => {
    if (order?.trackingId) return "Shipped";
    if (order?.orderAccept) return "Accepted";
    if (order?.orderReject) return "Rejected";
    return "New";
  };

  const status = getOrderStatus();

  // Loading State
  if (orderLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[60vh]">
        <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
        <p className="text-xl font-medium text-gray-700">
          Loading order details...
        </p>
      </div>
    );
  }

  // Error State
  if (orderError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-red-50 rounded-lg shadow-sm border border-red-200 text-red-700 min-h-[60vh] mx-4 sm:mx-auto max-w-2xl text-center">
        <XCircle className="h-16 w-16 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Something Went Wrong</h2>
        <p className="text-lg mb-4">{orderError}</p>
        <button
          onClick={() => getOrder(orderId)}
          className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <RefreshCcw className="h-4 w-4 mr-2" /> Try Again
        </button>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-gray-50 min-h-[60vh]">
        <p className="text-xl font-medium text-gray-600">No order found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Order Header */}
      <div className="mb-6 flex items-center space-x-3">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Order ID: #{order._id}
          </h2>
          <p className="text-gray-600">
            Date:{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"}
          </p>
          <p className="text-gray-600">Payment: {order.payStatus}</p>
        </div>
      </div>

      {/* Order Status */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Order Status</h3>
        <div className="flex items-center justify-between">
          {/* Placed */}
          <div className="flex flex-col items-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <p className="text-sm mt-2 text-gray-700">Placed</p>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${
              status !== "New" ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          {/* Accepted */}
          <div className="flex flex-col items-center">
            {status === "Accepted" ? (
              <Clock className="h-8 w-8 text-yellow-500" />
            ) : (
              <Package
                className={`h-8 w-8 ${
                  status === "Shipped" ? "text-green-500" : "text-gray-400"
                }`}
              />
            )}
            <p className="text-sm mt-2 text-gray-700">Accepted</p>
          </div>
          <div
            className={`flex-1 h-1 mx-4 ${
              status === "Shipped" ? "bg-green-500" : "bg-gray-300"
            }`}
          ></div>
          {/* Shipped */}
          <div className="flex flex-col items-center">
            <Truck
              className={`h-8 w-8 ${
                status === "Shipped" ? "text-blue-500" : "text-gray-400"
              }`}
            />
            <p className="text-sm mt-2 text-gray-700">Shipped</p>
          </div>
        </div>
        <div className="mt-4 text-center">
          <span
            className={`font-semibold ${
              status === "Shipped"
                ? "text-blue-600"
                : status === "Accepted"
                ? "text-yellow-600"
                : status === "Rejected"
                ? "text-red-600"
                : "text-gray-600"
            }`}
          >
            Current Status: {status}
          </span>
        </div>
      </div>

      {/* Products */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Products</h3>
        <div className="space-y-4">
          {order?.orderItems && order.orderItems.length > 0 ? (
            order.orderItems.map((item, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gray-50 rounded-lg"
              >
                <img
                  src={
                    item.imgSrc
                      ? `${url}/img/${item.imgSrc}`
                      : "https://via.placeholder.com/64"
                  }
                  alt={item.title}
                  className="h-16 w-16 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">Quantity: {item.qty}</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{item.price / item.qty} each
                  </p>
                </div>
                <div className="text-left sm:text-right w-full sm:w-auto">
                  <p className="font-semibold text-gray-900">₹{item.price}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No products found in this order.</p>
          )}
        </div>
      </div>

      {/* Summary */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{order.amount}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between font-bold text-lg text-gray-900">
            <span>Total Amount</span>
            <span>₹{order.amount}</span>
          </div>
        </div>
      </div>

      {/* Customer & Shipping */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Info */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Customer Info</h3>
          <p>
            <span className="text-gray-500">Name:</span>{" "}
            {order.userShipping?.FullName}
          </p>
          <p>
            <span className="text-gray-500">Phone:</span>{" "}
            {order.userShipping?.Phone}
          </p>
          <p>
            <span className="text-gray-500">Email:</span>{" "}
            {order.userShipping?.Email || "Not provided"}
          </p>
          <p>
            <span className="text-gray-500">Payment:</span> {order.payStatus}
          </p>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>{order.userShipping?.FullName}</p>
          <p>{order.userShipping?.Add}</p>
          <p>
            {order.userShipping?.VillorCity}, {order.userShipping?.Dist}
          </p>
          <p>
            {order.userShipping?.State} - {order.userShipping?.Pin}
          </p>
        </div>
      </div>

      {/* Tracking */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Tracking</h3>
        {order.trackingId ? (
          <div className="bg-gray-100 p-3 rounded-lg flex items-center justify-between">
            <span className="font-medium text-blue-600 break-all">
              {order.trackingId}
            </span>
            <Link
              to={`https://www.google.com/search?q=${order.trackingId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Track
            </Link>
          </div>
        ) : (
          <p className="text-gray-500 italic">
            Tracking info will be available once shipped.
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderInfo;
