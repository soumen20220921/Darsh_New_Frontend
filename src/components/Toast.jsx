import React from "react";
import { CheckCircle, XCircle, AlertCircle, X, Info } from "lucide-react";

const Toast = ({ type = "success", message = "Product added to cart!" }) => {
  // Custom unique palette 🎨
  const variants = {
    success: {
      bg: "bg-gradient-to-r from-emerald-50 to-emerald-100",
      border: "border-emerald-300",
      icon: <CheckCircle className="h-5 w-5  text-emerald-500 animate-pulse" />,
    },
    error: {
      bg: "bg-gradient-to-r from-rose-50 to-rose-100",
      border: "border-rose-300",
      icon: <XCircle className="h-5 w-5 text-rose-500 animate-pulse" />,
    },
    warning: {
      bg: "bg-gradient-to-r from-amber-50 to-amber-100",
      border: "border-amber-300",
      icon: <AlertCircle className="h-5 w-5 text-amber-500 animate-bounce" />,
    },
    info: {
      bg: "bg-gradient-to-r from-indigo-50 to-indigo-100",
      border: "border-indigo-300",
      icon: <Info className="h-5 w-5 text-indigo-500 animate-pulse" />,
    },
  };

  const { bg, border, icon } = variants[type] || variants.success;

  return (
    <div
      className={`
        fixed top-5 right-5 z-50
        max-w-xs sm:max-w-sm w-11/12
        px-4 py-3 rounded-xl shadow-2xl border ${border} ${bg}
        transform transition-all duration-500 ease-out
        animate-slideIn
      `}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{icon}</div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-800">{message}</p>
        </div>
        <button
          className="ml-3 rounded-full p-1.5 bg-white/70 text-gray-500 hover:text-gray-700 hover:bg-white transition-all"
          aria-label="Close toast"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
