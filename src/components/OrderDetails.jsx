import React, { useState, useEffect } from "react";
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
  Download,
  Share2,
  Star,
  MessageCircle,
  Shield,
  RotateCcw,
  ChevronRight,
  User,
  Navigation,
} from "lucide-react";
import { Link } from "react-router-dom";
import DeliveryEstimateSection from "./DeliveryEstimateSection";
import { useAppContext } from "../context/AppContext";

const OrderDetails = ({ order, onClose }) => {
  const { url } = useAppContext();
  const [copied, setCopied] = useState(false);
  const [progressWidth, setProgressWidth] = useState(0);
  const [activeTab, setActiveTab] = useState("details");
  const [imageError, setImageError] = useState({});

  const orderDate = new Date(order.orderDate);
  const estimatedDate = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const isDelivered = order.trackingId && order.orderAccept;

  useEffect(() => {
    const { step } = getStatusInfo();
    setTimeout(() => {
      setProgressWidth((step - 1) * 50);
    }, 300);
  }, [order]);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20 min-h-[60vh] animate-fade-in bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-medium text-gray-600 mb-2">
            No order details found
          </h2>
          <p className="text-gray-500 mb-6">Please select a valid order</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 font-medium"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  const getStatusInfo = () => {
    if (order.orderReject) {
      return { 
        status: "Rejected", 
        color: "red", 
        step: 0, 
        icon: XCircle,
        gradient: "from-red-500 to-red-600"
      };
    }
    if (order.trackingId) {
      return {
        status: "Shipped & Tracking ID Available",
        color: "blue",
        step: 3,
        icon: Truck,
        gradient: "from-blue-500 to-cyan-600"
      };
    }
    if (order.orderAccept) {
      return { 
        status: "Accepted & Processing", 
        color: "green", 
        step: 2, 
        icon: Package,
        gradient: "from-green-500 to-emerald-600"
      };
    }
    return { 
      status: "Order Placed", 
      color: "purple", 
      step: 1, 
      icon: CheckCircle,
      gradient: "from-purple-500 to-indigo-600"
    };
  };

  const { status, color, step, icon, gradient } = getStatusInfo();
  const StatusIcon = icon;

  const handleCopy = () => {
    if (order.trackingId) {
      navigator.clipboard.writeText(order.trackingId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  const handleShareOrder = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Order #${order._id.substring(0, 8)}`,
          text: `Check out my order details`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      handleCopy();
    }
  };

  const statusSteps = [
    { 
      label: "Placed", 
      icon: CheckCircle, 
      index: 1,
      description: "Order received and confirmed",
      mobileDesc: "Confirmed",
      time: order.orderDate
    },
    { 
      label: "Accepted", 
      icon: Package, 
      index: 2,
      description: "Order accepted and being processed",
      mobileDesc: "Processing",
      time: order.orderAccept ? order.orderDate : "Pending"
    },
    { 
      label: "Shipped", 
      icon: Truck, 
      index: 3,
      description: "Package dispatched with tracking",
      mobileDesc: "Shipped",
      time: order.trackingId ? "Dispatched" : "Pending"
    },
  ];

  const tabs = [
    { id: "details", label: "Order Details", icon: Package },
    { id: "shipping", label: "Shipping", icon: Truck },
    { id: "support", label: "Support", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 animate-fade-in">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              </button>
              <div className="flex flex-col">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1">
                  Order #{order._id.substring(0, 10)}...
                </h1>
                <p className="text-xs text-gray-500 flex items-center">
                  <CalendarDays className="h-3 w-3 mr-1" />
                  {new Date(order.orderDate).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShareOrder}
                className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 hidden sm:flex"
              >
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
              {!order.orderReject && (
                <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-2 rounded-xl shadow-sm border">
                  <CalendarDays className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-xs text-gray-500">Est. Delivery</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {estimatedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

         
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Status Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 mb-6 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${gradient} shadow-lg`}>
                <StatusIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{status}</h2>
                <p className="text-sm text-gray-600">
                  {order.orderReject 
                    ? "Contact support for assistance" 
                    : `Step ${step} of ${statusSteps.length} completed`
                  }
                </p>
              </div>
            </div>

            {!order.orderReject && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-xs text-gray-500">Estimated Delivery</p>
                  <p className="text-sm font-semibold text-gray-900">
                    {estimatedDate.toDateString()}
                  </p>
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            )}
          </div>

          {/* Progress Timeline */}
          {!order.orderReject && (
            <div className="mt-6">
              <div className="relative">
                {/* Progress Bar */}
                <div className="absolute top-4 left-0 right-0 h-1.5 bg-gray-200 rounded-full z-0 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out ${
                      progressWidth > 0 ? 'shadow-lg' : ''
                    }`}
                    style={{ width: `${progressWidth}%` }}
                  >
                    {progressWidth > 0 && progressWidth < 100 && (
                      <div className="absolute top-0 h-full w-8 bg-white opacity-70 animate-shine rounded-full" 
                        style={{ left: `${progressWidth - 4}%` }}></div>
                    )}
                  </div>
                </div>
                
                {/* Steps */}
                <div className="relative flex justify-between items-start z-10">
                  {statusSteps.map((s, index) => {
                    const StepIcon = s.icon;
                    const isCompleted = step >= s.index;
                    const isCurrent = step === s.index;
                    
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center w-1/3 relative"
                      >
                        <div
                          className={`p-2 rounded-full border-4 transition-all duration-500 transform ${
                            isCompleted
                              ? `bg-gradient-to-r ${gradient} border-white scale-110 shadow-lg`
                              : `bg-white border-gray-300 ${
                                  isCurrent ? "border-indigo-300 scale-110" : ""
                                }`
                          } ${
                            isCurrent
                              ? "animate-pulse ring-4 ring-indigo-100"
                              : ""
                          }`}
                        >
                          <StepIcon
                            className={`h-4 w-4 ${
                              isCompleted ? "text-white" : "text-gray-400"
                            }`}
                          />
                        </div>
                        <div className="text-center mt-3 space-y-1">
                          <p
                            className={`text-xs font-medium ${
                              isCompleted
                                ? "text-gray-900 font-semibold"
                                : "text-gray-500"
                            }`}
                          >
                            {s.label}
                          </p>
                          <p className="text-xs text-gray-500 hidden sm:block">
                            {s.description}
                          </p>
                          <p className="text-xs text-gray-400 block sm:hidden">
                            {s.mobileDesc}
                          </p>
                        </div>
                         {/* Connector lines between steps */}
                         {index < statusSteps.length - 1 && (
                          <div
                            className={`hidden sm:block absolute top-2 left-2/3 w-1/3 h-0.5 ${
                              step > s.index ? "bg-blue-500" : "bg-gray-300"
                            }`}
                          ></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Order Items & Tracking */}
          <div className="xl:col-span-2 space-y-6">
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
            {/* Order Items Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-4 md:p-6 animate-fade-in-up">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 text-indigo-600 mr-2" />
                  Order Items ({order.orderItems?.length || 0})
                </h2>
                
              </div>

              <div className="space-y-4">
                {order.orderItems?.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 md:space-x-4 p-1 md:p-4 bg-gray-50/50 rounded-xl border border-gray-200/60 hover:border-indigo-200 transition-all duration-300 group"
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={
                          !imageError[index] && item.imgSrc
                            ? `${url}/img/${item.imgSrc}`
                            : "https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=150&h=150&fit=crop"
                        }
                        alt={item.title}
                        onError={() => handleImageError(index)}
                        className="h-16 w-16 sm:h-20 sm:w-20 object-cover rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                      />
                      <div className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {item.qty}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-indigo-700 transition-colors">
                        {item.title}
                      </h3>
                      <div className="flex items-center space-x-2 md:space-x-4 mt-2 text-sm text-gray-600">
                        <span className="whitespace-nowrap ">{(item.price / item.qty).toLocaleString()} each</span>
                        <span>•</span>
                        <span className="font-medium text-gray-900">₹{item.price.toLocaleString()}</span>
                      </div>
                    </div>

                    <button className="p-2 hover:bg-white rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <Star className="h-4 w-4 text-gray-400 hover:text-yellow-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            

            {/* Delivery Estimate */}
            {!order.orderReject && <DeliveryEstimateSection order={order} />}

            {/* Support Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 animate-fade-in-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <HelpCircle className="w-5 h-5 text-blue-500 mr-2" />
                Help & Support
              </h2>
              
              <div className="grid grid-cols-1  gap-4 mb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <RotateCcw className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Returns</p>
                      <p className="text-xs text-gray-600">7-day return policy</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600 mb-3">Need immediate help?</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+919474048860"
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 font-medium flex-1"
                  >
                    <Phone className="h-4 w-4" />
                    <span>Call Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Summary Cards */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 animate-fade-in-up">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <CreditCard className="w-5 h-5 text-green-500 mr-2" />
                Order Summary
              </h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{order.amount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">Included</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">₹{order.amount?.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="font-medium text-gray-900">{order.paymentMethod || "UPI"}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <span className="text-gray-600">Payment Status</span>
                  <span className="font-medium text-green-600 capitalize">{order.payStatus}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200/60 p-6 animate-fade-in-up">
              <h2 className=" md:text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="w-5 h-5 text-indigo-500 mr-2" />
                Shipping Address
              </h2>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <User className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900">{order.userShipping?.FullName}</p>
                    <p className="text-sm text-gray-600">{order.userShipping?.Phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Navigation className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-gray-700 space-y-1">
                    <p>{order.userShipping?.Add}</p>
                    <p>
                      {order.userShipping?.VillorCity}, {order.userShipping?.Dist}
                    </p>
                    <p>
                      {order.userShipping?.State} - {order.userShipping?.Pin}
                    </p>
                  </div>
                </div>
              </div>
            </div>


            {/* Need Help Card */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 text-white animate-fade-in-up">
              <h3 className="font-semibold mb-2 flex items-center">
                <PhoneCall className="h-4 w-4 mr-2 animate-pulse" />
                24/7 Support
              </h3>
              <p className="text-blue-100 text-sm mb-4">
                Our team is here to help you with any questions
              </p>
              <a
                href="tel:+919474048860"
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium text-sm"
              >
                <Phone className="h-4 w-4" />
                <span>+91 9474048860</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;