import React, { useState, useEffect } from "react";
import { CircleAlert, Languages } from "lucide-react";

const ImportantNotice = () => {
  const [showBengali, setShowBengali] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBengali(true), 120000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="mt-5 p-4 rounded-lg bg-gradient-to-r from-yellow-100 via-amber-50 to-yellow-100 border border-yellow-300 shadow-md flex flex-col sm:flex-row items-start gap-3 animate-fadeIn">
      <CircleAlert className="h-6 w-6 text-amber-600 flex-shrink-0 animate-pulse" />
      <div className="flex-1">
        {!showBengali ? (
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
            <span className="font-semibold text-amber-700">Important:</span>{" "}
            After the delivery of the product, we{" "}
            <span className="font-semibold">must need the parcel opening video</span>,
            otherwise the <span className="font-semibold">return policy will not be approved</span>.
          </p>
        ) : (
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed">
            <span className="font-semibold text-amber-700">গুরুত্বপূর্ণ:</span>{" "}
            পণ্য সরবরাহের পর আমরা{" "}
            <span className="font-semibold">অবশ্যই পার্সেল খোলার ভিডিও</span> চাই, 
            অন্যথায় <span className="font-semibold">রিটার্ন নীতি অনুমোদিত হবে না</span>।
          </p>
        )}
      </div>

      <button
        onClick={() => setShowBengali(!showBengali)}
        className="mt-2 sm:mt-0 flex items-center gap-1 px-3 py-1 rounded-md text-xs sm:text-sm font-medium text-amber-700 border border-amber-300 bg-yellow-50 hover:bg-yellow-100 transition-all"
      >
        <Languages className="h-4 w-4" />
        {showBengali ? "English" : "বাংলা"}
      </button>
    </div>
  );
};

export default ImportantNotice;
