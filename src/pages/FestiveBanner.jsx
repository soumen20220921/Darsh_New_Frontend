import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const FestiveBanner = () => {
  // 🎯 Start countdown from 2 days from now
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 2);

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: "00", hours: "00", minutes: "00", seconds: "00" };
    }

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  // ⏱ update every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const countdownItems = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <section className="py-16 sm:py-20 my-8 sm:my-12 bg-gradient-to-r from-red-500 to-pink-600 rounded-3xl overflow-hidden relative shadow-xl">
      <div className="absolute inset-0 bg-pattern opacity-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-white"
        >
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6 font-serif leading-tight">
            Festive Special Collection
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-lg lg:text-xl max-w-2xl sm:max-w-3xl mx-auto mb-6 sm:mb-8 opacity-90 px-2">
            Celebrate the season with our exclusive festive collection.  
            Enjoy special discounts on traditional wear, jewelry, and more.
          </p>

          {/* Countdown Timer */}
          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 mb-8 sm:mb-10">
            {countdownItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.4 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 sm:py-3 min-w-[60px] sm:min-w-[90px]"
              >
                <div className="text-sm sm:text-2xl lg:text-3xl font-bold">
                  {item.value}
                </div>
                <div className="text-xs sm:text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Button */}
          <Link
            to="/hotsales"
            className="inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-bold text-red-600 bg-white hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
          >
            Explore Collection
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FestiveBanner;
