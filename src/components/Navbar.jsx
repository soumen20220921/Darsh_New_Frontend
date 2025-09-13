import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  AiOutlineUser,
  AiOutlineShopping,
} from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { login, setLogin, totalItems } = useAppContext(); // <-- Get totalItems from context
  const navigate = useNavigate();
  const userName = localStorage.getItem("name");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLogin(true);
  }, [setLogin]);

  const handleMenuToggle = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const handleSearchToggle = () => setIsSearchVisible(!isSearchVisible);
  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsSearchVisible(false);
  };

  const NavButton = ({ label, icon: Icon, onClick, color }) => (
    <div className="relative group">
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        className="group flex items-center justify-center h-10 w-10 rounded-full transition-all duration-300 hover:scale-110 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-pink-500"
      >
        <Icon className={`text-gray-700 group-hover:text-white`} size={24} />
      </button>
      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap">
        {label}
      </div>
    </div>
  );

  return (
    <nav className="sticky top-0 z-50 shadow-md backdrop-blur-sm bg-white/80">
      <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto px-6 h-16 flex items-center justify-between transition-all duration-500">
        {/* Logo */}
        <Link
          to="/"
          className="inline-flex items-center space-x-2 transform transition-transform duration-300 hover:scale-105"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-2xl font-extrabold text-gray-800 tracking-wide">
            POMWB
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-6 text-lg">
          <li>
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
          </li>
          <li>
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
          </li>
        </ul>

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

      {/* Search Bar */}
      <div
        className={`bg-white shadow-md transition-all duration-500 overflow-hidden ${
          isSearchVisible ? "max-h-20" : "max-h-0"
        }`}
      >
        <div className="w-full lg:w-[90%] xl:w-[70%] mx-auto p-4">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300 shadow-sm"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-gradient-to-b from-white/90 via-white/95 to-white shadow-xl transition-transform duration-500 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {login && (
          <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 animate-slideDown">
            <span className="text-lg font-bold text-gray-800">
              Hi, {userName}!
            </span>
          </div>
        )}
        <ul className="flex flex-col p-4 gap-2">
          {login && (
            <li className="w-full animate-slideUp">
              <button
                type="button"
                onClick={() => handleNavigation("/account")}
                className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r from-indigo-100 to-pink-50 transition-all duration-300"
              >
                <AiOutlineUser size={20} className="text-indigo-500" />
                <span className="text-base font-medium">My Account</span>
              </button>
            </li>
          )}
          <li className="w-full animate-slideUp">
            <button
              type="button"
              onClick={() => handleNavigation("/cart")}
              className="relative flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl hover:bg-gradient-to-r from-green-100 to-green-50 transition-all duration-300"
            >
              <AiOutlineShopping size={20} className="text-green-500" />
              <span className="text-base font-medium">Cart</span>
              {totalItems > 0 && (
                <span className="ml-auto flex items-center justify-center min-h-[28px] min-w-[28px] p-1 rounded-full bg-purple-600 text-white text-sm font-bold shadow-lg transform transition-transform duration-300 group-hover:scale-110">
                  {totalItems}
                </span>
              )}
            </button>
          </li>
          {!login && (
            <li className="w-full animate-slideUp">
              <button
                type="button"
                onClick={() => handleNavigation("/account")}
                className="w-full text-center bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-4 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <span className="text-base font-medium">Log In</span>
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;