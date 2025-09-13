import React from "react";
import { useSpring, animated } from "react-spring";
import { FaShippingFast, FaBoxOpen, FaFileInvoice, FaGlobe, FaExclamationTriangle, FaHeadset } from "react-icons/fa";

const ShippingAndDelivery = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const cardVariants = [
    "bg-gradient-to-r from-indigo-50 to-indigo-100",
    "bg-gradient-to-r from-green-50 to-green-100",
    "bg-gradient-to-r from-yellow-50 to-yellow-100",
    "bg-gradient-to-r from-pink-50 to-pink-100",
    "bg-gradient-to-r from-red-50 to-red-100",
    "bg-gradient-to-r from-blue-50 to-blue-100",
  ];

  const sections = [
    {
      title: "1. Processing Time",
      text: `All orders are shipped within 2-3 business days and delivered within 7-10 business days. Orders are not shipped or delivered on weekends or holidays. High volume may delay shipping.`,
      icon: <FaShippingFast className="text-indigo-600 text-4xl" />,
    },
    {
      title: "2. Shipping Rates & Delivery Estimates",
      text: `Shipping charges for your order will be calculated at checkout. Delivery delays may occasionally occur depending on your location.`,
      icon: <FaBoxOpen className="text-green-600 text-4xl" />,
    },
    {
      title: "3. Shipment Confirmation & Order Tracking",
      text: `You will receive a Shipment Confirmation email once your order has shipped containing your tracking number(s). Tracking numbers are active within 24 hours.`,
      icon: <FaFileInvoice className="text-yellow-600 text-4xl" />,
    },
    {
      title: "4. Customs, Duties, and Taxes",
      text: `We are not responsible for any customs and taxes applied to your order. All fees imposed during or after shipping are the responsibility of the customer.`,
      icon: <FaGlobe className="text-pink-600 text-4xl" />,
    },
    {
      title: "5. Damages",
      text: `We are not liable for products damaged or lost during shipping. If you received a damaged order, contact the shipment carrier (video unboxing mandatory). Keep all packaging & damaged goods for claim.`,
      icon: <FaExclamationTriangle className="text-red-600 text-4xl" />,
    },
    {
      title: "6. Contact Information",
      text: `If you have any questions about these Terms, contact us at: pomwb@gmail.com or +91 9474048860`,
      icon: <FaHeadset className="text-blue-600 text-4xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12"
        >
          Shipping & Delivery
        </animated.h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <animated.div
              key={index}
              style={fadeIn}
              className={`${cardVariants[index % cardVariants.length]} p-6 sm:p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center`}
            >
              <div className="mb-4">{section.icon}</div>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {section.title}
              </h2>
              <p className="text-gray-700 leading-relaxed">{section.text}</p>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShippingAndDelivery;
