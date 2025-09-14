import React, { useState } from "react";
import { User, MapPin, Package, LogOut } from "lucide-react";
import AccountInfo from "../components/AccountInfo";
import AddressInfo from "../components/AddressInfo";
import OrderInfo from "../components/MyOrders";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { motion, AnimatePresence } from "framer-motion";

const Account = () => {
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  const [showModal, setShowModal] = useState(false);
  const [comp, setComp] = useState(1);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const navigate = useNavigate();

  const logOut = () => setShowModal(true);

  const confirmLogout = () => {
    setShowModal(false);

    const audio = new Audio("./IMG/logout.mp3");
    audio.volume = 0.3;
    audio.play().catch(() => console.log("Sound autoplay blocked"));

    setIsLoggingOut(true);

    setTimeout(() => {
      localStorage.clear();
      navigate("/auth");
      window.location.reload();
    }, 1200);
  };

  const cancelLogout = () => setShowModal(false);

  const tabs = [
    { id: 1, label: "Profile", icon: <User className="h-5 w-5" /> },
    { id: 2, label: "Addresses", icon: <MapPin className="h-5 w-5" /> },
    { id: 3, label: "Orders", icon: <Package className="h-5 w-5" /> },
    { id: 4, label: "Logout", icon: <LogOut className="h-5 w-5" /> },
  ];

  return (
    <AnimatePresence>
      {!isLoggingOut && (
        <motion.div
          key="account-page"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.6 }}
          className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-inter"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Title */}
            <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center md:text-left">
              My Account
            </h1>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Desktop Sidebar */}
              <div className="hidden md:block md:w-72 flex-shrink-0">
                <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-6 sticky top-6 transition-all duration-500 hover:shadow-2xl">
                  {/* Profile */}
                  <div className="text-center mb-6">
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 animate-pulse blur-sm opacity-60"></div>
                      <div className="relative w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                        <User className="h-12 w-12 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {userName || "User Name"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">
                      {userEmail || "user@example.com"}
                    </p>
                  </div>

                  {/* Navigation */}
                  <nav className="space-y-2">
                    {tabs.map((item) => (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.96 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() =>
                          item.id === 4 ? logOut() : setComp(item.id)
                        }
                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          comp === item.id
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md"
                            : item.id === 4
                            ? "text-red-600 hover:bg-red-50"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </motion.button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Content Area */}
              <div className="flex-1">
                {/* Desktop Content */}
                <div className="hidden md:block bg-white rounded-lg shadow-md p-4 sm:p-6">
                  {comp === 1 && <AccountInfo />}
                  {comp === 2 && <AddressInfo />}
                  {comp === 3 && <OrderInfo />}
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-4">
                  {/* Mobile Profile Card */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-md p-5 text-center"
                  >
                    <div className="relative w-20 h-20 mx-auto mb-3">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-purple-500 animate-pulse blur-sm opacity-60"></div>
                      <div className="relative w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center shadow-inner">
                        <User className="h-10 w-10 text-blue-600" />
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {userName || "User Name"}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {userEmail || "user@example.com"}
                    </p>
                  </motion.div>

                  {/* Mobile Tabs */}
                  <div className="flex justify-around bg-white rounded-lg shadow-md overflow-hidden">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() =>
                          tab.id === 4 ? logOut() : setComp(tab.id)
                        }
                        className={`flex-1 flex flex-col items-center py-3 text-sm font-medium transition-all ${
                          comp === tab.id
                            ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50"
                            : tab.id === 4
                            ? "text-red-500"
                            : "text-gray-600 hover:bg-gray-50"
                        }`}
                      >
                        {tab.icon}
                        <span className="mt-1">{tab.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Mobile Tab Content */}
                  <motion.div
                    key={comp}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-lg shadow-md p-4 sm:p-6"
                  >
                    {comp === 1 && <AccountInfo />}
                    {comp === 2 && <AddressInfo />}
                    {comp === 3 && <OrderInfo />}
                    {comp === 4 && (
                      <div className="text-center">
                        <h2 className="text-xl font-semibold text-red-600 mb-4 flex justify-center gap-2 items-center">
                          <LogOut className="h-5 w-5" /> Logout
                        </h2>
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={logOut}
                          className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium shadow-md hover:shadow-lg transition-all"
                        >
                          Logout Now
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          {showModal && (
            <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Account;
