import React, { useMemo } from "react";
import { Flame, Timer, Zap, Rocket, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import DealOfTheDay from "./DealOfTheDay.jsx";
import { ArrowRight, Shield, Truck, Award } from "lucide-react";

const HotSalesPage = () => {
  const { allProduct, url } = useAppContext();

  const hotSales = allProduct?.filter((product) => product.hotSell) || [];

  const dealOfTheDay = useMemo(() => {
    if (!hotSales.length) return null;
    return hotSales.reduce((best, product) => {
      if (product.originalPrice && product.price) {
        const discount = Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) * 100
        );
        if (!best.discount || discount > best.discount) {
          return { ...product, discount };
        }
      }
      return best;
    }, {});
  }, [hotSales]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 font-inter">
      <section className="relative text-center py-7 sm:py-8 lg:py-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          {/* Floating Geometric Shapes */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${8 + Math.random() * 12}s`,
              }}
            >
              <div
                className={`opacity-20 ${
                  i % 3 === 0 ? "rounded-lg" : i % 3 === 1 ? "rounded-full" : "rotate-45"
                }`}
                style={{
                  width: `${8 + Math.random() * 12}px`,
                  height: `${8 + Math.random() * 12}px`,
                  backgroundColor: ["#ffffff", "#c7d2fe", "#f0abfc"][
                    Math.floor(Math.random() * 3)
                  ],
                }}
              />
            </div>
          ))}
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 via-transparent to-pink-600/20"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10">
         

          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 mb-8">
            <div className="hidden sm:block relative group mb-8">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-lg group-hover:blur-xl transition-all duration-500"></div>
              <Flame size={64} className="text-white relative z-10 animate-pulse group-hover:scale-110 transition-transform duration-300" />
            </div>
            
            <div className="text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
                
                <span className="block whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200 mt-2">
                  Premium Hot Deals
                </span>
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 text-white/90 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-300 fill-current" />
                  <span className="text-sm font-medium">Exclusive Offers</span>
                </div>
                <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                <div className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-300" />
                  <span className="text-sm font-medium">Flash Sale</span>
                </div>
              </div>
            </div>
          </div>

          
        </div>

        <div className="absolute bottom-3/ left-1/2 -translate-x-1/2 flex gap-8 opacity-60">
          <Sparkles size={24} className="text-indigo-200 animate-pulse delay-100" />
          <Sparkles size={24} className="text-purple-200 animate-pulse delay-300" />
          <Sparkles size={24} className="text-pink-200 animate-pulse delay-500" />
        </div>
      </section>

      {dealOfTheDay && <DealOfTheDay dealOfTheDay={dealOfTheDay} />}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-indigo-500"></div>
            <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
              Premium Collection
            </span>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-pink-500"></div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500">
              More Exclusive Deals
            </span>
          </h2>
          
          <p className="text-gray-600 text-xs sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Handpicked premium products with exceptional discounts. 
            Each item carefully selected for quality and value.
          </p>
        </div>

        {hotSales.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {hotSales
              .filter((p) => p._id !== dealOfTheDay?._id)
              .map((product, index) => (
                <div
                  key={product._id}
                  className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden transform hover:-translate-y-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute top-4 right-4 z-20">
                    <div className="relative">
                      <div className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                        <div className="flex items-center gap-1">
                          <Flame className="h-3 w-3" />
                          <span>HOT</span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-sm opacity-50 animate-ping"></div>
                    </div>
                  </div>

                  <ProductCard
                    product={{
                      id: product._id,
                      name: product.productName,
                      image: product.images?.[0]
                        ? `${url}/img/${product.images[0]}`
                        : "",
                      price: product.price,
                      oldprice: product.originalPrice,
                    }}
                    onToggleWishlist={() => {}}
                    onAddToCart={() => {}}
                    isCompactMobile={true}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-16 lg:py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-pink-100 rounded-3xl flex items-center justify-center">
              <Flame className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Hot Deals Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We're preparing some amazing deals for you. Check back soon for exclusive offers!
            </p>
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 lg:mb-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
          </div>
          
          <div className="relative z-10 text-center py-16 lg:py-20 px-6">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Don't Miss Out On Premium Deals!
            </h2>
            <p className="text-white/80 text-xs sm:text-lg mb-8 max-w-2xl mx-auto">
              Explore our complete collection of premium products with exclusive discounts and fast delivery.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/allproducts"
                className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
              >
                <span>Explore All Products</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/"
                className="group border-2 border-white text-white px-8 py-4 rounded-2xl font-bold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
              >
                <span>Browse Categories</span>
                <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 mt-8 text-white/70 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4" />
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HotSalesPage;