import React from "react";

export const AccountInfo = () => {
  const userEmail = localStorage.getItem("email");
  const userName = localStorage.getItem("name");

  return (
    <div className="p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-3xl shadow-xl transform hover:scale-[1.01] transition-transform duration-500 w-full max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-700 mb-6 text-center sm:text-left">
        Profile Information
      </h2>

      {/* Info Section */}
      <div className="space-y-6">
        {/* Name Section */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg sm:text-xl font-bold animate-pulse">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
          <div className="w-full">
            <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={userName || "User Name"}
              readOnly
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>
        </div>

        {/* Email Section */}
        <div className="p-4 sm:p-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-500 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 text-lg sm:text-xl font-bold animate-pulse">
            @
          </div>
          <div className="w-full">
            <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={userEmail || "User Email"}
              readOnly
              className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-200 rounded-xl bg-gray-50 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Footer Welcome Section */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-indigo-50 rounded-2xl shadow-inner hover:scale-[1.01] transition-transform duration-500 animate-bounce">
        <p className="text-indigo-700 text-sm sm:text-base font-medium text-center sm:text-left">
          Welcome back,{" "}
          <span className="font-bold">{userName || "User"}</span>!  
          Your profile is secured and up-to-date.
        </p>
      </div>
    </div>
  );
};

export default AccountInfo;
