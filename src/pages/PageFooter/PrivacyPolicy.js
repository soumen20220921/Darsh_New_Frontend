import React from "react";
import { useSpring, animated } from "react-spring";
import { ShieldCheck, Database, Lock, RefreshCcw, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 700 },
  });

  const sections = [
    {
      title: "Information We Collect",
      icon: <Database className="w-10 h-10 text-indigo-500" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>Personal identification information</li>
          <li>Usage Data</li>
          <li>Cookies and tracking data</li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes</li>
          <li>To provide customer support</li>
          <li>To improve our service with analysis</li>
        </ul>
      ),
    },
    {
      title: "Security of Your Data",
      icon: <Lock className="w-10 h-10 text-red-500" />,
      content: (
        <p className="text-gray-600">
          We take the security of your data seriously and use multiple safety
          measures to protect it.
        </p>
      ),
    },
    {
      title: "Changes to Policy",
      icon: <RefreshCcw className="w-10 h-10 text-yellow-500" />,
      content: (
        <p className="text-gray-600">
          We may update this Privacy Policy. Any changes will be posted on this
          page.
        </p>
      ),
    },
    {
      title: "Contact Information",
      icon: <Mail className="w-10 h-10 text-blue-500" />,
      content: (
        <p className="text-gray-600">
          Questions? Email{" "}
          <strong className="text-indigo-600">pomwb@gmail.com</strong> or call{" "}
          <strong className="text-gray-800">+91 9474048860</strong>.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen py-16 px-6">
      <animated.h1
        style={fadeIn}
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12"
      >
        Privacy Policy
      </animated.h1>

      <div className="max-w-4xl mx-auto space-y-10">
        {sections.map((section, i) => (
          <animated.div
            key={i}
            style={fadeIn}
            className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition duration-500 transform hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4 mb-4">
              {section.icon}
              <h2 className="text-2xl font-bold text-gray-900">
                {section.title}
              </h2>
            </div>
            {section.content}
          </animated.div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
