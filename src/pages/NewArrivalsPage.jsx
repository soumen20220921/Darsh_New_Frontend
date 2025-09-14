import React from "react";
import { Link } from "react-router-dom";
import { Sparkles, Gift, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";
import { Eye } from "lucide-react";

const NewArrivalsPage = () => {
  const { allProduct,  addToCart,url  } = useAppContext();

  const sortedProducts = allProduct
    ? [...allProduct].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  const newArrivalsProducts = sortedProducts.slice(0, 10);

  const hasMoreProducts = sortedProducts.length > 10;

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-yellow-50 font-inter py-16 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-56 h-56 bg-yellow-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h1 className="text-2xl whitespace-nowrap sm:text-4xl font-extrabold text-gray-900 mb-6 text-center flex items-center justify-center gap-3 animate-fade-in-down">
          <Sparkles className="text-pink-500 animate-spin-slow" />
          All New Arrivals
          <Sparkles className="text-yellow-500 animate-spin-slow" />
        </h1>
        <p className="text-gray-600 text-center mb-12 text-md animate-fade-in delay-150">
          Discover our newest products, <span className="font-semibold">fresh off the shelf</span>.
        </p>

        {newArrivalsProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {newArrivalsProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative animate-fade-in-up flex flex-col"
                >
                  <div className="relative w-full">
                    <span className="absolute top-3 left-3 z-10 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md animate-pulse">
                      ✨ New
                    </span>

                    <Link
                      to={`/productDetails/${product._id}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      }
                      className="block overflow-hidden"
                    >
                      <img
                        src={
                          product.images?.[0]
                            ? `${url}/img/${product.images[0]}`
                            : "https://placehold.co/400x400"
                        }
                        alt={product.productName}
                        className="w-full h-48 sm:h-56 object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-all duration-700 ease-in-out"
                      />
                    </Link>
                  </div>

                  <div className="p-4 text-center flex flex-col flex-grow">
                    <Link
                      to={`/productDetails/${product._id}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      }
                    >
                      <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors truncate">
                        {product.productName}
                      </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">Special Arrival</p>
                    <p className="text-xl font-bold text-red-600 mt-2">
                      ₹{product.price}
                    </p>
                    <Link
                      to={`/productDetails/${product._id}`}
                      onClick={() =>  
                        window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
                      }
                      className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white rounded-full font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                    >
                      <Eye className=" hidden md:inline animate-pulse" />
                      <span className="animate-pulse">View</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* "View All Products" button */}
            {hasMoreProducts && (
              <div className="text-center mt-12">
                <Link
                  to="/allproducts"
                  className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-full font-semibold shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors duration-300"
                >
                  View All Products
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 text-center animate-fade-in">
            No new products have been added yet.
          </p>
        )}

        <div className="mt-20 bg-gradient-to-r from-pink-100 via-yellow-100 to-red-100 rounded-3xl shadow-xl p-8 sm:p-12 text-center animate-slide-in">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
            <Gift className="text-red-500 animate-bounce" /> Exclusive Launch
          </h2>
          <p className="text-gray-700 mt-3 text-lg">
            Be the first to grab these premium hand-picked collections.
          </p>
          <Link
            to="/hotsales"
            className="inline-block mt-6 px-8 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all duration-300 animate-pulse"
          >
            Explore Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;