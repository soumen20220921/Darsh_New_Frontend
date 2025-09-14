import React, { useMemo } from "react";
import { Flame, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import DealOfTheDay from "./DealOfTheDay.jsx"; 

const HotSalesPage = () => {
  const { allProduct,url  } = useAppContext();

  // Filter products where hotSell is explicitly true
  const hotSales = allProduct?.filter((product) => product.hotSell) || [];

  // Find the product with the best discount for Deal of the Day
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
      {/* Header */}
      <section className="relative text-center py-12 sm:py-16 bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl whitespace-nowrap sm:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3 animate-fade-in-up">
            <Flame size={40} className="text-red-500 animate-fade-in " />
            Today’s Hot Picks
          </h1>
          <p className="text-gray-600 text-sm mt-3 sm:mt-4 sm:text-lg animate-fade-in delay-200">
            Don’t miss out on these limited-time deals — grab them before they’re gone!
          </p>
        </div>
      </section>

      {/* Deal of the Day */}
      {dealOfTheDay && <DealOfTheDay dealOfTheDay={dealOfTheDay} />}

      {/* More Hot Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          More Hot Deals
        </h2>

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
