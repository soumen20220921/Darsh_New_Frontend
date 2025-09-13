import React from "react";
import { Link } from "react-router-dom";
import { GiHanger } from "react-icons/gi";
import { useSpring, animated } from "react-spring";

const Pagenotfound = () => {
  const bounce = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 12 },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-4 text-center relative overflow-hidden">
      <div className="absolute w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-30 -top-20 -left-20 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 -bottom-24 -right-16 animate-pulse"></div>

      {/* Main Card */}
      <animated.div
        style={bounce}
        className="max-w-md w-full bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 md:p-12 space-y-6 border border-indigo-100 relative z-10"
      >
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 tracking-wide">
          <Link
            to="/"
            className="text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
          >
            <span>pomwb.com</span>
          </Link>
          <span className="block sm:inline mt-1 sm:mt-0 sm:ml-2">
            Your Trusted E-commerce Partner
          </span>
        </h3>

        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-5xl sm:text-6xl shadow-inner animate-bounce">
            <GiHanger />
          </div>
        </div>

        {/* Messages */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
          Oops! We couldn't find that page
        </h1>
        <h2 className="text-lg sm:text-xl text-gray-600 font-medium">
          Don’t worry, even the best shoppers get lost sometimes.  
          Let’s get you back on track!
        </h2>

        <div className="space-y-3">
          <Link
            to="/"
            className="block w-full px-6 py-3 text-lg font-semibold text-white bg-indigo-600 rounded-full shadow-md hover:bg-indigo-700 transition-transform transform hover:scale-105"
          >
            Go Back Home
          </Link>
        </div>
      </animated.div>
    </div>
  );
};

export default Pagenotfound;
