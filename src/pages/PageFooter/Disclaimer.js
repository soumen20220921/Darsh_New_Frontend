import React from "react";
import { useSpring, animated } from "react-spring";
import { Shield, Info, Link2, AlertTriangle, Scale, Mail } from "lucide-react";

const Disclaimer = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(30px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 800 },
  });

  const sections = [
    {
      title: "General Information",
      icon: <Info className="w-6 h-6 text-indigo-600" />,
      content:
        "The information contained in this website is for general information purposes only. The information is provided by Think & Learn Pvt Ltd and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind...",
      color: "from-indigo-50 to-indigo-100",
    },
    {
      title: "Product Descriptions",
      icon: <Shield className="w-6 h-6 text-green-600" />,
      content:
        "PomWb attempts to be as accurate as possible in describing our products. However, we do not warrant that product descriptions, specifications, pricing, or other content on our website are always accurate or error-free...",
      color: "from-green-50 to-green-100",
    },
    {
      title: "External Links",
      icon: <Link2 className="w-6 h-6 text-blue-600" />,
      content:
        "Our website may contain links to third-party websites or services that are not owned or controlled by PomWb. These are provided for convenience and do not imply endorsement...",
      color: "from-blue-50 to-blue-100",
    },
    {
      title: "Limitation of Liability",
      icon: <AlertTriangle className="w-6 h-6 text-red-600" />,
      content:
        "PomWb will not be liable for any damages of any kind arising from the use of this site, including but not limited to direct, indirect, incidental, punitive, and consequential damages...",
      color: "from-red-50 to-red-100",
    },
    {
      title: "Legal Compliance",
      icon: <Scale className="w-6 h-6 text-purple-600" />,
      content:
        "PomWb is committed to complying with all Indian laws and regulations, including those related to e-commerce, consumer protection, and data privacy...",
      color: "from-purple-50 to-purple-100",
    },
    {
      title: "Contact Information",
      icon: <Mail className="w-6 h-6 text-pink-600" />,
      content:
        "If you have any questions about this disclaimer or our practices, please contact us at: pomwb@gmail.com or +91 9474048860",
      color: "from-pink-50 to-pink-100",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <animated.h1
          style={fadeIn}
          className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-12"
        >
          Disclaimer
        </animated.h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <animated.div
              key={index}
              style={fadeIn}
              className={`bg-gradient-to-br ${section.color} p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2`}
            >
              <div className="flex items-center gap-3 mb-4">
                {section.icon}
                <h2 className="text-xl font-bold text-gray-800">
                  {section.title}
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
