import React, { useState } from "react";
import {
  User,
  MapPin,
  Package,
  LogOut,
  Heart,
  CreditCard,
} from "lucide-react";
import AccountInfo from "../components/AccountInfo";
import AddressInfo from "../components/AddressInfo";
import OrderInfo from "../components/MyOrders";
import { useNavigate } from "react-router-dom";
import LogoutModal from "./LogoutModal";

const Account = () => {
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");
  const [showModal, setShowModal] = useState(false);
  const [comp, setComp] = useState(1);

  const navigate = useNavigate();

  const logOut = () => setShowModal(true);

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/auth");
    window.location.reload();
  };

  const cancelLogout = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 font-inter transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center md:text-left animate-fade-in">
          My Account
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-72 flex-shrink-0">
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
                {[
                  { id: 1, label: "Profile", icon: <User className="h-5 w-5" /> },
                  {
                    id: 2,
                    label: "Addresses",
                    icon: <MapPin className="h-5 w-5" />,
                  },
                  {
                    id: 3,
                    label: "Orders",
                    icon: <Package className="h-5 w-5" />,
                  },
                  {/* {
                    id: 4,
                    label: "Wishlist",
                    icon: <Heart className="h-5 w-5" />,
                    disabled: true,
                  },
                  {
                    id: 5,
                    label: "Saved Cards",
                    icon: <CreditCard className="h-5 w-5" />,
                    disabled: true,
                  }, */}
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => !item.disabled && setComp(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                      comp === item.id
                        ? "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 shadow-md scale-[1.02]"
                        : item.disabled
                        ? "text-gray-400 cursor-not-allowed opacity-60"
                        : "text-gray-600 hover:bg-gray-100 hover:scale-[1.01]"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}

                {/* Logout */}
                <button
                  onClick={logOut}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
              {comp === 1 && <AccountInfo />}
              {comp === 2 && <AddressInfo />}
              {comp === 3 && <OrderInfo />}
              {/* {comp === 4 && (
                <div className="text-center text-gray-500 italic">
                  Wishlist feature coming soon ✨
                </div>
              )}
              {comp === 5 && (
                <div className="text-center text-gray-500 italic">
                  Saved Cards feature coming soon 💳
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <LogoutModal onConfirm={confirmLogout} onCancel={cancelLogout} />
      )}
    </div>
  );
};

export default Account;
