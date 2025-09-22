import React, { useState } from "react";
import { useSpring, animated, useTrail } from "react-spring";
import { Mail, Phone, MapPin, Send, ShoppingBag, Sparkles } from "lucide-react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setFormData({ name: "", email: "", message: "" });
  };

  const fadeIn = useSpring({
    from: { opacity: 0, transform: "translateY(40px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { duration: 800 },
  });

  const infoSections = [
    {
      title: "WE ARE HERE - YOU CAN KEEP IN TOUCH WITH US ANYTIME",
      items: [
        { icon: <Phone className="w-5 h-5 text-indigo-600" />, text: "Phone: +91 7363054510" },
        { icon: <Mail className="w-5 h-5 text-indigo-600" />, text: "Email: pomwbweb@gmail.com" },
        { icon: <MapPin className="w-5 h-5 text-indigo-600" />, text: "Address: Nilkuthidanga, puruli,West bengal,723101" },
      ],
      gradient: "from-indigo-100 to-purple-200",
    },
    {
      title: "EXPLORE OUR PRODUCTS",
      icon: <ShoppingBag className="w-6 h-6 text-green-600" />,
      text: "We offer a wide range of products including clothing, electronics, home goods, and more. Our collection is curated to bring you the best in quality and style.",
      gradient: "from-green-100 to-emerald-200",
    },
    {
      title: "OUR LATEST COLLECTIONS",
      icon: <Sparkles className="w-6 h-6 text-yellow-600" />,
      text: "Our products are available in a variety of materials and styles, perfect for every sphere of your life. Whether you're looking for a comfortable outfit, a gadget, or elegant home decor, our collections are designed to meet your needs.",
      gradient: "from-yellow-100 to-orange-200",
    },
  ];

  const trail = useTrail(infoSections.length, {
    from: { opacity: 0, transform: "translateY(20px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: { tension: 220, friction: 25 },
  });

  return (
    <div className="bg-gradient-to-br from-gray-100 via-white to-gray-200 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-7xl w-full flex flex-col lg:flex-row bg-white/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        <animated.div
          style={fadeIn}
          className="w-full lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-indigo-50 via-white to-indigo-100"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-md">
              Help Center
            </h1>
            <p className="text-gray-600">If you have any questions or concerns, feel free to reach out to us.</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your email"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Your message..."
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition-all transform hover:scale-[1.02]"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </animated.div>

        <div className="w-full lg:w-1/2 bg-gray-50 p-8 md:p-12 flex flex-col justify-center">
          <div className="space-y-8">
            {trail.map((style, i) => (
              <animated.div
                key={i}
                style={style}
                className={`p-6 rounded-xl shadow-md bg-gradient-to-br ${infoSections[i].gradient} hover:shadow-xl transform transition duration-300 hover:scale-[1.02]`}
              >
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  {infoSections[i].icon} {infoSections[i].title}
                </h3>
                {infoSections[i].items ? (
                  <ul className="space-y-2">
                    {infoSections[i].items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700 font-medium">
                        {item.icon} {item.text}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700 font-medium">{infoSections[i].text}</p>
                )}
              </animated.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
