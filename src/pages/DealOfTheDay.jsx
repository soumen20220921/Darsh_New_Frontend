import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timer, ArrowRight } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

const DealOfTheDay = ({ dealOfTheDay }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
    const { url } = useAppContext();

  useEffect(() => {
    if (!dealOfTheDay) return;

    const endTime = new Date();
    endTime.setHours(endTime.getHours() + 24);

    const interval = setInterval(() => {
      const now = new Date();
      const difference = endTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [dealOfTheDay]);

  if (!dealOfTheDay) return null;

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Heading */}
      <h2 className="text-xl sm:text-3xl font-extrabold text-gray-900 mb-8 text-center flex items-center justify-center gap-3">
        <Timer className="text-red-500 animate-pulse" />
        Deal of the Day
      </h2>

      {/* Card */}
      <div className="grid md:grid-cols-2 gap-6 sm:gap-10 items-center bg-white rounded-3xl shadow-2xl p-5 sm:p-8 relative overflow-hidden animate-fade-in">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden shadow-lg group">
          <img
            src={
              dealOfTheDay.images?.[0]
                ? `${url}/img/${dealOfTheDay.images[0]}`
                : "https://placehold.co/500x300"
            }
            alt={dealOfTheDay.productName}
            className="w-full h-56 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

          {/* Discount badge */}
          {dealOfTheDay.discount && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs sm:text-sm font-bold px-3 py-1 sm:px-4 sm:py-2 rounded-full shadow-xl animate-pulse ">
              🔥 {dealOfTheDay.discount}% OFF
            </span>
          )}
        </div>

        {/* Info */}
        <div className="text-center md:text-left space-y-4">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {dealOfTheDay.productName}
          </h3>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Exclusive today-only offer. Limited stock available!
          </p>

          {/* Price */}
          <div className="flex items-center justify-center md:justify-start gap-3">
            {dealOfTheDay.originalPrice && (
              <span className="line-through text-gray-400 text-base sm:text-lg">
                ₹{dealOfTheDay.originalPrice}
              </span>
            )}
            <span className="text-red-600 font-extrabold text-2xl sm:text-3xl">
              ₹{dealOfTheDay.price}
            </span>
          </div>

          {/* Countdown */}
           <div className="flex justify-center lg:justify-start items-center gap-2 sm:gap-3 text-sm sm:text-base bg-gray-100 px-3 py-2 rounded-lg font-mono text-gray-800 shadow-inner">
            <span className="font-bold">{String(timeLeft.hours).padStart(2, "0")}h</span> :
            <span className="font-bold">{String(timeLeft.minutes).padStart(2, "0")}m</span> :
            <span className="font-bold">{String(timeLeft.seconds).padStart(2, "0")}s</span>
          </div>

          {/* Button */}
         <Link
  to={`/productDetails/${dealOfTheDay._id}`}
  className="group inline-flex animate-arrowMove items-center mt-4 px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 relative overflow-hidden"
>
  <span className="relative z-10">Grab Deal</span>
  <ArrowRight
    className="h-5 w-5 ml-2 relative z-10 animate-arrowMove transform transition-transform duration-300 group-hover:translate-x-2"
  />
  <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
</Link>

        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;
