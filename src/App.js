import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import { useAppContext } from "./context/AppContext";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Categories from "./pages/Categories.jsx"
import HotSalesPage from './pages/HotSalesPage';
import NewArrivalsPage from './pages/NewArrivalsPage';
// import Pagenotfound from './pages/PageFooter/Pagenotfound';
import AboutPage from './pages/PageFooter/AboutPage.jsx';
import ContactUs from './pages/PageFooter/ContactUs';
import Disclaimer from './pages/PageFooter/Disclaimer';
import PaymentOptions from './pages/PageFooter/PaymentOptions';
import CancellationAndRefund from './pages/PageFooter/CancellationAndRefund.js';
import ShippingAndDelivery from './pages/PageFooter/ShippingAndDelivery.js';
import TermsAndConditions from './pages/PageFooter/TermsAndConditions.js';
import PrivacyPolicy from './pages/PageFooter/PrivacyPolicy';
import DevelopersPage from './pages/DevelopersPage';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import ServiceBookingLayout   from './services/ServiceBookingLayout';
import AllProducts from './pages/AllProducts';
import DoctorsPage from "./services/DoctorsPage.jsx";
import AppointmentSuccessPage from "./services/AppointmentSuccessPage.jsx";
import DoctorDetailPage from "./services/DoctorDetailPage.jsx";
import { useState, useEffect } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import Animated404Page from "./pages/PageFooter/Animated404Page.jsx";
import TherapistDetail from "./services/TherapistDetail.jsx";



const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-indigo-500 to-pink-500  text-white w-10 h-10 md:w-12 md:h-12  rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-6 h-6" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

const FloatingDoctorButton = () => {
  const context = useAppContext();

  const handleDoctorClick = () => {
    window.location.href = '/ServiceBookingLayout';
  };

  return (
   <button
  onClick={handleDoctorClick}
  className="fixed bottom-6 left-6 z-50 bg-gradient-to-br from-indigo-500 to-pink-500 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center justify-center space-x-2 transition-all duration-300 hover:scale-105"
  aria-label="Consult with Doctors"
>
<FaUserDoctor />

  <span className="text-sm font-medium hidden sm:inline">Services Consult</span>
</button>
  );
};

const App = () => {
  const context = useAppContext();

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotsales" element={<HotSalesPage />} />
            <Route path="/newarrivals" element={<NewArrivalsPage />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/*" element={<Pagenotfound />} /> */}
            <Route path="*" element={<Animated404Page />} />
            <Route path="/ServiceBookingLayout" element={<ServiceBookingLayout />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/Categories/:name" element={<Categories />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/PaymentOptions" element={<PaymentOptions />} />
            <Route
              path="/CancellationandRefund"
              element={<CancellationAndRefund />}
            />
            <Route path="/track-order" element={<ShippingAndDelivery />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/developers" element={<DevelopersPage />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/failure" element={<PaymentFailed />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/AppointmentSuccessPage" element={<AppointmentSuccessPage />} />
            <Route path="/doctor/:id" element={<DoctorDetailPage />} />
            <Route path="/therapist/:id" element={<TherapistDetail />} />
            <Route
              path="/account"
              element={context.login ? <Account /> : <Auth />}
            />
            <Route path="/cart" element={context.login ? <Cart /> : <Auth />} />
          </Routes>
          
          <ScrollToTopButton />
          <FloatingDoctorButton />
          
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;