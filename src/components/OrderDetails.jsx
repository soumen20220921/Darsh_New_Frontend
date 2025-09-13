import React from "react";
import { ArrowLeft, MapPin, Package, Truck, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const OrderDetails = ({ order, onClose }) => {
  const {url} = useAppContext();
  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] animate-fade-in">
        <h2 className="text-xl font-medium text-gray-600">
          No order details found.
        </h2>
      </div>
    );
  }

  const getStatusInfo = () => {
    if (order.orderReject) {
      return { status: "Rejected", color: "red", step: 0 };
    }
    if (order.trackingId) {
      return { status: "Shipped", color: "blue", step: 3 };
    }
    if (order.orderAccept) {
      return { status: "Accepted", color: "green", step: 2 };
    }
    return { status: "Placed", color: "purple", step: 1 };
  };

  const { status, color, step } = getStatusInfo();

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto my-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
        <div className="flex items-center space-x-3">
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all transform hover:scale-110 shadow-sm"
          >
            <ArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              Order #{order._id.substring(0, 10)}...
            </h1>
            <p className="text-sm text-gray-600">
              Placed on: {new Date(order.orderDate).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      <hr className="my-6" />

      {/* Order Status Timeline */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Order Status
        </h2>
        <div className="relative flex justify-between items-center text-center">
          <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200 z-0 rounded">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded transition-all duration-700"
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
          {[
            { label: "Placed", icon: CheckCircle, index: 1 },
            { label: "Accepted", icon: Package, index: 2 },
            { label: "Shipped", icon: Truck, index: 3 },
          ].map((s, i) => (
            <div
              key={i}
              className="flex flex-col items-center w-1/3 z-10 animate-fade-in"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div
                className={`p-2 rounded-full shadow-md transform transition-all ${
                  step >= s.index
                    ? "bg-green-500 text-white scale-11"
                    : "bg-gray-300 text-gray-500"
                }`}
              >
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-xs sm:text-sm mt-2 font-medium text-gray-700">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold text-white bg-${color}-600 shadow-md animate-pulse`}
          >
            {status}
          </span>
        </div>
      </div>

      <hr className="my-6" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-transform hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-4">
              {order.orderItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 p-4 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow hover:shadow-lg transition-all"
                >
                  <img
                    src={
                      item.imgSrc
                        ? `${url}/img/${item.imgSrc}`
                        : "https://via.placeholder.com/80"
                    }
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded-lg flex-shrink-0 transform hover:scale-105 transition-transform"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.qty}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{item.price / item.qty} each
                    </p>
                  </div>
                  <div className="text-left sm:text-right w-full sm:w-auto">
                    <p className="font-semibold text-gray-900">
                      ₹{item.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>
                  Subtotal (
                  {order.orderItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                  items)
                </span>
                <span>₹{order.amount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-4 mt-4 font-bold text-lg text-gray-900 flex justify-between">
                <span>Total</span>
                <span>₹{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-indigo-500" />
              <span>Shipping Address</span>
            </h2>
            <div className="text-sm text-gray-700 space-y-1">
              <p className="font-semibold">{order.userShipping?.FullName}</p>
              <p>{order.userShipping?.Add}</p>
              <p>
                {order.userShipping?.VillorCity}, {order.userShipping?.Dist}
              </p>
              <p>
                {order.userShipping?.State} - {order.userShipping?.Pin}
              </p>
              <p className="mt-2 font-medium">
                Phone: {order.userShipping?.Phone}
              </p>
            </div>
          </div>

          {/* Tracking */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Tracking
            </h2>
            {order.trackingId ? (
              <div className="flex flex-col">
                <p className="text-sm text-gray-600 mb-1">Tracking ID:</p>
                <span className="font-semibold text-blue-600 text-base break-all animate-pulse">
                  {order.trackingId}
                </span>
                <Link
                  to={`https://www.google.com/search?q=${order.trackingId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline mt-2 text-sm"
                >
                  Track Package
                </Link>
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">
                Tracking info will be available once the order is shipped.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
