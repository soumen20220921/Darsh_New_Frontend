import React from "react";
import { useSpring, animated } from "react-spring";
import { FaFileContract, FaSyncAlt, FaUsers, FaBan, FaGavel, FaHeadset } from "react-icons/fa";

const TermsAndConditions = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 1000 },
  });

  const cardColors = [
    "bg-gradient-to-r from-blue-50 to-blue-100",
    "bg-gradient-to-r from-green-50 to-green-100",
    "bg-gradient-to-r from-yellow-50 to-yellow-100",
    "bg-gradient-to-r from-pink-50 to-pink-100",
    "bg-gradient-to-r from-indigo-50 to-indigo-100",
    "bg-gradient-to-r from-purple-50 to-purple-100",
  ];

  const sections = [
    {
      title: "1. Acceptance of Terms",
      text: `By accessing or using our service, you agree to be bound by these terms. If you do not agree with any part of the terms, you may not use our service.`,
      icon: <FaFileContract className="text-blue-600 text-4xl" />,
    },
    {
      title: "2. Changes to Terms",
      text: `We reserve the right to modify or replace these terms at any time. It is your responsibility to check this page periodically for changes. Continued use means acceptance.`,
      icon: <FaSyncAlt className="text-green-600 text-4xl" />,
    },
    {
      title: "3. Use of Service",
      text: `You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for keeping your account and password secure.`,
      icon: <FaUsers className="text-yellow-600 text-4xl" />,
    },
    {
      title: "4. Termination",
      text: `We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, if you breach these terms.`,
      icon: <FaBan className="text-pink-600 text-4xl" />,
    },
    {
      title: "5. Governing Law",
      text: `These terms shall be governed and construed in accordance with the laws of the jurisdiction in which our company, PomWb, is based.`,
      icon: <FaGavel className="text-indigo-600 text-4xl" />,
    },
    {
      title: "6. Contact Information",
      text: `If you have any questions about these Terms, please contact us at: pomwb@gmail.com or +91 9474048860`,
      icon: <FaHeadset className="text-purple-600 text-4xl" />,
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12"
        >
          Terms & Conditions
        </animated.h1>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section, index) => (
            <animated.div
              key={index}
              style={fadeIn}
              className={`${cardColors[index % cardColors.length]} p-6 sm:p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center`}
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

export default TermsAndConditions;
