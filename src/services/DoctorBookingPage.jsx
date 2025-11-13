import React from 'react';
import DoctorsPage from './DoctorsPage';
import { ArrowLeft } from 'lucide-react';

const DoctorBookingPage = ({ service, onBack }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 md:py-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 px-3 py-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="text-sm sm:text-base font-medium">Back to Services</span>
            </button>

           

            <div className="w-4 sm:w-8 lg:w-20"></div>
          </div>
        </div>
      </header>

        <DoctorsPage />
    </div>
  );
};

export default DoctorBookingPage;