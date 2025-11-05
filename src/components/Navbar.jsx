import { useState, useEffect, useRef } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineHome
} from "react-icons/ai";
import { Package } from "lucide-react";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaStethoscope } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import LogoutModal from "../pages/LogoutModal";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { login, setLogin, totalItems, orderCount, order } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const menuRef = useRef(null);
  const userName = localStorage.getItem("name");
  // const logOut = () => setShowModal(true);
  const paidOrderCount = order 
  ? order.filter(order => order.payStatus && order.payStatus.toLowerCase() === 'paid').length
  : 0;

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };
  const cancelLogout = () => setShowModal(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLogin(true);
  }, [setLogin]);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

   

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavigation = (path) => {
    console.log("Navigating to:", path); 
    navigate(path);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const isActiveRoute = (path) => {
    if (path.includes('?')) {
      const [basePath, queryString] = path.split('?');
      const searchParams = new URLSearchParams(queryString);
      const currentParams = new URLSearchParams(location.search);
      
      if (location.pathname !== basePath) return false;
      
      for (const [key, value] of searchParams) {
        if (currentParams.get(key) !== value) return false;
      }
      return true;
    }
    
    return location.pathname === path;
  };

  const isAccountTabActive = (tabNumber) => {
    return location.pathname === "/account" && new URLSearchParams(location.search).get('tab') === tabNumber.toString();
  };

  const FloatingParticles = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-indigo-300/20 to-pink-300/20 animate-float"
          style={{
            width: `${Math.random() * 30 + 10}px`,
            height: `${Math.random() * 30 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 10 + 10}s`,
          }}
        />
      ))}
    </div>
  );

  const MobileIconButton = ({ onClick, children, label, badge = 0, isActive = false }) => (
    <button
      onClick={onClick}
      aria-label={label}
      className={`relative flex items-center justify-center w-9 h-9 rounded-2xl 
        transition-all duration-300 ease-out transform hover:scale-110 active:scale-95
        ${isActive 
          ? "bg-gradient-to-br  from-pink-500 to-blue-300 text-white shadow-lg" 
          : "bg-white/80 backdrop-blur-sm text-gray-700 shadow-md hover:shadow-lg"
        }`}
    >
      {children}
      {badge > 0 && (
        <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 rounded-full 
          bg-red-500 text-white text-xs font-bold shadow-lg animate-pulse-subtle">
          {badge > 9 ? "9+" : badge}
        </span>
      )}
    </button>
  );

  const DesktopNavItem = ({ 
    path, 
    icon: Icon, 
    label, 
    badge = 0, 
    gradient = "from-indigo-600 to-pink-500",
    iconGradient = "from-indigo-600 to-pink-500"
  }) => (
    <button
      onClick={() => handleNavigation(path)}
      onMouseEnter={() => setActiveHover(path)}
      onMouseLeave={() => setActiveHover(null)}
      className={`relative flex items-center gap-2 px-4 py-2.5 rounded-2xl transition-all duration-500
        ${isActiveRoute(path) 
          ? `bg-gradient-to-r ${gradient} text-white shadow-lg transform -translate-y-0.5` 
          : "text-gray-700 hover:bg-white/80 hover:shadow-md"
        }`}
    >
      <div className={`transition-transform duration-300 ${activeHover === path ? 'scale-110' : 'scale-100'}`}>
        <Icon size={20} className={isActiveRoute(path) ? "text-white" : `text-gradient ${iconGradient}`} />
      </div>
      <span className={`text-sm font-semibold transition-all duration-300 ${
        isActiveRoute(path) 
          ? "text-white" 
          : `bg-gradient-to-r ${gradient} bg-clip-text text-transparent`
      }`}>
        {label}
      </span>
      
      {badge > 0 && (
        <span className={`absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full 
          text-xs font-bold shadow-lg animate-bounce-subtle ${
            isActiveRoute(path) ? "bg-white text-indigo-600" : "bg-orange-500 text-white"
          }`}>
          {badge > 9 ? "9+" : badge}
        </span>
      )}
      
      <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r ${gradient} 
        transition-all duration-300 transform -translate-x-1/2
        ${activeHover === path ? 'w-3/4' : 'w-0'}`} />
    </button>
  );

  return (
    <nav
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all duration-500 ${
        scrolled 
          ? "bg-white/95 shadow-2xl py-0" 
          : "bg-white/80 shadow-lg py-1"
      }`}
    >
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        <Link
          to="/"
          className="inline-flex items-center space-x-1 md:space-x-3 transform transition-all duration-500 hover:scale-105 active:scale-95"
        >
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-xl animate-glow">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <div className="absolute inset-0 rounded-2xl border-2 border-indigo-300/50 animate-ping-slow" />
          </div>
          <span className="text-lg  md:text-2xl font-black bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent tracking-tight">
            POMWB
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-3">
          <DesktopNavItem 
            path="/" 
            icon={AiOutlineHome} 
            label="Home" 
            gradient="from-blue-500 to-cyan-500"
            iconGradient="from-blue-500 to-cyan-500"
          />
          
          <DesktopNavItem 
            path="/doctors" 
            icon={FaStethoscope} 
            label="Doctors" 
            gradient="from-green-500 to-teal-500"
            iconGradient="from-green-500 to-teal-500"
          />
          
          <DesktopNavItem 
            path="/cart" 
            icon={AiOutlineShopping} 
            label="Cart" 
            badge={totalItems}
            gradient="from-orange-500 to-red-500"
            iconGradient="from-orange-500 to-red-500"
          />

          <div className="relative group">
            <button
              onClick={() => handleNavigation("/account?tab=1")}
              className={`relative flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all duration-500 overflow-hidden
                ${login
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-xl hover:shadow-2xl hover:scale-105"
                  : "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl"
                }`}
            >
              <div className="relative z-10 flex items-center gap-2">
                <AiOutlineUser size={20} className="text-white" />
                <span className={`transition-all duration-500 ease-out ${
                  login ? "max-w-0 opacity-0 group-hover:max-w-[120px] group-hover:opacity-100" : "max-w-[120px]"
                } overflow-hidden whitespace-nowrap`}>
                  {login ? userName : "Log In"}
                </span>
              </div>
              
              <div className="absolute inset-0 -left-[100%] group-hover:left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:hidden" ref={menuRef}>
          <div className="flex items-center gap-2">
            <MobileIconButton 
              onClick={() => handleNavigation("/")} 
              label="Home"
              isActive={isActiveRoute("/")}
            >
              <AiOutlineHome size={20} />
            </MobileIconButton>

            <MobileIconButton
              onClick={() => handleNavigation("/cart")}
              label="Cart"
              badge={totalItems || 0}
              isActive={isActiveRoute("/cart")}
            >
              <AiOutlineShopping size={20} />
            </MobileIconButton>

            {login && (
              <MobileIconButton
                onClick={() => handleNavigation("/account?tab=3")}
                label="Orders"
                badge={paidOrderCount || 0}
                isActive={isAccountTabActive(3)}
              >
                <Package size={20} />
              </MobileIconButton>
            )}

          </div>

          <button
            onClick={handleMenuToggle}
            className="relative w-9 h-9 flex items-center justify-center rounded-2xl 
              bg-gradient-to-br from-pink-500 to-blue-300 text-white shadow-lg
              transition-all duration-500 hover:scale-110 hover:shadow-xl active:scale-95"
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-5 transition-all duration-500">
              {isMobileMenuOpen ? (
                <IoMdClose className="w-5 h-5 transition-transform duration-500 rotate-90 scale-110" />
              ) : (
                <FiMenu className="w-5 h-5 transition-transform duration-500" />
              )}
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen z-50 transition-all duration-700 ease-out
          ${isMobileMenuOpen 
            ? "opacity-100 visible backdrop-blur-md" 
            : "opacity-0 invisible pointer-events-none"
          }`}
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-50/95 via-white/98 to-pink-50/95"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <FloatingParticles />
        
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/30 bg-white/20 backdrop-blur-lg">
            <div className="flex items-center gap-3">
              {login ? (
                <div className="animate-slide-in-left">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-blue-300 text-white rounded-xl flex items-center justify-center shadow-xl">
                    <span className="text-white font-bold text-lg">
                      {userName?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
              ) : null}
              
              <div className="animate-slide-in-left" style={{ animationDelay: "100ms" }}>
                <span className="text-xl font-bold text-gray-800">
                  {login ? (
                    <>
                      Hello,{" "}
                      <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                        {userName}!
                      </span>
                    </>
                  ) : (
                    <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                      Welcome!
                    </span>
                  )}
                </span>
              </div>
            </div>

            <button
              onClick={handleMenuToggle}
              className="w-10 h-10 flex items-center justify-center rounded-2xl 
                bg-white/80 backdrop-blur-sm text-gray-700 shadow-lg
                hover:bg-red-500 hover:text-white hover:scale-110
                transition-all duration-500 transform hover:rotate-180"
              aria-label="Close menu"
            >
              <IoMdClose size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
            <ul className="flex flex-col gap-3">
              <li className="animate-stagger-in" style={{ animationDelay: "200ms" }}>
                <button
                  onClick={() => handleNavigation("/")}
                  className={`group relative flex items-center gap-2 w-full px-5 py-3 rounded-2xl
                    text-gray-800 font-semibold bg-white/70 backdrop-blur-sm border border-white/40
                    hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl
                    transition-all duration-500 shadow-lg active:scale-95
                    ${location.pathname === "/" ? 'ring-2 ring-white/50 transform -translate-y-0.5' : ''}`}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg text-white transition-transform duration-500 group-hover:scale-110">
                    <AiOutlineHome size={22} />
                  </div>
                  <span className="flex-1 text-left text-base whitespace-nowrap">Home</span>
                  <div className="text-gray-400 animate-arrowMove group-hover:text-gray-600 transition-colors duration-300">
                    →
                  </div>
                </button>
              </li>

              <li className="animate-stagger-in" style={{ animationDelay: "300ms" }}>
                <button
                  onClick={() => handleNavigation("/doctors")}
                  className={`group relative flex items-center gap-2 w-full px-5 py-3 rounded-2xl
                    text-gray-800 font-semibold bg-white/70 backdrop-blur-sm border border-white/40
                    hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl
                    transition-all duration-500 shadow-lg active:scale-95
                    ${location.pathname === "/doctors" ? 'ring-2 ring-white/50 transform -translate-y-0.5' : ''}`}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-teal-500 shadow-lg text-white transition-transform duration-500 group-hover:scale-110">
                    <FaStethoscope size={22} />
                  </div>
                  <span className="flex-1 text-left text-base whitespace-nowrap">Doctor Appointment</span>
                  <div className="text-gray-400 animate-arrowMove group-hover:text-gray-600 transition-colors duration-300">
                    →
                  </div>
                </button>
              </li>

              {login && (
                <li className="animate-stagger-in" style={{ animationDelay: "400ms" }}>
                  <button
                    onClick={() => handleNavigation("/account?tab=1")}
                    className={`group relative flex items-center gap-2 w-full px-5 py-3 rounded-2xl
                      text-gray-800 font-semibold bg-white/70 backdrop-blur-sm border border-white/40
                      hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl
                      transition-all duration-500 shadow-lg active:scale-95
                      ${isAccountTabActive(1) ? 'ring-2 ring-white/50 transform -translate-y-0.5' : ''}`}
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg text-white transition-transform duration-500 group-hover:scale-110">
                      <AiOutlineUser size={22} />
                    </div>
                    <span className="flex-1 text-left text-base whitespace-nowrap">My Account</span>
                    <div className="text-gray-400 animate-arrowMove group-hover:text-gray-600 transition-colors duration-300">
                      →
                    </div>
                  </button>
                </li>
              )}

              {/* Cart */}
              <li className="animate-stagger-in" style={{ animationDelay: "500ms" }}>
                <button
                  onClick={() => handleNavigation("/cart")}
                  className={`group relative flex items-center gap-2 w-full px-5 py-3 rounded-2xl
                    text-gray-800 font-semibold bg-white/70 backdrop-blur-sm border border-white/40
                    hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl
                    transition-all duration-500 shadow-lg active:scale-95
                    ${location.pathname === "/cart" ? 'ring-2 ring-white/50 transform -translate-y-0.5' : ''}`}
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg text-white transition-transform duration-500 group-hover:scale-110">
                    <AiOutlineShopping size={22} />
                  </div>
                  <span className="flex-1 text-left text-base whitespace-nowrap">Cart</span>
                  {totalItems > 0 && (
                    <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-sm font-bold shadow-lg ring-2 ring-white/50 animate-pulse-subtle">
                      {totalItems > 9 ? "9+" : totalItems}
                    </span>
                  )}
                  <div className="text-gray-400 animate-arrowMove group-hover:text-gray-600 transition-colors duration-300">
                    →
                  </div>
                </button>
              </li>

              {/* My Orders */}
              {login && (
                <li className="animate-stagger-in" style={{ animationDelay: "600ms" }}>
                  <button
                    onClick={() => handleNavigation("/account?tab=3")}
                    className={`group relative flex items-center gap-2 w-full px-5 py-3 rounded-2xl
                      text-gray-800 font-semibold bg-white/70 backdrop-blur-sm border border-white/40
                      hover:bg-white/90 hover:-translate-y-1 hover:shadow-2xl
                      transition-all duration-500 shadow-lg active:scale-95
                      ${isAccountTabActive(3) ? 'ring-2 ring-white/50 transform -translate-y-0.5' : ''}`}
                  >
                    <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg text-white transition-transform duration-500 group-hover:scale-110">
                      <Package size={22} />
                    </div>
                    <span className="flex-1 text-left text-base whitespace-nowrap">My Orders</span>
                    {paidOrderCount > 0 && (
                      <span className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-red-500 to-pink-500 text-white text-sm font-bold shadow-lg ring-2 ring-white/50 animate-pulse-subtle">
                        {paidOrderCount > 9 ? "9+" : paidOrderCount}
                      </span>
                    )}
                    <div className="text-gray-400 animate-arrowMove group-hover:text-gray-600 transition-colors duration-300">
                      →
                    </div>
                  </button>
                </li>
              )}
            {!login && (
              <div className="animate-stagger-in" style={{ animationDelay: "700ms" }}>
                <button
                  onClick={() => handleNavigation("/account")}
                  className="w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-6 py-5 rounded-2xl shadow-2xl font-bold text-lg hover:scale-105 hover:shadow-indigo-500/25 transition-all duration-500 active:scale-95"
                >
                  Log In / Sign Up
                </button>
              </div>
            )}
            </ul>
              
          {/* {login && (
            <div className="mt-8 mb-16 pt-6 border-t border-white/20 animate-fade-in">
              <button
                type="button"
                onClick={logOut}
                className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl
                text-red-500 font-semibold
                hover:bg-red-50
                transition-all duration-300 active:scale-95"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-100 text-red-500">
                  <AiOutlineLogout size={22} />
                </div>
                Log Out
              </button>
            </div>
          )} */}
            

            

            
          </div>
        </div>
      </div>

      {showModal && <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />}
    </nav>
  );
};

export default Navbar;