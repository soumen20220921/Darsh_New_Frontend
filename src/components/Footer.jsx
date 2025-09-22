import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Shield, Truck, Code, Github, Star, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const footerLinks = {
    support: [
      { name: 'Contact Us', path: '/contactus' },
      { name: 'Returns', path: '/CancellationandRefund' },
      { name: 'Terms And Conditions', path: '/terms-and-conditions' },
      { name: 'Track Order', path: '/track-order' }
    ],
    company: [
      { name: 'About Us', path: '/aboutus' },
      { name: 'Disclaimer', path: '/disclaimer' },
      { name: 'Privacy Policy', path: '/PrivacyPolicy' },
      { name: 'Payment Options', path: '/PaymentOptions' }
    ]
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitting(true);
      setTimeout(() => {
        setSubscribed(true);
        setIsSubmitting(false);
        setEmail('');
        console.log(`Subscribed with email: ${email}`);
      }, 2000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white font-inter overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 sm:gap-12">
          <div className="lg:col-span-2 text-center md:text-left animate-fadeInLeft">
            <Link to="/" className="inline-flex items-center justify-center md:justify-start space-x-2 mb-4 transform transition-transform duration-500 hover:scale-110 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="text-2xl font-extrabold tracking-wide text-white">POMWB</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base">
              Premium products with unbeatable prices. Experience fast shipping and outstanding service.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="h-5 w-5 text-blue-400 animate-bounce" />
                <span className="text-gray-300">+91 7363054510</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="h-5 w-5 text-blue-400 animate-bounce delay-100" />
                <span className="text-gray-300">pomwbweb@gmail.com</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="h-5 w-5 text-blue-400 animate-bounce delay-200" />
                <span className="text-gray-300">Nilkuthidanga, puruli,West bengal,723101</span>
              </div>
            </div>

            {/* Social Links */}
            {/* <div className="flex space-x-4 mt-6 justify-center md:justify-start">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500 transform hover:scale-110 transition-all duration-300 shadow-lg"
                >
                  <Icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div> */}
          </div>

          {/* Support Links */}
          <div className="text-center md:text-left animate-fadeInUp">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="text-center md:text-left animate-fadeInUp delay-100">
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:translate-x-1 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers Section */}
          {/* <div className="text-center md:text-left animate-fadeInUp delay-200">
            <h3 className="text-lg font-semibold mb-4">Developers</h3>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">Developed with passion by:</p>
              <Link to="/developers" className="flex items-center justify-center md:justify-start space-x-2 hover:text-indigo-400 transition-all duration-300">
                <Code className="h-4 w-4 text-indigo-500" />
                <span className="text-gray-300">Debashis & Soumen</span>
              </Link>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Mail className="h-4 w-4 text-blue-400" />
                <a href="mailto:adebashispaul@gmail.com" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">
                  adebashispaul@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <Github className="h-4 w-4 text-gray-400" />
                <a href="https://github.com/Debashis-11101-srijib" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div> */}
        </div>

        {/* Subscription Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center animate-fadeInUp">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            {subscribed ? (
              <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-center space-x-2 animate-pulse">
                <CheckCircle className="h-6 w-6" />
                <p className="text-sm sm:text-base font-semibold">Successfully Subscribed!</p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe}>
                <p className="text-gray-300 mb-4 text-sm sm:text-base">
                  Subscribe for special offers, giveaways, and updates.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:space-x-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-500 w-full transition-all duration-300 shadow-inner"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg w-full sm:w-auto font-medium"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Features Cards */}
       <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h3 className="text-xl font-semibold mb-6 text-center">Why Shop with Us?</h3>
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-6 text-center">
             <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Truck className="h-8 w-8 text-blue-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Fast Shipping</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">On all orders over 1000</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Shield className="h-8 w-8 text-green-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Secure Payments</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">Advanced SSL encryption</div>
            </div>
            <div className="flex flex-col items-center p-6 rounded-xl bg-gray-800/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <Star className="h-8 w-8 text-yellow-400 mb-3" />
              <div className="text-xs md:text-lg font-medium">Quality Guaranteed</div>
              <div className="hidden md:inline text-sm text-gray-400 mt-1">100% satisfaction policy</div>
            </div>
          </div>
        </div>
      </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-4 md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm">© 2025 CoderDeba. All rights reserved.</div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-gray-400">
              <Link to="/PrivacyPolicy" className="hover:text-white hover:underline transition-all duration-300">Privacy Policy</Link>
              <Link to="/terms-and-conditions" className="hover:text-white hover:underline transition-all duration-300">Terms of Service</Link>
              <Link to="/CancellationandRefund" className="hover:text-white hover:underline transition-all duration-300">Returns Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
