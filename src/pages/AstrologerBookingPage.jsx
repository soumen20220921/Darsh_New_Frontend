import React, { useState } from 'react';
import { 
  Telescope, 
  Clock, 
  Star, 
  CheckCircle,
  Calendar,
  User,
  Phone,
  ArrowLeft,
  Shield,
  Award,
  Sparkles
} from 'lucide-react';

const AstrologerBookingPage = ({ service, onBack }) => {
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  const astrologers = [
    {
      id: 1,
      name: "Pandit Sharma",
      experience: "15 years",
      rating: "4.9",
      clientsServed: 2450,
      specialties: ["Vedic Astrology", "Career Guidance", "Marriage Matching", "Gemstone Recommendation"],
      responseTime: "10 mins",
      fee: 799,
      image: "/astrologer1.jpg",
      certification: "Jyotish Visharad",
      languages: ["Hindi", "English", "Sanskrit"],
      accuracy: "92%"
    },
    {
      id: 2,
      name: "Acharya Patel",
      experience: "12 years",
      rating: "4.8",
      clientsServed: 1876,
      specialties: ["Kundli Analysis", "Horoscope Reading", "Palmistry", "Numerology"],
      responseTime: "15 mins",
      fee: 699,
      image: "/astrologer2.jpg",
      certification: "Jyotish Alankar",
      languages: ["Hindi", "Gujarati", "English"],
      accuracy: "89%"
    },
    {
      id: 3,
      name: "Dr. Reddy",
      experience: "20 years",
      rating: "5.0",
      clientsServed: 3250,
      specialties: ["Medical Astrology", "Business Prediction", "Vastu Consultation", "Remedial Solutions"],
      responseTime: "20 mins",
      fee: 1299,
      image: "/astrologer3.jpg",
      certification: "PhD in Astrology",
      languages: ["English", "Hindi", "Telugu"],
      accuracy: "95%"
    }
  ];

  const consultationTypes = [
    "Birth Chart Analysis",
    "Career Guidance",
    "Love & Relationship",
    "Marriage Compatibility",
    "Business Prediction",
    "Health Issues",
    "Gemstone Recommendation",
    "General Horoscope"
  ];

  const AstrologerCard = ({ astrologer }) => (
    <div className="bg-white rounded-2xl shadow-soft border border-purple-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start gap-4">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Telescope className="h-10 w-10 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{astrologer.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-purple-600 font-semibold text-sm">{astrologer.experience} Experience</p>
                <span className="text-gray-400">•</span>
                <p className="text-gray-600 text-sm">{astrologer.certification}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="font-semibold text-gray-700">{astrologer.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-green-500" />
              Response: {astrologer.responseTime}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <User className="h-4 w-4 mr-2 text-blue-500" />
              {astrologer.clientsServed}+ clients
            </div>
          </div>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <Sparkles className="h-4 w-4 mr-1" />
              {astrologer.accuracy} Accuracy
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {astrologer.specialties.map((specialty, index) => (
              <span key={index} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                {specialty}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">₹{astrologer.fee}</div>
              <p className="text-xs text-gray-500">Per session</p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 bg-purple-50 text-purple-600 px-4 py-2 rounded-xl hover:bg-purple-100 transition duration-200">
                <Phone className="h-4 w-4" />
                Quick Chat
              </button>
              <button
                onClick={() => {
                  setSelectedAstrologer(astrologer);
                  setShowBookingForm(true);
                }}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const BookingForm = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-auto">
        <h3 className="text-xl font-bold mb-4">Consult with {selectedAstrologer.name}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Consultation Type
            </label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500">
              {consultationTypes.map(type => (
                <option key={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Date & Time
            </label>
            <div className="flex gap-2">
              <input type="date" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl" />
              <input type="time" className="flex-1 px-4 py-3 border border-gray-200 rounded-xl" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Communication Mode
            </label>
            <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500">
              <option>Video Call</option>
              <option>Audio Call</option>
              <option>Chat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Specific Questions
            </label>
            <textarea 
              placeholder="What would you like to discuss with the astrologer?"
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setShowBookingForm(false)}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                alert('Astrology consultation booked successfully! Our astrologer will contact you soon.');
                setShowBookingForm(false);
              }}
              className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Confirm Booking
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Services
            </button>
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {service.features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm border">
              <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-700">{feature}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Expert Astrologers</h2>
          {astrologers.map(astrologer => (
            <AstrologerCard key={astrologer.id} astrologer={astrologer} />
          ))}
        </div>

        {/* Astrology Services */}
        <div className="mt-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Comprehensive Astrology Services</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white/20 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2">Kundli Analysis</h4>
              <p className="text-purple-100 mb-4">Detailed birth chart analysis and predictions</p>
              <div className="text-2xl font-bold">Starting ₹499</div>
            </div>
            <div className="bg-white/30 rounded-xl p-6 backdrop-blur-sm">
              <h4 className="font-bold text-lg mb-2">Yearly Horoscope</h4>
              <p className="text-purple-100 mb-4">Complete year ahead prediction</p>
              <div className="text-2xl font-bold">Starting ₹799</div>
            </div>
          </div>
        </div>
      </div>

      {showBookingForm && <BookingForm />}
    </div>
  );
};

export default AstrologerBookingPage;