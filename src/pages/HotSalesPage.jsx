import React from "react";
import { useAppContext } from "../context/AppContext.jsx";
import ProductCard from "../components/ProductCard";
import { Flame, Timer } from "lucide-react";
import { Link } from "react-router-dom";

const HotSalesPage = () => {
  const { allProduct,url } = useAppContext();
  const hotSales = allProduct || [];

  const dealOfTheDay = hotSales[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 via-white to-pink-50 font-inter">
      <section className="relative text-center py-12 sm:py-16 bg-gradient-to-r from-pink-100 via-red-100 to-yellow-100 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-2xl whitespace-nowrap sm:text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3 animate-fade-in-up">
            <Flame size={42} className="text-red-500 animate-bounce" />
            Today’s Hot Picks
          </h1>
          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg animate-fade-in delay-200">
            Don’t miss out on these limited-time deals — grab them before
            they’re gone!
          </p>
        </div>
      </section>

      {dealOfTheDay && (
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <Timer className="text-yellow-500 animate-pulse" /> Deal of the Day
          </h2>

          {/* Calculate Discount */}
          {(() => {
            const discount =
              dealOfTheDay.originalPrice && dealOfTheDay.price
                ? Math.round(
                    ((dealOfTheDay.originalPrice - dealOfTheDay.price) /
                      dealOfTheDay.originalPrice) *
                      100
                  )
                : null;

            return (
              <div className="grid md:grid-cols-2 gap-6 sm:gap-8 items-center bg-white rounded-2xl shadow-2xl p-4 sm:p-6 animate-slide-in relative">
                {/* Image with Discount Badge */}
                <div className="relative">
                  <img
                    src={
                      dealOfTheDay.images?.[0]
                        ? `${url}/img/${dealOfTheDay.images[0]}`
                        : "https://placehold.co/500x300"
                    }
                    alt={dealOfTheDay.productName}
                    className="w-full h-56 sm:h-72 object-cover rounded-xl shadow-md transition-transform duration-500 hover:scale-105"
                  />

                  {discount && (
                    <span className="absolute top-3 left-3 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-lg animate-bounce">
                      🔥 {discount}% OFF
                    </span>
                  )}
                </div>

                {/* Product Info */}
                <div className="text-center md:text-left space-y-3 sm:space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {dealOfTheDay.productName}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    Exclusive today-only offer. Limited stock available!
                  </p>
                  <div className="flex items-center justify-center md:justify-start gap-3">
                    {dealOfTheDay.originalPrice && (
                      <span className="line-through text-gray-400 text-sm sm:text-lg">
                        ₹{dealOfTheDay.originalPrice}
                      </span>
                    )}
                    <span className="text-red-600 font-extrabold text-xl sm:text-2xl">
                      ₹{dealOfTheDay.price}
                    </span>
                  </div>
                  <Link
                    to={`/productDetails/${dealOfTheDay._id}`}
                    className="inline-block mt-3 px-5 sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 text-white font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-bounce"
                  >
                    Grab Deal
                  </Link>
                </div>
              </div>
            );
          })()}
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
          More Hot Deals
        </h2>

        {hotSales.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {hotSales.slice(0, 8).map((product) => (
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
                  isCompactMobile={true}
                />

                <span className="absolute top-2 right-2 bg-pink-600 text-white text-xs sm:text-sm px-2 py-1 rounded-full animate-pulse">
                  Hot
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center animate-fade-in">
            No hot deals are currently available.
          </p>
        )}
      </section>

      <section className="mt-10 sm:mt-16 py-12 sm:py-16 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 rounded-3xl shadow-xl text-center relative overflow-hidden">
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-4xl font-extrabold mb-4 text-white animate-fade-in-up">
            Hurry, Hot Deals Won’t Last Long!
          </h2>
          <p className="text-white/90 mb-6 sm:mb-8 text-sm sm:text-base animate-fade-in delay-200">
            Check out the full Hot Sales collection and grab your favorites now.
          </p>
          <Link
            to="/all-products"
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
