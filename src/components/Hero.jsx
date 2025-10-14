import  { useEffect, useState, useRef } from 'react';
import { ArrowRight, ShoppingBag, TrendingUp, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Crown,  Sparkles, Star } from 'lucide-react';

 
const carouselImages = [
  { id: 1, src: "/IMG/saree.png", alt: "Cutting-edge Technology & Gadgets", headline: "Unleash Your Potential" },
  { id: 2, src: "/IMG/all.png", alt: "Modern Fashion & Apparel", headline: "Style Reimagined" },
  { id: 3, src: "/IMG/kids.png", alt: "Playful & Creative Children's Products", headline: "Adventure Awaits" },
  { id: 4, src: "/IMG/men.png", alt: "Premium Menswear & Accessories", headline: "Gentleman's Collection" },
  { id: 5, src: "/IMG/jwellary.png", alt: "Elegant & Traditional Luxury Accessories", headline: "Timeless Elegance" },
];


export default function Hero() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

    const currentHeadline = carouselImages[currentIndex].headline;

   const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
  };

   const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + carouselImages.length) % carouselImages.length);
  };

   useEffect(() => {
     if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

     intervalRef.current = setInterval(nextSlide, 4000);

     return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); 

   const handleClickShop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/allproducts");
  };

  const handleClickTrend = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/newarrivals");
  };
  const handleClickhot = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    navigate("/hotsales");
  };

  return (
    <div className="relative h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-purple-700 to-indigo-800"></div>

      <div className="relative w-full h-full">
        {carouselImages.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}

        <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-30">
          {carouselImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 shadow-lg ${
                index === currentIndex
                  ? "bg-purple-400 w-8"
                  : "bg-white/50 hover:bg-white"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-30 pt-16 pb-24 sm:pt-10 sm:pb-20 ">
        <div className="animated-glow mb-4 sm:mb-6 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600/20 to-pink-500/20 backdrop-blur-sm border border-indigo-400/30 shadow-lg shadow-indigo-500/10">
          <h2 className="text-xs sm:text-sm md:text-lg font-bold tracking-widest uppercase text-indigo-200 drop-shadow-lg flex items-center justify-center flex-wrap gap-2">
            <Zap className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 animate-pulse flex-shrink-0 text-pink-400" />
            <span className="text-center bg-gradient-to-r from-indigo-200 to-pink-300 bg-clip-text text-transparent">
              {currentHeadline}
            </span>
            <div className="w-2 h-2 rounded-full bg-pink-400 animate-ping ml-1"></div>
          </h2>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white text-center mb-4 sm:mb-8 leading-tight sm:leading-none drop-shadow-2xl animate-text-glide px-2">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-400 to-pink-300 bg-size-200 animate-text-shine">
            Discover
          </span>
          <span className="block mt-2 sm:mt-4 bg-gradient-to-r from-indigo-100 via-purple-200 to-pink-100 bg-clip-text text-transparent animate-fade-in-up whitespace-nowrap">
            Premium Collections
          </span>
        </h1>

        <div className="flex items-center gap-2 mb-4 animate-fade-in-up delay-200">
          <div className="flex items-center gap-1 bg-gradient-to-r from-indigo-500/20 to-pink-500/20 px-3 py-1 rounded-full border border-indigo-400/40 shadow-lg shadow-purple-500/10">
            <Star className="h-3 w-3 text-purple-400 fill-current" />
            <span className="text-xs font-semibold bg-gradient-to-r from-indigo-200 to-pink-200 bg-clip-text text-transparent">
              PREMIUM SELECTION
            </span>
            <Star className="h-3 w-3 text-purple-400 fill-current" />
          </div>
        </div>

        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-indigo-100/90 text-center mb-6 sm:mb-8 md:mb-12 max-w-xs sm:max-w-md md:max-w-2xl animate-fade-in-up delay-300 backdrop-blur-sm bg-gradient-to-r from-indigo-900/20 to-purple-900/20 px-6 py-3 rounded-full border border-indigo-500/30 mx-2 shadow-lg shadow-indigo-500/10">
          <span className="text-xs flex items-center justify-center gap-2 sm:text-2xl">
            <Crown className="h-3 w-3 text-purple-400 sm:h-7 sm:w-7" />
            Luxury • Quality • Fast
            <Sparkles className="h-3 w-3 text-pink-400 sm:h-7 sm:w-7" />
          </span>
        </p>

        <div className="hidden md:flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-500">
          <button
            onClick={handleClickShop}
            className="group bg-gradient-to-r from-indigo-600 to-pink-500 text-white px-10 py-5 rounded-full font-bold text-lg hover:from-indigo-500 hover:to-pink-400 transition-all duration-300 flex items-center justify-center space-x-3 shadow-2xl shadow-purple-500/25 relative overflow-hidden transform hover:scale-[1.05] active:scale-[0.98]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 animate-shine" />
            <ShoppingBag className="h-7 w-7 transition-transform group-hover:scale-110 group-hover:rotate-12" />
            <span className="relative font-extrabold">
              Shop Premium Collection
            </span>
            <ArrowRight className="h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
          </button>

          <button
            onClick={handleClickTrend}
            className="group border-2 border-indigo-300 text-indigo-100 px-10 py-5 rounded-full font-bold text-lg hover:bg-gradient-to-r hover:from-indigo-500/20 hover:to-pink-500/20 hover:text-white transition-all duration-300 flex items-center justify-center space-x-3 relative overflow-hidden transform hover:scale-[1.05] active:scale-[0.98] backdrop-blur-sm bg-indigo-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/10 via-transparent to-pink-400/10 transform -skew-x-12 animate-shine-slow" />
            <TrendingUp className="h-7 w-7 transition-transform group-hover:scale-110" />
            <span className="relative font-extrabold">Trending Now</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-pulse"></div>
          </button>
        </div>

        <div className="md:hidden flex flex-col gap-4 mt-6 w-full max-w-xs px-4 animate-fade-in-up delay-700">
          <div className="flex gap-3">
            <button
              onClick={handleClickTrend}
              className="flex-1 bg-indigo-500/20 text-indigo-100 text-xs py-3 px-3 rounded-full backdrop-blur-sm border border-indigo-400/40 hover:bg-indigo-500/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1"
            >
              <Sparkles className="h-3 w-3 text-pink-300" />
              New Arrivals
            </button>
            <button 
             onClick={handleClickhot}
            className="flex-1 bg-pink-500/20 text-pink-100 text-xs py-3 px-3 rounded-full backdrop-blur-sm border border-pink-400/40 hover:bg-pink-500/30 transition-all duration-200 active:scale-95 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3 text-purple-300" />
              Hot Deals
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-8 hidden lg:block animate-bounce-slow">
          <div className="w-4 h-4 rounded-full bg-indigo-400/40 blur-sm"></div>
        </div>
        <div className="absolute top-12 right-12 hidden lg:block animate-pulse delay-1000">
          <div className="w-6 h-6 rounded-full bg-pink-400/30 blur-sm"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 hidden xl:block animate-float">
          <div className="w-3 h-3 rounded-full bg-purple-400/20 blur-sm"></div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 hidden xl:block animate-float delay-500">
          <div className="w-2 h-2 rounded-full bg-indigo-300/30 blur-sm"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) skew(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%) skew(-12deg);
            opacity: 0;
          }
        }

        @keyframes shine-slow {
          0% {
            transform: translateX(-100%) skew(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateX(200%) skew(-12deg);
            opacity: 0;
          }
        }

        @keyframes gradient-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        @keyframes text-shine {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        @keyframes text-glide {
          0% {
            transform: translateY(30px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes glow {
          0%,
          100% {
            text-shadow: 0 0 20px rgba(255, 193, 7, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 193, 7, 0.8),
              0 0 40px rgba(255, 193, 7, 0.6);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateY(15px);
            opacity: 0;
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-shine {
          animation: shine 3s infinite;
        }

        .animate-shine-slow {
          animation: shine-slow 4s infinite;
        }

        .animate-gradient-flow {
          background-size: 200% 200%;
          animation: gradient-flow 8s ease infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-text-shine {
          background-size: 200% auto;
          animation: text-shine 4s linear infinite;
        }

        .animate-text-glide {
          animation: text-glide 1.2s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
          animation-fill-mode: both;
        }

        .delay-500 {
          animation-delay: 0.5s;
          opacity: 0;
          animation-fill-mode: both;
        }

        .animated-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 2s infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .bg-size-200 {
          background-size: 200% auto;
        }
      `}</style>
    </div>
  );
}