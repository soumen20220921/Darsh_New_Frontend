import React from "react";
import { CalendarDays } from "lucide-react";


const DeliveryEstimateSection = ({ order }) => {
  if (order.orderReject) {
    return null;
  }

  const orderDate = new Date(order.orderDate);
  const estimatedDate = new Date(
    orderDate.getTime() + 7 * 24 * 60 * 60 * 1000
  );

  return (
    <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md hover:shadow-lg transition-transform hover:-translate-y-1">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <CalendarDays className="w-5 h-5 text-orange-500 mr-2" />
        Estimated Delivery
      </h2>
      <div className="space-y-2">
        <p className="text-sm text-gray-700">
          Your order is expected to arrive by:
        </p>
        <p className="text-lg font-bold text-gray-900 animate-pulse">
          {estimatedDate.toDateString()}
        </p>
      </div>
    </div>
  );
};

export default DeliveryEstimateSection;