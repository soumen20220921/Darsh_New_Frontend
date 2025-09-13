import React, { useEffect, useState } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";

const developerInfo = [
  {
    id: 1,
    name: "Debashis Paul",
    role: "Full Stack Developer",
    bio: "Dedicated to crafting intuitive and visually engaging user interfaces and specializing in scalable backend systems with Node.js and dynamic frontend experiences with React.",
    image: "/IMG/p112.jpeg",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "JavaScript",
      "REST APIs",
      "AWS Basics",
      "Responsive Design",
      "Animation",
    ],
    contact: {
      email: "adebashispaul@gmail.com",
      whatsapp: "919932445077",
      github: "https://github.com/Debashis-11101-srijib",
      linkedin: "https://www.linkedin.com/in/debashis-paul-a12795231/",
      website: "https://debashis-11101-srijib.github.io/my-portfolio/",
      phoneNumber: "+919932445077",
    },
    portfolio: [
      {
        title: "My Portfolio",
        description: "Showcasing a collection of my projects.",
        link: "https://debashis-11101-srijib.github.io/my-portfolio/",
      },
    ],
  },
  {
    id: 2,
    name: "Soumen Singh",
    role: "Full Stack Developer",
    bio: "A passionate and versatile Full Stack Developer with expertise in building robust and scalable web applications.",
    image: "/IMG/p113.jpg",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL",
      "JavaScript",
      "REST APIs",
      "AWS Basics",
    ],
    contact: {
      email: "soumen.email@example.com",
      whatsapp: "919339268656",
      github: "https://github.com/friend-github",
      linkedin: "https://www.linkedin.com/in/friend-linkedin",
      website: "https://friendportfolio.com",
      phoneNumber: "+919339268656",
    },
    portfolio: [
      {
        title: "My Portfolio",
        description: "Showcasing a collection of my projects.",
        link: "https://friendportfolio.com",
      },
    ],
  },
];

const DevelopersPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute("data-theme");
    setIsDarkTheme(theme === "dark");
    window.scrollTo(0, 0);
  }, []);

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.3, duration: 1 },
    },
  };

  return (
    <motion.div
      className="p-6 md:p-12 min-h-screen flex flex-col items-center bg-gradient-to-b from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-black"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center mb-16"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 drop-shadow-lg">
          Meet the Innovators
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300">
          We’re passionate about crafting seamless and modern digital products.
        </p>
      </motion.div>

      {/* Developer Cards */}
      <div className="flex flex-wrap justify-center gap-10 w-full max-w-7xl">
        {developerInfo.map((dev) => (
          <motion.div
            key={dev.id}
            className="relative group w-full sm:w-80 md:w-96 rounded-3xl p-8 backdrop-blur-lg shadow-xl 
              bg-gradient-to-br from-white/60 to-white/30 dark:from-gray-800/60 dark:to-gray-700/30 
              border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 hover:scale-105"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-purple-400 shadow-md relative"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 rounded-full ring-4 ring-pink-400/40 animate-pulse" />
            </motion.div>

            <h2 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              {dev.name}
            </h2>
            <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-pink-500 font-medium">
              {dev.role}
            </p>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
              {dev.bio}
            </p>

            {/* Skills Cloud */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {dev.skills.map((skill, i) => (
                <motion.span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-800 dark:text-indigo-200 shadow-sm"
                  whileHover={{ scale: 1.15 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* Contact Icons */}
            <div className="flex justify-center gap-6 mt-8">
              {dev.contact.github && (
                <motion.a
                  href={dev.contact.github}
                  target="_blank"
                  className="text-2xl text-gray-700 dark:text-gray-300 hover:text-indigo-500"
                  whileHover={{ scale: 1.3 }}
                >
                  <FaGithub />
                </motion.a>
              )}
              {dev.contact.linkedin && (
                <motion.a
                  href={dev.contact.linkedin}
                  target="_blank"
                  className="text-2xl text-gray-700 dark:text-gray-300 hover:text-blue-500"
                  whileHover={{ scale: 1.3 }}
                >
                  <FaLinkedin />
                </motion.a>
              )}
              {dev.contact.whatsapp && (
                <motion.a
                  href={`https://wa.me/${dev.contact.whatsapp}`}
                  target="_blank"
                  className="text-2xl text-green-600 hover:text-green-700"
                  whileHover={{ scale: 1.3 }}
                >
                  <FaWhatsapp />
                </motion.a>
              )}
              {dev.contact.email && (
                <motion.a
                  href={`mailto:${dev.contact.email}`}
                  className="text-2xl text-red-500 hover:text-red-600"
                  whileHover={{ scale: 1.3 }}
                >
                  <FaEnvelope />
                </motion.a>
              )}
            </div>

            {dev.portfolio && dev.portfolio.length > 0 && (
              <div className="mt-8 border-t border-gray-300 dark:border-gray-600 pt-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
                  Projects
                </h3>
                {dev.portfolio.map((project, i) => (
                  <motion.a
                    key={i}
                    href={project.link}
                    target="_blank"
                    className="block bg-gradient-to-r from-indigo-100 to-pink-100 dark:from-gray-700 dark:to-gray-600 p-4 rounded-xl shadow hover:scale-[1.02] transition-transform"
                    whileHover={{ scale: 1.05 }}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {project.description}
                    </p>
                  </motion.a>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      >
        <p className="text-lg font-medium bg-gradient-to-r from-pink-500 to-indigo-500 bg-clip-text text-transparent">
          🚀 Built with ❤️ by our Developers
        </p>
      </motion.div>
    </motion.div>
  );
};

export default DevelopersPage;
