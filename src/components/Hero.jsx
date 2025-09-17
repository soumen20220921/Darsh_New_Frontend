import React, { useEffect, useState, useRef } from 'react';
import { ArrowRight, ShoppingBag, Star, TrendingUp, Zap, Shield, Truck, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


export default function Hero() {
 
  const navigate = useNavigate();

const handleClickShop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/allproducts");
  };

  const handleClickTrend = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/hotsales");
  };

  return (
    <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 gap-4 h-full">
            {[...Array(32)].map((_, i) => (
              <div key={i} className="bg-white rounded-full animate-pulse" style={{
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}></div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="text-white">
            <div className={`flex  items-center mb-4 transition-all duration-700 `}>
              <div className="flex items-center  bg-blue-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-300/30">
                <Star className="h-5 w-5 text-yellow-400 fill-current mr-2 animate-pulse" />
                <span className="text-yellow-300 font-medium">Premium Quality Products</span>
              </div>
            </div>
            
           <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight transition-all duration-700 delay-100`}>
              Discover
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-400 animate-gradient">
                Amazing Deals
              </span>
            </h1>
            
          <p className="text-blue-100 max-w-3xl mx-auto mb-16 text-sm sm:text-xl font-body animate-fade-in delay-200">
              Shop the latest trends with unbeatable prices. From electronics to fashion, 
              find everything you need with fast shipping and excellent customer service.
            </p>
             <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8 transition-all duration-700 delay-300 `}>
              <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="bg-blue-500/20 p-1.5 rounded-full mt-0.5">
                  <Truck className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Free Shipping</div>
                  <div className="text-blue-200 text-xs">On orders over ₹15000</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="bg-blue-500/20 p-1.5 rounded-full mt-0.5">
                  <Shield className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Secure Payment</div>
                  <div className="text-blue-200 text-xs">256-bit encryption</div>
                </div>
              </div>
              <div className="flex items-start space-x-2 p-3 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <div className="bg-blue-500/20 p-1.5 rounded-full mt-0.5">
                  <Zap className="h-4 w-4 text-blue-300" />
                </div>
                <div>
                  <div className="text-white font-medium text-sm">Fast Delivery</div>
                  <div className="text-blue-200 text-xs">Within & days</div>
                </div>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-700 delay-400 `}>
              <button
                onClick={handleClickShop}
                className="group bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
                <ShoppingBag className="h-5 w-5" />
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={handleClickTrend}
                className="group border-2 border-white text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
                <TrendingUp className="h-5 w-5" />
                <span>Trending Now</span>
              </button>
            </div>

            {/* Stats Section with Counting Animation */}
            <div  className={`grid grid-cols-3 gap-4 transition-all duration-700 delay-500`}>
              <div className="text-center bg-blue-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-300/30">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">1000+</div>
                <div className="text-blue-200 text-xs sm:text-sm">Happy Customers</div>
              </div>
              <div className="text-center bg-blue-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-300/30">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">300+</div>
                <div className="text-blue-200 text-xs sm:text-sm">Products</div>
              </div>
              <div className="text-center bg-blue-500/20 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-300/30">
                <div className="text-xl sm:text-2xl font-bold text-white mb-1">4.6★</div>
                <div className="text-blue-200 text-xs sm:text-sm">Rating</div>
              </div>
            </div>
          </div>

          {/* Image Content */}
          <div className={`hidden md:flex relative transition-all duration-700 delay-300 `}>
            <div className="relative mx-auto">
              {/* Main Product Showcase */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-2 transform rotate-2 hover:rotate-0 transition-all duration-500 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
                <img
                  src="/IMG/hero.png"
                  alt="Featured Product"
                  className="w-full object-cover rounded-lg relative z-10"
                />
              </div>
              {/* <div className="bg-white rounded-2xl shadow-2xl p-2 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src="/IMG/hero.png"
                  alt="Featured Product"
                  className="w-full object-cover rounded-lg mb-4" //h-64
                />
              <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-2 transform rotate-2 hover:rotate-0 transition-all duration-500 border border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shine" />
                <div className="w-full h-64 lg:h-80 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center relative z-10">
                  <div className="text-white text-center p-4">
                    <div className="text-2xl font-bold mb-2">Featured Product</div>
                    <div className="text-lg">Premium Wireless Headphones</div>
                    <div className="flex justify-center mt-3">
                      <div className="bg-yellow-400 text-blue-900 px-3 py-1 rounded-full text-sm font-bold flex items-center">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span>Bestseller</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}

              {/* Floating Badges */}
              {/* <div className="absolute -top-4 -left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold animate-bounce shadow-lg z-20">
                <div className="flex items-center">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-current" />
                  <span>Hot Sale!</span>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold animate-float shadow-lg z-20">
                <div className="flex items-center">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 mr-1 fill-current" />
                  <span>Limited Time!</span>
                </div>
              </div> */}

              {/* Additional floating elements */}
              {/* <div className="absolute top-8 -right-6 bg-orange-500 text-white px-3 py-1 rounded-lg text-xs font-semibold animate-float shadow-lg z-20" style={{animationDelay: '1.5s'}}>
                <div className="flex items-center">
                  <Check className="h-3 w-3 mr-1" />
                  <span>50% OFF</span>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
       <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skew(-12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skew(-12deg); opacity: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shine {
          animation: shine 3s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-shimmer {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
      `}</style>
    </div>
  );
}