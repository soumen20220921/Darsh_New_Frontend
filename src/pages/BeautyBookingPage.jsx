import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Clock, 
  MapPin, 
  Star, 
  CheckCircle,
  Shield,
  Calendar,
  User,
  Heart,
  Award,
  Clock4,
  ArrowLeft,
  Phone,
  MessageCircle,
  Calendar as CalendarIcon,
  MapPin as MapPinIcon,
  Search,
  Filter,
  ChevronDown,
  Zap
} from 'lucide-react';

const BeautyBookingPage = ({ service, onBack }) => {
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeTab, setActiveTab] = useState('therapists');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rating');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 2500]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const therapists = [
    {
      id: 1,
      name: "Priya Sharma",
      experience: "6 years",
      rating: "4.9",
      clientsServed: 892,
      specialties: ["Facial Treatments", "Skincare", "Makeup", "Spa Therapy"],
      responseTime: "15 mins",
      fee: 1299,
      image: "/therapist1.jpg",
      certification: "Certified Esthetician",
      badge: "Popular",
      available: true,
      nextAvailable: "2:00 PM"
    },
    {
      id: 2,
      name: "Anjali Patel",
      experience: "8 years",
      rating: "4.8",
      clientsServed: 1124,
      specialties: ["Hair Care", "Bridal Makeup", "Skin Therapy", "Waxing"],
      responseTime: "20 mins",
      fee: 1599,
      image: "/therapist2.jpg",
      certification: "Senior Beauty Therapist",
      badge: "Pro",
      available: false,
      nextAvailable: "4:30 PM"
    },
    {
      id: 3,
      name: "Meera Reddy",
      experience: "10 years",
      rating: "5.0",
      clientsServed: 1567,
      specialties: ["Luxury Spa", "Anti-aging", "Body Treatments", "Ayurvedic"],
      responseTime: "25 mins",
      fee: 1999,
      image: "/therapist3.jpg",
      certification: "Master Therapist",
      badge: "Elite",
      available: true,
      nextAvailable: "3:15 PM"
    }
  ];

  const beautyServices = [
    "Premium Facial Treatment",
    "Bridal Makeup Package",
    "Luxury Spa Therapy",
    "Hair Care & Styling",
    "Skin Rejuvenation",
    "Body Massage",
    "Waxing & Threading",
    "Manicure & Pedicure"
  ];

  const serviceTypes = [
    { name: "Home Service", icon: MapPinIcon, description: "Therapist comes to your location", popular: true },
    { name: "Studio Visit", icon: CalendarIcon, description: "Visit therapist's studio", popular: false },
  ];

  const allSpecialties = [...new Set(therapists.flatMap(t => t.specialties))];

  const filteredTherapists = therapists
    .filter(therapist => {
      const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        therapist.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesSpecialties = selectedSpecialties.length === 0 || 
        selectedSpecialties.every(spec => therapist.specialties.includes(spec));
      
      const matchesPrice = therapist.fee >= priceRange[0] && therapist.fee <= priceRange[1];
      
      return matchesSearch && matchesSpecialties && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return parseFloat(b.rating) - parseFloat(a.rating);
      if (sortBy === 'experience') return parseInt(b.experience) - parseInt(a.experience);
      if (sortBy === 'price-low') return a.fee - b.fee;
      if (sortBy === 'price-high') return b.fee - a.fee;
      return 0;
    });

  const TherapistCard = ({ therapist }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
        <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-4 lg:gap-0 lg:items-start">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sparkles className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            {therapist.badge && (
              <div className={`absolute -top-2 -right-2 px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-bold text-white ${
                therapist.badge === 'Popular' ? 'bg-orange-500' : 
                therapist.badge === 'Pro' ? 'bg-purple-500' : 'bg-pink-600'
              }`}>
                {therapist.badge}
              </div>
            )}
          </div>
          
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            therapist.available 
              ? 'bg-green-100 text-green-800 border border-green-200' 
              : 'bg-amber-100 text-amber-800 border border-amber-200'
          }`}>
            {therapist.available ? 'Available Now' : `Available at ${therapist.nextAvailable}`}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
            <div className="flex-1">
              <div className="flex flex-col xs:flex-row xs:items-center gap-2 mb-2">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate">{therapist.name}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                    <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
                    <span className="font-semibold text-gray-700 text-sm">{therapist.rating}</span>
                  </div>
                  <span className="hidden xs:inline text-gray-400">•</span>
                  <span className="text-pink-600 font-semibold text-sm">{therapist.experience}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-2">{therapist.certification}</p>
              
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
              <span className="truncate">{therapist.responseTime} response</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
              <span className="truncate">{therapist.clientsServed}+ clients</span>
            </div>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2 mb-4">
            {therapist.specialties.slice().map((specialty, index) => (
              <span 
                key={index} 
                className="bg-pink-50 text-pink-700 px-2 py-1 rounded-full text-xs whitespace-nowrap"
              >
                {specialty}
              </span>
            ))}
           
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <div>
                <div className="text-xl sm:text-2xl font-bold text-green-600">₹{therapist.fee}</div>
                <p className="text-xs text-gray-500">Starting price</p>
              </div>
            </div>
            <div className="flex flex-col xs:flex-row gap-2 w-full sm:w-auto">
             
              <button
                onClick={() => {
                  setSelectedTherapist(therapist);
                  setShowBookingForm(true);
                }}
                className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 shadow-md hover:scale-105 flex items-center justify-center gap-2 text-sm sm:text-base"
                disabled={!therapist.available}
              >
                <Calendar className="h-4 w-4" />
                {therapist.available ? 'Book Now' : 'Pre-book'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const FiltersSection = () => (
    <div className={`bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 mb-6 transition-all duration-300 ${
      showFilters ? 'block' : 'hidden md:block'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button 
          onClick={() => setShowFilters(false)}
          className="md:hidden text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </label>
          <div className="px-2">
            <input
              type="range"
              min="500"
              max="2500"
              step="100"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Specialties
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-32 overflow-y-auto">
            {allSpecialties.map((specialty, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSpecialties.includes(specialty)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSpecialties([...selectedSpecialties, specialty]);
                    } else {
                      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
                    }
                  }}
                  className="rounded text-pink-600 focus:ring-pink-500"
                />
                <span className="text-sm text-gray-700 truncate">{specialty}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sort By
          </label>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
          >
            <option value="rating">Highest Rating</option>
            <option value="experience">Most Experienced</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
        </div>

        {(selectedSpecialties.length > 0 || priceRange[0] > 500 || priceRange[1] < 2500) && (
          <button
            onClick={() => {
              setSelectedSpecialties([]);
              setPriceRange([500, 2500]);
            }}
            className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );

  const BookingForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-4 sm:p-6 max-w-md w-full mx-auto max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Book {selectedTherapist.name}</h3>
            <p className="text-sm text-gray-600 mt-1">{selectedTherapist.certification}</p>
          </div>
          <button
            onClick={() => setShowBookingForm(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Service Type
            </label>
            <div className="grid gap-3">
              {serviceTypes.map((serviceType, index) => (
                <div 
                  key={index}
                  className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${
                    serviceType.popular 
                      ? 'border-pink-500 bg-pink-50' 
                      : 'border-gray-200 hover:border-pink-500'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      serviceType.popular ? 'bg-pink-500' : 'bg-pink-100'
                    }`}>
                      <serviceType.icon className={`h-5 w-5 ${
                        serviceType.popular ? 'text-white' : 'text-pink-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{serviceType.name}</span>
                        {serviceType.popular && (
                          <span className="bg-pink-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">{serviceType.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quick Service Selection
            </label>
            <div className="grid grid-cols-2 gap-2">
              {beautyServices.slice(0, 4).map((service, index) => (
                <button
                  key={index}
                  className="bg-gray-50 hover:bg-pink-50 border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-700 hover:text-pink-700 hover:border-pink-300 transition-all text-center"
                >
                  {service.split(' ')[0]}
                </button>
              ))}
            </div>
            <select className="w-full mt-3 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-sm">
              {beautyServices.map(service => (
                <option key={service}>{service}</option>
              ))}
            </select>
          </div>

          {/* Date & Time */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Preferred Date & Time
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="date" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm" 
                />
              </div>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="time" 
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm" 
                />
              </div>
            </div>
          </div>

          {/* Special Requirements */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Special Requirements
            </label>
            <textarea 
              placeholder="Any specific requirements, allergies, or preferences?"
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all text-sm"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={() => setShowBookingForm(false)}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Beauty session booked successfully! Our therapist will contact you soon.');
                setShowBookingForm(false);
              }}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all shadow-md flex items-center justify-center gap-2 text-sm"
            >
              <Zap className="h-4 w-4" />
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors px-3 py-2 rounded-lg hover:bg-gray-50 text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="hidden sm:inline">Back to Services</span>
              <span className="sm:hidden">Back</span>
            </button>
            
            <div className="text-center flex-1 max-w-2xl mx-2 sm:mx-4">
              <h1 className="text-xl whitespace-nowrap sm:text-2xl lg:text-3xl font-bold text-gray-900 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {service?.title || "Beauty Services"}
              </h1>
              <p className="text-gray-600 mt-1 text-xs sm:text-sm hidden sm:block">
                {service?.description || "Book certified beauty experts"}
              </p>
            </div>
            
            <div className="w-16 sm:w-24"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search therapists or specialties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent text-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm md:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
            {selectedSpecialties.length > 0 && (
              <span className="bg-pink-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                {selectedSpecialties.length}
              </span>
            )}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <FiltersSection />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Available Beauty Experts
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  {filteredTherapists.length} {filteredTherapists.length === 1 ? 'therapist' : 'therapists'} found
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4 text-green-500" />
                <span className="hidden sm:inline">All therapists are verified and certified</span>
                <span className="sm:hidden">Verified & Certified</span>
              </div>
            </div>
            
            {/* Therapists Grid */}
            <div className="space-y-4 sm:space-y-6">
              {filteredTherapists.length > 0 ? (
                filteredTherapists.map(therapist => (
                  <TherapistCard key={therapist.id} therapist={therapist} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No therapists found</h3>
                  <p className="text-gray-600 text-sm mb-4">Try adjusting your filters or search terms</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedSpecialties([]);
                      setPriceRange([500, 2500]);
                    }}
                    className="bg-pink-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-pink-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && <BookingForm />}
    </div>
  );
};

export default BeautyBookingPage;