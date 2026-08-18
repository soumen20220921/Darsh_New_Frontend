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
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailed from './pages/PaymentFailed';
import AllProducts from './pages/AllProducts';
import Animated404Page from "./pages/PageFooter/Animated404Page.jsx";
import WhatsAppChat from "./components/WhatsAppChat";
import ScrollToTop from "./components/ScrollToTop";
import SareesByColor from "./pages/SareesByColor";
import Wishlist from "./pages/Wishlist.jsx";
import PremiumSarees from "./pages/PremiumSarees.jsx";
import ShopByPrice from "./pages/ShopByPrice.jsx";

const App = () => {
  const context = useAppContext();

  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hotsales" element={<HotSalesPage />} />
            <Route path="/newarrivals" element={<NewArrivalsPage />} />
            <Route path="/allproducts" element={<AllProducts />} />
            <Route path="/productDetails/:id" element={<ProductDetails />} />
            <Route path="/auth" element={<Auth />} />
            {/* <Route path="/*" element={<Pagenotfound />} /> */}
            <Route path="*" element={<Animated404Page />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/contactus" element={<ContactUs />} />
            <Route path="/Categories/:name" element={<Categories />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/ShippingAndDelivery" element={<ShippingAndDelivery />} />
            <Route path="/PaymentOptions" element={<PaymentOptions />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/premium-sarees" element={<PremiumSarees />}/>
            <Route path="/shop-by-price" element={<ShopByPrice />} />
            <Route
              path="/CancellationandRefund"
              element={<CancellationAndRefund />}
            />
            <Route path="/ShippingAndDelivery" element={<ShippingAndDelivery />} />
            <Route
              path="/terms-and-conditions"
              element={<TermsAndConditions />}
            />
            <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/success" element={<PaymentSuccess />} />
            <Route path="/failure" element={<PaymentFailed />} />
            <Route path="/sarees-by-color" element={<SareesByColor />} />
            <Route
              path="/account"
              element={context.login ? <Account /> : <Auth />}
            />
            <Route path="/cart" element={context.login ? <Cart /> : <Auth />} />
          </Routes>

          <WhatsAppChat />

          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;