import React, { useMemo } from "react";
import { Flame, Timer, Zap} from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import DealOfTheDay from "./DealOfTheDay.jsx"; 

const HotSalesPage = () => {
  const { allProduct,url  } = useAppContext();

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
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-pink-50 font-inter">
      <section className="relative text-center py-8 sm:py-11 lg:py-14 bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100 shadow-xl overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 10}s`,
              }}
            >
              <div
                className={`rounded-full opacity-30`}
                style={{
                  width: `${6 + Math.random() * 8}px`,
                  height: `${6 + Math.random() * 8}px`,
                  backgroundColor: ["#ef4444", "#f97316", "#f59e0b"][
                    Math.floor(Math.random() * 3)
                  ],
                }}
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/30 pointer-events-none"></div>

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <div className="relative">
              <Flame size={56} className="text-red-500 animate-pulse" />
              <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-70"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 animate-fade-in-up bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              Today's Hot Picks
            </h1>
          </div>

          <p className="text-gray-700 text-sm sm:text-mb lg:text-lg mt-2 sm:mt-4 max-w-3xl mx-auto animate-fade-in delay-200 font-medium px-2">
            Don't miss out on these limited-time deals — grab them before
            they're gone!
          </p>

          <div className="mt-6 flex items-center justify-center text-red-600 font-semibold animate-bounce text-sm sm:text-base">
            <Timer className="mr-2" size={18} />
            <span>Limited Time Offers</span>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full flex justify-between px-10 opacity-70">
          <Zap size={32} className="text-yellow-500 animate-pulse delay-300" />
          <Zap size={32} className="text-red-500 animate-pulse delay-500" />
          <Zap size={32} className="text-orange-500 animate-pulse delay-700" />
        </div>
      </section>

      {dealOfTheDay && <DealOfTheDay dealOfTheDay={dealOfTheDay} />}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4 relative inline-block">
            More Hot Deals
            <div className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover more amazing deals that are flying off the shelves
          </p>
        </div>

        {hotSales.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Slice the array to show a few more hot deals, excluding Deal of the Day */}
            {hotSales
              .filter((p) => p._id !== dealOfTheDay?._id)
              .slice(0, 8)
              .map((product) => (
                <div
                  key={product._id}
                  className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl bg-white transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 border border-pink-200"
                >
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
                  <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full animate-pulse">
                    Hot
                  </span>
                </div>
              ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Flame className="mx-auto h-16 w-16 text-gray-400 mb-4 animate-fade-in" />
            <p className="text-lg font-medium text-gray-600">
              No hot deals are currently available. Check back soon!
            </p>
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="mt-10 sm:mt-16 py-12 sm:py-16 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-3xl shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white animate-fade-in-up">
            Hurry, Hot Deals Won’t Last Long!
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base animate-fade-in delay-200">
            Check out the full Hot Sales collection and grab your favorites now.
          </p>
          <Link
            to="/allproducts"
            className="px-6 sm:px-8 py-2 sm:py-3 rounded-full bg-white text-red-600 font-semibold shadow-lg hover:bg-gray-100 hover:shadow-2xl transition-all duration-300 animate-bounce inline-block"
          >
            Shop All Deals
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HotSalesPage;
