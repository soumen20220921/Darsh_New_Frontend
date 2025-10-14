import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Timer, ArrowRight, Crown, Zap, Sparkles, Flame } from "lucide-react";
import { useAppContext } from "../context/AppContext.jsx";

const DealOfTheDay = ({ dealOfTheDay }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isHovered, setIsHovered] = useState(false);
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 lg:py-10">
      <div className="text-center mb-1 lg:mb-6 relative">
        <div className="inline-flex items-center gap-3 mb-4 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 backdrop-blur-sm border border-indigo-400/20 px-6 py-3 rounded-2xl">
          <Crown className="h-5 w-5 text-yellow-400" />
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
            Premium Exclusive
          </span>
          <Sparkles className="h-5 w-5 text-pink-400" />
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
            Deal of the Day
          </span>
        </h2>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
        <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 to-pink-500/10 rounded-3xl blur-lg"></div>

        <div 
          className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center  rounded-3xl  p-6 sm:p-8 lg:p-12  transform transition-all  duration-500 hover:shadow-3xl "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={
                  dealOfTheDay.images?.[0]
                    ? `${url}/img/${dealOfTheDay.images[0]}`
                    : "https://placehold.co/600x400"
                }
                alt={dealOfTheDay.productName}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-300"></div>
              
             

              <div className="absolute top-6 right-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-gray-900 text-xs font-bold px-3 py-2 rounded-full shadow-lg">
                <div className="flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  <span>PREMIUM</span>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-indigo-400/20 rounded-full blur-sm animate-float"></div>
            <div className="absolute -top-4 -right-4 w-6 h-6 bg-pink-400/20 rounded-full blur-sm animate-float delay-1000"></div>
          </div>

          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                {dealOfTheDay.productName}
              </h3>
              <p className="text-gray-600 text-sm lg:text-lg leading-relaxed">
                Exclusive premium offer with limited availability. Don't miss this incredible deal!
              </p>
            </div>

            <div className="flex flex-row items-center gap-4">
              {dealOfTheDay.originalPrice && (
                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-500 font-medium">Original Price</span>
                  <div className="line-through text-gray-400 text-xl font-semibold">
                    ₹{dealOfTheDay.originalPrice}
                  </div>
                </div>
              )}
              
              <div className="text-center sm:text-left">
                <span className="text-sm text-gray-500 font-medium">Discounted Price</span>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 font-black text-3xl lg:text-4xl">
                  ₹{dealOfTheDay.price}
                </div>
              </div>

              {dealOfTheDay.discount && (
                <div className="text-center sm:text-left">
                  <span className="text-sm text-gray-500 font-medium">You Save</span>
                  <div className="text-green-600 font-bold text-xl">
                    ₹{dealOfTheDay.originalPrice - dealOfTheDay.price}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-indigo-50 to-pink-50 rounded-2xl p-6 border border-indigo-100">
              <div className="flex items-center justify-center gap-2 mb-3">
                <Timer className="h-5 w-5 text-indigo-600 animate-pulse" />
                <span className="text-sm font-semibold text-gray-700">Offer ends in:</span>
              </div>
              
              <div className="flex justify-center gap-3 lg:gap-4">
                {[
                  { value: timeLeft.hours, label: "Hours" },
                  { value: timeLeft.minutes, label: "Minutes" }, 
                  { value: timeLeft.seconds, label: "Seconds" }
                ].map((time, index) => (
                  <div key={time.label} className="text-center">
                    <div className="bg-white rounded-xl shadow-lg p-3 min-w-16">
                      <div className="font-mono font-bold text-2xl lg:text-3xl text-gray-800">
                        {String(time.value).padStart(2, "0")}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2 font-medium">
                      {time.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              to={`/productDetails/${dealOfTheDay._id}`}
              className="group inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white font-bold shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 active:scale-95 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <span className="relative whitespace-nowrap z-10 flex items-center gap-3">
                <Zap className="h-5 w-5 group-hover:scale-110 transition-transform" />
                Grab Premium Deal
                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform duration-300 animate-arrowMove" />
              </span>
            </Link>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Limited Stock</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Premium Quality</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DealOfTheDay;