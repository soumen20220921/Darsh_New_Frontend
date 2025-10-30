import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShopping,
  AiOutlineLogout,
  AiOutlineHome
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { FaUserMd } from "react-icons/fa";
import { useAppContext } from "../context/AppContext";
import LogoutModal from "../pages/LogoutModal";


const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { login, setLogin, totalItems } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");
  const logOut = () => setShowModal(true);

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

  const handleMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };



  return (
    <nav className={`sticky top-0 z-50 backdrop-blur-sm transition-all duration-500 ${scrolled ? "bg-white/95 shadow-lg" : "bg-white/80 shadow-md"}`}>
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg ">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent tracking-wide">
            POMWB
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-4">
         
          
          {/* Home Link */}
          <button
            onClick={() => handleNavigation("/")}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
             <div className=" bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text ">
                  <AiOutlineHome size={22} />
                </div>
            <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent tracking-wide">Home</span>
          </button>
           <button
            onClick={() => handleNavigation("/doctors")}
            className="flex items-center gap-1 px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all duration-300"
          >
            <div className=" bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text ">
              <FaUserMd size={20} />
            </div>
            <span className="text-sm font-medium bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent tracking-wide">
              Doctors
            </span>
          </button>
          
          {/* Cart Button */}
          <button
            onClick={() => handleNavigation("/cart")}
            className="relative flex items-center gap-1 px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-all duration-300"
          >
            <AiOutlineShopping size={20} />
            <span className="text-sm font-medium">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 flex items-center justify-center h-6 w-6 rounded-full bg-orange-600 text-white text-xs font-bold shadow-md animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Account Button */}
          <div className="relative group">
            <button
              type="button"
              aria-label="Account"
              onClick={() => {
                window.scrollTo(0, 0);
                handleNavigation("/account");
              }}
              className={`flex items-center justify-center h-10 px-4 rounded-full font-semibold transition-all duration-300 ${
                login
                  ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg hover:scale-105"
                  : "bg-purple-100 text-purple-800 hover:bg-purple-200"
              }`}
            >
              <span className="relative z-10 flex items-center gap-2 transition-colors duration-300">
                {login ? (
                  <AiOutlineUser
                    size={24}
                    className="text-white hover:text-white"
                  />
                ) : (
                  <span className="text-sm">Log In</span>
                )}
                <span
                  className={`transition-all duration-300 ease-in-out ${
                    login
                      ? "max-w-0 whitespace-nowrap opacity-0 group-hover:max-w-[100px] group-hover:opacity-100"
                      : "hidden"
                  }`}
                >
                  {userName}
                </span>
              </span>
              {!login && (
                <span className="absolute inset-0 bg-grey-500 rounded-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
        
          
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={handleMenuToggle}
            className="text-gray-700 text-2xl p-2 hover:text-indigo-500 transition-all duration-300"
          >
            {isMobileMenuOpen ? <IoMdClose /> : <FiMenu />}
          </button>
        </div>
      </div>

      

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-full h-screen
        bg-black/20 bg-gradient-to-br from-indigo-100 via-white to-pink-100
        backdrop-blur-xl shadow-2xl z-50 flex flex-col
        transition-all duration-500 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0 pointer-events-none"
        }
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/20">
          {login && (
            <div className="animate-fade-in">
              <span className="text-lg font-bold text-gray-800">
                👋 Hi,{" "}
                <span className="font-extrabold bg-gradient-to-r from-indigo-600 to-pink-500 bg-clip-text text-transparent">
                  {userName}!
                </span>
              </span>
            </div>
          )}
          <button
            onClick={handleMenuToggle}
            className="ml-auto h-11 w-11 flex items-center justify-center rounded-full bg-white/60 shadow-md 
            hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:rotate-180
            focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
          <ul className="flex flex-col gap-4">
            {/* Home Link */}
            <li
              className="animate-stagger-in"
              style={{ animationDelay: "50ms" }}
            >
              <button
                type="button"
                onClick={() => handleNavigation("/")}
                className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl
                text-gray-800 font-semibold bg-white/50 border border-white/30 backdrop-blur-sm
                hover:bg-white/80 hover:-translate-y-1
                transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-blue-100 text-blue-600 shadow-inner">
                  <AiOutlineHome size={22} />
                </div>
                Home
              </button>
            </li>
            <li
              className="animate-stagger-in"
              style={{ animationDelay: "150ms" }}
            >
              <button
                type="button"
                onClick={() => handleNavigation("/doctors")}
                className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl
                text-gray-800 font-semibold bg-white/50 border border-white/30 backdrop-blur-sm
                hover:bg-white/80 hover:-translate-y-1
                transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-teal-100 text-teal-600 shadow-inner">
                  <FaUserMd size={22} />
                </div>
                Find a Doctor
              </button>
            </li>
           
            {login && (
              <li
                className="animate-stagger-in"
                style={{ animationDelay: "100ms" }}
              >
                <button
                  type="button"
                  onClick={() => handleNavigation("/account")}
                  className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl
                  text-gray-800 font-semibold bg-white/50 border border-white/30 backdrop-blur-sm
                  hover:bg-white/80 hover:-translate-y-1
                  transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-100 text-indigo-600 shadow-inner">
                    <AiOutlineUser size={22} />
                  </div>
                  My Account
                </button>
              </li>
            )}

            <li
              className="animate-stagger-in"
              style={{ animationDelay: "200ms" }}
            >
              <button
                type="button"
                onClick={() => handleNavigation("/cart")}
                className="group relative flex items-center gap-4 w-full px-4 py-3 rounded-xl
                text-gray-800 font-semibold bg-white/50 border border-white/30 backdrop-blur-sm
                hover:bg-white/80 hover:-translate-y-1
                transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95"
              >
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-green-100 text-green-600 shadow-inner">
                  <AiOutlineShopping size={22} />
                </div>
                Cart
                {totalItems > 0 && (
                 
                  <span
                    className="ml-auto flex items-center justify-center h-7 w-7
                  rounded-full bg-purple-600 text-white text-sm font-bold shadow-lg
                  ring-2 ring-purple-400 animate-pulse"
                  >
                    {totalItems}
                  </span>
                )}
              </button>
            </li>

            {!login && (
              <li
                className="animate-stagger-in"
                style={{ animationDelay: "300ms" }}
              >
                <button
                  type="button"
                  onClick={() => handleNavigation("/account")}
                  className="w-full text-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white
                  px-5 py-4 rounded-xl shadow-lg
                  hover:scale-105 hover:shadow-pink-500/50 transition-all duration-300 active:scale-95"
                >
                  Log In / Sign Up
                </button>
              </li>
            )}
          </ul>

          
          {login && (
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
          )}
        </div>
        {showModal && (
          <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
        )}
      </div>
    </nav>
  );
};

export default Navbar;