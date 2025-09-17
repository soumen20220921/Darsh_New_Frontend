import React, { useState, useEffect  } from "react";
import {
  ArrowLeft,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  Copy,
  Check,
  ExternalLink,
  Clock,
  XCircle,
  Phone,
  CreditCard,
  CalendarDays,
  HelpCircle,
  PhoneCall,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeliveryEstimateSection from "./DeliveryEstimateSection";
import { useAppContext } from "../context/AppContext";

const OrderDetails = ({ order, onClose }) => {
  const {url} = useAppContext();
  const [copied, setCopied] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const orderDate = new Date(order.orderDate);
  const estimatedDate = new Date(
    orderDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  useEffect(() => {
    const { step } = getStatusInfo();
    setTimeout(() => {
      setProgressWidth((step - 1) * 50);
    }, 300);
  }, [order]);

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
      return { status: "Rejected", color: "red", step: 0, icon: XCircle };
    }
    if (order.trackingId) {
      return {
        status: "Tracking ID Available",
        color: "blue",
        step: 3,
        icon: Truck,
      };
    }
    if (order.orderAccept) {
      return { status: "Accepted", color: "green", step: 2, icon: Package };
    }
    return { status: "Order Placed", color: "purple", step: 1, icon: CheckCircle };
  };

  const { status, color, step, icon } = getStatusInfo();
  const StatusIcon = icon;

  const handleCopy = () => {
    if (order.trackingId) {
      navigator.clipboard.writeText(order.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
   const statusSteps = [
    { 
      label: "Placed", 
      icon: CheckCircle, 
      index: 1,
      description: "Order received",
      ds: "Done"
    },
    { 
      label: "Accepted", 
      icon: Package, 
      index: 2,
      description: "Accepted your order",
      ds : "Complete"
    },
    { 
      label: "Shipped", 
      icon: Truck, 
      index: 3,
      description: "On the way to you",
      ds: "On the way "
    },
  ];

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto my-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0 mb-6">
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
         {/* Estimated Delivery Badge */}
        {!order.orderReject && (
          <div className="bg-white py-2 px-4 rounded-lg shadow-md flex items-center">
            <CalendarDays className="h-5 w-5 text-blue-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Estimated Delivery</p>
              <p className="text-sm font-semibold text-gray-900">
                {estimatedDate.toDateString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <hr className="my-6" />

      {/* Order Status Timeline */}
     <div className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
          Order Status
        </h2>
        
        <div className="relative mb-10">
          {/* Progress bar */}
          <div className="absolute top-7 left-0 right-0 h-2 bg-gray-200 z-0 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressWidth}%` }}
            ></div>
            {progressWidth > 0 && progressWidth < 100 && (
              <div className="absolute top-0 h-full w-4 bg-white opacity-50 animate-shine" 
                style={{ left: `${progressWidth - 2}%` }}></div>
            )}
          </div>
          
          {/* Status steps */}
          <div className="relative flex justify-between items-start z-10">
            {statusSteps.map((s, i) => {
              const StepIcon = s.icon;
              const isCompleted = step >= s.index;
              const isCurrent = step === s.index;
              
              return (
                <div key={i} className="flex flex-col items-center w-1/3 relative">
                  <div className={`p-3 rounded-full shadow-lg transform transition-all duration-500 ${
                    isCompleted 
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 text-white scale-110 shadow-blue-200" 
                      : "bg-white text-gray-400 border-2 border-gray-300"
                  } ${isCurrent ? "animate-pulse ring-2 ring-offset-2 ring-blue-400" : ""}`}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <p className={`text-xs font-medium mt-3 text-center ${
                    isCompleted ? "text-gray-900 font-semibold" : "text-gray-500"
                  }`}>
                    {s.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 text-center hidden sm:block">
                    {s.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 text-center block sm:hidden">
                    {s.ds}
                  </p>
                  
                  {/* Connector lines between steps */}
                  {i < statusSteps.length - 1 && (
                    <div className={`hidden sm:block absolute top-4 left-2/3 w-1/3 h-0.5 ${
                      step > s.index ? "bg-blue-500" : "bg-gray-300"
                    }`}></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Current status display */}
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-3 rounded-full text-sm font-semibold 
            ${color === "red" ? "bg-red-100 text-red-800" : 
              color === "green" ? "bg-green-100 text-green-800" : 
              color === "blue" ? "bg-blue-100 text-blue-800" : 
              "bg-purple-100 text-purple-800"} 
            shadow-md transition-all duration-500 transform hover:scale-105`}>
            <StatusIcon className="h-5 w-5 mr-2" />
            {status}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {order.orderReject 
              ? "Please contact support for assistance" 
              : `Step ${step} of ${statusSteps.length}`}
          </p>
        </div>
      </div>

      {/* Rejected Orders */}
      {order.orderReject && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center shadow-md mb-8">
          <XCircle className="h-10 w-10 text-red-500 mx-auto mb-3 animate-pulse " />
          <h2 className="text-lg font-bold text-red-700 mb-2">
            Your order has been rejected
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Please contact our support team for further assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="tel:+919474048860"
              className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Phone className="h-4 w-4 mr-2" /> Call Support
            </a>
          </div>

          {order.trackingId && (
            <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
              <h3 className="text-base whitespace-nowrap font-semibold text-gray-900 mb-3">
                Tracking ID
              </h3>
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-blue-600 break-all">
                  {order.trackingId}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-600" />
                  )}
                </button>
              </div>
              <Link
                to={`https://www.google.com/search?q=${order.trackingId}`}
                target="_blank"
                className="flex items-center justify-center mt-3 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium shadow-sm"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Track Package
              </Link>
            </div>
          )}
        </div>
      )}

      {!order.orderReject && order.trackingId && (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg mb-8 transform transition-all duration-500 animate-fade-in-up">
          <h2 className="text-sm whitespace-nowrap sm:text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Truck className="h-6 w-6 text-blue-500 animate-bounce" />
            Tracking Information
          </h2>
          <span className="text-sm xs:text-lg  text-gray-900">
            Tracking ID:{" "}
          </span>{" "}
          {/* Tracking ID with Copy */}
          <div className="flex items-center justify-between gap-3 flex-wrap bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-xl shadow-inner">
            <span className="font-semibold text-blue-700 break-all text-sm sm:text-base animate-pulse">
              {order.trackingId}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-xl bg-white hover:bg-blue-100 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-600 animate-scale-in" />
              ) : (
                <Copy className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
          {/* Track Link */}
          <Link
            to={`https://www.google.com/search?q=${order.trackingId}`}
            target="_blank"
            className="flex items-center justify-center mt-4 px-4 py-2 rounded-xl 
                 bg-gradient-to-r from-blue-500 to-indigo-500 text-white 
                 text-sm font-medium shadow-md hover:shadow-lg 
                 transform hover:scale-105 transition-all duration-300"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Track Package
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Order Items
            </h2>
            <div className="space-y-3">
              {order.orderItems?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg shadow-sm"
                >
                  <img
                    src={
                      item.imgSrc
                        ? `${url}/img/${item.imgSrc}`
                        : "https://via.placeholder.com/80"
                    }
                    alt={item.title}
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 w-full">
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
                    <p className="font-semibold text-gray-900">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Estimate */}
          {!order.orderReject && <DeliveryEstimateSection order={order} />}

          {/* Help & Support */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <HelpCircle className="w-5 h-5 text-blue-500 mr-2" />
              Help & Support
            </h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2 mb-4">
              <li>
                Need to return an item? Visit our{" "}
                <span className="font-weight-800 ">Returns Center</span>.
              </li>
              <li>For billing issues, check your Payment History.</li>
            </ul>
            <div className="mt-4">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                Or talk to our support team directly:
              </p>
              <a
                href="tel:+919474048860"
                className="flex items-center justify-center sm:justify-start space-x-2 text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                <PhoneCall className="w-6 h-6 animate-pulse" />
                <span>+91 9474048860</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Summary
            </h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{order.amount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-2 font-bold text-gray-900 flex justify-between">
                <span>Total</span>
                <span>₹{order.amount}</span>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 text-indigo-500 mr-2" />
              Shipping Address
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
          {!order.orderReject && !order.trackingId && (
            <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Truck className="w-5 h-5 text-blue-500 mr-2" />
                Tracking Details
              </h2>

              <div className="flex items-center text-sm text-gray-500 italic">
                <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                Tracking ID coming soon...
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 text-green-500 mr-2" />
              Payment Info
            </h2>
            <p className="text-sm text-gray-700">
              Method:{" "}
              <span className="font-semibold">
                {order.paymentMethod || "UPI"}
              </span>
            </p>
            <p className="text-sm text-gray-700">
              Status: <span className="font-semibold text-green-600">{order.payStatus}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
