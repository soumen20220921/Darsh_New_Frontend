import React, { useState, useEffect } from "react";

import {
  Sparkles,
  ArrowUpRight,
  Calendar,
  Clock,
  Star,
  Users,
  Shield,
  Heart,
  MessageCircle,
  CheckCircle,
  Award,
  Clock4,
  Stethoscope,
  Sparkle,
  Telescope,
  Star as StarIcon,
  Search,
  X
} from "lucide-react";
const cn = (...classes) => classes.filter(Boolean).join(" ");

const AnimatedSparkles = ({ className = "" }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Sparkles
      className={cn(
        "transition-all duration-500",
        isAnimating && "scale-110 rotate-180 text-yellow-400",
        className
      )}
    />
  );
};

const FloatingAnimation = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay * 100);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={cn(
        "transition-all duration-700 transform",
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-95"
      )}
    >
      {children}
    </div>
  );
};

const PulseBackground = () => (
  <div className="absolute inset-0 overflow-hidden rounded-2xl">
    <div className="absolute -inset-10 opacity-30">
      <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full blur-xl animate-pulse-slow delay-1000" />
      <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-lg animate-pulse-slow delay-500" />
    </div>
  </div>
);

const MobileMenu = ({ isOpen, onClose, categories, activeFilter, setActiveFilter }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl border-l border-gray-200/60 transform transition-transform duration-300">
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
              Filter Services
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <X className="h-5 w-5 text-gray-600" />
            </button>
          </div>
          
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveFilter(category.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300",
                  activeFilter === category.id
                    ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                    : "bg-gray-50/80 text-gray-700 hover:bg-gray-100/80"
                )}
              >
                <div className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeFilter === category.id ? "bg-white/20" : "bg-white"
                )}>
                  {React.cloneElement(category.icon, {
                    className: "h-4 w-4",
                  })}
                </div>
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({
  title,
  description,
  icon,
  price,
  rating,
  delay = 0,
  features = [],
  category,
  onServiceClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  const handleBookNow = (e) => {
    e.stopPropagation();
    if (onServiceClick) {
      onServiceClick({ title, category, description, price, features });
    }
  };

  const handleCardClick = () => {
    if (onServiceClick) {
      onServiceClick({ title, category, description, price, features });
    }
  };

  return (
    <FloatingAnimation delay={delay}>
      <div
        className={cn(
          "group relative bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/60 p-4 sm:p-6 cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl",
          "animate-fade-in overflow-hidden h-full flex flex-col"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
      >
        <PulseBackground />

        <div
          className={cn(
            "absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 opacity-0 transition-all duration-700",
            isHovered && "opacity-100"
          )}
        />

        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={cn(
                "absolute w-1.5 h-1.5 bg-gradient-to-r from-indigo-400 to-pink-400 rounded-full transition-all duration-1000",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              style={{
                top: `${20 + i * 20}%`,
                left: `${10 + i * 25}%`,
                animationDelay: `${i * 200}ms`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col flex-grow">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div
                className={cn(
                  "p-2 sm:p-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg transition-all duration-500 group-hover:shadow-2xl",
                  isHovered && "scale-110 rotate-6 shadow-xl"
                )}
              >
                {React.cloneElement(icon, {
                  className: cn(
                    "h-4 w-4 sm:h-6 sm:w-6 transition-transform duration-300",
                    isHovered && "scale-110"
                  ),
                })}
              </div>
            </div>

            <div className="flex gap-1 sm:gap-2">
              {/* Rating */}
              <div className="flex items-center gap-1 bg-gradient-to-r from-amber-100 to-amber-50 px-2 py-1 rounded-full border border-amber-200">
                <Star
                  className={cn(
                    "h-3 w-3 transition-all duration-300",
                    isHovered && "scale-110 fill-amber-400 text-amber-400 animate-pulse"
                  )}
                />
                <span className="text-xs font-semibold text-amber-700">
                  {rating}
                </span>
              </div>

              {/* Like Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLiked(!isLiked);
                }}
                className={cn(
                  "p-1.5 sm:p-2 rounded-full transition-all duration-300 transform",
                  isLiked
                    ? "scale-110 bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-400 hover:bg-red-50 hover:text-red-400"
                )}
              >
                <Heart
                  className={cn(
                    "h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300",
                    isLiked && "scale-110 fill-current"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Content Section */}
          <div className="mb-3 sm:mb-4 flex-grow">
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300 leading-tight">
              {title}
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-3">
              {description}
            </p>

            {/* Features List */}
            {features.length > 0 && (
              <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                {features.slice(0, 3).map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-xs text-gray-500"
                  >
                    <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-baseline gap-1">
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                <Clock4 className="h-3 w-3" />
                <span>30 min</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
             

              <button
                onClick={handleBookNow}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white text-xs sm:text-sm font-semibold transition-all duration-300 transform group-hover:shadow-lg",
                  isHovered ? "scale-105" : "scale-100"
                )}
              >
                <span className="hidden sm:inline">Book Now</span>
                <span className="inline sm:hidden">Book</span>
                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left rounded-b-2xl" />
      </div>
    </FloatingAnimation>
  );
};

const SearchFilterBar = ({ searchQuery, setSearchQuery, activeFilter, setActiveFilter, categories, onMobileMenuOpen }) => {
  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
        {/* Search Bar */}
        <div className="hidden md:block relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all duration-300"
            />
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1.5 border border-gray-200/60">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveFilter(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                activeFilter === category.id
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100/80"
              )}
            >
              {React.cloneElement(category.icon, {
                className: "h-4 w-4",
              })}
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Mobile Filter Button */}
        {/* <button
          onClick={onMobileMenuOpen}
          className="lg:hidden flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-200/60 rounded-xl text-gray-600 hover:text-gray-800 transition-all duration-300"
        >
          <Filter className="h-4 w-4" />
          <span className="font-medium">Filter</span>
        </button> */}
      </div>
    </div>
  );
};

const ServiceBookingPage = ({ onServiceClick }) => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const services = [
    {
      title: "Doctor Appointment",
      description: "Book consultations with certified healthcare professionals for comprehensive medical care and health advice.",
      icon: <Stethoscope />,
      price: 99,
      rating: "4.9",
      category: "healthcare",
      features: ["Certified Doctors", "Online Consultation", "Prescription Services", "Health Records"],
    },
    // {
    //   title: "Beauty & Wellness",
    //   description: "Premium beauty treatments, spa services, and wellness therapies for complete relaxation and rejuvenation.",
    //   icon: <Sparkle />,
    //   price: 65,
    //   rating: "4.9",
    //   category: "beauty",
    //   features: ["Expert Therapists", "Premium Products", "Custom Packages", "Relaxing Environment"],
    // },
    // {
    //   title: "Astrologer Consultation",
    //   description: "Get personalized astrological guidance and predictions from experienced astrologers for life decisions and future planning.",
    //   icon: <Telescope />,
    //   price: 49,
    //   rating: "4.8",
    //   category: "astrology",
    //   features: ["Experienced Astrologers", "Birth Chart Analysis", "Personalized Predictions", "Remedial Solutions"],
    // },
  ];

  const categories = [
    { id: "all", name: "All Services", icon: <Sparkles className="h-4 w-4" /> },
    { id: "healthcare", name: "Healthcare", icon: <Stethoscope className="h-4 w-4" /> },
    { id: "beauty", name: "Beauty", icon: <Sparkle className="h-4 w-4" /> },
    { id: "astrology", name: "Astrology", icon: <Telescope className="h-4 w-4" /> },
  ];

  const filteredServices = services.filter(
    (service) =>
      (activeFilter === "all" || service.category === activeFilter) &&
      service.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 animate-float-slow" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-20 animate-float-slow delay-1000" />
        <div className="absolute top-1/2 left-1/3 w-60 h-60 bg-gradient-to-r from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20 animate-float-slow delay-500" />
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <section className="pt-6 sm:pt-8 pb-3 sm:pb-5">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              {/* Animated Badge */}
              <FloatingAnimation delay={1}>
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r from-indigo-100 to-pink-100 text-indigo-700 text-xs sm:text-sm font-medium mb-4 sm:mb-6 border border-indigo-200/50 shadow-sm">
                  <AnimatedSparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  Premium Services Available
                </div>
              </FloatingAnimation>

              {/* Main Heading */}
              <FloatingAnimation delay={2}>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 sm:mb-4 text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text leading-tight">
                  Discover Amazing
                  <span className="block bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                    Services
                  </span>
                </h1>
              </FloatingAnimation>

              <FloatingAnimation delay={3}>
                <p className="text-gray-600 text-xs sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-2 sm:mb-4 px-4">
                  Choose from our wide range of professional services designed to meet your every need with excellence and care
                </p>
              </FloatingAnimation>
            </div>
          </div>
        </section>

        {/* Search and Filter Section */}
        <SearchFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          categories={categories}
          onMobileMenuOpen={() => setMobileMenuOpen(true)}
        />

        {/* Services Grid */}
        <section className="py-4 sm:py-8">
          <div className="container mx-auto px-4">
            {filteredServices.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-gray-200/60">
                  <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No services found</h3>
                  <p className="text-gray-600 text-sm">
                    Try adjusting your search or filter criteria to find what you're looking for.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {filteredServices.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    icon={service.icon}
                    price={service.price}
                    rating={service.rating}
                    delay={index}
                    features={service.features}
                    category={service.category}
                    onServiceClick={onServiceClick}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {[
                {
                  icon: <Users className="h-6 w-6 sm:h-8 sm:w-8" />,
                  value: "10K+",
                  label: "Happy Customers",
                },
                {
                  icon: <Award className="h-6 w-6 sm:h-8 sm:w-8" />,
                  value: "4.9/5",
                  label: "Average Rating",
                },
                {
                  icon: <Clock className="h-6 w-6 sm:h-8 sm:w-8" />,
                  value: "24/7",
                  label: "Support Available",
                },
                {
                  icon: <Shield className="h-6 w-6 sm:h-8 sm:w-8" />,
                  value: "100%",
                  label: "Satisfaction Guarantee",
                },
              ].map((stat, index) => (
                <FloatingAnimation key={index} delay={index + 1}>
                  <div className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white mb-3 sm:mb-4 shadow-lg">
                      {stat.icon}
                    </div>
                    <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
                      {stat.value}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
                  </div>
                </FloatingAnimation>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <FloatingAnimation delay={1}>
              <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 text-center text-white shadow-2xl overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
                    Ready to Get Started?
                  </h3>
                  <p className="text-indigo-100 text-sm sm:text-base mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
                    Join thousands of satisfied customers who trust us with their service needs. Experience the difference today!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white text-indigo-600 font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
                      Book Your Service
                    </button>
                    <button className="flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white/10 transition-all duration-300 text-sm sm:text-base">
                      <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                      Contact Support
                    </button>
                  </div>
                </div>
              </div>
            </FloatingAnimation>
          </div>
        </section>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />
    </div>
  );
};

const styles = `
@keyframes float-slow {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
}

@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-float-slow {
  animation: float-slow 8s ease-in-out infinite;
}

.animate-pulse-slow {
  animation: pulse-slow 3s ease-in-out infinite;
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #6366f1, #ec4899);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #4f46e5, #db2777);
}
`;

if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default ServiceBookingPage;