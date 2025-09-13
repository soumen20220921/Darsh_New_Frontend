import React from "react";
import { LogOut } from "lucide-react";

const LogoutModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-sm transform animate-scaleIn relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>

        {/* Icon */}
        <div className="flex justify-center mb-6 relative">
          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center shadow-inner animate-bounce-slow">
            <LogOut className="h-10 w-10 text-red-600" />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-gray-900 text-center mb-2 tracking-tight">
          Are you sure?
        </h3>
        <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
          Logging out will end your session. You’ll need to sign in again to
          continue.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row-reverse gap-3">
          <button
            onClick={onConfirm}
            className="w-full sm:w-1/2 px-4 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Logout
          </button>
          <button
            onClick={onCancel}
            className="w-full sm:w-1/2 px-4 py-2.5 rounded-lg font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 shadow-inner hover:shadow-md transform hover:scale-105 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
