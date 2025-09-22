import React from "react";
import { useSpring, animated } from "react-spring";
import { ShieldCheck, Database, Lock, RefreshCcw, Mail, Share2 } from "lucide-react";

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
          <li>
            <strong>Personal Information:</strong> We collect personal details
            such as your name, email address, shipping address, phone number,
            and payment information when you make a purchase, create an account,
            or contact us.
          </li>
          <li>
            <strong>Non-Personal Information:</strong> We may collect
            non-personal data such as browser type, operating system, and
            browsing behavior to improve our website and services.
          </li>
        </ul>
      ),
    },
    {
      title: "How We Use Your Information",
      icon: <ShieldCheck className="w-10 h-10 text-green-500" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>To Process Orders:</strong> We use your personal information
            to process and fulfill your orders.
          </li>
          <li>
            <strong>To Communicate:</strong> We use your contact information to
            send you updates about your order, respond to inquiries, and send
            promotional materials if you have opted in.
          </li>
          <li>
            <strong>To Improve Our Services:</strong> We analyze non-personal
            information to understand user behavior and enhance our website’s
            performance.
          </li>
        </ul>
      ),
    },
    {
      title: "Information Sharing",
      icon: <Share2 className="w-10 h-10 text-purple-500" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Third-Party Service Providers:</strong> We may share your
            information with third-party service providers who assist us in
            operating our website, processing payments, and delivering orders.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose your
            information if required by law or to protect our rights.
          </li>
        </ul>
      ),
    },
    {
      title: "Data Security",
      icon: <Lock className="w-10 h-10 text-red-500" />,
      content: (
        <p className="text-gray-600">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, disclosure, or
          destruction.
        </p>
      ),
    },
    {
      title: "Your Rights",
      icon: <Mail className="w-10 h-10 text-blue-500" />,
      content: (
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          <li>
            <strong>Access and Correction:</strong> You have the right to access
            and correct your personal information. You can update your account
            details through our website.
          </li>
          <li>
            <strong>Opt-Out:</strong> You can opt-out of receiving promotional
            emails by following the unsubscribe instructions in the emails.
          </li>
        </ul>
      ),
    },
    {
      title: "Changes to This Policy",
      icon: <RefreshCcw className="w-10 h-10 text-yellow-500" />,
      content: (
        <p className="text-gray-600">
          We may update this Privacy Policy from time to time. Any changes will
          be posted on this page, and the revised date will be indicated at the
          top of the policy.
        </p>
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 min-h-screen py-16 px-6">
      <animated.h1
        style={fadeIn}
        className="text-4xl sm:text-5xl font-extrabold text-center text-gray-900 mb-6"
      >
        Privacy Policy
      </animated.h1>
      <p className="text-center text-gray-700 mb-12">
        This website is Owned &amp; Operated by{" "}
        <strong className="text-indigo-600">POMWB</strong>
      </p>

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
