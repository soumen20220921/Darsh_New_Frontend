import React from 'react';
import { Link } from 'react-router-dom';
import { Eye } from 'lucide-react';

const ProductCard = ({ product, onAddToCart, isCompactMobile }) => {
  if (!product) return null;

  const {
    id,
    name,
    image,
    price,
    oldPrice = product?.oldprice,
    isNew,
    rating,
    reviews,
  } = product;

  const discount =
    oldPrice && price < oldPrice
      ? Math.round(((oldPrice - price) / oldPrice) * 100)
      : null;

  return (
    <div
      className={`relative bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 group ${
        isCompactMobile ? "max-w-xs mx-auto" : ""
      }`}
    >
      <div className="relative overflow-hidden rounded-t-2xl">
        <Link
          to={`/productDetails/${id}`}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <img
            src={image || "https://placehold.co/300x200"}
            alt={name}
            className="w-full h-56 object-cover transition-transform duration-500 transform group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
        </Link>

        {isNew && (
          <span className="absolute top-3 left-3 bg-emerald-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg animate-pulse">
            NEW
          </span>
        )}

        {discount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg animate-bounce">
            -{discount}%
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link
          to={`/productDetails/${id}`}
          onClick={() =>
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
          }
        >
          <h3 className="text-sm md:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-300 truncate">
            {name}
          </h3>
        </Link>

        <div className="flex items-center text-yellow-400 text-sm">
          {rating
            ? "★".repeat(Math.floor(rating)) +
              "☆".repeat(5 - Math.floor(rating))
            : "☆☆☆☆☆"}
          {reviews && (
            <span className="text-gray-500 text-xs ml-2">({reviews})</span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-lg md:text-xl font-bold text-gray-900">
              ₹{price}
            </span>
            {oldPrice && (
              <span className="text-sm text-gray-400 line-through">
                ₹{oldPrice}
              </span>
            )}
          </div>
        </div>

       {/* Button */}
        {onAddToCart && (
          <Link
            to={`/productDetails/${id}`}
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg 
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-medium 
              shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 relative
              before:absolute before:inset-0 before:rounded-lg before:bg-white/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity"
          >
            <Eye className="hidden sm:inline animate-pulse" />
            <span>View</span>
          </Link>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-0 group-hover:opacity-25 rounded-2xl transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;
