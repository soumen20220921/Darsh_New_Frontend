import React from "react";
import { Link } from "react-router-dom";
import { GiHanger, GiClothes } from "react-icons/gi";
import { FaHome, FaSearch, FaShoppingBag } from "react-icons/fa";
import { useSpring, animated } from "react-spring";

const Pagenotfound = () => {
  const bounce = useSpring({
    from: { opacity: 0, transform: "scale(0.8) translateY(20px)" },
    to: { opacity: 1, transform: "scale(1) translateY(0)" },
    config: { tension: 200, friction: 12 },
  });

  const floatAnimation = useSpring({
    from: { transform: "translateY(0px)" },
    to: async (next) => {
      while (true) {
        await next({ transform: "translateY(-10px)" });
        await next({ transform: "translateY(0px)" });
      }
    },
    config: { duration: 2000 },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-20 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 -bottom-24 -right-16 animate-pulse"></div>
      <div className="absolute w-64 h-64 bg-blue-200 rounded-full blur-3xl opacity-20 top-1/2 -left-32 animate-pulse delay-1000"></div>
      <div className="absolute w-80 h-80 bg-purple-200 rounded-full blur-3xl opacity-20 -top-32 right-20 animate-pulse delay-500"></div>

      {/* Floating Icons */}
      <animated.div style={floatAnimation} className="absolute top-1/4 left-10 hidden lg:block">
        <GiClothes className="text-indigo-300 text-4xl" />
      </animated.div>
      <animated.div style={floatAnimation} className="absolute bottom-1/3 right-12 hidden lg:block">
        <FaShoppingBag className="text-pink-300 text-3xl" />
      </animated.div>

      {/* Main Card */}
      <animated.div
        style={bounce}
        className="max-w-lg w-full bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 space-y-8 border border-indigo-50 relative z-10 hover:shadow-2xl transition-all duration-300"
      >
        {/* Header */}
        <div className="space-y-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 transition-all duration-300 group"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center text-white text-sm font-bold">
              P
            </div>
            <span className="text-xl font-bold group-hover:scale-105 transition-transform">
              pomwb.com
            </span>
          </Link>
          <p className="text-sm text-gray-500 font-medium">
            Your Trusted E-commerce Fashion Partner
          </p>
        </div>

        {/* Animated Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600 text-6xl sm:text-7xl shadow-lg animate-bounce border border-indigo-200">
              <GiHanger />
            </div>
            <div className="absolute -inset-4 rounded-full border-2 border-indigo-200 animate-ping opacity-20"></div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              404
            </h1>
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">
              Oops! Page Not Found
            </h2>
            <p className="text-xs md:text-lg text-gray-600 leading-relaxed">
              Don't worry, even the most stylish shoppers get lost sometimes.  
              Let's get you back to discovering amazing fashion!
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <FaHome className="group-hover:scale-110 transition-transform" />
              Home
            </Link>
            <Link
              to="/allproducts"
              className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-gray-700 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border border-gray-200"
            >
              <FaShoppingBag className="group-hover:scale-110 transition-transform" />
              Shop
            </Link>
          </div>

          {/* Additional Help */}
          <div className="pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <Link 
                to="/contactus" 
                className="text-indigo-500 hover:text-indigo-700 font-medium transition-colors"
              >
                Contact our support team
              </Link>
            </p>
          </div>
        </div>
      </animated.div>

      {/* Footer Note */}
      <div className="mt-8 text-center">
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} pomwb.com - Fashion that fits your style
        </p>
      </div>
    </div>
  );
};

export default Pagenotfound;