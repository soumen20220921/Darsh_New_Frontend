import React from "react";
import { useSpring, animated, useTrail } from "react-spring";
import {
  Ban,
  RefreshCw,
  ArrowLeftRight,
  RotateCcw,
  Phone,
  Mail,
} from "lucide-react";

const CancellationAndRefund = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 800 },
  });

  const sections = [
    {
      title: "1. Order Cancellation",
      icon: <Ban className="w-8 h-8 text-red-500" />,
      content: [
        "Orders can be cancelled before they are shipped.",
        "Once the order has been dispatched, cancellation requests will no longer be accepted.",
        "To cancel your order, please email us with your order ID at pomwb@gmail.com.",
      ],
      gradient: "from-rose-100 to-red-200",
    },
    {
      title: "2. Refund Policy",
      icon: <RefreshCw className="w-8 h-8 text-green-600" />,
      content: [
        "Once your refund request is approved, the amount will be credited to your bank account within 7-10 business days.",
        "If delays occur, please contact your bank or payment provider for assistance.",
      ],
      gradient: "from-green-100 to-emerald-200",
    },
    {
      title: "3. Exchange Policy",
      icon: <ArrowLeftRight className="w-8 h-8 text-blue-600" />,
      content: [
        "Exchanges are available only for defective or damaged items.",
        "Request must be submitted within 3 days of receiving the product.",
        "Exchanges will be done within 5 days of delivery.",
      ],
      gradient: "from-blue-100 to-indigo-200",
    },
    {
      title: "4. Return Policy",
      icon: <RotateCcw className="w-8 h-8 text-yellow-600" />,
      content: [
        "Returns are accepted for products that are damaged, defective, or incorrect upon delivery.",
        "An unboxing video is mandatory for all return or refund requests.",
        "Items must be unused, in their original packaging, and include all original tags and proof of purchase.",
        "If you receive a damaged product, you must return it within 2 days of delivery to be eligible for a refund",
        "Approved refunds will be credited within 5 to 7 working days.",
      ],
      gradient: "from-yellow-100 to-amber-200",
    },
    {
      title: "5.shipping policy",
      icon: <Phone className="w-8 h-8 text-purple-600" />,
      content: [
        "Shipping policy: Once an order is placed, delivery will take up to 7 business days to the provided address.",
        
      ],
      gradient: "from-purple-100 to-pink-200",
    },
        {
      title: "6. Contact Us",
      icon: <Phone className="w-8 h-8 text-green-300" />,
      content: [
        "Email: pomwbweb@gmail.com",
        "Phone: +91 7363054510",
      ],
      gradient: "from-blue-100 to-red-200",
    }
  ];

  const trail = useTrail(sections.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <animated.h1
        style={fadeIn}
        className="text-3xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12 tracking-wide drop-shadow-md"
      >
        Return, Exchange & Cancellation Policy
      </animated.h1>

      <div className="max-w-5xl mx-auto grid gap-10">
        {trail.map((style, i) => (
          <animated.div
            key={i}
            style={style}
            className={`p-8 rounded-2xl shadow-xl relative overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-2xl bg-gradient-to-br ${sections[i].gradient}`}
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>

            <div className="flex items-center gap-4 mb-6">
              {sections[i].icon}
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 drop-shadow-sm">
                {sections[i].title}
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-2 text-gray-700 font-medium relative z-10">
              {sections[i].content.map((point, idx) => (
                <li key={idx}>{point}</li>
              ))}
            </ul>
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default CancellationAndRefund;
